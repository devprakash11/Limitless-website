import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";
import { services } from "../data/services";

function ServicePage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1>Service Not Found</h1>
          <p>The service page you are looking for does not exist.</p>
          <Link to="/" className="primary-btn">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  const Icon = service.icon;

  return (
    <>
      <section className="page-hero service-page-hero">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="detail-icon">
            <Icon size={36} />
          </div>

          <span className="section-label dark-label">Creative Service</span>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container service-detail-grid">
          <div className="service-detail-content">
            <span className="section-label">Service Details</span>

            <h2>What you get in {service.title}</h2>

            <p>
              This service is designed for businesses, creators, ecommerce
              sellers, agencies, startups, and personal brands that need
              professional creative assets with strong visual quality and
              practical usability.
            </p>

            <div className="detail-list">
              {service.features.map((item) => (
                <div key={item}>
                  <BadgeCheck size={21} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="quote-card">
            <h3>Need this service?</h3>

            <p>
              Share your requirement and get a professional creative direction
              for your brand, business, product, or campaign.
            </p>

            <Link to="/contact" className="primary-btn">
              Commission Work <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

export default ServicePage;
