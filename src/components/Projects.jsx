function Projects() {
  return (
    <section className="projects">
      <h2>projects</h2>

      <article className="project">
        <div className="project-header">
          <span className="project-name">poro</span>
          <span className="project-date">2026</span>
        </div>
        <p className="project-desc">
          built a macos floating assistant that nudges you back on task during focus sessions
        </p>
        <p className="tech">swift, swiftui, appkit, cerebras, applescript</p>
      </article>

      <article className="project">
        <div className="project-header">
          <span className="project-name">nagi — tamuhack</span>
          <span className="project-date">2026</span>
        </div>
        <p className="project-desc">
          agentic pipeline turning natural language into python + slurm jobs for hpc
        </p>
        <p className="tech">next.js, typescript, tailwind, nemotron api, react, figma</p>
      </article>

      <article className="project">
        <div className="project-header">
          <span className="project-name">voxpath</span>
          <span className="project-date">2025</span>
        </div>
        <p className="project-desc">
          high-performance c++ inference runtime for vocal biomarker detection
        </p>
        <p className="tech">c++17, onnx runtime, fftw, avx2, react, webassembly</p>
      </article>

      <article className="project">
        <div className="project-header">
          <span className="project-name">jp morgan dataforgood (winner)</span>
          <span className="project-date">2025</span>
        </div>
        <p className="project-desc">
          logistic regression model to improve employment outcomes for DV survivors
        </p>
        <p className="tech">python, pandas, scikit-learn, logistic regression</p>
      </article>
    </section>
  );
}

export default Projects;
