// Displays the custom loading error page when content fails to load.
import ErrorLayout from "../components/ErrorLayout";
import background from "../assets/errors/loading-error.png";
export default function LoadingError({
  onRetry = () => window.location.reload(),
}) {
  return (
    <ErrorLayout
      code="Loading"
      title="Unable to Load Content"
      message="Something prevented this content from loading. Please check your connection and try again."
      background={background}
      primaryButton={{
        label: "Try Again",
        onClick: onRetry,
      }}
      secondaryButton={{
        label: "Back Home",
        href: "/",
      }}
    />
  );
}
