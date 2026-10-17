// Category filter buttons for the projects grid.
import PropTypes from "prop-types";

export default function ProjectFilter({ value, onChange, categories }) {
  return (
    <div className="project-filter" role="group" aria-label="Filter projects by category">
      {["All", ...categories].map((category) => (
        <button
          key={category}
          type="button"
          className={value === category ? "active" : undefined}
          aria-pressed={value === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

ProjectFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
