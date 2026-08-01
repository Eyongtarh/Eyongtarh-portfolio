// Displays the custom 403 Access Denied error page using the shared ErrorLayout component.
import ErrorLayout from "../components/ErrorLayout";
import background from "../assets/errors/access-denied.png";

export default function AccessDenied() {
  return (
    <ErrorLayout
      code="403"
      title="Access Denied"
      message="Sorry, you don't have permission to access this page. If you believe this is a mistake, please contact me."
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
