import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.secure,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass
  },
  connectionTimeout: 15_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000
});

export const verifySmtpConnection = async () => {
  await transporter.verify();
};
