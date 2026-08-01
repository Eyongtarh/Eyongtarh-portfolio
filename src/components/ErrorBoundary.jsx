// Error boundary component for catching runtime errors and displaying a fallback error page.
import { Component } from "react";
import ServerError from "../pages/ServerError";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo,
    });
    console.error("Application Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
  }
  handleReload = () => {
    window.location.reload();
  };
  handleGoHome = () => {
    window.location.href = "/";
  };
  render() {
    if (this.state.hasError) {
      // Render a custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ServerError
          onReload={this.handleReload}
          onHome={this.handleGoHome}
          error={this.state.error}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
