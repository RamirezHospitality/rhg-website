/*
 * Ramirez Hospitality Group — The Reserve · THE MODERN HOTEL LAUNCH
 * Route: /openings (the slug carries the search phrase; /the-modern-hotel-launch
 * and /launch redirect here).
 *
 * The hands-on opening or reopening engagement, per the September 9, 2026
 * offer brief: brand and budget to first guest, ten phases, on site
 * nationwide, quoted per project. Every Launch starts with The Modern Hotel
 * Plan. The CTA is "Book an Opening Consultation" throughout and lands on
 * the capture form on this page.
 *
 * The 90 to 270 day planning range appears on this page only, with its
 * disclaimer, as the brief allows. It never appears in the title, the
 * description, the schema or llms.txt. No Launch price appears anywhere.
 * Capacity is internal and is not stated.
 */

import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { CrmCaptureForm } from "@/components/lp/CrmCaptureForm";
import { OperatorSection } from "@/components/OperatorSection";
import { LaunchDeliverables } from "@/components/launch/LaunchDeliverables";
import { IMAGES, OFFERS } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const PHASES = [
  { t: "Concept and positioning", d: "The name, the voice, the design intent, the hotels you will be compared with, the rate you are building toward." },
  { t: "Brand identity and creative direction", d: "Logo, brand book, the photography brief, naming conventions for every room and space." },
  { t: "Pre-opening budget and year-one model", d: "Build cost, furniture and equipment, the ramp to stabilized occupancy, the first year's profit and loss. Carried in from the Plan." },
  { t: "Systems selection and setup", d: "Property management, revenue management (Duetto, our preferred system), channel manager, booking engine, guest database, point of sale, keys. Chosen so they talk to each other." },
  { t: "Sales and distribution build", d: "Booking-site contracts, Google hotel listing, group and corporate channels, live early so the hotel sells before it opens." },
  { t: "Hiring plan and org chart", d: "Leadership first, then the line, then training. The people who will run the hotel are in the building before the guests are." },
  { t: "Standards and training", d: "Front-of-house manuals, service standards, brand standards, food and beverage. Written by the person who will train the team." },
  { t: "Marketing launch", d: "Press, paid media, the website and booking engine, the pre-launch email list." },
  { t: "Soft opening", d: "Guests in the rooms, a debrief every day, fixes made before the public sees them." },
  { t: "Public opening and handoff", d: "The ribbon, then the handoff to your general manager and to the Subscription, so the revenue work does not stop the day the Launch ends." },
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const PROOF = [
  { v: "$1.5M", l: "year-one revenue. Paloma, Palm Springs. Upscale boutique opening, featured in Travel & Leisure." },
  { v: "6.4 to 9.1", l: "Booking score. Twist Hotel. Distressed turnaround and reopening, 60% direct booking rate." },
  { v: "Limón", l: "California. Upscale boutique launch, featured in Modernism Magazine." },
];

const RESET_INCLUDES = [
  "Brand and positioning reset",
  "Operations and standards rebuilt",
  "Systems triage, and the ones that leak replaced",
  "Pricing and booking-site reset",
  "Relaunch press and marketing",
  "A relaunch event and the handoff to the Subscription",
];

const STEPS = [
  {
    n: "01",
    t: "The consultation",
    p: "Twenty minutes on the project: the stage it is at, the budget, the date, and whether a Launch is the right size for it.",
  },
  {
    n: "02",
    t: OFFERS.plan.name,
    p: `${OFFERS.plan.priceLabel}, flat. The demand, the math and the value, so the Launch is built on numbers that hold. If you already have a Plan from us, this step is done.`,
  },
  {
    n: "03",
    t: "The Launch, quoted",
    p: "Scope, phases and the monthly fee, quoted per project after the Plan. On site nationwide.",
  },
  {
    n: "04",
    t: "The handoff",
    p: "Your general manager runs the hotel. The Subscription runs the revenue. The Launch team leaves with everything documented in your name.",
  },
];

const FAQ = [
  {
    q: "I have a general manager for that.",
    a: "A general manager runs a hotel that exists. An opening is a different job: ten phases in the right order, from the name and the budget to the first guest, and it hands off to the manager at the end.",
  },
  {
    q: "How far in advance should we talk?",
    a: "Before the name and the positioning are locked, ideally, because that decision drives the budget, the systems and the hiring plan. We have also stepped into projects mid-construction. Bring the schedule to the consultation and we will tell you what is still open to change.",
  },
  {
    q: "What does the Launch cost?",
    a: `It is quoted per project, after the Plan, because the scope moves with the property. The Plan itself is ${OFFERS.plan.priceLabel}, flat, and every Launch starts with one.`,
  },
  {
    q: "We are repositioning an open property, not opening a new one.",
    a: "The reset is the same discipline, compressed: positioning, the model, the systems, the pricing and the booking sites, then a relaunch. Four of the hotels on the track record were repositioned this way.",
  },
  {
    q: "What happens after we open?",
    a: "The revenue work continues as the Subscription, so daily pricing and the booking sites never lapse. Your general manager runs the hotel.",
  },
];

// ─── Structured data ─────────────────────────────────────────────────────────

const LAUNCH_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://ramirezhospitality.com/openings#service",
  name: "The Modern Hotel Launch: hotel opening and reopening consulting",
  alternateName: "Hotel Opening Consultant",
  description:
    "The hands-on hotel opening or reopening engagement for independent hotels, motels and inns: brand and budget to first guest, ten phases (concept and positioning, brand identity, pre-opening budget and year-one model, systems, sales and distribution, hiring, standards and training, marketing launch, soft opening, public opening and handoff), on site nationwide. Also covers the reset for an open, underperforming property. Quoted per project. Every Launch starts with The Modern Hotel Plan. Eight hotels opened from concept to ribbon-cutting, four repositioned.",
  provider: { "@id": "https://ramirezhospitality.com/#organization" },
  serviceType: "Hotel Opening Consulting",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://ramirezhospitality.com/openings",
};

const LAUNCH_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Openings() {
  return (
    <PageLayout
      title="Hotel Opening Consultant: The Modern Hotel Launch | Ramirez Hospitality Group"
      description="Concept to ribbon-cutting. Brand and budget to first guest, ten phases, on site nationwide. Eight hotels opened, four repositioned. Every Launch starts with The Modern Hotel Plan. Book an Opening Consultation."
      canonical="/openings"
      breadcrumbs={[{ name: OFFERS.launch.name, href: "/openings" }]}
      jsonLd={[LAUNCH_SERVICE_SCHEMA, LAUNCH_FAQ_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* I · HERO + FORM */}
      <section className="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.opening} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-vignette" />
        </div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <Eyebrow numeral="I" label={`${OFFERS.launch.name} · Hotel opening and reopening`} />
              <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
                Concept to ribbon-cutting.
                <br />
                <span className="italic text-brass">{OFFERS.launch.name}.</span>
              </h1>
              <p className="mt-9 text-cream/85 text-lg md:text-xl leading-[1.55] max-w-2xl">
                The hands-on opening or reopening engagement: brand and budget to first guest,
                ten phases, on site nationwide. For the owner with a signed lease or purchase, a
                renovation under way, or an opening date and no one who has opened a hotel
                before. Quoted per project. Every Launch starts with a Plan.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a href="#lead-form" className="btn-brass">
                  {OFFERS.launch.cta} <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#phases" className="link-brass pr-6">
                  The ten phases <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <p className="mt-8 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55">
                8 hotels opened from concept to ribbon-cutting · 4 repositioned · on site nationwide
              </p>
            </div>
            <div className="lg:col-span-5">
              <CrmCaptureForm
                heading={OFFERS.launch.cta}
                subheading="Tell me about the project: the stage it is at, the budget and the date. I will reach out to set up a 20-minute consultation. If it is not a fit, I will say so."
                footnote="Text consent is optional. The Launch is quoted per project after the Plan."
              />
            </div>
          </div>
        </div>
      </section>

      {/* II · THE MOMENT + PROOF */}
      <section className="py-20 lg:py-28 panel-emerald grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow numeral="II" label="The moment" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
                  The contractor has a schedule.
                  <br />
                  <span className="italic text-brass">The business does not.</span>
                </h2>
                <p className="mt-7 text-cream/80 leading-[1.7] max-w-xl">
                  The best openings feel inevitable. They never are. Every one of them is the
                  result of nine months of decisions made in the right order: the name before the
                  budget, the budget before the systems, the systems before the hiring, the
                  booking sites live in month two so the hotel is selling rooms before the paint
                  dries.
                </p>
                <p className="mt-4 text-cream/80 leading-[1.7] max-w-xl">
                  A general manager runs a hotel that exists. An opening is a different job: ten
                  phases in the right order, from the name and the budget to the first guest, and
                  it hands off to the manager at the end.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="border border-brass/30 bg-card p-7 lg:p-8">
                  <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">Opened and reopened</div>
                  <div className="mt-5 grid sm:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
                    {PROOF.map((s) => (
                      <div key={s.v} className="bg-obsidian p-5">
                        <div className="font-display text-3xl text-cream">{s.v}</div>
                        <div className="mt-1 text-cream/65 text-[0.8125rem] leading-[1.5]">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link href="/case-studies">
                      <span className="link-brass pr-6 text-sm">
                        Browse the case studies <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* III · THE TEN PHASES */}
      <section id="phases" className="py-24 lg:py-32 bg-obsidian scroll-mt-20">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-14">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="III" label="The method" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
                  Ten phases.
                  <br />
                  <span className="italic text-brass">All of them in the right order.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <p className="text-cream/65 leading-[1.7]">
                  A typical Launch runs 90 to 270 days from contract to ribbon-cutting. The range
                  moves with the property's size, the brand and the scope, so treat it as a
                  planning range, not a promise. The phases below are the blueprint on every
                  property, adapted to yours.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="grid md:grid-cols-2 gap-px bg-brass/15 border border-brass/15">
            {PHASES.map((p, i) => (
              <Reveal
                key={p.t}
                delay={i * 50}
                as="li"
                className="bg-obsidian p-7 lg:p-9 group hover:bg-card transition-colors duration-500"
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-display italic text-brass text-2xl w-9 shrink-0">{ROMAN[i]}</span>
                  <span className="font-display text-xl lg:text-2xl text-cream">{p.t}</span>
                </div>
                <p className="text-cream/65 text-sm leading-[1.7] pl-[3.25rem]">{p.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* IV · WHAT YOU HOLD AT THE END */}
      <section id="deliverables" className="py-24 lg:py-32 bg-obsidian border-t border-brass/15 scroll-mt-20">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="IV" label="What you hold at the end" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
                  Everything documented,
                  <br />
                  <span className="italic text-brass">in your name.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <p className="text-cream/70 leading-[1.7]">
                  Every Launch produces the same shelf of documents, built on your property and
                  kept live until the ribbon. Below, a sample status board, and the real
                  improvements program, labor budget and city brief from a Plan delivered in
                  September 2026, shared with the owner's permission and without the property's
                  name. Then the shelf itself.
                </p>
              </Reveal>
            </div>
          </div>
          <LaunchDeliverables />
        </div>
      </section>

      {/* V · THE RESET */}
      <section className="py-24 lg:py-32 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow numeral="V" label="Already open" />
                <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05] text-cream">
                  The reset that
                  <br />
                  <span className="italic text-brass">beat the renovation.</span>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-8 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">
                  Some hotels do not need construction. They need a reset: the brand, the team, the
                  pricing, the systems and the booking sites, done at once, ending in a relaunch.
                  The Launch covers this too, for a property that is open and underperforming.
                  Twist was a reset before it was a reopening.
                </p>
                <div className="mt-10">
                  <a href="#lead-form" className="btn-brass">
                    {OFFERS.launch.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={250}>
                <div className="border border-brass/25 p-8 lg:p-10 bg-card">
                  <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">A reset includes</div>
                  <ul className="space-y-4 text-cream/80">
                    {RESET_INCLUDES.map((s) => (
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

      {/* VI · HOW IT RUNS */}
      <section className="py-20 lg:py-28 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="VI" label="How it runs" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              Plan first. <span className="italic text-brass">Then the Launch.</span>
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
          <Reveal delay={300} className="mt-10 border border-brass/25 p-6 max-w-3xl">
            <div className="text-[0.62rem] tracking-[0.28em] uppercase text-brass mb-2">What the Launch is not</div>
            <p className="text-cream/75 text-sm leading-[1.7]">
              It is not a management contract, and it does not run the hotel after opening. It is
              the opening, done in the right order, and then handed to the people who will live
              there.
            </p>
          </Reveal>
          <Reveal delay={350} className="mt-8">
            <Link href={OFFERS.plan.path}>
              <span className="link-brass pr-6">
                How {OFFERS.plan.name} works <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
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
                <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
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
              Tell me about
              <br />
              <span className="italic text-brass">the project.</span>
            </h2>
            <p className="mt-7 text-cream/75 leading-[1.7] max-w-md">
              Five fields, then we reach out to set up a 20-minute consultation. If it is not a fit, we
              will say so.
            </p>
            <div className="mt-9">
              <a href="#lead-form" className="btn-brass">
                {OFFERS.launch.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
