/*
 * Ramirez Hospitality Group — The Reserve · CASE STUDIES
 * Numbered, editorial property results. References to be expanded as case studies are written.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const CASES = [
  {
    name: "The Paloma Resort",
    location: "Palm Springs, CA",
    type: "Upscale boutique opening — 85 keys, restaurant, spa, event space",
    role: "Acting Director of Revenue / Market Strategy & Opening Director",
    image: IMAGES.opening,
    quote:
      "Led purchase, renovation, and launch — financial feasibility through soft opening. Drove $1.5M in revenue in year one.",
    stats: [
      { v: "$1.5M", l: "Y1 revenue" },
      { v: "85", l: "Keys" },
      { v: "T+L", l: "Featured" },
    ],
  },
  {
    name: "Twist Palm Springs",
    location: "Palm Springs, CA",
    type: "Distressed turnaround & reopening — 27 keys + 3 bars + retail + restaurant",
    role: "Area Director — DORM / LIT Property Group",
    image: IMAGES.revenue,
    quote:
      "Transformed a former rehabilitation center into a 27-room vacation property with three bars, a luxury retail boutique, and a tenant-run full-service restaurant. Managed P&Ls, financing, city permits, and ADA compliance.",
    stats: [
      { v: "+$1M", l: "Annual revenue (+40%)" },
      { v: "60%", l: "Direct booking rate" },
      { v: "70%", l: "Year-round occupancy" },
      { v: "<5%", l: "Cancellation rate" },
    ],
  },
  {
    name: "Limón Palm Springs",
    location: "Palm Springs, CA",
    type: "Upscale boutique launch — 6 keys, white-glove concierge, ADR $550+",
    role: "Acting Director of Revenue / Market Strategy",
    image: IMAGES.audit,
    quote:
      "Spearheaded renovation with H3K Design Group. High-end interiors and a white-glove concierge model. Voted Top 10 Vacation Destination in the Country by Travel & Leisure and featured in Modernism Magazine.",
    stats: [
      { v: "$550+", l: "ADR" },
      { v: "$750K", l: "Annual revenue" },
      { v: "Top 10", l: "Travel & Leisure" },
    ],
  },
  {
    name: "Sands Hotel & Spa",
    location: "Indian Wells, CA",
    type: "46-room luxury lifestyle boutique — Director of Operations engagement",
    role: "Director of Operations",
    image: IMAGES.advisory,
    quote:
      "Modernized FOH operations and training, slashing recruit/training cost per person by 50%. Designed inventory tracking, reducing loss by 20%. Introduced VIP guest service and pre-arrival amenity curation.",
    stats: [
      { v: "9.8", l: "Expedia rating" },
      { v: "4.9", l: "Google rating" },
      { v: "$5M", l: "Annual revenue managed" },
    ],
  },
  {
    name: "The Creekstone Inn",
    location: "Palm Springs, CA",
    type: "Reposition + tech stack overhaul",
    role: "Area Director — DORM / LIT Property Group",
    image: IMAGES.opening,
    quote:
      "Launched with a steakhouse concept, new PMS, and mobile check-in. Established the property as host of an annual wine festival, boosting revenue 20% YoY.",
    stats: [
      { v: "+20%", l: "YoY revenue" },
      { v: "New", l: "PMS + mobile check-in" },
    ],
  },
  {
    name: "Float Palm Springs & Bellevue Oasis",
    location: "Palm Springs, CA",
    type: "Renovation oversight + financing",
    role: "Regional Operations Manager — Fit For a King",
    image: IMAGES.revenue,
    quote:
      "Secured $1.2M in financing for the Float Palm Springs renovation. Directed the complete renovation of Bellevue Oasis. Held 90%+ occupancy with sub-4% cancellation across the portfolio.",
    stats: [
      { v: "$1.2M", l: "Financing secured (Float)" },
      { v: "90%+", l: "Occupancy" },
      { v: "<4%", l: "Cancellations" },
    ],
  },
];

export default function CaseStudies() {
  return (
    <PageLayout
      title="Hotel Consulting Case Studies — RevPAR Lifts, Direct Booking Growth & Openings | Ramirez Hospitality Group"
      description="Real results from independent and boutique hotels: $1.5M Year 1 at The Paloma Resort, +$1M revenue lift at Twist Palm Springs, $750K on six keys at Limón. RevPAR lifts, direct booking growth, brand turnarounds, and hotel openings."
      canonical="/case-studies"
      breadcrumbs={[{ name: "Case Studies", href: "/case-studies" }]}
      jsonLd={[ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-20 lg:pt-56 lg:pb-28 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="The Receipts" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              The work,
              <br />
              <span className="italic text-brass">in numbers.</span>
            </h1>
            <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Every property below is a real engagement, with real results. Owner
              references and full case-study decks available on request.
            </p>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="bg-obsidian">
        {CASES.map((c, i) => (
          <article key={c.name} className={`border-t border-brass/15 ${i % 2 === 1 ? "panel-walnut grain" : ""}`}>
            <div className="container py-20 lg:py-28 relative z-10">
              <div
                className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-center`}
              >
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <div className="relative">
                      <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-brass/40" />
                      <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-brass/40" />
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full aspect-[4/3] object-cover relative z-10"
                      />
                    </div>
                  </Reveal>
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal delay={120}>
                    <div className="flex items-center gap-4 text-brass mb-6">
                      <span className="font-display italic text-2xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-brass/40">·</span>
                      <span className="text-[0.62rem] tracking-[0.32em] uppercase">
                        {c.location}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.08] text-cream">
                      {c.name}
                    </h2>
                    <div className="mt-4 text-cream/65 text-sm tracking-wide">{c.type}</div>
                    <div className="mt-2 text-brass/85 text-sm tracking-wide">{c.role}</div>
                    <div className="hairline opacity-40 my-7" />
                    <p className="font-display italic text-cream text-xl lg:text-2xl leading-[1.4]">
                      {c.quote}
                    </p>
                    <div className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {c.stats.map((s) => (
                        <div key={s.l}>
                          <div className="font-display text-2xl lg:text-3xl text-brass">{s.v}</div>
                          <div className="text-[0.6rem] tracking-[0.28em] uppercase text-cream/60 mt-2">
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* MORE */}
        <div className="border-t border-brass/15 py-24 bg-obsidian">
          <div className="container text-center">
            <Reveal>
              <p className="font-display italic text-2xl text-cream/80 max-w-2xl mx-auto leading-[1.5]">
                Additional engagements at Dunes Palm Springs, The Stardust, Town & Desert
                Hospitality, Saguaro Hotel, and Palm Luxury Properties — full decks available
                under NDA.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <span className="btn-brass">
                    Request a Reference Deck <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
