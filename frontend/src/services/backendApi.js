import { apiRequest } from "../lib/api.js";

export const backendApi = {
  health: () => apiRequest("/health"),

  services: () => apiRequest("/api/services"),
  projects: () => apiRequest("/api/projects"),
  pricing: () => apiRequest("/api/pricing"),
  testimonials: () => apiRequest("/api/testimonials"),

  submitContact: (payload) =>
    apiRequest("/api/contact", {
      method: "POST",
      body: payload,
    }),
};
