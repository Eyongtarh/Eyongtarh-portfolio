// Main site entry.
import { lazy, Suspense } from "react";
import mount from "./mount";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { config } from "./config/env";

// Loaded only when maintenance mode is on, so its code and styles never sit on
// the critical path of the normal site.
const Maintenance = lazy(() => import("./pages/Maintenance"));

mount(
  config.maintenance ? (
    <Suspense fallback={null}>
      <Maintenance />
    </Suspense>
  ) : (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
);
