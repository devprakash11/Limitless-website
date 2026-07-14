import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "../data/services";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((current) => {
      const nextValue = !current;

      if (!nextValue) {
        setServiceOpen(false);
      }

      return nextValue;
    });
  };

  const toggleServices = () => {
    setServiceOpen((current) => !current);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setServiceOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={closeMenu}>
          <img
            src="/images/logo.webp"
            alt="Limitless Design Logo"
            className="brand-logo"
          />

          <span className="brand-text">Limitless Design</span>
        </Link>

        <button
          type="button"
          className="mobile-toggle"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation-menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          id="main-navigation-menu"
          className={`nav-menu ${menuOpen ? "active" : ""}`}
        >
          <div className="nav-links">
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>

            <div className={`dropdown ${serviceOpen ? "active" : ""}`}>
              <button
                type="button"
                className="dropdown-btn"
                onClick={toggleServices}
                aria-expanded={serviceOpen}
                aria-controls="service-dropdown-menu"
              >
                <span>Services</span>

                <ChevronDown
                  size={17}
                  className={`dropdown-arrow ${
                    serviceOpen ? "rotate" : ""
                  }`}
                />
              </button>

              <div
                id="service-dropdown-menu"
                className={`dropdown-menu ${serviceOpen ? "show" : ""}`}
              >
                {services.map((service) => (
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