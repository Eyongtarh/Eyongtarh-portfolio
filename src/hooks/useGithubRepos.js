// Custom hook for preparing and returning featured GitHub project data.
import { useMemo } from "react";
import repos from "../data/github-repos.json";
import customProjects from "../data/projects";
export default function useGithubRepos() {
  const projects = useMemo(() => {
    return repos
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
  }, []);
  return {
    projects,
    loading: false,
    error: "",
  };
}
