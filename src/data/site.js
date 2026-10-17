// Single source of truth for contact details, navigation and social profiles.
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

export const SITE_NAME = "Eyongtarh Besong";

// Check this address: earlier versions of the site used two different spellings.
export const CONTACT_EMAIL = "eyongtarhb@gmail.com";

export const CONTACT_PHONE = Object.freeze({
  display: "+46 73 399 41 33",
  href: "tel:+46733994133",
});

export const LOCATION = Object.freeze({
  display: "Göteborg, Sweden",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Gothenburg%2C%20Sweden",
});

export const CV_URL = "/cv.pdf";
export const CV_FILENAME = "Eyongtarh-Besong-CV.pdf";

export const navItems = Object.freeze([
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "interests", label: "Interests" },
  { id: "contact", label: "Contact" },
]);

export const socialLinks = Object.freeze([
  { icon: FaGithub, label: "GitHub", url: "https://github.com/Eyongtarh" },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/a-eyongtarh-besong-22ab9b281/",
  },
  { icon: FaEnvelope, label: "Email", url: `mailto:${CONTACT_EMAIL}` },
]);

export const isExternal = (url) => /^https?:\/\//i.test(url);

export const linkProps = (url) =>
  isExternal(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};
