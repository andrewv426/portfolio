function Entry({ entry }) {
  const { name, date, description, initiatives = [], tech, tags = [], repoUrl, devpostUrl } = entry;

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
            <div className={`initiative${initiative.date ? " initiative-dated" : ""}`} key={initiative.name}>
              <dt className="initiative-name">{initiative.name}</dt>
              {initiative.description && <dd className="entry-desc">{initiative.description}</dd>}
              {initiative.date && <dd className="initiative-date">{initiative.date}</dd>}
            </div>
          ))}
        </dl>
      )}
      {tech && <p className="tech">{tech}</p>}

      {(repoUrl || devpostUrl) && (
        <p className="entry-repo-row">
          {devpostUrl && (
            <a className="link-accent" href={devpostUrl} target="_blank" rel="noreferrer">
              [devpost]
            </a>
          )}
          {repoUrl && (
            <a
              className="link-accent"
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              {devpostUrl ? "[github]" : "[link]"}
            </a>
          )}
        </p>
      )}
    </article>
  );
}

export default Entry;
