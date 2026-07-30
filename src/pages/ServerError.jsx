// Displays the custom 500 Internal Server Error page when an unexpected application error occurs.
import ErrorLayout from "../components/ErrorLayout";
import background from "../assets/errors/error.png";
export default function ServerError({ onReload, onHome }) {
  return (
    <ErrorLayout
      code="500"
      title="Something Went Wrong"
      message="An unexpected error occurred while loading this page. Please try again or return to the homepage."
      background={background}
      primaryButton={{
        label: "Reload Page",
        onClick: onReload,
      }}
      secondaryButton={{
        label: "Back Home",
        onClick: onHome,
      }}
    />
  );
}
