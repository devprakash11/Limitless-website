import { apiRequest } from "../lib/api.js";
import { supabase } from "../lib/supabase.js";

async function authHeaders() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token
    ? { Authorization: `Bearer ${data.session.access_token}` }
    : {};
}

export const backendApi = {
  health: () => apiRequest("/health"),

  services: () => apiRequest("/api/services"),
  projects: () => apiRequest("/api/projects"),
  pricing: () => apiRequest("/api/pricing"),
  testimonials: () => apiRequest("/api/testimonials"),

  submitContact: (payload) => apiRequest("/api/contact", {
    method: "POST",
    body: payload,
  }),

  me: async () => apiRequest("/api/auth/me", {
    headers: await authHeaders(),
  }),

  updateProfile: async (payload) => apiRequest("/api/auth/profile", {
    method: "PATCH",
    headers: await authHeaders(),
    body: payload,
  }),

  clientDashboard: async () => apiRequest("/api/client/dashboard", {
    headers: await authHeaders(),
  }),

  upload: async (file, folder = "uploads") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    return apiRequest("/api/uploads", {
      method: "POST",
      headers: await authHeaders(),
      body: formData,
    });
  },
};
