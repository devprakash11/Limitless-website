const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export async function submitContact(payload) {
  if (!API_URL) {
    throw new Error("Contact service is not configured. Please try again later.");
  }

  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok || result?.success === false) {
    throw new Error(result?.message || "Your requirement could not be submitted. Please try again.");
  }

  return result;
}
