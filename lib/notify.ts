import { sendConfirmation } from "./email";
import { sendWhatsAppConfirmation } from "./whatsapp";

// Sends the email and the WhatsApp message. They are independent: if one fails,
// the other still goes out, and a failure never undoes the registration.
export async function sendNotifications(registrationId: string): Promise<void> {
  const results = await Promise.allSettled([
    sendConfirmation(registrationId),
    sendWhatsAppConfirmation(registrationId),
  ]);
  for (const r of results) {
    if (r.status === "rejected") console.error("Notification error", r.reason);
  }
}