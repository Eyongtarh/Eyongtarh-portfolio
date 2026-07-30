// Application entry point
import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/inter";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./assets/styles/reset.css";
import "./assets/styles/variables.css";
import "./assets/styles/typography.css";
import "./assets/styles/animations.css";
import "./assets/styles/globals.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
