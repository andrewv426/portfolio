import { NavLink, Outlet, ScrollRestoration, useMatch } from "react-router-dom";
import Snowdrift from "./components/Snowdrift.jsx";
import { handle } from "./data/site.js";

function App() {
  const isHome = Boolean(useMatch("/"));

  return (
    <main className="shell">
      <div className={isHome ? "home-layout" : undefined}>
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
        {isHome && <Snowdrift />}
      </div>
      <ScrollRestoration />
    </main>
  );
}

export default App;
