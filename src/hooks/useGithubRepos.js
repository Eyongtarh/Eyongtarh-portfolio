import { useEffect, useState } from "react";
import repos from "../data/github-repos.json";
import customProjects from "../data/projects";

export default function useGithubRepos() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const merged = repos
        .filter((repo) => !repo.fork)
        .map((repo) => {
          const custom = customProjects.find(
            (project) => project.github === repo.name,
          );

          return {
            ...repo,
            ...custom,
          };
        })
        .filter((repo) => repo.featured)
        .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

      setProjects(merged);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    projects,
    loading,
    error,
  };
}
