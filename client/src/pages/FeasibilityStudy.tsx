/*
 * Ramirez Hospitality Group — The Reserve · THE MODERN HOTEL PLAN
 * Route: /feasibility-study (the slug carries the search phrase "hotel
 * feasibility study"; /the-modern-hotel-plan and /plan redirect here).
 *
 * The feasibility study, productized per the September 9, 2026 offer brief:
 * $6,000, flat, priced up front, for anyone buying, building or opening a
 * hotel under 50 rooms. Three questions in order. The CTA is "Book The
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
import { IMAGES, OFFERS, TRACK_RECORD_LINE } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const QUESTIONS = [
  {
    n: "One",
    title: "Is the demand real?",
    body: "The hotels you would compete with, what actually drives people to the market, the seasons, and a rate and occupancy projection for the property's real positioning, not the positioning the seller wants you to see.",
  },
  {
    n: "Two",
    title: "Does the math work?",
    body: "Purchase or build cost, the money you borrow and what it costs, a stabilized year-by-year model, and what happens to your loan coverage if rate or occupancy is off by ten percent.",
  },
  {
    n: "Three",
    title: "What is the property worth?",
    body: "Valued three ways, by income, by comparable sales and by cost, reconciled to one number and a range. And which of the three your lender will actually believe.",
  },
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
    t: "The answer",
    p: "The study and the model, walked through on a call. Yes, no, or not at this price, and what the property would have to earn to change the answer.",
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
    a: "A broker's pro forma is a sales document. The Plan answers three questions in order, from someone who has run the front desk and priced the rooms, and it is allowed to say no.",
  },
  {
    q: "How much does a hotel feasibility study cost?",
    a: `The Modern Hotel Plan is ${OFFERS.plan.priceLabel}, flat, priced up front, for a hotel under 50 rooms. Very large or unusual projects are quoted individually on the call.`,
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
    q: "What if the answer is no?",
    a: `Then you have paid ${OFFERS.plan.priceLabel} to not commit the rest. The model is yours, and the next listing can be run through it.`,
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
    "A hotel feasibility study for anyone buying, building or opening a hotel under 50 rooms. Three questions in order: is the demand real (market, competitive set, rate and occupancy projection), does the math work (cost, financing, stabilized model, sensitivity), what is the property worth (income, comparable sales and cost approaches, reconciled). The deliverable is the study, the working model, and a clear yes, no, or not at this price. $6,000, flat, priced up front.",
  provider: { "@id": "https://ramirezhospitality.com/#organization" },
  serviceType: "Hotel Feasibility Study",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://ramirezhospitality.com/feasibility-study",
  offers: {
    "@type": "Offer",
    name: OFFERS.plan.name,
    description: "Flat, priced up front, for a hotel under 50 rooms. Very large or unusual projects quoted individually.",
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
      description="Know the numbers before you buy, build or open a hotel under 50 rooms. Is the demand real, does the math work, what is it worth. The study, the model, and a clear yes, no, or not at this price. $6,000, priced up front."
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
                A feasibility study for anyone buying, building or opening a hotel under 50
                rooms. Three questions in order: is the demand real, does the math work, what is
                the property worth. The study, the model, and a clear yes, no, or not at this
                price. {OFFERS.plan.priceLabel}, flat, priced up front.
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
                  is committed, when a clear no is still cheap.
                </p>
                <p className="mt-4 text-cream/80 leading-[1.7] max-w-xl">
                  A broker's pro forma is a sales document. The Plan answers three questions in
                  order, from someone who has run the front desk and priced the rooms, and it is
                  allowed to say no.
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
                      { v: "75%", l: "occupancy assumed in a pro forma, in a market running 58%" },
                      { v: "3", l: "ways to value the same property: income, comparable sales, cost. The lender believes one of them." },
                      { v: "No", l: "is a complete answer. The deal that should have been a no costs less than the one that closed." },
                    ].map((s) => (
                      <div key={s.v} className="bg-obsidian p-5">
                        <div className="font-display text-3xl text-cream">{s.v}</div>
                        <div className="mt-1 text-cream/65 text-[0.8125rem] leading-[1.5]">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 border-l border-brass pl-4 text-cream/65 text-sm leading-[1.6]">
                    Six funded hospitality projects with full pro formas and sensitivity scenarios.
                    Named cases are shared on the call once approved.
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
              The written study, the working model you can change yourself, and a clear yes, no,
              or not at this price. The turnaround is stated on the call.
            </p>
          </Reveal>
        </div>
      </section>

      {/* IV · HOW IT RUNS */}
      <section className="py-20 lg:py-28 panel-emerald grain border-y border-brass/15">
        <div className="container relative z-10">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="IV" label="How it runs" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              Four steps. <span className="italic text-brass">One decision at the end.</span>
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

      {/* V · HOW A HOTEL GETS VALUED */}
      <section className="py-20 lg:py-28 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="V" label="Valuation" />
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

      {/* VI · THEN */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow numeral="VI" label="Then" />
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

      {/* VII · WHO DOES THE WORK */}
      <OperatorSection numeral="VII" />

      {/* VIII · QUESTIONS */}
      <section className="py-24 lg:py-32 bg-obsidian border-t border-brass/15" aria-label="Frequently Asked Questions">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow numeral="VIII" label="Common questions" />
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

      {/* IX · NEXT STEP */}
      <section className="py-24 lg:py-32 bg-obsidian border-t border-brass/15">
        <div className="container">
          <Reveal className="max-w-3xl">
            <Eyebrow numeral="IX" label="Next step" />
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
