/*
 * Ramirez Hospitality Group — Ad landing page lead form
 *
 * Step one of booking The Modern Hotel Audit. Five visible fields. Hidden
 * attribution fields (gclid, gbraid, wbraid, utm_*) are read from storage at
 * SUBMIT time, not mount, so a visitor who arrived from an ad, left, and came
 * back still submits with the click ID attached.
 *
 * Posts JSON to /api/lead (Cloudflare Pages Function in functions/api/lead.ts).
 * Honeypot + time-on-page are the bot filter; no CAPTCHA script.
 *
 * On success the form is replaced by step two: the Google Calendar booking
 * embed (BookingCalendar), so the visitor picks a time without leaving the
 * page or losing the gclid this form just captured.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { HIDDEN_FIELD_KEYS, captureAttribution, getAttribution, type Attribution } from "@/lib/attribution";
import { fireFormStartConversion, fireFormSubmitConversion } from "@/lib/googleAds";
import { BookingCalendar } from "./BookingCalendar";

interface LeadFormProps {
  /** Identifies which page produced the lead in the email and KV record. */
  source: string;
  className?: string;
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  /**
   * Google Calendar embed shown on the confirmation step. Defaults to The
   * Modern Hotel Audit's calendar — pass BRAND.openingBookingUrl on a page
   * whose offer is a pre-opening conversation instead (the audit assumes an
   * operating property with occupancy/ADR/channel mix to score, which a
   * pre-opening hotel doesn't have yet).
   */
  bookingUrl?: string;
  /** Heading shown above the calendar embed once the form is submitted. */
  bookingHeading?: string;
  /** Second half of the confirmation sentence: "We will talk through {property} ${bookingIntroSuffix}" */
  bookingIntroSuffix?: string;
}

type FieldErrors = Partial<Record<"name" | "email" | "property" | "keys" | "phone", string>>;

const inputClass =
  "w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors";
const labelClass = "block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2";

export function LeadForm({
  source,
  className = "",
  heading = "Book The Modern Hotel Audit",
  subheading = "Free, scored, sized in dollars. Tell me about the hotel, then pick a time for a 20-minute fit call. Every revenue management client starts here.",
  buttonLabel = "Book The Modern Hotel Audit",
  bookingUrl = BRAND.auditBookingUrl,
  bookingHeading = "The Modern Hotel Audit · 20-minute fit call",
  bookingIntroSuffix = "and whether the audit is worth your time.",
}: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<Attribution>({});
  const [booking, setBooking] = useState<{ firstName: string; property: string }>({
    firstName: "",
    property: "",
  });
  const mountedAt = useRef<number>(Date.now());

  // Capture click IDs on mount so a visitor who navigates away and back is still attributed.
  // The hidden inputs below mirror the stored values; submit re-reads storage so they are never stale.
  useEffect(() => {
    setAttribution(captureAttribution());
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setErrors({});
    setFailure(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const attribution = getAttribution();
    setAttribution(attribution);

    const name = String(fd.get("name") ?? "").trim();
    const property = String(fd.get("property") ?? "").trim();

    const payload: Record<string, string> = {
      source,
      name,
      email: String(fd.get("email") ?? ""),
      property,
      keys: String(fd.get("keys") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company_website: String(fd.get("company_website") ?? ""), // honeypot, should be empty
      seconds_on_page: String(Math.round((Date.now() - mountedAt.current) / 1000)),
    };
    for (const key of HIDDEN_FIELD_KEYS) {
      const v = attribution[key];
      if (v) payload[key] = v;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
        error?: string;
      };

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        return;
      }
      if (!res.ok || !data.ok) {
        setFailure(
          data.error ||
            "Something went wrong on our side. Email adam@ramirezhospitality.com and I will take it from there.",
        );
        return;
      }

      setBooking({ firstName: name.split(/\s+/)[0] || "", property });
      setSubmitted(true);
      // Primary Google Ads conversion — see lib/googleAds.ts. No-op until
      // VITE_GOOGLE_ADS_ID / VITE_GADS_LABEL_FORM_SUBMIT are configured.
      fireFormSubmitConversion({ email: payload.email, phone: payload.phone });
      // Generic GTM / GA4 hook, unrelated to the Ads conversion above.
      const w = window as unknown as { dataLayer?: unknown[] };
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({
          event: "lead_form_submit",
          form_source: source,
          gclid: attribution.gclid ?? null,
        });
      }
    } catch {
      setFailure(
        "Your connection dropped before the request went through. Email adam@ramirezhospitality.com and I will take it from there.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={`border border-brass/40 bg-card p-7 sm:p-8 lg:p-10 flex flex-col gap-5 ${className}`}>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-brass shrink-0" strokeWidth={1.6} />
          <span className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">
            Got it{booking.firstName ? `, ${booking.firstName}` : ""}. Now pick a time for the fit call.
          </span>
        </div>
        <h2 className="font-display text-2xl text-cream leading-tight">
          {bookingHeading}
        </h2>
        <p className="text-cream/75 text-sm leading-[1.6]">
          {booking.property && (
            <>We will talk through <span className="text-cream">{booking.property}</span> {bookingIntroSuffix} </>
          )}
          Times shown in your time zone.
        </p>
        <BookingCalendar url={bookingUrl} title={`${buttonLabel} — pick a time`} />
      </div>
    );
  }

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      className={`relative border border-brass/25 bg-card p-7 sm:p-8 lg:p-10 space-y-5 scroll-mt-6 ${className}`}
    >
      <div>
        <h2 className="font-display text-2xl sm:text-3xl text-cream leading-tight">{heading}</h2>
        <p className="mt-3 text-cream/70 text-sm leading-[1.7]">{subheading}</p>
      </div>

      <div>
        <label htmlFor="lf-name" className={labelClass}>Name</label>
        <input
          id="lf-name"
          name="name"
          required
          autoComplete="name"
          className={inputClass}
          aria-invalid={!!errors.name}
          onFocus={fireFormStartConversion}
        />
        {errors.name && <p className="mt-1 text-xs text-brass-soft">{errors.name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lf-email" className={labelClass}>Email</label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={inputClass}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-xs text-brass-soft">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="lf-phone" className={labelClass}>Phone</label>
          <input
            id="lf-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="mt-1 text-xs text-brass-soft">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-[1fr_9rem] gap-5">
        <div>
          <label htmlFor="lf-property" className={labelClass}>Property name</label>
          <input
            id="lf-property"
            name="property"
            required
            autoComplete="organization"
            className={inputClass}
            aria-invalid={!!errors.property}
          />
          {errors.property && <p className="mt-1 text-xs text-brass-soft">{errors.property}</p>}
        </div>
        <div>
          <label htmlFor="lf-keys" className={labelClass}>Number of keys</label>
          <input
            id="lf-keys"
            name="keys"
            type="number"
            required
            min={1}
            max={5000}
            inputMode="numeric"
            className={inputClass}
            aria-invalid={!!errors.keys}
          />
          {errors.keys && <p className="mt-1 text-xs text-brass-soft">{errors.keys}</p>}
        </div>
      </div>

      {/* Hidden attribution fields, populated from the URL and persisted in storage. */}
      {HIDDEN_FIELD_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} value={attribution[key] ?? ""} readOnly />
      ))}

      {/* Honeypot. Hidden from people, filled by bots. */}
      <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="lf-company-website">Company website</label>
        <input id="lf-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={submitting} className="btn-brass w-full justify-center text-sm">
        {submitting ? "Sending…" : buttonLabel} <ArrowRight className="w-4 h-4" />
      </button>

      {failure && (
        <div className="border border-brass/40 bg-obsidian p-4 text-sm text-cream/85 leading-[1.6]">
          {failure}
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            <a href={BRAND.emailHref} className="text-brass underline underline-offset-4">{BRAND.email}</a>
          </div>
        </div>
      )}

      <p className="text-[0.65rem] tracking-wider text-cream/45 text-center leading-relaxed">
        Next step: choose a time. Free. No strings.
      </p>
    </form>
  );
}
