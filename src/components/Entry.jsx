function Entry({ entry }) {
  const { name, date, description, bullets = [], tech, tags = [], repoUrl } = entry;

  return (
    <article className="entry">
      <div className="entry-header">
        <span className="entry-name">{name}</span>
        {date && <span className="entry-date">{date}</span>}
      </div>

      {tags.length > 0 && (
        <p className="entry-tags">
          {tags.map((tag) => (
            <span className="entry-tag" key={tag}>[{tag}]</span>
          ))}
        </p>
      )}

      {description && <p className="entry-desc">{description}</p>}
      {bullets.length > 0 && (
        <ul className="entry-bullets">
          {bullets.map(({ label, text }) => (
            <li key={label || text}>
              {label && <strong>{label} · </strong>}
              {text}
            </li>
          ))}
        </ul>
      )}
      {tech && <p className="tech">{tech}</p>}

      {repoUrl && (
        <p className="entry-repo-row">
          <a
            className="link-accent"
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
          >
            [link]
          </a>
        </p>
      )}
    </article>
  );
}

export default Entry;
