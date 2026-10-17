// Reusable layout for full page error screens with configurable content and actions.
import PropTypes from "prop-types";
import { m, useReducedMotion } from "framer-motion";
import ErrorIllustration from "./ErrorIllustration";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { SITE_NAME } from "../data/site";
import { isSafeHref, toCssUrl } from "../utils/urls";
import "./ErrorLayout.css";

export default function ErrorLayout({
  code,
  title,
  message,
  background,
  primaryButton,
  secondaryButton,
  children,
}) {
  const reduce = useReducedMotion();
  useDocumentMeta({ title: `${title} | ${SITE_NAME}`, noindex: true });

  const renderButton = (button, secondary = false) => {
    if (!button?.label) return null;
    const className = secondary ? "btn secondary-btn" : "btn";

    if (typeof button.onClick === "function") {
      return (
        <button type="button" className={className} onClick={button.onClick}>
          {button.label}
        </button>
      );
    }
    if (!isSafeHref(button.href)) return null;

    return (
      <a
        href={button.href}
        className={className}
        {...(button.external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {button.label}
        {button.external && <span className="visually-hidden"> (opens in a new tab)</span>}
      </a>
    );
  };

  return (
    <main
      id="main"
      className="error-page"
      style={{ backgroundImage: toCssUrl(background) }}
      aria-labelledby="error-title"
    >
      <div className="error-overlay" aria-hidden="true" />
      <m.div
        className="error-card"
        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {code && (
          <p className="error-code" aria-hidden="true">
            {code}
          </p>
        )}
        <ErrorIllustration code={code} />
        <h1 id="error-title">{title}</h1>
        <p className="error-message">{message}</p>
        <div className="error-buttons">
          {renderButton(primaryButton)}
          {renderButton(secondaryButton, true)}
          {children}
        </div>
      </m.div>
    </main>
  );
}

const buttonShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  external: PropTypes.bool,
});

ErrorLayout.propTypes = {
  code: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  background: PropTypes.string,
  primaryButton: buttonShape,
  secondaryButton: buttonShape,
  children: PropTypes.node,
};
