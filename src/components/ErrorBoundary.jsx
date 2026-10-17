// Catches render errors in its subtree. Accepts an element or a component as
// `fallback`; a component receives { error, reset }.
import { Component } from "react";
import PropTypes from "prop-types";
import ServerError from "../pages/ServerError";
import LoadingError from "../pages/LoadingError";
import { isChunkError } from "../utils/errors";
import { config } from "../config/env";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (config.isDev) {
      console.error("Application error:", error, errorInfo?.componentStack);
    }
    // Report to a monitoring service here in production (for example Sentry).
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    const { hasError, error } = this.state;
    const { fallback: Fallback, children } = this.props;

    if (!hasError) return children;

    if (Fallback) {
      return typeof Fallback === "function" ? (
        <Fallback error={error} reset={this.reset} />
      ) : (
        Fallback
      );
    }

    if (isChunkError(error)) return <LoadingError />;
    return <ServerError />;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType]),
};

export default ErrorBoundary;
