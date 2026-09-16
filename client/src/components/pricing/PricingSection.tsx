/*
 * Ramirez Hospitality Group — The three plans, in brief
 *
 * Shared between the homepage and the ad landing pages so the plan names,
 * prices and terms can never drift. Reads everything from OFFERS in
 * lib/brand.ts. The full plan cards and comparison table live on the
 * Subscription page (/revenue-management); this block is the summary.
 *
 * No per-plan dollar-capture claims, no key counts, no software price.
 */

import { Check } from "lucide-react";
import { Link } from "wouter";
import { Eyebrow } from "@/components/Eyebrow";
import { OFFERS, SOFTWARE } from "@/lib/brand";

const SAME_ON_EVERY_PLAN = [
  "No setup fee. Nothing on commission.",
  SOFTWARE.short,
  "Floors and ceilings you set. Nothing goes below your floor without your sign-off.",
  "One full cycle to start, then month to month with thirty days' notice.",
  "Re-scored against your audit on a schedule we put in writing.",
];

const DEFAULT_INTRO =
  "The subscription starts after The Modern Hotel Audit, and only if it fits. Kind of work sets the plan; every plan runs at full effort. Flat monthly fee, published. One full cycle to start, then month to month.";

interface PricingSectionProps {
  /** Roman numeral shown in the section eyebrow — differs by page. */
  numeral?: string;
  /**
   * Intro paragraph. Defaults to the Modern Hotel Audit framing — override
   * on a page whose entry point isn't the audit (e.g. a pre-opening LP,
   * where there's no operating property yet to audit).
   */
  intro?: string;
  /** Show the "See the three plans" link to the Subscription page. Off on ad pages. */
  linkToPlans?: boolean;
}

export function PricingSection({
  numeral = "V",
  intro = DEFAULT_INTRO,
  linkToPlans = true,
}: PricingSectionProps) {
  const plans = OFFERS.subscription.plans;
  return (
    <section className="py-20 lg:py-28 panel-emerald border-y border-brass/15">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Eyebrow numeral={numeral} label="The Subscription" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              Your prices set every day.
              <br />
              Your booking sites worked.
              <br />
              <span className="italic text-brass">Your groups priced right.</span>
            </h2>
            <p className="mt-6 text-cream/80 leading-[1.7] max-w-md">{intro}</p>
            {linkToPlans && (
              <div className="mt-8">
                <Link href={OFFERS.subscription.path}>
                  <span className="link-brass pr-6">See the three plans</span>
                </Link>
              </div>
            )}
          </div>
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
              {plans.map((p) => (
                <div key={p.key} className="bg-obsidian p-7">
                  <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">{p.name}</div>
                  <div className="mt-4 font-display text-3xl text-cream">
                    {p.priceLabel}
                    <span className="text-cream/50 text-base"> a month</span>
                  </div>
                  <div className="mt-2 text-cream/75 text-sm leading-[1.55]">{p.line}</div>
                </div>
              ))}
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-cream/85 text-sm">
              {SAME_ON_EVERY_PLAN.map((line) => (
                <li key={line} className="flex gap-3">
                  <Check className="w-4 h-4 text-brass mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-cream/45 text-xs leading-[1.6]">{SOFTWARE.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
