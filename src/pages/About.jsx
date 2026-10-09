import { Link } from "react-router-dom";

function About() {
  return (
    <section className="page">
      <h1>hi,</h1>
      <p>
        i'm andrew vong — prev swe @ dropbox, building across infrastructure,
        backend systems, and machine learning.
      </p>
      <p>
        i'm studying computer science at texas a&amp;m university, with minors in
        mathematics and statistics, graduating may 2028. i'm looking for
        infra/backend/systems/ml roles and interested in algorithms and
        mechanistic interpretability research.
      </p>
      <p>
        → view my work <Link className="link-accent" to="/experience">here</Link>
      </p>
      <p>- andrew vong</p>
      <ul className="link-list" aria-label="contact links">
        <li>
          email:{" "}
          <a className="link-accent" href="mailto:andrewvong426@gmail.com">
            andrewvong426@gmail.com
          </a>
        </li>
        <li>
          github:{" "}
          <a
            className="link-accent"
            href="https://github.com/andrewv426"
            target="_blank"
            rel="noreferrer"
          >
            github.com/andrewv426
          </a>
        </li>
        <li>
          linkedin:{" "}
          <a
            className="link-accent"
            href="https://linkedin.com/in/andrewvong06"
            target="_blank"
            rel="noreferrer"
          >
            in/andrewvong06
          </a>
        </li>
      </ul>
    </section>
  );
}

export default About;
