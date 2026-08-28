/*
 * Ramirez Hospitality Group — The Reserve · THE MODERN HOTEL AUDIT
 * Every client starts here. Reuses the same LeadForm -> BookingCalendar
 * flow as the ad landing page (components/lp) and the same shared
 * AuditSection / OperatorSection used on the homepage, so the audit is
 * described identically wherever it appears on the site.
 */

import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/lp/LeadForm";
import { AuditSection } from "@/components/audit/AuditSection";
import { OperatorSection } from "@/components/OperatorSection";
import { BRAND, IMAGES } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const AUDIT_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "The Modern Hotel Audit",
  description:
    "A free property review for independent and boutique hotel owners. The whole property is scored across seven dimensions — reputation and rate-worthiness, direct booking engine, distribution and channel health, technology and automation, demand capture, pricing and rate strategy, and whole-property yield — each finding tied to a timestamped exhibit and an annual dollar figure. Every revenue management client starts here, whether buying, opening, or operating.",
  provider: { "@id": "https://ramirezhospitality.com/#organization" },
  serviceType: "Hotel Revenue Audit",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://ramirezhospitality.com/audit",
  offers: {
    "@type": "Offer",
    name: "The Modern Hotel Audit",
    price: "0",
    priceCurrency: "USD",
    description: "Free, scored across seven dimensions, sized in dollars. No strings.",
  },
};

export default function Audit() {
  return (
    <PageLayout
      title="The Modern Hotel Audit — Free Hotel Revenue Diagnostic | Ramirez Hospitality Group"
      description="The Modern Hotel Audit: a free property review for independent and boutique hotel owners, scored across seven dimensions and sized in dollars. Every revenue management client starts here, whether buying, opening, or operating."
      canonical="/audit"
      breadcrumbs={[{ name: "The Modern Hotel Audit", href: "/audit" }]}
      jsonLd={[AUDIT_SERVICE_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO + FORM */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 opacity-30">
          <img src={IMAGES.audit} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/85 to-obsidian" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <Eyebrow numeral="I" label="Every client starts here" />
              <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
                Get the property scored
                <br />
                <span className="italic text-brass">before you decide.</span>
              </h1>
              <p className="mt-9 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
                Buying a hotel, opening one, or running one. The Modern Hotel Audit scores
                the whole property across seven dimensions, puts a dollar figure on every
                finding, and shows the evidence behind each. Free. No strings.
              </p>
              <p className="mt-8 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">
                10+ years · 50+ hospitality properties · 20% average revenue lift
              </p>
            </div>
            <div className="lg:col-span-5">
              <LeadForm source="audit-page" />
            </div>
          </div>
        </div>
      </section>

      {/* II · WHAT THE AUDIT ACTUALLY DOES */}
      <AuditSection numeral="II" />

      {/* III · WHO DOES THE WORK */}
      <OperatorSection numeral="III" />

      {/* IV · CLOSING CTA */}
      <section className="py-24 lg:py-32 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-3xl">
            <Eyebrow numeral="IV" label="Next step" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
              Tell me about
              <br />
              <span className="italic text-brass">your hotel.</span>
            </h2>
            <p className="mt-7 text-cream/75 leading-[1.7] max-w-md">
              Five fields, then pick a time for a 20-minute fit call. If it is not a fit, I
              will say so.
            </p>
            <div className="mt-9">
              <a href="#lead-form" className="btn-brass">
                Book The Modern Hotel Audit <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="mt-6 text-cream/45 text-sm">
              Prefer email or the phone? {BRAND.email} · {BRAND.phone}
            </p>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
