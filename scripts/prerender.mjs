/*
 * Ramirez Hospitality Group — postbuild prerender
 *
 * Snapshots fully rendered HTML for every route into dist/public/<route>/index.html
 * so crawlers and reviewers that don't execute JavaScript see real content
 * (Google Ads API review, AI search engines, social scrapers).
 *
 * Usage:
 *   pnpm build:prerender        (vite build + this script)
 *   node scripts/prerender.mjs  (after an existing vite build)
 *
 * One-time setup on a new machine/CI:
 *   npx playwright install chromium
 *   (or set CHROMIUM_PATH to an existing Chromium/Chrome binary)
 *
 * This script is OPTIONAL — plain `vite build` still works unchanged.
 * Static files are served before the SPA fallback (Cloudflare/_redirects),
 * so each prerendered route is what a non-JS client receives.
 */

import express from "express";
import { chromium } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "dist", "public");

// All live routes. /privacy and /terms are intentionally excluded until
// those pages exist — today they render the 404 component.
const ROUTES = [
  "/",
  "/revenue-management",
  "/services",
  "/openings",
  "/case-studies",
  "/about",
  "/insights",
  "/contact",
  "/audit",
  "/tech-stack",
];

async function main() {
  // Sanity check: a build must exist.
  const shell = await readFile(path.join(DIST, "index.html"), "utf8");

  // Serve the build with SPA fallback on an ephemeral port.
  const app = express();
  app.use(express.static(DIST, { index: false }));
  app.get("*", (_req, res) => res.send(shell));
  const server = app.listen(0);
  const port = server.address().port;

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const page = await browser.newPage();

  for (const route of ROUTES) {
    await page.goto(`http://localhost:${port}${route}`, {
      waitUntil: "load",
      timeout: 30_000,
    });
    // Wait until React has painted into #root.
    await page.waitForFunction(
      () => {
        const root = document.getElementById("root");
        return root && root.children.length > 0 && root.innerText.trim().length > 200;
      },
      { timeout: 20_000 }
    );
    // Let SEO.tsx useEffect finish head mutations (canonical, JSON-LD).
    await page.waitForTimeout(500);

    const html = await page.content();
    const outDir = route === "/" ? DIST : path.join(DIST, ...route.split("/").filter(Boolean));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html);
    const bytes = Buffer.byteLength(html);
    console.log(`✓ ${route.padEnd(24)} → ${path.relative(DIST, path.join(outDir, "index.html"))} (${(bytes / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
  server.close();
  console.log(`\nPrerendered ${ROUTES.length} routes into ${DIST}`);
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
