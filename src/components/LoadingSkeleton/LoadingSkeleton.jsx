// Accessible placeholder shown while a lazy section downloads.
// Its styles live beside it, so they are available before the section's own CSS.
import PropTypes from "prop-types";
import "./LoadingSkeleton.css";

export default function LoadingSkeleton({ label = "Loading content", minHeight = 480 }) {
  return (
    <div className="skeleton-wrapper" role="status" style={{ minHeight }}>
      <span className="visually-hidden">{label}</span>
      <div className="skeleton-card" aria-hidden="true">
        <div className="skeleton skeleton-image" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text skeleton-text--short" />
      </div>
    </div>
  );
}

LoadingSkeleton.propTypes = {
  label: PropTypes.string,
  minHeight: PropTypes.number,
};
