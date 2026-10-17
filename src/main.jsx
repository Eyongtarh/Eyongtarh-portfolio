// Main site entry.
import mount from "./mount";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import Maintenance from "./pages/Maintenance";
import { config } from "./config/env";

mount(
  config.maintenance ? (
    <Maintenance />
  ) : (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  ),
);
