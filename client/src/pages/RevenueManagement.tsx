/*
 * Ramirez Hospitality Group — The Reserve · REVENUE MANAGEMENT
 * Flagship subscription page. Anchor comparison, three tiers,
 * differentiator block, tech stack strip.
 */

import { ArrowRight, Check, Star } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { BRAND, IMAGES } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const RM_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ramirezhospitality.com/revenue-management#service",
  name: "Hotel Revenue Management Subscription",
  description:
    "A flat-fee, month-to-month revenue management subscription for independent and boutique hotels. Includes daily pricing management, OTA optimization, direct booking strategy, and rewards program development. Three tiers: Essentials ($850/mo), Growth ($1,500/mo), Enterprise ($2,500/mo).",
  provider: { "@id": "https://ramirezhospitality.com/#organization" },
  serviceType: "Hotel Revenue Management",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://ramirezhospitality.com/revenue-management",
  offers: [
    {
      "@type": "Offer",
      name: "Essentials — Revenue Management Subscription",
      description: "For 10–40 key properties. Daily pricing management, OTA optimization, comp-set monitoring, monthly strategy call, direct booking starter kit.",
      price: "850",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "850", priceCurrency: "USD", unitText: "month" },
    },
    {
      "@type": "Offer",
      name: "Growth — Revenue Management Subscription",
      description: "For 30–80 key boutique hotels. Full OTA optimization, direct booking strategy, loyalty program development, group sales playbook.",
      price: "1500",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "1500", priceCurrency: "USD", unitText: "month" },
    },
    {
      "@type": "Offer",
      name: "Enterprise — Revenue Management Subscription",
      description: "For 80+ key properties and small portfolios. Fractional Director of Revenue, full group sales, quarterly on-site visits, portfolio dashboards.",
      price: "2500",
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "2500", priceCurrency: "USD", unitText: "month" },
    },
  ],
};

const RM_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in the hotel revenue management subscription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All three tiers include: RMS access at preferred rates (Hotelitix or comparable), dynamic pricing management driven by AI plus operator oversight, comp-set monitoring, weekly rate-parity audits across all OTAs, monthly performance reports, OTA content scoring and listing optimization, and a direct-booking starter kit. Growth and Enterprise tiers add full OTA performance optimization, direct booking strategy, loyalty program development, and group sales playbooks.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a long-term contract for the revenue management subscription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All Ramirez Hospitality Group revenue management subscriptions are month-to-month with no long-term contracts. You can cancel at any time.",
      },
    },
    {
      "@type": "Question",
      name: "What size hotels does the revenue management subscription serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Essentials tier is designed for 10–40 key properties including inns, motels, and small boutiques. The Growth tier serves 30–80 key boutique and independent hotels. The Enterprise tier serves 80+ key properties, small portfolios, and management companies.",
      },
    },
  ],
};

const TIERS = [
  {
    name: "Essentials",
    subtitle: "Pricing Discipline",
    price: "$850",
    cadence: "/ month",
    pricePrefix: "Starting at",
    description:
      "For 10–40 keys. Inns, motels, small boutiques, and owner-operators who want a real revenue strategist setting prices every day.",
    features: [
      "RMS access included at preferred rates (Hotelitix or comparable)",
      "Dynamic pricing management driven by AI + my oversight",
      "Comp-set monitoring + weekly rate-parity audit across all OTAs",
      "Monthly 30-minute revenue strategy call",
      "Monthly performance report",
      "OTA content scoring + listing optimization (photos, descriptions, amenities, property facts)",
      "Direct-booking starter kit: booking-engine audit + three concrete conversion recommendations",
      "Ad-hoc email support, business hours",
    ],
  },
  {
    name: "Growth",
    subtitle: "Revenue Operating System",
    price: "$1,500",
    cadence: "/ month",
    pricePrefix: "Starting at",
    description:
      "For 30–80 keys. Boutique and independent hotels ready to lift RevPAR, grow direct bookings, and build a repeat-guest engine.",
    featured: true,
    badge: "Most Popular",
    features: [
      "Everything in Essentials, plus:",
      "Daily pricing management and optimization",
      "Demand forecasting, pace reporting, and monthly budgeting",
      "Full OTA Performance Optimization — rate-parity policing, visibility-algorithm tuning (Expedia, Booking, Hotels.com), commissions renegotiation, Preferred Partner & Genius management, OTA promotional builds",
      "Direct Booking Strategy build — metasearch bidding (Google Hotel Ads, Kayak, Trivago), website conversion optimization, book-direct incentive architecture, CRM/email integration (Revinate or comparable)",
      "Rewards & Loyalty Program development — tier design, repeat-guest workflows, partner-perk stacking",
      "Group Sales Playbook (basic) — group-rate recommendations, lead capture scripts, basic displacement analysis",
      "Bi-weekly 60-minute revenue strategy calls",
      "Segmentation and channel-mix analysis",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "Embedded Revenue Team",
    price: "$2,500",
    cadence: "/ month",
    pricePrefix: "Starting at",
    description:
      "For 80+ keys, small portfolios, and management companies that want a fractional Director of Revenue who shows up like an in-house executive.",
    suffix: "Performance incentive available",
    features: [
      "Everything in Growth, plus:",
      "Full RMS build-out and ongoing oversight — Hotelitix, Duetto, or Light House selected to fit the property",
      "Full Group Sales Playbook — strategy, advanced displacement analysis, contract negotiation, corporate and wholesale agreement management",
      "Full access to my expertise and strategies — nothing held back",
      "Sales Strategy Consulting — positioning, packaging, rate-fence design, channel strategy, seasonal campaigns, partnerships",
      "Targeted Ad Spend Consulting — metasearch and paid-search strategy, budget allocation, ROI reporting (Google Hotel Ads, paid social, programmatic)",
      "Channel-manager management and distribution-cost engineering",
      "True one-on-one client relationship — weekly 60-minute calls, priority phone and text access during business hours",
      "Quarterly on-site visits (travel and lodging expensed to client at cost)",
      "Portfolio-level dashboards for multi-property operators",
      "Direct involvement in annual budget process and ownership reporting",
      "Performance incentive available — base retainer + % of incremental RevPAR lift above baseline",
    ],
  },
];

export default function RevenueManagement() {
  return (
    <PageLayout
      title="Hotel Revenue Management Subscription for Independent & Boutique Hotels | Ramirez Hospitality Group"
      description="Flat-fee, month-to-month revenue management for independent and boutique hotels. Daily pricing, OTA optimization, direct booking strategy, and loyalty program development. Three tiers: Essentials ($850/mo), Growth ($1,500/mo), Enterprise ($2,500/mo). No long-term contracts."
      canonical="/revenue-management"
      breadcrumbs={[{ name: "Revenue Management Subscription", href: "/revenue-management" }]}
      jsonLd={[RM_SERVICE_SCHEMA, RM_FAQ_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden bg-obsidian">
        <div className="absolute inset-0 opacity-25">
          <img src={IMAGES.revenue} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/85 to-obsidian" />
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="Revenue Management" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Daily pricing discipline.
              <br />
              Monthly clarity.
              <br />
              <span className="italic text-brass">Annual revenue that actually grows.</span>
            </h1>
            <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl">
              A revenue management subscription built for independent hotels, boutique
              properties, and small portfolios. Operator-led. AI-powered. Month to month.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a href={BRAND.auditBookingUrl} target="_blank" rel="noopener noreferrer" className="btn-brass">
                Book The Modern Hotel Audit <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#tiers" className="link-brass pr-6">
                See the Three Tiers <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* II · THE MATH */}
      <section className="py-24 lg:py-32 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <Eyebrow numeral="II" label="The Math" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
                An in-house revenue manager costs
                <br />
                <span className="text-brass">$85,000</span> a year.
                <br />
                <span className="italic">Mine starts at $850 a month.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="grid md:grid-cols-2 gap-px bg-brass/15 border border-brass/15">
              <div className="bg-obsidian/85 p-8 lg:p-10">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-cream/55 mb-6">
                  In-House Revenue Manager
                </div>
                <ul className="space-y-4 text-cream/75">
                  {[
                    "$85,000+ salary, plus benefits, taxes, and PTO",
                    "One person. One skill set.",
                    "2–3 years average tenure before turnover",
                    "Slow ramp. Slower results.",
                    "No launch, renovation, or acquisition expertise",
                  ].map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="text-cream/30 mt-1.5">—</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-obsidian p-8 lg:p-10 ring-1 ring-brass/30">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
                  Ramirez Hospitality Group
                </div>
                <ul className="space-y-4 text-cream/85">
                  {[
                    "Starting at $850 / month",
                    "Operator + AI-driven tech stack — Hotelitix, Duetto, Light House, Revinate",
                    "Month to month. No lock-in.",
                    "The Modern Hotel Audit first, free, no strings.",
                    "10+ years launching and scaling independents.",
                  ].map((line) => (
                    <li key={line} className="flex gap-3">
                      <Check className="w-4 h-4 text-brass mt-1 shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* III · THE THREE TIERS */}
      <section id="tiers" className="py-24 lg:py-36 bg-obsidian">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <Reveal>
              <Eyebrow numeral="III" label="The Three Tiers" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
                Three subscriptions.
                <br />
                <span className="italic text-brass">All month-to-month.</span>
                <br />
                All built to outperform their cost.
              </h2>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {TIERS.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 120}
                className={`relative flex flex-col border ${
                  tier.featured
                    ? "border-brass/60 bg-card lg:-translate-y-4 lg:scale-[1.02] shadow-[0_30px_80px_-30px_rgba(212,176,98,0.35)]"
                    : "border-brass/15 bg-card/60"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brass text-obsidian text-[0.62rem] tracking-[0.32em] uppercase font-bold px-4 py-1.5 flex items-center gap-2">
                    <Star className="w-3 h-3 fill-obsidian" /> {tier.badge}
                  </div>
                )}
                <div className="p-8 lg:p-10 flex-1 flex flex-col">
                  <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">
                    {tier.subtitle}
                  </div>
                  <h3 className="mt-3 font-display text-3xl lg:text-4xl text-cream">
                    {tier.name}
                  </h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-cream/55 text-xs tracking-wider uppercase">
                      {tier.pricePrefix}
                    </span>
                    <span className="font-display text-4xl lg:text-5xl text-brass">
                      {tier.price}
                    </span>
                    <span className="text-cream/65 text-sm">{tier.cadence}</span>
                  </div>
                  {tier.suffix && (
                    <div className="mt-2 text-[0.7rem] tracking-[0.18em] uppercase text-brass/85">
                      {tier.suffix}
                    </div>
                  )}
                  <p className="mt-6 text-cream/70 text-sm leading-[1.7]">
                    {tier.description}
                  </p>

                  <div className="hairline my-8 opacity-40" />

                  <ul className="space-y-3.5 text-sm text-cream/80 flex-1">
                    {tier.features.map((f, idx) => (
                      <li
                        key={idx}
                        className={`flex gap-3 ${
                          f.endsWith("plus:") ? "font-semibold text-cream pt-1" : ""
                        }`}
                      >
                        {!f.endsWith("plus:") && (
                          <Check className="w-3.5 h-3.5 text-brass mt-1 shrink-0" />
                        )}
                        <span className="leading-[1.55]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <a
                      href={BRAND.auditBookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        tier.featured ? "btn-brass w-full justify-center" : "btn-ghost w-full justify-center"
                      }
                    >
                      Book The Modern Hotel Audit <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center text-cream/55 text-sm">
            All tiers are month-to-month. Cancel anytime. RMS access included at preferred
            rates on every tier.
          </div>
        </div>
      </section>

      {/* IV · DIFFERENTIATORS */}
      <section className="py-24 lg:py-36 panel-emerald grain">
        <div className="container relative z-10">
          <div className="max-w-3xl mb-16">
            <Reveal>
              <Eyebrow numeral="IV" label="The Differentiators" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05] text-cream">
                Three things every independent hotel needs.
                <br />
                <span className="italic text-brass">One subscription that includes them all.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-px bg-brass/20">
            {[
              {
                n: "I",
                t: "OTA Performance Optimization",
                p: "Most consultants bury OTA work inside 'distribution.' I make it a named service. Rate-parity policing, content scoring, visibility-algorithm tuning, commissions renegotiation, Preferred Partner and Genius program management. Real moves on Expedia, Booking, and Hotels.com — not screenshots in a deck.",
              },
              {
                n: "II",
                t: "Direct Booking Strategy (Built)",
                p: "The brands have direct-booking budgets. Independents have to earn it. I build the metasearch bids, the rate fences, the email sequences, and the booking-engine flow that pulls bookings off the OTAs and onto your own site. Sixty percent direct at Twist. We can do it again.",
              },
              {
                n: "III",
                t: "Rewards & Loyalty Program Development",
                p: "Marriott has Bonvoy. Hilton has Honors. Independents need an answer. I design the tiers, the perks, the partner stacks, and the email automations that turn one-time guests into a repeat-revenue engine.",
              },
            ].map((d, i) => (
              <Reveal
                key={d.t}
                delay={i * 120}
                className="bg-obsidian/70 p-8 lg:p-10"
              >
                <div className="font-display italic text-3xl text-brass mb-6">{d.n}</div>
                <h3 className="font-display text-2xl text-cream mb-5 leading-snug">{d.t}</h3>
                <p className="text-cream/75 text-sm leading-[1.75]">{d.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* V · TECH STACK */}
      <section className="py-24 lg:py-32 bg-obsidian border-t border-brass/15">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="V" label="The Tech Stack" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
                  I run on the best tools in the industry.
                  <br />
                  <span className="italic text-brass">So you don't have to learn them.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={150}>
                <p className="text-cream/65 leading-[1.7]">
                  Every subscription tier includes RMS access at preferred rates — typically
                  Hotelitix, but selected to fit the property. The same goes for the rest of
                  the stack. You don't pay full retail. I do the integration, the
                  configuration, and the maintenance.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-brass/15 border border-brass/15">
              {["Hotelitix", "Duetto", "Light House", "Revinate", "OpenAI", "GPT"].map((t) => (
                <div
                  key={t}
                  className="bg-obsidian px-6 py-10 flex items-center justify-center"
                >
                  <span className="font-display text-2xl text-cream/75 tracking-wide">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
