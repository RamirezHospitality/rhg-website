/*
 * Ramirez Hospitality Group — CRM capture form (LeadConnector "Opt In Form")
 *
 * Replaces the old site-hosted LeadForm (removed 2026-09-10). For A2P 10DLC
 * registration the capture form has to be the CRM's own embed so the SMS
 * consent checkboxes and their timestamps live in LeadConnector, not in a
 * form we host. The two unchecked consent boxes (transactional, marketing),
 * the Privacy / Terms links, and the button label are all configured in
 * LeadConnector's form builder, not here.
 *
 * The iframe attributes mirror LeadConnector's embed snippet exactly; its
 * helper script (https://link.msgsndr.com/js/form_embed.js) is loaded once
 * in client/index.html and resizes the iframe from postMessage events, so a
 * form mounted after client-side navigation still sizes correctly. The
 * explicit height matches the snippet's data-height so the card never
 * collapses before the script runs.
 *
 * Keeps id="lead-form" so the existing #lead-form anchor CTAs on every page
 * continue to scroll here. The Google Calendar embed remains as a fallback
 * only if CRM_FORM_ID is ever cleared.
 */

import { BRAND } from "@/lib/brand";
import { BookingCalendar } from "./BookingCalendar";

/** LeadConnector form id from the embed snippet (Sites → Forms → Integrate). */
const CRM_FORM_ID: string | null = "Skmmsxecczs1LoY79WxK";
const CRM_FORM_NAME = "Opt In Form";
const CRM_FORM_HEIGHT = 1148;

interface CrmCaptureFormProps {
  className?: string;
  heading?: string;
  subheading?: string;
  /** Calendar shown only when CRM_FORM_ID is unset. Openings pages pass BRAND.openingBookingUrl. */
  bookingUrl?: string;
  /** Accessible title for the calendar fallback iframe. */
  title?: string;
}

export function CrmCaptureForm({
  className = "",
  heading = "Book The Modern Hotel Audit",
  subheading = "Free, scored, sized in dollars. Tell me about the hotel and I will reach out to set up a 20-minute fit call. Every revenue management client starts here.",
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

      {CRM_FORM_ID ? (
        <iframe
          src={`https://api.leadconnectorhq.com/widget/form/${CRM_FORM_ID}`}
          style={{ width: "100%", height: CRM_FORM_HEIGHT, border: "none", borderRadius: 4 }}
          id={`inline-${CRM_FORM_ID}`}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name={CRM_FORM_NAME}
          data-height={String(CRM_FORM_HEIGHT)}
          data-layout-iframe-id={`inline-${CRM_FORM_ID}`}
          data-form-id={CRM_FORM_ID}
          data-cookie-consent="true"
          data-cookie-consent-provider="auto"
          title={CRM_FORM_NAME}
        />
      ) : (
        <BookingCalendar url={bookingUrl} title={title} />
      )}

      <p className="text-[0.65rem] tracking-wider text-cream/45 text-center leading-relaxed">
        {CRM_FORM_ID ? "Free. No strings. Text consent is optional." : "Free. No strings. Times shown in your time zone."}
      </p>
    </div>
  );
}
