import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

function BrandingMaterials() {
  return (
    <>
      {/* ==================== COMING SOON PAGE ==================== */}

      <section className="bm-coming-soon">

      <div className="container bm-coming-soon-container">
        <div className="bm-coming-soon-card">
          <div className="bm-coming-soon-icon">
            <Sparkles size={38} strokeWidth={1.8} />
          </div>

          <span className="bm-coming-soon-label">
            <Sparkles size={15} />
            Creative Service
          </span>

          <h1>Branding Materials</h1>
          <h2>Coming Soon</h2>

          <p className="bm-coming-soon-description">
            We are creating a premium collection of professional branding
            materials designed to help businesses build a strong, memorable,
            and consistent visual identity.
          </p>

          <p className="bm-coming-soon-note">
            The collection will include brand identity systems, stationery,
            packaging, merchandise, social media kits, marketing materials,
            typography, color palettes, and detailed brand presentations.
          </p>

          <div className="bm-coming-soon-features">
            <span>Brand Identity</span>
            <span>Packaging</span>
            <span>Stationery</span>
            <span>Marketing Assets</span>
          </div>

          <div className="bm-coming-soon-buttons">
            <Link to="/contact" className="bm-coming-primary-btn">
              Contact Us
            </Link>

            <Link to="/" className="bm-coming-secondary-btn">
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>


      {/* ==========================================================
          ORIGINAL BRANDING MATERIALS PAGE — TEMPORARILY DISABLED
          Remove the comment markers when the page is ready.
      ========================================================== */}

      {/*
      <section className="bmpro-hero">
        <div className="container bmpro-hero-grid">
          <div className="bmpro-hero-content">
            <span className="section-label dark-label">
              <Sparkles size={16} />
              Creative Service
            </span>

            <h1>Branding Materials</h1>

            <p>
              Create complete branding materials for your business including
              logo usage, color palette, typography, brand patterns, packaging,
              stationery, social media kit, merchandise, and marketing visuals.
            </p>

            <div className="bmpro-hero-actions">
              <Link to="/contact" className="primary-btn">
                Commission Branding Work
                <ArrowRight size={18} />
              </Link>

              <a href="#branding-gallery" className="secondary-btn">
                View Samples
              </a>
            </div>
          </div>

          <aside className="bmpro-hero-card">
            <div className="bmpro-hero-icon">
              <BriefcaseBusiness size={34} />
            </div>

            <h3>Complete Brand Identity System</h3>

            <p>
              Premium branding materials designed to keep your business visuals
              consistent across digital, print, packaging, and marketing.
            </p>

            <div className="bmpro-tags">
              <span>Logo Usage</span>
              <span>Colors</span>
              <span>Typography</span>
              <span>Packaging</span>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="bmpro-gallery-section"
        id="branding-gallery"
      >
        <div className="container">
          <div className="bmpro-heading">
            <span className="section-label">
              Branding Materials Gallery
            </span>

            <h2>
              Explore professional brand identity presentations
            </h2>

            <p>
              Open each branding material case study to view the complete brand
              board including logo, colors, typography, patterns, packaging,
              apparel, and marketing elements.
            </p>
          </div>

          <div className="bmpro-gallery-grid">
            {visibleBranding.map((item) => (
              <BrandingGalleryCard
                item={item}
                key={item.slug}
              />
            ))}
          </div>

          {brandingSamples.length > 4 && (
            <div className="bmpro-view-all-wrap">
              <button
                type="button"
                className="bmpro-view-all-btn"
                onClick={() =>
                  setShowAll((current) => !current)
                }
              >
                {showAll
                  ? "Show Less"
                  : "View All Branding Materials"}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bmpro-detail-section">
        <div className="container bmpro-detail-grid">
          <div className="bmpro-detail-content">
            <span className="section-label">
              Service Details
            </span>

            <h2>
              What you get in Branding Materials
            </h2>

            <p>
              Our branding material service helps businesses build a consistent
              and professional identity across every visual touchpoint.
            </p>

            <div className="bmpro-benefit-list">
              {brandingBenefits.map((item) => (
                <div key={item}>
                  <BadgeCheck size={21} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="bmpro-quote-card">
            <h3>Need a custom brand kit?</h3>

            <p>
              Share your logo, business category, brand colors, content,
              product photos, and reference style. We will create a complete
              branding material presentation for your business.
            </p>

            <Link to="/contact" className="primary-btn">
              Start Branding Project
              <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="bmpro-process-section">
        <div className="container">
          <div className="bmpro-heading">
            <span className="section-label">
              Our Process
            </span>

            <h2>
              Simple process, complete brand system
            </h2>

            <p>
              From brand understanding to final presentation, the process is
              clear, professional, and focused on consistent visual identity.
            </p>
          </div>

          <div className="bmpro-process-grid">
            {brandingProcess.map((item, index) => {
              const icons = [
                Palette,
                Layers3,
                Package,
              ];

              const Icon =
                icons[index] || Layers3;

              return (
                <article
                  className="bmpro-process-card"
                  key={item.title}
                >
                  <div className="bmpro-process-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      */}
    </>
  );
}

export default BrandingMaterials;