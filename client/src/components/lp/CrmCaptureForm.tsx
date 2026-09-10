/*
 * Ramirez Hospitality Group — CRM capture form slot
 *
 * Replaces the old site-hosted LeadForm (removed 2026-09-10). LeadConnector's
 * A2P 10DLC registration requires that no site-hosted form collecting phone
 * numbers exists on any page where the LeadConnector chat widget is embedded,
 * and the widget is embedded site-wide. The capture form therefore has to be
 * the CRM's own embed, not ours.
 *
 * Wiring the CRM form: paste the iframe src from LeadConnector
 * (Sites → Forms → Integrate) into CRM_FORM_URL below. If the embed snippet
 * also ships a script tag (form_embed.js), add it to client/index.html next
 * to the chat widget loader so it is present in the raw HTML.
 *
 * Until CRM_FORM_URL is set, the slot renders the Google Calendar booking
 * embed directly, so every "Book The Modern Hotel Audit" CTA still books a
 * calendar slot and nothing on the page collects a phone number.
 *
 * Keeps id="lead-form" so the existing #lead-form anchor CTAs on every page
 * continue to scroll here.
 */

import { BRAND } from "@/lib/brand";
import { BookingCalendar } from "./BookingCalendar";

/** LeadConnector form iframe src. Leave null until Adam supplies the embed. */
const CRM_FORM_URL: string | null = null;

interface CrmCaptureFormProps {
  className?: string;
  heading?: string;
  subheading?: string;
  /** Calendar shown while CRM_FORM_URL is unset. Openings pages pass BRAND.openingBookingUrl. */
  bookingUrl?: string;
  /** Accessible title for whichever iframe renders. */
  title?: string;
}

export function CrmCaptureForm({
  className = "",
  heading = "Book The Modern Hotel Audit",
  subheading = "Free, scored, sized in dollars. Pick a time for a 20-minute fit call. Every revenue management client starts here.",
  bookingUrl = BRAND.auditBookingUrl,
  title = "Book The Modern Hotel Audit — pick a time",
}: CrmCaptureFormProps) {
  return (
    <div
      id="lead-form"
      className={`border border-brass/25 bg-card p-7 sm:p-8 lg:p-10 space-y-5 scroll-mt-6 ${className}`}
    >
      <div>
        <h2 className="font-display text-2xl sm:text-3xl text-cream leading-tight">{heading}</h2>
        <p className="mt-3 text-cream/70 text-sm leading-[1.7]">{subheading}</p>
      </div>

      {CRM_FORM_URL ? (
        <iframe
          src={CRM_FORM_URL}
          title={title}
          className="w-full border-0 block"
          style={{ minHeight: 560 }}
          loading="lazy"
        />
      ) : (
        <BookingCalendar url={bookingUrl} title={title} />
      )}

      <p className="text-[0.65rem] tracking-wider text-cream/45 text-center leading-relaxed">
        Free. No strings. Times shown in your time zone.
      </p>
    </div>
  );
}
