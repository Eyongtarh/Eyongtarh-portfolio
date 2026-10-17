// Responsive navigation with active section tracking and an accessible mobile menu.
import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { navItems, SITE_NAME } from "../../data/site";
import "./Navbar.css";

const DESKTOP_QUERY = "(min-width: 1031px)";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const headerRef = useRef(null);
  const buttonRef = useRef(null);

  // Solid background once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section, including sections that are lazy loaded later.
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || typeof IntersectionObserver === "undefined") return undefined;

    const observed = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    const observeSections = () => {
      main.querySelectorAll("section[id]").forEach((section) => {
        if (!observed.has(section)) {
          observed.add(section);
          io.observe(section);
        }
      });
    };

    observeSections();
    const mo = new MutationObserver(observeSections);
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // Close the menu on Escape, outside click, or switching to desktop width.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (!headerRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = (e) => {
      if (e.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header ref={headerRef} className={`navbar${scrolled ? " navbar-scrolled" : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="nav-container">
        <a href="#home" className="logo" onClick={closeMenu}>
          <img src="/logo.png" alt="" className="logo-image" width="48" height="48" />
          <span className="logo-text">{SITE_NAME}</span>
          <span className="visually-hidden">, home</span>
        </a>

        <nav
          id="primary-navigation"
          className={`nav-links${menuOpen ? " open" : ""}`}
          aria-label="Primary"
        >
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={closeMenu}
              className={activeSection === id ? "active" : undefined}
              aria-current={activeSection === id ? "true" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
        >
          {menuOpen ? (
            <FaTimes aria-hidden="true" focusable="false" />
          ) : (
            <FaBars aria-hidden="true" focusable="false" />
          )}
        </button>
      </div>
    </header>
  );
}
