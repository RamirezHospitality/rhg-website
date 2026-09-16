/*
 * Ramirez Hospitality Group — CRM capture form card
 *
 * The capture form on every offer page. For A2P 10DLC registration the form
 * has to be the CRM's own embed so the SMS consent checkboxes and their
 * timestamps live in LeadConnector, not in a form we host. The embed itself
 * lives in components/LeadConnectorOptInForm and is shared with the Contact
 * page; this card adds the heading and the Reserve-styled frame.
 *
 * Form first, then the calendar: every CTA on the site lands here
 * (`/audit#lead-form`, `/feasibility-study#lead-form`, `/openings#lead-form`).
 * The booking calendar is the step LeadConnector offers after submission,
 * configured in the LeadConnector form's thank-you settings, not here.
 *
 * Keeps id="lead-form" so the existing #lead-form anchors keep working.
 */

import { useEffect } from "react";
import { LeadConnectorOptInForm } from "@/components/LeadConnectorOptInForm";
import { OFFERS } from "@/lib/brand";

interface CrmCaptureFormProps {
  className?: string;
  heading?: string;
  subheading?: string;
  /** Small line under the form. */
  footnote?: string;
}

export function CrmCaptureForm({
  className = "",
  heading = OFFERS.audit.cta,
  subheading = "Free. Your hotel scored out of 100 across seven areas, every finding priced in dollars. Tell me about the hotel and I will reach out to set up a 20-minute fit call.",
  footnote = "Free. No strings. Text consent is optional.",
}: CrmCaptureFormProps) {
  // When a page loads with #lead-form in the URL (every cross-page CTA), bring
  // the form into view once the layout has settled under the fixed header.
  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#lead-form") return;
    const timer = setTimeout(() => {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="lead-form"
      className={`border border-brass/25 bg-card p-7 sm:p-8 lg:p-10 space-y-5 scroll-mt-24 ${className}`}
    >
      <div>
        <h2 className="font-display text-2xl sm:text-3xl text-cream leading-tight">{heading}</h2>
        <p className="mt-3 text-cream/70 text-sm leading-[1.7]">{subheading}</p>
      </div>

      <LeadConnectorOptInForm />

      <p className="text-[0.65rem] tracking-wider text-cream/45 text-center leading-relaxed">
        {footnote}
      </p>
    </div>
  );
}
