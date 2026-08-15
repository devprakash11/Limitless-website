import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import SEO from "../components/SEO";
import ServiceContentSection from "../components/seo/ServiceContentSection";
import { pricingPageContent } from "../data/pageSeoContent";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CreditCard,
  Crown,
  FileArchive,
  FileImage,
  Image as ImageIcon,
  MonitorSmartphone,
  Palette,
  PenTool,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* =========================================================
   PRICING DATA
========================================================= */

const pricingPlans = [
  {
    slug: "business-card-design",
    learnMorePath: "/services/business-card-design",
    title: "Business Card Design",
    price: "299",
    icon: CreditCard,
    description:
      "A clean, professional business card layout created around your brand and contact details.",
    features: [
      "One-side design available",
      "Both-side design available",
      "Professional information hierarchy",
      "Digital preview before final delivery",
    ],
    note:
      "Choose a one-side or both-side layout according to your business requirement.",
  },
  {
    slug: "logo-design",
    learnMorePath: "/services/logo-design",
    title: "Logo Design",
    price: "999",
    icon: PenTool,
    description:
      "A custom logo direction designed to give your business a clear and memorable visual identity.",
    features: [
      "3 logo variants included",
      "Professional logo presentation",
      "Brand-focused creative direction",
      "Final design file included",
    ],
    note:
      "You receive four logo variants to review before selecting the final direction.",
  },
  {
    slug: "poster-design",
    learnMorePath: "/services/poster-design",
    title: "Poster Design",
    price: "699",
    icon: FileImage,
    description:
      "A high-impact poster created for promotions, events, campaigns, announcements, or business marketing.",
    features: [
      "2 poster variants included",
      "Strong headline and content hierarchy",
      "Campaign-focused visual layout",
      "Digital or print-oriented composition",
    ],
    note:
      "You receive two poster variants based on the same project brief.",
  },
  {
    slug: "brand-design",
    learnMorePath: "/services/branding-materials",
    title: "Brand Design",
    price: "7999",
    icon: Palette,
    featured: true,
    description:
      "A complete starter brand identity package created to give your business a consistent professional look.",
    features: [
      "Custom logo design",
      "Brand pattern",
      "2 to 3 brand mockups",
      "2 social media posters",
      "Typography system",
      "Colour palette",
    ],
    note:
      "Best suited for startups, small businesses, product brands, and new business launches.",
  },
];

const uiUxPlans = [
  {
    slug: "ui-ux-basic-plan",
    learnMorePath: "/services/ui-design",
    title: "Basic Plan",
    price: "3499",
    icon: MonitorSmartphone,
    label: "Starter UI/UX",
    description:
      "A focused UI/UX package for small business websites, portfolios, landing pages, and compact digital experiences.",
    features: [
      "Custom visual theme",
      "Up to 4 unique pages",
      "2 promotional poster designs",
      "Desktop and mobile responsive layouts",
      "Basic user-flow and page hierarchy",
      "Standard buttons, forms, cards, and navigation",
      "Basic clickable prototype",
      "Up to 2 revision rounds",
      "Figma source file and final export files",
      "Additional pages and major changes charged separately",
    ],
    note:
      "Best suited for small projects that need a clean, responsive, and professional UI/UX design.",
  },
{
  slug: "ui-ux-standard-plan",
  learnMorePath: "/services/ui-design",
  title: "Standard Plan",
  price: "5999",
  icon: Palette,
  label: "Standard UI/UX",
  description:
    "A polished UI/UX design package for growing businesses, professional websites, portfolios, and medium-sized digital experiences.",
  features: [
    "Custom visual theme based on your brand identity",
    "Up to 6 unique website pages",
    "3 promotional poster designs",
    "Desktop, tablet, and mobile responsive layouts",
    "Detailed user-flow and page hierarchy",
    "Custom reusable UI components",
    "Typography, colour, and spacing style direction",
    "Interactive clickable Figma prototype",
    "Custom domain included free for 1 year",
    "Domain connection and basic configuration",
    "Organized and developer-friendly Figma file",
    "Final design exports for development",
    "Up to 3 revision rounds",
    "Additional pages or major scope changes charged separately",
  ],
  note:
    "Best for growing businesses. Includes 1 free custom domain for the first year; renewal charges apply thereafter.",
},
  {
    slug: "ui-ux-professional-plan",
    learnMorePath: "/services/ui-design",
    title: "Professional Plan",
    price: "12999",
    icon: Crown,
    label: "Advanced UI/UX",
    recommended: true,
    description:
      "A complete UI/UX design package for growing brands, service platforms, e-commerce stores, and multi-page digital products.",
    features: [
      "Fully custom visual theme",
      "Up to 8–10 unique pages",
      "4 promotional poster designs",
      "Desktop, tablet, and mobile responsive layouts",
      "Detailed information architecture and user flows",
      "Custom reusable UI component library",
      "Typography, colour, and spacing style direction",
      "High-fidelity interactive prototype",
      "Developer-ready Figma design and handoff",
      "Custom domain included free for 1 year",
      "Up to 4 revision rounds",
      "Final design files and export-ready assets",
    ],
    note:
      "Best suited for growing brands that need a scalable, detailed, and consistent digital experience.",
  },
  
];

const processSteps = [
  {
    number: "01",
    title: "Choose a design service",
    text:
      "Select the service that matches your current business or creative requirement.",
  },
  {
    number: "02",
    title: "Share your project brief",
    text:
      "Provide your content, preferred style, brand details, size, and design references.",
  },
  {
    number: "03",
    title: "Pay 50% advance",
    text:
      "After the project scope and price are confirmed, pay 50% of the total amount. Design work starts after the advance payment is received.",
  },
  {
    number: "04",
    title: "Review and approve the work",
    text:
      "Review the presented design, share revisions within the approved scope, and confirm the completed work.",
  },
  {
    number: "05",
    title: "Pay the remaining 50%",
    text:
      "Pay the remaining 50% after the work is completed and approved. Final high-resolution files are delivered after the payment is received.",
  },
];

/* =========================================================
   PRICE CARD
========================================================= */

function PriceCard({ plan }) {
  const Icon = plan.icon;

  return (
    <article
      className={`price-page-card ${
        plan.featured ? "is-featured" : ""
      }`}
    >
      {plan.featured && (
        <span className="price-page-popular-label">
          <Sparkles size={15} aria-hidden="true" />
          Complete Brand Package
        </span>
      )}

      <div className="price-page-card-header">
        <div className="price-page-card-icon" aria-hidden="true">
          <Icon size={27} />
        </div>

        <div className="price-page-card-heading">
          <span>Design Service</span>
          <h2>{plan.title}</h2>
        </div>
      </div>

      <p className="price-page-card-description">
        {plan.description}
      </p>

      <div className="price-page-card-price">
        <span>Starting at</span>

        <div>
          <small>₹</small>
          <strong>{plan.price}</strong>
        </div>

        <p>Design charge</p>
      </div>

      <div className="price-page-card-divider" />

      <ul className="price-page-feature-list">
        {plan.features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true">
              <Check size={16} />
            </span>

            <p>{feature}</p>
          </li>
        ))}
      </ul>

      <div className="price-page-card-note">
        <BadgeCheck size={18} aria-hidden="true" />
        <p>{plan.note}</p>
      </div>

      <div className="price-page-card-footer">
        <p>
          Raw/source file:
          <strong> +₹499</strong>
        </p>

        <div className="price-page-card-actions">
          <Link
            to="/contact"
            state={{
              selectedService: plan.title,
              selectedPrice: `₹${plan.price}`,
            }}
            className="price-page-card-button"
          >
            Choose Plan
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function UIUXPlanColumn({ plan }) {
  const Icon = plan.icon;

  return (
    <div
      className={`price-page-uiux-plan ${
        plan.recommended ? "is-recommended" : ""
      }`}
    >
      {plan.recommended && (
        <span className="price-page-uiux-recommended">
          <Sparkles size={14} aria-hidden="true" />
          Recommended
        </span>
      )}

      <div className="price-page-uiux-plan-header">
        <div
          className="price-page-uiux-plan-icon"
          aria-hidden="true"
        >
          <Icon size={25} />
        </div>

        <div>
          <span>{plan.label}</span>
          <h3>{plan.title}</h3>
        </div>
      </div>

      <p className="price-page-uiux-plan-description">
        {plan.description}
      </p>

      <div className="price-page-uiux-plan-price">
        <span>Starting at</span>

        <div>
          <small>₹</small>
          <strong>{plan.price}</strong>
        </div>

        <p>UI/UX design charge</p>
      </div>

      <div className="price-page-uiux-plan-divider" />

      <ul className="price-page-uiux-feature-list">
        {plan.features.map((feature) => (
          <li key={feature}>
            <span aria-hidden="true">
              <Check size={15} />
            </span>

            <p>{feature}</p>
          </li>
        ))}
      </ul>

      <div className="price-page-uiux-plan-note">
        <BadgeCheck size={18} aria-hidden="true" />
        <p>{plan.note}</p>
      </div>

      <div className="price-page-uiux-plan-actions">
        <Link
          to="/contact"
          state={{
            selectedService: `UI/UX Design - ${plan.title}`,
            selectedPrice: `₹${plan.price}`,
          }}
          className="price-page-uiux-plan-button"
        >
          Choose {plan.title}
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function UIUXPricingBox() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalPlans = uiUxPlans.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPlans - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPlans - 1 ? 0 : prev + 1));
  };

  return (
    <section
      className="price-page-uiux-section"
      id="ui-ux-pricing"
    >
      <div className="container">
        <div className="price-page-section-heading">
          <span>UI/UX Design Plans</span>

          <h2>
            Three UI/UX plans inside one clear package box
          </h2>

          <p>
            Compare the Basic, Standard, and Professional plans side by side
            and choose the package that matches your project size,
            visual direction, and page requirements.
          </p>
        </div>

        <div className="price-page-uiux-box">
          <div className="price-page-uiux-box-top">
            <div>
              <span>UI/UX Design Packages</span>

              <h3>
                From compact websites to complete multi-page
                digital experiences
              </h3>
            </div>

            <div className="price-page-uiux-starting">
              <small>Plans start from</small>
              <strong>₹3,499</strong>
            </div>
          </div>

          <div className="price-page-uiux-comparison">
            <div className="price-page-uiux-slider-wrapper">
              <div
                className="price-page-uiux-slider-track"
                style={{
                  transform: isMobile
                    ? `translateX(-${currentIndex * 100}%)`
                    : "none",
                }}
              >
                {uiUxPlans.map((plan) => (
                  <UIUXPlanColumn
                    key={plan.slug}
                    plan={plan}
                  />
                ))}
              </div>

              {isMobile && (
                <>
                  <button
                    className="price-page-uiux-slider-btn price-page-uiux-slider-prev"
                    onClick={handlePrev}
                    aria-label="Previous plan"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className="price-page-uiux-slider-btn price-page-uiux-slider-next"
                    onClick={handleNext}
                    aria-label="Next plan"
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="price-page-uiux-dots">
                    {uiUxPlans.map((_, index) => (
                      <button
                        key={index}
                        className={`price-page-uiux-dot ${
                          index === currentIndex ? "is-active" : ""
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to plan ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="price-page-uiux-box-footer">
            <div>
              <BadgeCheck size={20} aria-hidden="true" />

              <p>
                Final pricing may change for advanced dashboards,
                complex user flows, custom illustrations, extensive
                content creation, or pages outside the approved
                project scope.
              </p>
            </div>

            <p>
              Editable source file:
              <strong> Not Provided</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRICE PAGE
========================================================= */

function Price() {
  return (
    <>
      <SEO
        title="Design Service Pricing | Limitless Design"
        description="View starting prices for logo design, poster design, business cards, photo frames, branding and UI UX design services."
        path="/price"
        image="/logo-01.webp"
      />

      <main className="price-page">
      {/* Hero */}
      <section
        className="price-page-hero"
        aria-labelledby="price-page-title"
      >
        <div className="container price-page-hero-grid">
          <div className="price-page-hero-content">
            <span className="section-label dark-label">
              <Sparkles size={16} aria-hidden="true" />
              Simple Design Pricing
            </span>

            <h1 id="price-page-title">
              Professional design plans with
              <span> clear starting prices.</span>
            </h1>

            <p>
              Choose the design service that fits your requirement.
              A 50% advance payment confirms the project and starts
              the work. The remaining 50% is payable after completion
              and approval, before the final files are delivered.
            </p>

            <div className="price-page-hero-actions">
              <a
                href="#pricing-plans"
                className="price-page-primary-button"
              >
                View Pricing
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <Link
                to="/contact"
                className="price-page-secondary-button"
              >
                Discuss Your Project
              </Link>
            </div>

            <div className="price-page-hero-points">
              <span>
                <BadgeCheck size={17} aria-hidden="true" />
                Transparent starting prices
              </span>

              <span>
                <BadgeCheck size={17} aria-hidden="true" />
                Custom design service
              </span>

              <span>
                <BadgeCheck size={17} aria-hidden="true" />
                Simple 50% + 50% payment terms
              </span>
            </div>
          </div>

          <div className="price-page-hero-panel">
            <div className="price-page-hero-panel-icon">
              <FileArchive size={31} aria-hidden="true" />
            </div>

            <span className="price-page-hero-panel-label">
              Optional Add-on
            </span>

            <h2>Need the editable raw file?</h2>

            <p>
              The prices listed on this page are for design work
              and final design delivery. Editable source or raw
              files can be requested separately.
            </p>

            <div className="price-page-addon-price">
              <small>Additional</small>
              <strong>₹499</strong>
              <span>per selected design project</span>
            </div>

            <div className="price-page-addon-types">
              <span>PSD</span>
              <span>AI</span>
              <span>Editable File</span>
              <span>Source Package</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section
        className="price-page-plans-section"
        id="pricing-plans"
      >
        <div className="container">
          <div className="price-page-section-heading">
            <span>Design Pricing</span>

            <h2>
              Choose the right creative plan for your project
            </h2>

            <p>
              Select from individual design services or choose the
              complete brand package for a consistent business
              identity.
            </p>
          </div>

          <div className="price-page-grid">
            {pricingPlans.map((plan) => (
              <PriceCard key={plan.slug} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <UIUXPricingBox />

      {/* Payment terms */}
      <section
        className="price-page-info-section"
        aria-labelledby="price-page-payment-title"
      >
        <div className="container price-page-info-card">
          <div className="price-page-info-icon" aria-hidden="true">
            <CreditCard size={30} />
          </div>

          <div className="price-page-info-content">
            <span>Payment Terms</span>

            <h2 id="price-page-payment-title">
              50% before work starts and 50% after completion
            </h2>

            <p>
              A 50% advance payment is required after the project
              scope, price, and requirements are confirmed. Work
              begins only after the advance payment is received.
              The remaining 50% is payable after the design work is
              completed and approved, before final high-resolution
              or editable files are delivered.
            </p>
          </div>

          <div className="price-page-info-price">
            <small>Payment split</small>
            <strong>50 / 50</strong>
          </div>
        </div>
      </section>

      {/* Work process */}
      <section className="price-page-process-section">
        <div className="container">
          <div className="price-page-section-heading">
            <span>How It Works</span>

            <h2>A simple process from brief to final design</h2>

            <p>
              Choose a service, share the project brief, pay the 50%
              advance to begin, review the completed work, and pay the
              remaining 50% before final file delivery.
            </p>
          </div>

          <div className="price-page-process-grid">
            {processSteps.map((step) => (
              <article
                className="price-page-process-card"
                key={step.number}
              >
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceContentSection {...pricingPageContent} />
      </main>
    </>
  );
}

export default Price;