import { after } from "next/server";
import { verifyCheckoutSignature } from "../../../../lib/razorpay";
import { markPaid, registrationCode } from "../../../../lib/payment";
import { sendNotifications } from "../../../../lib/notify";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { orderId?: unknown; paymentId?: unknown; signature?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { orderId, paymentId, signature } = body;
  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    typeof signature !== "string"
  ) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyCheckoutSignature(orderId, paymentId, signature)) {
    return Response.json(
      { error: "We could not verify this payment." },
      { status: 400 }
    );
  }

  const result = await markPaid(orderId, paymentId, null);

  if (result.result === "paid" || result.result === "already_paid") {
    const id = result.registrationId;
    after(() => sendNotifications(id));
    return Response.json({ ok: true, registrationCode: registrationCode(id) });
  }

  if (result.result === "duplicate_person") {
    return Response.json(
      {
        error:
          "Your payment was received, but this person is already registered for this category. Please contact the organisers and we will refund the extra payment.",
      },
      { status: 409 }
    );
  }

  return Response.json(
    {
      error:
        "We could not match your payment yet. Please do not pay again. If money was deducted, contact the organisers with your payment details.",
    },
    { status: 404 }
  );
}