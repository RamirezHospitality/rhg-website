/*
 * Ramirez Hospitality Group — The Reserve
 * Centralized brand constants. Edit here, propagate everywhere.
 *
 * Offer facts (names, prices, terms, CTAs) live in OFFERS below so no page
 * can drift from the September 9, 2026 offer brief. Every price on the site
 * reads from here.
 */

export const BRAND = {
  name: "Ramirez Hospitality Group",
  shortName: "Ramirez Hospitality",
  monogram: "RHG",
  byline: "By Adam Ramirez",
  tagline:
    "Operator-led revenue and opening consultancy for independent and boutique hotels, motels and inns.",
  address: "351 E Via Carisma, Palm Springs, CA 92264",
  city: "Palm Springs, CA",
  reach: "Working nationwide",
  // Plain contact text only. Never rendered as a tel: link anywhere on the site.
  phone: "760-969-9249",
  email: "adam@ramirezhospitality.com",
  emailHref: "mailto:adam@ramirezhospitality.com",
  hours: "Mon–Fri 8a–6p PT · Weekends by appointment",
  // Google Calendar appointment schedules. Since the offer overhaul the site's
  // CTAs go to the capture form first (the LeadConnector embed on each offer
  // page); the calendar is the step LeadConnector offers after the form.
  // These links remain for the follow-up email/SMS and anywhere a direct
  // booking link is still wanted.
  auditBookingUrl: "https://calendar.app.google/azAXhjkEBs8NVc2Y6",
  openingBookingUrl: "https://calendar.app.google/veXqa2eBYGbZa6Pb9",
  copyright: "© 2026 Ramirez Hospitality Group. All rights reserved.",
} as const;

/** The track-record line, exactly as the offer brief states it. Never vary it. */
export const TRACK_RECORD_LINE = "10+ years · 50+ hospitality properties · 20% average revenue lift";

/** Track-record facts that may be used alongside the line. */
export const TRACK_RECORD_FACTS = [
  "8 hotels opened from concept to ribbon-cutting",
  "4 properties repositioned after renovation or ownership transition",
  "50+ independent and boutique hospitality properties worked with",
  "$10M+ in annual hotel revenue managed",
  "6 funded feasibility projects with full pro formas",
] as const;

/**
 * The three offers, two tracks. Every CTA on the site is one of the three
 * `cta` strings below, and every CTA goes to the capture form on the offer's
 * own page (`formPath`), never to a phone number.
 */
export const OFFERS = {
  audit: {
    name: "The Modern Hotel Audit",
    cta: "Book The Modern Hotel Audit",
    path: "/audit",
    formPath: "/audit#lead-form",
  },
  subscription: {
    name: "The Subscription",
    line: "Your prices set every day. Your booking sites worked. Your groups priced right.",
    path: "/revenue-management",
    plans: [
      {
        key: "essentials",
        name: "Essentials",
        line: "Your prices, set every day.",
        price: 1250,
        priceLabel: "$1,250",
        term: "Four-month initial term, then month to month",
        prepay: "$500",
        band: "Rooms bringing in roughly $300,000 to $750,000 a year",
      },
      {
        key: "growth",
        name: "Growth",
        line: "Your whole revenue system, run for you.",
        price: 2000,
        priceLabel: "$2,000",
        term: "Four-month initial term, then month to month",
        prepay: "$500",
        band: "Rooms bringing in roughly $600,000 to $1.2 million a year",
      },
      {
        key: "inhouse",
        name: "In-House",
        line: "A revenue manager on your team, without the payroll.",
        price: 5000,
        priceLabel: "$5,000",
        term: "Six-month initial term, then month to month",
        prepay: "$3,000",
        band: "Rooms bringing in $1.2 million and up, 30-plus rooms, or real group business",
      },
    ],
  },
  plan: {
    name: "The Modern Hotel Plan",
    cta: "Book The Modern Hotel Plan",
    line: "Know the numbers before you buy, build, or open.",
    path: "/feasibility-study",
    formPath: "/feasibility-study#lead-form",
    price: 6000,
    priceLabel: "$6,000",
  },
  launch: {
    name: "The Modern Hotel Launch",
    cta: "Book an Opening Consultation",
    line: "Concept to ribbon-cutting.",
    path: "/openings",
    formPath: "/openings#lead-form",
  },
} as const;

/**
 * The software line, as approved. No Duetto price appears anywhere on the
 * site; pricing is a separate conversation.
 */
export const SOFTWARE = {
  short:
    "No software is included in the fee. A revenue management system is required on every plan. Duetto is our preferred system, and every client on every plan gets it at specially negotiated pricing.",
  footnote:
    "Duetto is required on every plan. If you already run a revenue management system you prefer, tell us on the call and we will consider working inside it.",
} as const;

export const IMAGES = {
  hero: "/images/rhg_hero.webp",
  heroOriginal: "/images/rhg_hero_alternate.webp",
  revenue: "/images/rhg_revenue.webp",
  opening: "/images/rhg_opening.webp",
  audit: "/images/rhg_audit.webp",
  advisory: "/images/rhg_advisory.webp",
  events: "/images/rhg_events.webp",
} as const;

export const NAV_LINKS = [
  { label: "The Audit", href: "/audit" },
  { label: "The Subscription", href: "/revenue-management" },
  { label: "The Plan", href: "/feasibility-study" },
  { label: "The Launch", href: "/openings" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

/**
 * Named third-party properties. Fine to render on indexable pages (Home,
 * Audit, FeasibilityStudy, CaseStudies, About) — naming past clients is
 * normal consulting practice. Do NOT render this list, or any single name
 * from it, on a /lp/* ad landing page: the Google Ads account was suspended
 * 2026-08-29 for Public Figure / Business Impersonation, most likely
 * triggered by named third-party hotel brands appearing without their
 * written permission (Google requires permission to name a client in
 * advertising regardless of whether the work happened). OperatorSection's
 * `unbranded` prop renders de-branded stand-in facts instead — use that on
 * any ad LP rather than mapping over PROPERTIES directly.
 */
export const PROPERTIES = [
  "The Paloma Resort",
  "Twist Palm Springs",
  "Limón Palm Springs",
  "Sands Hotel & Spa",
  "The Stardust",
  "Dunes Palm Springs",
  "The Creekstone Inn",
  "Town & Desert Hospitality",
  "Bellevue Oasis",
  "Float Palm Springs",
  "Saguaro Hotel",
] as const;

export const PRESS = [
  "Travel & Leisure",
  "Condé Nast Traveler",
  "Forbes",
  "Modernism Magazine",
] as const;
