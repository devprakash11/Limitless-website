import { ExternalLink, Globe2, ArrowUpRight } from "lucide-react";

import SEO from "../components/SEO";

const liveProjects = [
  {
    id: "limitless-design",
    title: "Limitless Design",
    category: "Creative Design Studio",
    description:
      "A modern design studio website for discovering creative services, design previews, branding work, pricing, and project enquiries.",
    url: "https://limitlessdesign.vercel.app/",
    badge: "Live",
    accent: "violet",
    tags: ["React", "Responsive", "UI/UX"],
  },
];

function ProjectPreview({ project }) {
  return (
    <div className={`live-project-preview live-project-preview-${project.accent}`}>
      <div className="live-project-browserbar">
        <div className="live-project-window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="live-project-urlbar">
          <Globe2 size={13} aria-hidden="true" />
          <span>{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
        </div>
        <ArrowUpRight size={16} aria-hidden="true" />
      </div>

      <div className="live-project-screen">
        <div className="live-project-screen-glow" />
        <div className="live-project-screen-content">
          <span className="live-project-screen-kicker">LIVE PROJECT</span>
          <strong>{project.title}</strong>
          <small>{project.category}</small>
          <div className="live-project-screen-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveProjects() {
  return (
    <>
      <SEO
        title="Live Projects | Limitless Design"
        description="Explore live projects created and developed by Limitless Design."
        path="/live-projects"
        image="/logo-01.webp"
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
              <span>live project{liveProjects.length === 1 ? "" : "s"}</span>
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
              <article className="live-project-card" key={project.id}>
                <ProjectPreview project={project} />

                <div className="live-project-card-body">
                  <div className="live-project-card-topline">
                    <span className="live-project-badge">
                      <span aria-hidden="true" />
                      {project.badge}
                    </span>
                    <span className="live-project-category">
                      {project.category}
                    </span>
                  </div>

                  <h2>{project.title}</h2>
                  <p>{project.description}</p>

                  <div className="live-project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="live-project-actions">
                    <a
                      className="live-project-primary"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Live Project
                      <ExternalLink size={17} aria-hidden="true" />
                    </a>
                    <span className="live-project-url" title={project.url}>
                      {project.url.replace(/^https?:\/\//, "")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="live-projects-note" aria-label="More projects">
            <div>
              <span>More launches coming soon</span>
              <h2>Built something worth putting live?</h2>
            </div>
            <a href="/contact" className="live-projects-note-link">
              Start a project
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </section>
        </div>
      </section>
    </>
  );
}

export default LiveProjects;
