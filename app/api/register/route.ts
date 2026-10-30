import { z } from "zod";
import { after } from "next/server";
import { sql } from "../../../lib/db";
import { STATES } from "../../../lib/state";
import { createOrder } from "../../../lib/razorpay";
import { registrationCode } from "../../../lib/payment";
import { sendNotifications } from "../../../lib/notify";
import { cleanPhone, isValidPhone } from "../../../lib/phone";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Race day. Used to work out each runner's age. Please confirm the date.
const EVENT_DATE = "2026-12-27";

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

function isValidEmail(value: string): boolean {
  return z.email().safeParse(value).success;
}

const schema = z.object({
  categoryId: z.string().trim().min(1).max(10),
  fullName: z.string().trim().min(2, "Please enter the full name.").max(100),
  dateOfBirth: z.string().refine(isRealDate, "Please enter a valid date of birth."),
  gender: z.enum(["male", "female", "other"]),
  // Runner's own contact. Only used when the runner is 18 or older on race day.
  phone: z.string().trim().max(30).default(""),
  email: z.string().trim().toLowerCase().max(200).default(""),
  city: z.string().trim().min(2, "Please enter your city.").max(100),
  state: z
    .string()
    .refine((v) => STATES.includes(v), "Please choose your state."),
  tshirtSize: z.string().trim().min(1).max(10),
  emergencyName: z.string().trim().max(100).default(""),
  emergencyPhone: z.string().trim().max(30).default(""),
  bloodGroup: z
    .enum(["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .default(""),
  guardianName: z.string().trim().max(100).default(""),
  guardianPhone: z.string().trim().max(30).default(""),
  guardianEmail: z.string().trim().toLowerCase().max(200).default(""),
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
    const issue = parsed.error.issues[0];
    return Response.json(
      { error: issue.message, field: String(issue.path[0] ?? "") },
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
    return Response.json({ error: "Please check the date of birth.", field: "dateOfBirth" }, { status: 400 });
  }
  if (age < category.min_age) {
    return Response.json(
      { error: `The minimum age for this category is ${category.min_age}.`, field: "dateOfBirth" },
      { status: 400 }
    );
  }
  if (category.max_age !== null && age > category.max_age) {
    return Response.json(
      {
        error: `This category is for participants aged ${category.max_age} or under.`,
        field: "dateOfBirth",
      },
      { status: 400 }
    );
  }

  // The T-shirt size must be one of the sizes listed for this category
  if (!category.tshirt_sizes.includes(d.tshirtSize)) {
    return Response.json(
      { error: "Please choose a T-shirt size from the list.", field: "tshirtSize" },
      { status: 400 }
    );
  }

  // Check 4: who do we contact?
  // Under 18 on race day: the runner's own phone/email are NOT used. The
  // parent/guardian's name, phone and email are required, and the
  // confirmation WhatsApp and email go to the guardian.
  // 18 or older: the runner's own phone and email are required.
  const isMinor = age < 18;
  let guardianName: string | null = null;
  let guardianPhone: string | null = null;
  let guardianEmail: string | null = null;
  let emergencyName: string | null = null;
  let emergencyPhone: string | null = null;
  let contactPhone: string;
  let contactEmail: string;

  if (isMinor) {
    const gPhone = cleanPhone(d.guardianPhone);
    if (d.guardianName.length < 2) {
      return Response.json(
        { error: "Participants under 18 need a parent or guardian's name.", field: "guardianName" },
        { status: 400 }
      );
    }
    if (!isValidPhone(gPhone)) {
      return Response.json(
        {
          error: "Please enter a valid 10-digit mobile number for the parent or guardian.",
          field: "guardianPhone",
        },
        { status: 400 }
      );
    }
    if (!isValidEmail(d.guardianEmail)) {
      return Response.json(
        { error: "Please enter a valid email address for the parent or guardian.", field: "guardianEmail" },
        { status: 400 }
      );
    }
    guardianName = d.guardianName;
    guardianPhone = gPhone;
    guardianEmail = d.guardianEmail;
    contactPhone = gPhone;
    contactEmail = d.guardianEmail;
  } else {
    const ownPhone = cleanPhone(d.phone);
    if (!isValidPhone(ownPhone)) {
      return Response.json(
        { error: "Please enter a valid 10-digit mobile number.", field: "phone" },
        { status: 400 }
      );
    }
    if (!isValidEmail(d.email)) {
      return Response.json(
        { error: "Please enter a valid email address.", field: "email" },
        { status: 400 }
      );
    }
    contactPhone = ownPhone;
    contactEmail = d.email;
  }

  // Emergency contact: required for every runner, any age
  {
    const ePhone = cleanPhone(d.emergencyPhone);
    if (d.emergencyName.length < 2) {
      return Response.json(
        { error: "Please enter an emergency contact name.", field: "emergencyName" },
        { status: 400 }
      );
    }
    if (!isValidPhone(ePhone)) {
      return Response.json(
        {
          error:
            "Please enter a valid 10-digit mobile number for the emergency contact (it must start with 6, 7, 8 or 9).",
          field: "emergencyPhone",
        },
        { status: 400 }
      );
    }
    emergencyName = d.emergencyName;
    emergencyPhone = ePhone;
  }

  const isPaid = category.price_paise > 0;

  // Check 5: too many unfinished payment attempts from one email? (slows abuse)
  if (isPaid) {
    const recent = await sql`
      select count(*)::int as n
      from registrations
      where lower(email) = ${contactEmail}
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
        guardian_name, guardian_phone, guardian_email, consent_terms, consent_messages,
        consent_updates, amount_paise, status
      )
      select
        ${d.categoryId}, ${d.fullName}, ${d.dateOfBirth}::date, ${d.gender},
        ${contactPhone}, ${contactEmail}, ${d.city}, ${d.state}, ${d.tshirtSize},
        ${emergencyName}::text, ${emergencyPhone}::text,
        ${d.bloodGroup || null}::text,
        ${guardianName}::text, ${guardianPhone}::text, ${guardianEmail}::text,
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
    after(() => sendNotifications(registrationId));
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