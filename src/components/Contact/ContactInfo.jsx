import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const contactItems = [
  {
    icon: FaEnvelope,
    color: "#ffffff",
    title: "Email",
    value: "eyongtarhb@gmail.com",
    link: "mailto:eyongtarhb@gmail.com",
  },
  {
    icon: FaPhone,
    color: "#22C55E",
    title: "Phone",
    value: "+46 733994133",
    link: "tel:+46733994133",
  },
  {
    icon: FaMapMarkerAlt,
    color: "#EF4444",
    title: "Location",
    value: "Göteborg, Sweden",
    link: "https://maps.google.com/?q=Gothenburg,Sweden",
  },
];

const socialLinks = [
  {
    icon: FaGithub,
    color: "#ffffff",
    name: "GitHub",
    url: "https://github.com/Eyongtarh",
  },
  {
    icon: FaLinkedin,
    color: "#0A66C2",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/a-eyongtarh-besong-22ab9b281/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BB4C9QtntQn2cFJU2nmfRNQ%3D%3D",
  },
  {
    icon: FaEnvelope,
    color: "#ffffff",
    name: "Email",
    url: "mailto:eyongtarhb@gmail.com",
  },
];

export default function ContactInfo() {
  return (
    <motion.aside
      className="contact-info"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3>Contact Information</h3>

      <p>
        I'm currently open to freelance opportunities, full-time positions, and
        exciting collaborations. Feel free to reach out through any of the
        channels below.
      </p>

      <div className="contact-list">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="contact-item" key={item.title}>
              <div className="contact-icon">
                <Icon
                  size={22}
                  style={{
                    color: item.color,
                  }}
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                />
              </div>

              <div>
                <h4>{item.title}</h4>

                {item.link ? (
                  <a
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="social-links">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.name}
              href={social.url}
              target={social.url.startsWith("http") ? "_blank" : undefined}
              rel={
                social.url.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label={`Visit my ${social.name}${
                social.url.startsWith("http") ? " (opens in a new tab)" : ""
              }`}
            >
              <Icon
                size={22}
                style={{
                  color: social.color,
                }}
                aria-hidden="true"
                role="presentation"
                focusable="false"
              />
            </a>
          );
        })}
      </div>
    </motion.aside>
  );
}
