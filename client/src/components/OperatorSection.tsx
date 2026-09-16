/*
 * Ramirez Hospitality Group — Who does the work
 *
 * Shared across the site and the ad landing pages on purpose, so the
 * operator's story and the track record read the same everywhere.
 */

import { Eyebrow } from "@/components/Eyebrow";
import { PROPERTIES, TRACK_RECORD_FACTS } from "@/lib/brand";

interface OperatorSectionProps {
  /** Roman numeral shown in the section eyebrow — differs by page. */
  numeral?: string;
  /**
   * Render the unbranded track-record facts instead of the named PROPERTIES
   * list. Required on the /lp ad pages (2026-08-29): the Google Ads account
   * was suspended for Public Figure / Business Impersonation, most likely
   * triggered by named third-party hotel brands appearing without their
   * written permission. Indexable pages keep the named list.
   */
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
              <span className="italic text-brass">Operator first.</span>
            </h2>
            <p className="mt-7 text-cream/80 leading-[1.7] max-w-2xl">
              Adam has spent 10+ years opening, repositioning and running independent and
              boutique hotels, many of them in Palm Springs, and still prices hotels every
              morning. Ramirez Hospitality Group is how an owner gets that work without hiring
              for it.
            </p>
            <p className="mt-5 text-cream/80 leading-[1.7] max-w-2xl">
              The method is the product and it lives in your own accounts: every rate plan,
              rule and piece of data belongs to you. A second contact is named on every
              account. If you wanted to take it over tomorrow, you could.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-5">
              {unbranded ? "The track record" : "Properties opened, repositioned, or run"}
            </div>
            {unbranded ? (
              <ul className="flex flex-col gap-3 text-cream/75 text-sm">
                {TRACK_RECORD_FACTS.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brass/60">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-cream/75 text-sm">
                  {PROPERTIES.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-brass/60">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 pt-5 border-t border-brass/15 flex flex-col gap-2 text-cream/60 text-sm">
                  {TRACK_RECORD_FACTS.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-brass/60">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
