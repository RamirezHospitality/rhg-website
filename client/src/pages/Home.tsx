/*
 * Ramirez Hospitality Group — The Reserve · HOME
 * Editorial dark mode. Audit-first, then the three offers as three doors.
 * Rebuilt 2026-09 to the September 9 offer brief: three offers, two tracks,
 * flat prices, one CTA per offer, form first.
 *
 * Sections: Hero · Three offers · The Modern Hotel Audit (shared) · The
 * Subscription in brief (shared) · Track B: Plan then Launch · Proof ·
 * The Operator (shared) · Common questions · Next step.
 *
 * SEO/GEO: FAQPage built from the brief's objection bank, an OfferCatalog
 * listing the three offers, Organization, Person.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { IMAGES, OFFERS, TRACK_RECORD_LINE } from "@/lib/brand";
import { ORGANIZATION_SCHEMA, PERSON_SCHEMA } from "@/components/SEO";
import { AuditSection } from "@/components/audit/AuditSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { OperatorSection } from "@/components/OperatorSection";

const [ESSENTIALS] = OFFERS.subscription.plans;

const DOORS = [
  {
    who: "You run a hotel",
    title: OFFERS.subscription.name,
    price: `${ESSENTIALS.name} ${ESSENTIALS.priceLabel} a month`,
    body: "Your prices set every day. Your booking sites worked. Your groups priced right. Three plans, one flat monthly fee each, published on the page. It starts with the free audit, and the audit tells you which plan captures what it found.",
    cta: { label: OFFERS.audit.cta, href: OFFERS.audit.formPath, primary: true },
    more: { label: "See the three plans", href: OFFERS.subscription.path },
  },
  {
    who: "You are buying, building or converting",
    title: OFFERS.plan.name,
    price: `${OFFERS.plan.priceLabel}, flat, priced up front`,
    body: "Know the numbers before you buy, build, or open. Three questions in order: is the demand real, does the math work, what is the property worth. The study, the model, and every number made to make sense, so the decision is yours.",
    cta: { label: OFFERS.plan.cta, href: OFFERS.plan.formPath, primary: false },
    more: { label: "How the Plan works", href: OFFERS.plan.path },
  },
  {
    who: "You have an opening date",
    title: OFFERS.launch.name,
    price: "Quoted per project",
    body: "Concept to ribbon-cutting. Brand and budget to first guest, ten phases, on site nationwide. Every Launch starts with a Plan. It also covers the reset for a hotel that is open and underperforming.",
    cta: { label: OFFERS.launch.cta, href: OFFERS.launch.formPath, primary: false },
    more: { label: "The ten phases", href: OFFERS.launch.path },
  },
];

const TRACK_B = [
  {
    n: "Step one",
    title: OFFERS.plan.name,
    body: `${OFFERS.plan.priceLabel}, flat, priced up front. A feasibility study for anyone buying, building or opening a hotel. Is the demand real? Does the math work? What is the property worth, by income, by comparable sales and by cost, and which of the three does the lender believe? The study, the model, and every number made to make sense, so the decision is yours. A broker's pro forma is a sales document. The Plan is not trying to sell you anything.`,
    cta: { label: OFFERS.plan.cta, href: OFFERS.plan.formPath, primary: true },
  },
  {
    n: "Step two",
    title: OFFERS.launch.name,
    body: "The hands-on opening or reopening engagement: brand and budget to first guest, ten phases, on site nationwide. The nine months of decisions that have to happen in the right order, with the booking sites live long before the paint dries. Quoted per project after the Plan. It also covers the reset for a property that is open and underperforming, which often beats the renovation.",
    cta: { label: OFFERS.launch.cta, href: OFFERS.launch.formPath, primary: false },
  },
  {
    n: "Then",
    title: "The Subscription picks up",
    body: "Once the hotel is open, the daily pricing, the booking sites and the group inquiries do not stop needing an owner. The Launch hands off to the Subscription so the revenue function is there from the first guest, not bolted on after the first soft season.",
    cta: { label: "See the three plans", href: OFFERS.subscription.path, primary: false, internal: true },
  },
];

const PROOF = [
  { who: "The Lincoln, Marfa, Texas", v: "41", l: "out of 100, grade D, on a property guests love. $55,000 to $185,000 in annual revenue opportunity identified on a $444,000 base." },
  { who: "Paloma, Palm Springs", v: "$1.5M", l: "year-one revenue for an upscale boutique opening. Featured in Travel & Leisure." },
  { who: "Twist Hotel", v: "6.4 to 9.1", l: "Booking score after a distressed turnaround and reopening. 60% direct booking rate." },
  { who: "Limón, California", v: "Launch", l: "upscale boutique launch, featured in Modernism Magazine." },
];

// The brief's objection bank, word for word where the brief gives the words.
const FAQ = [
  {
    q: "Will you price me out of my own market?",
    a: "You set the floors and ceilings for every room type. Nothing goes below your floor without your sign-off, every change is logged with the reason, and any change is reversed on request.",
  },
  {
    q: "Software does this for a fraction of the price. Why you?",
    a: "Duetto will price your rooms well, if someone sits in it every day, reads what booked overnight and turns it into action. The software is a tool for the person using it, and it is only as good as the discipline behind it. You are already running the front desk, the housekeeping schedule and the guests. Let the revenue work be ours: you focus on your guests, we focus on the revenue, so you can keep being the hotelier. One flat monthly fee, nothing on commission.",
  },
  {
    q: "So I have to buy software too? Do you take a cut?",
    a: "A revenue management system is required on every plan and is not included in the fee. Duetto is the system we prefer and set up by default, at specially negotiated pricing for every client on every plan. If you already run a system you prefer, tell us on the call and we will consider working inside it. We are a contracted Duetto vendor and pass the commission Duetto would pay us back to you as a lower rate. And no, we take no cut of anything: one flat monthly fee.",
  },
  {
    q: "How will I know it was you and not the market?",
    a: "Results are reported against your market, not just against last year, split into rate and occupancy, net of commission. The baseline is fixed in the audit before we change anything.",
  },
  {
    q: "My broker already gave me a pro forma.",
    a: "A broker's pro forma is a sales document. The Plan answers three questions in order, from someone who has run the front desk and priced the rooms, and it is not trying to sell you anything.",
  },
  {
    q: "I have a general manager for the opening.",
    a: "A general manager runs a hotel that exists. An opening is a different job: ten phases in the right order, from the name and the budget to the first guest, and it hands off to the manager at the end.",
  },
];

// ─── Structured data ─────────────────────────────────────────────────────────

const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const HOME_OFFER_CATALOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": "https://ramirezhospitality.com/#offers",
  name: "Ramirez Hospitality Group offers",
  url: "https://ramirezhospitality.com/",
  itemListElement: [
    {
      "@type": "Offer",
      name: OFFERS.audit.name,
      description: "Free. The hotel scored out of 100 across seven areas, every finding priced in dollars, the two most valuable fixes written out in full.",
      price: "0",
      priceCurrency: "USD",
      url: `https://ramirezhospitality.com${OFFERS.audit.path}`,
    },
    ...OFFERS.subscription.plans.map((p) => ({
      "@type": "Offer",
      name: `${OFFERS.subscription.name}: ${p.name}`,
      description: `${p.line} ${p.term}. Flat, nothing on commission.`,
      price: String(p.price),
      priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: String(p.price), priceCurrency: "USD", unitText: "month" },
      url: `https://ramirezhospitality.com${OFFERS.subscription.path}`,
    })),
    {
      "@type": "Offer",
      name: OFFERS.plan.name,
      description: "A hotel feasibility study for anyone buying, building or opening a hotel. Flat, priced up front.",
      price: String(OFFERS.plan.price),
      priceCurrency: "USD",
      url: `https://ramirezhospitality.com${OFFERS.plan.path}`,
    },
    {
      "@type": "Offer",
      name: OFFERS.launch.name,
      description: "The hands-on hotel opening or reopening engagement, ten phases, on site nationwide. Quoted per project after the Plan.",
      url: `https://ramirezhospitality.com${OFFERS.launch.path}`,
    },
  ],
};

function Cta({ label, href, primary, internal }: { label: string; href: string; primary?: boolean; internal?: boolean }) {
  const cls = primary ? "btn-brass" : "btn-ghost";
  if (internal) {
    return (
      <Link href={href}>
        <span className={cls}>
          {label} <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {label} <ArrowRight className="w-4 h-4" />
    </a>
  );
}

export default function Home() {
  return (
    <PageLayout
      title="Revenue Management and Openings for Independent Hotels | Ramirez Hospitality Group"
      description="Operator-led revenue and opening consultancy for independent and boutique hotels, motels and inns. The Modern Hotel Audit is free. Plans from $1,250 a month, flat. The Modern Hotel Plan, $6,000. Palm Springs, nationwide."
      ogImage={IMAGES.hero}
      jsonLd={[HOME_FAQ_SCHEMA, HOME_OFFER_CATALOG_SCHEMA, ORGANIZATION_SCHEMA, PERSON_SCHEMA]}
    >
      {/* ───────── I · HERO ───────── */}
      <section className="relative min-h-[100vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="A luxurious dark hotel lobby in Palm Springs at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-vignette" />
        </div>

        <div className="hidden xl:block absolute left-12 top-1/2 -translate-y-1/2 z-10">
          <div className="rotate-[-90deg] origin-left translate-y-[3rem] flex items-center gap-3">
            <div className="h-px w-10 bg-brass/70" />
            <span className="text-[0.62rem] tracking-[0.32em] uppercase text-cream/65">
              The Reserve · Estd 2023
            </span>
          </div>
        </div>

        <div className="container relative z-10 pb-24 pt-40 lg:pb-32 lg:pt-44">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-9 xl:col-span-8">
              <div className="animate-rise-in">
                <Eyebrow numeral="I" label={`${OFFERS.audit.name} · Free`} />
              </div>
              <h1 className="mt-7 font-display font-medium text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.4rem] xl:text-[5rem] leading-[1.02] text-cream tracking-[-0.025em] animate-rise-in delay-100">
                Get the property scored
                <br />
                <span className="italic text-brass">before you decide.</span>
              </h1>
              <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl animate-rise-in delay-200">
                For independent hotels, motels and inns, and for the people about to
                buy, build or open one. Prices set every day. Booking sites worked. Groups priced
                right. Openings run in the right order. Every price is flat, nothing
                is on commission, and everything we build lives in your own accounts.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5 animate-rise-in delay-300">
                <a href={OFFERS.audit.formPath} className="btn-brass">
                  {OFFERS.audit.cta} <ArrowRight className="w-4 h-4" />
                </a>
                <Link href={OFFERS.plan.path}>
                  <span className="btn-ghost">Buying, building or opening? {OFFERS.plan.name}</span>
                </Link>
              </div>
              <p className="mt-10 text-[0.7rem] tracking-[0.2em] uppercase text-cream/55 animate-rise-in delay-400">
                {TRACK_RECORD_LINE}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-rise-in delay-500">
          <span className="text-[0.6rem] tracking-[0.32em] uppercase text-cream/55">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-brass/70 to-transparent" />
        </div>
      </section>

      {/* ───────── II · THREE OFFERS ───────── */}
      <section className="relative py-24 lg:py-32 bg-obsidian border-t border-brass/15">
        <div className="container">
          <Reveal className="max-w-3xl mb-14">
            <Eyebrow numeral="II" label="Three offers" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
              Where are you with the property?
              <br />
              <span className="italic text-brass">Start there.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
            {DOORS.map((d, i) => (
              <Reveal key={d.title} delay={i * 100} className="bg-obsidian p-8 lg:p-9 flex flex-col gap-4">
                <span className="text-[0.62rem] tracking-[0.32em] uppercase text-cream/50">{d.who}</span>
                <h3 className="font-display text-2xl lg:text-[1.75rem] leading-tight text-cream">{d.title}</h3>
                <div className="font-display text-lg text-brass-soft">{d.price}</div>
                <p className="text-cream/75 text-sm leading-[1.7] flex-1">{d.body}</p>
                <div className="pt-2">
                  <Cta label={d.cta.label} href={d.cta.href} primary={d.cta.primary} />
                </div>
                <Link href={d.more.href}>
                  <span className="link-brass pr-6 text-sm">{d.more.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── III · THE MODERN HOTEL AUDIT ───────── */}
      <AuditSection numeral="III" />

      {/* ───────── IV · THE SUBSCRIPTION IN BRIEF ───────── */}
      <PricingSection numeral="IV" />

      {/* ───────── V · TRACK B: PLAN, THEN LAUNCH ───────── */}
      <section className="relative py-24 lg:py-32 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-3xl mb-14">
            <Eyebrow numeral="V" label="Before the property exists" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
              Know the numbers before you buy, build,
              <br />
              <span className="italic text-brass">or open.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
            {TRACK_B.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className="bg-card p-8 lg:p-9 flex flex-col">
                <div className="font-display italic text-brass text-2xl mb-3">{s.n}</div>
                <h3 className="font-display text-2xl text-cream mb-4">{s.title}</h3>
                <p className="text-cream/75 text-sm leading-[1.7] flex-1">{s.body}</p>
                <div className="mt-7">
                  <Cta label={s.cta.label} href={s.cta.href} primary={s.cta.primary} internal={"internal" in s.cta && s.cta.internal} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── VI · PROOF ───────── */}
      <section className="relative py-24 lg:py-32 panel-emerald grain border-y border-brass/15">
        <div className="container relative z-10">
          <Reveal className="max-w-3xl mb-14">
            <Eyebrow numeral="VI" label="Proof" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
              Numbers from
              <br />
              <span className="italic text-brass">real properties.</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brass/15 border border-brass/15">
            {PROOF.map((p, i) => (
              <Reveal key={p.who} delay={i * 100} className="bg-obsidian p-7 lg:p-8">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-4">{p.who}</div>
                <div className="font-display text-4xl text-cream leading-none">{p.v}</div>
                <p className="mt-3 text-cream/65 text-[0.8125rem] leading-[1.55]">{p.l}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <p className="mt-10 font-display italic text-xl lg:text-2xl text-cream/80 max-w-3xl leading-[1.45]">
              Six funded hospitality projects with full pro formas and sensitivity scenarios. Eight
              hotels opened from concept to ribbon-cutting, four repositioned, $10M+ in annual hotel
              revenue managed.
            </p>
          </Reveal>
          <Reveal delay={450} className="mt-8">
            <Link href="/case-studies">
              <span className="link-brass pr-6">
                Browse the case studies <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── VII · WHO DOES THE WORK ───────── */}
      <OperatorSection numeral="VII" />

      {/* ───────── VIII · COMMON QUESTIONS ───────── */}
      <section className="relative py-24 lg:py-32 bg-obsidian border-t border-brass/15" aria-label="Frequently Asked Questions">
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

      {/* ───────── IX · NEXT STEP ───────── */}
      <section className="relative py-24 lg:py-36 bg-obsidian border-t border-brass/15">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.audit} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/90 to-obsidian" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow numeral="IX" label="Next step" />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-7 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] text-cream">
                Get the property scored
                <br />
                <span className="italic text-brass">before you decide.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 text-cream/75 text-lg leading-[1.75] max-w-xl">
                Five fields, then we reach out to set up a 20-minute call. If it is not a fit, we will say
                so.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href={OFFERS.audit.formPath} className="btn-brass">
                  {OFFERS.audit.cta} <ArrowRight className="w-4 h-4" />
                </a>
                <a href={OFFERS.plan.formPath} className="btn-ghost">
                  {OFFERS.plan.cta}
                </a>
                <a href={OFFERS.launch.formPath} className="btn-ghost">
                  {OFFERS.launch.cta}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
