import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  HelpCircle,
  Link2,
} from "lucide-react";

function ServiceContentSection({
  id,
  eyebrow = "Service Information",
  title,
  intro = [],
  cards = [],
  faqs = [],
  relatedLinks = [],
  cta,
}) {
  const introParagraphs = Array.isArray(intro)
    ? intro
    : [intro];

  return (
    <section
      className="ld-seo-content-section"
      aria-labelledby={`${id}-title`}
    >
      <div className="container">
        <div className="ld-seo-content-heading">
          <span className="section-label">
            {eyebrow}
          </span>

          <h2 id={`${id}-title`}>{title}</h2>

          <div className="ld-seo-content-intro">
            {introParagraphs
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
        </div>

        {cards.length > 0 && (
          <div className="ld-seo-content-grid">
            {cards.map((card) => (
              <article
                className="ld-seo-info-card"
                key={card.title}
              >
                <span
                  className="ld-seo-info-icon"
                  aria-hidden="true"
                >
                  <BadgeCheck size={20} />
                </span>

                <h3>{card.title}</h3>
                <p>{card.text}</p>

                {Array.isArray(card.items) &&
                  card.items.length > 0 && (
                    <ul>
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
              </article>
            ))}
          </div>
        )}

        {faqs.length > 0 && (
          <div className="ld-seo-faq-block">
            <div className="ld-seo-faq-heading">
              <HelpCircle
                size={22}
                aria-hidden="true"
              />

              <div>
                <span>Frequently Asked Questions</span>
                <h3>
                  Helpful answers before starting your project
                </h3>
              </div>
            </div>

            <div className="ld-seo-faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>
                    <span>{faq.question}</span>
                    <span
                      className="ld-seo-faq-plus"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>

                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {relatedLinks.length > 0 && (
          <nav
            className="ld-seo-related"
            aria-label="Related services"
          >
            <div className="ld-seo-related-heading">
              <Link2 size={20} aria-hidden="true" />

              <div>
                <span>Related Services</span>
                <h3>Continue exploring Limitless Design</h3>
              </div>
            </div>

            <div className="ld-seo-related-links">
              {relatedLinks.map((item) => (
                <Link to={item.to} key={item.to}>
                  <span>{item.label}</span>
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </nav>
        )}

        {cta && (
          <div className="ld-seo-content-cta">
            <div>
              <span>{cta.eyebrow}</span>
              <h3>{cta.title}</h3>
              <p>{cta.text}</p>
            </div>

            <Link
              to={cta.to}
              state={cta.state}
              className="ld-seo-content-cta-link"
            >
              {cta.label}
              <ArrowRight
                size={18}
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServiceContentSection;
