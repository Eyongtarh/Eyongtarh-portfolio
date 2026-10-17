// Full page fallback for unexpected application errors.
import PropTypes from "prop-types";
import ErrorLayout from "../components/ErrorLayout";
import background from "../assets/errors/error.webp";

export default function ServerError({
  onReload = () => window.location.reload(),
  onHome = () => window.location.assign("/"),
}) {
  return (
    <ErrorLayout
      code="500"
      title="Something went wrong"
      message="An unexpected error occurred while loading this page. Please try again or return to the homepage."
      background={background}
      primaryButton={{ label: "Reload page", onClick: onReload }}
      secondaryButton={{ label: "Back to home", onClick: onHome }}
    />
  );
}

ServerError.propTypes = {
  onReload: PropTypes.func,
  onHome: PropTypes.func,
};
