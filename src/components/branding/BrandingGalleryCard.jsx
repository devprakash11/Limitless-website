import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BrandingGalleryCard({ item }) {
  if (!item) return null;

  return (
    <article className="bmpro-gallery-card">
      <div className="bmpro-gallery-image">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
        />
      </div>

      <div className="bmpro-gallery-card-content">
        <div>
          <span>Brand Identity</span>
          <h3>{item.title}</h3>
        </div>

        <Link
          to={`/services/branding-materials/${item.slug}`}
          className="bmpro-open-btn"
        >
          Open
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default BrandingGalleryCard;