// Glow that follows the pointer. Updates the DOM directly once per frame,
// so moving the mouse never re-renders React.
import { useEffect, useRef } from "react";
import "./CursorGlow.css";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export default function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function" || !window.matchMedia(QUERY).matches) {
      return undefined;
    }

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const paint = () => {
      frame = 0;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    ref.current?.classList.add("is-active");
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
