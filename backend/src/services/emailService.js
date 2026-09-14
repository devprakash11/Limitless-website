import { Resend } from "resend";
import { env } from "../config/env.js";

export async function sendContactNotification(contact) {
  if (!env.resendApiKey || !env.contactEmail) throw new Error("Email service is not configured.");

  const resend = new Resend(env.resendApiKey);
  const { error } = await resend.emails.send({
    from: env.resendFromEmail,
    to: [env.contactEmail],
    replyTo: contact.email,
    subject: `New Limitless Design enquiry: ${contact.service}`,
    text: [
      "New contact enquiry",
      "",
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      `Phone: ${contact.phone || "Not provided"}`,
      `Service: ${contact.service}`,
      "",
      "Message:",
      contact.message,
    ].join("\n"),
    html: `
      <h2>New Limitless Design enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(contact.phone || "Not provided")}</p>
      <p><strong>Service:</strong> ${escapeHtml(contact.service)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(contact.message).replaceAll("\n", "<br>")}</p>
    `,
  });

  if (error) throw new Error(`Unable to send notification email: ${error.message}`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
