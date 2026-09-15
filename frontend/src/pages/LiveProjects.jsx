import { Link } from "react-router-dom";

import SEO from "../components/SEO";
import PortfolioCard from "../components/portfolio/PortfolioCard";

const liveProjects = [
  {
    id: "digital-gate-pass",
    title: "Digital Gate Pass",
    category: "School Management System",
    description:
      "A smart digital gate pass platform that streamlines student entry and exit using QR code verification, secure tracking, and an admin dashboard.",
    url: "https://pes-gate-pass.vercel.app/",
    thumbnail: "/projects/digital-gate-pass.svg",
    badge: "Live",
    accent: "violet",
    tags: ["React", "Supabase", "QR Code", "Responsive"],
  },
  {
id: "threads-ecommerce",
title: "Threads Ecommerce",
category: "Fashion Ecommerce",
description:
"A polished fashion ecommerce experience with curated products and responsive design.",
url: "https://threads-ecommerce.vercel.app/",
thumbnail: "/projects/threads-ecommerce.svg",
badge: "Live",
accent: "blue",
tags: ["React", "Vite", "UI/UX", "Responsive"],
},
];

function LiveProjects() {
  return (
    <>
      <SEO
        title="Live Projects | Limitless Design"
        description="Explore live projects created and developed by Limitless Design."
        path="/live-projects"
        image="/og/og-live-projects.svg"
      />

      <section className="live-projects-page">
        <div className="container">
          <header className="live-projects-hero">
            <span className="live-projects-eyebrow">
              <span className="live-projects-status-dot" aria-hidden="true" />
              Selected live work
            </span>
            <h1>
              Projects that are <span>live on the web.</span>
            </h1>
            <p>
              Explore finished digital experiences and open each project directly
              in a new tab to see the live interface, interactions, and responsive
              behaviour.
            </p>
          </header>

          <div className="live-projects-toolbar" aria-label="Live project summary">
            <div>
              <strong>{liveProjects.length}</strong>
              <span>live projects</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>responsive focus</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>web access</span>
            </div>
          </div>

          <div className="live-projects-grid">
            {liveProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>

          <section className="live-projects-note" aria-label="More projects">
            <div>
              <span>More launches coming soon</span>
              <h2>Built something worth putting live?</h2>
            </div>
            <Link to="/contact" className="live-projects-note-link">
              Start a project
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}

export default LiveProjects;
