import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { brandCases } from "../data/BrandingMaterialsData";

const SITE_URL = "https://limitlessdesign.netlify.app";
const SITE_NAME = "Limitless Design";
const DEFAULT_IMAGE = `${SITE_URL}/logo-01.webp`;
const DEFAULT_DESCRIPTION =
  "Limitless Design provides professional UI/UX, logo, branding and graphic design services for businesses, startups and growing brands.";

const PAGE_SEO = {
  "/": {
    title: "Limitless Design | UI/UX, Logo & Graphic Design",
    description:
      "Limitless Design provides professional UI/UX, logo, branding and graphic design services for businesses, startups and growing brands.",
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
  "/services/logo-design": {
    title: "Logo Design Services | Limitless Design",
    description:
      "Professional logo design for startups, businesses and growing brands. Get a memorable, scalable and print-ready logo from Limitless Design.",
    service: "Logo Design",
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
  "/services/poster-design": {
    title: "Poster Design Services | Limitless Design",
    description:
      "Professional poster design for events, launches, offers, awareness campaigns and promotions, created for clear and effective visual communication.",
    service: "Poster Design",
  },
  "/services/business-card-design": {
    title: "Business Card Design | Limitless Design",
    description:
      "Professional business card design with clean typography, strong brand identity and print-ready layouts for corporate and creative businesses.",
    service: "Business Card Design",
  },
  "/services/branding-materials": {
    title: "Branding Materials Design | Limitless Design",
    description:
      "Build a consistent brand identity with professional branding materials for stationery, brochures, social media, marketing and business communication.",
    service: "Branding Materials Design",
  },
  "/services/ui-design": {
    title: "UI/UX Design Services | Limitless Design",
    description:
      "Professional UI/UX design for websites, mobile apps, dashboards, SaaS products and ecommerce platforms with responsive, user-focused interfaces.",
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

  if (pathname.startsWith("/services/branding-materials/")) {
    const brandSlug = pathname.split("/")[3];
    const brand = Array.isArray(brandCases)
      ? brandCases.find((item) => item.slug === brandSlug)
      : null;

    if (brand) {
      return {
        title: `${brand.brandName} Brand Identity Case Study | Limitless Design`,
        description: `${brand.description} Explore the brand identity system, visual elements and applications created by Limitless Design.`,
        type: "CreativeWork",
        image: brand.image || DEFAULT_IMAGE,
      };
    }
  }

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
      type: "WebPage",
    };
  }

  return {
    title: "Page Not Found | Limitless Design",
    description: DEFAULT_DESCRIPTION,
    noIndex: true,
    type: "WebPage",
  };
}

function buildStructuredData({ pathname, seo, canonicalUrl, imageUrl }) {
  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, segments) => ({
      "@type": "ListItem",
      position: index + 1,
      name: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
      item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}`,
    }));

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: SITE_URL,
      },
      ...breadcrumbItems,
    ],
  };

  if (seo.service) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: seo.service,
          description: seo.description,
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          url: canonicalUrl,
        },
        breadcrumb,
      ],
    };
  }

  if (seo.type === "WebSite") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: imageUrl,
        },
        {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          description: seo.description,
        },
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": seo.type || "WebPage",
        name: seo.title,
        description: seo.description,
        url: canonicalUrl,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      breadcrumb,
    ],
  };
}

function SEO() {
  const { pathname } = useLocation();
  const seo = getSeo(pathname);
  const normalizedPath =
    pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const imageUrl = seo.image?.startsWith("http")
    ? seo.image
    : `${SITE_URL}${seo.image || "/logo-01.webp"}`;
  const structuredData = seo.noIndex
    ? null
    : buildStructuredData({ pathname, seo, canonicalUrl, imageUrl });

  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={SITE_NAME} />
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
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${seo.title} | ${SITE_NAME}`} />

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
