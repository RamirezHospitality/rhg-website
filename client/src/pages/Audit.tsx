/*
 * Ramirez Hospitality Group — The Reserve · THE MODERN HOTEL AUDIT
 * The front door for anyone who runs a hotel. Form first: every "Book The
 * Modern Hotel Audit" on the site lands on the capture form here
 * (/audit#lead-form); the calendar is the step LeadConnector offers after
 * submission. Reuses the shared AuditSection / OperatorSection so the audit
 * is described identically wherever it appears.
 */

import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { CrmCaptureForm } from "@/components/lp/CrmCaptureForm";
import { AuditSection } from "@/components/audit/AuditSection";
import { OperatorSection } from "@/components/OperatorSection";
import { IMAGES, OFFERS, TRACK_RECORD_LINE } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const AUDIT_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ramirezhospitality.com/audit#service",
  name: "The Modern Hotel Audit",
  description:
    "A free revenue audit for independent hotels, motels and inns with fewer than 50 rooms. The property is scored out of 100 across seven areas: reputation and rate-worthiness, direct booking engine, distribution and channel health, technology and automation, demand capture, pricing and rate strategy, and whole-property yield. Every finding is priced in dollars with the evidence behind it, and the two most valuable fixes are written out in full. Every finding is tagged to the cheapest subscription plan that captures it. The Lincoln, Marfa scored 41 out of 100 and found $55,000 to $185,000 on a $444,000 base.",
  provider: { "@id": "https://ramirezhospitality.com/#organization" },
  serviceType: "Hotel Revenue Audit",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://ramirezhospitality.com/audit",
  offers: {
    "@type": "Offer",
    name: OFFERS.audit.name,
    price: "0",
    priceCurrency: "USD",
    description: "Free. Scored across seven areas, sized in dollars. The two most valuable fixes are the owner's to keep.",
  },
};

export default function Audit() {
  return (
    <PageLayout
      title="The Modern Hotel Audit: Free Hotel Revenue Audit for Independent Hotels | Ramirez Hospitality Group"
      description="Free. Your hotel scored out of 100 across seven areas, every finding priced in dollars, the two most valuable fixes written out in full. The Lincoln, Marfa scored 41 and found $55,000 to $185,000. Book The Modern Hotel Audit."
      canonical="/audit"
      breadcrumbs={[{ name: OFFERS.audit.name, href: "/audit" }]}
      jsonLd={[AUDIT_SERVICE_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* I · HERO + FORM */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 opacity-30">
          <img src={IMAGES.audit} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/85 to-obsidian" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <Eyebrow numeral="I" label={`${OFFERS.audit.name} · Free`} />
              <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
                Get the property scored
                <br />
                <span className="italic text-brass">before you decide.</span>
              </h1>
              <p className="mt-9 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
                Free. Your hotel scored out of 100 across seven areas, every finding priced in
                dollars, and the evidence behind each number. The two most valuable fixes are
                written out in full, yours to keep whether we work together or not.
              </p>
              <p className="mt-5 text-cream/70 text-base leading-[1.65] max-w-2xl">
                Every finding is tagged to the cheapest plan that captures it, so the plan decision
                is arithmetic, not a pitch. The catch, in full: at the end we ask whether you want
                help fixing the three lowest scores. That is the whole catch.
              </p>
              <p className="mt-8 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">{TRACK_RECORD_LINE}</p>
              <p className="mt-6 text-cream/55 text-sm leading-[1.7] max-w-xl">
                Buying, building or opening a hotel that is not running yet? There is nothing to
                audit yet; start with{" "}
                <Link href={OFFERS.plan.path}>
                  <span className="text-brass hover:text-cream transition-colors underline underline-offset-4 decoration-brass/40">
                    {OFFERS.plan.name}
                  </span>
                </Link>
                .
              </p>
            </div>
            <div className="lg:col-span-5">
              <CrmCaptureForm />
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
              Five fields, then pick a time for a 20-minute fit call. If it is not a fit, I will
              say so.
            </p>
            <div className="mt-9">
              <a href="#lead-form" className="btn-brass">
                {OFFERS.audit.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
