import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { brandCases } from "../data/BrandingMaterialsData";
import {
  BREADCRUMB_LABELS,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  SERVICE_SEO,
  SITE_NAME,
  SITE_URL,
  STATIC_SEO,
  isNoIndexRoute,
  normalizePath,
  toAbsoluteUrl,
} from "./seo.config";

const getCaseStudy = (pathname) => {
  if (!pathname.startsWith("/services/branding-materials/")) return null;

  const brandSlug = pathname.split("/")[3];
  if (!brandSlug) return null;

  return Array.isArray(brandCases)
    ? brandCases.find((item) => item.slug === brandSlug) || null
    : null;
};

const getCaseStudySeo = (brand) => {
  const category = brand.category || "Brand Identity";
  const description =
    brand.description ||
    `Explore the ${category.toLowerCase()} case study created by Limitless Design.`;

  return {
    title: `${brand.brandName} | ${category} Case Study | Limitless Design`,
    description:
      description.length > 160 ? `${description.slice(0, 157)}...` : description,
    type: "CreativeWork",
    image: brand.images?.heroLogo || brand.image || DEFAULT_IMAGE,
    caseStudy: brand,
  };
};

const getSeo = (pathname) => {
  const normalizedPath = normalizePath(pathname);

  if (STATIC_SEO[normalizedPath]) return STATIC_SEO[normalizedPath];

  const caseStudy = getCaseStudy(normalizedPath);
  if (caseStudy) return getCaseStudySeo(caseStudy);

  if (normalizedPath.startsWith("/services/")) {
    const slug = normalizedPath.split("/")[2];
    const service = SERVICE_SEO[slug];

    if (service) return service;
  }

  if (isNoIndexRoute(normalizedPath)) {
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
};

const getBreadcrumbLabel = (segment) => {
  if (BREADCRUMB_LABELS[segment]) return BREADCRUMB_LABELS[segment];
  return decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const buildBreadcrumb = (pathname, seo) => {
  const normalizedPath = normalizePath(pathname);
  if (normalizedPath === "/") return null;

  const segments = normalizedPath.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
  ];

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const label =
      isLast && seo.caseStudy
        ? seo.caseStudy.brandName
        : getBreadcrumbLabel(segment);

    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: label,
      item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}`,
    });
  });

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
};

const buildStructuredData = ({ pathname, seo, canonicalUrl, imageUrl }) => {
  const breadcrumb = buildBreadcrumb(pathname, seo);
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ];

  if (seo.type === "WebSite") {
    graph[1].description = seo.description;
  } else if (seo.service) {
    graph.push(
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: seo.service,
        description: seo.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        url: canonicalUrl,
        image: imageUrl,
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        name: seo.title,
        description: seo.description,
        url: canonicalUrl,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${canonicalUrl}#service` },
      },
    );
  } else if (seo.caseStudy) {
    graph.push(
      {
        "@type": "CreativeWork",
        "@id": `${canonicalUrl}#case-study`,
        name: seo.caseStudy.brandName,
        headline: seo.title,
        description: seo.description,
        url: canonicalUrl,
        image: imageUrl,
        ...(seo.caseStudy.year
          ? { dateCreated: `${seo.caseStudy.year}-01-01` }
          : {}),
        creator: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        name: seo.title,
        description: seo.description,
        url: canonicalUrl,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${canonicalUrl}#case-study` },
      },
    );
  } else {
    graph.push({
      "@type": seo.type || "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      name: seo.title,
      description: seo.description,
      url: canonicalUrl,
      isPartOf: { "@id": `${SITE_URL}/#website` },
    });
  }

  if (breadcrumb) graph.push(breadcrumb);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

function SEO() {
  const { pathname } = useLocation();
  const seo = getSeo(pathname);
  const normalizedPath = normalizePath(pathname);
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const imageUrl = toAbsoluteUrl(seo.image, DEFAULT_IMAGE);
  const structuredData = seo.noIndex
    ? null
    : buildStructuredData({
        pathname: normalizedPath,
        seo,
        canonicalUrl,
        imageUrl,
      });

  const robots = seo.noIndex ? "noindex, nofollow" : "index, follow";
  const ogType = seo.caseStudy ? "article" : "website";

  return (
    <Helmet>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${seo.title} | ${SITE_NAME}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta
        name="twitter:image:alt"
        content={`${seo.title} | ${SITE_NAME}`}
      />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;
