/*
 * Ramirez Hospitality Group — Ad landing page lead form
 *
 * Five visible fields. Hidden attribution fields (gclid, gbraid, wbraid, utm_*)
 * are read from storage at SUBMIT time, not mount, so a visitor who arrived
 * from an ad, left, and came back still submits with the click ID attached.
 *
 * Posts JSON to /api/lead (Cloudflare Pages Function in functions/api/lead.ts).
 * Honeypot + time-on-page are the bot filter; no CAPTCHA script.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { HIDDEN_FIELD_KEYS, captureAttribution, getAttribution, type Attribution } from "@/lib/attribution";

interface LeadFormProps {
  /** Identifies which page produced the lead in the email and KV record. */
  source: string;
  className?: string;
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
}

type FieldErrors = Partial<Record<"name" | "email" | "property" | "keys" | "phone", string>>;

const inputClass =
  "w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors";
const labelClass = "block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2";

export function LeadForm({
  source,
  className = "",
  heading = "Start with a free property review",
  subheading = "Tell me about the hotel. I look at your rates and channels myself and reply within one business day.",
  buttonLabel = "Request the Free Review",
}: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [attribution, setAttribution] = useState<Attribution>({});
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

    const payload: Record<string, string> = {
      source,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      property: String(fd.get("property") ?? ""),
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
            "Something went wrong on our side. Call or email and I will take it from there.",
        );
        return;
      }

      setSubmitted(true);
      // Conversion hook for GTM / GA4 once those are wired. No script is loaded here.
      const w = window as unknown as { dataLayer?: unknown[] };
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({
          event: "lead_form_submit",
          form_source: source,
          gclid: attribution.gclid ?? null,
        });
      }
    } catch {
      setFailure("Your connection dropped before the request went through. Call or email and I will take it from there.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={`border border-brass/40 bg-card p-10 lg:p-12 text-center ${className}`}>
        <CheckCircle2 className="w-12 h-12 text-brass mx-auto mb-6" strokeWidth={1.4} />
        <h3 className="font-display text-3xl text-cream mb-4">Got it. Thank you.</h3>
        <p className="text-cream/75 leading-[1.7] max-w-md mx-auto">
          I will look at the property and reply within one business day from
          {" "}
          <span className="text-cream">{BRAND.email}</span>. If it is urgent, call me.
        </p>
        <a href={BRAND.phoneHref} className="btn-ghost mt-8 inline-flex">
          <Phone className="w-4 h-4" /> {BRAND.phone}
        </a>
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
            <a href={BRAND.phoneHref} className="text-brass underline underline-offset-4">{BRAND.phone}</a>
            <a href={BRAND.emailHref} className="text-brass underline underline-offset-4">{BRAND.email}</a>
          </div>
        </div>
      )}

      <p className="text-[0.65rem] tracking-wider text-cream/45 text-center leading-relaxed">
        Free. No obligation. Your details go to Adam and nowhere else.
      </p>
    </form>
  );
}
