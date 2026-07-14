import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Crown,
  Gem,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

/* =========================================================
   PAGE DATA
========================================================= */

const whyChooseItems = [
  {
    icon: Crown,
    title: "Premium Design Quality",
    description:
      "Every creative is designed with professional layout, clean spacing, strong typography, and brand-focused direction.",
  },
  {
    icon: Users,
    title: "Seller-Friendly Platform",
    description:
      "Designers and creative sellers can showcase their services while clients easily discover the right creative solution.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Work Process",
    description:
      "Clear project flow, proper communication, and organized design delivery make every commission smooth and trustworthy.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "Get high-quality design assets within practical timelines without compromising professional visual standards.",
  },
  {
    icon: Layers3,
    title: "Multiple Creative Categories",
    description:
      "From logos and social banners to business cards, posters, branding materials, and UI designs—everything is available.",
  },
  {
    icon: Gem,
    title: "Business-Ready Output",
    description:
      "Designs are created for real business use across websites, social media, ads, campaigns, printing, and brand communication.",
  },
];

const heroCards = [
  {
    number: "01",
    title: "Creative Marketplace",
    description:
      "Sell and discover premium creative services in one professional platform.",
  },
  {
    number: "02",
    title: "Design Categories",
    description:
      "Logo, banner, poster, branding, business card, UI design, and more.",
  },
  {
    number: "03",
    title: "Commission Work",
    description:
      "Request custom creative work based on your brand or campaign requirements.",
  },
];

const heroStats = [
  {
    value: "20+",
    label: "Creative Categories",
  },
  {
    value: "300+",
    label: "Design Assets",
  },
  {
    value: "100%",
    label: "Business Focused",
  },
];

const platformFeatures = [
  "Verified creative sellers",
  "Custom commission work",
  "Professional service categories",
  "Brand identity support",
  "Campaign-ready creatives",
  "Responsive marketplace experience",
];

const featureCards = [
  {
    number: "01",
    title: "Discover Creative Sellers",
    description:
      "Find talented designers based on service category, style, and business requirements.",
    featured: true,
  },
  {
    number: "02",
    title: "Commission Custom Work",
    description:
      "Request personalized designs for campaigns, brands, products, and digital platforms.",
  },
  {
    number: "03",
    title: "Build Brand Identity",
    description:
      "Create consistent visuals across websites, print, ads, social media, and business communication.",
  },
];

/* =========================================================
   SMALL PAGE COMPONENTS
========================================================= */

function HeroCard({ card, featured }) {
  return (
    <article className={`ld-text-card ${featured ? "main-card" : ""}`}>
      <span className="ld-card-number">{card.number}</span>

      <div className="ld-card-content">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
    </article>
  );
}

function WhyChooseCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="why-card">
      <div className="why-icon" aria-hidden="true">
        <Icon size={25} />
      </div>

      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}

function FeatureCard({ feature }) {
  return (
    <article
      className={`feature-card ${feature.featured ? "active" : ""}`}
    >
      <span>{feature.number}</span>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
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
    <main className="home-page">
      {/* Hero section */}
      <section className="ld-hero" aria-labelledby="ld-home-title">
        <div className="container ld-hero-container">
          <div className="ld-hero-left">
            <span className="ld-hero-badge">
              Creative Marketplace for Modern Brands
            </span>

            <h1 id="ld-home-title">
              <span className="ld-heading-dark">
                Discover, Sell &amp; Commission
              </span>

              <span className="ld-gradient-text">
                Limitless Creative Designs.
              </span>
            </h1>

            <p className="ld-hero-description">
              Limitless Design is a professional platform where sellers offer
              logo designs, social media banners, photo frames, posters,
              business cards, branding materials, UI designs, and many more
              creative services.
            </p>

            <div className="ld-hero-actions">
              <a href="#services" className="ld-primary-btn">
                Explore Services
              </a>

              <Link to="/contact" className="ld-secondary-btn">
                Commission Work
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

      {/* Why choose us */}
      <section className="section" id="why">
        <div className="container">
          <SectionHeading
            label="Why Choose Us"
            title="A creative platform built for serious brands and sellers"
            text="Limitless Design gives sellers a professional platform and gives businesses a trusted space to commission high-quality creative work."
          />

          <div className="why-grid">
            {whyChooseItems.map((item) => (
              <WhyChooseCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="section service-section" id="services">
        <div className="container">
          <SectionHeading
            label="What We Offer"
            title="Professional creative services for every business need"
            text="Explore premium design categories created for brands, creators, ecommerce sellers, agencies, startups, and growing businesses."
          />

          {availableServices.length > 0 ? (
            <div className="service-grid">
              {availableServices.map((service, index) => (
                <ServiceCard
                  key={
                    service.slug ??
                    service.title ??
                    `service-${index + 1}`
                  }
                  service={service}
                />
              ))}
            </div>
          ) : (
            <div className="service-empty-message" role="status">
              <h3>No services available</h3>

              <p>
                Creative services will appear here after they are added to the
                services data file.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features section */}
      <section className="features-section" id="features">
        <div className="container features-grid">
          <div className="features-content">
            <span className="section-label dark-label">
              Platform Features
            </span>

            <h2>
              Everything required to start creative selling professionally
            </h2>

            <p>
              Limitless Design is built as a future-ready creative marketplace
              where sellers can list their services and clients can commission
              professional design work with confidence.
            </p>

            <div className="feature-list">
              {platformFeatures.map((feature) => (
                <div key={feature}>
                  <BadgeCheck size={19} aria-hidden="true" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="features-panel">
            {featureCards.map((feature) => (
              <FeatureCard
                key={feature.number}
                feature={feature}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-section">
        <div className="container cta-box">
          <div className="cta-content">
            <span className="section-label dark-label">
              Start Your Project
            </span>

            <h2>Need a custom design for your brand?</h2>

            <p>
              Commission professional creative work and bring your visual idea
              to life with Limitless Design.
            </p>

            <Link
              to="/contact"
              className="primary-btn white-btn cta-commission-btn"
            >
              Commission Work
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;