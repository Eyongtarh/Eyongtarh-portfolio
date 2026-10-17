// Writes public/sitemap.xml before each build so <lastmod> always matches the
// latest deployment. Google ignores changefreq and priority, so they are left out.
import { writeFile } from "node:fs/promises";

const SITE_URL = "https://eyongtarh.com";
const OUT = new URL("../public/sitemap.xml", import.meta.url);

// One entry per indexable page. Add paths here if the site grows.
const pages = ["/"];

const today = new Date().toISOString().slice(0, 10);

const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);

const urls = pages
  .map(
    (path) => `  <url>
    <loc>${escapeXml(new URL(path, SITE_URL).href)}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(OUT, xml);
console.log(`Sitemap written with ${pages.length} page(s), lastmod ${today}.`);
