// Renders project category filters and updates the displayed projects based on the selected category.
export default function ProjectFilter({ current, setCurrent, categories }) {
  return (
    <div className="project-filter">
      <button
        type="button"
        className={current === "All" ? "active" : ""}
        onClick={() => setCurrent("All")}
        aria-pressed={current === "All"}
      >
        All
      </button>
      <div role="group" aria-label="Project category filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={current === category ? "active" : ""}
            onClick={() => setCurrent(category)}
            aria-pressed={current === category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
