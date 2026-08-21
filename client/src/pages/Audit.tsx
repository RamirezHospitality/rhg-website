/*
 * Ramirez Hospitality Group — The Reserve · FREE AUDIT
 * The conversion engine. Pre-qualifies the lead and books the call.
 */

import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const AUDIT_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Free Hotel Property Audit",
  description:
    "A complimentary 45-minute property audit for independent hotel owners and operators. Covers: OTA health score across Expedia, Booking.com, and Hotels.com; pricing pressure test with live comp-set analysis; direct-booking diagnostic; tech-stack review; and the top three highest-impact revenue moves for the next 90 days. Written follow-up delivered within 48 hours.",
  provider: { "@id": "https://www.ramirezhos.com/#organization" },
  serviceType: "Hotel Revenue Audit",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://www.ramirezhos.com/audit",
  offers: {
    "@type": "Offer",
    name: "Free Hotel Property Audit",
    price: "0",
    priceCurrency: "USD",
    description: "Complimentary 45-minute property audit for independent hotel owners. No sales pitch.",
  },
};

const DELIVERS = [
  {
    n: "I",
    t: "OTA Health Score",
    p: "A live read on your visibility, content quality, rate parity, and promotion stack across Expedia, Booking.com, and Hotels.com.",
  },
  {
    n: "II",
    t: "Pricing Pressure Test",
    p: "Three nights pulled at random — comp-set positioning, demand-pace check, and the rate adjustments I would make today.",
  },
  {
    n: "III",
    t: "Direct-Booking Diagnostic",
    p: "Booking-engine flow, metasearch presence, and three concrete moves to lift your direct share by ten points or more.",
  },
  {
    n: "IV",
    t: "Tech-Stack Read",
    p: "A look at your PMS, RMS, channel manager, and CRM. Where the integrations are working — and where the leaks are.",
  },
  {
    n: "V",
    t: "Top Three Opportunities",
    p: "The three highest-impact moves I would make in the next ninety days, ranked by revenue potential and effort.",
  },
];

export default function Audit() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Audit request received.", {
        description: "Adam will reach out within one business day to schedule.",
      });
    }, 700);
  }

  return (
    <PageLayout
      title="Free Hotel Property Audit — OTA, Revenue & Direct Booking Diagnostic | Ramirez Hospitality Group"
      description="A complimentary 45-minute hotel property audit by a senior operator. Covers OTA health score, pricing pressure test, direct-booking diagnostic, tech-stack review, and the top three revenue opportunities for the next 90 days. Written follow-up within 48 hours. No sales pitch."
      canonical="/audit"
      breadcrumbs={[{ name: "Free Property Audit", href: "/audit" }]}
      jsonLd={[AUDIT_SERVICE_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 opacity-30">
          <img src={IMAGES.audit} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/85 to-obsidian" />
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="The Free Audit" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Forty-five minutes.
              <br />
              A senior operator.
              <br />
              <span className="italic text-brass">Five real moves.</span>
            </h1>
            <p className="mt-9 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Not a sales call dressed up as advice. A working session where I open your
              property in real time and tell you exactly where the revenue is leaking — and
              the three moves that would close the leak in ninety days.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-7 text-cream/70 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brass" /> 45 minutes
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brass" /> Complimentary
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brass" /> Owner / executive only
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II · WHAT YOU GET */}
      <section className="py-24 lg:py-32 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <Eyebrow numeral="II" label="What I Deliver in Forty-Five Minutes" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05] text-cream">
                Five reads.
                <br />
                <span className="italic text-brass">Done live, on your property.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-brass/15 border border-brass/15">
            {DELIVERS.map((d, i) => (
              <Reveal
                key={d.t}
                delay={i * 100}
                className="bg-obsidian p-8 lg:p-10"
              >
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-display italic text-brass text-3xl">{d.n}</span>
                  <h3 className="font-display text-2xl text-cream leading-snug">{d.t}</h3>
                </div>
                <p className="text-cream/75 text-sm leading-[1.75] pl-12">{d.p}</p>
              </Reveal>
            ))}
            <Reveal
              delay={500}
              className="bg-card p-8 lg:p-10 border-l border-brass/40"
            >
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
                And One More
              </div>
              <h3 className="font-display text-3xl text-cream mb-5 leading-snug">
                A written follow-up
              </h3>
              <p className="text-cream/75 text-sm leading-[1.75]">
                Within forty-eight hours of the audit you'll receive a written summary of
                everything we covered — the OTA score, the pricing test, the direct-booking
                diagnostic, the tech read, the top three moves. Yours to keep, whether you
                hire me or not.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* III · BOOK FORM */}
      <section className="py-24 lg:py-32 bg-obsidian">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow numeral="III" label="Request Your Audit" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
                  Tell me about
                  <br />
                  <span className="italic text-brass">your hotel.</span>
                </h2>
                <p className="mt-7 text-cream/75 leading-[1.7] max-w-md">
                  Five fields, two minutes. Adam reaches out within one business day to
                  schedule. Owner-operators and executives only — no agencies, please.
                </p>
                <div className="mt-10 hairline" />
                <p className="mt-6 text-cream/55 text-sm leading-[1.7]">
                  Prefer to schedule directly? You'll be able to pick a time on Adam's
                  calendar after submitting. The calendar will offer five call types
                  including the Free Property Audit, Subscription Discovery, Opening
                  Consult, Investor / Acquisition, and Tech / OTA Review.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={150}>
                {!submitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="border border-brass/25 bg-card p-8 lg:p-10 space-y-5"
                  >
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                          First Name
                        </label>
                        <input
                          required
                          name="firstName"
                          className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                          Last Name
                        </label>
                        <input
                          required
                          name="lastName"
                          className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                          Phone
                        </label>
                        <input
                          name="phone"
                          className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                          Hotel Name
                        </label>
                        <input
                          required
                          name="hotel"
                          className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                          Your Role
                        </label>
                        <select
                          required
                          name="role"
                          className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream focus:outline-none focus:border-brass/60 transition-colors"
                        >
                          <option value="">Select…</option>
                          <option>Owner / Operator</option>
                          <option>Founder / Principal</option>
                          <option>Managing Partner</option>
                          <option>General Manager</option>
                          <option>Director of Operations</option>
                          <option>Asset Manager</option>
                          <option>Investor / Acquisition</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                        Hotel Website
                      </label>
                      <input
                        name="website"
                        placeholder="https://"
                        className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                        Where would you like the audit focused? (optional)
                      </label>
                      <textarea
                        name="focus"
                        rows={3}
                        placeholder="Pricing, OTA, direct bookings, opening, ops…"
                        className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors resize-none"
                      />
                    </div>
                    <button
                      disabled={submitting}
                      type="submit"
                      className="btn-brass w-full justify-center text-sm"
                    >
                      {submitting ? "Sending…" : "Schedule My Free Audit"}{" "}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[0.65rem] tracking-wider text-cream/40 text-center">
                      Form will be wired to your CRM / lead-gen webhook on launch.
                    </p>
                  </form>
                ) : (
                  <div className="border border-brass/40 bg-card p-12 text-center">
                    <CheckCircle2 className="w-12 h-12 text-brass mx-auto mb-6" />
                    <h3 className="font-display text-3xl text-cream mb-4">
                      Thank you. The audit is in motion.
                    </h3>
                    <p className="text-cream/75 leading-[1.7] max-w-md mx-auto">
                      Adam will reach out within one business day to schedule. In the
                      meantime, expect a confirmation email at the address you provided.
                    </p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
