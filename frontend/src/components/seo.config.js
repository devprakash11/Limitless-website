import { services } from "../data/services";

// Single production origin used by runtime SEO, canonical URLs and JSON-LD.
export const SITE_URL = "https://limitlessdesign.vercel.app";
export const SITE_NAME = "Limitless Design";
export const DEFAULT_IMAGE = `${SITE_URL}/logo-01.webp`;
export const DEFAULT_DESCRIPTION =
  "Limitless Design provides professional UI/UX, logo, branding and graphic design services for businesses, startups and growing brands.";

export const STATIC_SEO = {
  "/": {
    title: "Limitless Design | UI/UX, Logo & Graphic Design",
    description: DEFAULT_DESCRIPTION,
    type: "WebSite",
  },
  "/about": {
    title: "About Limitless Design | Creative Design Studio",
    description:
      "Learn about Limitless Design and our approach to UI/UX, branding, logo design and graphic design for modern businesses and digital products.",
    type: "AboutPage",
  },
  "/contact": {
    title: "Contact Limitless Design | Start a Design Project",
    description:
      "Contact Limitless Design for UI/UX, logo, branding, poster, business card and graphic design projects. Tell us what you need and start your project.",
    type: "ContactPage",
  },
  "/live-projects": {
    title: "Live Projects | Limitless Design Portfolio",
    description:
      "Explore live websites and digital projects created by Limitless Design, including UI/UX work, web experiences and selected creative projects.",
    type: "CollectionPage",
  },
  "/price": {
    title: "UI/UX & Graphic Design Pricing | Limitless Design",
    description:
      "View transparent Limitless Design pricing for UI/UX design, branding and graphic design services, including available packages and project options.",
    type: "WebPage",
  },
  "/services/social-media-banner": {
    title: "Social Media Banner Design | Limitless Design",
    description:
      "Custom social media banner designs for campaigns, promotions and brand communication across Instagram, Facebook, LinkedIn and other platforms.",
    service: "Social Media Banner Design",
  },
  "/services/photo-frame": {
    title: "Photo Frame Design Services | Limitless Design",
    description:
      "Creative photo frame designs for events, campaigns, festivals, organizations and social media, tailored to your visual identity.",
    service: "Photo Frame Design",
  },
};

const normalizeService = (service) => ({
  title: `${service.title} Services | Limitless Design`,
  description: service.description,
  service: service.title === "UI Design" ? "UI/UX Design" : service.title,
});

export const SERVICE_SEO = services.reduce((map, service) => {
  map[service.slug] = normalizeService(service);
  return map;
}, {});

// These routes are implemented in App.jsx even when their service entries are not
// currently present in services.js. Keep their SEO metadata explicit until the
// service data becomes the source of truth for those pages too.
Object.assign(SERVICE_SEO, {
  "social-media-banner": STATIC_SEO["/services/social-media-banner"],
  "photo-frame": STATIC_SEO["/services/photo-frame"],
});

export const BREADCRUMB_LABELS = {
  about: "About",
  contact: "Contact",
  "live-projects": "Live Projects",
  price: "Pricing",
  services: "Services",
  "logo-design": "Logo Design",
  "social-media-banner": "Social Media Banner",
  "photo-frame": "Photo Frame",
  "poster-design": "Poster Design",
  "business-card-design": "Business Card Design",
  "branding-materials": "Branding Materials",
  "ui-design": "UI/UX Design",
};

export const NOINDEX_PREFIXES = ["/download/", "/logo-download/"];

export const isNoIndexRoute = (pathname) =>
  NOINDEX_PREFIXES.some((prefix) => pathname.startsWith(prefix));

export const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  const withoutTrailingSlash = pathname.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
};

export const toAbsoluteUrl = (value, fallback = DEFAULT_IMAGE) => {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
};
