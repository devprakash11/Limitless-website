import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  ALLOWED_ORIGINS: z.string().default(""),
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  CLOUDINARY_FOLDER: z.string().min(1).default("limitless-design"),
  MAX_UPLOAD_MB: z.coerce.number().int().positive().max(25).default(8),
  GMAIL_USER: z.string().email().optional(),
  GMAIL_APP_PASSWORD: z.string().min(1).optional(),
});

export const env = schema.parse(process.env);

export const allowedOrigins = [
  env.FRONTEND_URL,
  ...env.ALLOWED_ORIGINS.split(",").map((value) => value.trim()).filter(Boolean),
];
