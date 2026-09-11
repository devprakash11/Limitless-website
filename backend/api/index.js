import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { ZodError } from "zod";
import { randomUUID } from "node:crypto";
import { env, allowedOrigins } from "../config/env.js";
import { contactRouter } from "../routes/contact.js";

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

app.get("/", (_req, res) => res.json({
  success: true,
  name: "Limitless Design Contact API",
  version: "1.0.0",
}));

app.get("/health", (_req, res) => res.json({
  success: true,
  status: "healthy",
  timestamp: new Date().toISOString(),
}));

app.use("/api/contact", contactLimiter, contactRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    requestId: req.requestId,
  });
});

app.use((err, req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
      requestId: req.requestId,
    });
  }

  const status = Number(err.statusCode || err.status || 500);
  const safeStatus = status >= 400 && status < 600 ? status : 500;
  if (safeStatus >= 500) console.error(`[${req.requestId}]`, err);

  return res.status(safeStatus).json({
    success: false,
    message: safeStatus < 500 ? err.message || "Request failed" : "Internal server error",
    requestId: req.requestId,
  });
});

if (process.env.VERCEL !== "1") {
  app.listen(env.PORT, () => console.log(`Limitless Contact API running on :${env.PORT}`));
}

export default app;
