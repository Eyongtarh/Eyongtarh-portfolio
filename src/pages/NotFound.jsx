// Custom 404 page. Built as 404.html, which Vercel serves with a real 404 status.
import ErrorLayout from "../components/ErrorLayout";
import background from "../assets/errors/404.webp";

export default function NotFound() {
  return (
    <ErrorLayout
      code="404"
      title="Page not found"
      message="The page you're looking for doesn't exist or may have moved. Let's get you back to the portfolio."
      background={background}
      primaryButton={{ label: "Back to home", href: "/" }}
      secondaryButton={{ label: "Contact me", href: "/#contact" }}
    />
  );
}
