import { Link, Navigate, useParams } from "react-router-dom";
import { posts, typeLabels } from "../data/site.js";

function Post() {
  const { slug } = useParams();
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) return <Navigate to="/" replace />;

  const links = post.links ?? [];

  return (
    <>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-meta ui">
        <Link to="/">Blog</Link>
        <span>·</span>
        <span>{post.project ?? typeLabels[post.type]}</span>
        <span>·</span>
        <time>{post.date}</time>
      </p>

      {post.body?.length > 0 ? (
        post.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)
      ) : post.summary ? (
        <p>{post.summary}</p>
      ) : (
        <p className="ui">Coming soon.</p>
      )}
      {post.tech && <p className="ui">Built with {post.tech}.</p>}

      {links.length > 0 && (
        <p className="row-links ui">
          {links.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>
              {link.label}
            </a>
          ))}
        </p>
      )}
    </>
  );
}

// Old /projects/:slug URLs now live under /blog.
export function ProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug}`} replace />;
}

export default Post;
