const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  const { body, headers = {}, timeout = 15000, ...rest } = options;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      body: body && !isFormData && typeof body !== "string" ? JSON.stringify(body) : body,
    });

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json")
      ? await response.json().catch(() => null)
      : await response.text().catch(() => "");

    if (!response.ok) {
      const message =
        typeof result === "object" && result?.message
          ? result.message
          : typeof result === "string" && result
            ? result
            : `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    return result;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("The request timed out. Please try again.");
    }
    if (error instanceof TypeError) {
      throw new Error("Unable to connect to the server. Please try again later.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export function getApiUrl(path = "") {
  return `${API_URL}${path}`;
}
