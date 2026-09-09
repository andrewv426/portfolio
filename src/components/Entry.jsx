function Entry({ entry }) {
  const { name, date, description, summaries = [], tech, tags = [], repoUrl } = entry;

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
      {summaries.length > 0 && (
        <div className="entry-summaries">
          {summaries.map(({ label, text }) => (
            <p className="entry-desc" key={label || text}>
              {label && <><strong className="entry-label">{label}</strong>: </>}
              {text}
            </p>
          ))}
        </div>
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
