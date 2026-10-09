import { Link } from "react-router-dom";

function About() {
  return (
    <section className="page">
      <h1>hi,</h1>
      <p>
        i'm andrew, previously a swe at{" "}
        <strong className="company-name">
          <svg className="company-icon" aria-hidden="true" focusable="false">
            <use href="/icons.svg#dropbox-icon" />
          </svg>
          dropbox
        </strong>
        . at texas a&amp;m, i researched reconstructing ecgs from ppg signals and
        predicting electrolyte levels from ecgs.
      </p>
      <p>
        i'm a computer science student at texas a&amp;m, graduating in may 2028
        with minors in mathematics and statistics. i'm looking for
        infrastructure, backend, systems, or machine learning roles, with
        research interests in algorithms and mechanistic interpretability.
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
          {" // "}
          <a className="link-accent" href="mailto:andrewvong@tamu.edu">
            andrewvong@tamu.edu
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
