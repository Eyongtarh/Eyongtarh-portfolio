import "./AnimatedBackground.css";
import backgroundVideo from "../../assets/videos/blue.mp4";

function AnimatedBackground() {
  return (
    <>
      <video className="background-video" autoPlay muted loop playsInline>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="video-overlay"></div>
      <div className="background-glow"></div>
      <div className="background-grid"></div>
      <div className="background-noise"></div>
    </>
  );
}

export default AnimatedBackground;
