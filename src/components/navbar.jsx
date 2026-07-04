function Navbar({ activeSection = "home", onNavClick }) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <h2 className="logo">Chandana Arpula</h2>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.id} className={activeSection === item.id ? "active" : ""}>
            <a
              href={`#${item.id}`}
              className={activeSection === item.id ? "active" : ""}
              onClick={(event) => onNavClick?.(item.id, event)}
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