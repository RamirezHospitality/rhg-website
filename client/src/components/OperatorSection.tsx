/*
 * Ramirez Hospitality Group — Who does the work
 *
 * Shared between the ad landing page and the homepage on purpose — Adam's
 * canvas notes call this block out as one that stays identical across the
 * site, alongside the audit and pricing sections.
 */

import { Eyebrow } from "@/components/Eyebrow";
import { PROPERTIES } from "@/lib/brand";

interface OperatorSectionProps {
  /** Roman numeral shown in the section eyebrow — differs by page. */
  numeral?: string;
}

export function OperatorSection({ numeral = "VI" }: OperatorSectionProps) {
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
              Properties opened, repositioned, or run
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-cream/75 text-sm">
              {PROPERTIES.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-brass/60">·</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
