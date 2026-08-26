/*
 * Ramirez Hospitality Group — Edge middleware
 *
 * Gates /dashboard and /dashboard/* behind HTTP Basic Auth. Credentials come
 * from the Pages project environment (DASHBOARD_USER, DASHBOARD_PASS). If they
 * are not set, the gate FAILS CLOSED with a 503 rather than exposing the page.
 *
 * client/public/_routes.json limits Functions to /api/* and /dashboard*, so
 * this middleware never runs on marketing pages or static assets.
 */

// ── Minimal ambient types (kept inline so functions/ needs no extra dependency) ──
interface RhgEnv {
  /** Basic Auth credentials for /dashboard. Both required or the gate fails closed. */
  DASHBOARD_USER?: string;
  DASHBOARD_PASS?: string;
}
interface PagesContext {
  request: Request;
  env: RhgEnv;
  next: (request?: Request) => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
}

const REALM = "RHG Dashboard";

function isDashboardPath(pathname: string): boolean {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
}

/** Constant-time string comparison so a wrong password does not leak timing. */
function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  const len = Math.max(ab.byteLength, bb.byteLength, 1);
  let diff = ab.byteLength ^ bb.byteLength;
  for (let i = 0; i < len; i++) {
    diff |= (ab[i % ab.byteLength] ?? 0) ^ (bb[i % bb.byteLength] ?? 0);
  }
  return diff === 0;
}

function unauthorized(): Response {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "www-authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

function decodeBasic(header: string | null): { user: string; pass: string } | null {
  if (!header || !header.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6).trim());
    const idx = decoded.indexOf(":");
    if (idx < 0) return null;
    return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
  } catch {
    return null;
  }
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const url = new URL(context.request.url);

  if (!isDashboardPath(url.pathname)) {
    return context.next();
  }

  const { DASHBOARD_USER, DASHBOARD_PASS } = context.env;
  if (!DASHBOARD_USER || !DASHBOARD_PASS) {
    return new Response("Dashboard is not configured. Set DASHBOARD_USER and DASHBOARD_PASS in Cloudflare Pages.", {
      status: 503,
      headers: { "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" },
    });
  }

  const creds = decodeBasic(context.request.headers.get("authorization"));
  if (!creds) return unauthorized();

  const userOk = timingSafeEqual(creds.user, DASHBOARD_USER);
  const passOk = timingSafeEqual(creds.pass, DASHBOARD_PASS);
  if (!(userOk && passOk)) return unauthorized();

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("x-robots-tag", "noindex, nofollow");
  headers.set("cache-control", "private, no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};
