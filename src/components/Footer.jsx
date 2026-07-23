import { Link } from "react-router-dom";

import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

import {
  FaBehance,
  FaDribbble,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

import { services } from "../data/services";

const socialLinks = [
  // {
  //   name: "YouTube",
  //   href: "https://www.youtube.com/",
  //   icon: FaYoutube,
  // },
  {
    name: "Instagram",
    href: "https://www.instagram.com/limitless_design11?igsh=a245ZDk1emF1bXJu&utm_source=qr",
    icon: FaInstagram,
  },
  {
    name: "Behance",
    href: "https://www.behance.net/devprakash116",
    icon: FaBehance,
  },
  // {
  //   name: "Dribbble",
  //   href: "https://dribbble.com/",
  //   icon: FaDribbble,
  // },
  // {
  //   name: "LinkedIn",
  //   href: "https://www.linkedin.com/",
  //   icon: FaLinkedin,
  // },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  const availableServices = Array.isArray(services)
    ? services.filter(
        (service) =>
          service?.slug &&
          service?.title
      )
    : [];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link
            to="/"
            className="brand footer-brand"
            aria-label="Go to Limitless Design home page"
          >
            <span className="brand-icon">
              <Sparkles
                size={22}
                aria-hidden="true"
              />
            </span>

            <span>Limitless Design</span>
          </Link>

          <p>
            A professional creative marketplace where sellers
            offer premium design services and businesses discover
            powerful visual solutions.
          </p>

          <div
            className="footer-socials"
            aria-label="Limitless Design social media"
          >
            <span className="footer-socials-title">
              Follow our creative work
            </span>

            <div className="footer-social-links">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open Limitless Design on ${social.name}`}
                    title={social.name}
                  >
                    <Icon
                      size={19}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/price">Pricing</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Services</h4>

          {availableServices
            .slice(0, 6)
            .map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
              >
                {service.title}
              </Link>
            ))}
        </div>

        <div className="footer-col footer-contact-col">
          <h4>Contact</h4>

          <a
            href="mailto:help.limitlessdesign@gmail.com"
            className="footer-contact-link"
            aria-label="Send an email to Limitless Design"
          >
            <Mail
              size={18}
              aria-hidden="true"
            />

            <span>
              help.limitlessdesign@gmail.com
            </span>
          </a>

          <a
            href="tel:+917667583859"
            className="footer-contact-link"
            aria-label="Call Limitless Design"
          >
            <Phone
              size={18}
              aria-hidden="true"
            />

            <span>
              +91 76675 83859
            </span>
          </a>

          <div
            className="footer-contact-link footer-location"
            aria-label="Limitless Design location: India"
          >
            <MapPin
              size={18}
              aria-hidden="true"
            />

            <span>India</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {currentYear} Limitless Design. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;