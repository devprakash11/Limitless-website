import "dotenv/config";

const required = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "RESEND_API_KEY", "CONTACT_EMAIL"];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[env] Missing ${key}. The API will start, but contact submissions will fail until it is configured.`);
  }
}

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  contactEmail: process.env.CONTACT_EMAIL,
  resendFromEmail: process.env.RESEND_FROM_EMAIL || "Limitless Design <onboarding@resend.dev>",
};
