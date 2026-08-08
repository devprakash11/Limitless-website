import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Layers3,
  Palette,
  Rocket,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";
import SEO from "../components/SEO";
import DiscountPopup from "../components/DiscountPopup";

/* =========================================================
   PAGE DATA
========================================================= */

const heroCards = [
  {
    number: "01",
    title: "Choose the outcome",
    description:
      "Start with what you need to launch, promote, present, or improve.",
  },
  {
    number: "02",
    title: "Match the right format",
    description:
      "Select a logo, poster, business card, photo frame, or full brand package.",
  },
  {
    number: "03",
    title: "Move from brief to delivery",
    description:
      "Share your direction, review the work, and receive a business-ready design.",
  },
];

const heroStats = [
  {
    value: "5+",
    label: "Core Design Services",
  },
  {
    value: "300+",
    label: "Creative Assets",
  },
  {
    value: "1",
    label: "Clear Project Process",
  },
];

const audiencePaths = [
  {
    icon: Briefcase,
    eyebrow: "For Businesses",
    title: "Get the design your next move actually needs",
    description:
      "Launch a brand, promote an offer, prepare an event, or improve how your business looks across customer touchpoints.",
    points: [
      "Clear service-based pricing",
      "Custom creative direction",
      "Designs prepared for practical use",
    ],
    linkLabel: "Commission a Project",
    linkTo: "/contact",
    featured: true,
  },
  {
    icon: Store,
    eyebrow: "For Creative Sellers",
    title: "Present your work as a professional service",
    description:
      "Organize creative services by category, make your strengths easier to discover, and build confidence before a client reaches out.",
    points: [
      "Focused service categories",
      "Professional portfolio presentation",
      "A clearer path from discovery to enquiry",
    ],
    linkLabel: "Explore Services",
    linkTo: "#services",
  },
];

const valueItems = [
  {
    icon: Sparkles,
    title: "Brief-first collaboration",
    description:
      "The project starts with the goal, audience, size, content, and references—not guesswork.",
  },
  {
    icon: Layers3,
    title: "Variants where they matter",
    description:
      "Logo and poster packages include useful options so you can compare directions before finalizing.",
  },
  {
    icon: Palette,
    title: "Consistent visual thinking",
    description:
      "Typography, colour, layout, and brand personality are considered together instead of as separate pieces.",
  },
  {
    icon: Rocket,
    title: "Ready for real business use",
    description:
      "Every design is created with its final use in mind, from digital campaigns to print and brand communication.",
  },
];

/* =========================================================
   SMALL PAGE COMPONENTS
========================================================= */

function HeroCard({ card, featured }) {
  return (
    <article
      className={`ld-text-card ${
        featured ? "main-card" : ""
      }`}
    >
      <span className="ld-card-number">
        {card.number}
      </span>

      <div className="ld-card-content">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </article>
  );
}

function AudienceCard({ item }) {
  const Icon = item.icon;

  return (
    <article
      className={`home-audience-card ${
        item.featured ? "is-featured" : ""
      }`}
    >
      <div
        className="home-audience-icon"
        aria-hidden="true"
      >
        <Icon size={27} />
      </div>

      <span className="home-audience-eyebrow">
        {item.eyebrow}
      </span>

      <h3>{item.title}</h3>

      <p className="home-audience-description">
        {item.description}
      </p>

      <ul className="home-audience-list">
        {item.points.map((point) => (
          <li key={point}>
            <CheckCircle2
              size={18}
              aria-hidden="true"
            />

            <span>{point}</span>
          </li>
        ))}
      </ul>

      {item.linkTo.startsWith("#") ? (
        <a
          href={item.linkTo}
          className="home-audience-link"
        >
          {item.linkLabel}
          <ArrowRight
            size={18}
            aria-hidden="true"
          />
        </a>
      ) : (
        <Link
          to={item.linkTo}
          className="home-audience-link"
        >
          {item.linkLabel}
          <ArrowRight
            size={18}
            aria-hidden="true"
          />
        </Link>
      )}
    </article>
  );
}

function ValueCard({ item, index }) {
  const Icon = item.icon;

  return (
    <article className="home-value-card">
      <div className="home-value-card-top">
        <div
          className="home-value-icon"
          aria-hidden="true"
        >
          <Icon size={24} />
        </div>

        <span>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  const availableServices = Array.isArray(services)
    ? services.filter(
        (service) =>
          service &&
          typeof service === "object" &&
          Boolean(service.slug || service.title)
      )
    : [];

  return (
    <>
      <SEO
        title="Limitless Design | Logo, Branding and Graphic Design Services"
        description="Limitless Design provides professional logo design, branding, poster design, business card design, photo frames and creative graphic design services for businesses and growing brands."
        path="/"
        image="/logo-01.webp"
      />

      {/* 30% Discount Popup */}
      <DiscountPopup />

      <main className="home-page">
      {/* Hero */}
      <section
        className="ld-hero"
        aria-labelledby="ld-home-title"
      >
        <div className="container ld-hero-container">
          <div className="ld-hero-left">
            <span className="ld-hero-badge">
              Design Marketplace for Growing Brands
            </span>

            <h1 id="ld-home-title">
              <span className="ld-heading-dark">
                Find the right design.
              </span>

              <span className="ld-gradient-text">
                Launch with confidence.
              </span>
            </h1>

            <p className="ld-hero-description">
              Explore professional creative services or commission
              something tailored to your brand, campaign, event, or
              business goal—all through one clear design process.
            </p>

            <div className="ld-hero-actions">
              <a
                href="#services"
                className="ld-primary-btn"
              >
                Explore Services
              </a>

              <Link
                to="/price"
                className="ld-secondary-btn"
              >
                View Pricing
              </Link>
            </div>
          </div>

          <div className="ld-hero-right">
            {heroCards.map((card, index) => (
              <HeroCard
                key={card.number}
                card={card}
                featured={index === 0}
              />
            ))}
          </div>

          <div className="ld-hero-stats">
            {heroStats.map(({ value, label }) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="section service-section"
        id="services"
      >
        <div className="container">
          <SectionHeading
            label="Choose a Service"
            title="Start with the exact design deliverable you need"
            text="Browse focused creative services instead of paying for a broad package that does not match your current project."
          />

          {availableServices.length > 0 ? (
            <div className="service-grid">
              {availableServices.map(
                (service, index) => (
                  <ServiceCard
                    key={
                      service.slug ??
                      service.title ??
                      `service-${index + 1}`
                    }
                    service={service}
                  />
                )
              )}
            </div>
          ) : (
            <div
              className="service-empty-message"
              role="status"
            >
              <h3>No services available</h3>

              <p>
                Creative services will appear here after they
                are added to the services data file.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Audience paths */}
      <section className="home-audience-section">
        <div className="container">
          <SectionHeading
            label="Built for Both Sides"
            title="One platform, two clear ways to move forward"
            text="Businesses can commission focused creative work, while designers can present services in a more professional and discoverable way."
          />

          <div className="home-audience-grid">
            {audiencePaths.map((item) => (
              <AudienceCard
                key={item.eyebrow}
                item={item}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Distinct value section */}
      <section
        className="home-value-section"
        id="features"
      >
        <div className="container">
          <div className="home-value-heading">
            <div>
              <span className="section-label dark-label">
                What Makes the Work Better
              </span>

              <h2>
                A stronger result starts long before the first
                layout is created
              </h2>
            </div>

            <p>
              The platform is designed around useful project
              information, clear deliverables, and visual systems
              that can work beyond a single screen or post.
            </p>
          </div>

          <div className="home-value-grid">
            {valueItems.map((item, index) => (
              <ValueCard
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </div>

          <div className="home-value-footer">
            <div>
              <BadgeCheck
                size={20}
                aria-hidden="true"
              />

              <span>
                Need editable source files? Raw files can be
                added separately to eligible design projects.
              </span>
            </div>

            <Link to="/price">
              See Pricing Details
              <ArrowRight
                size={18}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-box">
          <div className="cta-content">
            <span className="section-label dark-label">
              Bring the Brief
            </span>

            <h2>
              Have a clear idea or only a rough one?
            </h2>

            <p>
              Share the goal, audience, content, and visual
              references. Limitless Design will help turn that
              information into a focused creative direction.
            </p>

            <Link
              to="/contact"
              className="primary-btn white-btn cta-commission-btn"
            >
              Start a Project
              <ArrowRight
                size={18}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}

export default Home;