import { useState } from "react";

function Navbar({ activeSection = "home", onNavClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Work Experience" },
    { id: "certifications", label: "Certifications" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact Me" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <h2 className="logo">Chandana Arpula</h2>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.id} className={activeSection === item.id ? "active" : ""}>
            <a
              href={`#${item.id}`}
              className={activeSection === item.id ? "active" : ""}
              onClick={(event) => {
                onNavClick?.(item.id, event);
                closeMenu();
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;