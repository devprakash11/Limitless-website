import "dotenv/config";
import crypto from "node:crypto";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pg from "pg";
import { rateLimit } from "express-rate-limit";
import nodemailer from "nodemailer";
import { z } from "zod";

const { Pool } = pg;

const bool = z.enum(["true", "false"]).default("false").transform(v => v === "true");
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  FRONTEND_URLS: z.string().default("http://localhost:5173"),
  DATABASE_URL: z.string().min(1),
  DATABASE_SSL: bool,
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default("8h"),
  IP_HASH_SALT: z.string().min(16),
  SMTP_ENABLED: bool,
  SMTP_HOST: z.string().optional().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().int().positive().default(465),
  SMTP_SECURE: bool,
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  SMTP_FROM_NAME: z.string().optional().default("Limitless Design"),
  SMTP_FROM_EMAIL: z.string().email().optional().default("help.limitlessdesign@gmail.com"),
  CONTACT_TO_EMAIL: z.string().email().default("help.limitlessdesign@gmail.com"),
  TURNSTILE_REQUIRED: bool,
  TURNSTILE_SECRET_KEY: z.string().optional().default("")
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("Invalid environment variables:\n", z.prettifyError(parsedEnv.error));
  process.exit(1);
}

const env = {
  ...parsedEnv.data,
  frontendUrls: parsedEnv.data.FRONTEND_URLS.split(",").map(v => v.trim()).filter(Boolean)
};

if (env.SMTP_ENABLED && (!env.SMTP_USER || !env.SMTP_PASS)) {
  console.error(
    "SMTP_ENABLED is true, but SMTP_USER or SMTP_PASS is missing."
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: env.DATABASE_SSL ? { rejectUnauthorized: false } : false
});

pool.on("error", error => console.error("PostgreSQL pool error:", error));
const query = (text, params = []) => pool.query(text, params);
const smtpTransporter = env.SMTP_ENABLED
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000
    })
  : null;

const allowedServices = [
  "Logo Design",
  "Social Media Banner",
  "Photo Frame Design",
  "Poster Design",
  "Business Card Design",
  "Branding Materials",
  "UI Design",
  "Custom Creative Work"
];

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).regex(/^[0-9+\-\s()]*$/).optional().default(""),
  service: z.enum(allowedServices),
  message: z.string().trim().min(20).max(3000),
  sourceUrl: z.string().url().max(1000).optional().or(z.literal("")),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().max(4000).optional().default("")
});

const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(200)
});

const statusSchema = z.object({
  status: z.enum(["new", "contacted", "in_progress", "completed", "closed"])
});

const designSchema = z.object({
  slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(2).max(180),
  category: z.string().trim().min(2).max(100),
  imageUrl: z.string().url().max(2000),
  creator: z.string().trim().min(2).max(120).default("Limitless Design"),
  description: z.string().trim().max(4000).default(""),
  tags: z.array(z.string().trim().min(1).max(80)).max(20).default([]),
  specifications: z.array(z.object({ label: z.string().trim().min(1).max(100), value: z.string().trim().min(1).max(500) })).max(30).default([]),
  formats: z.array(z.object({
    id: z.string().trim().min(1).max(180),
    label: z.string().trim().min(1).max(50),
    size: z.string().trim().max(100).optional().default(""),
    mode: z.string().trim().max(100).optional().default(""),
    url: z.string().url().optional()
  })).max(20).default([]),
  published: z.boolean().default(true)
});

const designUpdateSchema = designSchema.partial();
const downloadSchema = z.object({
  designId: z.string().uuid().optional().nullable(),
  designSlug: z.string().trim().min(2).max(180),
  fileFormat: z.string().trim().min(1).max(40)
});

class HttpError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const hashIp = ip => ip ? crypto.createHash("sha256").update(`${ip}:${env.IP_HASH_SALT}`).digest("hex") : null;
const escapeHtml = value => String(value ?? "")
  .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;").replaceAll("'", "&#039;");

async function verifyTurnstile(token, remoteIp) {
  if (!env.TURNSTILE_REQUIRED) return true;
  if (!env.TURNSTILE_SECRET_KEY) throw new HttpError(500, "Turnstile secret key is missing.");
  if (!token) throw new HttpError(400, "Please complete the security verification.");

  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: controller.signal
    });
    const result = await response.json();
    if (!result.success) throw new HttpError(400, "Security verification failed.", result["error-codes"]);
    return true;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function sendInquiryEmail(inquiry) {
  if (!smtpTransporter) {
    return { status: "skipped", error: null };
  }

  if (!env.SMTP_USER || !env.SMTP_PASS) {
    return {
      status: "failed",
      error: "SMTP is enabled, but SMTP_USER or SMTP_PASS is missing."
    };
  }

  const safe = {
    id: escapeHtml(inquiry.id),
    name: escapeHtml(inquiry.name),
    email: escapeHtml(inquiry.email),
    phone: escapeHtml(inquiry.phone || "Not provided"),
    service: escapeHtml(inquiry.service),
    message: escapeHtml(inquiry.message).replaceAll("\n", "<br />")
  };

  try {
    const result = await smtpTransporter.sendMail({
      from: {
        name: env.SMTP_FROM_NAME,
        address: env.SMTP_FROM_EMAIL
      },
      to: env.CONTACT_TO_EMAIL,
      replyTo: inquiry.email,
      subject: `New ${inquiry.service} requirement from ${inquiry.name}`,
      text: [
        "New project requirement",
        `Reference: ${inquiry.id}`,
        `Name: ${inquiry.name}`,
        `Email: ${inquiry.email}`,
        `Phone: ${inquiry.phone || "Not provided"}`,
        `Service: ${inquiry.service}`,
        "",
        "Project details:",
        inquiry.message
      ].join("\n"),
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#101828">
        <h2>New project requirement</h2>
        <p><strong>Reference:</strong> ${safe.id}</p>
        <p><strong>Name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        <p><strong>Service:</strong> ${safe.service}</p>
        <h3>Project details</h3>
        <p style="line-height:1.7">${safe.message}</p>
      </div>`
    });

    return {
      status: "sent",
      id: result.messageId || null,
      error: null
    };
  } catch (error) {
    return {
      status: "failed",
      error: error.message
    };
  }
}

function requireAdmin(req, _res, next) {
  const authorization = req.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) return next(new HttpError(401, "Authentication required."));
  try {
    req.admin = jwt.verify(authorization.slice(7).trim(), env.JWT_SECRET);
    next();
  } catch {
    next(new HttpError(401, "Invalid or expired authentication token."));
  }
}

function mapDesign(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    image: row.image_url,
    creator: row.creator,
    description: row.description,
    tags: row.tags,
    specifications: row.specifications,
    formats: row.formats,
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

const app = express();
app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || env.frontendUrls.includes(origin)) return callback(null, true);
    const error = new Error("This website origin is not allowed.");
    error.statusCode = 403;
    callback(error);
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400
}));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: "draft-8", legacyHeaders: false }));

const inquiryLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 8, standardHeaders: "draft-8", legacyHeaders: false });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: "draft-8", legacyHeaders: false });
const downloadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: "draft-8", legacyHeaders: false });

app.get("/api/health", (_req, res) => res.json({
  success: true,
  service: "Limitless Design API",
  smtpConfigured: Boolean(smtpTransporter),
  timestamp: new Date().toISOString()
}));

app.post("/api/inquiries", inquiryLimiter, asyncHandler(async (req, res) => {
  const data = inquirySchema.parse(req.body);
  if (data.website) return res.status(201).json({ success: true, message: "Requirement submitted successfully." });
  await verifyTurnstile(data.turnstileToken, req.ip);

  const result = await query(`INSERT INTO inquiries (name,email,phone,service,message,source_url)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.name, data.email.toLowerCase(), data.phone || null, data.service, data.message, data.sourceUrl || null]);

  const inquiry = result.rows[0];
  const notification = await sendInquiryEmail(inquiry);
  await query(`UPDATE inquiries SET email_notification_status=$1,email_error=$2 WHERE id=$3`,
    [notification.status, notification.error, inquiry.id]);

  res.status(201).json({
    success: true,
    message: "Your requirement has been submitted successfully.",
    data: { reference: inquiry.id, notificationStatus: notification.status }
  });
}));

app.get("/api/designs", asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 24, 1), 100);
  const offset = (page - 1) * limit;
  const category = req.query.category?.trim() || "";
  const values = [];
  let condition = "";
  if (category) { values.push(category); condition = `AND category=$${values.length}`; }
  values.push(limit, offset);
  const result = await query(`SELECT * FROM designs WHERE published=TRUE ${condition}
    ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`, values);
  res.json({ success: true, data: result.rows.map(mapDesign), pagination: { page, limit } });
}));

app.get("/api/designs/:slug", asyncHandler(async (req, res) => {
  const result = await query("SELECT * FROM designs WHERE slug=$1 AND published=TRUE LIMIT 1", [req.params.slug]);
  if (!result.rows[0]) throw new HttpError(404, "Design not found.");
  res.json({ success: true, data: mapDesign(result.rows[0]) });
}));

app.post("/api/downloads/log", downloadLimiter, asyncHandler(async (req, res) => {
  const data = downloadSchema.parse(req.body);
  await query(`INSERT INTO download_events (design_id,design_slug,file_format,ip_hash,user_agent)
    VALUES ($1,$2,$3,$4,$5)`,
    [data.designId || null, data.designSlug, data.fileFormat, hashIp(req.ip), req.get("user-agent")?.slice(0, 1000) || null]);
  res.status(201).json({ success: true });
}));

app.post("/api/admin/login", loginLimiter, asyncHandler(async (req, res) => {
  const data = loginSchema.parse(req.body);
  const result = await query("SELECT id,email,password_hash,role FROM admins WHERE LOWER(email)=LOWER($1) LIMIT 1", [data.email]);
  const admin = result.rows[0];
  if (!admin || !(await bcrypt.compare(data.password, admin.password_hash))) throw new HttpError(401, "Invalid email or password.");
  const token = jwt.sign({ sub: admin.id, email: admin.email, role: admin.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  res.json({ success: true, data: { token, admin: { id: admin.id, email: admin.email, role: admin.role } } });
}));

app.use("/api/admin", requireAdmin);

app.get("/api/admin/stats", asyncHandler(async (_req, res) => {
  const [inq, des, down] = await Promise.all([
    query(`SELECT COUNT(*)::INTEGER total,
      COUNT(*) FILTER (WHERE status='new')::INTEGER new_count,
      COUNT(*) FILTER (WHERE status='in_progress')::INTEGER in_progress_count,
      COUNT(*) FILTER (WHERE status='completed')::INTEGER completed_count FROM inquiries`),
    query(`SELECT COUNT(*)::INTEGER total, COUNT(*) FILTER (WHERE published=TRUE)::INTEGER published FROM designs`),
    query(`SELECT COUNT(*)::INTEGER total FROM download_events`)
  ]);
  res.json({ success: true, data: { inquiries: inq.rows[0], designs: des.rows[0], downloads: down.rows[0] } });
}));

app.get("/api/admin/inquiries", asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  const offset = (page - 1) * limit;
  const status = req.query.status || "";
  const values = [];
  let where = "";
  if (status) { values.push(status); where = `WHERE status=$${values.length}`; }
  values.push(limit, offset);
  const rows = await query(`SELECT * FROM inquiries ${where} ORDER BY created_at DESC
    LIMIT $${values.length - 1} OFFSET $${values.length}`, values);
  const count = await query(`SELECT COUNT(*)::INTEGER total FROM inquiries ${where}`, status ? [status] : []);
  res.json({ success: true, data: rows.rows, pagination: { page, limit, total: count.rows[0].total, totalPages: Math.ceil(count.rows[0].total / limit) } });
}));

app.patch("/api/admin/inquiries/:id/status", asyncHandler(async (req, res) => {
  const { status } = statusSchema.parse(req.body);
  const result = await query("UPDATE inquiries SET status=$1 WHERE id=$2 RETURNING *", [status, req.params.id]);
  if (!result.rows[0]) throw new HttpError(404, "Inquiry not found.");
  res.json({ success: true, message: "Inquiry status updated.", data: result.rows[0] });
}));

app.post("/api/admin/designs", asyncHandler(async (req, res) => {
  const d = designSchema.parse(req.body);
  const result = await query(`INSERT INTO designs
    (slug,title,category,image_url,creator,description,tags,specifications,formats,published)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8::JSONB,$9::JSONB,$10) RETURNING *`,
    [d.slug,d.title,d.category,d.imageUrl,d.creator,d.description,d.tags,JSON.stringify(d.specifications),JSON.stringify(d.formats),d.published]);
  res.status(201).json({ success: true, message: "Design created.", data: mapDesign(result.rows[0]) });
}));

app.patch("/api/admin/designs/:id", asyncHandler(async (req, res) => {
  const d = designUpdateSchema.parse(req.body);
  const oldResult = await query("SELECT * FROM designs WHERE id=$1 LIMIT 1", [req.params.id]);
  const old = oldResult.rows[0];
  if (!old) throw new HttpError(404, "Design not found.");
  const merged = {
    slug: d.slug ?? old.slug, title: d.title ?? old.title, category: d.category ?? old.category,
    imageUrl: d.imageUrl ?? old.image_url, creator: d.creator ?? old.creator,
    description: d.description ?? old.description, tags: d.tags ?? old.tags,
    specifications: d.specifications ?? old.specifications, formats: d.formats ?? old.formats,
    published: d.published ?? old.published
  };
  const result = await query(`UPDATE designs SET slug=$1,title=$2,category=$3,image_url=$4,creator=$5,
    description=$6,tags=$7,specifications=$8::JSONB,formats=$9::JSONB,published=$10 WHERE id=$11 RETURNING *`,
    [merged.slug,merged.title,merged.category,merged.imageUrl,merged.creator,merged.description,merged.tags,
      JSON.stringify(merged.specifications),JSON.stringify(merged.formats),merged.published,req.params.id]);
  res.json({ success: true, message: "Design updated.", data: mapDesign(result.rows[0]) });
}));

app.delete("/api/admin/designs/:id", asyncHandler(async (req, res) => {
  const result = await query("DELETE FROM designs WHERE id=$1 RETURNING id", [req.params.id]);
  if (!result.rows[0]) throw new HttpError(404, "Design not found.");
  res.json({ success: true, message: "Design deleted." });
}));

app.use((req, _res, next) => next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`)));
app.use((error, _req, res, _next) => {
  if (error instanceof z.ZodError) return res.status(400).json({ success: false, message: "Please correct the submitted information.", errors: error.flatten().fieldErrors });
  const status = error.statusCode || 500;
  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, message: status >= 500 ? "An unexpected server error occurred." : error.message, details: status < 500 ? error.details : undefined });
});

let server;
async function start() {
  try {
    const db = await query("SELECT NOW() AS current_time");
    console.log("Database connected:", db.rows[0].current_time);
    server = app.listen(env.PORT, () => console.log(`Limitless Design API: http://localhost:${env.PORT}`));
  } catch (error) {
    console.error("Unable to start API:", error);
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.log(`${signal} received. Closing API...`);
  if (server) server.close(async () => { await pool.end(); process.exit(0); });
  else { await pool.end(); process.exit(0); }
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
start();
