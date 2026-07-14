import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatermarkDownloadButton from "../components/WatermarkDownloadButton";

import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Eye,
  Frame,
  Layers3,
  Palette,
  Sparkles,
  X,
} from "lucide-react";

const frameSamples = [
{
  title: "Baby Photo Frame",
  image: "/images/photo-frame/baby-frame.webp",
},
{
  title: "Greeting Card Design",
  image: "/images/photo-frame/card.webp",
},
{
  title: "Classic Photo Frame",
  image: "/images/photo-frame/frame.webp",
},
{
  title: "Google Template Design",
  image: "/images/photo-frame/google-template.webp",
},
{
  title: "Love Photo Frame",
  image: "/images/photo-frame/love-frame.webp",
},
{
  title: "Love Story Photo Frame",
  image: "/images/photo-frame/love-story-frame.webp",
},
{
  title: "Sorry Card Design",
  image: "/images/photo-frame/sorry-card.webp",
},
{
  title: "Wedding Photo Frame",
  image: "/images/photo-frame/wedding.webp",
},
{
  title: "Wedding Photo Frame",
  image: "/images/photo-frame/wedding.webp",
},
];

const benefits = [
  "Custom photo frame designs for events, festivals, brands, and campaigns",
  "Professional frame layouts for social media sharing and promotions",
  "Perfect for schools, NGOs, businesses, organizations, and creators",
  "Brand logo, colors, text, and campaign message integration",
  "High-quality export formats for digital and print usage",
  "Clean, attractive, and shareable design presentation",
];

const process = [
  {
    icon: Camera,
    title: "Frame Requirement",
    text: "We understand your event, campaign, brand, photo usage, colors, and message before starting the frame design.",
  },
  {
    icon: Palette,
    title: "Creative Styling",
    text: "We design the frame with balanced spacing, brand colors, clean borders, and attractive visual elements.",
  },
  {
    icon: Layers3,
    title: "Final Frame Delivery",
    text: "You receive polished photo frame files ready for social media, campaign use, event promotion, and branding.",
  },
];

function createFileName(title) {
  return `${title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")}.png`;
}

function PhotoFrame() {
  const [previewFrame, setPreviewFrame] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFrames = showAll
    ? frameSamples
    : frameSamples.slice(0, 4);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPreviewFrame(null);
      }
    };

    if (previewFrame) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [previewFrame]);

  return (
    <>
      {/* Hero section */}
      <section className="pf-page-hero">
        <div className="container pf-page-hero-grid">
          <div className="pf-page-hero-content">
            <span className="section-label dark-label">
              <Sparkles size={16} />
              Creative Service
            </span>

            <h1>Photo Frame</h1>

            <p>
              Create beautiful and professional photo frame designs for events,
              festivals, campaigns, schools, NGOs, brands, social media, and
              special celebrations.
            </p>

            <div className="pf-page-hero-actions">
              <Link to="/contact" className="primary-btn">
                Commission Frame Work
                <ArrowRight size={18} />
              </Link>

              <a
                href="#photo-frame-gallery"
                className="secondary-btn"
              >
                View Samples
              </a>
            </div>
          </div>

          <div className="pf-page-hero-card">
            <div className="pf-page-card-icon">
              <Frame size={34} />
            </div>

            <h3>Creative Photo Frame Designs</h3>

            <p>
              Shareable frame designs created with clean borders, strong visual
              identity, event details, brand logo, and attractive layout.
            </p>

            <div className="pf-page-tags">
              <span>Festival</span>
              <span>Event</span>
              <span>Campaign</span>
              <span>Branding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section
        className="pf-page-gallery-section"
        id="photo-frame-gallery"
      >
        <div className="container">
          <div className="pf-page-heading">
            <span className="section-label">
              Photo Frame Gallery
            </span>

            <h2>Explore professional photo frame styles</h2>

            <p>
              Showcase event frames, festival frames, campaign frames, school
              frames, social media frames, and branded photo frame designs in a
              clean portfolio-style grid.
            </p>
          </div>

          <div className="pf-page-gallery-grid">
            {visibleFrames.map((item) => (
              <div
                className="pf-page-card"
                key={item.title}
              >
                <div className="pf-page-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>

                <div className="pf-page-card-content">
                  <div className="pf-page-card-info">
                    <h3>{item.title}</h3>
                    <span>Photo Frame</span>
                  </div>

                  <div className="pf-page-actions">
                    <button
                      type="button"
                      className="pf-page-preview-btn"
                      onClick={() => setPreviewFrame(item)}
                    >
                      <Eye size={15} />
                      Preview
                    </button>

                    <WatermarkDownloadButton
                      imageUrl={item.image}
                      fileName={createFileName(item.title)}
                      className="pf-page-download-btn"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {frameSamples.length > 4 && (
            <div className="pf-page-view-all-wrap">
              <button
                type="button"
                className="pf-page-view-all-btn"
                onClick={() => setShowAll((current) => !current)}
              >
                {showAll
                  ? "Show Less"
                  : "View All Photo Frames"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Preview modal */}
      {previewFrame && (
        <div
          className="pf-page-modal-overlay"
          onClick={() => setPreviewFrame(null)}
          role="presentation"
        >
          <div
            className="pf-page-modal-box"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-frame-preview-title"
          >
            <button
              type="button"
              className="pf-page-modal-close"
              onClick={() => setPreviewFrame(null)}
              aria-label="Close preview"
            >
              <X size={22} />
            </button>

            <div className="pf-page-modal-image">
              <img
                src={previewFrame.image}
                alt={previewFrame.title}
              />
            </div>

            <div className="pf-page-modal-footer">
              <div>
                <h3 id="photo-frame-preview-title">
                  {previewFrame.title}
                </h3>

                <p>Full photo frame preview</p>
              </div>

              <WatermarkDownloadButton
                imageUrl={previewFrame.image}
                fileName={createFileName(previewFrame.title)}
                className="pf-page-download-btn"
              />
            </div>
          </div>
        </div>
      )}

      {/* Service details */}
      <section className="pf-page-detail-section">
        <div className="container pf-page-detail-grid">
          <div className="pf-page-detail-content">
            <span className="section-label">
              Service Details
            </span>

            <h2>What you get in Photo Frame Design</h2>

            <p>
              Our photo frame design service helps you create attractive and
              branded frames for digital campaigns, events, festivals,
              celebrations, and social media sharing.
            </p>

            <div className="pf-page-benefit-list">
              {benefits.map((item) => (
                <div key={item}>
                  <BadgeCheck size={21} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="pf-page-quote-card">
            <h3>Need a custom photo frame?</h3>

            <p>
              Share your event name, photo frame size, logo, colors, message,
              and sample reference. We will create a professional frame design
              for your campaign or event.
            </p>

            <Link to="/contact" className="primary-btn">
              Start Frame Project
              <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </section>

      {/* Process section */}
      <section className="pf-page-process-section">
        <div className="container">
          <div className="pf-page-heading">
            <span className="section-label">
              Our Process
            </span>

            <h2>Simple process, beautiful frame output</h2>

            <p>
              From frame concept to final delivery, the process is clear,
              professional, and focused on creating shareable visual designs.
            </p>
          </div>

          <div className="pf-page-process-grid">
            {process.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="pf-page-process-card"
                  key={item.title}
                >
                  <div className="pf-page-process-icon">
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

export default PhotoFrame;