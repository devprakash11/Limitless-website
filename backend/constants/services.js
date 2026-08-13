export const ALLOWED_SERVICES = Object.freeze([
  "Logo Design",
  "Social Media Banner",
  "Photo Frame Design",
  "Poster Design",
  "Business Card Design",
  "Branding Materials",
  "UI Design",
  "Custom Creative Work",
]);

export function isAllowedService(value) {
  return ALLOWED_SERVICES.includes(value);
}
