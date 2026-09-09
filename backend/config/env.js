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
});

export const env = schema.parse(process.env);

export const allowedOrigins = [
  env.FRONTEND_URL,
  ...env.ALLOWED_ORIGINS.split(",").map((value) => value.trim()).filter(Boolean),
];

export const mailConfigured = Boolean(env.GMAIL_USER && env.GMAIL_APP_PASSWORD);
