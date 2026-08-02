import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SEO from "../components/SEO";
import ServiceContentSection from "../components/seo/ServiceContentSection";
import { uiDesignServiceContent } from "../data/pageSeoContent";

import {
  includedItems,
  processSteps,
  uiDesignTypes,
} from "../data/uiDesignData";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Eye,
  MessageCircle,
  Rocket,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   SMALL COMPONENTS
========================================================= */

const DEFAULT_UI_IMAGE =
  "/images/ui-design/placeholder/ui-design-placeholder.webp";

function UIDesignImage({
  item,
  src,
  className = "",
  eager = false,
}) {
  const imageSource = src || DEFAULT_UI_IMAGE;

  return (
    <img
      src={imageSource}
      alt={`${item.title} preview`}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={(event) => {
        if (event.currentTarget.src.endsWith(DEFAULT_UI_IMAGE)) {
          return;
        }

        event.currentTarget.src = DEFAULT_UI_IMAGE;
      }}
    />
  );
}

function UIDesignCard({ item, index, onPreview }) {
  const Icon = item.icon;
  const content = item.previewContent;

  return (
    <article className="uicg-card">
      <div className="uicg-card-media">
        <UIDesignImage
          item={item}
          src={item.cardImage}
          className="uicg-card-image"
        />

        <button
          type="button"
          className="uicg-card-media-preview"
          onClick={() => onPreview(item)}
          aria-label={`Preview ${item.title}`}
        >
          <Eye size={17} aria-hidden="true" />
          Preview Design
        </button>
      </div>

      <div className="uicg-card-content">
        <div className="uicg-card-meta">
          <span>
            <Icon size={15} aria-hidden="true" />
            {item.category}
          </span>

          <small>
            {String(index + 1).padStart(2, "0")}
          </small>
        </div>

        <h3>{item.title}</h3>
        <p>{item.description}</p>

        <div className="uicg-card-direction">
          <small>Preview content</small>
          <strong>{content.headline}</strong>
          <span>{content.subline}</span>
        </div>

        <div className="uicg-card-tags">
          {item.deliverables.map((deliverable) => (
            <span key={deliverable}>
              {deliverable}
            </span>
          ))}
        </div>

        <div className="uicg-card-actions">
          <button
            type="button"
            className="uicg-preview-button"
            onClick={() => onPreview(item)}
          >
            <Eye size={18} aria-hidden="true" />
            Preview
          </button>

          <Link
            to="/contact"
            state={{
              selectedService: item.title,
            }}
            className="uicg-contact-button"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Contact
          </Link>
        </div>
      </div>
    </article>
  );
}

function UIDesignPreviewModal({ item, onClose }) {
  const Icon = item.icon;
  const titleId = `uicg-preview-title-${item.id}`;

  return (
    <div
      className="uicg-preview-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="uicg-preview-viewer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="uicg-preview-header">
          <div className="uicg-preview-project">
            <div aria-hidden="true">
              <Icon size={22} />
            </div>

            <span>
              <strong id={titleId}>{item.title}</strong>
              <small>
                Limitless Design · UI Design Preview
              </small>
            </span>
          </div>

          <div className="uicg-preview-header-actions">
            <Link
              to="/contact"
              state={{
                selectedService: item.title,
              }}
              className="uicg-preview-contact"
              onClick={onClose}
            >
              <MessageCircle size={17} aria-hidden="true" />
              Contact
            </Link>

            <button
              type="button"
              className="uicg-preview-close"
              onClick={onClose}
              aria-label="Close design preview"
            >
              <X size={21} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="uicg-preview-scroll-area">
          <div className="uicg-preview-canvas">
            <div className="uicg-preview-image-shell">
              <UIDesignImage
                item={item}
                src={item.previewImage || item.cardImage}
                className="uicg-preview-image"
                eager
              />
            </div>
          </div>

          <div className="uicg-preview-information">
            <div>
              <span>{item.category} UI Concept</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>

            <div className="uicg-preview-deliverables">
              <small>Preview design includes</small>

              <div>
                {item.deliverables.map((deliverable) => (
                  <span key={deliverable}>
                    <CheckCircle2
                      size={16}
                      aria-hidden="true"
                    />
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              state={{
                selectedService: item.title,
              }}
              className="uicg-preview-bottom-contact"
              onClick={onClose}
            >
              Start a Similar UI Project
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function IncludedCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="ui-design-included-card">
      <div
        className="ui-design-included-icon"
        aria-hidden="true"
      >
        <Icon size={24} />
      </div>

      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}

/* =========================================================
   UI DESIGN PAGE
========================================================= */

function UIDesign() {
  const [showAllDesigns, setShowAllDesigns] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  const visibleDesignTypes = showAllDesigns
    ? uiDesignTypes
    : uiDesignTypes.slice(0, 4);

  useEffect(() => {
    if (!selectedDesign) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedDesign(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedDesign]);

  return (
    <>
      <SEO
        title="Professional UI Design Services | Limitless Design"
        description="Professional responsive UI design for websites, mobile apps, dashboards, SaaS products, ecommerce stores and digital platforms."
        path="/services/ui-design"
        image="/logo-01.webp"
      />

      <main className="ui-design-page">
      {/* Hero */}
      <section
        className="ui-design-hero"
        aria-labelledby="ui-design-page-title"
      >
        <div className="container ui-design-hero-grid">
          <div className="ui-design-hero-content">
            <span className="ui-design-hero-label">
              <Sparkles size={16} aria-hidden="true" />
              Complete UI Design Services
            </span>

            <h1 id="ui-design-page-title">
              Interfaces that look polished
              <span> and feel effortless.</span>
            </h1>

            <p>
              Explore UI design for websites, mobile apps,
              dashboards, SaaS products, e-commerce stores,
              industry platforms, and reusable design systems.
            </p>

            <div className="ui-design-hero-actions">
              <a
                href="#ui-design-types"
                className="ui-design-primary-button"
              >
                Explore UI Types
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <Link
                to="/contact"
                state={{
                  selectedService: "UI Design",
                }}
                className="ui-design-secondary-button"
              >
                Start a UI Project
              </Link>
            </div>

            <div className="ui-design-hero-points">
              <span>
                <BadgeCheck size={18} aria-hidden="true" />
                Responsive interface planning
              </span>

              <span>
                <BadgeCheck size={18} aria-hidden="true" />
                Product-focused visual systems
              </span>

              <span>
                <BadgeCheck size={18} aria-hidden="true" />
                Developer-friendly organization
              </span>
            </div>
          </div>

          <div className="ui-design-hero-visual">
            <div className="ui-design-studio-window">
              <div className="ui-design-studio-topbar">
                <div>
                  <span />
                  <span />
                  <span />
                </div>

                <small>UI Workspace</small>
              </div>

              <div className="ui-design-studio-body">
                <aside>
                  <div className="ui-design-studio-logo">
                    <Sparkles size={19} />
                  </div>

                  <span />
                  <span />
                  <span />
                  <span />
                </aside>

                <div className="ui-design-studio-canvas">
                  <div className="ui-design-studio-heading">
                    <div>
                      <small>Interface library</small>
                      <strong>12+ UI directions</strong>
                    </div>

                    <span>Live system</span>
                  </div>

                  <div className="ui-design-studio-feature">
                    <div>
                      <small>Design smarter</small>
                      <strong>
                        Consistent screens for every product stage.
                      </strong>
                    </div>

                    <Rocket size={30} />
                  </div>

                  <div className="ui-design-studio-grid">
                    <div>
                      <span />
                      <strong>Web UI</strong>
                      <small>Responsive layouts</small>
                    </div>

                    <div>
                      <span />
                      <strong>App UI</strong>
                      <small>Mobile experiences</small>
                    </div>

                    <div>
                      <span />
                      <strong>Systems</strong>
                      <small>Reusable components</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ui-design-floating-card ui-design-floating-card-one">
              <span>Component coverage</span>
              <strong>Reusable UI</strong>
            </div>

            <div className="ui-design-floating-card ui-design-floating-card-two">
              <span>Product direction</span>
              <strong>Clear journeys</strong>
            </div>
          </div>
        </div>
      </section>
      {/* UI Design gallery */}
      <section
        className="ui-design-types-section"
        id="ui-design-types"
      >
        <div className="container">
          <div className="ui-design-section-heading">
            <span>UI Design Gallery</span>

            <h2>
              Interface directions built for different digital products
            </h2>

            <p>
              The first four designs are shown as featured work.
              Open the complete collection when you are ready to
              explore every UI design direction.
            </p>
          </div>

          <div className="ui-design-types-grid">
            {visibleDesignTypes.map((item, index) => (
              <UIDesignCard
                key={item.id}
                item={item}
                index={index}
                onPreview={setSelectedDesign}
              />
            ))}
          </div>

          <div className="uicg-view-all-wrap">
            <button
              type="button"
              className={`uicg-view-all-button ${
                showAllDesigns ? "is-open" : ""
              }`}
              onClick={() => setShowAllDesigns((current) => !current)}
              aria-expanded={showAllDesigns}
            >
              {showAllDesigns
                ? "Show Featured UI Designs"
                : "View All UI Designs"}

              <ArrowRight
                size={19}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </section>



      {/* Included */}
      <section className="ui-design-included-section">
        <div className="container">
          <div className="ui-design-included-heading">
            <div>
              <span className="section-label dark-label">
                Built Beyond Individual Screens
              </span>

              <h2>
                A useful UI project needs consistency, not only
                attractive layouts
              </h2>
            </div>

            <p>
              Every interface direction considers responsive
              behaviour, reusable elements, clear hierarchy, and
              practical development handoff.
            </p>
          </div>

          <div className="ui-design-included-grid">
            {includedItems.map((item) => (
              <IncludedCard
                key={item.title}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="ui-design-process-section">
        <div className="container">
          <div className="ui-design-section-heading">
            <span>UI Design Process</span>

            <h2>
              A clear path from product idea to polished interface
            </h2>

            <p>
              The process keeps business goals, user needs, visual
              consistency, and implementation requirements aligned.
            </p>
          </div>

          <div className="ui-design-process-grid">
            {processSteps.map((step) => (
              <article
                className="ui-design-process-card"
                key={step.number}
              >
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ui-design-cta-section">
        <div className="container ui-design-cta">
          <div className="ui-design-cta-content">
            <span>Start Your UI Project</span>

            <h2>
              Have a product idea that needs a clear visual system?
            </h2>

            <p>
              Share the platform, required screens, audience,
              references, and business goal to begin the UI design
              process.
            </p>

            <Link
              to="/contact"
              state={{
                selectedService: "UI Design",
              }}
              className="ui-design-cta-button"
            >
              Commission UI Design
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ServiceContentSection {...uiDesignServiceContent} />

      {selectedDesign && (
        <UIDesignPreviewModal
          item={selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      )}
      </main>
    </>
  );
}

export default UIDesign;