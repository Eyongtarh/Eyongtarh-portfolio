// Asks for analytics consent. Decline is as prominent as Accept, and the choice
// can be changed later from the footer.
import { useEffect, useState } from "react";
import {
  analyticsEnabled,
  getConsent,
  loadAnalytics,
  setConsent,
  CONSENT_OPEN_EVENT,
} from "../../utils/analytics";
import "./ConsentBanner.css";

export default function ConsentBanner() {
  const [open, setOpen] = useState(() => analyticsEnabled() && getConsent() === null);

  useEffect(() => {
    if (getConsent() === "granted") loadAnalytics();
    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  if (!open) return null;

  const choose = (value) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div className="consent-banner" role="region" aria-label="Cookie consent">
      <p className="consent-text">
        I&apos;d like to use Google Analytics cookies to understand how visitors use this site.
        They are only set if you accept, and you can change your mind at any time from the
        footer.
      </p>
      <div className="consent-actions">
        <button type="button" className="btn secondary-btn" onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className="btn" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
