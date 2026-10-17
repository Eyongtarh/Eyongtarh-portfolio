// Featured projects section with category filtering.
import { useMemo, useState } from "react";
import Reveal from "../Reveal/Reveal";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import featuredProjects, { projectCategories } from "../../data/featuredProjects";
import "./Projects.css";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All" ? featuredProjects : featuredProjects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section id="projects" className="projects" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="section-heading">
          <span className="section-subtitle">Portfolio</span>
          <h2 id="projects-title">Featured Projects</h2>
          <p>A selection of my recent software development work, with live demos and source code.</p>
        </Reveal>

        {projectCategories.length > 1 && (
          <ProjectFilter value={filter} onChange={setFilter} categories={projectCategories} />
        )}

        <p className="visually-hidden" aria-live="polite">
          {`Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}`}
        </p>

        {visible.length > 0 ? (
          <ul className="projects-grid reset-list">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ul>
        ) : (
          <p className="projects-empty">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
}
