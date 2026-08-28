/*
 * Ramirez Hospitality Group — Google Ads landing page
 * Route: /lp/revenue-management
 * Keyword theme: "hotel revenue management consultant" (H1 message-match)
 *
 * CTA model: every button reads "Book The Modern Hotel Audit" and scrolls to
 * the lead form (step one). Submitting the form reveals the Google Calendar
 * booking embed (step two), so the visitor never leaves the page and the
 * gclid captured by the form survives into the booked call. No CTA calls the
 * phone; the number lives in the footer only.
 *
 * No site header, no footer nav, no outbound links besides the calendar
 * embed. noindex so it never competes with /revenue-management in organic
 * search. Not in the sitemap or prerender list.
 *
 * Performance notes: no hero image above the fold (the H1 is the LCP element),
 * no framer-motion, no Reveal observers, native <details> for the FAQ.
 */

import { Fragment, useEffect } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Eyebrow } from "@/components/Eyebrow";
import { LeadForm } from "@/components/lp/LeadForm";
import { BookBar } from "@/components/lp/BookBar";
import { AuditSection } from "@/components/audit/AuditSection";
import { BRAND, PROPERTIES } from "@/lib/brand";

const SOURCE = "lp/revenue-management";

const COVERS = [
  {
    n: "I",
    t: "Daily pricing decisions",
    p: "Rates set every day against your comp set, your pace, and what is actually happening in the market. Not a rule left running since last season.",
  },
  {
    n: "II",
    t: "OTA and channel management",
    p: "Expedia, Booking.com, and Hotels.com content, visibility, parity, and promotions. Commissions watched like an expense line, because they are one.",
  },
  {
    n: "III",
    t: "Direct booking growth",
    p: "Booking engine flow, rate fences, metasearch, and email that move bookings off the OTAs and onto your own site.",
  },
  {
    n: "IV",
    t: "Reporting an owner can read",
    p: "Pace, pickup, channel mix, and what changed, in plain language. A strategy call every month to decide what happens next.",
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
    p: "You pick the time. We cover the property, what is keeping you up at night, and whether the audit is worth your time. If it is not a fit, I will say so.",
  },
  {
    n: "02",
    t: "The Modern Hotel Audit",
    p: "Intake, recon, score, deliver. You get a score out of 100 and a dollar figure for what is being left on the table, with the evidence behind every number. Free. No strings.",
    highlight: "The Lincoln, Marfa: scored 41/100, $55K to $185K identified on a $444K base.",
  },
  {
    n: "03",
    t: "The subscription, if it fits",
    p: "System access, comp set, and a pricing plan we agree on together, then it runs daily. Month to month, re-scored on a schedule we put in writing. You keep every login.",
  },
];

const TIERS = [
  { name: "Essentials", price: "$850", fit: "10 to 40 keys" },
  { name: "Growth", price: "$1,500", fit: "30 to 80 keys" },
  { name: "Enterprise", price: "$2,500+", fit: "80+ keys and portfolios" },
];

const LINCOLN_ARITHMETIC = [
  { line: "The free moves", fee: "$0", value: "~$14,000", note: "given away" },
  { line: "Essentials", fee: "$850 / mo", value: "+$64,000", note: "6.3× the fee" },
  { line: "Growth", fee: "$1,500 / mo", value: "+$26,000 more", note: "5.0× the fee" },
  { line: "Enterprise", fee: "$2,500+ / mo", value: "+$12,000 and growing", note: "events, buyouts, group sales" },
];

const CHECKLIST = [
  "Runs inside the PMS you already have",
  "Flat fee, no setup cost, no contract",
  "Monthly strategy call and performance report",
  "The Modern Hotel Audit first, free, no strings",
];

const FAQ = [
  {
    q: "What is The Modern Hotel Audit, and is it really free?",
    a: "Yes, genuinely free. Seven dimensions of the property, each scored against what a well-run independent of your size can do, each finding tied to a timestamped exhibit and an annual dollar figure. You get the full report and the two highest-value free moves whether or not the subscription ever happens.",
  },
  {
    q: "What does a hotel revenue management consultant actually do each day?",
    a: "Set and adjust rates, manage inventory and restrictions, keep OTA listings and parity clean, watch pace against forecast, and flag anything that needs an owner decision. The daily work is mine; the decisions that change your business stay yours.",
  },
  {
    q: "Do I need new software?",
    a: "Usually not to start. I work inside the PMS and channel manager you already have. If a revenue management system would pay for itself, I will show you the math before recommending one.",
  },
  {
    q: "How is this different from the OTA account manager who calls me?",
    a: "They are paid by the OTA. I am paid by you. The advice tends to differ.",
  },
  {
    q: "What if the subscription does not work for us?",
    a: "Month to month, no lock-in. If the numbers are not there, you stop. I would rather earn the next month than lock you into it.",
  },
];

export default function RevenueManagementLP() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground pb-20 lg:pb-0">
      <SEO
        title="Hotel Revenue Management Consultant for Independent Hotels | Ramirez Hospitality Group"
        description="Hotel revenue management consultant for independent and boutique hotels. Every client starts with The Modern Hotel Audit: free, scored, sized in dollars. Daily pricing, OTA management, and direct booking growth from $850 a month."
        canonical="/lp/revenue-management"
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
                <Eyebrow label="Every client starts with The Modern Hotel Audit" />
                <h1 className="mt-6 font-display font-medium text-[2.4rem] sm:text-5xl lg:text-[3.9rem] leading-[1.06] text-cream tracking-[-0.025em]">
                  Hotel Revenue Management Consultant
                  <br />
                  <span className="italic text-brass">for Independent and Boutique Hotels</span>
                </h1>
                <p className="mt-7 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
                  Daily pricing, OTA management, and direct booking growth, run by an operator
                  who has done it on his own properties. Subscriptions from $850 a month.
                </p>

                {/* Proof point */}
                <div className="mt-9 grid sm:grid-cols-2 gap-px bg-brass/15 border border-brass/15 max-w-2xl">
                  <div className="bg-card p-6">
                    <div className="font-display text-4xl text-brass leading-none">+$1M</div>
                    <div className="mt-3 text-cream/75 text-sm leading-[1.6]">
                      Annual revenue lift at Twist Palm Springs
                    </div>
                  </div>
                  <div className="bg-card p-6">
                    <div className="font-display text-4xl text-brass leading-none">$750K</div>
                    <div className="mt-3 text-cream/75 text-sm leading-[1.6]">
                      Annual revenue on six keys at Limón Palm Springs
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">
                  10+ years · 50+ hospitality properties · 20% average revenue lift
                </p>

                {/* Mobile CTA: jumps to the form directly below */}
                <a href="#lead-form" className="btn-brass mt-8 w-full justify-center lg:hidden">
                  Book The Modern Hotel Audit <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="lg:col-span-5">
                <LeadForm source={SOURCE} />
              </div>
            </div>
          </div>
        </section>

        {/* II · THE MODERN HOTEL AUDIT (signature product) */}
        <AuditSection numeral="II" />

        {/* III · WHAT THE SUBSCRIPTION COVERS */}
        <section className="py-20 lg:py-28 bg-obsidian">
          <div className="container">
            <div className="max-w-3xl mb-12">
              <Eyebrow numeral="III" label="What the subscription covers" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                The work a revenue manager does,
                <br />
                <span className="italic text-brass">without the payroll.</span>
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

        {/* V · PRICING */}
        <section className="py-20 lg:py-28 panel-emerald border-y border-brass/15">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <Eyebrow numeral="V" label="Pricing" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                  From $850 a month.
                  <br />
                  <span className="italic text-brass">Month to month. No lock-in.</span>
                </h2>
                <p className="mt-6 text-cream/80 leading-[1.7] max-w-md">
                  The subscription starts after The Modern Hotel Audit, and only if it fits.
                  Flat monthly fee, no setup fee, no contract. Re-scored on a schedule we put
                  in writing: the number has to move. You keep every login and every export.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
                  {TIERS.map((t) => (
                    <div key={t.name} className="bg-obsidian p-7">
                      <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">{t.name}</div>
                      <div className="mt-4 font-display text-3xl text-cream">
                        {t.price}
                        <span className="text-cream/50 text-base"> / mo</span>
                      </div>
                      <div className="mt-2 text-cream/65 text-sm">{t.fit}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border border-brass/20 bg-background/70">
                  <div className="px-5 py-3.5 border-b border-brass/20 text-[0.62rem] tracking-[0.32em] uppercase text-brass">
                    How the arithmetic looked for The Lincoln (base case, per year)
                  </div>
                  <div className="grid grid-cols-[1.2fr_0.8fr_1fr_0.9fr] text-[0.8125rem]">
                    {LINCOLN_ARITHMETIC.map((row, i) => {
                      const border = i < LINCOLN_ARITHMETIC.length - 1 ? "border-b border-brass/10" : "";
                      return (
                        <Fragment key={row.line}>
                          <div className={`px-5 py-3 text-cream/75 ${border}`}>{row.line}</div>
                          <div className={`px-5 py-3 text-cream/55 ${border}`}>{row.fee}</div>
                          <div className={`px-5 py-3 text-cream ${border}`}>{row.value}</div>
                          <div className={`px-5 py-3 ${i === 0 ? "text-cream/55" : "text-brass"} ${border}`}>
                            {row.note}
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>

                <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-cream/85 text-sm">
                  {CHECKLIST.map((line) => (
                    <li key={line} className="flex gap-3">
                      <Check className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* VI · THE OPERATOR */}
        <section className="py-20 lg:py-28 bg-obsidian">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <Eyebrow numeral="VI" label="Who does the work" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                  Adam Ramirez.
                  <br />
                  <span className="italic text-brass">Operator first, consultant second.</span>
                </h2>
                <p className="mt-7 text-cream/80 leading-[1.7] max-w-2xl">
                  I have spent 10+ years opening, repositioning, and running independent and
                  boutique hotels, many of them in Palm Springs, and I still price hotels every
                  morning. Ramirez Hospitality Group is how owners get that work without hiring
                  for it. You deal with me, not an account team.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-5">
                  Properties opened, repositioned, or run
                </div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-cream/75 text-sm">
                  {PROPERTIES.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-brass/60">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* VII · FAQ */}
        <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
          <div className="container relative z-10">
            <div className="max-w-3xl mb-10">
              <Eyebrow numeral="VII" label="Owner questions" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                What owners ask <span className="italic text-brass">before the audit.</span>
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

        {/* VIII · FINAL CTA */}
        <section className="py-20 lg:py-28 bg-obsidian">
          <div className="container">
            <div className="max-w-3xl">
              <Eyebrow numeral="VIII" label="Next step" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                Get the property scored
                <br />
                <span className="italic text-brass">before you decide.</span>
              </h2>
              <p className="mt-6 text-cream/80 leading-[1.7] max-w-xl">
                A 20-minute fit call, then the audit: a score, a dollar figure, and the
                evidence behind both. Free. No strings.
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
