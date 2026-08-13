export function getOrigin(event) {
  return (
    event?.headers?.origin ||
    event?.headers?.Origin ||
    ""
  ).trim();
}

export function isOriginAllowed(event) {
  const allowedOrigin = (process.env.ALLOWED_ORIGIN || "").trim();

  // Keep this optional because:
  // - same-origin browser requests work without CORS
  // - Netlify previews/local development may use different origins
  // - Origin checks are only an additional layer, not authentication
  if (!allowedOrigin) {
    return true;
  }

  const origin = getOrigin(event);

  return origin === allowedOrigin;
}
