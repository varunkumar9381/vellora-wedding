import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/" onClick={close}>
          <span className="brand-mark">V</span>
          <span>Veloura <small>WEDDINGS</small></span>
        </Link>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          ☰
        </button>

        <nav className={`nav ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/products" onClick={close}>Products</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
