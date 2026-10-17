// Decides when the loading screen can fade. By default it waits only for the web
// font, so the first view never shifts when the font swaps in. It deliberately does
// not wait for the window "load" event: that waits for every image and media file,
// which on a phone held the content back by seconds and hurt Largest Contentful Paint.
// minDuration stops the loader flashing; maxDuration means a slow font can never
// trap visitors behind the overlay.
import { useEffect, useState } from "react";

export default function usePageReady({
  minDuration = 300,
  maxDuration = 1500,
  waitForLoad = false,
} = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const wait = (ms) =>
      new Promise((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const pageLoaded =
      !waitForLoad || document.readyState === "complete"
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
  }, [minDuration, maxDuration, waitForLoad]);

  return ready;
}
