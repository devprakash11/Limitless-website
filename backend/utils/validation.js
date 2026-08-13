import { isAllowedService } from "../constants/services.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{8,20}$/;

export const MAX_BODY_BYTES = 16 * 1024;

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function parseJsonBody(event) {
  const rawBody = event?.body;

  if (typeof rawBody !== "string" || rawBody.length === 0) {
    return {
      ok: false,
      error: "Request body is required.",
    };
  }

  // event.body.length is characters, so Buffer.byteLength is used
  // to enforce a real byte limit.
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return {
      ok: false,
      statusCode: 413,
      error: "Request is too large.",
    };
  }

  try {
    return {
      ok: true,
      value: JSON.parse(rawBody),
    };
  } catch {
    return {
      ok: false,
      error: "Invalid request body.",
    };
  }
}

export function validateContactPayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      ok: false,
      error: "Invalid form submission.",
    };
  }

  const data = {
    name: cleanString(payload.name),
    email: cleanString(payload.email).toLowerCase(),
    phone: cleanString(payload.phone),
    service: cleanString(payload.service),
    message: cleanString(payload.message),
    website: cleanString(payload.website),
  };

  // Honeypot: real users should leave this empty.
  if (data.website) {
    return {
      ok: false,
      isBot: true,
      error: "Invalid form submission.",
    };
  }

  if (!data.name || !data.email || !data.service || !data.message) {
    return {
      ok: false,
      error: "Please fill all required fields.",
    };
  }

  if (data.name.length < 2 || data.name.length > 80) {
    return {
      ok: false,
      error: "Please enter a valid name.",
    };
  }

  if (data.email.length > 254 || !EMAIL_PATTERN.test(data.email)) {
    return {
      ok: false,
      error: "Please enter a valid email address.",
    };
  }

  if (data.phone && !PHONE_PATTERN.test(data.phone)) {
    return {
      ok: false,
      error: "Please enter a valid phone number.",
    };
  }

  if (!isAllowedService(data.service)) {
    return {
      ok: false,
      error: "Please select a valid service.",
    };
  }

  if (data.message.length < 20 || data.message.length > 3000) {
    return {
      ok: false,
      error: "Project details must be between 20 and 3000 characters.",
    };
  }

  return {
    ok: true,
    data,
  };
}
