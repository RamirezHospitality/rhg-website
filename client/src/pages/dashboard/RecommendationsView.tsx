/*
 * Ramirez Hospitality Group — Ads dashboard · Recommendations, ranked by dollars
 *
 * Each row: the issue, what it costs per month, the fix, and "Copy for Claude",
 * which puts a plain-text prompt on the clipboard. No API calls, no credentials.
 */

import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { buildClaudePrompt, copyText, type PromptContext } from "@/lib/ads/claudePrompt";
import { fmt } from "@/lib/ads/normalize";
import type { Recommendation, RecommendationType } from "@/lib/ads/recommendations";

interface Props {
  recommendations: Recommendation[];
  promptContext: PromptContext;
}

const TYPE_LABEL: Record<RecommendationType, string> = {
  NEGATIVE_KEYWORDS: "Negative keywords",
  LOW_QUALITY_SCORE: "Quality Score",
  BROAD_MATCH_WASTE: "Broad match",
  ADD_CONVERTING_TERM: "Add keyword",
  CAMPAIGN_CPA: "Cost per conversion",
  CAMPAIGN_NO_CONVERSIONS: "No conversions",
};

function CopyButton({ rec, ctx }: { rec: Recommendation; ctx: PromptContext }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await copyText(buildClaudePrompt(rec, ctx));
    if (ok) {
      setCopied(true);
      toast.success("Prompt copied.", { description: "Paste it into your local Claude Code session." });
      setTimeout(() => setCopied(false), 2200);
    } else {
      toast.error("Could not reach the clipboard.", { description: "Expand the row and copy the prompt text manually." });
    }
  }

  return (
    <button type="button" onClick={onCopy} className="btn-ghost text-[0.68rem] px-4 py-2.5 whitespace-nowrap">
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy for Claude"}
    </button>
  );
}

function Row({ rec, ctx, rank }: { rec: Recommendation; ctx: PromptContext; rank: number }) {
  const [open, setOpen] = useState(false);
  const prompt = open ? buildClaudePrompt(rec, ctx) : "";

  return (
    <li className="border-b border-brass/15 last:border-b-0">
      <div className="grid gap-4 p-5 lg:p-6 lg:grid-cols-[3rem_1fr_11rem_auto] lg:items-start">
        <div className="font-display italic text-brass text-2xl leading-none hidden lg:block">{rank}</div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <span className="text-[0.6rem] tracking-[0.28em] uppercase text-brass">{TYPE_LABEL[rec.type]}</span>
            <span className="text-[0.6rem] tracking-[0.28em] uppercase text-cream/45">
              {rec.kind === "waste" ? "Recoverable spend" : "Opportunity"}
            </span>
          </div>
          <h3 className="font-display text-xl text-cream leading-snug">{rec.title}</h3>
          <p className="mt-2 text-sm text-cream/75 leading-[1.7]">{rec.issue}</p>
          <p className="mt-2 text-sm text-cream/85 leading-[1.7]">
            <span className="text-brass">Fix: </span>
            {rec.fix}
          </p>
          <p className="mt-2 text-[0.68rem] tracking-wider text-cream/45">
            {rec.campaignName}
            {rec.adGroupName ? ` · ${rec.adGroupName}` : ""}
          </p>
        </div>

        <div className="lg:text-right">
          <div className="text-[0.6rem] tracking-[0.28em] uppercase text-cream/45">
            {rec.kind === "waste" ? "Per month" : "Value / month"}
          </div>
          <div className="font-display text-3xl text-cream tabular-nums mt-1">{fmt.usd(rec.monthlyDollars)}</div>
          <div className="text-[0.65rem] text-cream/45 mt-1 tabular-nums">
            {fmt.usd2(rec.basis.rangeSpend)} over {rec.basis.days} days
          </div>
        </div>

        <div className="flex lg:flex-col gap-2 items-start">
          <CopyButton rec={rec} ctx={ctx} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-[0.68rem] tracking-[0.18em] uppercase text-cream/60 hover:text-brass transition-colors px-1 py-2"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
            {open ? "Hide detail" : "Detail"}
          </button>
        </div>
      </div>

      {open && (
        <div className="px-5 pb-6 lg:px-6 lg:pl-[calc(3rem+1.5rem+1rem)] grid gap-6 lg:grid-cols-2">
          {rec.evidence.length > 0 && (
            <div className="border border-brass/15 bg-obsidian">
              <div className="px-4 py-2.5 border-b border-brass/15 text-[0.6rem] tracking-[0.28em] uppercase text-brass">
                Evidence
              </div>
              <table className="w-full">
                <tbody>
                  {rec.evidence.map((e) => (
                    <tr key={e.term} className="border-b border-brass/10 last:border-b-0">
                      <td className="px-4 py-2 text-sm text-cream/85">
                        "{e.term}"
                        {e.matchedKeyword && (
                          <div className="text-[0.65rem] text-cream/45 mt-0.5">via "{e.matchedKeyword}"</div>
                        )}
                      </td>
                      <td className="px-3 py-2 text-sm text-cream/85 text-right tabular-nums whitespace-nowrap">{fmt.usd2(e.spend)}</td>
                      <td className="px-3 py-2 text-sm text-cream/60 text-right tabular-nums whitespace-nowrap">{e.clicks} clicks</td>
                      <td className="px-4 py-2 text-sm text-cream/60 text-right tabular-nums whitespace-nowrap">{fmt.conv(e.conversions)} conv</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className={`border border-brass/15 bg-obsidian ${rec.evidence.length === 0 ? "lg:col-span-2" : ""}`}>
            <div className="px-4 py-2.5 border-b border-brass/15 text-[0.6rem] tracking-[0.28em] uppercase text-brass">
              Prompt that gets copied
            </div>
            <pre className="p-4 text-[0.72rem] leading-[1.6] text-cream/75 whitespace-pre-wrap font-mono max-h-80 overflow-auto">
              {prompt}
            </pre>
          </div>
        </div>
      )}
    </li>
  );
}

export function RecommendationsView({ recommendations, promptContext }: Props) {
  const waste = recommendations.filter((r) => r.kind === "waste").reduce((s, r) => s + r.monthlyDollars, 0);
  const opportunity = recommendations
    .filter((r) => r.kind === "opportunity")
    .reduce((s, r) => s + r.monthlyDollars, 0);

  if (recommendations.length === 0) {
    return (
      <div className="border border-brass/20 bg-card p-10 text-center">
        <h3 className="font-display text-2xl text-cream">Nothing to fix in this range.</h3>
        <p className="mt-3 text-sm text-cream/65">Widen the date range or check back after more spend has accrued.</p>
      </div>
    );
  }

  const wasteRows = recommendations.filter((r) => r.kind === "waste");
  const opportunityRows = recommendations.filter((r) => r.kind === "opportunity");

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-px bg-brass/15 border border-brass/15 mb-6">
        <div className="bg-card p-5">
          <div className="text-[0.6rem] tracking-[0.28em] uppercase text-brass">Recoverable per month</div>
          <div className="font-display text-3xl text-cream mt-2 tabular-nums">{fmt.usd(waste)}</div>
        </div>
        <div className="bg-card p-5">
          <div className="text-[0.6rem] tracking-[0.28em] uppercase text-brass">Opportunity per month</div>
          <div className="font-display text-3xl text-cream mt-2 tabular-nums">{fmt.usd(opportunity)}</div>
        </div>
        <div className="bg-card p-5">
          <div className="text-[0.6rem] tracking-[0.28em] uppercase text-brass">Recommendations</div>
          <div className="font-display text-3xl text-cream mt-2 tabular-nums">{recommendations.length}</div>
        </div>
      </div>
      {wasteRows.length > 0 && (
        <section className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-display text-2xl text-cream">Recoverable spend</h2>
            <span className="text-[0.62rem] tracking-[0.28em] uppercase text-cream/45">Ranked by dollars per month</span>
          </div>
          <ol className="border border-brass/20 bg-card">
            {wasteRows.map((rec, i) => (
              <Row key={rec.id} rec={rec} ctx={promptContext} rank={i + 1} />
            ))}
          </ol>
        </section>
      )}
      {opportunityRows.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-display text-2xl text-cream">Opportunities</h2>
            <span className="text-[0.62rem] tracking-[0.28em] uppercase text-cream/45">Estimated value, not recoverable spend</span>
          </div>
          <ol className="border border-brass/20 bg-card">
            {opportunityRows.map((rec, i) => (
              <Row key={rec.id} rec={rec} ctx={promptContext} rank={i + 1} />
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
