// Shown when part of the site fails to download, usually just after a new deployment.
import PropTypes from "prop-types";
import ErrorLayout from "../components/ErrorLayout";
import background from "../assets/errors/loading-error.webp";

export default function LoadingError({ onRetry = () => window.location.reload() }) {
  return (
    <ErrorLayout
      title="Unable to load content"
      message="Part of this page couldn't be downloaded. This usually happens after an update or a brief connection drop, and reloading should fix it."
      background={background}
      primaryButton={{ label: "Reload page", onClick: onRetry }}
      secondaryButton={{ label: "Back to home", href: "/" }}
    />
  );
}

LoadingError.propTypes = {
  onRetry: PropTypes.func,
};
