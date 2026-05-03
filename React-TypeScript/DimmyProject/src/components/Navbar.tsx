import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Features", "How it works", "Pricing"];

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="navbar__logo">
        <span className="navbar__mark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5v5l3 3" stroke="#F5EFE6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="7" r="5.5" stroke="#F5EFE6" strokeWidth="2" />
          </svg>
        </span>
        <span className="navbar__wordmark">
          Dimmy
        </span>
      </a>

      {/* Desktop links */}
      <div className="navbar__links">
        {links.map((link) => (
          <a key={link} href="#" className="link">
            {link}
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="navbar__actions">
        <a href="#" className="link">
          Sign in
        </a>

        <button
          className="btn btn--primary btn--sm"
        >
          Get started
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="icon-btn navbar__hamburger"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__menu">
          {links.map((link) => (
            <a key={link} href="#" className="navbar__menu-link">
              {link}
            </a>
          ))}
          <a href="#" className="navbar__menu-link">
            Sign in
          </a>
        </div>
      )}
    </nav>
  );
}
