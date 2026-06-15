const projects = [
  {
    name: "poro",
    date: "2026",
    description:
      "built a macos floating assistant that nudges you back on task during focus sessions",
    tech: "swift, swiftui, appkit, cerebras, applescript",
    repoUrl: "https://github.com/andrewv426/Poro",
  },
  {
    name: "nagi — tamuhack",
    date: "2026",
    description:
      "agentic pipeline turning natural language into python + slurm jobs for hpc",
    tech: "next.js, typescript, tailwind, nemotron api, react, figma",
    repoUrl: "https://github.com/isaacchacko/tamuhack26",
  },
  {
    name: "voxpath",
    date: "2025",
    description: "high-performance c++ inference runtime for vocal biomarker detection",
    tech: "c++17, onnx runtime, fftw, avx2, react, webassembly",
    repoUrl: "https://github.com/andrewv426/voxpath",
  },
  {
    name: "jp morgan dataforgood (winner)",
    date: "2025",
    description:
      "logistic regression model to improve employment outcomes for DV survivors",
    tech: "python, pandas, scikit-learn, logistic regression",
    repoUrl: null,
  },
];

function Projects() {
  return (
    <section className="projects">
      <h2>projects</h2>

      {projects.map((project) => (
        <article className="project" key={project.name}>
          <div className="project-header">
            <span className="project-name">{project.name}</span>
            <span className="project-date">{project.date}</span>
          </div>
          <p className="project-desc">{project.description}</p>
          <p className="tech">{project.tech}</p>
          <p className="project-repo-row">
            {project.repoUrl ? (
              <a
                className="link-accent"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                github repo
              </a>
            ) : (
              <span className="project-repo-missing">repo not public on github</span>
            )}
          </p>
        </article>
      ))}
    </section>
  );
}

export default Projects;
