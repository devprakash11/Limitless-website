const allowedServices = new Set([
  "Logo Design",
  "Social Media Banner",
  "Photo Frame Design",
  "Poster Design",
  "Business Card Design",
  "Branding Materials",
  "UI Design",
  "Custom Creative Work"
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{8,15}$/;

const cleanSingleLine = (value, maxLength) =>
  String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);

export const validateContactPayload = (body = {}) => {
  const data = {
    name: cleanSingleLine(body.name, 80),
    email: cleanSingleLine(body.email, 254).toLowerCase(),
    phone: cleanSingleLine(body.phone, 20),
    service: cleanSingleLine(body.service, 80),
    message: String(body.message ?? "").trim().slice(0, 3000),
    website: cleanSingleLine(body.website, 200),
    submissionSource: cleanSingleLine(body.submissionSource, 500)
  };

  const errors = {};

  if (data.name.length < 2) {
    errors.name = "Please enter a valid name.";
  }

  if (!emailPattern.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.phone && !phonePattern.test(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!allowedServices.has(data.service)) {
    errors.service = "Please select a valid service.";
  }

  if (data.message.length < 20) {
    errors.message = "Please provide at least 20 characters about the project.";
  }

  return {
    data,
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
