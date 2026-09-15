import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://limitlessdesign.netlify.app";
const SITE_NAME = "Limitless Design";
const DEFAULT_IMAGE = `${SITE_URL}/logo-01.webp`;

const PAGE_SEO = {
  "/": {
    title: "UI/UX, Graphic & Branding Design Services | Limitless Design",
    description:
      "Limitless Design creates professional UI/UX, logo, branding, poster, business card and social media designs for businesses and digital products.",
  },
  "/about": {
    title: "About Limitless Design | Creative Design Studio",
    description:
      "Learn about Limitless Design, a creative design studio focused on UI/UX, branding, graphic design and digital experiences.",
  },
  "/contact": {
    title: "Contact Limitless Design | Start Your Design Project",
    description:
      "Contact Limitless Design to discuss UI/UX, branding, logo, graphic design or digital design projects.",
  },
  "/live-projects": {
    title: "Live Projects | Limitless Design Portfolio",
    description:
      "Explore live websites and digital projects designed and developed by Limitless Design.",
  },
  "/price": {
    title: "UI/UX & Graphic Design Pricing | Limitless Design",
    description:
      "View Limitless Design pricing for UI/UX design, graphic design and creative design services.",
  },
  "/services/logo-design": {
    title: "Logo Design Services | Professional Logo Design | Limitless Design",
    description:
      "Professional logo design services for businesses, startups and brands. Get a distinctive, memorable logo designed by Limitless Design.",
    service: "Logo Design",
  },
  "/services/social-media-banner": {
    title: "Social Media Banner Design Services | Limitless Design",
    description:
      "Custom social media banner and creative design services for brands, campaigns and digital marketing.",
    service: "Social Media Banner Design",
  },
  "/services/photo-frame": {
    title: "Photo Frame Design Services | Limitless Design",
    description:
      "Creative photo frame designs for personal, promotional and special occasions, created by Limitless Design.",
    service: "Photo Frame Design",
  },
  "/services/poster-design": {
    title: "Poster Design Services | Creative Poster Design | Limitless Design",
    description:
      "Professional poster design for events, businesses, promotions and campaigns with strong visual communication.",
    service: "Poster Design",
  },
  "/services/business-card-design": {
    title: "Business Card Design Services | Limitless Design",
    description:
      "Professional business card design that creates a polished and memorable brand identity for your business.",
    service: "Business Card Design",
  },
  "/services/branding-materials": {
    title: "Branding Materials Design Services | Limitless Design",
    description:
      "Professional branding material design including business stationery, marketing assets and visual brand applications.",
    service: "Branding Materials Design",
  },
  "/services/ui-design": {
    title: "UI/UX Design Services | Website & App UI Design | Limitless Design",
    description:
      "Professional UI/UX design for websites, dashboards, SaaS products and digital applications with a focus on usability and visual quality.",
    service: "UI/UX Design",
  },
};

const SERVICE_SLUGS = {
  "logo-design": "Logo Design",
  "social-media-banner": "Social Media Banner Design",
  "photo-frame": "Photo Frame Design",
  "poster-design": "Poster Design",
  "business-card-design": "Business Card Design",
  "branding-materials": "Branding Materials Design",
  "ui-design": "UI/UX Design",
};

function getSeo(pathname) {
  if (PAGE_SEO[pathname]) return PAGE_SEO[pathname];

  if (pathname.startsWith("/services/")) {
    const slug = pathname.split("/")[2];
    const service = SERVICE_SLUGS[slug];

    if (service) {
      return {
        title: `${service} Services | Limitless Design`,
        description: `Professional ${service.toLowerCase()} services from Limitless Design for businesses, brands and digital projects.`,
        service,
      };
    }
  }

  if (
    pathname.startsWith("/download/") ||
    pathname.startsWith("/logo-download/")
  ) {
    return {
      title: "Design Preview | Limitless Design",
      description: "Design preview page from Limitless Design.",
      noIndex: true,
    };
  }

  return {
    title: "Page Not Found | Limitless Design",
    description: "The requested page could not be found on Limitless Design.",
    noIndex: true,
  };
}

function SEO() {
  const { pathname } = useLocation();
  const seo = getSeo(pathname);
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const imageUrl = DEFAULT_IMAGE;

  const structuredData = seo.service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: seo.service,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        url: canonicalUrl,
      }
    : pathname === "/"
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: imageUrl,
        }
      : null;

  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta
        name="robots"
        content={seo.noIndex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={seo.title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
