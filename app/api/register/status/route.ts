import { sql } from "../../../../lib/db";
import { registrationCode } from "../../../../lib/payment";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Lets the registration page ask "has this payment been confirmed yet?".
// Used when the browser lost track of the payment (common on phones, where the
// UPI app takes over the screen) even though Razorpay's webhook confirmed it.
// It only answers for a Razorpay order ID, which is random and known only to the payer.
export async function GET(request: Request) {
  const orderId = new URL(request.url).searchParams.get("orderId") ?? "";
  if (!/^order_[A-Za-z0-9]{6,30}$/.test(orderId)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const rows = await sql`
    select id, status from registrations where razorpay_order_id = ${orderId}
  `;
  const reg = rows[0];
  if (!reg) return Response.json({ status: "unknown" });

  if (reg.status === "paid") {
    return Response.json({ status: "paid", registrationCode: registrationCode(String(reg.id)) });
  }
  return Response.json({ status: String(reg.status) });
}