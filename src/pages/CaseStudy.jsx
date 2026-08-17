import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { caseStudies } from "../data/case-studies.js";

function CaseStudy() {
  const { slug } = useParams();
  const study = caseStudies[slug];

  // entered from mid-page on /, and react-router keeps scroll position across routes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <section className="page">
        <h1>not found</h1>
        <p>
          <Link className="link-accent" to="/">back to work</Link>
        </p>
      </section>
    );
  }

  return (
    <article className="case-study">
      <p className="case-study-back">
        <Link className="link-accent" to="/">← work</Link>
      </p>

      <h1>{study.title}</h1>
      <p className="case-study-context">{study.context}</p>

      {study.intro.map((paragraph) => (
        <p className="case-study-intro" key={paragraph}>{paragraph}</p>
      ))}

      {study.sections.map((section) => (
        <section className="case-study-section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
    </article>
  );
}

export default CaseStudy;
