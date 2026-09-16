/*
 * Ramirez Hospitality Group — The Reserve · CASE STUDIES
 * The Lincoln, Marfa first (released for marketing, the audit's own case),
 * then the approved proof set from the September 9, 2026 offer brief:
 * Paloma, Twist, Limón, each with the figures the brief allows and no
 * others. Other engagements are named without numbers.
 */

import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { IMAGES, OFFERS } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const CASES = [
  {
    name: "The Lincoln, Marfa",
    location: "Marfa, Texas",
    type: "The Modern Hotel Audit on a property guests love",
    role: "Revenue audit, 2026",
    image: IMAGES.audit,
    quote:
      "Scored 41 out of 100, grade D, on a hotel with an A for reputation. $55,000 to $185,000 in annual revenue opportunity identified on a $444,000 base. Guests paid $59 a night more on Expedia than on the hotel's own site. An A-grade asset with no revenue function yet: the cheapest problem in hospitality to fix.",
    stats: [
      { v: "41", l: "out of 100, grade D" },
      { v: "$55K", l: "to $185K identified" },
      { v: "$444K", l: "revenue base" },
      { v: "$59", l: "more a night on Expedia" },
    ],
  },
  {
    name: "Paloma",
    location: "Palm Springs, CA",
    type: "Upscale boutique opening",
    role: "Opening from concept to ribbon-cutting",
    image: IMAGES.opening,
    quote:
      "Purchase, renovation and launch, from the feasibility work through the soft opening. Year-one revenue of $1.5M. Featured in Travel & Leisure.",
    stats: [
      { v: "$1.5M", l: "Year-one revenue" },
      { v: "T+L", l: "Featured" },
    ],
  },
  {
    name: "Twist Hotel",
    location: "Palm Springs, CA",
    type: "Distressed turnaround and reopening",
    role: "Reset, reopening, revenue",
    image: IMAGES.revenue,
    quote:
      "A distressed property reset and reopened: the brand, the team, the pricing, the systems and the booking sites, done at once. Booking score from 6.4 to 9.1. A 60% direct booking rate.",
    stats: [
      { v: "6.4 to 9.1", l: "Booking score" },
      { v: "60%", l: "Direct booking rate" },
    ],
  },
  {
    name: "Limón",
    location: "California",
    type: "Upscale boutique launch",
    role: "Launch and revenue strategy",
    image: IMAGES.advisory,
    quote:
      "A small upscale boutique launched with a white-glove concierge model. Featured in Modernism Magazine.",
    stats: [{ v: "Modernism", l: "Featured" }],
  },
];

export default function CaseStudies() {
  return (
    <PageLayout
      title="Hotel Case Studies: The Lincoln Audit, Paloma, Twist, Limón | Ramirez Hospitality Group"
      description="Real results from independent hotels: The Lincoln, Marfa scored 41 out of 100 and found $55,000 to $185,000; Paloma opened to $1.5M in year one; Twist reopened from a 6.4 to a 9.1 Booking score with 60% direct bookings; Limón launched into Modernism Magazine."
      canonical="/case-studies"
      breadcrumbs={[{ name: "Case Studies", href: "/case-studies" }]}
      jsonLd={[ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-20 lg:pt-56 lg:pb-28 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="The receipts" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              The work,
              <br />
              <span className="italic text-brass">in numbers.</span>
            </h1>
            <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Every property below is a real engagement, with real results. Owner references
              and full case-study decks are available on request.
            </p>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="bg-obsidian">
        {CASES.map((c, i) => (
          <article key={c.name} className={`border-t border-brass/15 ${i % 2 === 1 ? "panel-walnut grain" : ""}`}>
            <div className="container py-20 lg:py-28 relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Reveal>
                    <div className="relative">
                      <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-brass/40" />
                      <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-brass/40" />
                      <img src={c.image} alt={c.name} className="w-full aspect-[4/3] object-cover relative z-10" />
                    </div>
                  </Reveal>
                </div>
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <Reveal delay={120}>
                    <div className="flex items-center gap-4 text-brass mb-6">
                      <span className="font-display italic text-2xl">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-brass/40">·</span>
                      <span className="text-[0.62rem] tracking-[0.32em] uppercase">{c.location}</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.08] text-cream">{c.name}</h2>
                    <div className="mt-4 text-cream/65 text-sm tracking-wide">{c.type}</div>
                    <div className="mt-2 text-brass/85 text-sm tracking-wide">{c.role}</div>
                    <div className="hairline opacity-40 my-7" />
                    <p className="font-display italic text-cream text-xl lg:text-2xl leading-[1.4]">{c.quote}</p>
                    <div className="mt-9 grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {c.stats.map((s) => (
                        <div key={s.l}>
                          <div className="font-display text-2xl lg:text-3xl text-brass">{s.v}</div>
                          <div className="text-[0.6rem] tracking-[0.28em] uppercase text-cream/60 mt-2">{s.l}</div>
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
                Further engagements at Sands Hotel &amp; Spa, The Creekstone Inn, Float Palm
                Springs, Bellevue Oasis, Dunes Palm Springs, The Stardust, Town &amp; Desert
                Hospitality and Saguaro Hotel. Six funded feasibility projects with full pro
                formas and sensitivity scenarios. Full decks available under NDA.
              </p>
              <div className="mt-10">
                <a href={OFFERS.audit.formPath} className="btn-brass">
                  {OFFERS.audit.cta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
