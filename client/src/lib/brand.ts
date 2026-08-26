/*
 * Ramirez Hospitality Group — The Reserve
 * Centralized brand constants. Edit here, propagate everywhere.
 */

export const BRAND = {
  name: "Ramirez Hospitality Group",
  shortName: "Ramirez Hospitality",
  monogram: "RHG",
  byline: "By Adam Ramirez",
  tagline:
    "Operator-led hospitality consulting for independent hotels, boutique properties, and the people who own them.",
  address: "351 E Via Carisma, Palm Springs, CA 92264",
  city: "Palm Springs, CA",
  reach: "Available Nationwide",
  phone: "760-969-9249",
  phoneHref: "tel:+17609699249",
  email: "adam@ramirezhospitality.com",
  emailHref: "mailto:adam@ramirezhospitality.com",
  hours: "Mon–Fri 8a–6p PT · Weekends by appointment",
  // Free audit calendar placeholder — to be wired to SavvyCal/Calendly post-launch
  calendarUrl: "/audit",
  copyright: "© 2026 Ramirez Hospitality Group. All rights reserved.",
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
  { label: "Revenue Management", href: "/revenue-management" },
  { label: "Services", href: "/services" },
  { label: "Openings", href: "/openings" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "The Stack", href: "/tech-stack" },
] as const;

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
