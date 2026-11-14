import { Link } from "react-router-dom";
import { handle, hackathons, jobs, links, projects } from "../data/site.js";

function RowLinks({ items }) {
  if (items.length === 0) return null;

  return (
    <span className="row-links ui">
      {items.map((item) => (
        <a href={item.href} target="_blank" rel="noreferrer" key={item.label}>
          {item.label}
        </a>
      ))}
    </span>
  );
}

function Home() {
  return (
    <>
      <h1 className="site-title">
        <Link to="/">@{handle}</Link>
      </h1>

      <section>
        <p>
          I'm Andrew, previously a software engineer at{" "}
          <a href="https://www.dropbox.com" target="_blank" rel="noreferrer">Dropbox</a>. At{" "}
          <a href="https://www.tamu.edu" target="_blank" rel="noreferrer">Texas A&amp;M</a>, I
          researched reconstructing ECGs from PPG signals and predicting electrolyte levels from
          ECGs.
        </p>
        <p>
          I'm looking for infra, backend, systems, and ML roles, and I'm currently researching
          mechanistic interpretability in LLMs.
        </p>

        <p>
          At Dropbox, I built an agentic triage pipeline: LLM agents that triage, reproduce, and
          route support issues. I also worked on a learning platform, with assessment workflows, a
          content editor, Okta SSO, and a Slack integration.
        </p>
        <p>
          Before that, I built an AI note-taking app with streaming Whisper transcription at a
          startup. I study computer science at Texas A&amp;M with minors in math and statistics,
          where I'm also a teaching assistant, and I graduate in May 2028.
        </p>
      </section>

      <section>
        <h2>Work</h2>
        <div className="rows">
          {jobs.map((job) => (
            <div className="row" key={`${job.name}-${job.date}`}>
              <span className="row-title">
                {job.name}
                {job.role && <span className="ui">{job.role}</span>}
              </span>
              <span className="row-date ui">{job.date}</span>
              {job.description && <p className="row-desc">{job.description}</p>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Projects</h2>
        <div className="rows">
          {projects.map((project) => (
            <Link className="row" to={`/projects/${project.slug}`} key={project.slug}>
              <span className="row-title">{project.name}</span>
              <span className="row-date ui">{project.date}</span>
              <p className="row-desc">{project.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Hackathons</h2>
        <div className="rows">
          {hackathons.map((hackathon) => (
            <div className="row" key={hackathon.name}>
              <span className="row-title">
                {hackathon.name}
                {hackathon.event && <span className="ui">{hackathon.event}</span>}
                {hackathon.award && <span className="ui">{hackathon.award}</span>}
              </span>
              <span className="row-date ui">{hackathon.date}</span>
              <p className="row-desc">{hackathon.description}</p>
              <RowLinks items={hackathon.links} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Elsewhere</h2>
        <ul className="link-list">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Home;
