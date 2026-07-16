import "dotenv/config";
import bcrypt from "bcryptjs";
import pg from "pg";

const { Pool } = pg;
const [, , emailArg, passwordArg] = process.argv;
if (!emailArg || !passwordArg) {
  console.error("Usage: npm run create-admin -- admin@example.com StrongPassword123!");
  process.exit(1);
}
if (passwordArg.length < 12) {
  console.error("Admin password must contain at least 12 characters.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false
});

try {
  const hash = await bcrypt.hash(passwordArg, 12);
  const result = await pool.query(`INSERT INTO admins (email,password_hash)
    VALUES ($1,$2) ON CONFLICT (email) DO UPDATE SET password_hash=EXCLUDED.password_hash
    RETURNING id,email,role`, [emailArg.trim().toLowerCase(), hash]);
  console.log("Admin created or updated:", result.rows[0]);
} catch (error) {
  console.error("Unable to create admin:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
