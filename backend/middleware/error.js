import { ZodError } from "zod";
import multer from "multer";

export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Route not found", requestId: req.requestId });
}

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
      requestId: req.requestId,
    });
  }

  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return res.status(status).json({ success: false, message: err.message, requestId: req.requestId });
  }

  const status = Number(err.statusCode || err.status || 500);
  const safeStatus = status >= 400 && status < 600 ? status : 500;
  if (safeStatus >= 500) console.error(`[${req.requestId}]`, err);

  res.status(safeStatus).json({
    success: false,
    message: safeStatus < 500 ? err.message || "Request failed" : "Internal server error",
    requestId: req.requestId,
  });
}
