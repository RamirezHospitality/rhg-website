/*
 * Ramirez Hospitality Group — Ads dashboard · Search terms (raw view behind the negatives)
 */

import { fmt, type SearchTermSummary } from "@/lib/ads/normalize";

interface Props {
  terms: SearchTermSummary[];
}

const th = "text-left text-[0.6rem] tracking-[0.28em] uppercase text-brass font-medium px-4 py-3 whitespace-nowrap";
const thNum = `${th} text-right`;
const td = "px-4 py-2.5 text-sm text-cream/85 align-top";
const tdNum = `${td} text-right tabular-nums whitespace-nowrap`;

const STATUS_LABEL: Record<SearchTermSummary["status"], string> = {
  ADDED: "Keyword",
  EXCLUDED: "Negative",
  ADDED_EXCLUDED: "Keyword + negative",
  NONE: "Not added",
  UNKNOWN: "Unknown",
  UNSPECIFIED: "Unknown",
};

export function SearchTermsTable({ terms }: Props) {
  const rows = [...terms].sort((a, b) => b.spend - a.spend);
  return (
    <div className="border border-brass/20 bg-card overflow-x-auto">
      <table className="w-full min-w-[900px] border-collapse">
        <thead className="border-b border-brass/20">
          <tr>
            <th className={th}>Search term</th>
            <th className={th}>Matched keyword</th>
            <th className={th}>Status</th>
            <th className={th}>Campaign / ad group</th>
            <th className={thNum}>Spend</th>
            <th className={thNum}>Clicks</th>
            <th className={thNum}>Conv.</th>
            <th className={thNum}>Cost / conv.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => {
            const waste = t.conversions === 0 && t.status === "NONE" && t.spend > 0;
            return (
              <tr key={`${t.adGroupId}-${t.term}`} className="border-b border-brass/10 hover:bg-obsidian/60 transition-colors">
                <td className={`${td} text-cream`}>
                  {t.term}
                  {waste && (
                    <span className="ml-2 text-[0.6rem] tracking-[0.18em] uppercase text-brass/80">no conv</span>
                  )}
                </td>
                <td className={td}>
                  {t.matchedKeyword ?? "–"}
                  {t.matchedMatchType && (
                    <span className="ml-2 text-[0.6rem] tracking-[0.18em] uppercase text-cream/45">{t.matchedMatchType.toLowerCase()}</span>
                  )}
                </td>
                <td className={td}>{STATUS_LABEL[t.status]}</td>
                <td className={td}>
                  <div className="text-cream/85">{t.campaignName}</div>
                  <div className="text-[0.65rem] text-cream/45 mt-0.5">{t.adGroupName}</div>
                </td>
                <td className={`${tdNum} text-cream`}>{fmt.usd2(t.spend)}</td>
                <td className={tdNum}>{fmt.int(t.clicks)}</td>
                <td className={tdNum}>{fmt.conv(t.conversions)}</td>
                <td className={tdNum}>{fmt.usd2(t.costPerConversion)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
