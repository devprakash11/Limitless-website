export function ok(res, data = null, message = "Success", status = 200) {
  return res.status(status).json({ success: true, message, data });
}

export function created(res, data, message = "Created successfully") {
  return ok(res, data, message, 201);
}

export function badRequest(message = "Invalid request") {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}
