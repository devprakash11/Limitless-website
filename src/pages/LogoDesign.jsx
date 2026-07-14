import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WatermarkDownloadButton from "../components/WatermarkDownloadButton";
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

const logoSamples = [
  {
    title: "Animalia Logo",
    image: "/images/logo-design/animalia.webp",
  },
  {
    title: "Black Hat Logo",
    image: "/images/logo-design/balck-hat.webp",
  },
  {
    title: "Bear Chat Logo",
    image: "/images/logo-design/bearchat.webp",
  },
  {
    title: "Bird Logo",
    image: "/images/logo-design/bird.webp",
  },
  {
    title: "Bishop Logo",
    image: "/images/logo-design/bishop-logo.webp",
  },
  {
    title: "C&C Logo",
    image: "/images/logo-design/C&C-logo.webp",
  },
  {
    title: "Chicken Tikka Logo",
    image: "/images/logo-design/chicken-tikka.webp",
  },
  {
    title: "Chrunchy Logo",
    image: "/images/logo-design/chrunchy.webp",
  },
  {
    title: "Clay Human Logo",
    image: "/images/logo-design/clay-human.webp",
  },
  {
    title: "Dance Logo",
    image: "/images/logo-design/dance-logo.webp",
  },
  {
    title: "Data Location Logo",
    image: "/images/logo-design/data-loacation-logo.webp",
  },
  {
    title: "Digital Library Logo",
    image: "/images/logo-design/digtal-library-logo.webp",
  },
  {
    title: "Dott Logo",
    image: "/images/logo-design/Dott-logo.webp",
  },
  {
    title: "Dragonoid Logo",
    image: "/images/logo-design/dragonoid-logo.webp",
  },
  {
    title: "Drive Com Logo",
    image: "/images/logo-design/drive-com.webp",
  },
  {
    title: "Elephant Logo",
    image: "/images/logo-design/elephant-logo.webp",
  },
  {
    title: "Food Logo",
    image: "/images/logo-design/food.webp",
  },
  {
    title: "Geek Owl Logo",
    image: "/images/logo-design/geekowl.webp",
  },
  {
    title: "Goat Leaf Logo",
    image: "/images/logo-design/goat-leaf.webp",
  },
  {
    title: "Humming Bird Logo",
    image: "/images/logo-design/humming-bird1.webp",
  },
  {
    title: "Moto Race Logo",
    image: "/images/logo-design/moto-race-logo.webp",
  },
  {
    title: "Nail Queen Logo",
    image: "/images/logo-design/nail-queen.webp",
  },
  {
    title: "Navyojan Logo",
    image: "/images/logo-design/navyojan.webp",
  },
  {
    title: "Organics Logo",
    image: "/images/logo-design/Organics-logo.webp",
  },
  {
    title: "Pasta House Logo",
    image: "/images/logo-design/Pasta-house.webp",
  },
  {
    title: "Peacock Logo",
    image: "/images/logo-design/peacock.webp",
  },
  {
    title: "Quick Stop Logo",
    image: "/images/logo-design/quick-stop.webp",
  },
  {
    title: "Restaurant 2 Logo",
    image: "/images/logo-design/restaurant-2.webp",
  },
  {
    title: "Restaurant Logo",
    image: "/images/logo-design/restaurant.webp",
  },
  {
    title: "Turning Point Logo",
    image: "/images/logo-design/TURNING-POINT.webp",
  },
  {
    title: "Veggie Food Logo",
    image: "/images/logo-design/VEGGIE-FOOD.webp",
  },
  {
    title: "Wetcap Logo",
    image: "/images/logo-design/wetcap-logo.webp",
  },
  {
    title: "Whale Logo",
    image: "/images/logo-design/whale-logo.webp",
  },
];

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

  const visibleLogos = showAll ? logoSamples : logoSamples.slice(0, 4);


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
              <Sparkles size={16} />
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
                Commission Logo Work <ArrowRight size={18} />
              </Link>

              <a href="#logo-gallery" className="secondary-btn">
                View Samples
              </a>
            </div>
          </div>

          <div className="logo-v2-hero-card">
            <div className="logo-v2-card-icon">
              <Brush size={34} />
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

      <section className="logo-v2-gallery-section" id="logo-gallery">
        <div className="container">
          <div className="logo-v2-heading">
            <span className="section-label">Logo Design Gallery</span>
            <h2>Explore professional logo design styles</h2>
            <p>
              A clean showcase layout inspired by creative portfolio grids. Add
              your own logo samples inside the image folder and display them
              beautifully on this page.
            </p>
          </div>

          <div className="logo-v2-gallery-grid">
            {visibleLogos.map((item) => (
              <div className="logo-v2-card" key={item.title}>
                <div className="logo-v2-image-wrap">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="logo-v2-card-content">
                  <div className="logo-v2-card-info">
                    <h3>{item.title}</h3>
                    <span>Logo Design</span>
                  </div>

                  <div className="logo-v2-actions">
                    <button
                      type="button"
                      className="logo-v2-preview-btn"
                      onClick={() => setPreviewLogo(item)}
                    >
                      <Eye size={15} />
                      Preview
                    </button>

                    <WatermarkDownloadButton
                      imageUrl={item.image}
                      fileName={`${item.title
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, "-")}.png`}
                      className="logo-v2-download-btn"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {logoSamples.length > 4 && (
            <div className="logo-v2-view-all-wrap">
              <button
                type="button"
                className="logo-v2-view-all-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "View All Logo Designs"}
              </button>
            </div>
          )}
        </div>
      </section>

      {previewLogo && (
        <div
          className="logo-v2-modal-overlay"
          onClick={() => setPreviewLogo(null)}
        >
          <div
            className="logo-v2-modal-box"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="logo-v2-modal-close"
              onClick={() => setPreviewLogo(null)}
              aria-label="Close preview"
            >
              <X size={22} />
            </button>

            <div className="logo-v2-modal-image">
              <img src={previewLogo.image} alt={previewLogo.title} />
            </div>

            <div className="logo-v2-modal-footer">
              <div>
                <h3>{previewLogo.title}</h3>
                <p>Full logo preview</p>
              </div>

              <button
                type="button"
                className="logo-v2-download-btn"
                onClick={() => handleDownload(previewLogo)}
              >
                <Download size={15} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="logo-v2-detail-section">
        <div className="container logo-v2-detail-grid">
          <div className="logo-v2-detail-content">
            <span className="section-label">Service Details</span>

            <h2>What you get in Logo Design</h2>

            <p>
              Our logo design service helps you create a strong and professional
              brand identity. Every logo is designed with proper visual balance,
              typography, color harmony, and business usability.
            </p>

            <div className="logo-v2-benefit-list">
              {benefits.map((item) => (
                <div key={item}>
                  <BadgeCheck size={21} />
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
              Start Logo Project <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </section>

      <section className="logo-v2-process-section">
        <div className="container">
          <div className="logo-v2-heading">
            <span className="section-label">Our Process</span>
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
                <div className="logo-v2-process-card" key={item.title}>
                  <div className="logo-v2-process-icon">
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

export default LogoDesign;