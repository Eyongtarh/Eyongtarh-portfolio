// Initial loading screen. Fades out once the page is ready, then removes itself
// from the DOM so it can never block clicks, focus or screen readers afterwards.
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./LoadingScreen.css";

export const FADE_MS = 400;

export default function LoadingScreen({ isLoading }) {
  const [removed, setRemoved] = useState(!isLoading);

  // If loading starts again, show the screen again. Adjusting state during render
  // is React's recommended alternative to setting state inside an effect.
  if (isLoading && removed) setRemoved(false);

  // Once loading ends, keep the element while it fades, then remove it.
  useEffect(() => {
    if (isLoading) return undefined;
    const timer = setTimeout(() => setRemoved(true), FADE_MS);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Stop the page scrolling underneath the overlay while it is visible.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("is-loading", isLoading);
    return () => root.classList.remove("is-loading");
  }, [isLoading]);

  if (removed && !isLoading) return null;

  return (
    <div
      className={`loading-screen${isLoading ? "" : " is-hidden"}`}
      role="status"
      aria-live="polite"
      aria-busy={isLoading}
      style={{ "--loader-fade": `${FADE_MS}ms` }}
    >
      <div className="loader-content">
        <div className="loader-logo" aria-hidden="true">
          <img src="/logo.png" alt="" width="90" height="90" decoding="async" />
        </div>
        <p className="loader-name" aria-hidden="true">
          Eyongtarh Besong
        </p>
        <p className="loader-tagline" aria-hidden="true">
          Building amazing experiences
        </p>
        <div className="loader-bar" aria-hidden="true">
          <span />
        </div>
        <span className="visually-hidden">
          {isLoading ? "Loading the portfolio" : "Portfolio loaded"}
        </span>
      </div>
    </div>
  );
}

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
