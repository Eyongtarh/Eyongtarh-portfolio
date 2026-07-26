import { useMemo, useState } from "react";
import "./Projects.css";
import useGithubRepos from "../../hooks/useGithubRepos";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import LoadingSkeleton from "./LoadingSkeleton";
export default function Projects() {
  const { projects, loading, error } = useGithubRepos();
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => {
    return [...new Set(projects.map((p) => p.category))];
  }, [projects]);
  const filtered = useMemo(() => {
    if (filter === "All") {
      return projects;
    }
    return projects.filter((p) => p.category === filter);
  }, [projects, filter]);
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <p className="section-text">
          A selection of my recent software development work hosted on GitHub.
        </p>
        {!loading && (
          <ProjectFilter
            current={filter}
            setCurrent={setFilter}
            categories={categories}
          />
        )}
        {loading && (
          <div className="projects-grid">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        )}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="projects-grid">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
