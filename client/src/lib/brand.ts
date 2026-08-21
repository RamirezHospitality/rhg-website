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
  city: "Palm Springs, CA",
  reach: "Available Nationwide",
  phone: "760-969-9249",
  phoneHref: "tel:+17609699249",
  email: "adam@luxehospitalityrevpar.com",
  emailHref: "mailto:adam@luxehospitalityrevpar.com",
  hours: "Mon–Fri 8a–6p PT · Weekends by appointment",
  // Free audit calendar placeholder — to be wired to SavvyCal/Calendly post-launch
  calendarUrl: "/audit",
  copyright: "© 2026 Ramirez Hospitality Group. All rights reserved.",
} as const;

export const IMAGES = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610615090/X8FvtWUK4caTYqQbHciXS9/rhg_hero-RaadcAtSRSQcBbiJKhopFw.webp",
  heroOriginal: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610615090/X8FvtWUK4caTYqQbHciXS9/rhg_hero-CLbJVd3jAVMMqPkfAvxwp9.png",
  revenue: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610615090/X8FvtWUK4caTYqQbHciXS9/rhg_revenue-APqi3b4Qcoy4sEedL76wg9.webp",
  opening: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610615090/X8FvtWUK4caTYqQbHciXS9/rhg_opening-RLkFg75FzPwfSeBiGHzYHR.webp",
  audit: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610615090/X8FvtWUK4caTYqQbHciXS9/rhg_audit-SR5fv5SacDjrBqUPjRcbyR.webp",
  advisory: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610615090/X8FvtWUK4caTYqQbHciXS9/rhg_advisory-ZfZseZSm28Ffmc3JLKJgSz.webp",
  events: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610615090/X8FvtWUK4caTYqQbHciXS9/rhg_events-Jjg39UNXU2HqfgvtPLuqoz.webp",
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
