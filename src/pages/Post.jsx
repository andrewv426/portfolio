import { Children, isValidElement } from "react";
import Markdown from "react-markdown";
import { Link, Navigate, useParams } from "react-router-dom";
import FlowDemo from "../components/FlowDemo.jsx";
import { posts, typeLabels } from "../data/site.js";

function MarkdownPre({ children }) {
  const code = Children.toArray(children)[0];
  if (isValidElement(code) && code.props.className === "language-flow-demo") {
    return <FlowDemo />;
  }
  if (isValidElement(code) && code.props.className === "language-flow") {
    return (
      <details className="flow-source">
        <summary className="ui">View Flow code</summary>
        <pre>{children}</pre>
      </details>
    );
  }
  return <pre>{children}</pre>;
}

const markdownComponents = { pre: MarkdownPre };

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

      {post.markdown ? (
        <div className="post-body">
          <Markdown components={markdownComponents}>
            {post.markdown.replace(/^# .*\n/, "")}
          </Markdown>
        </div>
      ) : post.body?.length > 0 ? (
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
