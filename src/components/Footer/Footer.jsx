// Footer with navigation, social profiles, CV download and licence.
import { FaDownload, FaArrowUp } from "react-icons/fa";
import SocialLinks from "../SocialLinks/SocialLinks";
import { navItems, SITE_NAME, LOCATION, CV_URL, CV_FILENAME } from "../../data/site";
import { analyticsEnabled, reopenConsent } from "../../utils/analytics";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-panel">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-name">{SITE_NAME}</p>
            <p>
              Full Stack Software Developer passionate about building modern, scalable and user
              friendly web applications.
            </p>
          </div>

          <nav className="footer-links" aria-labelledby="footer-links-title">
            <h2 id="footer-links-title" className="footer-heading">
              Quick links
            </h2>
            <ul className="reset-list">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-social">
            <h2 className="footer-heading">Connect</h2>
            <SocialLinks className="social-icons" />
            <a href={CV_URL} download={CV_FILENAME} className="download-cv">
              <FaDownload size={16} aria-hidden="true" focusable="false" />
              Download CV
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} {SITE_NAME}. Licensed under the{" "}
            <a href="/LICENSE" className="license-link" target="_blank" rel="noopener noreferrer">
              MIT Licence
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            .
            {analyticsEnabled() && (
              <>
                {" "}
                <button type="button" className="cookie-settings" onClick={reopenConsent}>
                  Cookie settings
                </button>
              </>
            )}
          </p>
          <address className="footer-address">{LOCATION.display}</address>
          <a href="#home" className="back-to-top" aria-label="Back to top">
            <FaArrowUp size={18} aria-hidden="true" focusable="false" />
          </a>
        </div>
      </div>
    </footer>
  );
}
