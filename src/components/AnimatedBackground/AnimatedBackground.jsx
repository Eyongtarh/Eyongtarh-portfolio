// Decorative animated background layers, hidden from assistive technology.
import "./AnimatedBackground.css";

export default function AnimatedBackground() {
  return (
    <div className="animated-background" aria-hidden="true">
      <div className="background-glow" />
      <div className="background-grid" />
      <div className="background-noise" />
    </div>
  );
}
