// Navbar.jsx

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        <span className="logo-text">Jemuel Fontila</span>
        {/* Logo */}
        <span className="logo-mark">GG</span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/education">Education</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;