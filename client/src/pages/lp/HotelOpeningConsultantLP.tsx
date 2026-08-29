/*
 * Ramirez Hospitality Group — Google Ads landing page
 * Route: /lp/hotel-opening-consultant
 * Keyword theme: "hotel opening consultant" (H1 message-match)
 * Ad group: RHG | Search | Revenue Management | US (new ad group, per
 * landing-page-specs.md — targets "hotel opening/pre-opening/reopening consultant")
 *
 * THE EXCEPTION TO "CLONE THE REVENUE-MANAGEMENT TEMPLATE" (2026-08-28):
 * every other /lp page offers The Modern Hotel Audit — "get the property
 * scored before you decide" — which assumes an operating property with
 * occupancy, ADR, and channel mix to score. A pre-opening hotel has none of
 * that yet, so this page does not offer the audit. Instead:
 *   - The CTA books openingBookingUrl, not auditBookingUrl (both live in
 *     lib/brand.ts).
 *   - The CTA reads "Book an Opening Strategy Call," not "Book The Modern
 *     Hotel Audit."
 *   - Section II is the opening-engagement scope (reusing the exact
 *     deliverables list from the Services page's Openings pillar) instead of
 *     the shared AuditSection component.
 *   - The FAQ and final CTA are reframed around a property that hasn't
 *     opened yet, not a diagnosis of one that's already running.
 * Everything else — LeadForm, the 17 fields (5 visible + honeypot + 11
 * hidden attribution fields), conversion tracking, event labels, and the
 * /api/lead endpoint — is identical to the other three /lp pages. The
 * PricingSection and OperatorSection blocks stay identical on purpose
 * (locked, shared sitewide): what ongoing revenue management costs after
 * launch, and who does the work, don't change because the ad group does.
 *
 * No site header, no footer nav, no outbound links besides the calendar
 * embed. noindex so it never competes with an indexable site page in organic
 * search. Not in the sitemap or prerender list.
 */

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Eyebrow } from "@/components/Eyebrow";
import { LeadForm } from "@/components/lp/LeadForm";
import { BookBar } from "@/components/lp/BookBar";
import { PricingSection } from "@/components/pricing/PricingSection";
import { OperatorSection } from "@/components/OperatorSection";
import { BRAND } from "@/lib/brand";

const SOURCE = "lp/hotel-opening-consultant";

const OPENING_SCOPE = [
  "Concept, positioning, and brand identity direction",
  "Pre-opening budget and year-one pro forma",
  "Tech stack selection and full integration",
  "Sales, distribution, and OTA build",
  "Hiring plan, org chart, and training program",
  "SOPs and service standards",
  "Marketing launch: PR, influencer, paid media, website",
  "Soft opening management and 90-day stabilization",
];

interface Step {
  n: string;
  t: string;
  p: string;
  highlight?: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    t: "A 20-minute fit call",
    p: "You pick the time. We cover the property, the timeline, and what stage the project is at — concept, under construction, or close to opening. If it is not a fit, I will say so.",
  },
  {
    n: "02",
    t: "The Opening Strategy Session",
    p: "Positioning, pre-opening pro forma, tech stack, and a realistic launch timeline mapped to your project's actual stage — not a generic checklist.",
    highlight: "8 hotels opened from concept to ribbon-cutting, 4 more repositioned after renovation or ownership transitions.",
  },
  {
    n: "03",
    t: "The opening engagement, scoped to your timeline",
    p: "Brand identity, budget, hiring, distribution, and the soft-opening playbook, run by the operator who will be in the building when it happens. Revenue management picks up as its own subscription once you're open.",
  },
];

const FAQ = [
  {
    q: "What happens on the opening strategy call?",
    a: "We talk through the property — stage of the project, timeline, and budget — and I tell you honestly what an opening engagement would look like and whether it's a fit. No pitch deck, no obligation.",
  },
  {
    q: "How far in advance should I bring in an opening consultant?",
    a: "The earlier the better — ideally before the brand and positioning are locked, since that decision drives the pro forma, the tech stack, and the hiring plan. That said, I've also stepped into projects mid-construction. Bring the timeline to the call and I'll tell you what's still open to change.",
  },
  {
    q: "Do you handle the whole opening, or just strategy?",
    a: "Both, scoped to what you need. Some owners want the full concept-to-ribbon-cutting engagement — brand, budget, tech stack, hiring, SOPs, marketing launch, and soft-opening management. Others just need the pro forma and rate architecture set correctly before they hire their own team. We scope it on the call.",
  },
  {
    q: "We're repositioning an existing property, not opening a new one — does this still apply?",
    a: "Yes. Repositioning after a renovation or ownership transition uses the same pre-opening discipline — positioning, pro forma, tech stack, and a stabilization plan — just compressed. I've repositioned 4 properties this way.",
  },
  {
    q: "What happens after we open?",
    a: "Revenue management continues as its own month-to-month subscription, starting at $850/month, so daily pricing and OTA management don't lapse the day the opening engagement ends.",
  },
];

export default function HotelOpeningConsultantLP() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground pb-20 lg:pb-0">
      <SEO
        title="Hotel Opening Consultant for Independent and Boutique Properties | Ramirez Hospitality Group"
        description="Hotel opening consultant for independent and boutique properties. Pre-opening strategy, rate architecture, and channel setup from an operator who has opened eight hotels and repositioned four more. Book a free Opening Strategy Call."
        canonical="/lp/hotel-opening-consultant"
        noindex
      />

      {/* TOP BAR: wordmark only, no navigation, no phone */}
      <header className="border-b border-brass/15 bg-obsidian">
        <div className="container flex items-center justify-between py-5">
          <div className="font-display text-[1.25rem] leading-none tracking-[0.02em] text-cream font-semibold">
            Ramirez<span className="text-brass"> · </span>Hospitality
          </div>
          <div className="hidden lg:block text-[0.62rem] tracking-[0.32em] uppercase text-cream/55">
            Palm Springs, CA · Available nationwide
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* I · HERO + FORM */}
        <section className="bg-obsidian pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              <div className="lg:col-span-7">
                <Eyebrow label="Every opening starts with a strategy call" />
                <h1 className="mt-6 font-display font-medium text-[2.4rem] sm:text-5xl lg:text-[3.9rem] leading-[1.06] text-cream tracking-[-0.025em]">
                  Hotel Opening Consultant
                  <br />
                  <span className="italic text-brass">for Independent and Boutique Properties</span>
                </h1>
                <p className="mt-7 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
                  Pre-opening strategy, rate architecture, and channel setup, run by an operator
                  who has opened eight hotels from concept to ribbon-cutting and repositioned
                  four more.
                </p>

                {/* Proof point */}
                <div className="mt-9 grid sm:grid-cols-2 gap-px bg-brass/15 border border-brass/15 max-w-2xl">
                  <div className="bg-card p-6">
                    <div className="font-display text-4xl text-brass leading-none">8</div>
                    <div className="mt-3 text-cream/75 text-sm leading-[1.6]">
                      Hotels opened, including The Paloma Resort and Sands Hotel &amp; Spa
                    </div>
                  </div>
                  <div className="bg-card p-6">
                    <div className="font-display text-4xl text-brass leading-none">4</div>
                    <div className="mt-3 text-cream/75 text-sm leading-[1.6]">
                      Properties repositioned, including The Stardust
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">
                  10+ years · 50+ hospitality properties · Concept to ribbon-cutting
                </p>

                {/* Mobile CTA: jumps to the form directly below */}
                <a href="#lead-form" className="btn-brass mt-8 w-full justify-center lg:hidden">
                  Book an Opening Strategy Call <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="lg:col-span-5">
                <LeadForm
                  source={SOURCE}
                  heading="Book an Opening Strategy Call"
                  subheading="Free, 20 minutes. Tell me about the property and where it stands, then pick a time. If it's not a fit, I'll say so."
                  buttonLabel="Book an Opening Strategy Call"
                  bookingUrl={BRAND.openingBookingUrl}
                  bookingHeading="Opening Strategy Call · 20-minute fit call"
                  bookingIntroSuffix="and what it needs before opening day."
                />
              </div>
            </div>
          </div>
        </section>

        {/* II · WHAT THE OPENING ENGAGEMENT COVERS */}
        <section className="py-20 lg:py-28 bg-obsidian">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <Eyebrow numeral="II" label="What the opening engagement covers" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                Concept to ribbon-cutting.
                <br />
                <span className="italic text-brass">One operator, not a committee.</span>
              </h2>
              <p className="mt-6 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">
                Eight hotels opened from scratch, four more repositioned after renovation or
                ownership transitions. This is the work I love most, and where the difference
                between an operator and a consultant is most visible.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl">
              {OPENING_SCOPE.map((d) => (
                <div key={d} className="flex items-start gap-3 text-cream/80 text-sm leading-[1.6]">
                  <span className="text-brass mt-0.5 shrink-0">◆</span>
                  {d}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* III · HOW IT STARTS */}
        <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
          <div className="container relative z-10">
            <div className="max-w-3xl mb-12">
              <Eyebrow numeral="III" label="How it starts" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                Three steps. <span className="italic text-brass">No pitch deck.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
              {STEPS.map((s) => (
                <div key={s.n} className="bg-obsidian p-8 lg:p-10">
                  <div className="font-display italic text-brass text-2xl mb-4">{s.n}</div>
                  <h3 className="font-display text-2xl text-cream leading-snug">{s.t}</h3>
                  <p className="mt-4 text-cream/75 text-sm leading-[1.75]">{s.p}</p>
                  {s.highlight && (
                    <p className="mt-4 text-brass text-[0.8125rem] leading-[1.6]">{s.highlight}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IV · WHAT IT COSTS AFTER YOU OPEN */}
        <PricingSection numeral="IV" />

        {/* V · THE OPERATOR */}
        <OperatorSection numeral="V" />

        {/* VI · FAQ */}
        <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
          <div className="container relative z-10">
            <div className="max-w-3xl mb-10">
              <Eyebrow numeral="VI" label="Owner questions" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                What owners ask <span className="italic text-brass">before opening.</span>
              </h2>
            </div>
            <div className="max-w-3xl border-t border-brass/20">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-b border-brass/20 py-5">
                  <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-display text-xl text-cream leading-snug">
                    <span>{f.q}</span>
                    <span className="text-brass shrink-0 transition-transform duration-300 group-open:rotate-45 text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-cream/75 text-sm leading-[1.75] max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* VII · FINAL CTA */}
        <section className="py-20 lg:py-28 bg-obsidian">
          <div className="container">
            <div className="max-w-3xl">
              <Eyebrow numeral="VII" label="Next step" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                Know the plan
                <br />
                <span className="italic text-brass">before opening day.</span>
              </h2>
              <p className="mt-6 text-cream/80 leading-[1.7] max-w-xl">
                A 20-minute fit call, then a real opening strategy session mapped to your
                property's timeline. Free. No strings.
              </p>
              <div className="mt-9">
                <a href="#lead-form" className="btn-brass">
                  Book an Opening Strategy Call <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-brass/15 bg-obsidian">
        <div className="container py-8 text-[0.7rem] tracking-wider text-cream/45 flex flex-wrap gap-x-6 gap-y-2">
          <span>{BRAND.copyright}</span>
          <span>{BRAND.address}</span>
          <span>{BRAND.email}</span>
          <span>{BRAND.phone}</span>
        </div>
      </footer>

      <BookBar label="Book an Opening Strategy Call" />
    </div>
  );
}
