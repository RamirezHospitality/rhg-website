/*
 * Ramirez Hospitality Group — The Reserve · SERVICES
 * Design: Emerald Reserve — obsidian/brass/emerald, Playfair + Inter
 * Seven pillars (added Event Production as VII), expandable accordion cards,
 * corrected opening numbers (8 from scratch, 4+ repositioned),
 * vacation rental breadcrumb, à-la-carte table.
 */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, ChevronDown } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/brand";
import { EventGallery } from "@/components/EventGallery";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const SERVICES_ITEMLIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ramirez Hospitality Group — Hospitality Consulting Services",
  description: "Seven hospitality consulting disciplines for independent hotels, boutique properties, and small portfolios.",
  url: "https://ramirezhospitality.com/services",
  numberOfItems: 7,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hotel Revenue Management Subscription", url: "https://ramirezhospitality.com/revenue-management" },
    { "@type": "ListItem", position: 2, name: "Hotel Openings & Reopenings", url: "https://ramirezhospitality.com/openings" },
    { "@type": "ListItem", position: 3, name: "Hotel Tech & Systems Consulting", url: "https://ramirezhospitality.com/tech-stack" },
    { "@type": "ListItem", position: 4, name: "Hotel Operations & SOPs", url: "https://ramirezhospitality.com/services#operations" },
    { "@type": "ListItem", position: 5, name: "Hotel Renovations & Construction Oversight", url: "https://ramirezhospitality.com/services#renovations" },
    { "@type": "ListItem", position: 6, name: "Hotel Asset & Acquisition Advisory", url: "https://ramirezhospitality.com/services#asset-advisory" },
    { "@type": "ListItem", position: 7, name: "Full-Property Event Production", url: "https://ramirezhospitality.com/services#events" },
  ],
};

interface Pillar {
  n: string;
  title: string;
  label: string;
  teaser: string;
  body: string;
  deliverables: string[];
  cta: { label: string; href: string; calendar?: boolean };
  image: string;
  hasGallery?: boolean;
  /** Optional secondary link shown below the deliverables list — used to cross-link a dedicated sub-page. */
  seeAlso?: { label: string; href: string };
}

const PILLARS: Pillar[] = [
  {
    n: "I",
    title: "Revenue Management Subscription",
    label: "Flagship",
    teaser: "Daily pricing, OTA optimization, direct booking, and loyalty — under one monthly retainer.",
    body:
      "The day-to-day discipline of pricing every room, on every night, on every channel — at the right number. Three subscription tiers starting at $850 per month. Includes dynamic pricing, OTA content optimization, direct booking strategy build, rewards program development, and access to our tech stack at preferred rates. Growth and Enterprise tiers add group sales playbooks, ad spend consulting, and a dedicated one-on-one client relationship.",
    deliverables: [
      "Daily dynamic pricing across all channels",
      "OTA listing optimization (content, photos, contracts)",
      "Direct booking strategy & booking engine tuning",
      "Rewards & loyalty program development",
      "Monthly revenue reporting + strategy call",
      "Tech stack access at preferred rates (Hotelitix, Duetto, Light House, Revinate)",
    ],
    cta: { label: "Explore the Subscription", href: "/revenue-management" },
    image: IMAGES.revenue,
  },
  {
    n: "II",
    title: "Hotel Openings & Reopenings",
    label: "The Element of My Genius",
    teaser: "Eight hotels opened from concept to ribbon-cutting. Four repositioned. One operator.",
    body:
      "Concept to ribbon-cutting. I've opened 8 hotels from scratch — from brand identity and pre-opening sales to staffing, training, OS&E, and the soft-launch playbook — and repositioned more than 4 after renovations and ownership transitions. I've also overseen a portfolio of luxury vacation rentals through the same disciplined pre-opening framework. This is the work I love most, and the work where the difference between an operator and a consultant is most visible.",
    deliverables: [
      "Concept, positioning, and brand identity direction",
      "Pre-opening budget and year-one pro forma",
      "Tech stack selection and full integration",
      "Sales, distribution, and OTA build",
      "Hiring plan, org chart, and training program",
      "SOPs and service standards",
      "Marketing launch: PR, influencer, paid media, website",
      "Soft opening management and 90-day stabilization",
    ],
    cta: { label: "Explore Openings", href: "/openings" },
    image: IMAGES.opening,
  },
  {
    n: "III",
    title: "Hotel Tech & Systems",
    label: "Integration & Discipline",
    teaser: "The right stack — selected, integrated, and maintained so it actually talks to itself.",
    body:
      "The PMS, the RMS, the channel manager, the booking engine, the CRM, the upsell tool, the keylock system, the HR platform. I evaluate, select, integrate, configure, and maintain. The stack you need is the stack that talks to itself — and most independent hotels are running five disconnected systems that leak revenue every night. I fix that.",
    deliverables: [
      "Full tech-stack audit and gap analysis",
      "PMS selection and migration (Mews, Cloudbeds, Opera)",
      "RMS setup and calibration (Hotelitix, Duetto, Light House)",
      "Channel manager integration (SiteMinder, Cloudbeds)",
      "CRM and guest marketing setup (Revinate, Profitroom)",
      "Keylock and mobile access (Salto, Operto)",
      "HR and scheduling platform setup",
    ],
    cta: { label: "Click to Book a Call", href: "/contact", calendar: true },
    image: IMAGES.advisory,
  },
  {
    n: "IV",
    title: "Operations & SOPs",
    label: "Built to Scale",
    teaser: "The SOP binder you actually use — written by the operator who will train the team.",
    body:
      "Front of house, back of house, housekeeping, F&B, HR, training, scheduling, payroll. I write the SOP binder you actually use, train the team, and stay involved long enough to know it stuck. Most SOP consultants hand you a document. I hand you a document and a trained team.",
    deliverables: [
      "Front-of-house service standards and scripts",
      "Housekeeping SOPs and inspection checklists",
      "F&B service standards and opening procedures",
      "HR onboarding, scheduling, and payroll frameworks",
      "Training program design and delivery",
      "Management reporting cadence and KPI dashboards",
    ],
    cta: { label: "Click to Book a Call", href: "/contact", calendar: true },
    image: IMAGES.audit,
  },
  {
    n: "V",
    title: "Renovations & Construction",
    label: "Owner's-Rep Oversight",
    teaser: "The operator in the room when the architect's drawings meet reality.",
    body:
      "Owner's-rep oversight on capex and FF&E. Contractor selection and management. Procurement. Punchlist. I'm not an architect — I'm the operator who has been in the room when the architect's drawings meet the operator's reality, and who knows which decisions cost you $40,000 in year-one revenue if you get them wrong.",
    deliverables: [
      "Capex budget development and oversight",
      "FF&E specification and procurement",
      "Contractor selection and bid management",
      "Construction timeline and milestone management",
      "Punchlist and quality-control walkthroughs",
      "Renovation-to-reopening transition planning",
    ],
    cta: { label: "Click to Book a Call", href: "/contact", calendar: true },
    image: IMAGES.opening,
  },
  {
    n: "VI",
    title: "Asset & Acquisition Advisory",
    label: "Pre-Purchase to Exit",
    teaser: "Operator-grade due diligence. Distressed turnarounds. Exit prep. Discreet and fast.",
    body:
      "Pre-purchase due diligence. Post-close turnaround. Exit prep. I evaluate hotels for buyers, run distressed properties for owners who need a turn, and prepare under-performing assets for sale. I bring an operator's eye to every deal — not a broker's, not a banker's. Discreet. Fast. Operator-grade.",
    deliverables: [
      "Pre-purchase operational and revenue due diligence",
      "Post-close 90-day turnaround sprint",
      "Distressed property stabilization plan",
      "Exit prep: revenue optimization and review management",
      "Portfolio performance benchmarking",
      "Acquisition advisory for hotel buyers and investors",
    ],
    cta: { label: "Click to Book a Call", href: "/contact", calendar: true },
    image: IMAGES.advisory,
    seeAlso: { label: "Considering a purchase? See how a hotel feasibility study works", href: "/feasibility-study" },
  },
  {
    n: "VII",
    title: "Full-Property Event Production",
    label: "Brand Activations & Takeovers",
    teaser: "You don't just host the event. You become the event.",
    body:
      "When a brand wants to take over a hotel — completely — I run the production. Hugo Boss full hotel takeover. Levi's total hotel takeover. NYX Cosmetics beauty bar activation. BMW and Volkswagen vehicle launch events. I source everything: private chefs, custom menus, florals, lighting, entertainment, silverware on the table. The hotel becomes the set, the brand becomes the story, and the guest experience is flawless from arrival to departure.",
    deliverables: [
      "Brand partnership and activation concept development",
      "Full-property event design and production management",
      "Private chef sourcing and custom menu development",
      "Vendor sourcing: florals, lighting, entertainment, décor",
      "Guest experience design from arrival to departure",
      "On-site production management and day-of execution",
    ],
    cta: { label: "Click to Book a Call", href: "/contact", calendar: true },
    image: IMAGES.events,
    hasGallery: true,
  },
];

const ADDONS = [
  "Property Tech-Stack Audit (PMS, RMS, channel manager, CRM, booking engine)",
  "OTA Deep-Clean Sprint (content, photos, contracts in 30 days)",
  "Rewards Program Launch (standalone build)",
  "Website + Booking Engine Build",
  "HR SOPs + Training Build",
  "90-Day Reopening Sprint",
  "Go-to-Market / Full Hotel Launch",
  "Renovation & Construction Oversight",
  "Acquisition Advisory / Due Diligence",
  "Luxury Vacation Rental Portfolio Optimization",
];

const PILLAR_IDS: Record<string, string> = {
  "I": "revenue-management",
  "II": "openings",
  "III": "tech-systems",
  "IV": "operations",
  "V": "renovations",
  "VI": "asset-advisory",
  "VII": "events",
};

function PillarCard({ p, index }: { p: Pillar; index: number }) {
  const [open, setOpen] = useState(false);
  const isAlt = index % 2 === 1;
  const anchorId = PILLAR_IDS[p.n];

  return (
    <article id={anchorId} className={`relative border-t border-brass/15 ${isAlt ? "panel-walnut grain" : ""}`}>
      <div className="container py-16 lg:py-24 relative z-10">
        <div className={`grid lg:grid-cols-12 gap-12 lg:gap-16 items-start`}>
          {/* Image */}
          <div className={`lg:col-span-5 ${isAlt ? "lg:order-2" : "lg:order-1"}`}>
            <Reveal>
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-16 h-16 border-l border-t border-brass/40" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r border-b border-brass/40" />
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-[4/3] object-cover relative z-10"
                />
              </div>
            </Reveal>
          </div>

          {/* Content */}
          <div className={`lg:col-span-7 ${isAlt ? "lg:order-1" : "lg:order-2"}`}>
            <Reveal delay={120}>
              <div className="flex items-center gap-4 text-brass mb-6">
                <span className="font-display italic text-3xl">{p.n}</span>
                <span className="text-brass/40">·</span>
                <span className="text-[0.62rem] tracking-[0.32em] uppercase">{p.label}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.08] text-cream">
                {p.title}
              </h2>
              <p className="mt-5 text-cream/65 text-base lg:text-lg leading-[1.7] italic">
                {p.teaser}
              </p>

              {/* Expandable detail */}
              <button
                onClick={() => setOpen(!open)}
                className="mt-7 flex items-center gap-3 text-brass text-sm tracking-[0.18em] uppercase font-semibold hover:text-cream transition-colors duration-300 group"
              >
                <span>{open ? "Close Details" : "View Full Details"}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-400 ${open ? "rotate-180" : ""}`}
                />
              </button>

              {/* Expanded panel */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  open ? "max-h-[9999px] opacity-100 mt-7" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-cream/75 text-base leading-[1.75] mb-7">{p.body}</p>
                {p.hasGallery && <EventGallery />}
                <div className="border-l-2 border-brass/40 pl-6 mt-7">
                  <div className="text-[0.62rem] tracking-[0.28em] uppercase text-brass mb-4">
                    Deliverables
                  </div>
                  <ul className="space-y-2">
                    {p.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-cream/70 text-sm leading-[1.6]">
                        <span className="text-brass mt-0.5 shrink-0">◆</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                {p.seeAlso && (
                  <div className="mt-7">
                    <Link href={p.seeAlso.href}>
                      <span className="link-brass pr-6 text-sm">
                        {p.seeAlso.label} <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-9">
                <Link href={p.cta.href}>
                  <span className={p.cta.calendar ? "btn-ghost" : "btn-brass"}>
                    {p.cta.calendar && <Calendar className="w-3.5 h-3.5" strokeWidth={1.6} />}
                    {p.cta.label} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <PageLayout
      title="Hotel Consulting Services — Revenue, Openings, Tech, Operations & Events | Ramirez Hospitality Group"
      description="Seven hospitality consulting disciplines under one operator: revenue management, hotel openings, tech and systems, operations and SOPs, renovations, acquisition advisory, and full-property event production. Built for independent hotels, boutique properties, and small portfolios."
      canonical="/services"
      breadcrumbs={[{ name: "Services", href: "/services" }]}
      jsonLd={[SERVICES_ITEMLIST_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-20 lg:pt-56 lg:pb-28 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="The Practice" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Seven disciplines.
              <br />
              One operator.
              <br />
              <span className="italic text-brass">Every revenue lever in one place.</span>
            </h1>
            <p className="mt-9 text-cream/75 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Most consultants specialize in one. I've worked all seven — for 10+ years,
              inside the buildings. The result is a practice where the revenue manager
              understands the renovation budget, the renovation lead understands the SOPs,
              and the SOP author understands the OTA algorithm.
            </p>
            <p className="mt-5 text-cream/55 text-sm leading-[1.7] max-w-xl">
              Running a portfolio of luxury vacation rentals?{" "}
              <Link href="/contact">
                <span className="text-brass hover:text-cream transition-colors duration-300 cursor-pointer underline underline-offset-4 decoration-brass/40">
                  The same revenue discipline applies. Let's talk. →
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* II · PILLAR LIST — expandable */}
      <section className="bg-obsidian">
        {PILLARS.map((p, i) => (
          <PillarCard key={p.title} p={p} index={i} />
        ))}
      </section>

      {/* III · À LA CARTE */}
      <section className="py-24 lg:py-36 panel-emerald grain border-t border-brass/15">
        <div className="container relative z-10">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <Eyebrow numeral="III" label="À La Carte" />
              <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.05] text-cream">
                Single-engagement work.
                <br />
                <span className="italic text-brass">Scoped. Priced on the call.</span>
              </h2>
              <p className="mt-7 text-cream/75 text-base lg:text-lg leading-[1.7] max-w-2xl">
                Not every hotel needs a subscription. Some need a sprint. Each engagement
                below is fixed-scope and quoted on a discovery call. No surprise invoices.
              </p>
            </Reveal>
          </div>

          <div className="border border-brass/25">
            {ADDONS.map((a, i) => (
              <Reveal
                key={a}
                delay={i * 60}
                className={`group grid grid-cols-12 gap-4 items-center px-6 lg:px-10 py-6 lg:py-7 ${
                  i < ADDONS.length - 1 ? "border-b border-brass/15" : ""
                } hover:bg-obsidian/40 transition-colors duration-300`}
              >
                <div className="col-span-1 font-display italic text-brass text-xl">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-11 lg:col-span-7 text-cream text-base lg:text-lg">
                  {a}
                </div>
                <div className="hidden lg:block lg:col-span-4 text-right">
                  <Link href="/contact">
                    <span className="link-brass pr-6 text-sm">
                      Click to Book a Call <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
                <div className="lg:hidden col-span-12 mt-2">
                  <Link href="/contact">
                    <span className="link-brass pr-6 text-sm">
                      Click to Book a Call <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Vacation rental private note */}
          <Reveal className="mt-16">
            <div className="border border-brass/20 px-8 py-8 lg:px-12 lg:py-10 max-w-2xl">
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-4">
                A note for vacation rental owners
              </div>
              <p className="text-cream/80 text-base lg:text-lg leading-[1.7] italic font-display">
                "Running a portfolio of luxury vacation rentals? The same revenue discipline,
                OTA strategy, and guest experience principles that drive hotel performance
                apply directly to your portfolio. I've worked with luxury vacation rental
                collections across the Coachella Valley. Let's talk."
              </p>
              <div className="mt-6">
                <Link href="/contact">
                  <span className="link-brass pr-6 text-sm">
                    Schedule a Conversation <ArrowRight className="w-4 h-4" />
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
