// Reusable layout component for displaying custom error pages with configurable content and actions.
import { motion } from "framer-motion";
import "./ErrorLayout.css";
import ErrorIllustration from "./ErrorIllustration";

export default function ErrorLayout({
  code,
  title,
  message,
  background,
  primaryButton,
  secondaryButton,
  children,
}) {
  const renderButton = (button, secondary = false) => {
    if (!button) return null;
    const className = secondary ? "btn secondary-btn" : "btn";
    if (button.onClick) {
      return (
        <button type="button" className={className} onClick={button.onClick}>
          {button.label}
        </button>
      );
    }
    return (
      <a
        href={button.href}
        className={className}
        target={button.external ? "_blank" : undefined}
        rel={button.external ? "noopener noreferrer" : undefined}
      >
        {button.label}
      </a>
    );
  };
  return (
    <section
      className="error-page"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="error-overlay" />
      <motion.div
        className="error-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        {code && <span className="error-code">{code}</span>}
        <ErrorIllustration code={code} />
        <h1>{title}</h1>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="error-buttons">
          {renderButton(primaryButton)}
          {renderButton(secondaryButton, true)}
          {children}
        </div>
      </motion.div>
    </section>
  );
}
