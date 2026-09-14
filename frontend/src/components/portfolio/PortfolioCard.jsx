import { ArrowUpRight, ExternalLink, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";

function ProjectPreview({ project }) {
  return (
    <a
      className={`live-project-preview live-project-preview-${project.accent}`}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title} live project`}
    >
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
        <img
          className="live-project-thumbnail"
          src={project.thumbnail}
          alt={`${project.title} website preview`}
          loading="lazy"
          decoding="async"
        />
        <div className="live-project-screen-overlay" aria-hidden="true" />
        <div className="live-project-live-label">
          <span />
          Live preview
        </div>
      </div>
    </a>
  );
}

export default function PortfolioCard({ project }) {
  return (
    <article className="live-project-card">
      <ProjectPreview project={project} />
      <div className="live-project-card-body">
        <div className="live-project-card-topline">
          <span className="live-project-badge">
            <span aria-hidden="true" />
            {project.badge}
          </span>
          <span className="live-project-category">{project.category}</span>
        </div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className="live-project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="live-project-actions">
          <a className="live-project-primary" href={project.url} target="_blank" rel="noreferrer">
            Open Live Project
            <ExternalLink size={17} aria-hidden="true" />
          </a>
          <span className="live-project-url" title={project.url}>
            {project.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    </article>
  );
}

export function PortfolioSectionLink() {
  return (
    <Link to="/contact" className="live-projects-note-link">
      Start a project
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
