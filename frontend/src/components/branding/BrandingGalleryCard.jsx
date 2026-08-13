import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function BrandingGalleryCard({ item }) {
  if (!item) return null;

  const caseStudyUrl = `/services/branding-materials/${item.slug}`;
  const tags = Array.isArray(item.tags) ? item.tags : [];

  return (
    <article className="bmpro-gallery-card">
      <Link
        to={caseStudyUrl}
        className="bmpro-gallery-image"
        aria-label={`Open ${item.title} branding case study`}
      >
        <img
          src={item.image}
          alt={`${item.title} branding preview`}
          loading="lazy"
        />
      </Link>

      <div className="bmpro-gallery-card-content">
        <span className="bmpro-gallery-category">
          {item.category || "Brand Identity"}
        </span>

        <h3 className="bmpro-gallery-title">
          <Link to={caseStudyUrl}>{item.title}</Link>
        </h3>

        {item.description && (
          <p className="bmpro-gallery-description">
            {item.description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="bmpro-card-tags">
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        <Link to={caseStudyUrl} className="bmpro-card-link">
          View Branding
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default BrandingGalleryCard;