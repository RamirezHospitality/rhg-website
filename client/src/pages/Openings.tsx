/*
 * Ramirez Hospitality Group — The Reserve · OPENINGS
 * Hotel openings & reopenings — the element of Adam's genius.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const OPENINGS_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hotel Opening & Reopening Consulting",
  description:
    "Concept to ribbon-cutting hotel opening consulting in 90–270 days. Services include brand positioning, pre-opening budget, tech stack selection, OTA and distribution setup, hiring plan, SOPs, marketing launch, and soft opening management. Eight hotels opened from scratch, four repositioned.",
  provider: { "@id": "https://www.ramirezhos.com/#organization" },
  serviceType: "Hotel Opening Consulting",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://www.ramirezhos.com/openings",
};

const PHASES = [
  { n: "I", t: "Concept & Positioning", d: "Brand pillars, name, voice, design intent, comp set, target ADR." },
  { n: "II", t: "Brand Identity & Creative Direction", d: "Logo, brand book, photography brief, naming conventions." },
  { n: "III", t: "Pre-Opening Budget & Pro Forma", d: "Capex, OS&E, FF&E, ramp curve, year-one P&L." },
  { n: "IV", t: "Tech Stack Selection & Integration", d: "PMS, RMS, channel manager, CRM, booking engine, POS." },
  { n: "V", t: "Sales & Distribution Build", d: "OTA contracts, GDS, wholesale, group, corporate, metasearch." },
  { n: "VI", t: "Hiring Plan & Org Chart", d: "Leadership-first, then line, then training." },
  { n: "VII", t: "SOPs and Training", d: "Front-of-house manuals, service standards, brand standards, F&B." },
  { n: "VIII", t: "Marketing Launch", d: "PR plan, influencer seeding, paid media, website, booking engine, email pre-launch." },
  { n: "IX", t: "Soft Opening", d: "Guest-experience pressure test, daily debrief, rapid iteration." },
  { n: "X", t: "Public Opening + Stabilization", d: "Handoff to the embedded revenue subscription, and a 90-day stabilization sprint." },
];

const PROPS = [
  {
    name: "Paloma",
    location: "Palm Springs, CA",
    type: "Upscale boutique opening",
    detail: "Year-one revenue $1.5M · featured in Travel & Leisure",
  },
  {
    name: "Twist Hotel",
    location: "Palm Springs, CA",
    type: "Distressed turnaround & reopen",
    detail: "6.4 → 9.1 Booking score · 60% direct booking rate",
  },
  {
    name: "Limón",
    location: "California",
    type: "Upscale boutique launch",
    detail: "Featured in Modernism Magazine",
  },
];

export default function Openings() {
  return (
    <PageLayout
      title="Hotel Opening & Reopening Consultant for Independent & Boutique Hotels | Ramirez Hospitality Group"
      description="Concept to ribbon-cutting hotel opening consulting in 90–270 days. Pre-opening sales, brand identity, staffing, OS&E, tech stack, and soft-launch playbook. Eight hotels opened from scratch, four repositioned. Operator-led by Adam Ramirez, Palm Springs, CA."
      canonical="/openings"
      breadcrumbs={[{ name: "Hotel Openings & Reopenings", href: "/openings" }]}
      jsonLd={[OPENINGS_SERVICE_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="relative pt-44 pb-32 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.opening} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-vignette" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="Hotel Openings & Reopenings" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Concept to ribbon-cutting.
              <br />
              <span className="italic text-brass">Run by an operator who's done it before.</span>
            </h1>
            <p className="mt-9 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Opening a hotel is the most expensive, most error-prone moment in the asset's
              life. I've opened 8 hotels from scratch and repositioned more than 4 after
              renovation, rebrand, and ownership transition. This is the work I love most.           </p>
          </div>
        </div>
      </section>

      {/* II · PULL QUOTE */}
      <section className="py-24 lg:py-32 panel-emerald grain border-y border-brass/15">
        <div className="container relative z-10">
          <Reveal className="max-w-4xl mx-auto text-center">
            <span className="text-brass text-7xl font-display italic leading-none">"</span>
            <p className="font-display italic text-3xl md:text-4xl lg:text-[3rem] leading-[1.2] text-cream -mt-6">
              The best openings feel inevitable.
              <br />
              They never are. Every one of them is the result of nine months of decisions
              made <span className="text-brass">in the right order.</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-brass/70" />
              <span className="text-[0.62rem] tracking-[0.32em] uppercase text-cream/70">
                Adam Ramirez
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* III · THE METHOD */}
      <section className="py-24 lg:py-36 bg-obsidian">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="II" label="The Method" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
                  Nine to ten phases,
                  <br />
                  depending on the property.
                  <br />
                  <span className="italic text-brass">All of them mine to run.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <p className="text-cream/65 leading-[1.7]">
                  A typical engagement runs 90 to 270 days from contract to ribbon-cutting.
                  Below is the ten-phase blueprint I follow on every property — adapted to
                  the size, brand, and timeline of yours.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="grid md:grid-cols-2 gap-px bg-brass/15 border border-brass/15">
            {PHASES.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 60}
                className="bg-obsidian p-7 lg:p-9 group hover:bg-card transition-colors duration-500"
              >
                <li>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="font-display italic text-brass text-2xl">{p.n}</span>
                    <span className="font-display text-xl lg:text-2xl text-cream">{p.t}</span>
                  </div>
                  <p className="text-cream/65 text-sm leading-[1.7] pl-10">{p.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* IV · OPENED PROPERTIES */}
      <section className="py-24 lg:py-32 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <Eyebrow numeral="III" label="Opened & Reopened" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
                Eight hotels opened from scratch.
                <br />
                Four repositioned.
                <br />
                <span className="italic text-brass">Every one of them, mine.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-brass/20 border border-brass/15">
            {PROPS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 100}
                className="bg-obsidian p-8 lg:p-10"
              >
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-4">
                  {p.type}
                </div>
                <h3 className="font-display text-3xl lg:text-4xl text-cream mb-2">{p.name}</h3>
                <div className="text-cream/55 text-sm tracking-wide mb-5">{p.location}</div>
                <div className="hairline opacity-40 my-5" />
                <p className="text-cream/75 text-sm leading-[1.7]">{p.detail}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/case-studies">
              <span className="link-brass pr-6">
                Browse the Full Case Studies <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* V · 90-DAY REOPENING SPRINT */}
      <section className="py-24 lg:py-36 bg-obsidian">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="IV" label="The 90-Day Reopening Sprint" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05] text-cream">
                  For properties that are
                  <br />
                  already open —
                  <br />
                  <span className="italic text-brass">and already underperforming.</span>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-8 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">
                  Sometimes the smartest move isn't a renovation. It's a reset. A brand
                  reset. A team reset. A pricing reset. A reset on the OS&E. The 90-Day
                  Reopening Sprint is a fixed-scope engagement that does all of it at once
                  — and ends with a relaunch event and a 90-day revenue plan.
                </p>
                <div className="mt-10">
                  <Link href="/contact">
                    <span className="btn-brass">
                      Click to Book a Call <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={250}>
                <div className="border border-brass/25 p-10 bg-card">
                  <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
                    Sprint Includes
                  </div>
                  <ul className="space-y-4 text-cream/80">
                    {[
                      "Brand & positioning reset",
                      "Operations & SOP rebuild",
                      "Tech stack triage",
                      "Pricing & OTA reset",
                      "Pre-launch PR + influencer plan",
                      "Relaunch event + 90-day revenue plan",
                    ].map((s) => (
                      <li key={s} className="flex gap-3 items-baseline">
                        <span className="text-brass text-xs">◆</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
