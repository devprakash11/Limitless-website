export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Route not found" });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = Number(err.statusCode || err.status || 500);
  res.status(status >= 400 && status < 600 ? status : 500).json({
    success: false,
    message: status < 500 ? err.message || "Request failed" : "Internal server error",
  });
}
