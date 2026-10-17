// Fetches only the featured repositories and the fields the site uses.
// Runs before each build ("prebuild"); keeps the existing file if GitHub is unreachable,
// so a GitHub outage can never break a deployment.
import { writeFile } from "node:fs/promises";
import projects from "../src/data/projects.js";

const USER = "Eyongtarh";
const OUT = new URL("../src/data/github-repos.json", import.meta.url);
const FIELDS = ["id", "name", "html_url", "description", "homepage", "pushed_at", "topics"];
const wanted = new Set(projects.filter((p) => p.featured).map((p) => p.github));

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": `${USER}-portfolio-build`,
};
// Build time only. Never name this VITE_GITHUB_TOKEN or it ships to browsers.
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

try {
  const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`, {
    headers,
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`GitHub responded with ${res.status}`);

  const repos = (await res.json())
    .filter((r) => wanted.has(r.name) && !r.fork && !r.private && !r.archived)
    .map((r) => Object.fromEntries(FIELDS.map((key) => [key, r[key] ?? null])));

  if (repos.length === 0) throw new Error("No featured repositories were found");

  await writeFile(OUT, `${JSON.stringify(repos, null, 2)}\n`);
  console.log(`Saved ${repos.length} repositories.`);
} catch (error) {
  console.warn(`Keeping existing repository data: ${error.message}`);
}
