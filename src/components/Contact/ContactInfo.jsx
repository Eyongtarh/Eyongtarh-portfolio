// Contact details and social links.
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Reveal from "../Reveal/Reveal";
import SocialLinks from "../SocialLinks/SocialLinks";
import { CONTACT_EMAIL, CONTACT_PHONE, LOCATION, linkProps } from "../../data/site";

const contactItems = [
  {
    icon: FaEnvelope,
    color: "#F8FAFC",
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: FaPhone,
    color: "#4ADE80",
    label: "Phone",
    value: CONTACT_PHONE.display,
    href: CONTACT_PHONE.href,
  },
  {
    icon: FaMapMarkerAlt,
    color: "#F87171",
    label: "Location",
    value: LOCATION.display,
    href: LOCATION.mapUrl,
  },
];

export default function ContactInfo() {
  return (
    <Reveal as="aside" className="card card--static contact-info" aria-labelledby="contact-info-title">
      <h3 id="contact-info-title">Contact information</h3>
      <p className="contact-intro">
        I&apos;m currently open to freelance work, full time positions and exciting
        collaborations. Feel free to reach out through any of the channels below.
      </p>

      <ul className="contact-list reset-list">
        {contactItems.map(({ icon: Icon, color, label, value, href }) => (
          <li className="contact-item" key={label}>
            <span className="contact-icon" aria-hidden="true">
              <Icon size={22} style={{ color }} focusable="false" />
            </span>
            <span className="contact-text">
              <span className="contact-label">{label}</span>
              <a href={href} {...linkProps(href)}>
                {value}
                {linkProps(href).target && (
                  <span className="visually-hidden"> (opens map in a new tab)</span>
                )}
              </a>
            </span>
          </li>
        ))}
      </ul>

      <SocialLinks className="social-links" />
    </Reveal>
  );
}
