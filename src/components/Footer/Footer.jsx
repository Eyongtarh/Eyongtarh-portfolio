import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Interests", href: "#interests" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      icon: "fab fa-github",
      url: "https://github.com/Eyongtarh",
      label: "GitHub",
    },
    {
      icon: "fab fa-linkedin-in",
      url: "https://www.linkedin.com/in/a-eyongtarh-besong-22ab9b281/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BB4C9QtntQn2cFJU2nmfRNQ%3D%3D",
      label: "LinkedIn",
    },
    {
      icon: "fa-solid fa-envelope",
      url: "mailto:eyongtarh@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>Eyongtarh Besong</h2>

            <p>
              Full Stack Software Developer passionate about building modern,
              scalable, and user-friendly web applications.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>

            <ul>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-social">
            <h3>Connect</h3>

            <div className="social-icons">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>

            <a href="/cv.pdf" className="download-cv">
              <i className="fa-solid fa-download"></i>
              Download CV
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Eyongtarh Besong . All Rights Reserved.</p>

          <a href="/" className="back-to-top">
            <i className="fa-solid fa-arrow-up"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
