// Displays the custom maintenance page while the portfolio is temporarily unavailable.
import ErrorLayout from "../components/ErrorLayout";
import background from "../assets/errors/maintenance.png";
export default function Maintenance() {
  return (
    <ErrorLayout
      title="Portfolio Under Maintenance"
      message="I'm currently improving this portfolio with new projects, features, and performance enhancements. Thank you for your patience—I'll be back online shortly."
      background={background}
      primaryButton={{
        label: "Go Home",
        href: "/",
      }}
      secondaryButton={{
        label: "View LinkedIn",
        href: "https://www.linkedin.com/in/a-eyongtarh-besong-22ab9b281/",
        external: true,
      }}
    />
  );
}
