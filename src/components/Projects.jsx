import Entry from "./Entry.jsx";
import { projects } from "../data/work.js";

function Projects() {
  return (
    <section className="projects">
      <h2>projects</h2>

      {projects.map((project) => (
        <Entry entry={project} key={project.name} />
      ))}
    </section>
  );
}

export default Projects;
