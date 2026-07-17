import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

import { services } from "../data/services";

function Footer() {
  const currentYear = new Date().getFullYear();

  const availableServices = Array.isArray(services)
    ? services.filter(
        (service) =>
          service &&
          service.slug &&
          service.title
      )
    : [];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Footer introduction */}
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
        </div>

        {/* Company links */}
        <div className="footer-col">
          <h4>Company</h4>

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/price">
            Pricing
          </Link>

          <Link to="/contact">
            Contact
          </Link>
        </div>

        {/* Service links */}
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

        {/* Contact details */}
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