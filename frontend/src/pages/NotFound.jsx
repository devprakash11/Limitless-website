import { Link } from "react-router-dom";
import SEO from "../components/SEO";

function NotFound() {
  return (
    <>
      <SEO
        title="404 — Page Not Found | Limitless Design"
        description="The page you are looking for does not exist or has been moved. Return to Limitless Design to explore our creative design services."
        path="/404"
        noIndex={true}
      />

      <section className="page-hero">
        <div className="container">
          <span className="section-label dark-label">404 Error</span>
          <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist or has been moved.</p>

          <Link to="/" className="primary-btn page-btn">
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;
