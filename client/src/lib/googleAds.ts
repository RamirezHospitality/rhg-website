/*
 * Ramirez Hospitality Group — Google Ads conversion tracking
 *
 * Per the account audit (2026-08-28): auto-tagging is on, but the account
 * has no usable conversion action, so tracking is native (this file), not a
 * GA4 import — avoids double-counting against the account's existing
 * GA4-imported actions, which stay Secondary/unused for bidding.
 *
 * Two conversion points on the ad landing page (/lp/revenue-management):
 *   - "began the audit form" — SECONDARY. Fires once, on first interaction
 *     with the lead form (e.g. focusing the Name field), before submission.
 *     Higher volume than the submit event by design — some visitors start
 *     and abandon — which is exactly the frequent, thin-data signal Smart
 *     Bidding needs early. Stands in for the click-to-call conversion the
 *     original plan called for: that CTA no longer exists on this page
 *     (mobile bar now scrolls to the form instead of dialing, site-wide).
 *   - "submitted the audit form" — PRIMARY. Fires on a successful /api/lead
 *     POST. This is the deepest point our own code can observe. The
 *     original plan called for firing on "the booking confirmation step,"
 *     but that step is a cross-origin Google Calendar iframe with no
 *     completion signal (postMessage or otherwise) exposed to the parent
 *     page — there is no way to detect that the visitor actually picked a
 *     time and confirmed. Reaching the calendar is the closest observable
 *     proxy.
 *
 * The base tag loads on page mount (initGoogleAds, called from LeadForm),
 * not at conversion time. Google Ads crawls the landing page to verify the
 * tag is installed — a tag that only appears after a conversion fires reads
 * as "not set up" forever, and a submit racing the script download can drop
 * the conversion entirely. Loading is still gated on the conversion ID being
 * configured, so local dev and any deploy without the env vars set stay a
 * safe no-op — nothing loads, nothing is sent.
 *
 * Required Cloudflare Pages BUILD environment variables (Vite inlines
 * VITE_-prefixed vars at build time — set these in the Pages project's
 * build environment, not as Functions runtime vars):
 *   VITE_GOOGLE_ADS_ID           e.g. "AW-123456789"
 *   VITE_GADS_LABEL_FORM_START   conversion label for the secondary action
 *   VITE_GADS_LABEL_FORM_SUBMIT  conversion label for the primary action
 * All three come from the conversion action's "Tag setup" screen in Google
 * Ads after it's created — see the account-side steps in the handoff notes.
 */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

// .trim() defends against whitespace copy-paste artifacts in the Cloudflare
// Pages env var values (a leading tab in a pasted label has silently broken
// a conversion's send_to value here before — trim rather than trust).
function cleanEnv(v: string | undefined): string | undefined {
  const trimmed = v?.trim();
  return trimmed ? trimmed : undefined;
}

const ADS_ID = cleanEnv(import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined);
const LABEL_START = cleanEnv(import.meta.env.VITE_GADS_LABEL_FORM_START as string | undefined);
const LABEL_SUBMIT = cleanEnv(import.meta.env.VITE_GADS_LABEL_FORM_SUBMIT as string | undefined);

let scriptLoaded = false;

/** Injects gtag.js and configures the base Ads tag. Safe to call repeatedly. */
function ensureGtagLoaded(): boolean {
  if (!ADS_ID || typeof document === "undefined") return false;
  if (scriptLoaded) return true;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // gtag.js only processes queue entries that are `arguments` objects;
      // a rest-parameter array is silently ignored, which drops every
      // config/event command and leaves the tag invisible to Google.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  window.gtag("js", new Date());
  window.gtag("config", ADS_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ADS_ID)}`;
  document.head.appendChild(script);

  scriptLoaded = true;
  return true;
}

/**
 * Loads gtag.js and configures the base Ads tag. Call on mount from every
 * page that can fire a conversion, so the library is present in the DOM on
 * first paint (Google's tag verification) and fully loaded before anyone
 * submits (no conversion lost to the script still downloading). Safe to
 * call repeatedly; no-op when VITE_GOOGLE_ADS_ID is unset.
 */
export function initGoogleAds() {
  ensureGtagLoaded();
}

export interface LeadContact {
  email?: string;
  phone?: string;
}

/**
 * Enhanced Conversions for Leads: hands gtag.js the visitor's own contact
 * details so Google can match more conversions despite cookie/privacy loss.
 * gtag.js hashes these client-side before anything leaves the browser —
 * always pass plain values here, never pre-hash.
 */
function setUserData(contact: LeadContact) {
  if (!window.gtag) return;
  const user_data: Record<string, string> = {};
  if (contact.email) user_data.email = contact.email;
  if (contact.phone) user_data.phone_number = contact.phone;
  if (Object.keys(user_data).length === 0) return;
  window.gtag("set", "user_data", user_data);
}

let startFired = false;

/** Secondary signal. Call once, on the visitor's first interaction with the
 * lead form. Safe to call more than once — only the first call fires. */
export function fireFormStartConversion() {
  if (startFired) return;
  if (!ADS_ID || !LABEL_START) return;
  if (!ensureGtagLoaded() || !window.gtag) return;
  startFired = true;
  window.gtag("event", "conversion", { send_to: `${ADS_ID}/${LABEL_START}` });
}

/** Primary signal. Call once per successful form submission. */
export function fireFormSubmitConversion(contact: LeadContact = {}) {
  if (!ADS_ID || !LABEL_SUBMIT) return;
  if (!ensureGtagLoaded() || !window.gtag) return;
  setUserData(contact);
  window.gtag("event", "conversion", { send_to: `${ADS_ID}/${LABEL_SUBMIT}` });
}
