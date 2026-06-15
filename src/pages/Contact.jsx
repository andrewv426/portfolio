function Contact() {
  return (
    <section className="page">
      <h1>contact,</h1>
      <p>the best way to reach me —</p>
      <ul className="link-list">
        <li>
          email ·{" "}
          <a className="link-accent" href="mailto:andrewvong426@gmail.com">
            andrewvong426@gmail.com
          </a>
        </li>
        <li>
          github ·{" "}
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
          linkedin ·{" "}
          <a
            className="link-accent"
            href="https://linkedin.com/in/andrew-vong-codes"
            target="_blank"
            rel="noreferrer"
          >
            in/andrew-vong-codes
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Contact;
