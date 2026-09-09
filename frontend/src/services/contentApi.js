import { backendApi } from "./backendApi.js";

export async function loadPublicContent() {
  const [services, projects, pricing, testimonials] = await Promise.all([
    backendApi.services(),
    backendApi.projects(),
    backendApi.pricing(),
    backendApi.testimonials(),
  ]);

  return {
    services: services.data?.data || services.data || [],
    projects: projects.data?.data || projects.data || [],
    pricing: pricing.data?.data || pricing.data || [],
    testimonials: testimonials.data?.data || testimonials.data || [],
  };
}
