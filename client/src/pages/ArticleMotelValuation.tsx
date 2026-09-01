/*
 * Ramirez Hospitality Group — The Reserve · ARTICLE
 * Q01, Feasibility route. Week 1 of the editorial calendar (Aug 2026).
 * Body copy is verbatim from the approved article package — do not rewrite.
 * Numbers (55–70% cost range, 8% cap rate) match the same-week LinkedIn/
 * Facebook posts and reel; keep them in sync if either changes.
 */

import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";
import { BRAND } from "@/lib/brand";

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://ramirezhospitality.com/insights/what-is-a-motel-making-250k-a-year-actually-worth#article",
  headline: "What is a motel making $250K a year actually worth?",
  description:
    "A motel grossing $250K a year can be worth $600K or $1.4M. The four-step walk that tells you which one you are looking at, with the math shown and a free worksheet.",
  author: {
    "@type": "Person",
    name: "Adam Ramirez",
    url: "https://ramirezhospitality.com/about",
    jobTitle: "Founder & Principal Consultant, Ramirez Hospitality Group",
  },
  publisher: { "@id": "https://ramirezhospitality.com/#organization" },
  datePublished: "2026-08-31",
  dateModified: "2026-08-31",
  url: "https://ramirezhospitality.com/insights/what-is-a-motel-making-250k-a-year-actually-worth",
  about: [
    { "@type": "Thing", name: "Motel Valuation" },
    { "@type": "Thing", name: "Hotel Feasibility" },
    { "@type": "Thing", name: "Cap Rate" },
    { "@type": "Thing", name: "Small Hotel Underwriting" },
  ],
  keywords:
    "motel valuation, how to value a motel, cap rate, net operating income, hotel feasibility study, small hotel underwriting",
  wordCount: 1000,
  articleSection: "Feasibility",
  inLanguage: "en-US",
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good cap rate for a small motel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no single right number. Small independent properties generally trade at higher cap rates than branded hotels because the income is riskier, and the rate moves with location, condition, and the market. Treat any single figure as a starting point for negotiation, not a rule, and test your offer at more than one rate.",
      },
    },
    {
      "@type": "Question",
      name: "Do revenue multiples work for valuing a motel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only as a rough first screen. Two motels with the same revenue can carry very different costs, which is the whole problem this article walks through. If you use a multiple, use it to decide whether a listing is worth investigating, then do the four-step walk before you offer.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a feasibility or underwriting study before making an offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a first purchase, or any deal with a lender involved, the study is usually what turns your walk into numbers a bank will accept. At minimum, do the four steps yourself with the seller's real documents before you sign anything.",
      },
    },
  ],
};

export default function ArticleMotelValuation() {
  return (
    <PageLayout
      title="What Is a Motel Making $250K a Year Actually Worth? | Ramirez Hospitality Group"
      description="A motel grossing $250K a year can be worth $600K or $1.4M. The four-step walk that tells you which one you are looking at, with the math shown and a free worksheet."
      canonical="/insights/what-is-a-motel-making-250k-a-year-actually-worth"
      ogType="article"
      breadcrumbs={[
        { name: "Insights", href: "/insights" },
        { name: "What Is a Motel Making $250K a Year Actually Worth?", href: "/insights/what-is-a-motel-making-250k-a-year-actually-worth" },
      ]}
      article={{ author: "Adam Ramirez", datePublished: "2026-08-31" }}
      jsonLd={[ARTICLE_SCHEMA, FAQ_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-16 lg:pt-56 lg:pb-20 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="Feasibility · Field Notes" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4rem] leading-[1.08] text-cream tracking-[-0.02em]">
              What is a motel making <span className="italic text-brass">$250K</span> a
              year actually worth?
            </h1>
            <div className="mt-8 flex items-center gap-3 text-cream/60 text-sm">
              <span className="text-cream/85">By Adam Ramirez</span>
              <span className="text-brass/40">·</span>
              <span>Founder &amp; Principal Consultant</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="pb-16 lg:pb-24 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-[680px] text-cream/80 text-lg leading-[1.8] space-y-7">
            <p>
              Somewhere between about $600,000 and $1.4 million. That is not a dodge. The
              honest answer is that $250,000 of revenue cannot tell you what a motel is
              worth, because you are not buying revenue. You are buying what is left after
              the building is cleaned, heated, staffed, and insured, and two motels with
              identical revenue can leave behind very different numbers. Here is the walk I
              do before I say a price, with the math shown.
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-cream pt-4">
              You are not buying revenue
            </h2>
            <p>
              A buyer asked in a forum: "I'm looking at a motel that makes about $250K
              gross revenue annually. What is the price I can make an offer?" It is the
              right question with the wrong starting point. Listings for small properties
              love the revenue number because it is the biggest number in the building. But
              nobody pays the mortgage with revenue. What a lender will finance, and what
              the place will pay you back, comes from the profit left after operating
              costs. That leftover has a name, net operating income, but you do not need
              the vocabulary to do the math.
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-cream pt-4">
              The four-step walk
            </h2>
            <p>Step one, start at $250,000.</p>
            <p>
              Step two, take out operating costs. Cleaning, utilities, insurance, property
              taxes, repairs, supplies, the front desk, the booking commissions. On a small
              owner-run motel these usually eat 55 to 70 percent of revenue. That range is
              wide on purpose, because this is exactly where two identical-looking motels
              separate. What is left: somewhere between $75,000 and $112,000.
            </p>
            <p>
              Step three, price the owner's labor. This is the step people skip, and it is
              where most small-property listings flatter themselves. If the seller works
              the front desk, cleans rooms, and does the books, none of that shows up as an
              expense on their P&amp;L, but it is not free once you own the place. Either
              you do that work yourself, in which case the "profit" is partly just your
              unpaid wages, or you hire it done, in which case subtract what those hours
              cost at market rates. On a small motel that adjustment alone can take $40,000
              or more out of the leftover.
            </p>
            <p>
              Step four, apply a cap rate. A cap rate is just the yearly return a buyer
              demands for the risk. Divide what is left by that rate and you have a value.
              At 8 percent, which is in the neighborhood buyers ask of small independent
              motels, $75,000 of leftover is worth about $940,000 and $112,000 is worth
              about $1.4 million. If the owner-labor adjustment pulled the leftover down to
              $50,000, the same math says about $625,000. The right cap rate is a judgment
              call that moves with the market, the location, and the property's condition,
              which is one reason the same building can be worth different amounts to
              different buyers.
            </p>

            <p className="font-display italic text-2xl text-brass leading-[1.4] border-l-2 border-brass/40 pl-6 py-1">
              Same $250,000 of revenue. The value swings by half a million dollars or more,
              and the listing does not tell you which end you are looking at.
            </p>

            <p>
              If you want to run this on a property you are actually looking at, the free
              Small Hotel Underwriting Template does the four steps for you, with a worked
              example filled in. It is on the{" "}
              <a href="/downloads" className="text-brass underline underline-offset-2 decoration-brass/40 hover:decoration-brass">
                downloads page
              </a>
              .
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-cream pt-4">
              The number on the listing is not the number in the building
            </h2>
            <p>
              This year I audited The Lincoln, an independent hotel in Marfa, Texas (shared
              with the owners' permission). Two years of books, essentially the same
              revenue both years. Underneath, the machine had flipped: the second year sold
              270 more room nights at lower rates to get to the same top line. Same
              revenue, opposite strategies, and very different costs, wear, and futures. A
              buyer who priced that property off the revenue line would have had no idea
              which business they were buying. The P&amp;L and the monthly occupancy and
              rate history knew. The listing did not.
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-cream pt-4">
              What to ask the seller for
            </h2>
            <p>
              Five things, before you talk price. Three years of P&amp;Ls next to three
              years of tax returns, because sellers rarely overstate income to the IRS, and
              when the two disagree, believe the returns. An honest count of the hours the
              owner and their family put in, priced at market. An insurance quote in your
              name, not their grandfathered premium. Property taxes at your purchase price,
              not their assessed value. And twelve months of occupancy and average rate,
              month by month, which is one email to the broker and tells you what strategy
              produced the revenue.
            </p>
            <p>
              Sellers of small properties are rarely hiding these things. Most just have
              never been asked. If a seller cannot or will not produce them, that is an
              answer too.
            </p>

            <h2 className="font-display text-2xl md:text-3xl text-cream pt-4">
              So what do you offer?
            </h2>
            <p>
              Do the walk with real documents, put a cap rate range on the result, and you
              get a value range instead of a guess. Offer inside it, financed on terms a
              lender will actually accept, and be ready to show your math. A seller
              anchored to a revenue multiple may not like your number, but a number you can
              defend line by line beats a number you hoped.
            </p>
            <p>
              This is the math an underwriting study finishes before you sign. If you are
              looking at a property and want the walk done properly, with lender-ready
              numbers and sensitivity scenarios, that is the work I do. Book the Opening
              Consultation and bring the listing.
            </p>
            <p>
              The free Small Hotel Underwriting Template is on the{" "}
              <a href="/downloads" className="text-brass underline underline-offset-2 decoration-brass/40 hover:decoration-brass">
                downloads page
              </a>
              .
            </p>

            <div className="hairline my-10" />
            <p className="text-cream/60 text-base not-italic">
              Adam Ramirez, Ramirez Hospitality Group. 10+ years, 50+ hospitality
              properties.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15" aria-label="Frequently Asked Questions">
        <div className="container relative z-10">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow numeral="II" label="Common Questions" />
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-cream leading-[1.1]">
              Questions about
              <br />
              <span className="italic text-brass">motel valuation.</span>
            </h2>
          </Reveal>

          <div className="max-w-3xl space-y-0">
            {FAQ_SCHEMA.mainEntity.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <div className="border-b border-brass/15 py-8">
                  <h3 className="font-display text-xl lg:text-2xl text-cream mb-4 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-cream/70 text-base leading-[1.75]">
                    {item.acceptedAnswer.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-24 lg:py-32 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-2xl">
            <Eyebrow numeral="III" label="Next step" />
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-cream leading-[1.1]">
              Bring the listing.
              <br />
              <span className="italic text-brass">Book the Opening Consultation.</span>
            </h2>
            <p className="mt-7 text-cream/75 leading-[1.7]">
              Get the four-step walk done properly on the property you're actually looking
              at, with lender-ready numbers and sensitivity scenarios.
            </p>
            <div className="mt-9">
              <a
                href={BRAND.openingBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brass"
              >
                Book the Opening Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
