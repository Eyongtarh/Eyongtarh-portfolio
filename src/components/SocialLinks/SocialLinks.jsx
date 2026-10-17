// Shared list of social profile links used by Hero, Contact and Footer.
import PropTypes from "prop-types";
import { socialLinks, isExternal, linkProps } from "../../data/site";

export default function SocialLinks({ className = "", iconSize = 22 }) {
  return (
    <ul className={`reset-list ${className}`.trim()} aria-label="Social profiles">
      {socialLinks.map(({ icon: Icon, label, url }) => (
        <li key={label}>
          <a
            href={url}
            {...linkProps(url)}
            aria-label={isExternal(url) ? `${label} (opens in a new tab)` : label}
          >
            <Icon size={iconSize} aria-hidden="true" focusable="false" />
          </a>
        </li>
      ))}
    </ul>
  );
}

SocialLinks.propTypes = {
  className: PropTypes.string,
  iconSize: PropTypes.number,
};
