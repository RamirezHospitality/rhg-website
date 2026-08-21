/*
 * Ramirez Hospitality Group — The Reserve · HOME
 * Editorial dark mode. Asymmetric, magazine-paced.
 * Sections: Hero · Track Record · Why Owners Hire Me · Six Pillars ·
 * Subscription Teaser · Case Study Highlight · Audit Method · Insights Teaser.
 *
 * SEO/GEO: Full structured data — Service, FAQPage, Person, LocalBusiness.
 * FAQ section added for AI search extraction and featured snippet targeting.
 */

import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { BRAND, IMAGES, PROPERTIES, PRESS } from "@/lib/brand";
import { ORGANIZATION_SCHEMA, PERSON_SCHEMA } from "@/components/SEO";

const PILLARS = [
  {
    numeral: "I",
    title: "Revenue Management Subscription",
    note: "From $850 / month",
    description:
      "Daily pricing, OTA optimization, direct booking, and loyalty under one monthly retainer.",
    href: "/revenue-management",
    flagship: true,
  },
  {
    numeral: "II",
    title: "Hotel Openings & Reopenings",
    note: "The element of my genius",
    description:
      "Concept to ribbon-cutting in 90 to 270 days. Eight hotels opened, four repositioned.",
    href: "/openings",
  },
  {
    numeral: "III",
    title: "Hotel Tech & Systems",
    note: "PMS · RMS · CRM · Booking",
    description:
      "Hotelitix, Duetto, Light House, Revinate. The right stack — integrated and disciplined.",
    href: "/services#tech-systems",
  },
  {
    numeral: "IV",
    title: "Operations & SOPs",
    note: "Front of house to back",
    description:
      "Built to scale. Written to last. The SOP binder you actually use.",
    href: "/services#operations",
  },
  {
    numeral: "V",
    title: "Renovations & Construction",
    note: "Owner's-rep oversight",
    description:
      "FF&E, capex, contractor selection. The operator in the room with the architect.",
    href: "/services#renovations",
  },
  {
    numeral: "VI",
    title: "Asset & Acquisition Advisory",
    note: "Pre-purchase to exit",
    description:
      "Due diligence, distressed turnaround, and exit prep. Discreet. Operator-grade.",
    href: "/services#asset-advisory",
  },
  {
    numeral: "VII",
    title: "Full-Property Event Production",
    note: "Brand takeovers & activations",
    description:
      "Hugo Boss. Levi's. NYX Cosmetics. BMW. Volkswagen. I source everything — private chefs to the silverware on the table.",
    href: "/services#events",
  },
];

// ─── Structured Data ────────────────────────────────────────────────────────

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a hotel revenue management consultant do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A hotel revenue management consultant manages daily pricing strategy, OTA optimization, direct booking growth, and demand forecasting for independent and boutique hotels. At Ramirez Hospitality Group, this means setting rates every day based on comp-set data, demand pace, and AI-driven forecasting — delivering the work of a full-time revenue manager at a fraction of the cost.",
      },
    },
    {
      "@type": "Question",
      name: "How much does outsourced hotel revenue management cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ramirez Hospitality Group offers three flat-fee, month-to-month revenue management subscription tiers: Essentials at $850/month for 10–40 key properties, Growth at $1,500/month for 30–80 key boutique hotels, and Enterprise at $2,500/month for 80+ key properties and small portfolios. All tiers include OTA optimization, direct booking strategy, and rewards program development — services most consultants charge extra for.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between outsourced and in-house hotel revenue management?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full-time, in-house hotel revenue manager typically costs $70,000–$110,000 per year in salary alone, plus benefits and tools. Outsourced revenue management through a subscription service like Ramirez Hospitality Group starts at $850/month ($10,200/year), includes access to enterprise-grade RMS tools like Hotelitix and Duetto, and delivers the same daily pricing discipline and OTA strategy without the overhead.",
      },
    },
    {
      "@type": "Question",
      name: "What hotel revenue management tools does Adam Ramirez use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Adam Ramirez uses Hotelitix, Duetto, and Light House for revenue management systems (RMS); Revinate for CRM and email marketing; SiteMinder for channel management; and Mews for property management. He selects and configures the right stack for each property's size, budget, and goals.",
      },
    },
    {
      "@type": "Question",
      name: "Does Ramirez Hospitality Group work with small independent hotels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Ramirez Hospitality Group specializes in independent and boutique hotels, including properties as small as 10 keys. The Essentials subscription tier is designed specifically for inns, motels, and small boutiques whose owners want a real revenue strategist without the cost of a full-time hire. All services are available nationwide from a base in Palm Springs, CA.",
      },
    },
    {
      "@type": "Question",
      name: "What is a free hotel property audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ramirez Hospitality Group offers a complimentary 45-minute property audit for independent hotel owners and operators. The audit covers: an OTA health score across Expedia, Booking.com, and Hotels.com; a pricing pressure test with live comp-set analysis; a direct-booking diagnostic; a tech-stack review; and the top three highest-impact revenue moves for the next 90 days. A written follow-up is delivered within 48 hours.",
      },
    },
  ],
};

const HOME_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.ramirezhos.com/#revenue-management-service",
  name: "Hotel Revenue Management Subscription",
  description:
    "A flat-fee, month-to-month revenue management subscription for independent and boutique hotels. Includes daily pricing management, OTA optimization, direct booking strategy, and rewards program development. Three tiers from $850/month.",
  provider: {
    "@id": "https://www.ramirezhos.com/#organization",
  },
  serviceType: "Hotel Revenue Management",
  areaServed: { "@type": "Country", name: "United States" },
  offers: [
    {
      "@type": "Offer",
      name: "Essentials",
      description: "For 10–40 key properties. Daily pricing, OTA optimization, monthly strategy call.",
      price: "850",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "850",
        priceCurrency: "USD",
        unitText: "month",
      },
    },
    {
      "@type": "Offer",
      name: "Growth",
      description: "For 30–80 key boutique hotels. Full OTA optimization, direct booking strategy, loyalty program.",
      price: "1500",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "1500",
        priceCurrency: "USD",
        unitText: "month",
      },
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      description: "For 80+ key properties and small portfolios. Fractional Director of Revenue.",
      price: "2500",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "2500",
        priceCurrency: "USD",
        unitText: "month",
      },
    },
  ],
};

// ─── FAQ Data (rendered on page for GEO extractability) ─────────────────────

const FAQ_ITEMS = [
  {
    q: "What does outsourced hotel revenue management include?",
    a: "At Ramirez Hospitality Group, outsourced revenue management includes daily pricing and rate management, OTA optimization across Expedia, Booking.com, and Hotels.com, direct booking strategy, demand forecasting, comp-set monitoring, and monthly strategy calls. Enterprise clients also receive group sales strategy, channel-manager management, and quarterly on-site visits.",
  },
  {
    q: "How much does hotel revenue management consulting cost?",
    a: "Ramirez Hospitality Group subscriptions start at $850/month for properties with 10–40 keys (Essentials tier), $1,500/month for 30–80 key boutique hotels (Growth tier), and $2,500/month for 80+ key properties and portfolios (Enterprise tier). All plans are month-to-month with no long-term contracts.",
  },
  {
    q: "Who is Adam Ramirez?",
    a: "Adam Ramirez is a Palm Springs-based hotel operator and hospitality consultant with 15+ years of experience. He has opened 8 hotels from concept to ribbon-cutting, repositioned 4 others, managed over $10M in annual hotel revenue, and led teams of 120+. His properties have been featured in Travel & Leisure, Condé Nast Traveler, Forbes, and Modernism Magazine. He is the founder of Ramirez Hospitality Group.",
  },
  {
    q: "Does Ramirez Hospitality Group offer a free hotel audit?",
    a: "Yes. Ramirez Hospitality Group offers a complimentary 45-minute property audit for independent hotel owners and operators. The audit covers OTA health, pricing strategy, direct booking diagnostics, tech stack review, and the top three revenue opportunities for the next 90 days — with a written follow-up within 48 hours.",
  },
];

export default function Home() {
  return (
    <PageLayout
      title="Ramirez Hospitality Group — Hotel Revenue Management & Hospitality Consulting for Independent & Boutique Hotels"
      description="Operator-led hospitality consulting and remote revenue management for independent hotels, boutique properties, and small hotel groups. Adam Ramirez — 15+ years opening and scaling boutique hotels. Subscriptions from $850/mo. Free property audit."
      ogImage={IMAGES.hero}
      jsonLd={[HOME_FAQ_SCHEMA, HOME_SERVICE_SCHEMA, ORGANIZATION_SCHEMA, PERSON_SCHEMA]}
    >
      {/* ───────── HERO ───────── */}
      <section className="relative min-h-[100vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="A luxurious dark hotel lobby in Palm Springs at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-vignette" />
        </div>

        {/* Side rail brand line (desktop) */}
        <div className="hidden xl:block absolute left-12 top-1/2 -translate-y-1/2 z-10">
          <div className="rotate-[-90deg] origin-left translate-y-[3rem] flex items-center gap-3">
            <div className="h-px w-10 bg-brass/70" />
            <span className="text-[0.62rem] tracking-[0.32em] uppercase text-cream/65">
              The Reserve · Estd 2023
            </span>
          </div>
        </div>

        {/* Hero content */}
        <div className="container relative z-10 pb-24 pt-40 lg:pb-32 lg:pt-44">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-9 xl:col-span-8">
              <div className="animate-rise-in">
                <Eyebrow numeral="I" label="The Practice" />
              </div>
              <h1 className="mt-7 font-display font-medium text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.4rem] xl:text-[5rem] leading-[1.02] text-cream tracking-[-0.025em] animate-rise-in delay-100">
                The Revenue Manager
                <br />
                Your Hotel <span className="italic text-brass">Deserves</span> —
                <br />
                Without the
                <br />
                <span className="italic">Six-Figure Salary.</span>
              </h1>
              <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl animate-rise-in delay-200">
                Operator-led revenue management, hotel openings, and asset advisory for
                independent hotels, boutique properties, and the people who own them.
                Built in Palm Springs. Available nationwide.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5 animate-rise-in delay-300">
                <Link href="/audit">
                  <span className="btn-brass">
                    Schedule Your Free Audit <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                <Link href="/revenue-management">
                  <span className="link-brass pr-6">
                    See the Subscription <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-rise-in delay-500">
          <span className="text-[0.6rem] tracking-[0.32em] uppercase text-cream/55">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-brass/70 to-transparent" />
        </div>
      </section>

      {/* ───────── II · TRACK RECORD STATS + PROPERTY MARQUEE ───────── */}
      <section className="relative py-24 lg:py-32 bg-obsidian border-t border-brass/15">
        <div className="container">
          <Reveal className="text-center max-w-3xl mx-auto">
            <Eyebrow numeral="II" label="The Track Record" className="mx-auto" />
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-cream">
              Fifteen years inside independent hotels.
              <br />
              <span className="italic text-brass">Numbers that translate.</span>
            </h2>
          </Reveal>

          <div className="mt-20 grid md:grid-cols-3 gap-px bg-brass/15">
            {[
              { stat: "$10M+", label: "Managed in annual hotel revenue" },
              { stat: "$1M+", label: "Single-property revenue lifts delivered" },
              { stat: "120+", label: "Team members hired and led" },
            ].map((s, i) => (
              <Reveal key={s.stat} delay={i * 120} className="bg-obsidian px-6 py-12 lg:py-16">
                <div className="text-center">
                  <div className="font-display text-6xl md:text-[5rem] text-brass leading-none tracking-tight">
                    {s.stat}
                  </div>
                  <div className="mt-6 text-cream/70 text-sm tracking-wide max-w-[16rem] mx-auto">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Property marquee */}
        <div className="mt-24 lg:mt-28 overflow-hidden border-y border-brass/10">
          <div className="py-7 flex items-center gap-3">
            <div className="container">
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass/80 mb-5">
                Properties Worked With
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-marquee" style={{ width: "max-content" }}>
              {[...PROPERTIES, ...PROPERTIES, ...PROPERTIES].map((p, i) => (
                <div key={i} className="flex items-center px-10 lg:px-16">
                  <span className="font-display text-2xl lg:text-3xl text-cream/55 tracking-wide whitespace-nowrap">
                    {p}
                  </span>
                  <span className="text-brass/40 ml-10 lg:ml-16">◆</span>
                </div>
              ))}
            </div>
          </div>
          <div className="container py-6">
            <div className="flex items-center gap-2 text-[0.62rem] tracking-[0.32em] uppercase text-cream/45">
              <span className="text-brass/60">Featured in</span>
              {PRESS.map((p, i) => (
                <span key={p}>
                  {i > 0 && <span className="text-brass/30 mx-2">·</span>}
                  <span className="text-cream/65">{p}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── III · WHY OWNERS HIRE ME (emerald) ───────── */}
      <section className="relative py-24 lg:py-36 panel-emerald grain overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow numeral="III" label="Why Owners Hire Me" />
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-7 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
                  I run the strategy.
                  <br />
                  <span className="italic text-brass">The AI runs the math.</span>
                  <br />
                  You get both.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={200}>
                <p className="text-cream/85 text-lg leading-[1.7]">
                  Most consultants will sell you a deck. I'll sell you a quarter.
                </p>
                <p className="mt-6 text-cream/70 text-base lg:text-lg leading-[1.75]">
                  I've spent fifteen years inside independent hotels — opening them,
                  renovating them, rescuing them, running them. I've opened 8 hotels from
                  concept to ribbon-cutting, repositioned more than 4, and turned distressed
                  properties into the press darlings of <em className="text-cream/90">Travel & Leisure</em> and{" "}
                  <em className="text-cream/90">Condé Nast Traveler</em>.
                </p>
                <p className="mt-5 text-cream/70 text-base lg:text-lg leading-[1.75]">
                  The work I do today is the same work I did then — only now I do it for
                  owners who would rather not pay a six-figure salary to find out what good
                  looks like. I pair operator instincts with the best AI-driven revenue
                  tools on the market — Hotelitix, Duetto, Light House, Revinate — so the
                  math is never the bottleneck. You get a real strategist on the phone, and
                  a quiet machine in the background.
                </p>
                <div className="mt-10">
                  <Link href="/about">
                    <span className="link-brass pr-6">
                      Read My Story <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── IV · SIX PILLARS ───────── */}
      <section className="relative py-24 lg:py-36 bg-obsidian">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-20 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="IV" label="The Seven Pillars" />
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
                  Seven disciplines.
                  <br />
                  One operator.
                  <br />
                  <span className="italic text-brass">Every revenue lever in one place.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={200}>
                <p className="text-cream/65 text-base leading-[1.7]">
                  Most consultants specialize in one. I've worked all seven — for fifteen
                  years, inside the buildings. My element of genius is driving revenue and
                  opening hotels. Everything else exists to support those two things.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brass/15">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 80}
                className={`group relative bg-obsidian p-8 lg:p-10 hover:bg-card transition-colors duration-500 ${
                  p.flagship ? "ring-1 ring-brass/40" : ""
                }`}
              >
                <Link href={p.href}>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display italic text-brass text-2xl">{p.numeral}</span>
                    <span className="text-[0.62rem] tracking-[0.32em] uppercase text-cream/55">
                      {p.note}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-[1.65rem] leading-tight text-cream mb-5 group-hover:text-brass transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-cream/65 text-sm leading-[1.7]">{p.description}</p>
                  <div className="mt-8 flex items-center gap-2 text-brass text-xs tracking-[0.18em] uppercase font-semibold">
                    Explore <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  {p.flagship && (
                    <div className="absolute top-5 right-5 text-[0.55rem] tracking-[0.32em] uppercase text-brass border border-brass/40 px-2 py-1">
                      Flagship
                    </div>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── V · SUBSCRIPTION TEASER ───────── */}
      <section className="relative py-24 lg:py-36 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <Eyebrow numeral="V" label="The Subscription" />
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-7 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
                  A full-time revenue manager costs
                  <br />
                  <span className="italic text-brass">$85,000 a year.</span>
                  <br />
                  Mine starts at $850 a month.
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 text-cream/75 text-base lg:text-lg leading-[1.75]">
                  The Revenue Management subscription is the engine of this practice —
                  flagship, monthly, and built for hotels of every size. Three tiers, every
                  one of them month-to-month, every one of them designed to deliver more
                  revenue than it costs.
                </p>
                <p className="mt-5 text-cream/70 text-base leading-[1.75]">
                  OTA optimization, direct booking strategy, and rewards program development
                  are included from the start — three levers most consultants charge extra
                  for, and most independent hotels desperately need.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Link href="/revenue-management">
                    <span className="btn-brass">
                      See the Three Tiers <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href="/audit">
                    <span className="link-brass pr-6">
                      Schedule a Free Audit <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal delay={150}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={IMAGES.revenue}
                    alt="A revenue manager's desk — emerald leather pad, brass calculator, ledger of revenue figures"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── VI · CASE STUDY HIGHLIGHT ───────── */}
      <section className="relative py-24 lg:py-36 bg-obsidian">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="VI" label="The Results" />
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
                  Numbers from
                  <br />
                  <span className="italic text-brass">real properties.</span>
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-brass/15">
            {[
              {
                property: "Twist Palm Springs",
                result: "+$1M revenue lift",
                detail: "+40% year-over-year · 60% direct bookings",
              },
              {
                property: "Limón Palm Springs",
                result: "$750K on six keys",
                detail: "ADR $550+ · Six-key boutique",
              },
              {
                property: "The Paloma Resort",
                result: "$1.5M Year 1",
                detail: "Opening from concept to ribbon-cutting",
              },
            ].map((c, i) => (
              <Reveal key={c.property} delay={i * 120} className="bg-obsidian p-8 lg:p-10">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-5">
                  {c.property}
                </div>
                <div className="font-display text-3xl lg:text-4xl text-cream mb-4">
                  {c.result}
                </div>
                <div className="text-cream/60 text-sm">{c.detail}</div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300} className="mt-12 text-center">
            <Link href="/case-studies">
              <span className="link-brass pr-6">
                Browse Case Studies <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── VII · OPENING TEASER ───────── */}
      <section className="relative py-24 lg:py-36 panel-emerald grain border-y border-brass/15 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <Reveal>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={IMAGES.opening}
                    alt="Hotel opening — ribbon cutting ceremony at a boutique Palm Springs property"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <Reveal>
                <Eyebrow numeral="VII" label="Hotel Openings" />
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-7 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
                  Eight hotels opened.
                  <br />
                  <span className="italic text-brass">Four repositioned.</span>
                  <br />
                  Zero missed deadlines.
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 text-cream/75 text-base lg:text-lg leading-[1.75]">
                  Concept to ribbon-cutting in 90 to 270 days. Pre-opening sales strategy,
                  brand identity, staffing, OS&E, tech infrastructure, and soft-launch
                  playbook — all under one operator who has done it eight times before.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-10">
                  <Link href="/openings">
                    <span className="btn-ghost">
                      The Opening Process <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── VIII · AUDIT CTA ───────── */}
      <section className="relative py-24 lg:py-36 bg-obsidian">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.audit} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/90 to-obsidian" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <Eyebrow numeral="VIII" label="The Free Audit" className="mx-auto" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-7 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
                Service first.
                <br />
                <span className="italic text-brass">Pitch never.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 text-cream/75 text-lg leading-[1.75] max-w-xl mx-auto">
                We open by understanding the property, the owner, and the gap between where
                the hotel is and where it should be. The audit is forty-five minutes with a
                senior operator — not a sales call. You'll leave with five real moves.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10">
                <Link href="/audit">
                  <span className="btn-brass">
                    Reserve My Free Audit <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── IX · INSIGHTS TEASER ───────── */}
      <section className="relative py-24 lg:py-32 panel-walnut grain border-t border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="IX" label="The Notebook" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
                  Field notes from
                  <br />
                  <span className="italic text-brass">fifteen years inside hotels.</span>
                </h2>
              </Reveal>
            </div>
          </div>

          <Reveal delay={100}>
            <article className="group border border-brass/20 bg-obsidian p-8 lg:p-10 hover:border-brass/50 transition-colors duration-500 max-w-3xl">
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-5">
                Featured · 8 min read · April 2026
              </div>
              <h3 className="font-display text-3xl lg:text-4xl text-cream leading-[1.1] mb-5 group-hover:text-brass transition-colors duration-300">
                Why Your RevPAR Is a Thing of the Past
              </h3>
              <p className="text-cream/70 text-base leading-[1.7] mb-8">
                For two decades RevPAR was the headline number every owner asked for, every
                revenue manager defended, and every brand reported in earnings. It is still
                useful. But if RevPAR is the only number on your dashboard, you are running
                your hotel on a snapshot, and the picture has already moved.
              </p>
              <Link href="/insights">
                <span className="link-brass pr-6">
                  Read the Notebook <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ───────── X · FAQ (GEO: AI search extraction + featured snippets) ───────── */}
      <section className="relative py-24 lg:py-32 bg-obsidian border-t border-brass/15" aria-label="Frequently Asked Questions">
        <div className="container">
          <Reveal className="max-w-3xl mb-14">
            <Eyebrow numeral="X" label="Common Questions" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
              Questions from
              <br />
              <span className="italic text-brass">hotel owners.</span>
            </h2>
          </Reveal>

          <div className="max-w-3xl space-y-0">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="border-b border-brass/15 py-8">
                  <h3 className="font-display text-xl lg:text-2xl text-cream mb-4 leading-snug">
                    {item.q}
                  </h3>
                  <p className="text-cream/70 text-base leading-[1.75]">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-12">
            <Link href="/audit">
              <span className="link-brass pr-6">
                Have a different question? Schedule a free audit <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
