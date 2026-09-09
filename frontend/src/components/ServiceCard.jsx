import { Link } from "react-router-dom";
import { ArrowRight, ImageOff } from "lucide-react";

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <Link to={`/services/${service.slug}`} className="service-card">
      <div className="service-icon">
        {Icon ? <Icon size={28} /> : <ImageOff size={28} />}
      </div>

      <h3>{service.title}</h3>
      <p>{service.short}</p>

      <span className="card-link">
        View Service <ArrowRight size={17} />
      </span>
    </Link>
  );
}

export default ServiceCard;
