import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DownloadPreviewButton from "../components/DownloadPreviewButton";
import SEO from "../components/SEO";
import ServiceContentSection from "../components/seo/ServiceContentSection";
import { businessCardServiceContent } from "../data/pageSeoContent";
import { businessCardDownloads } from "../data/downloadAssets";

import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Contact,
  Eye,
  Layers3,
  Palette,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   BUSINESS CARD BENEFITS
========================================================= */

const benefits = [
  "You will receive the final approved business card design in one-side or front-and-back format, according to the selected package.",
  "The business card will be delivered as a print-ready PDF with the correct dimensions, CMYK colour mode, bleed area and high-resolution output.",
  "Digital preview files will be provided in high-resolution JPG and PNG formats for easy viewing and sharing.",
  "Editable source files such as AI, PSD, EPS or CorelDRAW may be included when they are part of the package or purchased separately.",
  "All required supporting information, including font names, colour codes, linked graphics and logo files, will be provided where applicable.",
];

/* =========================================================
   BUSINESS CARD DESIGN PROCESS
========================================================= */

const process = [
  {
    icon: Contact,
    title: "Information Collection",
    text: "We collect your name, designation, logo, phone number, email, address, website, and social links.",
  },
  {
    icon: Palette,
    title: "Card Style Direction",
    text: "We create a premium design style with brand colors, typography, spacing, and professional layout balance.",
  },
  {
    icon: Layers3,
    title: "Final Card Delivery",
    text: "You receive polished business card files ready for printing, digital sharing, networking, and branding.",
  },
];

/* =========================================================
   BUSINESS CARD DESIGN PAGE
========================================================= */

function BusinessCardDesign() {
  const [previewCard, setPreviewCard] = useState(null);
  const [showAll, setShowAll] = useState(false);

  /*
    All business-card items now come from the shared
    downloadAssets.js registry.

    The same asset object powers:
    1. Business Card gallery cards
    2. Quick preview modal
    3. Global full-screen download preview
    4. Previous and next design navigation
    5. PNG, JPG, WEBP and source-file downloads
  */
  const availableCards = Array.isArray(
    businessCardDownloads
  )
    ? businessCardDownloads
    : [];

  const visibleCards = showAll
    ? availableCards
    : availableCards.slice(0, 4);

  /* =========================================================
     QUICK PREVIEW MODAL
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPreviewCard(null);
      }
    };

    if (previewCard) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [previewCard]);

  return (
    <>
      <SEO
        title="Professional Business Card Design | Limitless Design"
        description="Get a modern, professional and print-ready business card designed for your company, startup, agency, service or personal brand."
        path="/services/business-card-design"
        image="/logo-01.webp"
      />

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="bcd-page-hero">
        <div className="container bcd-page-hero-grid">
          <div className="bcd-page-hero-content">
            <span className="section-label dark-label">
              <Sparkles size={16} aria-hidden="true" />
              Creative Service
            </span>

            <h1>Business Card Design</h1>

            <p>
              Create professional business card designs for founders,
              entrepreneurs, agencies, consultants, service providers,
              startups, and personal brands.
            </p>

            <div className="bcd-page-hero-actions">
              <Link to="/contact" className="primary-btn">
                Commission Card Work
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <a
                href="#business-card-gallery"
                className="secondary-btn"
              >
                View Samples
              </a>
            </div>
          </div>

          <div className="bcd-page-hero-card">
            <div className="bcd-page-card-icon">
              <BriefcaseBusiness
                size={34}
                aria-hidden="true"
              />
            </div>

            <h3>Premium Business Card Identity</h3>

            <p>
              Clean, modern, premium, and print-ready business card designs
              crafted to create a strong first impression.
            </p>

            <div className="bcd-page-tags">
              <span>Corporate</span>
              <span>Minimal</span>
              <span>Luxury</span>
              <span>Print Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS CARD GALLERY
      ====================================================== */}

      <section
        className="bcd-page-gallery-section"
        id="business-card-gallery"
      >
        <div className="container">
          <div className="bcd-page-heading">
            <span className="section-label">
              Business Card Gallery
            </span>

            <h2>Explore professional business card styles</h2>

            <p>
              Showcase premium business cards, corporate cards, creative
              cards, startup cards, and personal branding cards in a clean
              portfolio-style grid.
            </p>
          </div>

          {visibleCards.length > 0 ? (
            <div className="bcd-page-gallery-grid">
              {visibleCards.map((item) => (
                <article
                  className="bcd-page-card"
                  key={item.slug}
                >
                  <div className="bcd-page-image-wrap">
                    <img
                      src={item.image}
                      alt={`${item.title} professional business card design sample`}
                      loading="lazy"
                    />
                  </div>

                  <div className="bcd-page-card-content">
                    <div className="bcd-page-card-info">
                      <h3>{item.title}</h3>

                      <span>
                        {item.category ||
                          "Business Card Design"}
                      </span>
                    </div>

                    <div className="bcd-page-actions">
                      {/* Opens the existing quick image preview */}
                      <button
                        type="button"
                        className="bcd-page-preview-btn"
                        onClick={() => setPreviewCard(item)}
                        aria-label={`Preview ${item.title}`}
                      >
                        <Eye size={15} aria-hidden="true" />
                        Preview
                      </button>

                      {/*
                        Opens the universal download preview.

                        Example URL:
                        /download/business-card-design/premium-business-card-one
                      */}
                      <DownloadPreviewButton
                        asset={item}
                        className="bcd-page-download-btn"
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
              className="bcd-page-empty-state"
              role="status"
            >
              <BriefcaseBusiness
                size={44}
                aria-hidden="true"
              />

              <h3>No business cards available</h3>

              <p>
                Add business-card entries inside the
                businessCardDownloads array in
                src/data/downloadAssets.js.
              </p>
            </div>
          )}

          {availableCards.length > 4 && (
            <div className="bcd-page-view-all-wrap">
              <button
                type="button"
                className="bcd-page-view-all-btn"
                onClick={() => {
                  setShowAll((current) => !current);
                }}
                aria-expanded={showAll}
              >
                {showAll
                  ? "Show Less"
                  : "View All Business Cards"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          QUICK PREVIEW MODAL
      ====================================================== */}

      {previewCard && (
        <div
          className="bcd-page-modal-overlay"
          onClick={() => setPreviewCard(null)}
          role="presentation"
        >
          <div
            className="bcd-page-modal-box"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-card-preview-title"
          >
            <button
              type="button"
              className="bcd-page-modal-close"
              onClick={() => setPreviewCard(null)}
              aria-label="Close preview"
            >
              <X size={22} aria-hidden="true" />
            </button>

            <div className="bcd-page-modal-image">
              <img
                src={previewCard.image}
                alt={`${previewCard.title} full business card design preview`}
              />
            </div>

            <div className="bcd-page-modal-footer">
              <div>
                <h3 id="business-card-preview-title">
                  {previewCard.title}
                </h3>

                <p>Full business card preview</p>
              </div>

              <DownloadPreviewButton
                asset={previewCard}
                className="bcd-page-download-btn"
                onBeforeNavigate={() => setPreviewCard(null)}
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

      <section className="bcd-page-detail-section">
        <div className="container bcd-page-detail-grid">
          <div className="bcd-page-detail-content">
            <span className="section-label">
              Service Details
            </span>

            <h2>What you get in Business Card Design</h2>

            <p>
              Our business card design service helps you create a premium,
              professional, and print-ready identity card that represents your
              brand clearly and confidently.
            </p>

            <div className="bcd-page-benefit-list">
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

          <aside className="bcd-page-quote-card">
            <h3>Need a custom business card?</h3>

            <p>
              Share your logo, name, designation, phone, email, website,
              address, brand colors, and preferred card style. We will create
              a professional business card design for you.
            </p>

            <Link to="/contact" className="primary-btn">
              Start Card Project
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {/* =====================================================
          PROCESS SECTION
      ====================================================== */}

      <section className="bcd-page-process-section">
        <div className="container">
          <div className="bcd-page-heading">
            <span className="section-label">
              Our Process
            </span>

            <h2>Simple process, premium card output</h2>

            <p>
              From your contact details to final print-ready card design, the
              process is smooth, clear, and focused on professional branding.
            </p>
          </div>

          <div className="bcd-page-process-grid">
            {process.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="bcd-page-process-card"
                  key={item.title}
                >
                  <div className="bcd-page-process-icon">
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

      <ServiceContentSection {...businessCardServiceContent} />
    </>
  );
}

export default BusinessCardDesign;