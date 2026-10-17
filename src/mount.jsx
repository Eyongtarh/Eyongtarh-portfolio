// Shared entry setup for every HTML page in the build (index.html and 404.html).
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "./assets/styles/reset.css";
import "./assets/styles/variables.css";
import "./assets/styles/typography.css";
import "./assets/styles/animations.css";
import "./assets/styles/globals.css";

const RELOAD_KEY = "last-chunk-reload";
const RELOAD_WINDOW_MS = 10_000;

// After a deployment, old chunks no longer exist on the server. Reload once to fetch
// the new ones. If it fails again within ten seconds, let the error boundary show
// LoadingError instead of reloading forever.
window.addEventListener("vite:preloadError", (event) => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < RELOAD_WINDOW_MS) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    return;
  }
  event.preventDefault();
  window.location.reload();
});

export default function mount(element) {
  const container = document.getElementById("root");
  if (!container) throw new Error("Root element #root was not found.");
  createRoot(container).render(<StrictMode>{element}</StrictMode>);
}
