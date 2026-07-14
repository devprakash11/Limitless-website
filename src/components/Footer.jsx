import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { services } from "../data/services";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon">
              <Sparkles size={22} />
            </span>
            <span>Limitless Design</span>
          </Link>

          <p>
            A professional creative marketplace where sellers offer premium
            design services and businesses discover powerful visual solutions.
          </p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          {services.slice(0, 6).map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`}>
              {service.title}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>help.limitlessdesign@gmail.com</p>
          <p>+91 76675 83859</p>
          <p>India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Limitless Design. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
