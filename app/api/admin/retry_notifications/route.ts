import { createHash, timingSafeEqual } from "crypto";
import { sql } from "../../../../lib/db";
import { sendNotifications } from "../../../../lib/notify";
import { registrationCode } from "../../../../lib/payment";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// Compares secrets without leaking their length or content through timing
function sameSecret(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

// Re-sends any MISSING confirmation (email and/or WhatsApp) to confirmed runners.
// Anything already sent is skipped, so it is safe to open this more than once.
// Usage: https://www.bikanermarathon.com/api/admin/resend-notifications?key=YOUR_ADMIN_SECRET
export async function GET(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  const key = new URL(request.url).searchParams.get("key") ?? "";
  if (!secret || secret.length < 16 || !sameSecret(key, secret)) {
    return new Response("Not found", { status: 404 });
  }

  const rows = await sql`
    select id from registrations
    where status in ('paid', 'confirmed_free')
      and (whatsapp_sent_at is null or confirmation_sent_at is null)
    order by created_at
    limit 50
  `;

  // One at a time, so we stay well inside WhatsApp's and Resend's rate limits
  for (const r of rows) {
    await sendNotifications(String(r.id));
  }

  const after = rows.length
    ? await sql`
        select id, full_name, confirmation_sent_at, whatsapp_sent_at, whatsapp_error
        from registrations
        where id = any(${rows.map((r) => String(r.id))}::uuid[])
        order by created_at
      `
    : [];

  return Response.json({
    attempted: rows.length,
    results: after.map((r) => ({
      code: registrationCode(String(r.id)),
      name: r.full_name,
      email: r.confirmation_sent_at ? "sent" : "NOT sent",
      whatsapp: r.whatsapp_sent_at ? "sent" : `NOT sent: ${r.whatsapp_error ?? "unknown"}`,
    })),
  });
}