import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Layers3,
  Package,
  Palette,
  Sparkles,
} from "lucide-react";

import BrandingGalleryCard from "../components/branding/BrandingGalleryCard";
import SEO from "../components/SEO";
import ServiceContentSection from "../components/seo/ServiceContentSection";
import { brandingServiceContent } from "../data/pageSeoContent";
import {
  brandingBenefits,
  brandingProcess,
  brandingSamples,
} from "../data/BrandingMaterialsData";

function BrandingMaterials() {
  const [showAll, setShowAll] = useState(false);

  const safeSamples = Array.isArray(brandingSamples)
    ? brandingSamples
    : [];

  const visibleBranding = showAll
    ? safeSamples
    : safeSamples.slice(0, 4);

  const processIcons = [Palette, Layers3, Package];

  return (
    <>
      <SEO
        title="Branding Materials & Brand Identity | Limitless Design"
        description="Create a professional and consistent brand identity with custom logo usage, color palettes, typography, packaging, stationery and marketing materials."
        path="/services/branding-materials"
        image="/logo-01.webp"
      />

      <main className="bmpro-page">
        <section className="bmpro-hero">
          <div className="container bmpro-hero-grid">
            <div className="bmpro-hero-content">
              <span className="section-label dark-label">
                <Sparkles size={16} aria-hidden="true" />
                Creative Service
              </span>

              <h1>Branding Materials</h1>

              <p>
                Create a complete and consistent visual identity for your
                business, including logo usage, colors, typography, patterns,
                packaging, stationery, merchandise, and marketing materials.
              </p>

              <div className="bmpro-hero-actions">
                <Link to="/contact" className="primary-btn">
                  Commission Branding Work
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>

                <a href="#branding-gallery" className="secondary-btn">
                  View Samples
                </a>
              </div>
            </div>

            <aside className="bmpro-hero-card">
              <div className="bmpro-hero-icon">
                <BriefcaseBusiness size={34} aria-hidden="true" />
              </div>

              <h2>Complete Brand Identity System</h2>

              <p>
                Professional branding materials that keep your business
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

              <h2>Explore professional brand identity presentations</h2>

              <p>
                Open any branding project to view its logo system, colors,
                typography, patterns, packaging, apparel, bags, and other brand
                applications.
              </p>
            </div>

            {visibleBranding.length > 0 ? (
              <div className="bmpro-gallery-grid">
                {visibleBranding.map((item) => (
                  <BrandingGalleryCard item={item} key={item.slug} />
                ))}
              </div>
            ) : (
              <p>No branding materials are available.</p>
            )}

            {safeSamples.length > 4 && (
              <div className="bmpro-view-all-wrap">
                <button
                  type="button"
                  className="bmpro-view-all-btn"
                  onClick={() => setShowAll((current) => !current)}
                  aria-expanded={showAll}
                  aria-controls="branding-gallery"
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
              <span className="section-label">Service Details</span>

              <h2>What you get in Branding Materials</h2>

              <p>
                This service helps your business maintain one professional and
                recognizable identity across every customer touchpoint.
              </p>

              <div className="bmpro-benefit-list">
                {brandingBenefits.map((item) => (
                  <div key={item}>
                    <BadgeCheck size={21} aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="bmpro-quote-card">
              <h3>Need a custom brand kit?</h3>

              <p>
                Share your logo, business category, preferred colors, content,
                product photographs, and reference style. We will use them to
                prepare a complete branding presentation for your business.
              </p>

              <Link to="/contact" className="primary-btn">
                Start Branding Project
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>

        <section className="bmpro-process-section">
          <div className="container">
            <div className="bmpro-heading">
              <span className="section-label">Our Process</span>

              <h2>Simple process, complete brand system</h2>

              <p>
                From brand discovery to the final presentation, each stage is
                focused on creating a consistent and usable visual identity.
              </p>
            </div>

            <div className="bmpro-process-grid">
              {brandingProcess.map((item, index) => {
                const Icon = processIcons[index] || Layers3;

                return (
                  <article className="bmpro-process-card" key={item.title}>
                    <div className="bmpro-process-icon">
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

        <ServiceContentSection {...brandingServiceContent} />
      </main>
    </>
  );
}

export default BrandingMaterials;
