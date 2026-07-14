import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  BadgeCheck,
  Box,
  FileText,
  Layers3,
  Palette,
  Shirt,
  Sparkles,
  Target,
  Type,
} from "lucide-react";

import BrandingBoard from "../components/branding/BrandingBoard";
import { brandCases } from "../data/BrandingMaterialsData";

function BrandingMaterialView() {
  const { brandSlug } = useParams();

  const safeBrandCases = Array.isArray(brandCases)
    ? brandCases
    : [];

  const brand = safeBrandCases.find(
    (item) => item.slug === brandSlug
  );

  // Do not display Blinkit when another case study is missing
  if (!brand) {
    return (
      <section className="bcpro-not-found">
        <div className="container">
          <Link
            to="/services/branding-materials"
            className="bcpro-back"
          >
            <ArrowLeft size={18} />
            Back to Branding Materials
          </Link>

          <div className="bcpro-not-found-content">
            <h1>Brand case study not found</h1>

            <p>
              The branding case study you are trying to open does not exist or
              the page URL is incorrect.
            </p>

            <Link
              to="/services/branding-materials"
              className="primary-btn"
            >
              View Branding Materials
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const brandElements = Array.isArray(brand.elements)
    ? brand.elements
    : [];

  const brandColors = Array.isArray(brand.colors)
    ? brand.colors
    : [];

  const brandTypography = Array.isArray(brand.typography)
    ? brand.typography
    : [];

  return (
    <>
      {/* Hero section */}
      <section className="bcpro-hero">
        <div className="container bcpro-hero-grid">
          <div className="bcpro-hero-content">
            <Link
              to="/services/branding-materials"
              className="bcpro-back"
            >
              <ArrowLeft size={18} />
              Back to Branding Materials
            </Link>

            <span className="bcpro-label">
              <Sparkles size={16} />
              Branding Material Case Study
            </span>

            <h1>{brand.brandName}</h1>

            <p>{brand.description}</p>

            <div className="bcpro-meta">
              <div>
                <span>Project Type</span>
                <strong>
                  {brand.category || "Brand Identity"}
                </strong>
              </div>

              <div>
                <span>Brand Tagline</span>
                <strong>
                  {brand.tagline || "Not available"}
                </strong>
              </div>

              <div>
                <span>Project Year</span>
                <strong>
                  {brand.year || "2026"}
                </strong>
              </div>
            </div>
          </div>

          <aside className="bcpro-summary-card">
            <div className="bcpro-summary-icon">
              <Target size={34} />
            </div>

            <h3>Brand System Overview</h3>

            <p>
              A complete branding system created to make the brand consistent
              across logo usage, packaging, typography, patterns, apparel,
              bags, and marketing visuals.
            </p>

            <div className="bcpro-summary-tags">
              <span>Logo</span>
              <span>Colors</span>
              <span>Typography</span>
              <span>Mockups</span>
            </div>
          </aside>
        </div>
      </section>

      {/* Branding board */}
      <section className="bcpro-board-section">
        <div className="container">
          <div className="bcpro-heading">
            <span>Brand Presentation</span>

            <h2>
              {brand.brandName} visual identity board
            </h2>

            <p>
              A clean professional brand board divided into separate sections
              for logo, colors, patterns, typography, apparel, bags, and
              packaging materials.
            </p>
          </div>

          <BrandingBoard brand={brand} />
        </div>
      </section>

      {/* Branding elements */}
      <section className="bcpro-elements-section">
        <div className="container bcpro-elements-grid">
          <div className="bcpro-elements-content">
            <span className="section-label">
              Branding Elements
            </span>

            <h2>
              Complete visual system for {brand.brandName}
            </h2>

            <p>
              This branding material presentation shows how the brand should
              appear across touchpoints like logo usage, colors, typography,
              pattern, packaging, apparel, print materials, and digital
              marketing assets.
            </p>

            <div className="bcpro-elements-list">
              {brandElements.length > 0 ? (
                brandElements.map((item, index) => (
                  <div key={`${item}-${index}`}>
                    <BadgeCheck size={21} />
                    <span>{item}</span>
                  </div>
                ))
              ) : (
                <p>No branding elements are available.</p>
              )}
            </div>
          </div>

          <aside className="bcpro-included-card">
            <h3>Included Materials</h3>

            <div className="bcpro-included-list">
              <div>
                <Palette size={21} />
                <span>Color Palette</span>
              </div>

              <div>
                <Type size={21} />
                <span>Typography System</span>
              </div>

              <div>
                <Layers3 size={21} />
                <span>Pattern Direction</span>
              </div>

              <div>
                <Shirt size={21} />
                <span>Apparel Mockups</span>
              </div>

              <div>
                <Box size={21} />
                <span>Packaging Mockups</span>
              </div>

              <div>
                <FileText size={21} />
                <span>Brand Presentation</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Colors and typography
      <section className="bcpro-style-section">
        <div className="container">
          <div className="bcpro-heading">
            <span>Style System</span>

            <h2>Brand colors and typography</h2>

            <p>
              These core identity elements keep the brand visually consistent
              across every platform, marketing material, and customer
              touchpoint.
            </p>
          </div>

          <div className="bcpro-style-grid">
            <div className="bcpro-style-card">
              <h3>Brand Colors</h3>

              <div className="bcpro-color-row">
                {brandColors.length > 0 ? (
                  brandColors.map((color, index) => (
                    <div key={`${color}-${index}`}>
                      <span
                        style={{
                          backgroundColor: color,
                        }}
                      />

                      <p>{color}</p>
                    </div>
                  ))
                ) : (
                  <p>No brand colors are available.</p>
                )}
              </div>
            </div>

            <div className="bcpro-style-card">
              <h3>Typography</h3>

              <div className="bcpro-type-list">
                {brandTypography.length > 0 ? (
                  brandTypography.map((font, index) => (
                    <div key={`${font}-${index}`}>
                      <strong>Aa</strong>
                      <span>{font}</span>
                    </div>
                  ))
                ) : (
                  <p>No typography information is available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default BrandingMaterialView;