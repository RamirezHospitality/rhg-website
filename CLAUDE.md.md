# RHG Website — Project Memory

This file is auto-loaded by Claude Code at the start of every session in this repo. It exists so you don't have to re-explain the stack, workflow, or pitfalls each time.

## What this project is

ramirezhospitality.com is the client-acquisition site for Ramirez Hospitality Group, a hospitality consultancy for independent hotels, motels, inns, and B&Bs (8–75 keys). The site's one job: get owners to book the free Modern Hotel Audit. Paid tiers (Essentials/Growth/Enterprise) are presented after the audit, never pitched cold.

Owner: Adam Ramirez — adam@ramirezhospitality.com — Palm Springs, CA.

## Workflow rules — read before touching anything

1. **Never commit directly to `main`.** Always branch first (`git checkout -b descriptive-branch-name`), commit there, push, and open a PR. Adam merges to `main` himself after checking the Cloudflare preview.
2. **Always push and give the compare/PR URL** after committing, so Adam can review before it goes further.
3. **Preview before executing.** For anything nontrivial, describe the planned change before writing code, especially for edits to existing files (not new ones).
4. **For anything visual — new pages, layout changes, new components — show a mockup before writing real implementation code.** A static HTML/CSS preview, a rough wireframe description, or an image mockup is fine; the goal is Adam approving the direction before tokens go into a full React/TypeScript build that might get thrown away. Don't skip straight to production code on visual work, even if the request seems clear-cut.
5. **Flag platform-side steps explicitly.** If something needs a change inside Cloudflare Pages settings, GitHub settings, DNS, or any other dashboard — say so clearly rather than assuming it's handled.
6. **File naming**: clear, concise, human-searchable. Adam organizes work by filename later — avoid vague names like `updates.tsx` or `new.ts`.

## Stack

- React + TypeScript, built with Vite (7.x), Tailwind v4 (`@tailwindcss/vite`), `wouter` for routing, shadcn/ui components. Fonts: Playfair Display + Inter.
- Client-rendered SPA. `vite.config.ts`: root is `client/`, build output `dist/public`, aliases `@` → `client/src`, `@shared` → `shared/`.
- **npm only — never pnpm.** Do not add `pnpm-lock.yaml` or a `packageManager` pin; this broke production builds once already.
- Brand constants: `client/src/lib/brand.ts`. Page-level SEO tags: `client/src/components/SEO.tsx` and `client/index.html`.
- `server/` and `shared/` folders exist from an original export but are unused in production — the deployed site is static files only.

## Hosting & deployment

- Repo: `github.com/RamirezHospitality/rhg-website`, `main` is production.
- Cloudflare Pages auto-builds on every push to `main` (2–4 min). Build settings: framework preset **None**, build command `npm run build`, output dir `dist/public`, no env vars for the base site build.
- Branch pushes get their own Cloudflare preview URL (`https://<branch-name>.rhg-website.pages.dev`) — always check this before a PR merges to main.
- SPA deep-link fallback lives in `client/public/_redirects` (`/* /index.html 200`).
- DNS, domain, and Pages project all live in the same Cloudflare account.

## Known pitfalls (things that already broke once)

- **Never reintroduce `d2xsxph8kpxj0f.cloudfront.net`** — this was the old image CDN (now dead, returns 403). All images live in `client/public/images/` as webp.
- The site's SEO baseline (canonical URLs, correct domain in `sitemap.xml`, no stray `www.ramirezhos.com` references) was hard-fixed once already — don't reintroduce an old domain string when editing meta/sitemap files.
- Any route meant to stay out of search results (e.g. `/dashboard`) needs **both** `noindex` in its own page/response headers **and** a `Disallow` line in `client/public/robots.txt` and the root `robots.txt` (there are two copies, keep them in sync).
- `_routes.json` (both `client/public/_routes.json` and the root copy) controls which paths Cloudflare Pages Functions run on — keep these in sync if adding new function routes, or marketing pages will start invoking functions unnecessarily.

## Where the rest of the context lives

Business strategy, brand voice, marketing copy, and historical project handoffs (SEO fix, Ads LP + Dashboard build) live in Adam's Claude.ai project, not in this repo. If a task needs business/brand judgment calls rather than code judgment calls, that's the place those decisions get made — ask Adam rather than guessing.
