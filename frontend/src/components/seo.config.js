import { services } from "../data/services";

// Single production origin used by runtime SEO, canonical URLs and JSON-LD.
export const SITE_URL = "https://limitlessdesign.vercel.app";
export const SITE_NAME = "Limitless Design";
export const DEFAULT_IMAGE = `${SITE_URL}/og/og-home.svg`;
export const DEFAULT_DESCRIPTION =
  "Limitless Design provides professional UI/UX, logo, branding and graphic design services for businesses, startups and growing brands.";

export const OG_IMAGES = {
  home: `${SITE_URL}/og/og-home.svg`,
  about: `${SITE_URL}/og/og-about.svg`,
  contact: `${SITE_URL}/og/og-contact.svg`,
  projects: `${SITE_URL}/og/og-live-projects.svg`,
  pricing: `${SITE_URL}/og/og-pricing.svg`,
  services: `${SITE_URL}/og/og-services.svg`,
  "logo-design": `${SITE_URL}/og/og-logo-design.svg`,
  "poster-design": `${SITE_URL}/og/og-poster-design.svg`,
  "business-card-design": `${SITE_URL}/og/og-business-card-design.svg`,
  "branding-materials": `${SITE_URL}/og/og-branding-materials.svg`,
  "ui-design": `${SITE_URL}/og/og-ui-design.svg`,
};

export const STATIC_SEO = {
  "/": {
    title: "Limitless Design | UI/UX, Logo & Graphic Design",
    description: DEFAULT_DESCRIPTION,
    type: "WebSite",
    image: OG_IMAGES.home,
  },
  "/about": {
    title: "About Limitless Design | Creative Design Studio",
    description:
      "Learn about Limitless Design and our approach to UI/UX, branding, logo design and graphic design for modern businesses and digital products.",
    type: "AboutPage",
    image: OG_IMAGES.about,
  },
  "/contact": {
    title: "Contact Limitless Design | Start a Design Project",
    description:
      "Contact Limitless Design for UI/UX, logo, branding, poster, business card and graphic design projects. Tell us what you need and start your project.",
    type: "ContactPage",
    image: OG_IMAGES.contact,
  },
  "/live-projects": {
    title: "Live Projects | Limitless Design Portfolio",
    description:
      "Explore live websites and digital projects created by Limitless Design, including UI/UX work, web experiences and selected creative projects.",
    type: "CollectionPage",
    image: OG_IMAGES.projects,
  },
  "/price": {
    title: "UI/UX & Graphic Design Pricing | Limitless Design",
    description:
      "View transparent Limitless Design pricing for UI/UX design, branding and graphic design services, including available packages and project options.",
    type: "WebPage",
    image: OG_IMAGES.pricing,
  },
  "/services/social-media-banner": {
    title: "Social Media Banner Design | Limitless Design",
    description:
      "Custom social media banner designs for campaigns, promotions and brand communication across Instagram, Facebook, LinkedIn and other platforms.",
    service: "Social Media Banner Design",
    image: OG_IMAGES.services,
  },
  "/services/photo-frame": {
    title: "Photo Frame Design Services | Limitless Design",
    description:
      "Creative photo frame designs for events, campaigns, festivals, organizations and social media, tailored to your visual identity.",
    service: "Photo Frame Design",
    image: OG_IMAGES.services,
  },
};

const normalizeService = (service) => ({
  title: `${service.title} Services | Limitless Design`,
  description: service.description,
  service: service.title === "UI Design" ? "UI/UX Design" : service.title,
  image: OG_IMAGES[service.slug] || OG_IMAGES.services,
});

export const SERVICE_SEO = services.reduce((map, service) => {
  map[service.slug] = normalizeService(service);
  return map;
}, {});

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
