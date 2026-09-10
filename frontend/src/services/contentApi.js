import { backendApi } from "./backendApi.js";

/**
 * Fetches all public content from the backend API in a single parallel request.
 *
 * NOTE: The frontend currently uses static local data files (src/data/) for
 * services, projects, pricing, and testimonials. When you are ready to drive
 * those pages from the Supabase database instead, import and call this function
 * in the relevant page components (e.g. Home, Price, LiveProjects) and replace
 * the static imports with the returned data.
 *
 * The backend routes are fully functional and ready:
 *   GET /api/services      → active services from Supabase
 *   GET /api/projects      → published projects from Supabase
 *   GET /api/pricing       → active pricing plans from Supabase
 *   GET /api/testimonials  → published testimonials from Supabase
 */
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
