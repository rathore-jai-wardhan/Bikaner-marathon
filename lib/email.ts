import { sql } from "./db";
import { registrationCode } from "./payment";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sendViaResend(apiKey: string, body: Record<string, unknown>): Promise<Response> {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
}

// Sends the confirmation email once per registration.
export async function sendConfirmation(registrationId: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    console.log("Email is not configured yet, skipping confirmation email.");
    return;
  }

  // Claim the email so it can only be sent once
  const rows = await sql`
    update registrations as r
    set confirmation_sent_at = now()
    from categories as c
    where r.id = ${registrationId}
      and c.id = r.category_id
      and r.confirmation_sent_at is null
      and r.status in ('paid', 'confirmed_free')
    returning r.full_name, r.guardian_name, r.email, r.amount_paise,
              c.name as category_name
  `;
  const reg = rows[0];
  if (!reg) return;

  const code = registrationCode(registrationId);
  const greetingName = esc(String(reg.guardian_name ?? reg.full_name));
  const runner = esc(String(reg.full_name));
  const category = esc(String(reg.category_name));
  const paid =
    reg.amount_paise > 0 ? `Amount paid: Rs ${reg.amount_paise / 100}` : "Free registration";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: auto;">
      <h2>Registration confirmed</h2>
      <p>Hello ${greetingName},</p>
      <p><strong>${runner}</strong> is registered for the <strong>${category}</strong>
      at the Bikaner Marathon on 27 December 2026.</p>
      <p><strong>Registration ID:</strong> ${code}<br/>${esc(paid)}</p>
      <p>We will share bib collection and race-day details closer to the date.
      Please keep this email for your records.</p>
      <p>See you at the start line!<br/>Team Bikaner Marathon</p>
    </div>`;

  const text =
    `Registration confirmed\n\n${runner} is registered for the ${category} ` +
    `at the Bikaner Marathon on 27 December 2026.\n` +
    `Registration ID: ${code}\n${paid}\n\n` +
    `We will share bib collection and race-day details closer to the date.`;

  const subject = `Registration confirmed: ${reg.category_name}, Bikaner Marathon 2026`;
  const templateId = process.env.RESEND_TEMPLATE_ID;

  // Values for the Resend template. The keys must match the variable names in
  // the Resend template exactly: {{RUNNER_NAME}}, {{RACE_CATEGORY}},
  // {{REGISTRATION_ID}}, {{PAYMENT_STATUS}}
  const templateVariables: Record<string, string> = {
    RUNNER_NAME: String(reg.full_name),
    RACE_CATEGORY: String(reg.category_name),
    REGISTRATION_ID: code,
    PAYMENT_STATUS: reg.amount_paise > 0 ? `Paid (Rs ${reg.amount_paise / 100})` : "No payment required",
  };

  try {
    let res: Response | null = null;

    // 1st choice: your designed template stored in Resend
    if (templateId) {
      res = await sendViaResend(apiKey, {
        from,
        to: [reg.email],
        subject,
        template: { id: templateId, variables: templateVariables },
      });
      if (!res.ok) {
        // Most likely a variable-name mismatch or an unpublished template.
        // Log Resend's reason, then fall back so the runner still gets an email.
        console.error(
          "Resend template email failed, sending built-in email instead:",
          res.status,
          await res.text().catch(() => "")
        );
        res = null;
      }
    }

    // Fallback: the simple built-in email below
    if (!res) {
      res = await sendViaResend(apiKey, { from, to: [reg.email], subject, html, text });
    }

    if (!res.ok) throw new Error(`Email provider said ${res.status}: ${await res.text().catch(() => "")}`);
  } catch (err) {
    console.error("Confirmation email failed", err);
    // Release the claim so it can be retried
    await sql`
      update registrations set confirmation_sent_at = null where id = ${registrationId}
    `.catch(() => undefined);
  }
}