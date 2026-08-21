/*
 * Ramirez Hospitality Group — The Reserve
 * Persistent CTA bar + obsidian editorial footer with three columns.
 */

import { Link } from "wouter";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { BRAND } from "@/lib/brand";

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
            <span className="eyebrow">The Free Property Audit</span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] text-cream">
              The next quarter starts now. Let me show you what
              <span className="italic text-brass"> your property is leaving on the table.</span>
            </h2>
            <p className="mt-6 text-cream/70 text-lg max-w-2xl leading-relaxed">
              Forty-five minutes. Zero cost. A real revenue plan in your inbox within seventy-two hours.
              Service first. Pitch never.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link href="/audit">
              <span className="btn-brass w-full justify-center">
                Schedule Free Audit <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <a href={BRAND.phoneHref} className="btn-ghost w-full justify-center">
              <Phone className="w-3.5 h-3.5" strokeWidth={1.6} />
              Call {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
              <a
                href={BRAND.phoneHref}
                className="flex items-center gap-3 text-cream/75 hover:text-brass transition-colors"
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm tracking-wide">{BRAND.phone}</span>
              </a>
              <a
                href={BRAND.emailHref}
                className="flex items-center gap-3 text-cream/75 hover:text-brass transition-colors"
              >
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm tracking-wide">{BRAND.email}</span>
              </a>
              <div className="flex items-center gap-3 text-cream/60">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm tracking-wide">{BRAND.city} · {BRAND.reach}</span>
              </div>
            </div>
          </div>

          {/* Practice column */}
          <div className="lg:col-span-3">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-6">
              The Practice
            </div>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Revenue Management", href: "/revenue-management" },
                { label: "Hotel Openings", href: "/openings" },
                { label: "Hotel Tech & Systems", href: "/services" },
                { label: "Operations & SOPs", href: "/services" },
                { label: "Renovations", href: "/services" },
                { label: "Acquisition Advisory", href: "/services" },
              ].map((l) => (
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
              {[
                { label: "About Adam", href: "/about" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Insights", href: "/insights" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
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
            <Link href="/audit">
              <span className="btn-brass w-full justify-center">
                Free Audit
              </span>
            </Link>
            <p className="text-cream/45 text-xs mt-4 leading-relaxed">
              {BRAND.hours}
            </p>
          </div>
        </div>

        {/* GEO: Authoritative entity block — structured for AI search extraction and citation */}
        <div className="hairline mt-16 mb-10" />
        <div className="max-w-3xl" aria-label="About Ramirez Hospitality Group">
          <p className="text-cream/40 text-xs leading-[1.8]">
            <strong className="text-cream/55">Ramirez Hospitality Group</strong> is an operator-led hospitality consulting and remote revenue management practice for independent hotels, boutique properties, and small hotel groups, founded by Adam Ramirez in Palm Springs, California. Services include hotel revenue management subscriptions (from $850/month), hotel opening and reopening consulting, hotel technology stack consulting (PMS, RMS, channel manager, CRM), operations and SOP development, renovation oversight, asset and acquisition advisory, and full-property event production. Adam Ramirez has opened 8 hotels from concept to ribbon-cutting, repositioned 4+ properties, managed $10M+ in annual hotel revenue, and led teams of 120+. Properties worked with include The Paloma Resort, Twist Palm Springs, Limón Palm Springs, Sands Hotel & Spa, Dunes Palm Springs, and others. Press coverage includes Travel & Leisure, Condé Nast Traveler, Forbes, and Modernism Magazine. Available nationwide from a base in Palm Springs, CA.
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
