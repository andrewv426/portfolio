import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        andrew vong
      </NavLink>
      <ul className="nav-links">
        <li><NavLink to="/" end>about</NavLink></li>
        <li><NavLink to="/experience">experience</NavLink></li>
        <li><NavLink to="/contact">contact</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
