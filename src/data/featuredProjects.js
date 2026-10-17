// Merges featured project details with trimmed GitHub data, once, at import time.
// Replaces the old useGithubRepos hook: the data never changes at runtime.
import repos from "./github-repos.json";
import projects from "./projects";
import { safeUrl } from "../utils/urls";

const repoByName = new Map(repos.map((repo) => [repo.name, repo]));

const featuredProjects = projects
  .filter((p) => p.featured)
  .map((p) => {
    const repo = repoByName.get(p.github);
    return Object.freeze({
      id: String(repo?.id ?? p.github),
      title: p.title ?? p.github.replace(/[-_]/g, " "),
      description: p.description ?? repo?.description ?? "",
      category: p.category ?? "Other",
      highlight: p.highlight ?? "",
      technologies: p.technologies ?? [],
      image: p.image,
      demoUrl: safeUrl(p.demo ?? repo?.homepage),
      // Only link to source code GitHub actually returned as public. A private or
      // deleted repository gets no link, rather than one that leads to a 404.
      repoUrl: safeUrl(repo?.html_url),
      order: p.order ?? 999,
    });
  })
  .sort((a, b) => a.order - b.order);

export const projectCategories = [
  ...new Set(featuredProjects.map((p) => p.category)),
].sort();

export default featuredProjects;
