import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Users,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import SEO from "../components/SEO";
import DiscountPopup from "../components/DiscountPopup";

import { services } from "../data/services";

import {
  heroCards,
  heroStats,
  trustedCustomers,
  audiencePaths,
  valueItems,
} from "../data/homeData";

/* =========================================================
   HERO CARD
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

/* =========================================================
   AUDIENCE CARD
========================================================= */

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

/* =========================================================
   TRUSTED CUSTOMERS SECTION
========================================================= */

function TrustedCustomersSection() {
  return (
    <section
      className="home-trusted-section"
      aria-labelledby="home-trusted-title"
    >
      <div className="container">
        <div className="home-trusted-heading">
          <div className="home-trusted-heading-copy">
            <span className="home-trusted-label">
              <Users
                size={16}
                aria-hidden="true"
              />

              Trusted Customers
            </span>

            <h2 id="home-trusted-title">
              Creative work trusted by growing brands and teams
            </h2>

            <p>
              From brand identity and marketing creatives to digital
              experiences, Limitless Design supports organizations with
              focused visual work built for real business use.
            </p>
          </div>

          <div className="home-trusted-summary">
            <strong>
              {trustedCustomers.length}+
            </strong>

            <span>
              customer and partner brands featured across our growing
              creative portfolio
            </span>
          </div>
        </div>
      </div>

      <div
        className="home-trusted-marquee"
        aria-label="Trusted customer logos"
      >
        <div className="home-trusted-track">

          {/* First Logo Group */}
          <div className="home-trusted-group">
            {trustedCustomers.map(
              (customer) => (
                <div
                  className="home-trusted-logo-card"
                  key={`first-${customer.name}`}
                >
                  <img
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )
            )}
          </div>

          {/* Duplicate Group For Infinite Slide */}
          <div
            className="home-trusted-group"
            aria-hidden="true"
          >
            {trustedCustomers.map(
              (customer) => (
                <div
                  className="home-trusted-logo-card"
                  key={`second-${customer.name}`}
                >
                  <img
                    src={customer.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )
            )}
          </div>

        </div>
      </div>

      <div className="container">
        <div className="home-trusted-footer">
          <span>Branding</span>
          <span>UI/UX Design</span>
          <span>Marketing Creatives</span>
          <span>Business Design Support</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   VALUE CARD
========================================================= */

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
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </span>

      </div>

      <h3>{item.title}</h3>

      <p>
        {item.description}
      </p>
    </article>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  const availableServices =
    Array.isArray(services)
      ? services.filter(
          (service) =>
            service &&
            typeof service === "object" &&
            Boolean(
              service.slug ||
              service.title
            )
        )
      : [];

  return (
    <>
      {/* SEO */}
      <SEO
        title="Limitless Design | Logo, Branding and Graphic Design Services"
        description="Limitless Design provides professional logo design, branding, poster design, business card design, photo frames and creative graphic design services for businesses and growing brands."
        path="/"
        image="/logo-01.webp"
      />

      {/* 30% Discount Popup */}
      <DiscountPopup />

      <main className="home-page">

        {/* =====================================================
            HERO SECTION
        ====================================================== */}

        <section
          className="ld-hero"
          aria-labelledby="ld-home-title"
        >
          <div className="container ld-hero-container">

            {/* Hero Left */}
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
                Explore professional creative services
                or commission something tailored to
                your brand, campaign, event, or
                business goal—all through one clear
                design process.
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

            {/* Hero Right Cards */}
            <div className="ld-hero-right">
              {heroCards.map(
                (card, index) => (
                  <HeroCard
                    key={card.number}
                    card={card}
                    featured={index === 0}
                  />
                )
              )}
            </div>

            {/* Hero Stats */}
            <div className="ld-hero-stats">
              {heroStats.map(
                ({ value, label }) => (
                  <div key={label}>
                    <strong>
                      {value}
                    </strong>

                    <span>
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>

          </div>
        </section>

        {/* =====================================================
            TRUSTED CUSTOMERS
        ====================================================== */}

        <TrustedCustomersSection />

        {/* =====================================================
            SERVICES
        ====================================================== */}

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
                        `service-${
                          index + 1
                        }`
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
                <h3>
                  No services available
                </h3>

                <p>
                  Creative services will
                  appear here after they are
                  added to the services data
                  file.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* =====================================================
            AUDIENCE SECTION
        ====================================================== */}

        <section className="home-audience-section">
          <div className="container">

            <SectionHeading
              label="Built for Both Sides"
              title="One platform, two clear ways to move forward"
              text="Businesses can commission focused creative work, while designers can present services in a more professional and discoverable way."
            />

            <div className="home-audience-grid">
              {audiencePaths.map(
                (item) => (
                  <AudienceCard
                    key={item.eyebrow}
                    item={item}
                  />
                )
              )}
            </div>

          </div>
        </section>

        {/* =====================================================
            VALUE SECTION
        ====================================================== */}

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
                  A stronger result starts
                  long before the first
                  layout is created
                </h2>
              </div>

              <p>
                The platform is designed around
                useful project information,
                clear deliverables, and visual
                systems that can work beyond a
                single screen or post.
              </p>

            </div>

            <div className="home-value-grid">
              {valueItems.map(
                (item, index) => (
                  <ValueCard
                    key={item.title}
                    item={item}
                    index={index}
                  />
                )
              )}
            </div>

            <div className="home-value-footer">

              <div>
                <BadgeCheck
                  size={20}
                  aria-hidden="true"
                />

                <span>
                  Need editable source files?
                  Raw files can be added
                  separately to eligible
                  design projects.
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

        {/* =====================================================
            CTA SECTION
        ====================================================== */}

        <section className="cta-section">
          <div className="container cta-box">

            <div className="cta-content">

              <span className="section-label dark-label">
                Bring the Brief
              </span>

              <h2>
                Have a clear idea or only
                a rough one?
              </h2>

              <p>
                Share the goal, audience,
                content, and visual references.
                Limitless Design will help turn
                that information into a focused
                creative direction.
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