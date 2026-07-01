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
          built a production django/postgresql platform serving 500+ engineers, spanning backend services, data pipelines, and automated aws deploys
        </p>
        <p className="tech">django, postgresql, aws, okta oidc, ci/cd</p>
      </article>
    
      <article className="job">
        <div className="job-header">
          <span className="company-name">texas a&m university (ml researcher)</span>
          <span className="job-date">march 2026</span>
        </div>
        <p className="job-desc">
          deep-learning time-series models forecasting cardiovascular waveforms from wearable sensors
        </p>
        <p className="tech">python, pytorch</p>
      </article>

      <article className="job">
        <div className="job-header">
          <span className="company-name">startup</span>
          <span className="job-date">june 2025</span>
        </div>
        <p className="job-desc">
          shipped a full-stack ai note-taking platform using whisper
        </p>
        <p className="tech">javascript, typescript, react, node.js, aws, whisper</p>
      </article>
    </section>
  );
}

export default Experience;
