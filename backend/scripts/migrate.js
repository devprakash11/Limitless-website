import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false
});

try {
  const schema = await fs.readFile(path.resolve("database/schema.sql"), "utf8");
  await pool.query(schema);
  console.log("Database schema applied successfully.");
} catch (error) {
  console.error("Database migration failed:", error);
  process.exitCode = 1;
} finally {
  await pool.end();
}
