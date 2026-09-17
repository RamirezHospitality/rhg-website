/*
 * Ramirez Hospitality Group — The Reserve · THE MODERN HOTEL PLAN
 * Route: /feasibility-study (the slug carries the search phrase "hotel
 * feasibility study"; /the-modern-hotel-plan and /plan redirect here).
 *
 * The feasibility study, productized per the September 9, 2026 offer brief: * $6,000, flat, priced up front, for anyone buying, building or opening a
 * hotel, whatever its size. Three questions in order. The CTA is "Book The
 * Modern Hotel Plan" throughout and lands on the capture form on this page.
 * No audit block and no subscription block here: a property that is not open
 * yet has nothing to audit. The turnaround is stated on the call, never here.
 *
 * Keeps the valuation section (income, comparable sales, cost) because it
 * carries the "how to value a hotel or motel" search cluster.
 */

import { ArrowRight, TrendingUp, Building2, Hammer } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { CrmCaptureForm } from "@/components/lp/CrmCaptureForm";
import { OperatorSection } from "@/components/OperatorSection";
import { PlanModelDemo } from "@/components/plan/PlanModelDemo";
import { PlanAncillary, PlanPaths } from "@/components/plan/PlanPaths";
import { IMAGES, OFFERS, TRACK_RECORD_LINE } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const QUESTIONS = [
  {
    n: "One",
    title: "Is the demand real?",
    body: "Everyone arrives with a vision. The Plan gets the whole concept out of your head and tests it against the market: the hotels you would compete with, what actually drives people there, the seasons, and whether the market can carry the concept at the rate it needs, whether that is luxury boutique, extended stay, select service or highly designed mid-scale. Then a rate and occupancy projection for the property's real positioning, not the one the seller wants you to see.",
  },
  {
    n: "Two",
    title: "Does the math work?",
    body: "Purchase or build cost, the money you borrow and what it costs, a stabilized year-by-year model, and what happens to your loan coverage if rate or occupancy is off by ten percent. The model is interactive and yours: move labor, marketing or rate yourself and watch the bottom line move in real time.",
  },
  {
    n: "Three",
    title: "What is the property worth?",
    body: "Valued three ways, by income, by comparable sales and by cost, reconciled to one number and a range. And which of the three your lender will actually believe.",
  },
];

const ANSWERS = [
  "Capital required, with the year-one operating result and the year-one cash flow on separate lines, because the year you spend the capital is not the year you judge the hotel.",
  "The stabilized year after every cost, for each path you are weighing: keep it as it is, convert it, expand it, sell it whole, sell it down.",
  "What the property earns with us and without us, side by side.",
  "The breakeven rate and occupancy against your alternative, and how far the market is from it.",
  "The most you can pay per added room, or for the property, at the return you want.",
  "Unlevered and pre-tax, so your lender and your accountant can layer their own terms on top.",
];

const WORKBOOK = [
  { t: "Inputs and assumptions", d: "About sixty levers in one place, each with its source and a confidence grade. Blue cells are yours to change. Yellow cells are the ones still waiting on an answer, a quote or the city." },
  { t: "Market data", d: "The seasonal rate and occupancy curve, verified comp rates, and the short-term rental comps." },
  { t: "One P&L per path", d: "Sixty months, five years, hotel-standard lines from room statistics to owner NOI after every cost." },
  { t: "Opening budget and capex", d: "Line by line, in tiers, per key, with the code items marked as placeholders until the city has spoken." },
  { t: "Labor model", d: "Every position, hours, wage and burden, sized for how the hotel will actually run." },
  { t: "Ancillary income", d: "Every stream beyond the room rate, priced from named local benchmarks." },
  { t: "Sensitivity", d: "Owner NOI across a grid of rate and occupancy, the breakeven rate against your alternative, and the most you can pay per added room." },
  { t: "The summary page", d: "Every path side by side: capital, cash flow by year, stabilized NOI, return on the switch, owner involvement, key risks." },
  { t: "Sources", d: "A register of every document the model touched, with its date." },
];

const STEPS = [
  {
    n: "01",
    t: "The fit call",
    p: "Twenty minutes. The listing, the deal or the idea, and whether the Plan is the right size for it. If a full study is more than the deal needs, we say so.",
  },
  {
    n: "02",
    t: "The study is paid",
    p: `${OFFERS.plan.priceLabel}, flat, up front. The number does not change once the work starts.`,
  },
  {
    n: "03",
    t: "Intake and research",
    p: "The seller's documents, the market, the comparable properties, the lender's terms, all timestamped. A short intake from you; the rest is ours.",
  },
  {
    n: "04",
    t: "The numbers, made to make sense",
    p: "The study and the model, walked through on a call until every number is one you understand and could defend to a lender. The decision is yours. What you leave with is the confidence to make it.",
  },
];

const VALUATION_APPROACHES = [
  {
    icon: TrendingUp,
    label: "By income",
    body: "Stabilized net operating income, capitalized at a market rate. The most-used method for an open hotel, and the one most sensitive to whether the projection is honest, which is where an operator's read on achievable rate, occupancy and expenses matters most.",
  },
  {
    icon: Building2,
    label: "By comparable sales",
    body: "Price per room and revenue multiples from recent sales in the same market and class. A sanity check, weak on its own for a one-of-a-kind property where 'comparable' is doing a lot of work.",
  },
  {
    icon: Hammer,
    label: "By cost",
    body: "What it would cost to build the same asset today, less wear. Most useful for new construction, a heavy renovation, or a motel-to-boutique conversion where there is no operating history to capitalize yet.",
  },
];

const FAQ = [
  {
    q: "My broker already gave me a pro forma.",
    a: "A broker's pro forma is a sales document. The Plan answers three questions in order, from someone who has run the front desk and priced the rooms, and it is not trying to sell you anything.",
  },
  {
    q: "How much does a hotel feasibility study cost?",
    a: `The Modern Hotel Plan is ${OFFERS.plan.priceLabel}, flat, priced up front, for one property of any size. Portfolios and unusual projects are quoted individually on the call.`,
  },
  {
    q: "What is the difference between the Plan and the free audit?",
    a: "The audit scores a hotel that is already open, across seven areas, and is free. The Plan is for a decision that has not been made yet: buying, building or converting a property that may not be running as a hotel at all. If you are buying a hotel that is open today, start with the audit; it is free and it will tell you whether the Plan is worth paying for.",
  },
  {
    q: "Do I need this before I make an offer?",
    a: "Before you sign a purchase agreement, break ground, or convert a building, yes. For a first purchase, or any deal with a lender involved, the study is what turns your walk-through into numbers a bank will accept.",
  },
  {
    q: "What if the numbers do not work?",
    a: `Then you have paid ${OFFERS.plan.priceLabel} to find out before you committed the rest, which is the cheapest lesson in this business. The model is yours. Plug the next listing into it and run it again.`,
  },
  {
    q: "I am looking at more than one property.",
    a: "Good. The model is built once and it is yours to keep. Every listing after the first is a new set of inputs in the same model, so shopping two or three properties means paying for the model once, and the comparison across them is where the decision gets easy.",
  },
];

// ─── Structured data ─────────────────────────────────────────────────────────

const PLAN_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ramirezhospitality.com/feasibility-study#service",
  name: "The Modern Hotel Plan: hotel feasibility study",
  alternateName: "Hotel Feasibility Study",
  description:
    "A hotel feasibility study for anyone buying, building or opening a hotel, whatever its size. Three questions in order: is the demand real (market, competitive set, rate and occupancy projection), does the math work (cost, financing, stabilized model, sensitivity), what is the property worth (income, comparable sales and cost approaches, reconciled). The deliverable is the study, the working model you keep and change yourself, and every number made to make sense so the decision is yours. $6,000, flat, priced up front.",
  provider: { "@id": "https://ramirezhospitality.com/#organization" },
  serviceType: "Hotel Feasibility Study",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://ramirezhospitality.com/feasibility-study",
  offers: {
    "@type": "Offer",
    name: OFFERS.plan.name,
    description: "Flat, priced up front, for one property of any size. Portfolios and unusual projects quoted individually.",
    price: String(OFFERS.plan.price),
    priceCurrency: "USD",
    url: "https://ramirezhospitality.com/feasibility-study",
  },
};

const PLAN_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FeasibilityStudy() {
  return (
    <PageLayout
      title="Hotel Feasibility Study, $6,000 Flat: The Modern Hotel Plan | Ramirez Hospitality Group"
      description="Know the numbers before you buy, build or open a hotel. Is the demand real, does the math work, what is it worth. See a delivered Plan's model on the page: $3.4M stabilized revenue, $1.6M owner NOI, five paths compared, and move the inputs yourself. $6,000, priced up front."
      canonical="/feasibility-study"
      breadcrumbs={[{ name: OFFERS.plan.name, href: "/feasibility-study" }]}
      jsonLd={[PLAN_SERVICE_SCHEMA, PLAN_FAQ_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* I · HERO + FORM */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 opacity-30">
          <img src={IMAGES.advisory} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/85 to-obsidian" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <Eyebrow numeral="I" label={`${OFFERS.plan.name} · Hotel feasibility study`} />
              <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
                Know the numbers before you buy, build,
                <br />
                <span className="italic text-brass">or open.</span>
              </h1>
              <p className="mt-9 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
                A feasibility study for anyone buying, building or opening a hotel. Three questions in
                order: is the demand real, does the math work, what is the property worth. The
                written study, a model you can change yourself, and every number made to make
                sense, so the decision is yours to make with confidence. {OFFERS.plan.priceLabel},
                flat, priced up front.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a href="#lead-form" className="btn-brass">
                  {OFFERS.plan.cta} <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#questions" className="link-brass pr-6">
                  The three questions <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <p className="mt-8 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">{TRACK_RECORD_LINE}</p>
            </div>
            <div className="lg:col-span-5">
              <CrmCaptureForm
                heading={OFFERS.plan.cta}
                subheading={`${OFFERS.plan.priceLabel}, flat, priced up front. Tell me about the listing, the deal or the idea, and I will reach out to set up a 20-minute fit call. If a full study is more than the deal needs, I will say so.`}
                footnote="Text consent is optional. The turnaround is discussed on the call."
              />
            </div>
          </div>
        </div>
      </section>

      {/* II · THE MOMENT */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow numeral="II" label="The moment" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                  A listing in hand. An offer in escrow.
                  <br />
                  <span className="italic text-brass">A conversion being penciled.</span>
                </h2>
                <p className="mt-7 text-cream/80 leading-[1.7] max-w-xl">
                  The broker's pro forma looks too good. The lender wants numbers. Nobody at the
                  table has run a front desk. That is the moment the Plan is for: before capital
                  is committed, when changing course is still cheap.
                </p>
                <p className="mt-4 text-cream/80 leading-[1.7] max-w-xl">
                  A broker's pro forma is a sales document. The Plan answers three questions in
                  order, from someone who has run the front desk and priced the rooms, and it is
                  not trying to sell you anything.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="border border-brass/30 bg-card p-7 lg:p-8">
                  <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">
                    What the Plan has caught before
                  </div>
                  <div className="mt-5 grid sm:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
                    {[
                      { v: "$1.17M", l: "the year-one cash outlay behind a year-one NOI of $38K, on the same property. The Plan shows both lines." },
                      { v: "$492K", l: "a year of income beyond the room rate, found on one property walk and priced from local benchmarks." },
                      { v: "5", l: "paths on one set of assumptions: keep it, convert it, expand it, sell it whole, sell it down. Compared on one page." },
                    ].map((s) => (
                      <div key={s.v} className="bg-obsidian p-5">
                        <div className="font-display text-3xl text-cream">{s.v}</div>
                        <div className="mt-1 text-cream/65 text-[0.8125rem] leading-[1.5]">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 border-l border-brass pl-4 text-cream/65 text-sm leading-[1.6]">
                    Six funded hospitality projects with full pro formas and sensitivity scenarios.
                    The numbers from the most recent one are on this page, below.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* III · THREE QUESTIONS */}
      <section id="questions" className="py-20 lg:py-28 bg-obsidian scroll-mt-20">
        <div className="container">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="III" label="Three questions, in order" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              Is the demand real? Does the math work?
              <br />
              <span className="italic text-brass">What is it worth?</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
            {QUESTIONS.map((q, i) => (
              <Reveal key={q.n} delay={i * 100} className="bg-card p-8 lg:p-9">
                <div className="font-display italic text-brass text-2xl mb-3">{q.n}</div>
                <h3 className="font-display text-2xl text-cream mb-4">{q.title}</h3>
                <p className="text-cream/75 text-sm leading-[1.7]">{q.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-8 border border-brass/25 p-6 max-w-3xl">
            <div className="text-[0.62rem] tracking-[0.28em] uppercase text-brass mb-2">What you get</div>
            <p className="text-cream/75 text-sm leading-[1.7]">
              The written study and the working model, built for you to change yourself: every input
              is live, every assumption carries its source, and the unconfirmed ones are marked.
              Move labor, marketing, rate or occupancy and watch the bottom line move. When the next
              listing comes along, plug in its numbers and run it again. And every number explained until
              it makes sense, so the decision is yours to make with confidence. The turnaround is
              stated on the call.
            </p>          </Reveal>
        </div>
      </section>

      {/* IV · THE MODEL, IN YOUR HANDS */}
      <section id="model" className="py-20 lg:py-28 bg-obsidian border-t border-brass/15 scroll-mt-20">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="IV" label="What you get" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
                  The model,
                  <br />
                  <span className="italic text-brass">in your hands.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <p className="text-cream/70 leading-[1.7]">
                  This is a slice of a delivered one, starting from its real numbers. Move the
                  rooms, the rate, the occupancy, the labor and the income beyond the room, and
                  watch the year, the months and the value move with them. The one you keep does
                  this on your property, with about sixty inputs, each with its source, and it is
                  yours for the next listing too.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal delay={150}>
            <PlanModelDemo />
          </Reveal>

          <div className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-10">
            <Reveal className="lg:col-span-7 min-w-0">
              <PlanPaths />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5 min-w-0">
              <PlanAncillary />
            </Reveal>
          </div>

          <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-4">The answers you leave with</div>
                <ul className="space-y-3">
                  {ANSWERS.map((a) => (
                    <li key={a} className="flex gap-3 text-cream/80 text-sm leading-[1.65]">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-brass" aria-hidden="true" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-4">What is in the workbook</div>
                <div className="grid sm:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
                  {WORKBOOK.map((w) => (
                    <div key={w.t} className="bg-card p-5">
                      <div className="font-display text-lg text-cream leading-snug">{w.t}</div>
                      <p className="mt-2 text-cream/60 text-[0.8125rem] leading-[1.55]">{w.d}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-cream/45 text-xs leading-[1.6]">
                  The workbook behind the numbers above: a Plan delivered in September 2026 for an owner weighing five paths on one property, shared with the owner's permission and without the property's name.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* V · HOW IT RUNS */}
      <section className="py-20 lg:py-28 panel-emerald grain border-y border-brass/15">
        <div className="container relative z-10">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="V" label="How it runs" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              Four steps. <span className="italic text-brass">Your decision at the end.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="border-t border-brass/40 pt-4">
                <div className="font-display italic text-brass text-xl">{s.n}</div>
                <div className="mt-2 font-display text-xl text-cream">{s.t}</div>
                <p className="mt-2 text-cream/75 text-sm leading-[1.65]">{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VI · HOW A HOTEL GETS VALUED */}
      <section className="py-20 lg:py-28 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="VI" label="Valuation" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              How to value
              <br />
              <span className="italic text-brass">a hotel or motel.</span>
            </h2>
            <p className="mt-7 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">
              Valuing an independent property, or a motel being considered for a boutique
              conversion, blends three approaches. A credible number uses all three and
              reconciles them, not whichever one the buyer or seller likes best.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10">
            {VALUATION_APPROACHES.map((v, i) => (
              <Reveal key={v.label} delay={i * 100}>
                <v.icon className="w-6 h-6 text-brass mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-cream mb-3">{v.label}</h3>
                <p className="text-cream/70 text-sm leading-[1.7]">{v.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-14 border border-brass/25 bg-card p-8 lg:p-10 max-w-3xl">
            <p className="text-cream/80 text-base lg:text-lg leading-[1.7] italic font-display">
              The spreadsheet gives you a range. Knowing which end of the range is real, because
              you have run the front desk, priced the rooms and staffed the housekeeping
              department, is the part a template cannot do.
            </p>
          </Reveal>
        </div>
      </section>

      {/* VII · THEN */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow numeral="VII" label="Then" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                  Every Launch <span className="italic text-brass">starts with a Plan.</span>
                </h2>
                <p className="mt-7 text-cream/80 leading-[1.7] max-w-xl">
                  If the answer is yes and you are building or opening, the Plan becomes the first
                  chapter of {OFFERS.launch.name}: the budget, the rate architecture and the
                  positioning are already done. If you are buying a hotel that is already open,
                  the Plan hands off to the free audit and the Subscription.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal delay={150} className="flex flex-wrap gap-4 lg:pt-16">
                <Link href={OFFERS.launch.path}>
                  <span className="btn-ghost">
                    {OFFERS.launch.name} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                <Link href={OFFERS.subscription.path}>
                  <span className="btn-ghost">
                    {OFFERS.subscription.name} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                <Link href={OFFERS.audit.path}>
                  <span className="btn-ghost">
                    {OFFERS.audit.name} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* VIII · WHO DOES THE WORK */}
      <OperatorSection numeral="VIII" />

      {/* IX · QUESTIONS */}
      <section className="py-24 lg:py-32 bg-obsidian border-t border-brass/15" aria-label="Frequently Asked Questions">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow numeral="IX" label="Common questions" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
                  Asked by buyers,
                  <br />
                  <span className="italic text-brass">answered plainly.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 50}>
                  <div className={`py-7 border-b border-brass/15 ${i === 0 ? "border-t" : ""}`}>
                    <h3 className="font-display text-xl lg:text-2xl text-cream mb-3 leading-snug">{item.q}</h3>
                    <p className="text-cream/70 text-base leading-[1.75] max-w-3xl">{item.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* X · NEXT STEP */}
      <section className="py-24 lg:py-32 bg-obsidian border-t border-brass/15">
        <div className="container">
          <Reveal className="max-w-3xl">
            <Eyebrow numeral="X" label="Next step" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
              Tell me about
              <br />
              <span className="italic text-brass">the deal.</span>
            </h2>
            <p className="mt-7 text-cream/75 leading-[1.7] max-w-md">
              Five fields, then pick a time for a 20-minute fit call. If the deal does not need
              a full study, we will say so.
            </p>
            <div className="mt-9">
              <a href="#lead-form" className="btn-brass">
                {OFFERS.plan.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
