// Animated icon for error pages.
import PropTypes from "prop-types";
import { m, useReducedMotion } from "framer-motion";
import { FaMapSigns, FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa";

const ICONS = { 404: FaMapSigns, 500: FaExclamationTriangle };

export default function ErrorIllustration({ code }) {
  const reduce = useReducedMotion();
  const Icon = ICONS[code] ?? FaExclamationCircle;

  return (
    <div className="error-illustration" aria-hidden="true">
      <m.span
        className="error-illustration-icon"
        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, -2, 2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon focusable="false" />
      </m.span>
    </div>
  );
}

ErrorIllustration.propTypes = {
  code: PropTypes.string,
};
