// Google Analytics, loaded only after the visitor consents. Nothing is downloaded
// and no cookies are set until then, which keeps the site in line with GDPR and the
// Swedish Electronic Communications Act. The measurement ID comes from VITE_GA_ID.
import { config } from "../config/env";

const STORAGE_KEY = "analytics-consent";
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,15}$/;
export const CONSENT_OPEN_EVENT = "consent:open";

let loaded = false;

// Runs a task once the page has finished loading and the browser is idle, so a
// returning visitor's analytics script never competes with the page's own
// script, styles and font. Commands sent to gtag before then wait in dataLayer
// and are sent when the script arrives, so no page view is lost.
function whenIdle(task) {
  const schedule = () =>
    "requestIdleCallback" in window
      ? window.requestIdleCallback(task, { timeout: 3000 })
      : setTimeout(task, 1500);
  if (document.readyState === "complete") task();
  else window.addEventListener("load", schedule, { once: true });
}

const gaId = () => (GA_ID_PATTERN.test(config.gaId) ? config.gaId : null);

export const analyticsEnabled = () => gaId() !== null;

export function getConsent() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function deleteAnalyticsCookies() {
  const host = window.location.hostname.replace(/^www\./, "");
  document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => /^_ga/.test(name))
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}`;
    });
}

export function loadAnalytics() {
  const id = gaId();
  if (!id || loaded) return false;

  window[`ga-disable-${id}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag requires the arguments object itself, not an array copy.
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id);

  whenIdle(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.append(script);
  });

  loaded = true;
  return true;
}

export function disableAnalytics() {
  const id = gaId();
  if (id) window[`ga-disable-${id}`] = true;
  deleteAnalyticsCookies();
}

export function setConsent(value) {
  if (value !== "granted" && value !== "denied") {
    throw new Error(`Unknown consent value: ${value}`);
  }
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: the choice still applies for this visit.
  }
  if (value === "granted") loadAnalytics();
  else disableAnalytics();
}

// Withdrawing consent must be as easy as giving it, so the footer calls this.
export function reopenConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore blocked storage.
  }
  disableAnalytics();
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
