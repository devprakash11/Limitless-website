import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

if (env.nodeEnv === "production") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server tools and same-origin requests with no Origin header.
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (env.clientOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS."));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
    maxAge: 86_400
  })
);

app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "limitless-design-contact-api"
  });
});

app.use("/api/contact", contactRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found."
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error?.message === "Origin is not allowed by CORS.") {
    return res.status(403).json({
      success: false,
      message: "This website origin is not allowed to use the contact API."
    });
  }

  return res.status(500).json({
    success: false,
    message: "The requirement could not be submitted. Please try again."
  });
});

export default app;
