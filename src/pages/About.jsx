import { Link } from "react-router-dom";

function About() {
  return (
    <section className="page">
      <h1>hi,</h1>
      <p>
        I'm studying computer science at texas a&amp;m university, with minors in
        mathematics and statistics! Set to graduate May 2028 :)
      </p>
      <p>
        I'm currently looking for infra/backend/systems/ML roles, and I'm also interested in algorithms and mech. interp research!
      </p>
      <p>
        {"-> "}view my work <Link className="link-accent" to="/experience">here</Link>
      </p>
      <p>- andrew vong</p>
    </section>
  );
}

export default About;
