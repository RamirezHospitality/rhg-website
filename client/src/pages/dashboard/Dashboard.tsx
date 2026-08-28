/*
 * Ramirez Hospitality Group — Google Ads dashboard
 * Route: /dashboard (Basic Auth at the edge, see functions/_middleware.ts)
 *
 * Read-only display over an AdsDataSource. No credentials, no writes, no
 * AI calls. "Copy for Claude" produces text for a local Claude Code session.
 * noindex, excluded from sitemap and prerender, robots Disallow.
 */

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { SEO } from "@/components/SEO";
import { getAdsDataSource, type AdsDataSource, type DateRange } from "@/lib/ads/dataSource";
import {
  fmt,
  lastNDays,
  sumPerf,
  summarizeCampaign,
  summarizeKeyword,
  summarizeSearchTerm,
  type CampaignSummary,
  type KeywordSummary,
  type SearchTermSummary,
} from "@/lib/ads/normalize";
import { buildRecommendations } from "@/lib/ads/recommendations";
import { CampaignTable } from "./CampaignTable";
import { RecommendationsView } from "./RecommendationsView";
import { SearchTermsTable } from "./SearchTermsTable";

type Tab = "recommendations" | "campaigns" | "search-terms";
const TABS: { id: Tab; label: string }[] = [
  { id: "recommendations", label: "Recommendations" },
  { id: "campaigns", label: "Campaigns" },
  { id: "search-terms", label: "Search terms" },
];

const RANGES = [7, 30, 90] as const;
type RangeDays = (typeof RANGES)[number];

interface Loaded {
  campaigns: CampaignSummary[];
  keywords: KeywordSummary[];
  searchTerms: SearchTermSummary[];
}

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("recommendations");
  const [days, setDays] = useState<RangeDays>(30);
  const [source, setSource] = useState<AdsDataSource | null>(null);
  const [data, setData] = useState<Loaded | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const range: DateRange = useMemo(() => lastNDays(days), [days]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const ds = await getAdsDataSource();
        const [campaignRows, keywordRows, termRows] = await Promise.all([
          ds.campaigns(range),
          ds.keywords(range),
          ds.searchTerms(range),
        ]);
        if (cancelled) return;
        setSource(ds);
        setData({
          campaigns: campaignRows.map(summarizeCampaign),
          keywords: keywordRows.map(summarizeKeyword),
          searchTerms: termRows.map(summarizeSearchTerm),
        });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load ads data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [range, reloadKey]);

  const recommendations = useMemo(
    () => (data ? buildRecommendations({ range, ...data }) : []),
    [data, range],
  );

  const totals = useMemo(() => (data ? sumPerf(data.campaigns) : null), [data]);
  const recoverable = recommendations.filter((r) => r.kind === "waste").reduce((s, r) => s + r.monthlyDollars, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Ads Dashboard | Ramirez Hospitality Group"
        description="Private Google Ads performance dashboard."
        canonical="/dashboard"
        noindex
      />

      <header className="border-b border-brass/15 bg-obsidian">
        <div className="container py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-display text-[1.25rem] leading-none tracking-[0.02em] text-cream font-semibold">
              Ramirez<span className="text-brass"> · </span>Hospitality
            </div>
            <div className="mt-2 text-[0.62rem] tracking-[0.32em] uppercase text-brass">Google Ads dashboard</div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {source && (
              <span
                className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[0.62rem] tracking-[0.2em] uppercase ${
                  source.isMock ? "border-brass/50 text-brass" : "border-emerald-glimmer/60 text-cream/80"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${source.isMock ? "bg-brass" : "bg-emerald-glimmer"}`} aria-hidden="true" />
                {source.label}
              </span>
            )}
            <div className="inline-flex border border-brass/25" role="group" aria-label="Date range">
              {RANGES.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setDays(n)}
                  aria-pressed={days === n}
                  className={`px-3 py-1.5 text-[0.65rem] tracking-[0.18em] uppercase transition-colors ${
                    days === n ? "bg-brass text-obsidian" : "text-cream/70 hover:text-brass"
                  }`}
                >
                  {n}d
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-cream/60 hover:text-brass transition-colors"
              aria-label="Reload data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Reload
            </button>
          </div>
        </div>
      </header>

      <main className="container py-8 lg:py-10">
        <div className="text-[0.65rem] tracking-wider text-cream/45 mb-6 tabular-nums">
          {range.start} to {range.end} · account {source?.customerId ?? "…"} · read-only
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-brass/15 border border-brass/15 mb-8">
          {[
            { label: "Spend", value: totals ? fmt.usd2(totals.spend) : "…" },
            { label: "Conversions", value: totals ? fmt.conv(totals.conversions) : "…" },
            { label: "Cost per conversion", value: totals ? fmt.usd2(totals.costPerConversion) : "…" },
            { label: "ROAS", value: totals ? fmt.roas(totals.roas) : "…" },
            { label: "Recoverable / month", value: data ? fmt.usd(recoverable) : "…", accent: true },
          ].map((k) => (
            <div key={k.label} className="bg-card p-5">
              <div className="text-[0.6rem] tracking-[0.28em] uppercase text-brass">{k.label}</div>
              <div className={`font-display text-3xl mt-2 tabular-nums ${k.accent ? "text-brass" : "text-cream"}`}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-brass/20 mb-6" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-[0.68rem] tracking-[0.22em] uppercase border-b-2 -mb-px transition-colors ${
                tab === t.id ? "border-brass text-brass" : "border-transparent text-cream/60 hover:text-cream"
              }`}
            >
              {t.label}
              {t.id === "recommendations" && recommendations.length > 0 && (
                <span className="ml-2 text-cream/45">{recommendations.length}</span>
              )}
            </button>
          ))}
        </div>

        {error && (
          <div className="border border-brass/40 bg-card p-6 text-sm text-cream/85 mb-6">
            {error}
          </div>
        )}

        {loading && !data ? (
          <div className="border border-brass/20 bg-card p-10 text-center text-sm text-cream/60">Loading…</div>
        ) : data ? (
          <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"}>
            {tab === "recommendations" && (
              <RecommendationsView
                recommendations={recommendations}
                promptContext={{ customerId: source?.customerId ?? "", range, isMock: source?.isMock ?? true }}
              />
            )}
            {tab === "campaigns" && <CampaignTable campaigns={data.campaigns} />}
            {tab === "search-terms" && <SearchTermsTable terms={data.searchTerms} />}
          </div>
        ) : null}

        <p className="mt-10 text-[0.65rem] tracking-wider text-cream/40 leading-relaxed max-w-3xl">
          This dashboard holds no Google Ads credentials and cannot change the account. "Copy for Claude" places a
          prompt on your clipboard for the local Claude Code session that does. Recommendations are rule-based
          estimates; the prompt asks Claude to re-verify against the live account before proposing any mutation.
        </p>
      </main>
    </div>
  );
}
