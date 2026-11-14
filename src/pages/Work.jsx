import { Link } from "react-router-dom";
import RowLinks from "../components/RowLinks.jsx";
import { hackathons, jobs, posts, projects } from "../data/site.js";

function writeUpFor(project) {
  return posts.find((post) => post.project === project.name);
}

function Work() {
  return (
    <>
      <section>
        <h2>Experience</h2>
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
          {projects.map((project) => {
            const post = writeUpFor(project);

            return (
              <div className={post ? "row row-linked" : "row"} key={project.name}>
                {post ? (
                  <Link className="row-title row-link" to={`/blog/${post.slug}`}>
                    {project.name}
                  </Link>
                ) : (
                  <span className="row-title">{project.name}</span>
                )}
                <span className="row-date ui">{project.date}</span>
                <p className="row-desc">{project.description}</p>
                <RowLinks label={post && "Write-up"} items={project.links} />
              </div>
            );
          })}
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
    </>
  );
}

export default Work;
