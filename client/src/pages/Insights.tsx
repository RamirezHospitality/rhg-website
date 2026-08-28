/*
 * Ramirez Hospitality Group — The Reserve · INSIGHTS
 * Editorial blog index + the live "Why Your RevPAR Is a Thing of the Past" article inline.
 */

import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";
import { BRAND } from "@/lib/brand";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://ramirezhospitality.com/insights#revpar-article",
  headline: "Why Your RevPAR Is a Thing of the Past",
  description:
    "RevPAR tells you what happened. It does not tell you what is about to. Here are the five metrics every independent hotel owner should track instead: pace, channel cost, repeat-guest revenue share, composite RevPAR, and rate dispersion.",
  author: {
    "@type": "Person",
    name: "Adam Ramirez",
    url: "https://ramirezhospitality.com/about",
    jobTitle: "Founder & Principal Consultant, Ramirez Hospitality Group",
  },
  publisher: {
    "@id": "https://ramirezhospitality.com/#organization",
  },
  datePublished: "2026-04-01",
  dateModified: "2026-04-01",
  url: "https://ramirezhospitality.com/insights",
  about: [
    { "@type": "Thing", name: "Hotel Revenue Management" },
    { "@type": "Thing", name: "RevPAR" },
    { "@type": "Thing", name: "Hotel KPIs" },
    { "@type": "Thing", name: "Independent Hotels" },
  ],
  keywords: "RevPAR, hotel revenue management, hotel KPIs, pace vs pickup, channel cost, repeat guest revenue, composite RevPAR, rate dispersion, independent hotel metrics",
  wordCount: 900,
  articleSection: "Revenue Strategy",
  inLanguage: "en-US",
};

const COMING = [
  "The OTA promotion that quietly costs you eight points of margin",
  "How to design a direct-booking incentive a guest will actually use",
  "The fourteen hires you have to make before you open a hotel",
  "Why your loyalty program is failing — and the three-tier model that fixes it",
  "A real budget conversation with an independent hotel owner",
];

export default function Insights() {
  const [open, setOpen] = useState(false);

  return (
    <PageLayout
      title="Hotel Revenue Management Insights — Notes from a Hotel Operator | Ramirez Hospitality Group"
      description="Expert field notes on hotel revenue management, OTA strategy, direct booking, hotel openings, and the small decisions that move the needle for independent and boutique hotels. Written by Adam Ramirez, hotel operator with 10+ years of experience."
      canonical="/insights"
      ogType="article"
      breadcrumbs={[{ name: "Insights", href: "/insights" }]}
      article={{ author: "Adam Ramirez", datePublished: "2026-04-01" }}
      jsonLd={[ARTICLE_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-20 lg:pt-56 lg:pb-28 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="The Notebook" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Field notes from
              <br />
              <span className="italic text-brass">inside the hotel.</span>
            </h1>
            <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Short, useful pieces on revenue management, OTA optimization, direct booking,
              openings, and the small decisions that actually move the needle.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <Reveal>
            <Eyebrow numeral="II" label="Featured" />
          </Reveal>
          <Reveal delay={120}>
            <article
              className="mt-10 group cursor-pointer border border-brass/30 hover:border-brass/70 transition-all duration-500 bg-obsidian/70"
              onClick={() => setOpen(true)}
            >
              <div className="grid lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 p-10 lg:p-14">
                  <div className="flex items-center gap-3 text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
                    <span>Revenue Strategy</span>
                    <span className="text-brass/40">·</span>
                    <span className="text-cream/60">8 Min Read</span>
                    <span className="text-brass/40">·</span>
                    <span className="text-cream/60">April 2026</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream leading-[1.1] mb-7 group-hover:text-brass transition-colors duration-500">
                    Why Your RevPAR
                    <br />
                    <span className="italic">Is a Thing of the Past</span>
                  </h2>
                  <p className="text-cream/75 leading-[1.7] max-w-xl">
                    For two decades RevPAR was the headline number every owner asked for,
                    every revenue manager defended, and every brand reported in earnings.
                    It still matters. But if RevPAR is the only number on your dashboard,
                    you are running your hotel on a snapshot — and the picture has already
                    moved.
                  </p>
                  <div className="mt-10 flex items-center gap-2 text-brass text-xs tracking-[0.18em] uppercase font-semibold">
                    Read the Piece <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
                <div className="lg:col-span-5 panel-emerald grain p-10 lg:p-14 flex items-center justify-center relative">
                  <div className="text-center relative z-10">
                    <div className="font-display italic text-7xl lg:text-8xl text-brass leading-none">
                      RevPAR
                    </div>
                    <div className="mt-4 text-cream/70 text-sm tracking-[0.32em] uppercase">
                      A Thing of the Past
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* COMING NEXT */}
      <section className="py-24 lg:py-32 bg-obsidian">
        <div className="container">
          <Reveal>
            <Eyebrow numeral="III" label="Coming Next" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05] mb-12">
              On the editorial calendar.
            </h2>
          </Reveal>

          <ol className="border-t border-brass/20">
            {COMING.map((c, i) => (
              <Reveal key={c} delay={i * 60}>
                <li className="grid grid-cols-12 gap-4 items-baseline px-2 py-7 border-b border-brass/15 hover:bg-card/50 transition-colors duration-300 group">
                  <div className="col-span-1 font-display italic text-brass text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-9 lg:col-span-9 font-display text-xl lg:text-2xl text-cream/85 leading-snug">
                    {c}
                  </div>
                  <div className="col-span-2 lg:col-span-2 text-[0.62rem] tracking-[0.32em] uppercase text-brass/70 text-right">
                    Soon
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* MODAL — full article */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-sm overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="fixed top-6 right-6 z-10 text-cream hover:text-brass transition-colors p-2"
            aria-label="Close article"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="container max-w-3xl py-20 lg:py-32" onClick={(e) => e.stopPropagation()}>
            <Eyebrow numeral="II" label="Featured · Revenue Strategy" />
            <h1 className="mt-7 font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.05]">
              Why Your RevPAR
              <br />
              <span className="italic text-brass">Is a Thing of the Past</span>
            </h1>
            <div className="mt-6 flex items-center gap-3 text-cream/60 text-sm">
              <span>By Adam Ramirez</span>
              <span className="text-brass/40">·</span>
              <span>8 min read</span>
              <span className="text-brass/40">·</span>
              <span>April 2026</span>
            </div>
            <div className="hairline my-10" />
            <article className="prose-invert text-cream/85 text-lg leading-[1.8] space-y-7">
              <p>
                For two decades, RevPAR was the headline number every owner asked for,
                every revenue manager defended, and every brand reported in earnings. It is
                still useful. It is still on every dashboard I build. But if RevPAR is the
                <em> only</em> number on your dashboard — or the first one you look at — you
                are running your hotel on a snapshot, and the picture has already moved.
              </p>
              <p className="font-display italic text-2xl text-brass leading-[1.4]">
                RevPAR tells you what happened. It does not tell you what is about to.
              </p>
              <p>
                Here is what I look at first, every morning, on every property I touch.
                None of these are new. All of them, together, will tell you more about your
                hotel in five minutes than RevPAR will tell you in five months.
              </p>
              <h2 className="font-display text-3xl text-cream pt-6">
                I. Pace, not pickup.
              </h2>
              <p>
                Pickup is the count of rooms sold yesterday. Pace is the comparison of
                today's on-the-books position against the same day last year, last month, or
                against budget. Pickup answers <em>"did we sell rooms?"</em> Pace answers{" "}
                <em>"are we ahead or behind?"</em> Pace is what tells you whether to drop
                rates, hold them, or push them up. Pickup is what tells you whether to feel
                good about yesterday.
              </p>
              <h2 className="font-display text-3xl text-cream pt-6">
                II. Channel cost, not channel mix.
              </h2>
              <p>
                Most independents look at channel mix — the percentage of bookings from each
                source. Useful. Incomplete. The number that actually matters is{" "}
                <em>channel cost</em> — the all-in cost of acquiring a booking from that
                channel, including commissions, payment processing, billboard effects, and
                the loyalty discount you give to win them back. A 25% Booking.com booking is
                not the same as a 25% direct booking, even if they print the same ADR.
              </p>
              <h2 className="font-display text-3xl text-cream pt-6">
                III. Repeat-guest revenue share.
              </h2>
              <p>
                What percentage of your revenue this month came from a guest who has stayed
                with you before? At a healthy independent boutique, this number lives
                between 18% and 32%. If you are below 15%, you have a retention problem
                wearing the mask of an acquisition problem. The fix is almost never another
                ad campaign. It is a loyalty layer, an email program, and a direct
                relationship with the guest.
              </p>
              <h2 className="font-display text-3xl text-cream pt-6">
                IV. Composite RevPAR.
              </h2>
              <p>
                RevPAR is rooms-only. The vast majority of independent hotels also sell
                food, beverage, parking, spa, and event space. <em>Composite RevPAR</em> —
                total revenue divided by available rooms — is a far better measure of an
                asset's actual yield. If your TRevPAR is 1.5x your RevPAR, your F&B is
                pulling its weight. If it is 1.1x, you have an outlet that is leaking money
                and you do not know it yet.
              </p>
              <h2 className="font-display text-3xl text-cream pt-6">
                V. Rate dispersion, not rate average.
              </h2>
              <p>
                ADR is an average. It hides everything. The number I want to see is the
                spread between your top-decile rate and your bottom-decile rate, and how
                often each fires. A hotel with the same ADR can be running a healthy yield
                management program — or quietly giving away the property at the bottom of
                the funnel. The dispersion shows you which.
              </p>
              <h2 className="font-display text-3xl text-cream pt-6">
                The point.
              </h2>
              <p>
                None of this is anti-RevPAR. RevPAR is a fine number. It is the first one
                an asset manager will ask for and the last one a brand will report. But the
                age of running a hotel on a single headline metric is over. The independent
                hotels that win the next decade will be the ones that build a small cluster
                of leading indicators — pace, channel cost, repeat-guest share, composite
                RevPAR, rate dispersion — and run their property by them.
              </p>
              <p>
                If your dashboard is RevPAR and a smile, it is time for a new dashboard.
              </p>
              <div className="hairline mt-10" />
              <p className="text-cream/65 text-base">
                — Adam Ramirez runs Ramirez Hospitality Group, a revenue management and
                hospitality consulting practice for independent and boutique hotels. Every
                client starts with{" "}
                <a
                  href={BRAND.auditBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass underline"
                >
                  The Modern Hotel Audit
                </a>
                , free and no strings.
              </p>
            </article>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
