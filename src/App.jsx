import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { handle } from "./data/site.js";

function App() {
  return (
    <main className="shell">
      <article className="frame">
        <header className="site-header">
          <h1 className="site-title">
            <a href={`https://x.com/${handle}`} target="_blank" rel="noreferrer">
              @{handle}
            </a>
          </h1>
          <nav className="tabs ui" aria-label="Sections">
            <NavLink to="/" end>
              About
            </NavLink>
            <NavLink to="/work">Work</NavLink>
          </nav>
        </header>
        <Outlet />
      </article>
      <ScrollRestoration />
    </main>
  );
}

export default App;
