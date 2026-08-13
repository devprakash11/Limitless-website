import { sendProjectRequirementEmails } from "../services/emailService.js";
import {
  errorResponse,
  jsonResponse,
  successResponse,
} from "../utils/responses.js";
import { isOriginAllowed } from "../utils/requestSecurity.js";
import {
  parseJsonBody,
  validateContactPayload,
} from "../utils/validation.js";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, {});
  }

  if (event.httpMethod !== "POST") {
    return errorResponse(405, "Method Not Allowed");
  }

  if (!isOriginAllowed(event)) {
    return errorResponse(403, "Request origin is not allowed.");
  }

  const parsedBody = parseJsonBody(event);

  if (!parsedBody.ok) {
    return errorResponse(
      parsedBody.statusCode || 400,
      parsedBody.error
    );
  }

  const validation = validateContactPayload(parsedBody.value);

  // Treat honeypot submissions as successful so simple bots do not learn
  // that they triggered the trap.
  if (!validation.ok && validation.isBot) {
    return successResponse();
  }

  if (!validation.ok) {
    return errorResponse(400, validation.error);
  }

  try {
    await sendProjectRequirementEmails(validation.data);

    return successResponse({
      message: "Requirement submitted successfully.",
    });
  } catch (error) {
    // Keep detailed errors in server logs only.
    console.error("send-email function failed:", error);

    return errorResponse(
      500,
      "Your requirement could not be submitted. Please try again."
    );
  }
}
