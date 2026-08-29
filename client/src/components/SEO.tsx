/*
 * Ramirez Hospitality Group — The Reserve · SEO UTILITY
 * Manages all per-page SEO: title, meta description, canonical URL,
 * Open Graph, Twitter Card, and JSON-LD structured data.
 *
 * GEO NOTE: JSON-LD is the primary signal for AI search engines
 * (ChatGPT, Perplexity, Gemini AI Overviews). Every page injects
 * at minimum a WebPage + BreadcrumbList schema. Key pages add
 * Service, FAQPage, Person, LocalBusiness, and Article schemas.
 */

import { useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SEOProps {
  title: string;
  description: string;
  /** Canonical path, e.g. "/revenue-management". Defaults to current pathname. */
  canonical?: string;
  /** Open Graph image URL. Defaults to the hero image. */
  ogImage?: string;
  /** Page type for OG. Defaults to "website". */
  ogType?: "website" | "article" | "profile";
  /** JSON-LD structured data objects. Can pass multiple. */
  jsonLd?: object | object[];
  /** Breadcrumb trail: [{name, href}]. Home is prepended automatically. */
  breadcrumbs?: { name: string; href: string }[];
  /** Article-specific: author, datePublished, dateModified */
  article?: {
    author: string;
    datePublished: string;
    dateModified?: string;
  };
  /** Noindex this page (e.g. 404) */
  noindex?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_NAME = "Ramirez Hospitality Group";
const SITE_URL = "https://ramirezhospitality.com"; // canonical domain — update on launch
const DEFAULT_OG_IMAGE =
  "/images/rhg_hero.webp";
const TWITTER_HANDLE = "@RamirezHospitality";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function setMeta(name: string, content: string, property = false) {
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectJsonLd(id: string, data: object) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.setAttribute("type", "application/ld+json");
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data, null, 2);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
  breadcrumbs,
  article,
  noindex = false,
}: SEOProps) {
  useEffect(() => {
    const path = canonical ?? window.location.pathname;
    const fullUrl = `${SITE_URL}${path}`;

    // ── Title ──
    document.title = title;

    // ── Core meta ──
    setMeta("description", description);
    if (noindex) {
      setMeta("robots", "noindex,nofollow");
    } else {
      setMeta("robots", "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1");
    }

    // ── Canonical ──
    setLink("canonical", fullUrl);

    // ── Open Graph ──
    setMeta("og:type", ogType, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:alt", `${SITE_NAME} — ${title}`, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("og:locale", "en_US", true);

    // ── Twitter Card ──
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", TWITTER_HANDLE);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // ── Article meta ──
    if (article) {
      setMeta("article:author", article.author, true);
      setMeta("article:published_time", article.datePublished, true);
      if (article.dateModified) {
        setMeta("article:modified_time", article.dateModified, true);
      }
    }

    // ── WebPage JSON-LD (always present) ──
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": ogType === "article" ? "Article" : "WebPage",
      "@id": fullUrl,
      url: fullUrl,
      name: title,
      description,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Operator-led hospitality consulting and remote revenue management for independent hotels, boutique properties, and small hotel groups.",
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: DEFAULT_OG_IMAGE,
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-760-969-9249",
            contactType: "customer service",
            areaServed: "US",
            availableLanguage: "English",
          },
        },
      },
      ...(article && {
        author: {
          "@type": "Person",
          name: article.author,
          url: `${SITE_URL}/about`,
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified ?? article.datePublished,
      }),
    };
    injectJsonLd("ld-webpage", webPageSchema);

    // ── BreadcrumbList JSON-LD ──
    if (breadcrumbs && breadcrumbs.length > 0) {
      const crumbs = [{ name: "Home", href: "/" }, ...breadcrumbs];
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}${c.href}`,
        })),
      };
      injectJsonLd("ld-breadcrumb", breadcrumbSchema);
    } else {
      removeJsonLd("ld-breadcrumb");
    }

    // ── Custom JSON-LD ──
    const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    schemas.forEach((schema, i) => {
      injectJsonLd(`ld-custom-${i}`, schema);
    });
    // Clean up extra custom schemas from previous page
    let j = schemas.length;
    while (document.getElementById(`ld-custom-${j}`)) {
      removeJsonLd(`ld-custom-${j}`);
      j++;
    }
  }, [title, description, canonical, ogImage, ogType, jsonLd, breadcrumbs, article, noindex]);

  return null;
}

// ─── Shared schema fragments ──────────────────────────────────────────────────

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "Ramirez Hospitality Group",
  alternateName: "RHG",
  description:
    "Operator-led hospitality consulting and remote revenue management for independent hotels, boutique properties, and small hotel groups. Founded by Adam Ramirez, a Palm Springs, CA-based hotel operator with 10+ years of experience.",
  url: SITE_URL,
  telephone: "+1-760-969-9249",
  email: "adam@ramirezhospitality.com",
  founder: {
    "@type": "Person",
    name: "Adam Ramirez",
    jobTitle: "Founder & Principal Consultant",
    url: `${SITE_URL}/about`,
    sameAs: ["https://www.linkedin.com/in/adam-ramirez-ab6840149"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "351 E Via Carisma",
    addressLocality: "Palm Springs",
    addressRegion: "CA",
    postalCode: "92264",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceType: [
    "Hotel Revenue Management",
    "Hospitality Consulting",
    "Hotel Opening Consulting",
    "OTA Optimization",
    "Hotel Technology Consulting",
    "Hotel Operations Consulting",
    "Hotel Asset Advisory",
    "Hotel Feasibility Study",
    "Event Production",
  ],
  priceRange: "$850–$2,500/month",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  logo: {
    "@type": "ImageObject",
    url: DEFAULT_OG_IMAGE,
  },
  sameAs: [
    "https://www.linkedin.com/in/adam-ramirez-ab6840149",
    "https://www.visitgreaterpalmsprings.com/listing/luxe-hospitality-consulting-llc/56322/",
  ],
};

export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#person`,
  name: "Adam Ramirez",
  givenName: "Adam",
  familyName: "Ramirez",
  jobTitle: "Founder & Principal Consultant",
  description:
    "Adam Ramirez is a Palm Springs-based hotel operator and hospitality consultant with 10+ years of experience opening, repositioning, and managing independent and boutique hotels. He has opened 8 hotels from concept to ribbon-cutting, managed over $10M in annual hotel revenue, and led teams of 120+. His properties have been featured in Travel & Leisure, Condé Nast Traveler, Forbes, and Modernism Magazine.",
  url: `${SITE_URL}/about`,
  email: "adam@ramirezhospitality.com",
  telephone: "+1-760-969-9249",
  address: {
    "@type": "PostalAddress",
    streetAddress: "351 E Via Carisma",
    addressLocality: "Palm Springs",
    addressRegion: "CA",
    postalCode: "92264",
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: "Ramirez Hospitality Group",
    url: SITE_URL,
  },
  alumniOf: [
    { "@type": "Organization", name: "DORM / LIT Property Group" },
    { "@type": "Organization", name: "Sands Hotel & Spa" },
    { "@type": "Organization", name: "Saguaro Hotel" },
  ],
  memberOf: [
    { "@type": "Organization", name: "Cathedral City Chamber of Commerce" },
    { "@type": "Organization", name: "Small Hotel Association of Palm Springs" },
    { "@type": "Organization", name: "Palm Springs Hospitality Association" },
    { "@type": "Organization", name: "Palm Springs Tourism Bureau" },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Revenue Management Certificate",
    credentialCategory: "certificate",
    recognizedBy: { "@type": "Organization", name: "AHLEI" },
  },
  sameAs: ["https://www.linkedin.com/in/adam-ramirez-ab6840149"],
  knowsAbout: [
    "Hotel Revenue Management",
    "OTA Optimization",
    "Direct Booking Strategy",
    "Hotel Openings",
    "Boutique Hotel Operations",
    "Hotel Technology",
    "RevPAR Optimization",
    "Hotel Asset Advisory",
    "Hotel Renovation",
    "Hospitality Consulting",
  ],
};
