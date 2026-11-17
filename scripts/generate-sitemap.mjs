import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://parkwoodproperties.ae";
const LASTMOD = new Date().toISOString().slice(0, 10);

const coreRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/communities", changefreq: "weekly", priority: "0.9" },
  { path: "/request-appraisal", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.3" },
];

// Extract community slugs directly from src/content/site.ts so sitemap always stays synced
const siteTsPath = path.resolve(process.cwd(), "src/content/site.ts");
const siteTs = fs.readFileSync(siteTsPath, "utf8");
const communitiesBlockMatch = siteTs.match(/export const communities:[\s\S]*?=\s*\[([\s\S]*?)\];/);
if (!communitiesBlockMatch) {
  throw new Error("Could not locate `communities` array in src/content/site.ts");
}

const slugs = [...communitiesBlockMatch[1].matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
if (slugs.length === 0) {
  throw new Error("No community slugs found in src/content/site.ts");
}

const urls = [
  ...coreRoutes.map(
    (r) =>
      `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`,
  ),
  ...slugs.map(
    (slug) =>
      `  <url><loc>${SITE_URL}/communities/${slug}</loc><lastmod>${LASTMOD}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

const outPath = path.resolve(process.cwd(), "public/sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");
console.log(`Generated public/sitemap.xml with ${urls.length} URLs (${slugs.length} communities).`);
