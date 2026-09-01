/*
 * Ramirez Hospitality Group — Who does the work
 *
 * Shared between the ad landing page and the homepage on purpose — Adam's
 * canvas notes call this block out as one that stays identical across the
 * site, alongside the audit and pricing sections.
 */

import { Eyebrow } from "@/components/Eyebrow";
import { PROPERTIES } from "@/lib/brand";

// Unbranded stand-in for the named PROPERTIES list — required on the ad LPs
// (2026-08-29): the Google Ads account was suspended for Public Figure /
// Business Impersonation, most likely triggered by named third-party hotel
// brands appearing without their written permission. Indexable pages
// (Home, Audit, FeasibilityStudy) keep the named list — naming past clients
// there is normal consulting practice and isn't what's under review; the
// noindex ad LPs pass `unbranded` instead. De-brand, don't delete: these are
// the same facts, just without the third-party names.
const UNBRANDED_FACTS = [
  "8 hotels opened from concept to ribbon-cutting",
  "4 properties repositioned after renovation or ownership transition",
  "50+ independent and boutique hospitality properties worked with",
  "$10M+ in annual hotel revenue managed",
];

interface OperatorSectionProps {
  /** Roman numeral shown in the section eyebrow — differs by page. */
  numeral?: string;
  /** Render unbranded summary facts instead of the named PROPERTIES list. */
  unbranded?: boolean;
}

export function OperatorSection({ numeral = "VI", unbranded = false }: OperatorSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-obsidian">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <Eyebrow numeral={numeral} label="Who does the work" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              Adam Ramirez.
              <br />
              <span className="italic text-brass">Operator first, consultant second.</span>
            </h2>
            <p className="mt-7 text-cream/80 leading-[1.7] max-w-2xl">
              I have spent 10+ years opening, repositioning, and running independent and
              boutique hotels, many of them in Palm Springs, and I still price hotels every
              morning. Ramirez Hospitality Group is how owners get that work without hiring
              for it. You deal with me, not an account team.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-5">
              {unbranded ? "The track record" : "Properties opened, repositioned, or run"}
            </div>
            {unbranded ? (
              <ul className="flex flex-col gap-3 text-cream/75 text-sm">
                {UNBRANDED_FACTS.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brass/60">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-cream/75 text-sm">
                {PROPERTIES.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-brass/60">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
