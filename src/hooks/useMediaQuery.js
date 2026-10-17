// Subscribes to a CSS media query and returns whether it currently matches.
import { useSyncExternalStore } from "react";

const canMatch = () => typeof window !== "undefined" && typeof window.matchMedia === "function";

export default function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => {
      if (!canMatch()) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => (canMatch() ? window.matchMedia(query).matches : false),
    () => false
  );
}
