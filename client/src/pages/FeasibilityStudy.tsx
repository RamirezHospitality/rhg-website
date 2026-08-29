/*
 * Ramirez Hospitality Group — The Reserve · HOTEL FEASIBILITY STUDY
 *
 * New page, added to close a keyword gap found in Google Keyword Planner
 * research (RHG-KP-Wave exports, Aug 2026): "hotel feasibility study,"
 * "hotel market feasibility study," and "boutique hotel feasibility study"
 * are all searched at meaningful volume with High competition, and the site
 * had no dedicated page for the phrase — only a single passing mention on
 * Case Studies. This page also folds in the smaller "how to value a
 * hotel/motel" cluster (Section IV), since a feasibility study is where
 * that question actually gets answered — a standalone page for valuation
 * alone wasn't warranted at that search volume.
 *
 * Reuses the same LeadForm -> BookingCalendar flow, AuditSection,
 * PricingSection, and OperatorSection as /audit and the homepage, so the
 * offer reads identically everywhere it appears on the site.
 */

import { ArrowRight, TrendingUp, Building2, Users } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/lp/LeadForm";
import { AuditSection } from "@/components/audit/AuditSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { OperatorSection } from "@/components/OperatorSection";
import { BRAND, IMAGES } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const FEASIBILITY_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ramirezhospitality.com/feasibility-study#service",
  name: "Hotel Feasibility Study",
  description:
    "Market and financial feasibility studies for independent and boutique hotels, motels, and hospitality developments — demand and competitive-set analysis, ADR and RevPAR projections, pro forma and valuation, and a go/no-go recommendation from an operator, not a broker or a banker.",
  provider: { "@id": "https://ramirezhospitality.com/#organization" },
  serviceType: "Hotel Feasibility Study",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://ramirezhospitality.com/feasibility-study",
  offers: {
    "@type": "Offer",
    name: "Hotel Feasibility Study",
    description: "Scoped and quoted on the fit call, as part of the Asset & Acquisition Advisory practice. Starts with a free Modern Hotel Audit conversation.",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "0",
      priceCurrency: "USD",
      description: "The initial fit call — The Modern Hotel Audit — is free. The full feasibility engagement is quoted separately, scoped to the property.",
    },
  },
};

const FEASIBILITY_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in a hotel feasibility study?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hotel feasibility study answers three questions: is there demand (market feasibility — competitive set, demand generators, ADR and RevPAR projections), does the math work (financial feasibility — construction or acquisition cost, pro forma, financing, and a valuation), and can it actually be run (operational feasibility — brand fit, staffing model, and a realistic path to stabilized occupancy). At Ramirez Hospitality Group, all three come from someone who has opened and repositioned hotels, not just modeled them.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a hotel feasibility study cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no fixed price — a feasibility study is scoped and quoted on the fit call based on the property's size, market, and how much of the market, financial, and operational analysis is needed. It falls under the Asset & Acquisition Advisory practice and is priced the same way: discreet, fast, and quoted before any work starts. The fit call itself, The Modern Hotel Audit, is free.",
      },
    },
    {
      "@type": "Question",
      name: "How do you value a hotel or motel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hotel valuation typically blends three approaches: the income approach (capitalizing stabilized net operating income at a market cap rate), the sales-comparison approach (RevPAR or price-per-key multiples from comparable transactions), and the cost approach (replacement cost less depreciation, most relevant for new construction or heavy renovation). A credible valuation for an independent or boutique property needs an operator's read on achievable ADR and expense ratios, not just a spreadsheet — the same seven-dimension lens used in The Modern Hotel Audit.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a feasibility study before buying or opening a hotel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, before signing a purchase agreement, breaking ground, or converting a property into a boutique hotel. A feasibility study is what stands between a decision made on emotion and one made on evidence — it either confirms the deal, prices it correctly, or tells you to walk before you have spent real money. Every Ramirez Hospitality Group engagement, including feasibility work, starts with a free Modern Hotel Audit conversation to see what level of study the deal actually needs.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a hotel feasibility study and The Modern Hotel Audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Modern Hotel Audit scores a property that already exists and is already operating, across seven dimensions, and is free. A hotel feasibility study is for a decision that has not been made yet — buying, building, or converting a property — and covers market demand, pro forma, and valuation for a property that may not be running yet, or not running as a hotel. Both come from the same operator and the same evidence-first approach; the audit is the free starting conversation for either.",
      },
    },
  ],
};

const VALUATION_APPROACHES = [
  {
    icon: TrendingUp,
    label: "Income approach",
    body:
      "Stabilized net operating income, capitalized at a market-appropriate rate. The most-used method for an operating hotel, and the one most sensitive to whether the NOI projection is realistic — which is where an operator's eye on achievable ADR, occupancy, and expense ratios matters most.",
  },
  {
    icon: Building2,
    label: "Sales-comparison approach",
    body:
      "RevPAR multiples and price-per-key figures from comparable transactions in the same market and class. Useful as a sanity check, weak on its own for a truly independent or boutique property where 'comparable' is doing a lot of work.",
  },
  {
    icon: Users,
    label: "Cost approach",
    body:
      "Replacement cost less depreciation — land, construction, and FF&E to build the same asset today. Most relevant for new construction, a heavy renovation, or a motel-to-boutique conversion where there is no operating history to capitalize yet.",
  },
];

export default function FeasibilityStudy() {
  return (
    <PageLayout
      title="Hotel Feasibility Study — Market, Financial & Valuation Analysis | Ramirez Hospitality Group"
      description="Hotel and boutique hotel feasibility studies from an operator, not a broker: market demand, ADR and RevPAR projections, pro forma, and valuation, before you buy, build, or convert a property. Starts with a free Modern Hotel Audit call."
      canonical="/feasibility-study"
      breadcrumbs={[{ name: "Feasibility Study", href: "/feasibility-study" }]}
      jsonLd={[FEASIBILITY_FAQ_SCHEMA, FEASIBILITY_SERVICE_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO + FORM */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 opacity-30">
          <img src={IMAGES.advisory} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/85 to-obsidian" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <Eyebrow numeral="I" label="Before you commit capital" />
              <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
                Know the numbers
                <br />
                <span className="italic text-brass">before you buy, build, or open.</span>
              </h1>
              <p className="mt-9 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
                A hotel feasibility study answers whether the demand is real, whether the
                math works, and what the property is actually worth — market analysis,
                pro forma, and valuation from an operator who has opened 8 hotels and
                repositioned 4 more, not a broker with a template.
              </p>
              <p className="mt-8 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">
                10+ years · 50+ hospitality properties · Operator-side experience
              </p>
            </div>
            <div className="lg:col-span-5">
              <LeadForm
                source="feasibility-study"
                heading="Start With The Modern Hotel Audit"
                subheading="Feasibility work starts here, free, no strings. Tell me about the property or the deal, then pick a time for a 20-minute fit call to scope what level of study it actually needs."
              />
            </div>
          </div>
        </div>
      </section>

      {/* II · WHAT A FEASIBILITY STUDY ANSWERS */}
      <section className="py-20 lg:py-28 bg-obsidian border-t border-brass/15">
        <div className="container">
          <Reveal className="max-w-3xl mb-14">
            <Eyebrow numeral="II" label="Three questions, in order" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              Market feasibility.
              <br />
              <span className="italic text-brass">Financial feasibility. Then the decision.</span>
            </h2>
            <p className="mt-7 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">
              A real hotel feasibility study — whether for a ground-up build, an acquisition,
              or converting an existing property into a boutique hotel — has to answer all
              three of these, in order. Skip one and the number you end up with is a guess.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
            {[
              {
                n: "01",
                title: "Is there demand?",
                body: "Competitive set, demand generators, seasonality, and a realistic ADR and RevPAR projection for the property's actual positioning — not the positioning the seller wants you to see.",
              },
              {
                n: "02",
                title: "Does the math work?",
                body: "Construction or acquisition cost, financing structure, a stabilized pro forma, and a valuation built on the income, sales-comparison, and cost approaches — not just one of them.",
              },
              {
                n: "03",
                title: "Can it be run?",
                body: "Brand fit, staffing model, systems, and a realistic path to stabilized occupancy. The number on paper only means something if the property can actually operate to it.",
              },
            ].map((s) => (
              <Reveal key={s.n} className="bg-obsidian p-8 lg:p-10">
                <div className="font-display italic text-brass text-2xl mb-4">{s.n}</div>
                <h3 className="font-display text-xl lg:text-2xl text-cream mb-4">{s.title}</h3>
                <p className="text-cream/70 text-sm leading-[1.7]">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* III · THE AUDIT AS THE STARTING POINT */}
      <AuditSection numeral="III" />

      {/* IV · HOW TO VALUE A HOTEL OR MOTEL */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <Reveal className="max-w-3xl mb-14">
            <Eyebrow numeral="IV" label="Valuation" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              How to value
              <br />
              <span className="italic text-brass">a hotel or motel.</span>
            </h2>
            <p className="mt-7 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">
              Valuing an independent or boutique property, or a motel being considered for
              a boutique conversion, blends three approaches. A credible number uses all
              three and reconciles them — not whichever one the buyer or seller likes best.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10">
            {VALUATION_APPROACHES.map((v) => (
              <Reveal key={v.label}>
                <v.icon className="w-6 h-6 text-brass mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-cream mb-3">{v.label}</h3>
                <p className="text-cream/70 text-sm leading-[1.7]">{v.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-14 border border-brass/25 bg-obsidian/60 p-8 lg:p-10 max-w-3xl">
            <p className="text-cream/80 text-base lg:text-lg leading-[1.7] italic font-display">
              "The spreadsheet gives you a range. Knowing which end of the range is real —
              because you have actually run the front desk, priced the rooms, and staffed
              the housekeeping department — is the part a template can't do."
            </p>
          </Reveal>
        </div>
      </section>

      {/* V · WHAT IT COSTS TO RUN IT AFTER */}
      <PricingSection numeral="V" />

      {/* VI · WHO DOES THE WORK */}
      <OperatorSection numeral="VI" />

      {/* VII · FAQ (GEO: AI search extraction + featured snippets) */}
      <section className="relative py-24 lg:py-32 bg-obsidian border-t border-brass/15" aria-label="Frequently Asked Questions">
        <div className="container">
          <Reveal className="max-w-3xl mb-14">
            <Eyebrow numeral="VII" label="Common Questions" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
              Questions about
              <br />
              <span className="italic text-brass">feasibility and valuation.</span>
            </h2>
          </Reveal>

          <div className="max-w-3xl space-y-0">
            {FEASIBILITY_FAQ_SCHEMA.mainEntity.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="border-b border-brass/15 py-8">
                  <h3 className="font-display text-xl lg:text-2xl text-cream mb-4 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-cream/70 text-base leading-[1.75]">{item.acceptedAnswer.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIII · CLOSING CTA */}
      <section className="py-24 lg:py-32 bg-obsidian border-t border-brass/15">
        <div className="container">
          <Reveal className="max-w-3xl">
            <Eyebrow numeral="VIII" label="Next step" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
              Tell me about
              <br />
              <span className="italic text-brass">the deal.</span>
            </h2>
            <p className="mt-7 text-cream/75 leading-[1.7] max-w-md">
              Five fields, then pick a time for a 20-minute fit call. If the deal does not
              need a full feasibility study, I will say so.
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
