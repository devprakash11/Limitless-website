import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  ALLOWED_ORIGINS: z.string().default(""),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  GMAIL_USER: z.string().email().optional(),
  GMAIL_APP_PASSWORD: z.string().min(1).optional(),
  // Cloudinary — required only when the upload routes are used
  CLOUDINARY_CLOUD_NAME: z.string().min(1).optional(),
  CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),
  CLOUDINARY_FOLDER: z.string().default("limitless"),
  MAX_UPLOAD_MB: z.coerce.number().int().positive().default(10),
});

export const env = schema.parse(process.env);

export const allowedOrigins = [
  env.FRONTEND_URL,
  ...env.ALLOWED_ORIGINS
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
];

export const mailConfigured = Boolean(
  env.GMAIL_USER && env.GMAIL_APP_PASSWORD,
);