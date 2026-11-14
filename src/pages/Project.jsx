import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "../data/site.js";

function Project() {
  const { slug } = useParams();
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <>
      <h1 className="post-title">{project.name}</h1>
      <p className="post-meta ui">
        <Link to="/">Andrew Vong</Link>
        <span>·</span>
        <time>{project.date}</time>
      </p>

      <p>{project.description}</p>
      <p className="ui">Built with {project.tech}.</p>

      {project.links.length > 0 && (
        <p>
          {project.links.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              {link.label}
            </a>
          ))}
        </p>
      )}
    </>
  );
}

export default Project;
