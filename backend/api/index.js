import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
import { publicRouter } from "../routes/public.js";
import { authRouter } from "../routes/auth.js";
import { contactRouter } from "../routes/contact.js";
import { uploadRouter } from "../routes/uploads.js";
import { adminRouter } from "../routes/admin.js";
import { clientRouter } from "../routes/client.js";
import { notFound, errorHandler } from "../middleware/error.js";

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true, methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

app.get("/", (req, res) => res.json({ success: true, name: "Limitless Design API", version: "2.0.0" }));
app.get("/health", (req, res) => res.json({ success: true, status: "healthy", timestamp: new Date().toISOString() }));
app.use("/api/auth", authRouter);
app.use("/api", publicRouter);
app.use("/api/contact", contactRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/admin", adminRouter);
app.use("/api/client", clientRouter);

app.use(notFound);
app.use(errorHandler);

if (process.env.VERCEL !== "1") app.listen(env.PORT, () => console.log(`Limitless API running on :${env.PORT}`));
export default app;
