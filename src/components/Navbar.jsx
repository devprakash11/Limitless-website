import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "../data/services";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setServiceOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img
            src="/images/logo.webp"alt="Limitless Design Logo"className="brand-logo"/>
            <span className="brand-text">Limitless Design</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>

            <div className="dropdown">
              <button
                className="dropdown-btn"
                onClick={() => setServiceOpen(!serviceOpen)}
                type="button"
              >
                Service <ChevronDown size={16} />
              </button>

              <div className={`dropdown-menu ${serviceOpen ? "show" : ""}`}>
                {services.slice(0, 6).map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    onClick={closeMenu}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <a href="/#features" onClick={closeMenu}>
              Features
            </a>

            {/* <NavLink to="/contact" onClick={closeMenu}>
              Contacts
            </NavLink> */}
          </div>

          <Link to="/contact" className="nav-btn" onClick={closeMenu}>
            Commission Work
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
