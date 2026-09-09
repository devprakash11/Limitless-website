import { ArrowRight, BadgeCheck, Gem, Globe2, Target } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function About() {
  return (
    <>
      <SEO
        title="About Limitless Design | Professional Creative Design Services"
        description="Learn about Limitless Design — a professional creative marketplace for logo design, branding, posters, UI/UX and graphic design services for businesses and growing brands."
        path="/about"
        image="/logo-01.webp"
      />
      <section className="page-hero">
        <div className="container">
          <span className="section-label dark-label">About Us</span>
          <h1>About Limitless Design</h1>
          <p>
            A professional creative marketplace built for businesses, sellers,
            designers, creators, agencies, and brands that need powerful visual
            design services in one trusted place.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-card">
              <Gem size={46} />
              <h3>Premium Creative Identity</h3>
              <p>
                We help brands look professional, trustworthy, modern, and
                memorable through high-quality design systems.
              </p>
            </div>
          </div>

          <div className="about-content">
            <span className="section-label">Who We Are</span>

            <h2>A platform where creative ideas become business assets</h2>

            <p>
              Limitless Design connects clients with creative sellers who offer
              professional design services such as logo design, social media
              banners, posters, photo frames, business cards, branding
              materials, UI design, and custom campaign creatives.
            </p>

            <p>
              Our goal is to make professional design accessible, organized, and
              business-friendly. Whether someone is launching a new brand,
              running an ecommerce store, promoting a festival offer, or
              building a digital product, Limitless Design provides the creative
              support needed to stand out.
            </p>

            <div className="about-points">
              <div>
                <Target size={22} />
                <span>Designs focused on business goals</span>
              </div>

              <div>
                <Globe2 size={22} />
                <span>Creative services for digital and print use</span>
              </div>

              <div>
                <BadgeCheck size={22} />
                <span>Professional marketplace experience</span>
              </div>
            </div>

            <Link to="/contact" className="primary-btn">
              Work With Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section mission-section">
        <div className="container mission-grid">
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              To provide businesses and creators with professional creative
              designs that improve branding, communication, and digital
              presence.
            </p>
          </div>

          <div className="mission-card">
            <h3>Our Vision</h3>
            <p>
              To become a trusted creative marketplace where every brand can
              access skilled design talent without confusion or complexity.
            </p>
          </div>

          <div className="mission-card">
            <h3>Our Promise</h3>
            <p>
              Clean communication, premium visual quality, brand consistency,
              and reliable creative support for every project.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
