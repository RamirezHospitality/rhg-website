/*
 * Ramirez Hospitality Group — Pricing (with the Lincoln tier bridge)
 *
 * Shared between the ad landing page and the homepage on purpose — Adam's
 * canvas notes call these out as "the same block... they stay identical
 * across the site," so the tiers and the arithmetic table live here once.
 */

import { Fragment } from "react";
import { Check } from "lucide-react";
import { Eyebrow } from "@/components/Eyebrow";

const TIERS = [
  { name: "Essentials", price: "$850", fit: "10 to 40 keys" },
  { name: "Growth", price: "$1,500", fit: "30 to 80 keys" },
  { name: "Enterprise", price: "$2,500+", fit: "80+ keys and portfolios" },
];

const LINCOLN_ARITHMETIC = [
  { line: "The free moves", fee: "$0", value: "~$14,000", note: "given away" },
  { line: "Essentials", fee: "$850 / mo", value: "+$64,000", note: "6.3× the fee" },
  { line: "Growth", fee: "$1,500 / mo", value: "+$26,000 more", note: "5.0× the fee" },
  { line: "Enterprise", fee: "$2,500+ / mo", value: "+$12,000 and growing", note: "events, buyouts, group sales" },
];

const CHECKLIST = [
  "Runs inside the PMS you already have",
  "Flat fee, no setup cost, no contract",
  "Monthly strategy call and performance report",
  "The Modern Hotel Audit first, free, no strings",
];

const DEFAULT_INTRO =
  "The subscription starts after The Modern Hotel Audit, and only if it fits. Flat monthly fee, no setup fee, no contract. Re-scored on a schedule we put in writing: the number has to move. You keep every login and every export.";

interface PricingSectionProps {
  /** Roman numeral shown in the section eyebrow — differs by page. */
  numeral?: string;
  /**
   * Intro paragraph. Defaults to the Modern Hotel Audit framing — override
   * on a page whose entry point isn't the audit (e.g. a pre-opening LP,
   * where there's no operating property yet to audit).
   */
  intro?: string;
  /** Checklist under the tiers/arithmetic table. Defaults mention the audit as the entry point; override alongside `intro` when it doesn't apply. */
  checklist?: string[];
}

export function PricingSection({
  numeral = "V",
  intro = DEFAULT_INTRO,
  checklist = CHECKLIST,
}: PricingSectionProps) {
  return (
    <section className="py-20 lg:py-28 panel-emerald border-y border-brass/15">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Eyebrow numeral={numeral} label="Pricing" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              From $850 a month.
              <br />
              <span className="italic text-brass">Month to month. No lock-in.</span>
            </h2>
            <p className="mt-6 text-cream/80 leading-[1.7] max-w-md">{intro}</p>
          </div>
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
              {TIERS.map((t) => (
                <div key={t.name} className="bg-obsidian p-7">
                  <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">{t.name}</div>
                  <div className="mt-4 font-display text-3xl text-cream">
                    {t.price}
                    <span className="text-cream/50 text-base"> / mo</span>
                  </div>
                  <div className="mt-2 text-cream/65 text-sm">{t.fit}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 border border-brass/20 bg-background/70">
              <div className="px-5 py-3.5 border-b border-brass/20 text-[0.62rem] tracking-[0.32em] uppercase text-brass">
                How the arithmetic looked for The Lincoln (base case, per year)
              </div>
              <div className="grid grid-cols-[1.2fr_0.8fr_1fr_0.9fr] text-[0.8125rem]">
                {LINCOLN_ARITHMETIC.map((row, i) => {
                  const border = i < LINCOLN_ARITHMETIC.length - 1 ? "border-b border-brass/10" : "";
                  return (
                    <Fragment key={row.line}>
                      <div className={`px-5 py-3 text-cream/75 ${border}`}>{row.line}</div>
                      <div className={`px-5 py-3 text-cream/55 ${border}`}>{row.fee}</div>
                      <div className={`px-5 py-3 text-cream ${border}`}>{row.value}</div>
                      <div className={`px-5 py-3 ${i === 0 ? "text-cream/55" : "text-brass"} ${border}`}>
                        {row.note}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-cream/85 text-sm">
              {checklist.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
