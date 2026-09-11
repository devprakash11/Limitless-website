import { apiRequest } from "../lib/api.js";

export const backendApi = {
  submitContact: (payload) =>
    apiRequest("/api/contact", {
      method: "POST",
      body: payload,
    }),
};
