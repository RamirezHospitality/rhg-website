/*
 * Ramirez Hospitality Group — The Reserve
 * Persistent CTA bar + obsidian editorial footer with three columns.
 *
 * The phone number is plain text here and on the Contact page. It is never a
 * tel: link (locked rule). Every button is one of the three offer CTAs and
 * goes to that offer's capture form.
 */

import { Link } from "wouter";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { BRAND, OFFERS, TRACK_RECORD_LINE } from "@/lib/brand";

export function PersistentCTA() {
  return (
    <section className="relative overflow-hidden border-y border-brass/15">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(115deg, oklch(0.10 0.005 150 / 0.92), oklch(0.18 0.04 165 / 0.85), oklch(0.10 0.005 150 / 0.92))`,
        }}
      />
      <div className="absolute inset-0 grain pointer-events-none opacity-50" />
      <div className="container relative py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <span className="eyebrow">{OFFERS.audit.name}</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
              Get the property scored
              <span className="italic text-brass"> before you decide.</span>
            </h2>
            <p className="mt-6 text-cream/70 text-lg max-w-2xl leading-relaxed">
              Free. Your hotel scored out of 100 across seven areas, every finding priced in
              dollars, the two most valuable fixes written out in full. Buying, building or
              opening instead? Start with {OFFERS.plan.name}.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <a href={OFFERS.audit.formPath} className="btn-brass w-full justify-center">
              {OFFERS.audit.cta} <ArrowRight className="w-4 h-4" />
            </a>
            <a href={OFFERS.plan.formPath} className="btn-ghost w-full justify-center">
              {OFFERS.plan.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const OFFER_LINKS = [
  { label: OFFERS.audit.name, href: OFFERS.audit.path },
  { label: OFFERS.subscription.name, href: OFFERS.subscription.path },
  { label: OFFERS.plan.name, href: OFFERS.plan.path },
  { label: OFFERS.launch.name, href: OFFERS.launch.path },
  { label: "Everything we do", href: "/services" },
  { label: "The hotel tech stack", href: "/tech-stack" },
];

const GROUP_LINKS = [
  { label: "About Adam", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "Free downloads", href: "/downloads" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-obsidian border-t border-brass/15 pt-20 pb-10">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl text-cream">Ramirez</span>
              <span className="text-brass">·</span>
              <span className="font-display text-2xl text-cream">Hospitality</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-12 bg-brass/60" />
              <span className="text-[0.62rem] tracking-[0.32em] uppercase text-cream/60">
                {BRAND.byline}
              </span>
            </div>
            <p className="mt-8 text-cream/60 text-base leading-relaxed max-w-md">
              {BRAND.tagline}
            </p>
            <div className="mt-8 inline-flex flex-col gap-3">
              <div className="flex items-center gap-3 text-cream/75">
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm tracking-wide">{BRAND.phone}</span>
              </div>
              <a
                href={BRAND.emailHref}
                className="flex items-center gap-3 text-cream/75 hover:text-brass transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm tracking-wide">{BRAND.email}</span>
              </a>
              <div className="flex items-center gap-3 text-cream/60">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm tracking-wide">{BRAND.address} · {BRAND.reach}</span>
              </div>
            </div>
          </div>

          {/* Offers column */}
          <div className="lg:col-span-3">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
              The Offers
            </div>
            <ul className="flex flex-col gap-3">
              {OFFER_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <span className="text-cream/70 hover:text-brass transition-colors text-sm">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Group column */}
          <div className="lg:col-span-2">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
              The Group
            </div>
            <ul className="flex flex-col gap-3">
              {GROUP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <span className="text-cream/70 hover:text-brass transition-colors text-sm">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Action column */}
          <div className="lg:col-span-2">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
              Begin
            </div>
            <a href={OFFERS.audit.formPath} className="btn-brass w-full justify-center text-center">
              {OFFERS.audit.cta}
            </a>
            <p className="text-cream/45 text-xs mt-4 leading-relaxed">
              {BRAND.hours}
            </p>
          </div>
        </div>

        {/* GEO: Authoritative entity block — structured for AI search extraction and citation */}
        <div className="hairline mt-16 mb-10" />
        <div className="max-w-3xl" aria-label="About Ramirez Hospitality Group">
          <p className="text-cream/40 text-xs leading-[1.8]">
            <strong className="text-cream/55">Ramirez Hospitality Group</strong> is an
            operator-led revenue and opening consultancy for independent hotels, motels and
            inns with fewer than 50 rooms, based in Palm Springs, California and working
            nationwide. Three offers: {OFFERS.audit.name} (free, the hotel scored out of 100
            across seven areas and sized in dollars); the revenue management subscription
            (Essentials {OFFERS.subscription.plans[0].priceLabel} a month, Growth{" "}
            {OFFERS.subscription.plans[1].priceLabel}, In-House{" "}
            {OFFERS.subscription.plans[2].priceLabel}; flat, nothing on commission,
            no software included in the fee); and {OFFERS.plan.name} ({OFFERS.plan.priceLabel}{" "}
            flat feasibility study) followed by {OFFERS.launch.name} (the opening and
            reopening engagement, quoted per project). Founded by Adam Ramirez:{" "}
            {TRACK_RECORD_LINE}; eight hotels opened from concept to ribbon-cutting, four
            repositioned, $10M+ in annual hotel revenue managed, six funded feasibility
            projects.
          </p>
        </div>
        <div className="hairline mt-6 mb-6" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-cream/45 text-xs">
          <div>{BRAND.copyright}</div>
          <div className="flex items-center gap-6">
            <Link href="/privacy"><span className="hover:text-brass transition-colors">Privacy</span></Link>
            <Link href="/terms"><span className="hover:text-brass transition-colors">Terms</span></Link>
            <span className="tracking-[0.32em] uppercase text-brass/60">Estd · 2023</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
