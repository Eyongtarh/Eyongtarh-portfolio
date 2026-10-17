// Resolves once the page has loaded and fonts are ready, shown for at least
// minDuration so the loader never flashes, and never longer than maxDuration
// so a slow asset can't trap visitors behind the overlay.
import { useEffect, useState } from "react";

export default function usePageReady({ minDuration = 600, maxDuration = 4000 } = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const wait = (ms) =>
      new Promise((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

    const fontsReady = document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve();

    Promise.race([Promise.all([pageLoaded, fontsReady, wait(minDuration)]), wait(maxDuration)]).then(
      () => {
        if (!cancelled) setReady(true);
      }
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [minDuration, maxDuration]);

  return ready;
}
