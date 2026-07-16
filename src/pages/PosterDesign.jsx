import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DownloadPreviewButton from "../components/DownloadPreviewButton";
import { posterDownloads } from "../data/downloadAssets";

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

/* =========================================================
   POSTER DESIGN SERVICE BENEFITS
========================================================= */

const benefits = [
  "Professional poster designs for events, offers, campaigns, and promotions",
  "Strong visual hierarchy with bold headline and clear message placement",
  "Perfect for schools, NGOs, brands, businesses, creators, and agencies",
  "Print-ready and digital-ready poster formats",
  "Attractive color, typography, layout, and CTA direction",
  "High-quality export for social media, website, WhatsApp, and printing",
];

/* =========================================================
   POSTER DESIGN PROCESS
========================================================= */

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

/* =========================================================
   POSTER DESIGN PAGE
========================================================= */

function PosterDesign() {
  const [previewPoster, setPreviewPoster] = useState(null);
  const [showAll, setShowAll] = useState(false);

  /*
    Poster data comes from the universal download registry.

    The same object is now used by:
    1. Poster gallery cards
    2. Quick preview modal
    3. Full-screen download preview
    4. Previous and next asset navigation
    5. File-format download system
  */
  const availablePosters = Array.isArray(posterDownloads)
    ? posterDownloads
    : [];

  const visiblePosters = showAll
    ? availablePosters
    : availablePosters.slice(0, 4);

  /* =========================================================
     QUICK PREVIEW MODAL
  ========================================================= */

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
      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="pd-page-hero">
        <div className="container pd-page-hero-grid">
          <div className="pd-page-hero-content">
            <span className="section-label dark-label">
              <Sparkles size={16} aria-hidden="true" />
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
                <ArrowRight size={18} aria-hidden="true" />
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
              <GalleryVerticalEnd
                size={34}
                aria-hidden="true"
              />
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

      {/* =====================================================
          POSTER GALLERY
      ====================================================== */}

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
              launch posters, pamphlets, and awareness posters in a clean
              portfolio-style grid.
            </p>
          </div>

          {visiblePosters.length > 0 ? (
            <div className="pd-page-gallery-grid">
              {visiblePosters.map((item) => (
                <article
                  className="pd-page-card"
                  key={item.slug}
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

                      <span>
                        {item.category || "Poster Design"}
                      </span>
                    </div>

                    <div className="pd-page-actions">
                      {/* Opens the small preview popup */}
                      <button
                        type="button"
                        className="pd-page-preview-btn"
                        onClick={() => setPreviewPoster(item)}
                        aria-label={`Preview ${item.title}`}
                      >
                        <Eye size={15} aria-hidden="true" />
                        Preview
                      </button>

                      {/*
                        Opens the global download preview.

                        Example URL:
                        /download/poster-design/air-force-day-poster
                      */}
                      <DownloadPreviewButton
                        asset={item}
                        className="pd-page-download-btn"
                      >
                        Download
                      </DownloadPreviewButton>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              className="pd-page-empty-state"
              role="status"
            >
              <GalleryVerticalEnd
                size={44}
                aria-hidden="true"
              />

              <h3>No poster designs available</h3>

              <p>
                Add poster entries inside the posterDownloads array in
                src/data/downloadAssets.js.
              </p>
            </div>
          )}

          {availablePosters.length > 4 && (
            <div className="pd-page-view-all-wrap">
              <button
                type="button"
                className="pd-page-view-all-btn"
                onClick={() => {
                  setShowAll((current) => !current);
                }}
                aria-expanded={showAll}
              >
                {showAll
                  ? "Show Less"
                  : "View All Poster Designs"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          QUICK PREVIEW MODAL
      ====================================================== */}

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
              <X size={22} aria-hidden="true" />
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

              <DownloadPreviewButton
                asset={previewPoster}
                className="pd-page-download-btn"
                onBeforeNavigate={() => setPreviewPoster(null)}
              >
                Download
              </DownloadPreviewButton>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SERVICE DETAILS
      ====================================================== */}

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
                  <BadgeCheck
                    size={21}
                    aria-hidden="true"
                  />

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
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {/* =====================================================
          PROCESS SECTION
      ====================================================== */}

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
                <article
                  className="pd-page-process-card"
                  key={item.title}
                >
                  <div className="pd-page-process-icon">
                    <Icon size={25} aria-hidden="true" />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default PosterDesign;