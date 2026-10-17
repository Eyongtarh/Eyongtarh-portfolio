// Shown instead of the site when VITE_MAINTENANCE is "true".
import ErrorLayout from "../components/ErrorLayout";
import { CONTACT_EMAIL, socialLinks } from "../data/site";
import background from "../assets/errors/maintenance.webp";

const linkedIn = socialLinks.find((link) => link.label === "LinkedIn");

export default function Maintenance() {
  return (
    <ErrorLayout
      title="Portfolio under maintenance"
      message="I'm adding new projects and improvements, and the site will be back shortly. In the meantime, you're welcome to get in touch."
      background={background}
      primaryButton={{ label: "Email me", href: `mailto:${CONTACT_EMAIL}` }}
      secondaryButton={linkedIn && { label: "View LinkedIn", href: linkedIn.url, external: true }}
    />
  );
}
