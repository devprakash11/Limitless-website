import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgePercent,
  Sparkles,
  X,
} from "lucide-react";

function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const popupClosed = sessionStorage.getItem(
      "limitless-discount-popup"
    );

    if (popupClosed) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);

    sessionStorage.setItem(
      "limitless-discount-popup",
      "closed"
    );
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closePopup();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="ld-offer-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ld-offer-title"
      onClick={handleOverlayClick}
    >
      <div className="ld-offer-popup">

        {/* Close Button */}
        <button
          type="button"
          className="ld-offer-close"
          onClick={closePopup}
          aria-label="Close discount popup"
        >
          <X
            size={20}
            strokeWidth={2.2}
            aria-hidden="true"
          />
        </button>

        {/* Decorative Background Elements */}
        <div
          className="ld-offer-glow ld-offer-glow-one"
          aria-hidden="true"
        />

        <div
          className="ld-offer-glow ld-offer-glow-two"
          aria-hidden="true"
        />

        <div className="ld-offer-content">

          {/* Main Icon */}
          <div className="ld-offer-icon">
            <BadgePercent
              size={31}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          {/* Offer Label */}
          <div className="ld-offer-label">
            <Sparkles
              size={14}
              aria-hidden="true"
            />

            Limited Time Offer
          </div>

          {/* Discount */}
          <div className="ld-offer-discount">
            <span>30%</span>
            <strong>OFF</strong>
          </div>

          {/* Heading */}
          <h2 id="ld-offer-title">
            Get 30% Off on
            <span> All Design Services</span>
          </h2>

          {/* Description */}
          <p className="ld-offer-description">
            Bring your ideas to life with professional
            creative design services. Get a special
            30% discount across all our design services
            for a limited time.
          </p>

          {/* Design Services */}
          <div className="ld-offer-services">
            <span>Logo Design</span>

            <span>
              UI/UX Design
            </span>

            <span>
              Website UI
            </span>

            <span>
              Poster Design
            </span>

            <span>
              Social Media
            </span>

            <span>
              Business Card
            </span>

            <span>
              Branding
            </span>
          </div>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="ld-offer-button"
            onClick={closePopup}
          >
            Claim 30% Discount

            <ArrowRight
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </Link>

          {/* Bottom Note */}
          <small className="ld-offer-note">
            Limited-time offer • Applicable on all
            eligible design services
          </small>

        </div>
      </div>
    </div>
  );
}

export default DiscountPopup;