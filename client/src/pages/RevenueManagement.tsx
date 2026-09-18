/*
 * Ramirez Hospitality Group — The Reserve · THE SUBSCRIPTION
 * Route: /revenue-management (the slug carries the search phrase; the
 * product name /the-subscription redirects here).
 *
 * Copy is the September 9, 2026 subscription page Adam approved, with two
 * later clarifications: no software is included in the fee, and Duetto is
 * the preferred system (required on every plan, with the footnote) at
 * negotiated pricing with no price shown. Prices, terms and plan names read
 * from OFFERS in lib/brand.ts.
 *
 * Sections: hero · where every client starts · three plans + comparison ·
 * how we charge · what you control · proof · questions · next step.
 * Structured data: Service with three Offers, FAQPage from the questions.
 */

import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { OperatorSection } from "@/components/OperatorSection";
import { IMAGES, OFFERS, SOFTWARE, TRACK_RECORD_LINE } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const [ESSENTIALS, GROWTH, INHOUSE] = OFFERS.subscription.plans;

interface Plan {
  key: string;
  name: string;
  line: string;
  priceLabel: string;
  start?: boolean;
  terms?: string[];
  fit: string;
  outcome: string;
  plusLabel?: string;
  includes: string[];
  notAtThisLevel: string;
  hireLine?: string;
}

const PLANS: Plan[] = [
  {
    key: ESSENTIALS.key,
    name: ESSENTIALS.name,
    line: ESSENTIALS.line,
    priceLabel: ESSENTIALS.priceLabel,
    start: true,
    fit: "For one property, rooms bringing in roughly $300,000 to $600,000 a year, where nobody has ever run pricing as a job.",
    outcome:
      "You stop guessing. Your rates move with demand every day, inside floors and ceilings you approve, so the festival weekend is never priced like a Tuesday in February and the slow Tuesday is never priced like a festival.",
    includes: [
      "Your rates reviewed and updated every day, on every site you sell on, inside a floor and a ceiling you approve for each room type. Nothing goes below your floor without your sign-off.",
      "Every event, festival and holiday in your market on a calendar, priced before it sells out.",
      "A weekly check that your own website is never more expensive than the booking sites.",
      "A weekly look at the hotels you compete with: when they move, and what to do about it.",
      "Your booking-site listings scored and fixed: photos, descriptions, amenities, the facts that decide whether you show up.",
      "The direct-booking starter kit: your booking engine checked, and three fixes that move more guests onto your own site.",
      "A one-page report every month you can read on your phone in five minutes, and a 30-minute call to decide what happens next.",
      "Re-scored against your audit on a schedule we put in writing. The number has to move.",
    ],
    notAtThisLevel:
      "answering group inquiries, running paid ads, or building a loyalty program. If the audit finds group business worth chasing, that is Growth or In-House.",
  },
  {
    key: GROWTH.key,
    name: GROWTH.name,
    line: GROWTH.line,
    priceLabel: GROWTH.priceLabel,
    fit: "For one or two properties, rooms bringing in roughly $600,000 to $1.2 million a year, or any owner who wants the daily attention and a forecast to plan around.",
    outcome:
      "The strategies the big chains run, brought to your hotel. A forecast you can staff and budget against, the right mix of booking sites, more guests booking direct, and a disciplined, priced answer ready when a group calls.",
    plusLabel: "Everything in Essentials, plus",
    includes: [
      "A named revenue manager who knows your property. The person on your calls is the person moving your rates.",
      "Every morning we look at what booked overnight and act on the dates booking too fast or too slow.",
      "A rolling forecast of occupancy and revenue, and a yearly budget built with you.",
      "Your booking sites worked as a cost line: which ones earn their commission, which promotions to run and which to turn off, and how to keep your direct share climbing.",
      "Your booking engine and your Google hotel listing set up so direct bookings win.",
      "Group-ready pricing: floors for group blocks, plain-language rules for when a group is worth displacing your regular guests, and quote templates so a wedding or buyout inquiry gets a priced answer instead of a guess.",
      "Your business sorted into segments (regular guests, groups, negotiated accounts, extended stays) and reported every month.",
      "A 60-minute call every two weeks. Same monthly report, same re-score.",
    ],
    notAtThisLevel:
      "a call and a written report every week, your landing page and ads, or the group offer, contracts and listings built in your name (that is In-House). Project work like a loyalty program, guest database and email, a website rebuild, or renegotiating booking-site commissions is quoted on its own.",
  },
  {
    key: INHOUSE.key,
    name: INHOUSE.name,
    line: INHOUSE.line,
    priceLabel: INHOUSE.priceLabel,
    terms: [
      "A six-month commitment to start: two build months, three months running, the first re-score. Then month to month on 30 days' notice.",
      `Settle the six months in one payment and it is ${INHOUSE.prepay} less.`,
    ],
    fit: "Built for rooms bringing in $1.2 million and up a year, 30-plus rooms, or meaningful group and event business. By application. Very large or multi-property situations are quoted individually.",
    outcome:
      "Done for you, done with you. We work inside your own Duetto account five days a week, make the pricing decisions daily, and build your property's demand infrastructure in your name, while you are taught the decisions as we go. A team member without the payroll, HR, insurance or taxes.",
    plusLabel: "Everything in Growth, plus",
    includes: [
      "In your Duetto account five days a week, about an hour to an hour and a half a day.",
      "A weekly call and a weekly report.",
      "A landing page for your property, and Google Ads set up and taught to you.",
      "A new website for your property, designed and built by us and hosted in your name, so the monthly website subscription goes away.",
      "Your group offer and your group rate card.",
      "Sales contract templates.",
      "Listings on the channels where group and negotiated business is found.",
      "You are taught the decisions: how to answer an RFP, how to compare a group piece of business against the transient rates it displaces, and when to say no.",
      "Quarterly on-site visits, with travel and accommodations provided by you.",
    ],
    notAtThisLevel: "outbound selling on your behalf, and nothing on commission. Project work is quoted on its own.",
    hireLine:
      "A full-time salary pays for a seat. The property needs 25 to 30 hours a month of the actual work, and that is what this plan is priced on.",
  },
];

const COMPARISON: [string, string, string, string][] = [
  ["Rates reviewed and updated, inside your floors and ceilings", "Every day", "Every day", "Every day, in your own Duetto account"],
  ["Duetto, our preferred revenue management system", "Not included in the fee. Yours, at negotiated pricing", "Not included in the fee. Yours, at negotiated pricing", "Not included in the fee. Yours, at negotiated pricing"],
  ["What booked overnight, reviewed and acted on", "Weekly", "Every morning", "Every morning, five days a week in your account"],
  ["A named revenue manager on your account", "Shared desk", "Yes", "Yes, on your team"],
  ["Website never more expensive than the booking sites", "Weekly check", "Weekly check", "Weekly check"],
  ["Forecast and yearly budget", "Not included", "Rolling forecast, yearly budget", "Rolling forecast, yearly budget"],
  ["Booking sites worked as a cost line", "Listings scored and fixed", "Full program", "Full program"],
  ["Direct bookings", "Starter kit", "Booking engine and Google listing set up", "Plus a landing page and Google Ads, set up and taught"],
  ["A new website for the property", "Not included", "Project work, quoted on its own", "Included, built and hosted in your name"],
  ["Group inquiries", "Not included", "Priced answers, templates", "Your group offer, rate card and contract templates; you are taught to answer RFPs and when to say no"],
  ["Listings where group and negotiated business is found", "Not included", "Not included", "Included"],
  ["Calls", "30 minutes monthly", "60 minutes every two weeks", "Weekly"],
  ["Report", "One page, monthly", "Monthly, with segments", "Weekly"],
  ["Re-score against your audit", "On a schedule in writing", "On a schedule in writing", "On a schedule in writing"],
  ["On property", "Remote", "Remote", "Each quarter, travel and accommodations provided by you"],
  ["Initial term, then month to month", "Four months", "Four months", "Six months"],
  ["One payment for the term, if you prefer, saves", ESSENTIALS.prepay, GROWTH.prepay, INHOUSE.prepay],
];

const MUTED_CELLS = new Set(["Weekly", "Shared desk", "Not included", "Remote"]);

const HOW_WE_CHARGE = [
  {
    t: "One flat monthly fee",
    p: "No setup fee. No percentage of your revenue. Nothing on commission. The number on this page is the number on the invoice. Compare it to what you paid the booking sites last month, or to one housekeeper's wages. No software is included in the fee. The one cost beside it is your own Duetto subscription, our preferred system, and every client on every plan gets it at specially negotiated pricing: a lower rate than you could get on your own, because we pass our Duetto vendor commission back to you. You hold it and you keep it.",
  },
  {
    t: "Four months to start on Essentials and Growth",
    p: `The first month is all setup: your pricing system configured, your rate plan built room by room, your audit carried into the systems. Then three months of running it, then your first re-score. That is one full cycle, and it is the commitment we ask for. After that, month to month with thirty days' notice, and you leave with every login, listing and document. If you would rather settle the four months in one payment, it is ${ESSENTIALS.prepay} less.`,
  },
  {
    t: "A six-month commitment on In-House",
    p: `Two build months, three months running, then the first re-score in month six. That is the In-House cycle, and it is the commitment we ask for. After that, month to month with thirty days' notice, same as every plan, and everything built in your name stays yours. Settle the six months in one payment and it is ${INHOUSE.prepay} less. Project work is quoted before it starts.`,
  },
];

const CONTROLS = [
  "You set the floors and ceilings for every room type. Nothing goes below your floor without your sign-off.",
  "Any change reversed on request.",
  "You see the reasoning behind every move in a shared log. The monthly report shows each win on its own line.",
  "Your regulars get a protected rate. We manage everyone else.",
  "Results are reported against your market, not just against last year, so a soft season is never dressed up and a good one is never claimed twice.",
  "Named users, role-scoped logins, and access that ends the day you do.",
  "On In-House, a weekly call and a weekly report, and a visit on property each quarter, with travel and lodging provided by you.",
  "A revenue management system is required on every plan and is not included in the fee. Duetto is the system we prefer and set up by default, at specially negotiated pricing for every client on every plan. If you already run a system you prefer, tell us on the call and we will consider working inside it. Every rate plan, rule and piece of data we build lives in your account and belongs to you.",
  "After the first cycle, thirty days' notice ends the agreement. No renewal to sign, no term to re-up.",
];

const PROOF = [
  { v: "41", l: "out of 100, grade D. The Lincoln, Marfa, Texas." },
  { v: "$55K", l: "to $185,000 in annual revenue opportunity identified on a $444,000 base." },
  { v: "270", l: "more room nights sold in year two, at lower rates, for the same revenue. Pricing by feel." },
  { v: "1", l: "review out of 66 mentioned price. The guests did not think the hotel was cheap. Only the rate sheet did." },
];

const FAQ = [
  {
    q: "Will you price me out of my own market?",
    a: "You set the floor and the ceiling for every room type. Nothing goes below your floor without your sign-off, and every change is logged with the reason. Your regulars get a protected rate.",
  },
  {
    q: "Software does this for a fraction of the price. Why you?",
    a: "Duetto will price your rooms well, if someone sits in it every day, reads what booked overnight and turns it into action. The software is a tool for the person using it, and it is only as good as the discipline behind it. You are already running the front desk, the housekeeping schedule and the guests. Let the revenue work be ours: you focus on your guests, we focus on the revenue, so you can keep being the hotelier. One flat monthly fee, nothing on commission.",
  },
  {
    q: "Do you take a commission?",
    a: "No. A flat monthly fee, printed on this page. Nothing on commission.",
  },
  {
    q: "How will I know it was you and not the market?",
    a: "Your results are reported against your market, not just against last year: your share of the market's revenue, split into rate and occupancy, net of commission. The baseline is fixed in the audit before we change anything.",
  },
  {
    q: "Do I need new software?",
    a: "A revenue management system is required on every plan and is not included in the fee. Duetto is the system we prefer and set up by default, at specially negotiated pricing for every client on every plan. If you already run a system you prefer, tell us on the call and we will consider working inside it. We are a contracted Duetto vendor and the commission Duetto would pay us goes back to you as a lower rate than you could get on your own. We set it up and run it in your name, and it stays yours.",
  },
  {
    q: "What is the catch with the free audit?",
    a: "At the end we ask whether you want help fixing the three lowest scores. The report is yours either way, including the two most valuable fixes written out in full.",
  },
  {
    q: "Why a four-month start, and six on In-House?",
    a: "Because the first month is all setup and the fourth is your re-score. On In-House the build takes two months, so the first re-score lands in month six. Judging the work before the first cycle is complete would be judging the setup, not the result. After that it is month to month with thirty days' notice, and we would rather earn the next month than lock you into it.",
  },
  {
    q: "What if it does not work for us?",
    a: "You see the reasoning behind every rate move as it happens, and your first re-score puts a number on it. After the first cycle, thirty days' notice ends the agreement and you leave with every login, listing and document.",
  },
];

// ─── Structured data ─────────────────────────────────────────────────────────

const RM_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ramirezhospitality.com/revenue-management#service",
  name: "Hotel Revenue Management Subscription",
  description:
    "Revenue management for independent and boutique hotels, motels and inns: prices set every day inside floors and ceilings the owner sets, booking sites worked as a cost line, groups priced right. Three plans, flat: Essentials $1,250, Growth $2,000, In-House $5,000 a month. Nothing on commission. No software included in the fee; a revenue management system is required on every plan, Duetto by default at negotiated pricing, an existing system considered on request. One full cycle to start (four months, six on In-House), then month to month.",
  provider: { "@id": "https://ramirezhospitality.com/#organization" },
  serviceType: "Hotel Revenue Management",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://ramirezhospitality.com/revenue-management",
  offers: OFFERS.subscription.plans.map((p) => ({
    "@type": "Offer",
    name: `${p.name}: ${p.line}`,
    description: `${p.band}. ${p.term}. One payment for the term saves ${p.prepay}.`,
    price: String(p.price),
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(p.price),
      priceCurrency: "USD",
      unitText: "month",
    },
  })),
};

const RM_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function AuditCta({ ghost = false }: { ghost?: boolean }) {
  return (
    <a href={OFFERS.audit.formPath} className={ghost ? "btn-ghost w-full justify-center" : "btn-brass w-full justify-center"}>
      {OFFERS.audit.cta} <ArrowRight className="w-4 h-4" />
    </a>
  );
}

export default function RevenueManagement() {
  return (
    <PageLayout
      title="Hotel Revenue Management Subscription: Essentials, Growth, In-House | Ramirez Hospitality Group"
      description="Your prices set every day, your booking sites worked, your groups priced right. Essentials $1,250, Growth $2,000, In-House $5,000 a month. Flat, nothing on commission. Starts with the free Modern Hotel Audit."
      canonical="/revenue-management"
      breadcrumbs={[{ name: "The Subscription", href: "/revenue-management" }]}
      jsonLd={[RM_SERVICE_SCHEMA, RM_FAQ_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* I · HERO */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 opacity-25">
          <img src={IMAGES.revenue} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/85 to-obsidian" />
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label={OFFERS.subscription.name} />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Your prices set every day.
              <br />
              Your booking sites worked.
              <br />
              <span className="italic text-brass">Your groups priced right.</span>
            </h1>
            <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl">
              The revenue department every big hotel has, built for independent and boutique hoteliers.
              Run by an operator, inside rules you set. One flat monthly fee. No software is
              included in the fee. One full cycle to start, then month to month.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href={OFFERS.audit.formPath} className="btn-brass">
                {OFFERS.audit.cta} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#plans" className="link-brass pr-6">
                See the three plans <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="mt-10 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">{TRACK_RECORD_LINE}</p>
          </div>
        </div>
      </section>

      {/* II · WHERE EVERY CLIENT STARTS */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow numeral="II" label="Where every client starts" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                  One audit. The whole property, scored,
                  <br />
                  <span className="italic text-brass">and sized in dollars.</span>
                </h2>
                <p className="mt-7 text-cream/80 leading-[1.7] max-w-xl">
                  Free. Your property scored out of 100 across seven areas, every finding priced
                  in dollars, and the evidence behind each number. The two most valuable fixes are
                  written out in full, yours to keep whether we work together or not. Every finding
                  is tagged to the cheapest plan that captures it, so the plan decision is
                  arithmetic, not a pitch.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="border border-brass/30 bg-card p-7 lg:p-8">
                  <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">
                    The Lincoln, Marfa, Texas
                  </div>
                  <div className="mt-5 grid sm:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
                    {[
                      { v: "41", l: "out of 100, grade D, on a property guests love" },
                      { v: "$55,000", l: "to $185,000 identified, on a $444,000 base" },
                      { v: "$59", l: "more a night guests paid on Expedia than on the hotel's own site" },
                    ].map((s) => (
                      <div key={s.v} className="bg-obsidian p-5">
                        <div className="font-display text-3xl text-cream">{s.v}</div>
                        <div className="mt-1 text-cream/65 text-[0.8125rem] leading-[1.5]">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 border-l border-brass pl-4 text-cream/65 text-sm leading-[1.6]">
                    The catch, in full: at the end we ask whether you want help fixing the three
                    lowest scores. That is the whole catch.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* III · THREE PLANS */}
      <section id="plans" className="py-24 lg:py-36 bg-obsidian scroll-mt-20">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <Reveal>
              <Eyebrow numeral="III" label="Three plans" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
                Kind of work sets the plan.
                <br />
                <span className="italic text-brass">Not the size of the hotel.</span>
              </h2>
              <p className="mt-7 text-cream/75 leading-[1.7] max-w-2xl">
                The difference between plans is what gets done and how often. Project work is
                quoted on its own so the monthly fee stays honest.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-brass/15 border border-brass/15 items-stretch">
            {PLANS.map((plan, i) => (
              <Reveal
                key={plan.key}
                delay={i * 100}
                className={`relative flex flex-col p-8 lg:p-9 ${plan.start ? "panel-emerald" : "bg-obsidian"}`}
              >
                {plan.start && (
                  <div className="absolute -top-3 left-8 bg-brass text-obsidian text-[0.6rem] tracking-[0.26em] uppercase font-bold px-3 py-1.5">
                    Where most hotels start
                  </div>
                )}
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">{plan.name}</div>
                <div className="mt-3 font-display italic text-2xl text-cream leading-[1.25]">{plan.line}</div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl lg:text-5xl text-cream">{plan.priceLabel}</span>
                  <span className="text-cream/50 text-sm">a month</span>
                </div>
                {plan.terms?.map((t) => (
                  <p key={t} className="mt-2.5 text-brass-soft text-[0.8125rem] leading-[1.55]">{t}</p>
                ))}
                <p className="mt-4 text-cream/65 text-[0.8125rem] leading-[1.6]">{plan.fit}</p>
                <p className="mt-4 text-cream text-[0.9rem] leading-[1.6]">{plan.outcome}</p>
                {plan.plusLabel && (
                  <div className="mt-6 text-[0.62rem] tracking-[0.28em] uppercase text-brass">{plan.plusLabel}</div>
                )}
                <ul className={`${plan.plusLabel ? "mt-3" : "mt-6"} space-y-2.5 text-[0.8375rem] text-cream/80 leading-[1.55]`}>
                  {plan.includes.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 pt-4 border-t border-brass/15 text-cream/50 text-[0.8rem] leading-[1.6]">
                  <span className="text-cream/65 font-medium">Not at this level:</span> {plan.notAtThisLevel}
                </p>
                {plan.hireLine && (
                  <p className="mt-4 pt-3 border-t border-dashed border-brass/30 text-brass-soft text-[0.8rem] italic leading-[1.55]">
                    {plan.hireLine}
                  </p>
                )}
                <div className="mt-auto pt-7">
                  <AuditCta ghost={!plan.start} />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Comparison table */}
          <Reveal delay={200} className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-[0.8375rem] min-w-[720px]">
              <thead>
                <tr>
                  {["What gets done", ESSENTIALS.name, GROWTH.name, INHOUSE.name].map((h) => (
                    <th key={h} className="text-left px-4 py-3.5 border-b border-brass/20 text-[0.62rem] tracking-[0.28em] uppercase text-brass font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-4 py-3.5 border-b border-brass/10 align-top leading-[1.5] ${
                          ci === 0 ? "text-cream w-[30%]" : MUTED_CELLS.has(cell) ? "text-cream/45" : "text-cream/80"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="mt-5 text-cream/45 text-xs leading-[1.6] max-w-3xl">{SOFTWARE.footnote}</p>
        </div>
      </section>

      {/* IV · HOW WE CHARGE */}
      <section className="py-24 lg:py-32 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="IV" label="How we charge" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              One flat fee.
              <br />
              <span className="italic text-brass">One full cycle to start.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
            {HOW_WE_CHARGE.map((c, i) => (
              <Reveal key={c.t} delay={i * 100} className="bg-card p-7 lg:p-8">
                <h3 className="font-display text-2xl text-cream mb-4">{c.t}</h3>
                <p className="text-cream/75 text-[0.875rem] leading-[1.7]">{c.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* V · WHAT YOU CONTROL */}
      <section className="py-24 lg:py-32 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="V" label="What you control" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              Your rules. <span className="italic text-brass">Our desk.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl">
            {CONTROLS.map((line, i) => (
              <Reveal key={line} delay={i * 60} className="flex gap-4 text-cream/80 text-[0.9375rem] leading-[1.65]">
                <span className="mt-3 h-px w-4 bg-brass shrink-0" />
                <span>{line}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VI · PROOF */}
      <section className="py-24 lg:py-32 panel-emerald grain border-y border-brass/15">
        <div className="container relative z-10">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="VI" label="Proof" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              A hotel guests love, <span className="italic text-brass">scored a D.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brass/15 border border-brass/15">
            {PROOF.map((p, i) => (
              <Reveal key={p.v} delay={i * 100} className="bg-obsidian p-7">
                <div className="font-display text-4xl lg:text-5xl text-cream leading-none">{p.v}</div>
                <p className="mt-3 text-cream/65 text-[0.8125rem] leading-[1.55]">{p.l}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <p className="mt-10 font-display italic text-2xl text-cream/80 max-w-3xl leading-[1.45]">
              A D on a well-reviewed property is not an insult. It is an A-grade asset with no
              revenue function yet, the cheapest problem in hospitality to fix.
            </p>
          </Reveal>
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
                <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                  Asked by owners,
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
              Get the property scored
              <br />
              <span className="italic text-brass">before you decide.</span>
            </h2>
            <p className="mt-7 text-cream/75 leading-[1.7] max-w-md">
              Five fields, then we reach out to set up a 20-minute call. If it is not a fit, we will say
              so.
            </p>
            <div className="mt-9">
              <a href={OFFERS.audit.formPath} className="btn-brass">
                {OFFERS.audit.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
