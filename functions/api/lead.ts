/*
 * Ramirez Hospitality Group — Lead intake endpoint
 * Cloudflare Pages Function, served at POST /api/lead on the same domain.
 *
 * Order of operations, chosen so a lead is never lost:
 *   1. Validate and normalize the submission.
 *   2. Write the full record to KV (durable copy, keyed by time + id).
 *   3. Email the lead to Adam through Resend, reply-to set to the visitor.
 *   4. Respond 200 if either the KV write or the email succeeded.
 *
 * Nothing here is secret. RESEND_API_KEY and the LEADS binding live in the
 * Cloudflare Pages project settings, not in this repo.
 *
 * Used by: /lp/revenue-management. Reusable by /audit and /contact later.
 */

// ── Minimal ambient types (kept inline so functions/ needs no extra dependency) ──
interface KVNamespaceLike {
  put(key: string, value: string, options?: { expirationTtl?: number; metadata?: unknown }): Promise<void>;
}
interface RhgEnv {
  /** KV namespace bound in Cloudflare Pages settings. Durable copy of every lead. */
  LEADS?: KVNamespaceLike;
  /** Resend API key, stored as a Pages secret. Never in the repo. */
  RESEND_API_KEY?: string;
  /** Sender on a Resend-verified domain. Defaults to leads@ramirezhospitality.com. */
  LEAD_FROM?: string;
  /** Recipient. Defaults to adam@ramirezhospitality.com. */
  LEAD_TO?: string;
}
interface PagesContext {
  request: Request;
  env: RhgEnv;
  next: (request?: Request) => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
}

const DEFAULT_TO = "adam@ramirezhospitality.com";
const DEFAULT_FROM = "RHG Website <leads@ramirezhospitality.com>";
const MAX_BODY_BYTES = 16 * 1024;
const MIN_SECONDS_ON_PAGE = 3; // bots submit instantly; people do not

const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "landing_path",
  "referrer",
  "captured_at",
] as const;

type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

interface LeadRecord {
  id: string;
  receivedAt: string;
  source: string;
  name: string;
  email: string;
  property: string;
  keys: number;
  phone: string;
  attribution: Partial<Record<AttributionKey, string>>;
  meta: {
    ip?: string;
    country?: string;
    userAgent?: string;
  };
}

const json = (body: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
      ...extraHeaders,
    },
  });

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  const s = v.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  return s.length > max ? s.slice(0, max) : s;
}

function isEmail(v: string): boolean {
  return v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function escapeHtml(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(lead: LeadRecord): { subject: string; text: string; html: string } {
  const a = lead.attribution;
  const paid = a.gclid || a.gbraid || a.wbraid ? "Paid (Google Ads)" : "Not a tracked ad click";

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone || "(not provided)"],
    ["Property", lead.property],
    ["Keys", String(lead.keys)],
    ["Source", lead.source],
    ["Channel", paid],
    ["gclid", a.gclid || ""],
    ["gbraid", a.gbraid || ""],
    ["wbraid", a.wbraid || ""],
    ["utm_source", a.utm_source || ""],
    ["utm_medium", a.utm_medium || ""],
    ["utm_campaign", a.utm_campaign || ""],
    ["utm_term", a.utm_term || ""],
    ["utm_content", a.utm_content || ""],
    ["Landing path", a.landing_path || ""],
    ["Referrer", a.referrer || ""],
    ["Click captured", a.captured_at || ""],
    ["Received", lead.receivedAt],
    ["Country", lead.meta.country || ""],
    ["Lead id", lead.id],
  ];

  const subject = `New lead: ${lead.property} (${lead.keys} keys), ${lead.name}`;
  const text = rows
    .filter(([, v]) => v !== "")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const html = `<!doctype html><html><body style="font-family:Georgia,serif;background:#0a0a0a;color:#f5f1e8;padding:24px">
<h2 style="margin:0 0 4px;font-weight:500">New lead from ramirezhospitality.com</h2>
<p style="margin:0 0 16px;color:#d4b062;font-size:13px;letter-spacing:.12em;text-transform:uppercase">${escapeHtml(lead.source)}</p>
<table style="border-collapse:collapse;font-family:Inter,Arial,sans-serif;font-size:14px">
${rows
  .filter(([, v]) => v !== "")
  .map(
    ([k, v]) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#d4b062;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;color:#f5f1e8">${escapeHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin-top:20px;font-size:12px;color:#9a9483">Reply to this email to answer ${escapeHtml(lead.name)} directly. Keep the gclid for offline conversion import.</p>
</body></html>`;

  return { subject, text, html };
}

async function sendEmail(env: RhgEnv, lead: LeadRecord): Promise<void> {
  if (!env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");
  const { subject, text, html } = buildEmail(lead);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.LEAD_FROM || DEFAULT_FROM,
      to: [env.LEAD_TO || DEFAULT_TO],
      reply_to: lead.email,
      subject,
      text,
      html,
      headers: { "X-Entity-Ref-ID": lead.id },
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}

async function storeLead(env: RhgEnv, lead: LeadRecord): Promise<void> {
  if (!env.LEADS) throw new Error("LEADS KV namespace not bound");
  const key = `lead:${lead.receivedAt}:${lead.id}`;
  await env.LEADS.put(key, JSON.stringify(lead), {
    metadata: {
      name: lead.name,
      property: lead.property,
      keys: lead.keys,
      source: lead.source,
      gclid: lead.attribution.gclid || null,
    },
  });
}

export const onRequestPost = async (context: PagesContext): Promise<Response> => {
  const { request, env } = context;

  const len = Number(request.headers.get("content-length") || "0");
  if (len > MAX_BODY_BYTES) return json({ ok: false, error: "Payload too large." }, 413);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "Expected JSON." }, 400);
  }

  // Bot checks. Honeypot must be empty; humans take longer than a few seconds.
  const honeypot = str(body.company_website, 200);
  const secondsOnPage = Number(body.seconds_on_page);
  if (honeypot || !Number.isFinite(secondsOnPage) || secondsOnPage < MIN_SECONDS_ON_PAGE) {
    // Pretend success so bots learn nothing. Nothing is stored or sent.
    return json({ ok: true, id: "ignored" });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 254).toLowerCase();
  const property = str(body.property, 160);
  const phone = str(body.phone, 40);
  const keysRaw = str(body.keys, 10).replace(/[^\d]/g, "");
  const keys = keysRaw ? Number(keysRaw) : NaN;
  const source = str(body.source, 80) || "lp/revenue-management";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email.";
  if (!property) errors.property = "Please enter the property name.";
  if (!Number.isInteger(keys) || keys < 1 || keys > 5000) errors.keys = "Enter the number of rooms.";
  if (phone && phone.replace(/[^\d]/g, "").length < 7) errors.phone = "Please check the phone number.";
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);

  const attribution: Partial<Record<AttributionKey, string>> = {};
  for (const k of ATTRIBUTION_KEYS) {
    const v = str(body[k], 512);
    if (v) attribution[k] = v;
  }

  const lead: LeadRecord = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    source,
    name,
    email,
    property,
    keys,
    phone,
    attribution,
    meta: {
      ip: request.headers.get("cf-connecting-ip") || undefined,
      country: request.headers.get("cf-ipcountry") || undefined,
      userAgent: str(request.headers.get("user-agent"), 300) || undefined,
    },
  };

  const [stored, emailed] = await Promise.allSettled([storeLead(env, lead), sendEmail(env, lead)]);
  const storedOk = stored.status === "fulfilled";
  const emailedOk = emailed.status === "fulfilled";

  if (!storedOk) console.error("lead: KV write failed", (stored as PromiseRejectedResult).reason);
  if (!emailedOk) console.error("lead: email failed", (emailed as PromiseRejectedResult).reason);

  if (!storedOk && !emailedOk) {
    return json(
      { ok: false, error: "We could not record your request. Please call 760-969-9249 or email adam@ramirezhospitality.com." },
      500,
    );
  }

  return json({ ok: true, id: lead.id, stored: storedOk, emailed: emailedOk });
};

export const onRequest = async (context: PagesContext): Promise<Response> => {
  if (context.request.method === "POST") return onRequestPost(context);
  return json({ ok: false, error: "Method not allowed." }, 405, { allow: "POST" });
};
