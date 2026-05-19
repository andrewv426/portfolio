function Experience() {
  return (
    <section className="experience">
      <h2>work</h2>

      <article className="job">
        <div className="job-header">
          <span className="company-name">dropbox (swe intern)</span>
          <span className="job-date">may 2026</span>
        </div>
        <p className="job-desc">
          shipping full-stack ai learning tools and llm apps publicly
        </p>
        <p className="tech">react native, node.js, aws, python</p>
      </article>

      <article className="job">
        <div className="job-header">
          <span className="company-name">texas a&amp;m university</span>
          <span className="job-date">may 2026</span>
        </div>
        <p className="job-desc">
          researching nlp models to synthesize unstructured medical data
        </p>
        <p className="tech">pytorch, nlp, python</p>
      </article>

      <article className="job">
        <div className="job-header">
          <span className="company-name">texas a&amp;m university</span>
          <span className="job-date">feb 2026</span>
        </div>
        <p className="job-desc">
          training deep learning time-series models for ecg forecasting
        </p>
        <p className="tech">pytorch, python</p>
      </article>

      <article className="job">
        <div className="job-header">
          <span className="company-name">startup</span>
          <span className="job-date">june 2025</span>
        </div>
        <p className="job-desc">
          shipped ai notetaking tool using whisper
        </p>
        <p className="tech">react, typescript, node.js, aws, whisper</p>
      </article>
    </section>
  );
}

export default Experience;
