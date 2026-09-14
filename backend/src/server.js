import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

const allowedOrigins = env.frontendUrl.split(",").map((origin) => origin.trim()).filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS."));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"],
}));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: false, limit: "20kb" }));

app.get("/", (_req, res) => {
  res.json({ success: true, service: "Limitless Design Contact API", status: "ok" });
});

app.get("/health", (_req, res) => {
  res.json({ success: true, status: "healthy" });
});

app.use("/api/contact", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use((error, _req, res, _next) => {
  console.error("[api]", error);
  const status = error.message === "Origin is not allowed by CORS." ? 403 : 500;
  res.status(status).json({
    success: false,
    message: status === 403 ? "Origin is not allowed." : "Something went wrong. Please try again later.",
  });
});

if (process.env.VERCEL !== "1") {
  app.listen(env.port, () => {
    console.log(`Limitless Design Contact API running on port ${env.port}`);
  });
}

export default app;
