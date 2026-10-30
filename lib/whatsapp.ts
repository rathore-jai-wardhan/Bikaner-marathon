import { sql } from "./db";
import { registrationCode } from "./payment";
import { cleanPhone, isValidPhone } from "./phone";

// Meta's Graph API version. Meta retires old versions after a while;
// when that happens, change this one line (for example to "v24.0").
const GRAPH_VERSION = "v23.0";

// 10-digit Indian mobile -> the format WhatsApp wants: 91XXXXXXXXXX (no + sign)
export function toWhatsAppNumber(phone: string): string | null {
  const digits = cleanPhone(String(phone ?? ""));
  return isValidPhone(digits) ? `91${digits}` : null;
}

// WhatsApp rejects template values that are empty, contain line breaks or tabs,
// or contain 4+ spaces in a row.
export function cleanParam(value: unknown): string {
  const text = String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/ {2,}/g, " ")
    .trim()
    .slice(0, 200);
  return text || "-";
}

export function buildTemplatePayload(args: {
  to: string;
  templateName: string;
  languageCode: string;
  params: unknown[];
}) {
  return {
    messaging_product: "whatsapp",
    to: args.to,
    type: "template",
    template: {
      name: args.templateName,
      language: { code: args.languageCode },
      components: [
        {
          type: "body",
          parameters: args.params.map((p) => ({ type: "text", text: cleanParam(p) })),
        },
      ],
    },
  };
}

type SendResult = { ok: true; messageId: string | null } | { ok: false; error: string };

// Sends one template message through the WhatsApp Cloud API.
export async function sendTemplateMessage(
  payload: ReturnType<typeof buildTemplatePayload>,
  opts: { phoneNumberId: string; token: string; fetchFn?: typeof fetch }
): Promise<SendResult> {
  const doFetch = opts.fetchFn ?? fetch;
  try {
    const res = await doFetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${opts.phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${opts.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      }
    );
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const e = data?.error;
      return {
        ok: false,
        error: e ? `${e.code ?? res.status}: ${e.message ?? "unknown error"}` : `HTTP ${res.status}`,
      };
    }
    return { ok: true, messageId: data?.messages?.[0]?.id ?? null };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network error" };
  }
}

// Sends the WhatsApp confirmation once per registration.
// Same "claim first, release if it fails" pattern as the email.

export async function sendWhatsAppConfirmation(
  registrationId: string
): Promise<void> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  if (!token || !phoneNumberId || !templateName) {
    console.warn(
      "WhatsApp is not configured. Skipping confirmation."
    );
    return;
  }

  const languageCode =
    process.env.WHATSAPP_TEMPLATE_LANG || "en";

  // Claim the notification before sending to prevent
  // simultaneous requests from sending duplicate messages.
  const rows = await sql`
    UPDATE registrations AS r
    SET whatsapp_sent_at = NOW(),
        whatsapp_error = NULL
    FROM categories AS c
    WHERE r.id = ${registrationId}
      AND c.id = r.category_id
      AND r.whatsapp_sent_at IS NULL
      AND r.consent_messages = TRUE
      AND r.status IN ('paid', 'confirmed_free')
    RETURNING
      r.full_name,
      r.phone,
      r.status,
      c.name AS category_name
  `;

  const reg = rows[0];

  if (!reg) return;

  const release = async (error: string) => {
    console.error("WhatsApp confirmation failed:", error);

    await sql`
      UPDATE registrations
      SET whatsapp_sent_at = NULL,
          whatsapp_error = ${error.slice(0, 300)}
      WHERE id = ${registrationId}
    `.catch((dbError) => {
      console.error(
        "Could not release WhatsApp notification claim:",
        dbError
      );
    });
  };

  const to = toWhatsAppNumber(String(reg.phone ?? ""));

  if (!to) {
    await release(
      "Phone number is not a valid Indian mobile number"
    );
    return;
  }

  // Match the four variables in the approved WhatsApp template.
  const paymentStatus =
    reg.status === "paid"
      ? "Paid"
      : "No payment required";

  const result = await sendTemplateMessage(
    buildTemplatePayload({
      to,
      templateName,
      languageCode,
      params: [
        reg.full_name,             // {{1}} Runner name
        registrationCode(registrationId), // {{2}} Registration ID
        reg.category_name,         // {{3}} Race category
        paymentStatus,              // {{4}} Payment status
      ],
    }),
    {
      phoneNumberId,
      token,
    }
  );

  if (!result.ok) {
    await release(result.error);
    return;
  }

  if (result.messageId) {
    await sql`
      UPDATE registrations
      SET whatsapp_message_id = ${result.messageId}
      WHERE id = ${registrationId}
    `.catch((dbError) => {
      console.error(
        "WhatsApp message sent, but message ID could not be saved:",
        dbError
      );
    });
  }
}


