import nodemailer from "nodemailer";

let transporter;

export function getMailAccount() {
  return process.env.SMTP_USER || "";
}

export function getContactEmail() {
  return process.env.CONTACT_EMAIL || process.env.SMTP_USER || "";
}

export function isMailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.MAIL_FROM &&
      getContactEmail(),
  );
}

export function getMailer() {
  if (!isMailConfigured()) {
    console.error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM and CONTACT_EMAIL.",
    );
    return null;
  }

  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}
