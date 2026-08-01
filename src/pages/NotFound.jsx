// Displays the custom 404 Not Found page when a requested route does not exist.
import ErrorLayout from "../components/ErrorLayout";
import background from "../assets/errors/404.png";

export default function NotFound() {
  return (
    <ErrorLayout
      code="404"
      title="Page Not Found"
      message="The page you're looking for doesn't exist, may have been moved, or the URL may be incorrect. Let's get you back to exploring my portfolio."
      background={background}
      primaryButton={{
        label: "Back Home",
        href: "/",
      }}
      secondaryButton={{
        label: "Contact Me",
        href: "#contact",
      }}
    />
  );
}
