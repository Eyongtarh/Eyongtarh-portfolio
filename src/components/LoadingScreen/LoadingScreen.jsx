import "./LoadingScreen.css";

function LoadingScreen({ isLoading }) {
  return (
    <div className={`loading-screen ${!isLoading ? "hidden" : ""}`}>
      <div className="loader-content">
        <img
          className="loader-logo"
          src="/logo.png"
          alt="Eyongtarh Besong"
          width="90"
          height="90"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <h2>Eyongtarh Besong</h2>
        <p>Building amazing experiences...</p>
        <div className="loading-bar">
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
