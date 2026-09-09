import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";

function Home() {
  return (
    <>
      <section className="awards" aria-labelledby="awards-heading">
        <h2 id="awards-heading">AWARDS</h2>
        <p>1st @ Dropbox Emerging Talent Hackathon</p>
        <p>1st @ JPMC DataForGood Hackathon</p>
        <p>1st @ NorthMark Strategies Quant Trading Competition</p>
      </section>
      <Experience />
      <Projects />
    </>
  );
}

export default Home;
