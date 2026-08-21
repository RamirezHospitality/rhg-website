/*
 * Ramirez Hospitality Group — The Reserve · ABOUT
 * Founder bio. No headshot — we lean on a typographic monogram + the story.
 */

import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { PRESS } from "@/lib/brand";
import { PERSON_SCHEMA, ORGANIZATION_SCHEMA } from "@/components/SEO";

const CAREER = [
  {
    role: "Hospitality Consultant",
    company: "Ramirez Hospitality Group · Self-employed",
    location: "Palm Springs, CA",
    period: "Oct 2023 – Present",
    bullet:
      "Acting Director of Revenue/Market strategist for independent, boutique, luxury, and lifestyle hotels. Built tech infrastructure for openings and re-openings: keylock systems, HR/timeclock, CRM, RMS, PMS development and installation. Active engagements: Dunes Palm Springs, Town & Desert Hospitality, The Paloma Resort, The Stardust Palm Springs.",
  },
  {
    role: "Area Director",
    company: "DORM / LIT Property Group",
    location: "Palm Springs, CA",
    period: "Jun 2021 – Oct 2023",
    bullet:
      "Opened 8 hotels from concept to ribbon-cutting — including The Paloma Resort, Twist Palm Springs, Limón Palm Springs, The Stardust, Dunes Palm Springs, and more — and repositioned more than 4 others including The Creekstone Inn. Managed $10M in annual revenue and a team of 120+ across all properties. Drove $1.5M Y1 at Paloma, +$1M / +40% revenue lift at Twist (60% direct bookings), and $750K on six keys at Limón (ADR $550+).",
  },
  {
    role: "Regional Operations Manager",
    company: "Fit For a King",
    location: "Palm Springs, CA",
    period: "Dec 2019 – Jun 2021",
    bullet:
      "Managed $6M across a high-end boutique portfolio plus 18 luxury vacation rentals (ADRs $179–$4K). Selected and integrated PMS, accounting, and RMS for centralized oversight — achieved 90%+ occupancy with sub-4% cancellation. Directed renovations at Bellevue Oasis and secured $1.2M in renovation financing for Float Palm Springs.",
  },
  {
    role: "Vacation Rental Marketing & Operations Consultant",
    company: "Palm Luxury Properties",
    location: "Palm Springs, CA",
    period: "Jan 2018 – Jan 2023",
    bullet:
      "Advised a boutique vacation-rental management company on operational and luxury service standards across 34 luxury properties (ADRs $1.5K–$4K+). Implemented a guest-centric concierge program that drove $50K in new revenue and held 90% MoM occupancy through legacy-guest retention and targeted email/geo campaigns.",
  },
  {
    role: "Director of Operations",
    company: "Sands Hotel & Spa",
    location: "Indian Wells, CA",
    period: "Jan 2018 – Dec 2019",
    bullet:
      "Managed $5M annual revenue at a 46-room luxury lifestyle boutique featured in Condé Nast Traveler and Forbes. Modernized FOH operations and training (cut recruit/training cost per person by 50%), introduced a VIP guest service program, and held a 9.8 Expedia and 4.9 Google rating across hundreds of reviews.",
  },
  {
    role: "Front Office Manager",
    company: "Saguaro Hotel",
    location: "Palm Springs, CA",
    period: "2017 – 2018",
    bullet: "Managed front-of-house operations at one of Palm Springs' most recognized lifestyle properties.",
  },
  {
    role: "Front Desk Supervisor",
    company: "Courtyard Palm Desert",
    location: "Palm Desert, CA",
    period: "2016 – 2017",
    bullet: "Supervised front-desk team and guest services at the Marriott-branded select-service hotel.",
  },
  {
    role: "Owner / Operator",
    company: "Desert Lifestyle Marketing",
    location: "La Quinta, CA",
    period: "2013 – 2017",
    bullet: "Founded and ran a marketing services business focused on hospitality and lifestyle brands across the Coachella Valley.",
  },
];

export default function About() {
  return (
    <PageLayout
      title="About Adam Ramirez — Hotel Consultant & Revenue Manager, Palm Springs CA | Ramirez Hospitality Group"
      description="Adam Ramirez is a Palm Springs-based hotel operator and hospitality consultant with 15+ years of experience. He has opened 8 hotels, managed $10M+ in annual revenue, and led teams of 120+. His properties have been featured in Travel & Leisure, Condé Nast Traveler, Forbes, and Modernism Magazine. Founder of Ramirez Hospitality Group."
      canonical="/about"
      ogType="profile"
      breadcrumbs={[{ name: "About Adam Ramirez", href: "/about" }]}
      jsonLd={[PERSON_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-20 lg:pt-56 lg:pb-28 bg-obsidian">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <Eyebrow numeral="I" label="The Operator" />
              <h1 className="mt-7 font-display font-medium text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] text-cream tracking-[-0.025em]">
                Hi, <span className="italic">I'm</span>
                <br />
                <span className="text-brass">Adam.</span>
              </h1>
              <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-xl">
                I've spent the last fifteen years inside independent and boutique hotels —
                opening them, renovating them, rescuing them, and running them. Today I do
                that work for the owners who want to skip the six-figure salary and get
                straight to the result.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative h-72 lg:h-80 border border-brass/30 grain bg-card">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-display text-[8rem] lg:text-[10rem] leading-none text-brass/80 tracking-[-0.04em]">
                      AR
                    </div>
                    <div className="mt-3 text-[0.62rem] tracking-[0.32em] uppercase text-cream/60">
                      Operator · Palm Springs
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -left-3 w-12 h-12 border-l border-t border-brass/60" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r border-b border-brass/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II · BIO */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <Reveal>
                <Eyebrow numeral="II" label="The Story" />
              </Reveal>
            </div>
            <div className="lg:col-span-9 space-y-7 text-cream/85 text-lg leading-[1.8]">
              <Reveal delay={120}>
                <p className="font-display italic text-2xl lg:text-3xl text-cream leading-[1.4] mb-2">
                  I started in hospitality at sixteen, in the back of a hotel kitchen. I'm
                  forty-something now and have never worked in anything else.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  Every job, every promotion, every hotel I've touched has been an
                  independent or boutique property. That's not an accident. The chains have
                  their playbooks. Independents have to write their own. That's the work I'm
                  built for.
                </p>
              </Reveal>
              <Reveal delay={280}>
                <p>
                  Over the last decade and a half I've opened 8 hotels from concept to ribbon-cutting, repositioned more than 4, and worked with a portfolio of luxury vacation rentals across the Coachella Valley. The properties I've launched — Paloma, Twist, Limón, The Stardust, Dunes, and more — span the full spectrum of independent boutique hospitality. I've
                  taken a distressed Palm Springs property from a 6.4 Booking score to a
                  9.1 in eleven months and built it into a 60% direct-booking machine. At
                  the Sands Hotel & Spa I held a 9.8 Expedia rating and a 4.9 on Google
                  across hundreds of reviews. I've managed more than $10M in annual hotel
                  revenue, hired and led teams of 120+, and overseen renovation and
                  construction budgets in the seven figures.
                </p>
              </Reveal>
              <Reveal delay={360}>
                <p>
                  My properties have been written about in <em>Travel & Leisure</em>,{" "}
                  <em>Condé Nast Traveler</em>, <em>Forbes</em>, and{" "}
                  <em>Modernism Magazine</em>. I've sat across the table from architects,
                  contractors, OTA reps, asset managers, lenders, and owners. I know what
                  an owner needs to hear and what a contractor will try to hide. I know
                  which OTA promotions are worth running and which ones quietly cost you
                  direct bookings. I know the difference between a great PMS and a great
                  PMS that nobody on your team knows how to use.
                </p>
              </Reveal>
              <Reveal delay={440}>
                <p>
                  The practice today is Adam-led on purpose. When you hire Ramirez
                  Hospitality Group you get me — on the strategy, on the calls, on the
                  audit, on the report. I bring the right tech stack — Hotelitix, Duetto,
                  Light House, Revinate, OpenAI's GPT — to do the math. I bring fifteen
                  years of operator instinct to do everything else.
                </p>
              </Reveal>
              <Reveal delay={520}>
                <p className="text-brass font-display italic text-xl">
                  Based in Palm Springs. Available nationwide.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* III · CREDENTIALS */}
      <section className="py-24 lg:py-32 bg-obsidian">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
            <Reveal className="bg-obsidian p-8 lg:p-10">
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
                Track Record
              </div>
              <ul className="space-y-3 text-cream/80 text-sm">
                <li>$10M+ managed annual revenue</li>
                <li>$1M+ single-property revenue lifts</li>
                <li>120+ team members hired and led</li>
                <li>9.8 Expedia · 4.9 Google (Sands)</li>
                <li>60% direct booking rate (Twist)</li>
                <li>ADR $550+ (Limón)</li>
              </ul>
            </Reveal>
            <Reveal delay={100} className="bg-obsidian p-8 lg:p-10">
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
                Press
              </div>
              <ul className="space-y-3 text-cream/80 text-sm font-display italic text-lg">
                {PRESS.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={200} className="bg-obsidian p-8 lg:p-10">
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
                Affiliations & Certifications
              </div>
              <ul className="space-y-3 text-cream/80 text-sm">
                <li>Board Member, Cathedral City Chamber of Commerce</li>
                <li>Board Member, Small Hotel Association of Palm Springs</li>
                <li>Member, Palm Springs Hospitality Association</li>
                <li>Revenue Management Certificate — AHLEI</li>
                <li>Tourism Ambassador — Palm Springs Tourism Bureau</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IV · CAREER LIST */}
      <section className="py-24 lg:py-32 panel-emerald grain border-t border-brass/15">
        <div className="container relative z-10">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <Eyebrow numeral="III" label="A Career in Hotels" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05] text-cream">
                Every property,
                <br />
                <span className="italic text-brass">in chronological order.</span>
              </h2>
            </Reveal>
          </div>

          <ol>
            {CAREER.map((c, i) => (
              <Reveal key={c.role + c.period} delay={i * 60}>
                <li className="grid grid-cols-12 gap-6 lg:gap-10 py-7 border-b border-brass/15">
                  <div className="col-span-12 lg:col-span-3 text-[0.62rem] tracking-[0.32em] uppercase text-brass/85 pt-1">
                    {c.period}
                  </div>
                  <div className="col-span-12 lg:col-span-9">
                    <h3 className="font-display text-2xl lg:text-3xl text-cream leading-snug">
                      {c.role}
                    </h3>
                    <div className="mt-1 text-cream/70 text-sm">
                      {c.company} · {c.location}
                    </div>
                    <p className="mt-4 text-cream/75 text-base leading-[1.7] max-w-3xl">
                      {c.bullet}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </PageLayout>
  );
}
