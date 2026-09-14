const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:5000"
    : "https://limitless-website-backend-devprakash11s-projects.vercel.app")
).replace(/\/$/, "");

export async function submitContact(payload) {
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
    throw new Error(
      result?.message || "Your requirement could not be submitted. Please try again.",
    );
  }

  return result;
}
