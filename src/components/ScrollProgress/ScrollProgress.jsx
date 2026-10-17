// Reading progress bar. Uses a CSS scroll timeline where the browser supports it,
// otherwise updates a CSS variable at most once per frame without React renders.
import { useEffect, useRef } from "react";
import "./ScrollProgress.css";

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: scroll()")) {
      return undefined;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      barRef.current?.style.setProperty("--progress", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
