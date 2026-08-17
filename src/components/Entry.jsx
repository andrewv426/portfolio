import { Link } from "react-router-dom";

function Entry({ entry, sub = false }) {
  const {
    slug,
    name,
    date,
    description,
    tech,
    tags = [],
    repoUrl,
    entries = [],
  } = entry;

  return (
    <article className={sub ? "entry entry-sub" : "entry"}>
      <div className="entry-header">
        {slug ? (
          <Link className="entry-name" to={`/work/${slug}`}>
            {name}
          </Link>
        ) : (
          <span className="entry-name">{name}</span>
        )}
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

      {entries.length > 0 && (
        <div className="entry-children">
          {entries.map((child) => (
            <Entry entry={child} sub key={child.name} />
          ))}
        </div>
      )}
    </article>
  );
}

export default Entry;
