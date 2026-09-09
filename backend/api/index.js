import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { randomUUID } from "node:crypto";
import { env, allowedOrigins } from "../config/env.js";
import { publicRouter } from "../routes/public.js";
import { contactRouter } from "../routes/contact.js";
import { authRouter } from "../routes/auth.js";
import { adminRouter } from "../routes/admin.js";
import { clientRouter } from "../routes/client.js";
import { uploadRouter } from "../routes/uploads.js";
import { supabaseAdmin } from "../config/supabase.js";
import { notFound, errorHandler } from "../middleware/error.js";

const app = express();
app.set("trust proxy", 1);

app.use((req, res, next) => {
  const requestId = req.headers["x-request-id"] || randomUUID();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  next();
});

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    const error = new Error("Origin is not allowed by CORS");
    error.statusCode = 403;
    return callback(error);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-Request-ID"],
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many contact submissions. Please try again later.",
  },
});

app.use(apiLimiter);

app.get("/", (_req, res) => res.json({
  success: true,
  name: "Limitless Design API",
  version: "3.1.0",
}));

app.get("/health", (_req, res) => res.json({
  success: true,
  status: "healthy",
  timestamp: new Date().toISOString(),
}));

app.get("/health/ready", async (_req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from("services")
      .select("id", { head: true, count: "exact" });

    if (error) throw error;

    return res.json({
      success: true,
      status: "ready",
      services: { supabase: "ok", api: "ok" },
    });
  } catch (error) {
    return next(error);
  }
});

app.use("/api", publicRouter);
app.use("/api/contact", contactLimiter, contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/client", clientRouter);
app.use("/api/uploads", uploadRouter);

app.use(notFound);
app.use(errorHandler);

if (process.env.VERCEL !== "1") {
  app.listen(env.PORT, () => console.log(`Limitless API running on :${env.PORT}`));
}

export default app;
