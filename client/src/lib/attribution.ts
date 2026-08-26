/*
 * Ramirez Hospitality Group — Ad click attribution
 *
 * Captures Google Ads click identifiers and UTM parameters from the URL and
 * persists them so they survive navigation, tab closes, and return visits.
 *
 * Why localStorage with a TTL instead of sessionStorage: a visitor who clicks
 * an ad on Tuesday and returns on Thursday from a bookmark is still a paid lead.
 * Google's gclid attribution window is 90 days, so that is the expiry.
 *
 * Touch model: LAST touch for click IDs. A new gclid/gbraid/wbraid on the URL
 * overwrites the stored one. UTM values are refreshed whenever any UTM value is
 * present on the URL. Nothing is ever cleared by a plain organic visit.
 *
 * No third-party scripts. No cookies. Nothing leaves the browser until the
 * visitor submits the form.
 */

export const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const;
export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type ClickIdKey = (typeof CLICK_ID_KEYS)[number];
export type UtmKey = (typeof UTM_KEYS)[number];
export type AttributionKey = ClickIdKey | UtmKey;

export type Attribution = Partial<Record<AttributionKey, string>> & {
  /** Path (with query) the visitor first landed on in this attribution window. */
  landing_path?: string;
  /** document.referrer at first capture, if any. */
  referrer?: string;
  /** ISO timestamp of the most recent click-ID capture. */
  captured_at?: string;
};

const STORAGE_KEY = "rhg_attribution_v1";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days, matches the gclid window
const MAX_VALUE_LENGTH = 512;

interface StoredAttribution {
  data: Attribution;
  expiresAt: number;
}

function safeStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    const s = window.localStorage;
    // Some privacy modes expose localStorage but throw on write.
    const probe = "__rhg_probe__";
    s.setItem(probe, "1");
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

function clean(value: string | null): string | undefined {
  if (!value) return undefined;
  const v = value.trim();
  if (!v) return undefined;
  return v.length > MAX_VALUE_LENGTH ? v.slice(0, MAX_VALUE_LENGTH) : v;
}

function readStored(storage: Storage | null): Attribution {
  if (!storage) return {};
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredAttribution;
    if (!parsed || typeof parsed !== "object" || !parsed.data) return {};
    if (typeof parsed.expiresAt !== "number" || parsed.expiresAt < Date.now()) {
      storage.removeItem(STORAGE_KEY);
      return {};
    }
    return parsed.data;
  } catch {
    return {};
  }
}

function writeStored(storage: Storage | null, data: Attribution): void {
  if (!storage) return;
  try {
    const payload: StoredAttribution = { data, expiresAt: Date.now() + TTL_MS };
    storage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Quota or privacy mode. The in-memory copy still serves this page view.
  }
}

/** In-memory fallback so the form still gets values when storage is unavailable. */
let memoryCopy: Attribution = {};

/**
 * Read the current URL, merge any click IDs / UTMs into the stored record,
 * and return the merged attribution. Safe to call on every page load.
 */
export function captureAttribution(
  search: string = typeof window !== "undefined" ? window.location.search : "",
): Attribution {
  const storage = safeStorage();
  const existing = { ...readStored(storage), ...memoryCopy };
  const params = new URLSearchParams(search);

  const incomingClickIds: Partial<Record<ClickIdKey, string>> = {};
  for (const key of CLICK_ID_KEYS) {
    const v = clean(params.get(key));
    if (v) incomingClickIds[key] = v;
  }

  const incomingUtms: Partial<Record<UtmKey, string>> = {};
  for (const key of UTM_KEYS) {
    const v = clean(params.get(key));
    if (v) incomingUtms[key] = v;
  }

  const hasClickId = Object.keys(incomingClickIds).length > 0;
  const hasUtm = Object.keys(incomingUtms).length > 0;

  let next: Attribution = { ...existing };

  if (hasClickId) {
    // Last touch: a fresh paid click replaces prior click IDs entirely so a
    // stale gclid never rides along with a newer gbraid.
    for (const key of CLICK_ID_KEYS) delete next[key];
    // A new click is a new attribution; UTMs from an older visit must not ride along.
    if (!hasUtm) for (const key of UTM_KEYS) delete next[key];
    next = { ...next, ...incomingClickIds, captured_at: new Date().toISOString() };
  }

  if (hasUtm) {
    next = { ...next, ...incomingUtms };
  }

  if ((hasClickId || hasUtm) && typeof window !== "undefined") {
    next.landing_path = clean(window.location.pathname + window.location.search);
    const ref = clean(document.referrer);
    if (ref) next.referrer = ref;
  }

  memoryCopy = next;
  if (hasClickId || hasUtm) writeStored(storage, next);
  return next;
}

/** Return the stored attribution without touching the URL. */
export function getAttribution(): Attribution {
  const storage = safeStorage();
  return { ...readStored(storage), ...memoryCopy };
}

/** Flat list of the hidden field names the form should render, in order. */
export const HIDDEN_FIELD_KEYS: readonly (keyof Attribution)[] = [
  ...CLICK_ID_KEYS,
  ...UTM_KEYS,
  "landing_path",
  "referrer",
  "captured_at",
];
