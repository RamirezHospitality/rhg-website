/*
 * Ramirez Hospitality Group — CRM capture form card
 *
 * Replaces the old site-hosted LeadForm (removed 2026-09-10). For A2P 10DLC
 * registration the capture form has to be the CRM's own embed so the SMS
 * consent checkboxes and their timestamps live in LeadConnector, not in a
 * form we host. The embed itself lives in components/LeadConnectorOptInForm
 * and is shared with the Contact page; this card adds the heading and the
 * Reserve-styled frame used on the audit, feasibility, and /lp pages.
 *
 * Keeps id="lead-form" so the existing #lead-form anchor CTAs on every page
 * continue to scroll here.
 */

import { LeadConnectorOptInForm } from "@/components/LeadConnectorOptInForm";

interface CrmCaptureFormProps {
  className?: string;
  heading?: string;
  subheading?: string;
}

export function CrmCaptureForm({
  className = "",
  heading = "Book The Modern Hotel Audit",
  subheading = "Free, scored, sized in dollars. Tell me about the hotel and I will reach out to set up a 20-minute fit call. Every revenue management client starts here.",
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

      <LeadConnectorOptInForm />

      <p className="text-[0.65rem] tracking-wider text-cream/45 text-center leading-relaxed">
        Free. No strings. Text consent is optional.
      </p>
    </div>
  );
}
