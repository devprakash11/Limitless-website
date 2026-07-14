import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatermarkDownloadButton from "../components/WatermarkDownloadButton";

import {
  ArrowRight,
  BadgeCheck,
  Eye,
  GalleryVerticalEnd,
  Layers3,
  Megaphone,
  Palette,
  Sparkles,
  X,
} from "lucide-react";

const posterSamples = [
  {
    title: "Air Force Day Poster",
    image: "/images/poster-design/Air_Force_Day_Poster.webp",
  },
  {
    title: "Chhath Puja Poster",
    image: "/images/poster-design/chhath-puja.webp",
  },
  {
    title: "Chhath Puja Poster",
    image: "/images/poster-design/chhath-puja1.webp",
  },
  {
    title: "Fresh Fruits Poster",
    image: "/images/poster-design/fresh-fruits.webp",
  },
  {
    title: "Gandhi Jayanti Poster",
    image: "/images/poster-design/gandhi-jayanti..webp",
  },
  {
    title: "Happy Diwali Poster",
    image: "/images/poster-design/happy-diwali.webp",
  },
  {
    title: "Happy New Year Poster",
    image: "/images/poster-design/happy-new-year.webp",
  },
  {
    title: "Hiring Poster",
    image: "/images/poster-design/hiring-poster.webp",
  },
  {
    title: "Hospital Pamphlet",
    image: "/images/poster-design/hospital-pamphlate.webp",
  },
  {
    title: "Independence Day Poster",
    image: "/images/poster-design/independence-dayai.webp",
  },
  {
    title: "Mehndi Arts Poster",
    image: "/images/poster-design/mehndi-arts.webp",
  },
  {
    title: "Merry Christmas Poster",
    image: "/images/poster-design/merry-christmas.webp",
  },
  {
    title: "Pamphlet Design",
    image: "/images/poster-design/pamphlete-2.webp",
  },
  {
    title: "Pamphlet Design",
    image: "/images/poster-design/pamphlete.webp",
  },
  {
    title: "Pamphlet Design",
    image: "/images/poster-design/pamphlete1.webp",
  },
  {
    title: "Pamphlet Design",
    image: "/images/poster-design/pamphlete02.webp",
  },
  {
    title: "Pamphlet Design",
    image: "/images/poster-design/pamphlete4.webp",
  },
  {
    title: "Pizza Poster",
    image: "/images/poster-design/pizza-poster.webp",
  },
  {
    title: "Creative Poster Design",
    image: "/images/poster-design/poster.webp",
  },
  {
    title: "Ram Navami Poster",
    image: "/images/poster-design/ramnavmi.webp",
  },
];

const benefits = [
  "Professional poster designs for events, offers, campaigns, and promotions",
  "Strong visual hierarchy with bold headline and clear message placement",
  "Perfect for schools, NGOs, brands, businesses, creators, and agencies",
  "Print-ready and digital-ready poster formats",
  "Attractive color, typography, layout, and CTA direction",
  "High-quality export for social media, website, WhatsApp, and printing",
];

const process = [
  {
    icon: Megaphone,
    title: "Message Understanding",
    text: "We understand your poster purpose, audience, content, brand style, and promotion goal before starting the design.",
  },
  {
    icon: Palette,
    title: "Creative Layout",
    text: "We create a professional layout with bold headline, balanced spacing, strong visuals, and readable content.",
  },
  {
    icon: Layers3,
    title: "Final Poster Delivery",
    text: "You receive polished poster files ready for digital promotion, social media, printing, and campaign use.",
  },
];

function createFileName(title) {
  return `${title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")}.png`;
}

function PosterDesign() {
  const [previewPoster, setPreviewPoster] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visiblePosters = showAll
    ? posterSamples
    : posterSamples.slice(0, 4);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPreviewPoster(null);
      }
    };

    if (previewPoster) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [previewPoster]);

  return (
    <>
      {/* Hero section */}
      <section className="pd-page-hero">
        <div className="container pd-page-hero-grid">
          <div className="pd-page-hero-content">
            <span className="section-label dark-label">
              <Sparkles size={16} />
              Creative Service
            </span>

            <h1>Poster Design</h1>

            <p>
              Create powerful and professional poster designs for events,
              launches, offers, awareness campaigns, schools, NGOs, brands,
              social media promotions, and business marketing.
            </p>

            <div className="pd-page-hero-actions">
              <Link to="/contact" className="primary-btn">
                Commission Poster Work
                <ArrowRight size={18} />
              </Link>

              <a
                href="#poster-design-gallery"
                className="secondary-btn"
              >
                View Samples
              </a>
            </div>
          </div>

          <div className="pd-page-hero-card">
            <div className="pd-page-card-icon">
              <GalleryVerticalEnd size={34} />
            </div>

            <h3>Impactful Poster Designs</h3>

            <p>
              Professionally designed posters with bold typography, attractive
              visuals, clean spacing, strong messaging, and business-ready
              presentation.
            </p>

            <div className="pd-page-tags">
              <span>Events</span>
              <span>Offers</span>
              <span>Campaigns</span>
              <span>Print</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section
        className="pd-page-gallery-section"
        id="poster-design-gallery"
      >
        <div className="container">
          <div className="pd-page-heading">
            <span className="section-label">
              Poster Design Gallery
            </span>

            <h2>Explore professional poster design styles</h2>

            <p>
              Showcase event posters, offer posters, campaign posters, product
              launch posters, and awareness posters in a clean portfolio-style
              grid.
            </p>
          </div>

          <div className="pd-page-gallery-grid">
            {visiblePosters.map((item) => (
              <div
                className="pd-page-card"
                key={item.title}
              >
                <div className="pd-page-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>

                <div className="pd-page-card-content">
                  <div className="pd-page-card-info">
                    <h3>{item.title}</h3>
                    <span>Poster Design</span>
                  </div>

                  <div className="pd-page-actions">
                    <button
                      type="button"
                      className="pd-page-preview-btn"
                      onClick={() => setPreviewPoster(item)}
                    >
                      <Eye size={15} />
                      Preview
                    </button>

                    <WatermarkDownloadButton
                      imageUrl={item.image}
                      fileName={createFileName(item.title)}
                      className="pd-page-download-btn"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posterSamples.length > 4 && (
            <div className="pd-page-view-all-wrap">
              <button
                type="button"
                className="pd-page-view-all-btn"
                onClick={() => setShowAll((current) => !current)}
              >
                {showAll
                  ? "Show Less"
                  : "View All Poster Designs"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Preview modal */}
      {previewPoster && (
        <div
          className="pd-page-modal-overlay"
          onClick={() => setPreviewPoster(null)}
          role="presentation"
        >
          <div
            className="pd-page-modal-box"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="poster-preview-title"
          >
            <button
              type="button"
              className="pd-page-modal-close"
              onClick={() => setPreviewPoster(null)}
              aria-label="Close preview"
            >
              <X size={22} />
            </button>

            <div className="pd-page-modal-image">
              <img
                src={previewPoster.image}
                alt={previewPoster.title}
              />
            </div>

            <div className="pd-page-modal-footer">
              <div>
                <h3 id="poster-preview-title">
                  {previewPoster.title}
                </h3>

                <p>Full poster preview</p>
              </div>

              <WatermarkDownloadButton
                imageUrl={previewPoster.image}
                fileName={createFileName(previewPoster.title)}
                className="pd-page-download-btn"
              />
            </div>
          </div>
        </div>
      )}

      {/* Service details */}
      <section className="pd-page-detail-section">
        <div className="container pd-page-detail-grid">
          <div className="pd-page-detail-content">
            <span className="section-label">
              Service Details
            </span>

            <h2>What you get in Poster Design</h2>

            <p>
              Our poster design service helps businesses and creators promote
              events, products, offers, awareness messages, and campaigns with
              professional visual quality and clear communication.
            </p>

            <div className="pd-page-benefit-list">
              {benefits.map((item) => (
                <div key={item}>
                  <BadgeCheck size={21} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="pd-page-quote-card">
            <h3>Need a custom poster?</h3>

            <p>
              Share your poster size, title, content, brand colors, images,
              logo, and design reference. We will create a professional poster
              direction for your campaign.
            </p>

            <Link to="/contact" className="primary-btn">
              Start Poster Project
              <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </section>

      {/* Process section */}
      <section className="pd-page-process-section">
        <div className="container">
          <div className="pd-page-heading">
            <span className="section-label">
              Our Process
            </span>

            <h2>Clear process, high-impact poster output</h2>

            <p>
              From idea to final poster export, the process is simple,
              professional, and focused on strong visual communication.
            </p>
          </div>

          <div className="pd-page-process-grid">
            {process.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="pd-page-process-card"
                  key={item.title}
                >
                  <div className="pd-page-process-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default PosterDesign;