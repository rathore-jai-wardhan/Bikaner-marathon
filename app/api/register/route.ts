import { z } from "zod";
import { after } from "next/server";
import { sql } from "../../../lib/db";
import { STATES } from "../../../lib/state";
import { createOrder } from "../../../lib/razorpay";
import { registrationCode } from "../../../lib/payment";
import { sendConfirmation } from "../../../lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Race day. Used to work out each runner's age. Please confirm the date.
const EVENT_DATE = "2026-12-27";

function cleanPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  return digits;
}

function isValidPhone(digits: string): boolean {
  return /^[6-9]\d{9}$/.test(digits);
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00Z");
  return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function ageOn(dob: string, onDate: string): number {
  const [by, bm, bd] = dob.split("-").map(Number);
  const [ey, em, ed] = onDate.split("-").map(Number);
  let age = ey - by;
  if (em < bm || (em === bm && ed < bd)) age--;
  return age;
}

const phoneField = z
  .string()
  .transform(cleanPhone)
  .refine(isValidPhone, "Please enter a valid 10-digit mobile number.");

const schema = z.object({
  categoryId: z.string().trim().min(1).max(10),
  fullName: z.string().trim().min(2, "Please enter the full name.").max(100),
  dateOfBirth: z.string().refine(isRealDate, "Please enter a valid date of birth."),
  gender: z.enum(["male", "female", "other"]),
  phone: phoneField,
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address.")
    .max(200),
  city: z.string().trim().min(2, "Please enter your city.").max(100),
  state: z
    .string()
    .refine((v) => STATES.includes(v), "Please choose your state."),
  tshirtSize: z.string().trim().min(1).max(10),
  emergencyName: z.string().trim().max(100).default(""),
  emergencyPhone: z.string().trim().max(20).default(""),
  bloodGroup: z
    .enum(["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .default(""),
  guardianName: z.string().trim().max(100).default(""),
  guardianPhone: z.string().trim().max(20).default(""),
  consentTerms: z
    .boolean()
    .refine((v) => v === true, "Please accept the Terms, Privacy and Refund policies to continue."),
  consentMessages: z
    .boolean()
    .refine(
      (v) => v === true,
      "Please agree to receive your registration messages on WhatsApp and email."
    ),
  consentUpdates: z.boolean().default(false),
});

export async function POST(request: Request) {
  // Read what the form sent
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Check 1: is the data valid?
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }
  const d = parsed.data;

  // Check 2: category must exist and be open. Price comes from the database.
  const found = await sql`
    select id, price_paise, min_age, max_age, tshirt_sizes, is_open
    from categories
    where id = ${d.categoryId}
  `;
  const category = found[0];
  if (!category || !category.is_open) {
    return Response.json(
      { error: "Registration for this category is not open." },
      { status: 400 }
    );
  }

  // Check 3: age on race day must fit the category
  const age = ageOn(d.dateOfBirth, EVENT_DATE);
  if (age < 0 || age > 100) {
    return Response.json({ error: "Please check the date of birth." }, { status: 400 });
  }
  if (age < category.min_age) {
    return Response.json(
      { error: `The minimum age for this category is ${category.min_age}.` },
      { status: 400 }
    );
  }
  if (category.max_age !== null && age > category.max_age) {
    return Response.json(
      {
        error: `This category is for participants aged ${category.max_age} or under.`,
      },
      { status: 400 }
    );
  }

  // The T-shirt size must be one of the sizes listed for this category
  if (!category.tshirt_sizes.includes(d.tshirtSize)) {
    return Response.json(
      { error: "Please choose a T-shirt size from the list." },
      { status: 400 }
    );
  }

  // Check 4: contact and safety details depend on the category
  const isKidsCategory = category.max_age !== null && category.max_age < 18;
  let guardianName: string | null = null;
  let guardianPhone: string | null = null;
  let emergencyName: string | null = null;
  let emergencyPhone: string | null = null;

  if (isKidsCategory) {
    // Kids category: the mobile and email on the form belong to the parent
    if (d.guardianName.length < 2) {
      return Response.json(
        { error: "Please enter the parent or guardian's name." },
        { status: 400 }
      );
    }
    guardianName = d.guardianName;
    guardianPhone = d.phone;
  } else {
    const ePhone = cleanPhone(d.emergencyPhone);
    if (d.emergencyName.length < 2 || !isValidPhone(ePhone)) {
      return Response.json(
        {
          error:
            "Please enter an emergency contact name and a valid mobile number.",
        },
        { status: 400 }
      );
    }
    emergencyName = d.emergencyName;
    emergencyPhone = ePhone;

    if (age < 18) {
      const gPhone = cleanPhone(d.guardianPhone);
      if (d.guardianName.length < 2 || !isValidPhone(gPhone)) {
        return Response.json(
          {
            error:
              "Participants under 18 need a parent or guardian's name and mobile number.",
          },
          { status: 400 }
        );
      }
      guardianName = d.guardianName;
      guardianPhone = gPhone;
    }
  }

  const isPaid = category.price_paise > 0;

  // Check 5: too many unfinished payment attempts from one email? (slows abuse)
  if (isPaid) {
    const recent = await sql`
      select count(*)::int as n
      from registrations
      where lower(email) = ${d.email}
        and status = 'pending'
        and created_at > now() - interval '1 hour'
    `;
    if (recent[0].n >= 5) {
      return Response.json(
        { error: "Too many attempts. Please try again in an hour." },
        { status: 429 }
      );
    }
  }

  // Check 6: save, but only if a slot is free. Slots held by payments that
  // started in the last 15 minutes count as taken. The database also refuses
  // the same person twice (one_confirmed_per_person rule).
  const startStatus = isPaid ? "pending" : "confirmed_free";
  let registrationId = "";
  try {
    const rows = await sql`
      insert into registrations (
        category_id, full_name, date_of_birth, gender, phone, email, city, state,
        tshirt_size, emergency_name, emergency_phone, blood_group,
        guardian_name, guardian_phone, consent_terms, consent_messages,
        consent_updates, amount_paise, status
      )
      select
        ${d.categoryId}, ${d.fullName}, ${d.dateOfBirth}::date, ${d.gender},
        ${d.phone}, ${d.email}, ${d.city}, ${d.state}, ${d.tshirtSize},
        ${emergencyName}::text, ${emergencyPhone}::text,
        ${d.bloodGroup || null}::text,
        ${guardianName}::text, ${guardianPhone}::text,
        ${d.consentTerms}::boolean, ${d.consentMessages}::boolean,
        ${d.consentUpdates}::boolean,
        ${category.price_paise}::integer, ${startStatus}::text
      where (
        select count(*) from registrations
        where category_id = ${d.categoryId}
          and (
            status in ('paid', 'confirmed_free')
            or (status = 'pending' and created_at > now() - interval '15 minutes')
          )
      ) < coalesce(
        (select slot_limit from categories where id = ${d.categoryId}),
        2147483647
      )
      returning id
    `;

    if (rows.length === 0) {
      return Response.json(
        { error: "Sorry, this category is full." },
        { status: 409 }
      );
    }
    registrationId = rows[0].id as string;
  } catch (err) {
    const code = (err as { code?: string }).code;
    if (code === "23505") {
      return Response.json(
        { error: "This person is already registered for this category." },
        { status: 409 }
      );
    }
    console.error("Registration insert failed", code);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Free category: confirmed straight away
  if (!isPaid) {
    after(() => sendConfirmation(registrationId));
    return Response.json({
      ok: true,
      registrationCode: registrationCode(registrationId),
    });
  }

  // Paid category: create the payment order at Razorpay
  try {
    const order = await createOrder({
      amountPaise: category.price_paise,
      receipt: registrationId,
      notes: { registration_id: registrationId, category: d.categoryId },
    });
    await sql`
      update registrations set razorpay_order_id = ${order.id}
      where id = ${registrationId}
    `;
    return Response.json({
      ok: true,
      requiresPayment: true,
      order: {
        orderId: order.id,
        amount: category.price_paise,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (err) {
    console.error("Could not create Razorpay order", err);
    await sql`
      update registrations set status = 'failed' where id = ${registrationId}
    `;
    return Response.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 }
    );
  }
}