import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DownloadPreviewButton from "../components/DownloadPreviewButton";
import { socialMediaBannerDownloads } from "../data/downloadAssets";

import {
  ArrowRight,
  BadgeCheck,
  Eye,
  Image as ImageIcon,
  Layers3,
  Megaphone,
  Palette,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   SOCIAL MEDIA BANNER BENEFITS
========================================================= */

const benefits = [
  "Scroll-stopping social media creatives for campaigns and promotions",
  "Platform-friendly sizes for Instagram, Facebook, LinkedIn, and YouTube",
  "Clean text hierarchy with strong call-to-action placement",
  "Perfect for ecommerce stores, startups, agencies, and creators",
  "High-quality export formats for ads, posts, stories, and banners",
  "Brand-consistent design using colors, typography, and visual identity",
];

/* =========================================================
   SOCIAL MEDIA BANNER PROCESS
========================================================= */

const process = [
  {
    icon: Megaphone,
    title: "Campaign Understanding",
    text: "We understand your offer, audience, platform, brand style, and campaign goal before starting the creative.",
  },
  {
    icon: Palette,
    title: "Creative Direction",
    text: "We create a strong layout with attractive colors, readable text, product focus, and clear visual hierarchy.",
  },
  {
    icon: Layers3,
    title: "Final Banner Delivery",
    text: "You receive polished social media banners ready for posting, advertising, promotion, and brand marketing.",
  },
];

/* =========================================================
   SOCIAL MEDIA BANNER PAGE
========================================================= */

function SocialMediaBanner() {
  const [previewBanner, setPreviewBanner] = useState(null);
  const [showAll, setShowAll] = useState(false);

  /*
    Every banner now comes from the shared downloadAssets.js file.

    The same asset object is used by:
    1. The Social Media Banner gallery
    2. The quick preview modal
    3. The global full-screen download page
    4. Previous and next design navigation
    5. PNG, JPG, WEBP and source-file downloads
  */
  const availableBanners = Array.isArray(
    socialMediaBannerDownloads
  )
    ? socialMediaBannerDownloads
    : [];

  const visibleBanners = showAll
    ? availableBanners
    : availableBanners.slice(0, 4);

  /* =========================================================
     QUICK PREVIEW MODAL
  ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPreviewBanner(null);
      }
    };

    if (previewBanner) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [previewBanner]);

  return (
    <>
      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="smb-v2-hero">
        <div className="container smb-v2-hero-grid">
          <div className="smb-v2-hero-content">
            <span className="section-label dark-label">
              <Sparkles size={16} aria-hidden="true" />
              Creative Service
            </span>

            <h1>Social Media Banner</h1>

            <p>
              Create professional social media banners for Instagram,
              Facebook, LinkedIn, YouTube, ads, campaigns, offers, product
              promotions, and brand awareness.
            </p>

            <div className="smb-v2-hero-actions">
              <Link to="/contact" className="primary-btn">
                Commission Banner Work
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <a
                href="#social-banner-gallery"
                className="secondary-btn"
              >
                View Samples
              </a>
            </div>
          </div>

          <div className="smb-v2-hero-card">
            <div className="smb-v2-card-icon">
              <ImageIcon size={34} aria-hidden="true" />
            </div>

            <h3>High-Impact Social Creatives</h3>

            <p>
              Campaign-ready banners designed with clear messaging, premium
              visuals, strong calls to action, and platform-friendly layouts.
            </p>

            <div className="smb-v2-tags">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Ads</span>
              <span>Campaigns</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BANNER GALLERY
      ====================================================== */}

      <section
        className="smb-v2-gallery-section"
        id="social-banner-gallery"
      >
        <div className="container">
          <div className="smb-v2-heading">
            <span className="section-label">
              Social Media Banner Gallery
            </span>

            <h2>Explore professional banner design styles</h2>

            <p>
              Showcase social media creatives, ad banners, festival campaigns,
              product promotions, and brand marketing designs in a clean
              portfolio-style grid.
            </p>
          </div>

          {visibleBanners.length > 0 ? (
            <div className="smb-v2-gallery-grid">
              {visibleBanners.map((item) => (
                <article
                  className="smb-v2-card"
                  key={item.slug}
                >
                  <div className="smb-v2-image-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="smb-v2-card-content">
                    <div className="smb-v2-card-info">
                      <h3>{item.title}</h3>

                      <span>
                        {item.category || "Social Media Banner"}
                      </span>
                    </div>

                    <div className="smb-v2-actions">
                      {/* Opens the quick image preview */}
                      <button
                        type="button"
                        className="smb-v2-preview-btn"
                        onClick={() => setPreviewBanner(item)}
                        aria-label={`Preview ${item.title}`}
                      >
                        <Eye size={15} aria-hidden="true" />
                        Preview
                      </button>

                      {/*
                        Opens the universal download preview.

                        Example URL:
                        /download/social-media-banner/fashion-sale-banner
                      */}
                      <DownloadPreviewButton
                        asset={item}
                        className="smb-v2-download-btn"
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
              className="smb-v2-empty-state"
              role="status"
            >
              <ImageIcon size={44} aria-hidden="true" />

              <h3>No banner designs available</h3>

              <p>
                Add banner entries inside the
                socialMediaBannerDownloads array in
                src/data/downloadAssets.js.
              </p>
            </div>
          )}

          {availableBanners.length > 4 && (
            <div className="smb-v2-view-all-wrap">
              <button
                type="button"
                className="smb-v2-view-all-btn"
                onClick={() => {
                  setShowAll((current) => !current);
                }}
                aria-expanded={showAll}
              >
                {showAll
                  ? "Show Less"
                  : "View All Banner Designs"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          QUICK PREVIEW MODAL
      ====================================================== */}

      {previewBanner && (
        <div
          className="smb-v2-modal-overlay"
          onClick={() => setPreviewBanner(null)}
          role="presentation"
        >
          <div
            className="smb-v2-modal-box"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="banner-preview-title"
          >
            <button
              type="button"
              className="smb-v2-modal-close"
              onClick={() => setPreviewBanner(null)}
              aria-label="Close preview"
            >
              <X size={22} aria-hidden="true" />
            </button>

            <div className="smb-v2-modal-image">
              <img
                src={previewBanner.image}
                alt={previewBanner.title}
              />
            </div>

            <div className="smb-v2-modal-footer">
              <div>
                <h3 id="banner-preview-title">
                  {previewBanner.title}
                </h3>

                <p>Full banner preview</p>
              </div>

              <DownloadPreviewButton
                asset={previewBanner}
                className="smb-v2-download-btn"
                onBeforeNavigate={() => setPreviewBanner(null)}
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

      <section className="smb-v2-detail-section">
        <div className="container smb-v2-detail-grid">
          <div className="smb-v2-detail-content">
            <span className="section-label">
              Service Details
            </span>

            <h2>
              What you get in Social Media Banner Design
            </h2>

            <p>
              Our social media banner design service helps businesses and
              creators communicate offers, launches, campaigns, and brand
              messages with professional visual quality.
            </p>

            <div className="smb-v2-benefit-list">
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

          <aside className="smb-v2-quote-card">
            <h3>Need a custom banner?</h3>

            <p>
              Share your platform, banner size, offer details, product images,
              brand colors, and content. We will create a professional banner
              direction for your campaign.
            </p>

            <Link to="/contact" className="primary-btn">
              Start Banner Project
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {/* =====================================================
          PROCESS SECTION
      ====================================================== */}

      <section className="smb-v2-process-section">
        <div className="container">
          <div className="smb-v2-heading">
            <span className="section-label">
              Our Process
            </span>

            <h2>Clear process, campaign-ready design</h2>

            <p>
              From campaign idea to final banner export, the process is simple,
              professional, and focused on better visual communication.
            </p>
          </div>

          <div className="smb-v2-process-grid">
            {process.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="smb-v2-process-card"
                  key={item.title}
                >
                  <div className="smb-v2-process-icon">
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

export default SocialMediaBanner;