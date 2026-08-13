import nodemailer from "nodemailer";

let transporter;

function getRequiredEnvironmentVariable(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getMailAccount() {
  return getRequiredEnvironmentVariable("GMAIL_USER");
}

export function getMailer() {
  if (transporter) {
    return transporter;
  }

  const user = getMailAccount();
  const pass = getRequiredEnvironmentVariable("GMAIL_APP_PASSWORD");

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}
