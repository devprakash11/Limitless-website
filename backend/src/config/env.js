import dotenv from "dotenv";

dotenv.config();

const requiredVariables = [
  "CLIENT_ORIGINS",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM_EMAIL",
  "ADMIN_EMAIL"
];

const missingVariables = requiredVariables.filter(
  (key) => !process.env[key]?.trim()
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVariables.join(", ")}. ` +
      "Create backend/.env from backend/.env.example and fill in every required value."
  );
}

const smtpPort = Number(process.env.SMTP_PORT);

if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
  throw new Error("SMTP_PORT must be a valid positive integer.");
}

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined) return defaultValue;
  return String(value).trim().toLowerCase() === "true";
};

const clientOrigins = process.env.CLIENT_ORIGINS.split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

if (clientOrigins.length === 0) {
  throw new Error("CLIENT_ORIGINS must contain at least one frontend origin.");
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  clientOrigins,
  smtp: {
    host: process.env.SMTP_HOST.trim(),
    port: smtpPort,
    secure: parseBoolean(process.env.SMTP_SECURE, smtpPort === 465),
    user: process.env.SMTP_USER.trim(),
    pass: process.env.SMTP_PASS.replace(/\s/g, "")
  },
  mail: {
    fromName: process.env.SMTP_FROM_NAME?.trim() || "Limitless Design Website",
    fromEmail: process.env.SMTP_FROM_EMAIL.trim(),
    adminEmail: process.env.ADMIN_EMAIL.trim(),
    sendCustomerConfirmation: parseBoolean(
      process.env.SEND_CUSTOMER_CONFIRMATION,
      true
    )
  }
});
