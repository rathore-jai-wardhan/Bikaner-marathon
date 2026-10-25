import { sql } from "./db";

export type PaidResult =
  | { result: "paid"; registrationId: string }
  | { result: "already_paid"; registrationId: string }
  | { result: "duplicate_person" }
  | { result: "amount_mismatch" }
  | { result: "not_found" };

// A short, friendly reference like BM-1A2B3C4D
export function registrationCode(id: string): string {
  return "BM-" + id.slice(0, 8).toUpperCase();
}

// Marks a registration as paid. Safe to call more than once for the same payment.
export async function markPaid(
  orderId: string,
  paymentId: string,
  amountPaise: number | null
): Promise<PaidResult> {
  const found = await sql`
    select id, status, amount_paise
    from registrations
    where razorpay_order_id = ${orderId}
  `;
  const reg = found[0];
  if (!reg) return { result: "not_found" };
  if (reg.status === "paid") {
    return { result: "already_paid", registrationId: reg.id };
  }

  // The amount Razorpay says was paid must match the price we stored
  if (amountPaise !== null && amountPaise !== reg.amount_paise) {
    console.error("Amount mismatch", { orderId, paymentId });
    return { result: "amount_mismatch" };
  }

  try {
    const rows = await sql`
      update registrations
      set status = 'paid', razorpay_payment_id = ${paymentId}, paid_at = now()
      where id = ${reg.id} and status = 'pending'
      returning id
    `;
    if (rows.length > 0) return { result: "paid", registrationId: reg.id };

    const again = await sql`select status from registrations where id = ${reg.id}`;
    if (again[0]?.status === "paid") {
      return { result: "already_paid", registrationId: reg.id };
    }
    return { result: "not_found" };
  } catch (err) {
    const code = (err as { code?: string }).code;
    if (code === "23505") {
      // Same person already has a confirmed registration: needs a manual refund
      console.error("DUPLICATE PAYMENT, refund needed", { orderId, paymentId });
      await sql`
        update registrations
        set razorpay_payment_id = ${paymentId}
        where id = ${reg.id} and razorpay_payment_id is null
      `.catch(() => undefined);
      return { result: "duplicate_person" };
    }
    throw err;
  }
}