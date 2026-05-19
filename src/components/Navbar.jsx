import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function otherTheme(t) {
  if (t === "dark") return "light";
  return "dark";
}

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch { /* ignore */ }
  }, [theme]);
  return [theme, () => setTheme(otherTheme)];
}

function Navbar() {
  const [theme, toggleTheme] = useTheme();

  function handleToggleClick() {
    document.documentElement.classList.add("theme-transitioning");
    toggleTheme();
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 350);
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        andrew vong
      </NavLink>

      <ul className="nav-links">
        <li><NavLink to="/">experience</NavLink></li>
        <li><NavLink to="/about">about</NavLink></li>
        <li><NavLink to="/contact">contact</NavLink></li>
        <li>
          <button
            type="button"
            className="theme-toggle"
            onClick={handleToggleClick}
            aria-label={`switch to ${otherTheme(theme)} mode`}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <mask id="moon-mask">
                <rect x="0" y="0" width="24" height="24" fill="white" />
                <circle className="moon-cutout" cx="17" cy="7" r="6" fill="black" />
              </mask>
              <circle
                className="disc"
                cx="12" cy="12" r="5"
                fill="currentColor"
                mask="url(#moon-mask)"
              />
              <g className="rays" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="2"  x2="12" y2="4"  />
                <line x1="12" y1="20" x2="12" y2="22" />
                <line x1="2"  y1="12" x2="4"  y2="12" />
                <line x1="20" y1="12" x2="22" y2="12" />
                <line x1="4.5"  y1="4.5"  x2="6"    y2="6"    />
                <line x1="18"   y1="18"   x2="19.5" y2="19.5" />
                <line x1="4.5"  y1="19.5" x2="6"    y2="18"   />
                <line x1="18"   y1="6"    x2="19.5" y2="4.5"  />
              </g>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
