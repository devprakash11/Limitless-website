const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

export function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      ...JSON_HEADERS,
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

export function successResponse(data = {}) {
  return jsonResponse(200, {
    success: true,
    ...data,
  });
}

export function errorResponse(
  statusCode,
  error = "Unable to process your request."
) {
  return jsonResponse(statusCode, {
    success: false,
    error,
  });
}
