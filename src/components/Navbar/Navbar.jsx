import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={scrolled ? "navbar navbar-scrolled" : "navbar"}>
      <div className="nav-container">
        <a href="/" className="logo">
          <img src="/logo.png" alt="EB Consulting" className="logo-image" />
          <span>Eyongtarh Besong</span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#about">About</a>

          <a href="#skills">Skills</a>

          <a href="#experience">Experience</a>

          <a href="#projects">Projects</a>

          <a href="#interests">Interests</a>

          <a href="#contact">Contact</a>
        </nav>

        <a
          href="/cv.pdf"
          className="btn nav-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </a>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
}
