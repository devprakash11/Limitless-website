import { Helmet } from "react-helmet-async";

const SITE_URL = "https://limitlessdesign.netlify.app";

function SEO({
  title,
  description,
  path = "/",
  image = "/logo-01.webp",
  noIndex = false,
}) {
  const normalizedPath =
    path === "/" ? "/" : `/${path.replace(/^\/+/, "")}`;

  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

export default SEO;