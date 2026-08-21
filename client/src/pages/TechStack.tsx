/*
 * Ramirez Hospitality Group — The Reserve · THE STACK
 * Design: Emerald Reserve — obsidian/brass/emerald, Playfair + Inter
 * Tech stack page: six categories of hotel technology Adam has configured and deployed.
 * SEO: "hotel tech stack", "hotel PMS RMS consultant", "hotel technology integration"
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

const TECHSTACK_SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hotel Technology Stack Consulting",
  description:
    "Hotel technology consulting for independent and boutique hotels. Services include PMS selection and integration (Mews, Opera), RMS setup (Hotelitix, Duetto, Light House), channel manager configuration (SiteMinder), CRM and email marketing (Revinate), keylock and mobile access (Salto), and HR/operations (7shifts). Available nationwide.",
  provider: { "@id": "https://www.ramirezhos.com/#organization" },
  serviceType: "Hotel Technology Consulting",
  areaServed: { "@type": "Country", name: "United States" },
  url: "https://www.ramirezhos.com/tech-stack",
};

interface TechItem {
  name: string;
  description: string;
  badge?: string;
}

interface TechCategory {
  numeral: string;
  category: string;
  label: string;
  intro: string;
  tools: TechItem[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    numeral: "I",
    category: "Revenue Management Systems",
    label: "RMS",
    intro:
      "The engine of dynamic pricing. These platforms analyze comp-set data, demand signals, and booking pace to recommend — or automate — the right rate at the right time.",
    tools: [
      { name: "Hotelitix", description: "AI-powered revenue management for independent hotels. My primary RMS — deployed across multiple properties.", badge: "Primary" },
      { name: "Duetto", description: "Enterprise-grade RMS used by luxury and lifestyle brands. Deep demand forecasting and group pricing." },
      { name: "Light House (formerly OTA Insight)", description: "Comp-set intelligence, rate shopping, and market data. Runs alongside any RMS as the market-intelligence layer." },
      { name: "IDeaS", description: "Automated revenue management with deep PMS integration. Strong for full-service properties." },
    ],
  },
  {
    numeral: "II",
    category: "Property Management Systems",
    label: "PMS",
    intro:
      "The operational core of the hotel. Reservations, check-in, housekeeping, billing — everything runs through the PMS. Choosing the right one for the property type is one of the most consequential decisions in a hotel's tech stack.",
    tools: [
      { name: "Mews", description: "Cloud-native PMS built for boutique and lifestyle hotels. Clean UI, strong API ecosystem, excellent for independent properties.", badge: "Preferred" },
      { name: "Cloudbeds", description: "All-in-one PMS + channel manager + booking engine. Strong for smaller independents who want one system." },
      { name: "Opera (Oracle Hospitality)", description: "Industry standard for full-service and branded hotels. Complex but comprehensive." },
      { name: "Little Hotelier", description: "Lightweight PMS for small properties and B&Bs. Simple, affordable, and reliable." },
      { name: "RoomKey PMS", description: "Mid-market PMS with solid reporting and group management." },
    ],
  },
  {
    numeral: "III",
    category: "Channel Managers & Distribution",
    label: "Distribution",
    intro:
      "The pipes that connect your PMS to every OTA, GDS, and metasearch engine. A well-configured channel manager eliminates rate parity issues, prevents overbooking, and ensures your inventory is always live.",
    tools: [
      { name: "SiteMinder", description: "Industry-leading channel manager. Connects to 450+ distribution channels. My go-to for independent hotels.", badge: "Preferred" },
      { name: "Cloudbeds Channel Manager", description: "Integrated within the Cloudbeds PMS. Solid for smaller properties already on the platform." },
      { name: "Booking.com Connectivity", description: "Direct API integration and extranet optimization — content, photos, promotions, and review management." },
      { name: "Expedia Partner Central", description: "Rate and inventory management, promotions, and review response strategy." },
      { name: "Google Hotel Ads", description: "Metasearch bidding and direct booking link optimization." },
    ],
  },
  {
    numeral: "IV",
    category: "CRM & Guest Marketing",
    label: "CRM",
    intro:
      "Guest data is the most underutilized asset in independent hospitality. A properly configured CRM turns one-time guests into repeat guests, and repeat guests into advocates.",
    tools: [
      { name: "Revinate", description: "Hospitality CRM and reputation management. Pre-arrival campaigns, post-stay surveys, and segmented email marketing.", badge: "Preferred" },
      { name: "Profitroom", description: "Booking engine + CRM suite with strong direct booking conversion tools." },
      { name: "Mailchimp", description: "Email marketing for smaller properties without a dedicated hospitality CRM." },
      { name: "Klaviyo", description: "Advanced email and SMS automation. Strong for properties with a retail or F&B component." },
      { name: "HubSpot", description: "CRM and marketing automation for group sales, corporate accounts, and consulting lead management." },
    ],
  },
  {
    numeral: "V",
    category: "Keylock & Mobile Access",
    label: "Access",
    intro:
      "Modern keylock systems eliminate front-desk friction, enable mobile check-in, and reduce operational overhead. The right system depends on the property's brand positioning and guest experience goals.",
    tools: [
      { name: "Salto", description: "Cloud-based access control with mobile key and PMS integration. Preferred for boutique and lifestyle properties.", badge: "Preferred" },
      { name: "Operto", description: "Guest experience platform with mobile check-in, digital keys, and smart-home integration for vacation rentals and boutique hotels." },
      { name: "ASSA ABLOY (VingCard)", description: "Industry-standard keylock hardware. Reliable, widely supported, and compatible with most PMS platforms." },
      { name: "Dormakaba", description: "Enterprise-grade access control for full-service and resort properties." },
    ],
  },
  {
    numeral: "VI",
    category: "HR, Scheduling & Operations",
    label: "Operations",
    intro:
      "The back-of-house systems that keep the team running. Labor is the largest controllable cost in a hotel — the right scheduling and HR platform pays for itself in the first quarter.",
    tools: [
      { name: "7shifts", description: "Restaurant and hospitality scheduling. Simple, mobile-first, and integrates with most POS systems.", badge: "Preferred" },
      { name: "HotSchedules (Fourth)", description: "Enterprise-grade scheduling and labor management for larger properties and groups." },
      { name: "Gusto", description: "Payroll, HR, and benefits for small hotel teams. Clean, affordable, and easy to onboard." },
      { name: "When I Work", description: "Lightweight scheduling for small independent properties." },
      { name: "Hotelkit", description: "Hotel operations platform for task management, checklists, and team communication." },
    ],
  },
];

export default function TechStack() {
  return (
    <PageLayout
      title="Hotel Technology Consulting — PMS, RMS, Channel Manager & CRM for Independent Hotels | Ramirez Hospitality Group"
      description="Hotel technology consulting for independent and boutique hotels. Adam Ramirez has configured and deployed Hotelitix, Duetto, Light House, Mews, SiteMinder, Revinate, Salto, and 7shifts across boutique hotels and small portfolios. Free tech audit available."
      canonical="/tech-stack"
      breadcrumbs={[{ name: "Hotel Tech Stack", href: "/tech-stack" }]}
      jsonLd={[TECHSTACK_SERVICE_SCHEMA, ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-20 lg:pt-56 lg:pb-28 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="The Stack" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              The tools that run
              <br />
              a modern hotel.
              <br />
              <span className="italic text-brass">I've configured all of them.</span>
            </h1>
            <p className="mt-9 text-cream/75 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Most independent hotels are running five disconnected systems that leak revenue
              every night. The right stack — selected for the property type, properly
              integrated, and maintained — is one of the highest-ROI investments an owner
              can make. Below is every platform I've deployed across boutique hotels,
              independent properties, and small portfolios.
            </p>
          </div>
        </div>
      </section>

      {/* STAT BAR */}
      <section className="py-10 bg-obsidian border-y border-brass/15">
        <div className="container">
          <div className="flex flex-wrap gap-10 lg:gap-20 items-center">
            {[
              { v: "6", l: "Tech Categories" },
              { v: "25+", l: "Platforms Deployed" },
              { v: "8", l: "Hotels Fully Integrated" },
              { v: "0", l: "Disconnected Stacks Left Behind" },
            ].map((s) => (
              <div key={s.l} className="flex items-baseline gap-4">
                <span className="font-display text-4xl text-brass">{s.v}</span>
                <span className="text-[0.62rem] tracking-[0.28em] uppercase text-cream/60">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH CATEGORIES */}
      {TECH_CATEGORIES.map((cat, ci) => (
        <section
          key={cat.category}
          className={`py-20 lg:py-28 border-t border-brass/15 ${
            ci % 2 === 1 ? "panel-walnut grain" : "bg-obsidian"
          }`}
        >
          <div className="container relative z-10">
            <Reveal>
              <div className="flex items-center gap-4 text-brass mb-8">
                <span className="font-display italic text-3xl">{cat.numeral}</span>
                <span className="text-brass/40">·</span>
                <span className="text-[0.62rem] tracking-[0.32em] uppercase">{cat.label}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.08] text-cream mb-5">
                {cat.category}
              </h2>
              <p className="text-cream/65 text-base lg:text-lg leading-[1.7] max-w-3xl mb-12">
                {cat.intro}
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
              {cat.tools.map((tool, ti) => (
                <Reveal
                  key={tool.name}
                  delay={ti * 60}
                  className="bg-obsidian p-7 lg:p-9 group hover:bg-card transition-colors duration-500 relative"
                >
                  {tool.badge && (
                    <div className="absolute top-5 right-5 text-[0.55rem] tracking-[0.28em] uppercase text-brass border border-brass/40 px-2 py-1">
                      {tool.badge}
                    </div>
                  )}
                  <h3 className="font-display text-xl lg:text-2xl text-cream mb-3 group-hover:text-brass transition-colors duration-300 pr-16">
                    {tool.name}
                  </h3>
                  <p className="text-cream/60 text-sm leading-[1.7]">{tool.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CLOSING NOTE */}
      <section className="py-24 lg:py-32 panel-emerald grain border-t border-brass/15">
        <div className="container relative z-10">
          <Reveal className="max-w-3xl">
            <Eyebrow numeral="VII" label="Don't See Your System?" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
              I've probably worked with it.
              <br />
              <span className="italic text-brass">Ask.</span>
            </h2>
            <p className="mt-7 text-cream/75 text-base lg:text-lg leading-[1.7]">
              The hospitality tech landscape changes fast. If your property runs a system
              not listed here, there's a good chance I've encountered it, configured it, or
              migrated away from it. The free property audit includes a full tech-stack
              review — I'll tell you what's working, what's leaking revenue, and what to
              replace.
            </p>
            <div className="mt-10 flex flex-wrap gap-5 items-center">
              <Link href="/audit">
                <span className="btn-brass">
                  Schedule a Free Tech Audit <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/contact">
                <span className="link-brass pr-6">
                  Ask About a Specific System <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
