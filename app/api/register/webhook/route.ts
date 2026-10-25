import { after } from "next/server";
import { sql } from "../../../../lib/db";
import { verifyWebhookSignature } from "../../../../lib/razorpay";
import { markPaid } from "../../../../lib/payment";
import { sendConfirmation } from "../../../../lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PaymentEntity = { id?: string; order_id?: string; amount?: number };

export async function POST(request: Request) {
  // We need the exact raw text to check the signature
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    return new Response("Invalid signature", { status: 400 });
  }

  let event: {
    event?: string;
    payload?: { payment?: { entity?: PaymentEntity } };
  };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  // Only successful payments matter to us
  if (event.event !== "payment.captured" && event.event !== "order.paid") {
    return new Response("Ignored", { status: 200 });
  }

  const payment = event.payload?.payment?.entity;
  if (!payment?.id || !payment.order_id) {
    return new Response("No payment details", { status: 200 });
  }

  const result = await markPaid(
    payment.order_id,
    payment.id,
    typeof payment.amount === "number" ? payment.amount : null
  );

  if (result.result === "paid" || result.result === "already_paid") {
    const id = result.registrationId;
    after(() => sendConfirmation(id));
  }

  // Keep a log of events we handled
  const eventId = request.headers.get("x-razorpay-event-id");
  if (eventId) {
    await sql`
      insert into webhook_events (event_id) values (${eventId})
      on conflict do nothing
    `;
  }

  return new Response("OK", { status: 200 });
}