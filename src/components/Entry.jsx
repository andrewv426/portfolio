function Entry({ entry }) {
  const { name, date, description, initiatives = [], tech, tags = [], repoUrl } = entry;

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
      {initiatives.length > 0 && (
        <dl className="entry-initiatives">
          {initiatives.map((initiative) => (
            <div className="initiative" key={initiative.name}>
              <dt className="initiative-name">{initiative.name}</dt>
              <dd className="entry-desc">{initiative.description}</dd>
            </div>
          ))}
        </dl>
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
