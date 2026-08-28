/*
 * Ramirez Hospitality Group — Normalization layer
 *
 * Converts raw Google Ads API rows (micros as strings, int64 as strings) into
 * plain numbers the UI can format, and computes derived metrics in one place
 * so every view agrees on what "cost per conversion" means.
 */

import type { DateRange } from "./dataSource";
import type { CampaignRow, KeywordRow, Metrics, SearchTermRow } from "./types";

export interface Perf {
  spend: number;
  clicks: number;
  impressions: number;
  conversions: number;
  conversionsValue: number;
  ctr: number; // 0..1
  avgCpc: number; // dollars
  costPerConversion: number | null;
  roas: number | null; // conversionsValue / spend
}

export function microsToDollars(v: string | number | undefined): number {
  if (v === undefined || v === null) return 0;
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? n / 1_000_000 : 0;
}

export function toInt(v: string | number | undefined): number {
  if (v === undefined || v === null) return 0;
  const n = typeof v === "string" ? Number(v) : v;
  return Number.isFinite(n) ? Math.round(n) : 0;
}

export function perf(m: Metrics | undefined): Perf {
  const spend = microsToDollars(m?.costMicros);
  const clicks = toInt(m?.clicks);
  const impressions = toInt(m?.impressions);
  const conversions = m?.conversions ?? 0;
  const conversionsValue = m?.conversionsValue ?? 0;
  return {
    spend,
    clicks,
    impressions,
    conversions,
    conversionsValue,
    ctr: impressions ? clicks / impressions : 0,
    avgCpc: clicks ? spend / clicks : 0,
    costPerConversion: conversions > 0 ? spend / conversions : null,
    roas: spend > 0 ? conversionsValue / spend : null,
  };
}

export function sumPerf(items: Perf[]): Perf {
  const t = items.reduce(
    (acc, p) => {
      acc.spend += p.spend;
      acc.clicks += p.clicks;
      acc.impressions += p.impressions;
      acc.conversions += p.conversions;
      acc.conversionsValue += p.conversionsValue;
      return acc;
    },
    { spend: 0, clicks: 0, impressions: 0, conversions: 0, conversionsValue: 0 },
  );
  return {
    ...t,
    ctr: t.impressions ? t.clicks / t.impressions : 0,
    avgCpc: t.clicks ? t.spend / t.clicks : 0,
    costPerConversion: t.conversions > 0 ? t.spend / t.conversions : null,
    roas: t.spend > 0 ? t.conversionsValue / t.spend : null,
  };
}

// ─── View models ───────────────────────────────────────────────────────────

export interface CampaignSummary extends Perf {
  id: string;
  name: string;
  status: CampaignRow["campaign"]["status"];
  bidding: string;
  dailyBudget: number;
  impressionShare: number | null;
  budgetLostShare: number | null;
}

export function summarizeCampaign(row: CampaignRow): CampaignSummary {
  return {
    id: row.campaign.id,
    name: row.campaign.name,
    status: row.campaign.status,
    bidding: row.campaign.biddingStrategyType ?? "UNKNOWN",
    dailyBudget: microsToDollars(row.campaignBudget?.amountMicros),
    impressionShare: row.metrics.searchImpressionShare ?? null,
    budgetLostShare: row.metrics.searchBudgetLostImpressionShare ?? null,
    ...perf(row.metrics),
  };
}

export interface KeywordSummary extends Perf {
  criterionId: string;
  text: string;
  matchType: KeywordRow["adGroupCriterion"]["keyword"]["matchType"];
  qualityScore: number | null;
  adGroupId: string;
  adGroupName: string;
  campaignId: string;
  campaignName: string;
}

export function summarizeKeyword(row: KeywordRow): KeywordSummary {
  return {
    criterionId: row.adGroupCriterion.criterionId,
    text: row.adGroupCriterion.keyword.text,
    matchType: row.adGroupCriterion.keyword.matchType,
    qualityScore: row.adGroupCriterion.qualityInfo?.qualityScore ?? null,
    adGroupId: row.adGroup.id,
    adGroupName: row.adGroup.name,
    campaignId: row.campaign.id,
    campaignName: row.campaign.name,
    ...perf(row.metrics),
  };
}

export interface SearchTermSummary extends Perf {
  term: string;
  status: SearchTermRow["searchTermView"]["status"];
  matchedKeyword: string | null;
  matchedMatchType: string | null;
  adGroupId: string;
  adGroupName: string;
  campaignId: string;
  campaignName: string;
}

export function summarizeSearchTerm(row: SearchTermRow): SearchTermSummary {
  return {
    term: row.searchTermView.searchTerm,
    status: row.searchTermView.status,
    matchedKeyword: row.segments?.keyword?.info.text ?? null,
    matchedMatchType: row.segments?.keyword?.info.matchType ?? null,
    adGroupId: row.adGroup.id,
    adGroupName: row.adGroup.name,
    campaignId: row.campaign.id,
    campaignName: row.campaign.name,
    ...perf(row.metrics),
  };
}

// ─── Date helpers ──────────────────────────────────────────────────────────

export function daysInRange(r: DateRange): number {
  const a = Date.parse(`${r.start}T00:00:00Z`);
  const b = Date.parse(`${r.end}T00:00:00Z`);
  if (!Number.isFinite(a) || !Number.isFinite(b) || b < a) return 30;
  return Math.round((b - a) / 86_400_000) + 1;
}

/** Multiply a value observed over the range to a 30-day figure. */
export function monthlyFactor(r: DateRange): number {
  return 30 / daysInRange(r);
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** Last N full days ending yesterday, matching how Google Ads reports "last 30 days". */
export function lastNDays(n: number, now: Date = new Date()): DateRange {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1));
  const start = new Date(end.getTime() - (n - 1) * 86_400_000);
  return { start: iso(start), end: iso(end) };
}

// ─── Formatting ────────────────────────────────────────────────────────────

const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const int = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export const fmt = {
  usd: (n: number | null | undefined) => (n === null || n === undefined ? "–" : usd0.format(n)),
  usd2: (n: number | null | undefined) => (n === null || n === undefined ? "–" : usd2.format(n)),
  int: (n: number | null | undefined) => (n === null || n === undefined ? "–" : int.format(n)),
  pct: (n: number | null | undefined, digits = 1) =>
    n === null || n === undefined ? "–" : `${(n * 100).toFixed(digits)}%`,
  conv: (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1)),
  roas: (n: number | null) => (n === null ? "–" : `${n.toFixed(1)}x`),
};
