import { useState } from "react";
import { Link } from "react-router-dom";
import RowLinks from "../components/RowLinks.jsx";
import { links, posts, typeLabels } from "../data/site.js";

const filters = [
  { value: "all", label: "All" },
  { value: "project", label: "Projects" },
  { value: "post", label: "Posts" },
];

function Home() {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? posts : posts.filter((post) => post.type === filter);

  return (
    <>
      <section>
        <p>
          I'm Andrew. I like hard problems and thinking them all the way through, and I care a lot
          about design, performance, and algorithms.
        </p>
        <p>
          I study computer science, math, and philosophy at{" "}
          <a href="https://www.tamu.edu" target="_blank" rel="noreferrer">Texas A&amp;M</a>, where
          I'm a teaching assistant and research interpretability in LLMs. I graduate in May 2028.
        </p>
        <p>
          At <a href="https://www.dropbox.com" target="_blank" rel="noreferrer">Dropbox</a>, I
          built a full-stack learning app end to end, now used by 2,000+ employees. I also worked
          on an agentic pipeline that triages, reproduces, and routes support issues.
        </p>
        <p>
          Before that, I did time-series ML research at A&amp;M on healthcare signals:
          reconstructing ECGs from PPG and predicting electrolyte levels.
        </p>
      </section>

      <section>
        <div className="section-head">
          <h2>Blog</h2>
          <div className="filters ui" role="group" aria-label="Filter posts">
            {filters.map((option) => (
              <button
                type="button"
                key={option.value}
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {shown.length > 0 ? (
          <div className="rows">
            {shown.map((post) => (
              <div className="row row-linked" key={post.slug}>
                <Link className="row-title row-link" to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
                <span className="row-date ui">{post.date}</span>
                {post.summary && <p className="row-desc">{post.summary}</p>}
                <RowLinks label={post.project ?? typeLabels[post.type]} items={post.links} />
              </div>
            ))}
          </div>
        ) : (
          <p className="empty ui">Nothing here yet.</p>
        )}
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
