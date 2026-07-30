import "./Footer.css";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaDownload,
  FaArrowUp,
} from "react-icons/fa";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Interests", href: "#interests" },
    { name: "Contact", href: "#contact" },
  ];
  const socialLinks = [
    {
      icon: FaGithub,
      color: "#ffffff",
      url: "https://github.com/Eyongtarh",
      label: "GitHub",
    },
    {
      icon: FaLinkedinIn,
      color: "#0A66C2",
      url: "https://www.linkedin.com/in/a-eyongtarh-besong-22ab9b281/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BB4C9QtntQn2cFJU2nmfRNQ%3D%3D",
      label: "LinkedIn",
    },
    {
      icon: FaEnvelope,
      color: "#ffffff",
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
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target={
                      social.url.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={`Visit my ${social.label}${
                      social.url.startsWith("http")
                        ? " (opens in a new tab)"
                        : ""
                    }`}
                  >
                    <Icon
                      size={22}
                      style={{ color: social.color }}
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    />
                  </a>
                );
              })}
            </div>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="download-cv"
            >
              <FaDownload
                size={16}
                style={{ marginRight: "8px" }}
                aria-hidden="true"
              />
              Download CV
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {currentYear} Eyongtarh Besong. Licensed under the MIT License.
          </p>
          <p>Göteborg, Sweden.</p>
          <a href="#home" className="back-to-top" aria-label="Back to top">
            <FaArrowUp size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
