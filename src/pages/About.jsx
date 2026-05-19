function About() {
  return (
    <section className="page">
      <h1>hi,</h1>
      <p>
        i'm currently a third-year studying computer science at [texas a&amp;m university].
        <br />
        i have a passion for coding, medicine, and machine learning.
      </p>
      <p>
        outside of programming, i enjoy watching netflix, trying new foods, and travelling.
      </p>

      <p>a few favorites —</p>
      <ul className="link-list">
        <li>tv show · <span className="link-accent">suits</span></li>
        <li>anime · <span className="link-accent">attack on titan</span></li>
        <li>food · <span className="link-accent">sushi</span></li>
        <li>place · <span className="link-accent">japan</span></li>
        <li>artist · <span className="link-accent">drake</span></li>
      </ul>
    </section>
  );
}

export default About;
