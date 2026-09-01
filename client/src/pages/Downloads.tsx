/*
 * Ramirez Hospitality Group — The Reserve · FREE DOWNLOADS
 *
 * Landing page for the free resource library. Files live in the "RHG Free
 * Downloads" Google Drive folder (adam@ramirezhospitality.com), each shared
 * "anyone with the link, viewer." Linked directly — no gate, no email
 * capture. Articles (starting with the Q01 motel valuation piece) point
 * here as a quiet text link, not a button.
 */

import { Download, FileSpreadsheet, FileText, ClipboardCheck } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";
import { BRAND } from "@/lib/brand";

const RESOURCES = [
  {
    icon: FileSpreadsheet,
    title: "The Small Hotel Underwriting Template",
    format: "Google Sheet",
    body: "What a property can earn, what it is worth, and whether the loan pencils. Type over the seller's trailing twelve months, build your own year-one case next to it, and the Sensitivity tab shows what happens to debt coverage if your rate or occupancy assumption is off by ten percent. For 8 to 75 keys.",
    href: "https://docs.google.com/spreadsheets/d/1ezLiYB5dzPxA_oqos4oiqolCJI3oNczP9w3461YKxAU/edit?usp=sharing",
  },
  {
    icon: FileText,
    title: "The Rate Audit",
    format: "PDF",
    body: "A ten-question self-check you can score in an evening, plus the two-year and comp-set tests I run on every property before I say a word about its rates. Tells you whether the fastest money in your business is sitting unclaimed in the calendar.",
    href: "https://drive.google.com/file/d/1DWRleDcMP_Cj-bFLOGKPoiffu7Pk48BY/view?usp=sharing",
  },
  {
    icon: ClipboardCheck,
    title: "The First 90 Days Checklist",
    format: "PDF",
    body: "What actually matters in the first three months of owning a small hotel, in the order it matters. Thirty-two items and five numbers, starting with the logins and accounts that need to move out of the seller's name before day 30.",
    href: "https://drive.google.com/file/d/1cg9z0vUCrAfY67NiL35DCD7LvIMgHr0-/view?usp=sharing",
  },
];

export default function Downloads() {
  return (
    <PageLayout
      title="Free Hotel Owner Downloads: Underwriting Template, Rate Audit & More | Ramirez Hospitality Group"
      description="Free tools for independent hotel and motel owners: the Small Hotel Underwriting Template, the Rate Audit self-check, and the First 90 Days Checklist. No email required."
      canonical="/downloads"
      breadcrumbs={[{ name: "Downloads", href: "/downloads" }]}
      jsonLd={[ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-20 lg:pt-56 lg:pb-28 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="Free Resources" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Tools I actually use,
              <br />
              <span className="italic text-brass">free, no strings.</span>
            </h1>
            <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl">
              The same worksheets, audits, and checklists I bring to a paid engagement.
              Take the one you need. No email, no login.
            </p>
          </div>
        </div>
      </section>

      {/* RESOURCE LIST */}
      <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
        <div className="container relative z-10">
          <Eyebrow numeral="II" label="The Library" />
          <div className="mt-12 grid md:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={i * 100} className="bg-obsidian p-8 lg:p-10 flex flex-col">
                <r.icon className="w-6 h-6 text-brass mb-6" strokeWidth={1.5} />
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass/70 mb-3">
                  {r.format}
                </div>
                <h2 className="font-display text-xl lg:text-2xl text-cream mb-4 leading-snug">
                  {r.title}
                </h2>
                <p className="text-cream/70 text-sm leading-[1.7] mb-8 flex-1">{r.body}</p>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brass text-xs tracking-[0.18em] uppercase font-semibold hover:text-brass-soft transition-colors duration-300"
                >
                  Download <Download className="w-3.5 h-3.5" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING NOTE */}
      <section className="py-20 lg:py-28 bg-obsidian">
        <div className="container">
          <Reveal className="max-w-2xl">
            <Eyebrow numeral="III" label="Want it looked at properly" />
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-cream leading-[1.1]">
              A worksheet gets you close.
              <br />
              <span className="italic text-brass">An audit gets you the number.</span>
            </h2>
            <p className="mt-7 text-cream/75 leading-[1.7]">
              If you want the walk done on a property you are actually looking at, bring it
              to a conversation.
            </p>
            <div className="mt-9">
              <a href={BRAND.auditBookingUrl} target="_blank" rel="noopener noreferrer" className="btn-brass">
                Book The Modern Hotel Audit
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
