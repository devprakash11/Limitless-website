import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Brush,
  Download,
  Eye,
  Layers3,
  Palette,
  PenTool,
  Sparkles,
  X,
} from "lucide-react";

import { logoDownloads } from "../data/logoDownloads";

const benefits = [
  "Custom logo concepts based on your business identity",
  "Professional color palette and typography direction",
  "Clean, scalable design suitable for digital and print use",
  "Perfect for brands, creators, stores, startups, and agencies",
  "High-quality export formats for website, social media, and packaging",
  "Modern, memorable, and business-focused visual identity",
];

const process = [
  {
    icon: PenTool,
    title: "Requirement Study",
    text: "We understand your business, audience, style preference, and brand goal before starting the design.",
  },
  {
    icon: Palette,
    title: "Concept Direction",
    text: "We create logo concepts with strong color, font, symbol, and visual identity direction.",
  },
  {
    icon: Layers3,
    title: "Final Delivery",
    text: "You receive polished logo files ready for website, social media, print, packaging, and branding use.",
  },
];

function LogoDesign() {
  const [previewLogo, setPreviewLogo] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleLogos = showAll
    ? logoDownloads
    : logoDownloads.slice(0, 4);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPreviewLogo(null);
      }
    };

    if (previewLogo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [previewLogo]);

  return (
    <>
      <section className="logo-v2-hero">
        <div className="container logo-v2-hero-grid">
          <div className="logo-v2-hero-content">
            <span className="section-label dark-label">
              <Sparkles size={16} aria-hidden="true" />
              Creative Service
            </span>

            <h1>Logo Design</h1>

            <p>
              Build a memorable brand identity with professional logo designs
              created for businesses, creators, ecommerce sellers, startups,
              agencies, and personal brands.
            </p>

            <div className="logo-v2-hero-actions">
              <Link to="/contact" className="primary-btn">
                Commission Logo Work
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <a href="#logo-gallery" className="secondary-btn">
                View Samples
              </a>
            </div>
          </div>

          <div className="logo-v2-hero-card">
            <div className="logo-v2-card-icon">
              <Brush size={34} aria-hidden="true" />
            </div>

            <h3>Premium Logo Identity</h3>

            <p>
              Minimal, mascot, character, modern, business, and brand-focused
              logo design styles for every creative need.
            </p>

            <div className="logo-v2-tags">
              <span>Mascot</span>
              <span>Minimal</span>
              <span>Branding</span>
              <span>Modern</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="logo-v2-gallery-section"
        id="logo-gallery"
      >
        <div className="container">
          <div className="logo-v2-heading">
            <span className="section-label">
              Logo Design Gallery
            </span>

            <h2>Explore professional logo design styles</h2>

            <p>
              Select Preview to view a logo in the modal. Select Download to
              open the full dynamic download page for that specific logo.
            </p>
          </div>

          <div className="logo-v2-gallery-grid">
            {visibleLogos.map((item) => (
              <article
                className="logo-v2-card"
                key={item.slug}
              >
                <div className="logo-v2-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>

                <div className="logo-v2-card-content">
                  <div className="logo-v2-card-info">
                    <h3>{item.title}</h3>
                    <span>{item.category}</span>
                  </div>

                  <div className="logo-v2-actions">
                    <button
                      type="button"
                      className="logo-v2-preview-btn"
                      onClick={() => setPreviewLogo(item)}
                    >
                      <Eye size={15} aria-hidden="true" />
                      Preview
                    </button>

                    <Link
                      to={`/logo-download/${item.slug}`}
                      className="logo-v2-download-btn"
                      aria-label={`Open download page for ${item.title}`}
                    >
                      <Download size={15} aria-hidden="true" />
                      Download
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {logoDownloads.length > 4 && (
            <div className="logo-v2-view-all-wrap">
              <button
                type="button"
                className="logo-v2-view-all-btn"
                onClick={() => setShowAll((current) => !current)}
              >
                {showAll
                  ? "Show Less"
                  : "View All Logo Designs"}
              </button>
            </div>
          )}
        </div>
      </section>

      {previewLogo && (
        <div
          className="logo-v2-modal-overlay"
          onClick={() => setPreviewLogo(null)}
          role="presentation"
        >
          <div
            className="logo-v2-modal-box"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logo-preview-title"
          >
            <button
              type="button"
              className="logo-v2-modal-close"
              onClick={() => setPreviewLogo(null)}
              aria-label="Close preview"
            >
              <X size={22} aria-hidden="true" />
            </button>

            <div className="logo-v2-modal-image">
              <img
                src={previewLogo.image}
                alt={previewLogo.title}
              />
            </div>

            <div className="logo-v2-modal-footer">
              <div>
                <h3 id="logo-preview-title">
                  {previewLogo.title}
                </h3>
                <p>Full logo preview</p>
              </div>

              <Link
                to={`/logo-download/${previewLogo.slug}`}
                className="logo-v2-download-btn"
                onClick={() => setPreviewLogo(null)}
              >
                <Download size={15} aria-hidden="true" />
                Download
              </Link>
            </div>
          </div>
        </div>
      )}

      <section className="logo-v2-detail-section">
        <div className="container logo-v2-detail-grid">
          <div className="logo-v2-detail-content">
            <span className="section-label">
              Service Details
            </span>

            <h2>What you get in Logo Design</h2>

            <p>
              Our logo design service helps you create a strong and professional
              brand identity. Every logo is designed with proper visual balance,
              typography, color harmony, and business usability.
            </p>

            <div className="logo-v2-benefit-list">
              {benefits.map((item) => (
                <div key={item}>
                  <BadgeCheck size={21} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="logo-v2-quote-card">
            <h3>Need a custom logo?</h3>

            <p>
              Share your brand name, business category, color preference, and
              design style. We will create a professional logo direction for
              your brand.
            </p>

            <Link to="/contact" className="primary-btn">
              Start Logo Project
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="logo-v2-process-section">
        <div className="container">
          <div className="logo-v2-heading">
            <span className="section-label">
              Our Process
            </span>

            <h2>Simple process, professional result</h2>

            <p>
              From idea to final logo delivery, the complete process is clear,
              smooth, and focused on your business identity.
            </p>
          </div>

          <div className="logo-v2-process-grid">
            {process.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="logo-v2-process-card"
                  key={item.title}
                >
                  <div className="logo-v2-process-icon">
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

export default LogoDesign;
