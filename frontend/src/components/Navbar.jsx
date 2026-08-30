import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { services } from "../data/services";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const location = useLocation();

  /*
   * Open and close the complete mobile navigation.
   */
  const toggleMenu = () => {
    setMenuOpen((currentMenuState) => {
      const nextMenuState = !currentMenuState;

      /*
       * Close the Services dropdown when the
       * complete mobile navigation is closed.
       */
      if (!nextMenuState) {
        setServiceOpen(false);
      }

      return nextMenuState;
    });
  };

  /*
   * Open and close only the Services dropdown.
   */
  const toggleServices = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setServiceOpen(
      (currentServiceState) => !currentServiceState
    );
  };

  /*
   * Close the mobile navigation and Services dropdown.
   */
  const closeMenu = () => {
    setMenuOpen(false);
    setServiceOpen(false);
  };

  /*
   * Close navigation automatically after route changes.
   */
  useEffect(() => {
    setMenuOpen(false);
    setServiceOpen(false);
  }, [location.pathname, location.hash]);

  /*
   * Prevent the page behind the mobile menu from scrolling.
   */
  useEffect(() => {
    const isMobileView = window.innerWidth <= 991;

    if (menuOpen && isMobileView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /*
   * Close navigation when the Escape key is pressed.
   */
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscapeKey
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscapeKey
      );
    };
  }, []);

  /*
   * Reset mobile navigation when changing
   * from mobile to desktop.
   */
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 991) {
        setMenuOpen(false);
        setServiceOpen(false);
        document.body.style.overflow = "";
      }
    };

    window.addEventListener(
      "resize",
      handleWindowResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleWindowResize
      );
    };
  }, []);

  const availableServices = Array.isArray(services)
    ? services.filter(
        (service) =>
          service &&
          service.slug &&
          service.title
      )
    : [];

  return (
    <header className="site-header">
      <nav
        className="navbar container"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
          aria-label="Go to Limitless Design home page"
        >
          <img
            src="/images/logo.webp"
            alt="Limitless Design Logo"
            className="brand-logo"
          />

          <span className="brand-text">
            Limitless Design
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className={`mobile-toggle ${
            menuOpen ? "active" : ""
          }`}
          onClick={toggleMenu}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="main-navigation-menu"
        >
          {menuOpen ? (
            <X
              size={24}
              aria-hidden="true"
            />
          ) : (
            <Menu
              size={24}
              aria-hidden="true"
            />
          )}
        </button>

        {/* Navigation Menu */}
        <div
          id="main-navigation-menu"
          className={`nav-menu ${
            menuOpen ? "active" : ""
          }`}
        >
          <div className="nav-links">
            {/* Home */}
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Home
            </NavLink>

            {/* About */}
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              About
            </NavLink>

            {/* Services Dropdown */}
            <div
              className={`dropdown ${
                serviceOpen
                  ? "active dropdown-open"
                  : ""
              }`}
            >
              <button
                type="button"
                className={`dropdown-btn ${
                  serviceOpen ? "active" : ""
                }`}
                onClick={toggleServices}
                aria-expanded={serviceOpen}
                aria-controls="service-dropdown-menu"
              >
                <span>Services</span>

                <ChevronDown
                  size={17}
                  aria-hidden="true"
                  className={`dropdown-arrow ${
                    serviceOpen ? "rotate" : ""
                  }`}
                />
              </button>

              <div
                id="service-dropdown-menu"
                className={`dropdown-menu ${
                  serviceOpen ? "show" : ""
                }`}
                aria-hidden={!serviceOpen}
              >
                <div className="dropdown-menu-inner">
                  {availableServices.map(
                    (service) => (
                      <NavLink
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          isActive
                            ? "dropdown-link active"
                            : "dropdown-link"
                        }
                      >
                        {service.title}
                      </NavLink>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Live Projects */}
            <NavLink
              to="/live-projects"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Live Projects
            </NavLink>

            {/* Pricing Page */}
            <NavLink
              to="/price"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Prices
            </NavLink>

            {/* Features */}
            <Link
              to="/#features"
              className="nav-link"
              onClick={closeMenu}
            >
              Features
            </Link>
          </div>

          {/* Commission Work Button */}
          <Link
            to="/contact"
            className="nav-btn"
            onClick={closeMenu}
          >
            Commission Work
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
