/*
 * Ramirez Hospitality Group — Google Ads landing page
 * Route: /lp/hotel-management-company
 * Keyword theme: "hotel management company" (H1 message-match)
 * Targeted searches: hotel management company (1,300/mo), hotel management
 * companies, boutique hotel management company, third party hotel management.
 *
 * DIFFERENT BUYER FROM THE OTHER FOUR /lp PAGES: those sell consulting —
 * advice, delivered monthly, owner still runs the property. This page speaks
 * to an owner or investor looking for a third-party company to actually take
 * over operations — full P&L accountability, not recommendations. Written as
 * an operator who runs hotels, not a consultant who advises on them:
 * "advisory," "recommend," and similar consulting language are avoided on
 * purpose. The long-term direction for RHG is owning and operating
 * properties directly; a management engagement is framed honestly as a step
 * toward that (see the FAQ), not oversold as something it isn't yet.
 *
 * GEOGRAPHIC SCOPE (2026-08-29): RHG can only deliver on-site management in
 * Palm Springs and the Coachella Valley. The campaign is NOT geo-restricted
 * — an LA-based owner of a Palm Springs hotel is the ideal prospect, and
 * geo-targeting would exclude them — so the page does the qualifying
 * instead. The market is named three times: the eyebrow (first thing on the
 * page, above the H1), the hero subhead, and the lead form's own subheading,
 * plus a dedicated FAQ item. Framed as a strength (on property, not a
 * regional office three states away), not an apology for a limited radius.
 *
 * PricingSection is intentionally NOT used here, unlike the other three
 * consulting LPs — its tiers ($850–$2,500/mo) describe the revenue
 * management subscription, an advisory product with a completely different
 * economics than a full management contract (typically a base fee plus a
 * performance incentive, scoped per engagement). Showing the subscription
 * pricing table here would misrepresent what a management takeover costs,
 * the same mismatch already fixed once on /lp/hotel-opening-consultant.
 * Fee structure is instead addressed honestly in the FAQ: scoped and quoted
 * per engagement, no invented percentages.
 *
 * AuditSection IS kept, unlike the opening-consultant page — an operating
 * property being considered for a management takeover is exactly what The
 * Modern Hotel Audit scores, and the CTA books auditBookingUrl throughout.
 *
 * De-branded from the start (see brand.ts's PROPERTIES comment): no named
 * third-party hotel names anywhere. OperatorSection is passed `unbranded`.
 * Proof points use the figures given for this page specifically (15 years
 * on property, 75+ hotels touched, four repositioned) rather than the
 * shared OperatorSection facts (10+ years, 8 hotels, 50+ properties) — both
 * are accurate but count different things (hands-on operating years and
 * hotels touched in any capacity, vs. the narrower "opened from scratch"
 * figure used elsewhere); flagged to Adam rather than silently reconciled.
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
import { AuditSection } from "@/components/audit/AuditSection";
import { OperatorSection } from "@/components/OperatorSection";
import { BRAND } from "@/lib/brand";

const SOURCE = "lp/hotel-management-company";

const COVERS = [
  {
    n: "I",
    t: "Full P&L accountability",
    p: "RHG owns the budget, the cost line, and the revenue line — not a monthly recommendation an owner has to approve and execute themselves.",
  },
  {
    n: "II",
    t: "Day-to-day operations",
    p: "Staffing, SOPs, vendor management, and the calls an on-site GM makes every day. Run by the operator, not reported to the owner after the fact.",
  },
  {
    n: "III",
    t: "Revenue and distribution, with authority",
    p: "The same daily pricing and OTA discipline as the subscription, executed directly — not proposed to an owner three time zones away.",
  },
  {
    n: "IV",
    t: "Owner reporting that means something",
    p: "Monthly financials and a call with the person accountable for the number, not an account manager relaying someone else's work.",
  },
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
    p: "You pick the time. We confirm the property is in Palm Springs or the Coachella Valley, cover what's not working under current management, and whether the audit is worth your time.",
  },
  {
    n: "02",
    t: "The Modern Hotel Audit",
    p: "Intake, recon, score, deliver. A score out of 100 and a dollar figure for what the property is leaving on the table today, with the evidence behind every number. Free. No strings.",
    highlight: "The Lincoln, Marfa: scored 41/100, $55K to $185K identified on a $444K base.",
  },
  {
    n: "03",
    t: "The management engagement, scoped and quoted",
    p: "Scope of authority, a base fee plus a performance incentive, and a transition plan from your current operator to RHG — quoted after the audit, based on the property.",
  },
];

const FAQ = [
  {
    q: "Do you manage properties outside Palm Springs and the Coachella Valley?",
    a: "No. On-site management is limited to Palm Springs and the Coachella Valley, since being physically on property is central to how RHG runs a hotel. If you own a property in the market but live elsewhere, that's exactly the kind of owner this fits — the property being local is what matters, not where you are.",
  },
  {
    q: "How is a management contract different from the revenue management subscription?",
    a: "The subscription is advisory — you keep running the hotel day to day, RHG sets pricing and strategy, you approve and execute. A management contract is RHG actually running the property: staffing, operations, and full P&L accountability, not recommendations.",
  },
  {
    q: "How are management fees structured?",
    a: "Per engagement, typically a base management fee plus a performance incentive tied to results. There's no standard rate card for a full takeover — scope, property size, and current condition all move the number, which is why it's quoted after the audit, not before it.",
  },
  {
    q: "Who's actually on property running things?",
    a: "RHG is operator-led and small on purpose. The person accountable for your P&L is the person you talk to — not an account manager reporting up through a regional office.",
  },
  {
    q: "Is RHG looking to grow beyond management contracts?",
    a: "Yes, and it's worth saying plainly: the long-term direction is owning and operating properties directly, and a management engagement is sometimes the first step in that conversation. That's not a condition of working together — it's context, in case it's of interest to you as an owner.",
  },
];

export default function HotelManagementCompanyLP() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground pb-20 lg:pb-0">
      <SEO
        title="Hotel Management Company for Independent and Boutique Properties in Palm Springs & the Coachella Valley | Ramirez Hospitality Group"
        description="On-site hotel management company for independent and boutique properties in Palm Springs and the Coachella Valley. Full operational takeover, revenue and P&L accountability, run by a local operator — not a regional office. Every engagement starts with a free Modern Hotel Audit."
        canonical="/lp/hotel-management-company"
        noindex
      />

      {/* TOP BAR: wordmark only, no navigation, no phone */}
      <header className="border-b border-brass/15 bg-obsidian">
        <div className="container flex items-center justify-between py-5">
          <div className="font-display text-[1.25rem] leading-none tracking-[0.02em] text-cream font-semibold">
            Ramirez<span className="text-brass"> · </span>Hospitality
          </div>
          <div className="hidden lg:block text-[0.62rem] tracking-[0.32em] uppercase text-cream/55">
            Palm Springs, CA · On-site in the Coachella Valley
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* I · HERO + FORM */}
        <section className="bg-obsidian pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
              <div className="lg:col-span-7">
                <Eyebrow label="On-site hotel management for Palm Springs and the Coachella Valley" />
                <h1 className="mt-6 font-display font-medium text-[2.4rem] sm:text-5xl lg:text-[3.9rem] leading-[1.06] text-cream tracking-[-0.025em]">
                  Hotel Management Company
                  <br />
                  <span className="italic text-brass">for Independent and Boutique Properties</span>
                </h1>
                <p className="mt-7 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
                  Full operational takeover for hotels in Palm Springs and the Coachella
                  Valley — revenue, staffing, and P&amp;L, run on property by an operator who
                  lives in the market. Not a regional office three states away.
                </p>
                <p className="mt-4 text-brass/90 text-sm md:text-base leading-[1.6] italic font-display max-w-2xl">
                  Local means on property. That's the whole difference.
                </p>

                {/* Proof point */}
                <div className="mt-9 grid sm:grid-cols-2 gap-px bg-brass/15 border border-brass/15 max-w-2xl">
                  <div className="bg-card p-6">
                    <div className="font-display text-4xl text-brass leading-none">15</div>
                    <div className="mt-3 text-cream/75 text-sm leading-[1.6]">
                      Years running hotels, on property
                    </div>
                  </div>
                  <div className="bg-card p-6">
                    <div className="font-display text-4xl text-brass leading-none">75+</div>
                    <div className="mt-3 text-cream/75 text-sm leading-[1.6]">
                      Hotels touched — openings, revenue, and operations
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">
                  Four properties repositioned end to end · Palm Springs &amp; Coachella Valley,
                  on site
                </p>

                {/* Mobile CTA: jumps to the form directly below */}
                <a href="#lead-form" className="btn-brass mt-8 w-full justify-center lg:hidden">
                  Book The Modern Hotel Audit <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="lg:col-span-5">
                <LeadForm
                  source={SOURCE}
                  subheading="For hotels in Palm Springs and the Coachella Valley. Free, scored, sized in dollars. Tell me about the property, then pick a time for a 20-minute fit call."
                />
              </div>
            </div>
          </div>
        </section>

        {/* II · THE MODERN HOTEL AUDIT (signature product) */}
        <AuditSection numeral="II" />

        {/* III · WHAT MANAGEMENT INCLUDES */}
        <section className="py-20 lg:py-28 bg-obsidian">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <Eyebrow numeral="III" label="What management includes" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                Someone to run it,
                <br />
                <span className="italic text-brass">not someone to advise on it.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-brass/15 border border-brass/15">
              {COVERS.map((c) => (
                <div key={c.t} className="bg-obsidian p-8 lg:p-10">
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-display italic text-brass text-3xl">{c.n}</span>
                    <h3 className="font-display text-2xl text-cream leading-snug">{c.t}</h3>
                  </div>
                  <p className="text-cream/75 text-sm leading-[1.75] pl-12">{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IV · HOW IT STARTS */}
        <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
          <div className="container relative z-10">
            <div className="max-w-3xl mb-12">
              <Eyebrow numeral="IV" label="How it starts" />
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

        {/* V · THE OPERATOR */}
        <OperatorSection numeral="V" unbranded />

        {/* VI · FAQ */}
        <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
          <div className="container relative z-10">
            <div className="max-w-3xl mb-10">
              <Eyebrow numeral="VI" label="Owner questions" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                What owners ask <span className="italic text-brass">before handing over the keys.</span>
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
                Get the property scored
                <br />
                <span className="italic text-brass">before you hand it over.</span>
              </h2>
              <p className="mt-6 text-cream/80 leading-[1.7] max-w-xl">
                A 20-minute fit call, then the audit: a score, a dollar figure, and the
                evidence behind both. Free. No strings. For properties in Palm Springs and
                the Coachella Valley.
              </p>
              <div className="mt-9">
                <a href="#lead-form" className="btn-brass">
                  Book The Modern Hotel Audit <ArrowRight className="w-4 h-4" />
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

      <BookBar />
    </div>
  );
}
