/*
 * Ramirez Hospitality Group — The Reserve · EVERYTHING WE DO
 * Route: /services
 *
 * A plain index of the three offers in the order an owner meets them (the
 * audit, the Subscription, the Plan, the Launch), then the project work that
 * is quoted on its own, then event production and the vacation-rental note,
 * both kept at Adam's request. This page links; the offer pages sell. It no
 * longer carries a second long description of the subscription, so it does
 * not compete with /revenue-management for the same phrase.
 *
 * The old pillar anchors (#tech-systems, #operations, #renovations,
 * #asset-advisory, #events) are kept as ids so old links land somewhere.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { EventGallery } from "@/components/EventGallery";
import { IMAGES, OFFERS } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const [ESSENTIALS] = OFFERS.subscription.plans;

interface OfferRow {
  n: string;
  id: string;
  who: string;
  name: string;
  price: string;
  body: string;
  cta: { label: string; href: string };
  more: { label: string; href: string };
  image: string;
}

const ROWS: OfferRow[] = [
  {
    n: "I",
    id: "audit",
    who: "If you run a hotel, start here",
    name: OFFERS.audit.name,
    price: "Free",
    body: "Your hotel scored out of 100 across seven areas, every finding priced in dollars, the two most valuable fixes written out in full and yours to keep. Every finding is tagged to the cheapest plan that captures it, so the plan decision is arithmetic, not a pitch.",
    cta: { label: OFFERS.audit.cta, href: OFFERS.audit.formPath },
    more: { label: "How the audit works", href: OFFERS.audit.path },
    image: IMAGES.audit,
  },
  {
    n: "II",
    id: "subscription",
    who: "Then, if it fits",
    name: OFFERS.subscription.name,
    price: `${ESSENTIALS.name} ${ESSENTIALS.priceLabel} a month. Three plans, flat.`,
    body: "Your prices set every day. Your booking sites worked. Your groups priced right. The revenue department every big hotel has, built for independent and boutique hoteliers, run by an operator inside rules you set. Nothing on commission. No software included in the fee.",
    cta: { label: OFFERS.audit.cta, href: OFFERS.audit.formPath },
    more: { label: "See the three plans", href: OFFERS.subscription.path },
    image: IMAGES.revenue,
  },
  {
    n: "III",
    id: "plan",
    who: "If you are buying, building or converting",
    name: OFFERS.plan.name,
    price: `${OFFERS.plan.priceLabel}, flat, priced up front`,
    body: "Know the numbers before you buy, build, or open. Is the demand real, does the math work, what is the property worth. The study, the model, and a clear yes, no, or not at this price. A broker's pro forma is a sales document; the Plan is allowed to say no.",
    cta: { label: OFFERS.plan.cta, href: OFFERS.plan.formPath },
    more: { label: "How the Plan works", href: OFFERS.plan.path },
    image: IMAGES.advisory,
  },
  {
    n: "IV",
    id: "launch",
    who: "If you have an opening date",
    name: OFFERS.launch.name,
    price: "Quoted per project, after the Plan",
    body: "Concept to ribbon-cutting. Brand and budget to first guest, ten phases, on site nationwide. It also covers the reset for a hotel that is open and underperforming. A general manager runs a hotel that exists; an opening is a different job.",
    cta: { label: OFFERS.launch.cta, href: OFFERS.launch.formPath },
    more: { label: "The ten phases", href: OFFERS.launch.path },
    image: IMAGES.opening,
  },
];

const PROJECT_WORK = [
  { id: "loyalty", label: "Loyalty program design" },
  { id: "crm", label: "Guest database and email" },
  { id: "tech-systems", label: "Website and booking engine rebuild" },
  { id: "operations", label: "Systems migration: property management, channel manager, keys, scheduling" },
  { id: "renovations", label: "Booking-site terms renegotiation" },
  { id: "asset-advisory", label: "Paid media setup for Essentials and Growth clients" },
  { id: "space", label: "Rezoning or space studies" },
];

const EVENT_DELIVERABLES = [
  "Brand partnership and activation concept development",
  "Full-property event design and production management",
  "Private chef sourcing and custom menu development",
  "Vendor sourcing: florals, lighting, entertainment, décor",
  "Guest experience design from arrival to departure",
  "On-site production management and day-of execution",
];

const SERVICES_ITEMLIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ramirez Hospitality Group: everything we do",
  description: "Three offers for independent hotels, in the order an owner meets them, with every price on the page. Project work quoted on its own.",
  url: "https://ramirezhospitality.com/services",
  numberOfItems: 4,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: OFFERS.audit.name, url: `https://ramirezhospitality.com${OFFERS.audit.path}` },
    { "@type": "ListItem", position: 2, name: "The Subscription: hotel revenue management", url: `https://ramirezhospitality.com${OFFERS.subscription.path}` },
    { "@type": "ListItem", position: 3, name: `${OFFERS.plan.name}: hotel feasibility study`, url: `https://ramirezhospitality.com${OFFERS.plan.path}` },
    { "@type": "ListItem", position: 4, name: `${OFFERS.launch.name}: hotel opening and reopening`, url: `https://ramirezhospitality.com${OFFERS.launch.path}` },
  ],
};

export default function Services() {
  return (
    <PageLayout
      title="What Ramirez Hospitality Group Does: Audit, Subscription, Plan, Launch"
      description="Three offers for independent hotels, in the order an owner meets them, with every price on the page: The Modern Hotel Audit (free), the revenue management subscription from $1,250 a month, The Modern Hotel Plan ($6,000) and The Modern Hotel Launch. Project work quoted on its own."
      canonical="/services"
      breadcrumbs={[{ name: "Everything we do", href: "/services" }]}
      jsonLd={[SERVICES_ITEMLIST_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-20 lg:pt-56 lg:pb-28 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="Everything we do" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Three offers,
              <br />
              <span className="italic text-brass">in the order an owner meets them.</span>
            </h1>
            <p className="mt-9 text-cream/75 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Every price is flat. Nothing is on commission. Everything we build
              lives in your own accounts. Anything outside the three offers is project work,
              quoted before it starts.
            </p>
          </div>
        </div>
      </section>

      {/* THE OFFERS */}
      <section className="bg-obsidian">
        {ROWS.map((r, i) => {
          const isAlt = i % 2 === 1;
          return (
            <article key={r.id} id={r.id} className={`relative border-t border-brass/15 scroll-mt-20 ${isAlt ? "panel-walnut grain" : ""}`}>
              <div className="container py-16 lg:py-24 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  <div className={`lg:col-span-5 ${isAlt ? "lg:order-2" : "lg:order-1"}`}>
                    <Reveal>
                      <div className="relative">
                        <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-brass/40" />
                        <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-brass/40" />
                        <img src={r.image} alt={r.name} className="w-full aspect-[4/3] object-cover relative z-10" />
                      </div>
                    </Reveal>
                  </div>
                  <div className={`lg:col-span-7 ${isAlt ? "lg:order-1" : "lg:order-2"}`}>
                    <Reveal delay={120}>
                      <div className="flex items-center gap-4 text-brass mb-6">
                        <span className="font-display italic text-3xl">{r.n}</span>
                        <span className="text-brass/40">·</span>
                        <span className="text-[0.62rem] tracking-[0.32em] uppercase">{r.who}</span>
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.08] text-cream">{r.name}</h2>
                      <p className="mt-4 font-display text-xl text-brass-soft">{r.price}</p>
                      <p className="mt-5 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">{r.body}</p>
                      <div className="mt-9 flex flex-wrap items-center gap-5">
                        <a href={r.cta.href} className="btn-brass">
                          {r.cta.label} <ArrowRight className="w-4 h-4" />
                        </a>
                        <Link href={r.more.href}>
                          <span className="link-brass pr-6">{r.more.label}</span>
                        </Link>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* PROJECT WORK */}
      <section className="py-24 lg:py-32 panel-emerald grain border-t border-brass/15">
        <div className="container relative z-10">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <Eyebrow numeral="V" label="Project work" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05] text-cream">
                Quoted on its own,
                <br />
                <span className="italic text-brass">so the monthly fee stays honest.</span>
              </h2>
              <p className="mt-7 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">
                Some work is a project, not a subscription. Each of these is scoped and quoted
                before it starts, usually after the audit has shown whether it is worth doing.
              </p>
            </Reveal>
          </div>
          <div className="border border-brass/25">
            {PROJECT_WORK.map((a, i) => (
              <Reveal
                key={a.id}
                delay={i * 60}
                className={`grid grid-cols-12 gap-4 items-center px-6 lg:px-10 py-6 lg:py-7 scroll-mt-20 ${
                  i < PROJECT_WORK.length - 1 ? "border-b border-brass/15" : ""
                }`}
              >
                <div id={a.id} className="col-span-1 font-display italic text-brass text-xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-11 text-cream text-base lg:text-lg">{a.label}</div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-8 text-cream/60 text-sm leading-[1.7] max-w-2xl">
            The audit is where project work gets found and sized. If you run a hotel,{" "}
            <a href={OFFERS.audit.formPath} className="text-brass hover:text-cream transition-colors underline underline-offset-4 decoration-brass/40">
              {OFFERS.audit.cta}
            </a>
            . If you are buying or building,{" "}
            <a href={OFFERS.plan.formPath} className="text-brass hover:text-cream transition-colors underline underline-offset-4 decoration-brass/40">
              {OFFERS.plan.cta}
            </a>
            .
          </Reveal>
        </div>
      </section>

      {/* EVENT PRODUCTION */}
      <article id="events" className="relative border-t border-brass/15 scroll-mt-20">
        <div className="container py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-brass/40" />
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-brass/40" />
                  <img src={IMAGES.events} alt="Full-property event production" className="w-full aspect-[4/3] object-cover relative z-10" />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div className="flex items-center gap-4 text-brass mb-6">
                  <span className="font-display italic text-3xl">VI</span>
                  <span className="text-brass/40">·</span>
                  <span className="text-[0.62rem] tracking-[0.32em] uppercase">Brand activations and takeovers</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.08] text-cream">
                  Full-Property Event Production
                </h2>
                <p className="mt-5 text-cream/65 text-base lg:text-lg leading-[1.7] italic">
                  You do not just host the event. You become the event.
                </p>
                <p className="mt-6 text-cream/75 text-base leading-[1.75] max-w-2xl">
                  When a brand wants to take over a hotel completely, I run the production. Hugo
                  Boss full hotel takeover. Levi's total hotel takeover. NYX Cosmetics beauty bar
                  activation. BMW and Volkswagen vehicle launch events. I source everything:
                  private chefs, custom menus, florals, lighting, entertainment, the silverware on
                  the table. The hotel becomes the set, the brand becomes the story, and the guest
                  experience holds from arrival to departure.
                </p>
                <EventGallery />
                <div className="border-l-2 border-brass/40 pl-6 mt-7">
                  <div className="text-[0.62rem] tracking-[0.28em] uppercase text-brass mb-4">Deliverables</div>
                  <ul className="space-y-2">
                    {EVENT_DELIVERABLES.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-cream/70 text-sm leading-[1.6]">
                        <span className="text-brass mt-0.5 shrink-0">◆</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-9">
                  <Link href="/contact">
                    <span className="link-brass pr-6">
                      Ask about an event <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </article>

      {/* VACATION RENTAL NOTE */}
      <section className="py-20 lg:py-28 panel-walnut grain border-t border-brass/15">
        <div className="container relative z-10">
          <Reveal>
            <div className="border border-brass/20 px-8 py-8 lg:px-12 lg:py-10 max-w-2xl bg-obsidian/60">
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-4">
                A note for vacation rental owners
              </div>
              <p className="text-cream/80 text-base lg:text-lg leading-[1.7] italic font-display">
                Running a portfolio of luxury vacation rentals? The same pricing discipline,
                booking-site strategy and guest experience principles that drive hotel
                performance apply directly to your portfolio. I have worked with luxury vacation
                rental collections across the Coachella Valley. Let's talk.
              </p>
              <div className="mt-6">
                <Link href="/contact">
                  <span className="link-brass pr-6 text-sm">
                    Send a message <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
