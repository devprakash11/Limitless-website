const FORM_ENDPOINT = "https://formsubmit.co/ajax/help.limitlessdesign@gmail.com";

export async function submitContact(payload) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      message: payload.message,
      _subject: `New Limitless Design enquiry: ${payload.service}`,
      _replyto: payload.email,
      _template: "table",
      _captcha: "true",
      _honey: payload.website || "",
    }),
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
