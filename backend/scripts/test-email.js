import "dotenv/config";
import nodemailer from "nodemailer";

const required = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM_EMAIL",
  "CONTACT_TO_EMAIL"
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000
});

try {
  await transporter.verify();
  console.log("SMTP connection verified successfully.");

  const result = await transporter.sendMail({
    from: {
      name: process.env.SMTP_FROM_NAME || "Limitless Design",
      address: process.env.SMTP_FROM_EMAIL
    },
    to: process.env.CONTACT_TO_EMAIL,
    subject: "Limitless Design SMTP test",
    text: "Your Limitless Design SMTP email sender is working correctly.",
    html: "<p>Your <strong>Limitless Design SMTP email sender</strong> is working correctly.</p>"
  });

  console.log("Test email sent successfully:", result.messageId);
} catch (error) {
  console.error("SMTP test failed:", error.message);
  process.exitCode = 1;
} finally {
  transporter.close();
}
