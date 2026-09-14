import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  if (!env.gmailUser || !env.gmailAppPassword) {
    throw new Error("Gmail SMTP is not configured.");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.gmailUser,
      pass: env.gmailAppPassword,
    },
  });

  return transporter;
}

export async function sendContactEmails(contact) {
  if (!env.contactEmail) {
    throw new Error("Admin contact email is not configured.");
  }

  const mailer = getTransporter();
  const escaped = {
    name: escapeHtml(contact.name),
    email: escapeHtml(contact.email),
    phone: escapeHtml(contact.phone || "Not provided"),
    service: escapeHtml(contact.service),
    message: escapeHtml(contact.message).replaceAll("\n", "<br>")
  };

  await Promise.all([
    mailer.sendMail({
      from: env.gmailUser,
      to: env.contactEmail,
      replyTo: contact.email,
      subject: `New Limitless Design enquiry: ${contact.service}`,
      text: buildAdminText(contact),
      html: `
        <h2>New Limitless Design enquiry</h2>
        <p><strong>Name:</strong> ${escaped.name}</p>
        <p><strong>Email:</strong> ${escaped.email}</p>
        <p><strong>Phone:</strong> ${escaped.phone}</p>
        <p><strong>Service:</strong> ${escaped.service}</p>
        <p><strong>Message:</strong></p>
        <p>${escaped.message}</p>
      `,
    }),
    mailer.sendMail({
      from: env.gmailUser,
      to: contact.email,
      subject: "We received your enquiry | Limitless Design",
      text: buildUserText(contact),
      html: `
        <h2>Thank you for contacting Limitless Design</h2>
        <p>Hi ${escaped.name},</p>
        <p>We have received your enquiry successfully.</p>
        <p><strong>Service:</strong> ${escaped.service}</p>
        <p>Our team will review your requirement and get back to you soon.</p>
        <p>Regards,<br>Limitless Design</p>
      `,
    }),
  ]);
}

function buildAdminText(contact) {
  return [
    "New Limitless Design enquiry",
    "",
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone || "Not provided"}`,
    `Service: ${contact.service}`,
    "",
    "Message:",
    contact.message,
  ].join("\n");
}

function buildUserText(contact) {
  return [
    `Hi ${contact.name},`,
    "",
    "Thank you for contacting Limitless Design.",
    "We have received your enquiry successfully.",
    `Service: ${contact.service}`,
    "",
    "Our team will review your requirement and get back to you soon.",
    "",
    "Regards,",
    "Limitless Design",
  ].join("\n");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
