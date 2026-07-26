import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "interests", label: "Interests" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-20% 0px -40% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-container">
        <a
          href="#home"
          className="logo"
          aria-label="Eyongtarh Besong - Home"
          onClick={closeMenu}
        >
          <img
            src="/logo.png"
            alt="Eyongtarh Besong logo"
            className="logo-image"
            width="48"
            height="48"
          />
          <span>Eyongtarh Besong</span>
        </a>

        <nav
          className={`nav-links ${menuOpen ? "open" : ""}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMenu}
              className={activeSection === item.id ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          type="button"
        >
          {menuOpen ? (
            <FaTimes
              size={22}
              aria-hidden="true"
              role="presentation"
              focusable="false"
            />
          ) : (
            <FaBars
              size={22}
              aria-hidden="true"
              role="presentation"
              focusable="false"
            />
          )}
        </button>
      </div>
    </header>
  );
}
