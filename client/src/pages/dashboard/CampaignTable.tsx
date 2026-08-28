/*
 * Ramirez Hospitality Group — Ads dashboard · Campaign performance table
 */

import { fmt, sumPerf, type CampaignSummary } from "@/lib/ads/normalize";

interface Props {
  campaigns: CampaignSummary[];
}

const th = "text-left text-[0.6rem] tracking-[0.28em] uppercase text-brass font-medium px-4 py-3 whitespace-nowrap";
const thNum = `${th} text-right`;
const td = "px-4 py-3 text-sm text-cream/85 align-top";
const tdNum = `${td} text-right tabular-nums whitespace-nowrap`;

function StatusBadge({ status }: { status: CampaignSummary["status"] }) {
  const label = status === "ENABLED" ? "Enabled" : status === "PAUSED" ? "Paused" : status.toLowerCase();
  const dot = status === "ENABLED" ? "bg-emerald-glimmer" : "bg-cream/30";
  return (
    <span className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-cream/70">
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
}

export function CampaignTable({ campaigns }: Props) {
  const rows = [...campaigns].sort((a, b) => b.spend - a.spend);
  const total = sumPerf(rows);

  return (
    <div className="border border-brass/20 bg-card overflow-x-auto">
      <table className="w-full min-w-[960px] border-collapse">
        <thead className="border-b border-brass/20">
          <tr>
            <th className={th}>Campaign</th>
            <th className={th}>Status</th>
            <th className={thNum}>Budget / day</th>
            <th className={thNum}>Spend</th>
            <th className={thNum}>Impr.</th>
            <th className={thNum}>Clicks</th>
            <th className={thNum}>CTR</th>
            <th className={thNum}>Avg CPC</th>
            <th className={thNum}>Conv.</th>
            <th className={thNum}>Cost / conv.</th>
            <th className={thNum}>Conv. value</th>
            <th className={thNum}>ROAS</th>
            <th className={thNum}>Impr. share</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.id} className="border-b border-brass/10 hover:bg-obsidian/60 transition-colors">
              <td className={td}>
                <div className="text-cream">{c.name}</div>
                <div className="text-[0.65rem] tracking-wider text-cream/45 mt-1">
                  {c.bidding.replace(/_/g, " ").toLowerCase()} · id {c.id}
                </div>
              </td>
              <td className={td}><StatusBadge status={c.status} /></td>
              <td className={tdNum}>{fmt.usd(c.dailyBudget)}</td>
              <td className={`${tdNum} text-cream`}>{fmt.usd2(c.spend)}</td>
              <td className={tdNum}>{fmt.int(c.impressions)}</td>
              <td className={tdNum}>{fmt.int(c.clicks)}</td>
              <td className={tdNum}>{fmt.pct(c.ctr, 2)}</td>
              <td className={tdNum}>{fmt.usd2(c.avgCpc)}</td>
              <td className={tdNum}>{fmt.conv(c.conversions)}</td>
              <td className={tdNum}>{fmt.usd2(c.costPerConversion)}</td>
              <td className={tdNum}>{fmt.usd(c.conversionsValue)}</td>
              <td className={tdNum}>{fmt.roas(c.roas)}</td>
              <td className={tdNum}>
                {fmt.pct(c.impressionShare, 0)}
                {c.budgetLostShare !== null && c.budgetLostShare >= 0.1 && (
                  <div className="text-[0.65rem] text-cream/45 mt-0.5">{fmt.pct(c.budgetLostShare, 0)} lost to budget</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-brass/30">
          <tr>
            <td className={`${td} text-cream font-medium`} colSpan={3}>All campaigns</td>
            <td className={`${tdNum} text-cream font-medium`}>{fmt.usd2(total.spend)}</td>
            <td className={tdNum}>{fmt.int(total.impressions)}</td>
            <td className={tdNum}>{fmt.int(total.clicks)}</td>
            <td className={tdNum}>{fmt.pct(total.ctr, 2)}</td>
            <td className={tdNum}>{fmt.usd2(total.avgCpc)}</td>
            <td className={tdNum}>{fmt.conv(total.conversions)}</td>
            <td className={tdNum}>{fmt.usd2(total.costPerConversion)}</td>
            <td className={tdNum}>{fmt.usd(total.conversionsValue)}</td>
            <td className={tdNum}>{fmt.roas(total.roas)}</td>
            <td className={tdNum}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
