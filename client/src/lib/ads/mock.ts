/*
 * Ramirez Hospitality Group — MOCK Google Ads data source
 *
 * Deterministic, typed to the real API row shapes in ./types.ts. Numbers are
 * a 30-day baseline that scales linearly with the requested date range, so the
 * dashboard behaves sensibly for 7, 30, and 90 day views.
 *
 * The account structure mirrors the real campaign themes (revenue management
 * consultant, boutique hotel consultant, hotel opening consultant, fractional
 * revenue manager) and includes the kind of search-term waste a consulting
 * account actually sees: job seekers, students, software shoppers, buyers.
 *
 * Every number here is invented. The header of the dashboard says so.
 */

import type { AdsDataSource, DateRange } from "./dataSource";
import type {
  AdGroupRow,
  CampaignRow,
  KeywordMatchType,
  KeywordRow,
  Metrics,
  SearchTermRow,
  SearchTermTargetingStatus,
} from "./types";

const CID = "0000000000"; // placeholder customer id; real one lives in Adam's local session
const BASELINE_DAYS = 30;

const res = {
  campaign: (id: string) => `customers/${CID}/campaigns/${id}`,
  budget: (id: string) => `customers/${CID}/campaignBudgets/${id}`,
  adGroup: (id: string) => `customers/${CID}/adGroups/${id}`,
  criterion: (agId: string, critId: string) => `customers/${CID}/adGroupCriteria/${agId}~${critId}`,
  keywordView: (agId: string, critId: string) => `customers/${CID}/keywordViews/${agId}~${critId}`,
  searchTermView: (cId: string, agId: string, term: string) =>
    `customers/${CID}/searchTermViews/${cId}~${agId}~${btoa(term).replace(/=+$/, "")}`,
};

const micros = (dollars: number) => String(Math.round(dollars * 1_000_000));

/** Build a Metrics object from dollars/counts, scaled to the range. */
function metrics(
  base: { cost: number; clicks: number; impressions: number; conv: number; value?: number },
  factor: number,
): Metrics {
  const cost = base.cost * factor;
  const clicks = Math.round(base.clicks * factor);
  const impressions = Math.round(base.impressions * factor);
  const conversions = Math.round(base.conv * factor * 10) / 10;
  const conversionsValue = Math.round((base.value ?? base.conv * 850) * factor * 100) / 100;
  return {
    impressions: String(impressions),
    clicks: String(clicks),
    costMicros: micros(cost),
    conversions,
    conversionsValue,
    ctr: impressions ? clicks / impressions : 0,
    averageCpc: clicks ? (cost / clicks) * 1_000_000 : 0,
    costPerConversion: conversions ? cost / conversions : undefined,
  };
}

function daysInRange(r: DateRange): number {
  const a = new Date(`${r.start}T00:00:00Z`).getTime();
  const b = new Date(`${r.end}T00:00:00Z`).getTime();
  if (!Number.isFinite(a) || !Number.isFinite(b) || b < a) return BASELINE_DAYS;
  return Math.round((b - a) / 86_400_000) + 1;
}

// ─── Account structure ─────────────────────────────────────────────────────

interface CampaignSeed {
  id: string;
  name: string;
  status: "ENABLED" | "PAUSED";
  budgetPerDay: number;
  bidding: "MAXIMIZE_CONVERSIONS" | "MANUAL_CPC" | "TARGET_CPA";
  base: { cost: number; clicks: number; impressions: number; conv: number; value?: number };
  impressionShare: number;
  budgetLost: number;
}

const CAMPAIGNS: CampaignSeed[] = [
  {
    id: "21837465001",
    name: "RM | Revenue Management Consultant | Search",
    status: "ENABLED",
    budgetPerDay: 40,
    bidding: "MAXIMIZE_CONVERSIONS",
    base: { cost: 1184.2, clicks: 212, impressions: 6840, conv: 9, value: 7650 },
    impressionShare: 0.41,
    budgetLost: 0.22,
  },
  {
    id: "21837465002",
    name: "RM | Boutique Hotel Consultant | Search",
    status: "ENABLED",
    budgetPerDay: 30,
    bidding: "MAXIMIZE_CONVERSIONS",
    base: { cost: 842.6, clicks: 176, impressions: 5120, conv: 4, value: 3400 },
    impressionShare: 0.38,
    budgetLost: 0.11,
  },
  {
    id: "21837465003",
    name: "OP | Hotel Opening Consultant | Search",
    status: "ENABLED",
    budgetPerDay: 25,
    bidding: "MANUAL_CPC",
    base: { cost: 611.4, clicks: 98, impressions: 3010, conv: 2, value: 1700 },
    impressionShare: 0.52,
    budgetLost: 0.05,
  },
  {
    id: "21837465004",
    name: "RM | Fractional Revenue Manager | Search",
    status: "ENABLED",
    budgetPerDay: 20,
    bidding: "MANUAL_CPC",
    base: { cost: 498.9, clicks: 131, impressions: 4420, conv: 0, value: 0 },
    impressionShare: 0.47,
    budgetLost: 0.03,
  },
  {
    id: "21837465005",
    name: "Brand | Ramirez Hospitality | Search",
    status: "PAUSED",
    budgetPerDay: 5,
    bidding: "MANUAL_CPC",
    base: { cost: 41.3, clicks: 38, impressions: 210, conv: 1, value: 850 },
    impressionShare: 0.91,
    budgetLost: 0,
  },
];

interface AdGroupSeed {
  id: string;
  campaignId: string;
  name: string;
  base: { cost: number; clicks: number; impressions: number; conv: number; value?: number };
}

const AD_GROUPS: AdGroupSeed[] = [
  { id: "1101", campaignId: "21837465001", name: "Hotel Revenue Management Consultant", base: { cost: 612.4, clicks: 104, impressions: 3120, conv: 6, value: 5100 } },
  { id: "1102", campaignId: "21837465001", name: "Hotel Revenue Management Services", base: { cost: 341.6, clicks: 66, impressions: 2260, conv: 1, value: 850 } },
  { id: "1103", campaignId: "21837465001", name: "Independent Hotel Revenue Management", base: { cost: 230.2, clicks: 42, impressions: 1460, conv: 2, value: 1700 } },
  { id: "1201", campaignId: "21837465002", name: "Boutique Hotel Consultant", base: { cost: 548.1, clicks: 118, impressions: 3390, conv: 3, value: 2550 } },
  { id: "1202", campaignId: "21837465002", name: "Independent Hotel Consultant", base: { cost: 294.5, clicks: 58, impressions: 1730, conv: 1, value: 850 } },
  { id: "1301", campaignId: "21837465003", name: "Hotel Opening Consultant", base: { cost: 402.3, clicks: 61, impressions: 1820, conv: 2, value: 1700 } },
  { id: "1302", campaignId: "21837465003", name: "Hotel Pre-Opening", base: { cost: 209.1, clicks: 37, impressions: 1190, conv: 0, value: 0 } },
  { id: "1401", campaignId: "21837465004", name: "Fractional Revenue Manager", base: { cost: 301.2, clicks: 79, impressions: 2610, conv: 0, value: 0 } },
  { id: "1402", campaignId: "21837465004", name: "Outsourced Revenue Management", base: { cost: 197.7, clicks: 52, impressions: 1810, conv: 0, value: 0 } },
  { id: "1501", campaignId: "21837465005", name: "Brand", base: { cost: 41.3, clicks: 38, impressions: 210, conv: 1, value: 850 } },
];

interface KeywordSeed {
  critId: string;
  adGroupId: string;
  text: string;
  match: KeywordMatchType;
  qs?: number;
  base: { cost: number; clicks: number; impressions: number; conv: number; value?: number };
}

const KEYWORDS: KeywordSeed[] = [
  { critId: "300001", adGroupId: "1101", text: "hotel revenue management consultant", match: "EXACT", qs: 8, base: { cost: 318.4, clicks: 49, impressions: 1180, conv: 4, value: 3400 } },
  { critId: "300002", adGroupId: "1101", text: "hotel revenue management consultant", match: "PHRASE", qs: 7, base: { cost: 196.2, clicks: 34, impressions: 1210, conv: 2, value: 1700 } },
  { critId: "300003", adGroupId: "1101", text: "hotel revenue management consulting", match: "BROAD", qs: 5, base: { cost: 97.8, clicks: 21, impressions: 730, conv: 0, value: 0 } },
  { critId: "300004", adGroupId: "1102", text: "hotel revenue management services", match: "PHRASE", qs: 6, base: { cost: 196.4, clicks: 38, impressions: 1240, conv: 1, value: 850 } },
  { critId: "300005", adGroupId: "1102", text: "revenue management for hotels", match: "PHRASE", qs: 4, base: { cost: 145.2, clicks: 28, impressions: 1020, conv: 0, value: 0 } },
  { critId: "300006", adGroupId: "1103", text: "independent hotel revenue management", match: "PHRASE", qs: 7, base: { cost: 142.7, clicks: 26, impressions: 890, conv: 1, value: 850 } },
  { critId: "300007", adGroupId: "1103", text: "boutique hotel revenue management", match: "EXACT", qs: 8, base: { cost: 87.5, clicks: 16, impressions: 570, conv: 1, value: 850 } },
  { critId: "300008", adGroupId: "1201", text: "boutique hotel consultant", match: "PHRASE", qs: 6, base: { cost: 318.0, clicks: 66, impressions: 1740, conv: 3, value: 2550 } },
  { critId: "300009", adGroupId: "1201", text: "boutique hotel consulting", match: "BROAD", qs: 3, base: { cost: 230.1, clicks: 52, impressions: 1650, conv: 0, value: 0 } },
  { critId: "300010", adGroupId: "1202", text: "independent hotel consultant", match: "PHRASE", qs: 6, base: { cost: 188.9, clicks: 37, impressions: 1090, conv: 1, value: 850 } },
  { critId: "300011", adGroupId: "1202", text: "small hotel consultant", match: "PHRASE", qs: 5, base: { cost: 105.6, clicks: 21, impressions: 640, conv: 0, value: 0 } },
  { critId: "300012", adGroupId: "1301", text: "hotel opening consultant", match: "PHRASE", qs: 7, base: { cost: 286.3, clicks: 43, impressions: 1210, conv: 2, value: 1700 } },
  { critId: "300013", adGroupId: "1301", text: "hotel pre opening consultant", match: "EXACT", qs: 6, base: { cost: 116.0, clicks: 18, impressions: 610, conv: 0, value: 0 } },
  { critId: "300014", adGroupId: "1302", text: "hotel pre-opening checklist", match: "BROAD", qs: 3, base: { cost: 209.1, clicks: 37, impressions: 1190, conv: 0, value: 0 } },
  { critId: "300015", adGroupId: "1401", text: "fractional revenue manager", match: "PHRASE", qs: 5, base: { cost: 142.0, clicks: 35, impressions: 1160, conv: 0, value: 0 } },
  { critId: "300016", adGroupId: "1401", text: "fractional revenue management", match: "BROAD", qs: 4, base: { cost: 159.2, clicks: 44, impressions: 1450, conv: 0, value: 0 } },
  { critId: "300017", adGroupId: "1402", text: "outsourced revenue management", match: "PHRASE", qs: 4, base: { cost: 118.4, clicks: 31, impressions: 1120, conv: 0, value: 0 } },
  { critId: "300018", adGroupId: "1402", text: "remote revenue manager hotel", match: "PHRASE", qs: 6, base: { cost: 79.3, clicks: 21, impressions: 690, conv: 0, value: 0 } },
  { critId: "300019", adGroupId: "1501", text: "ramirez hospitality", match: "EXACT", qs: 10, base: { cost: 41.3, clicks: 38, impressions: 210, conv: 1, value: 850 } },
];

interface SearchTermSeed {
  adGroupId: string;
  term: string;
  status: SearchTermTargetingStatus;
  /** criterion id of the keyword that matched */
  via: string;
  base: { cost: number; clicks: number; impressions: number; conv: number; value?: number };
}

const SEARCH_TERMS: SearchTermSeed[] = [
  // Campaign 1: Revenue Management Consultant
  { adGroupId: "1101", term: "hotel revenue management consultant", status: "ADDED", via: "300001", base: { cost: 312.4, clicks: 48, impressions: 1160, conv: 4, value: 3400 } },
  { adGroupId: "1101", term: "revenue management consultant for boutique hotel", status: "NONE", via: "300002", base: { cost: 88.2, clicks: 12, impressions: 310, conv: 2, value: 1700 } },
  { adGroupId: "1101", term: "hotel revenue manager salary", status: "NONE", via: "300003", base: { cost: 52.1, clicks: 9, impressions: 260, conv: 0 } },
  { adGroupId: "1101", term: "hotel revenue management jobs", status: "NONE", via: "300003", base: { cost: 38.4, clicks: 7, impressions: 220, conv: 0 } },
  { adGroupId: "1101", term: "revenue management course hotel", status: "NONE", via: "300003", base: { cost: 24.6, clicks: 5, impressions: 140, conv: 0 } },
  { adGroupId: "1101", term: "revenue management internship", status: "EXCLUDED", via: "300003", base: { cost: 8.1, clicks: 2, impressions: 60, conv: 0 } },
  { adGroupId: "1102", term: "hotel revenue management services", status: "ADDED", via: "300004", base: { cost: 171.9, clicks: 33, impressions: 1050, conv: 1, value: 850 } },
  { adGroupId: "1102", term: "hotel revenue management software", status: "NONE", via: "300005", base: { cost: 61.2, clicks: 11, impressions: 380, conv: 0 } },
  { adGroupId: "1102", term: "what is hotel revenue management", status: "NONE", via: "300005", base: { cost: 19.8, clicks: 6, impressions: 240, conv: 0 } },
  { adGroupId: "1102", term: "hotel revenue management pdf", status: "NONE", via: "300005", base: { cost: 12.3, clicks: 4, impressions: 170, conv: 0 } },
  { adGroupId: "1102", term: "revenue management for hotels", status: "ADDED", via: "300005", base: { cost: 51.9, clicks: 7, impressions: 230, conv: 0 } },
  { adGroupId: "1103", term: "independent hotel revenue management company", status: "NONE", via: "300006", base: { cost: 64.0, clicks: 9, impressions: 250, conv: 1, value: 850 } },
  { adGroupId: "1103", term: "independent hotel revenue management", status: "ADDED", via: "300006", base: { cost: 78.7, clicks: 17, impressions: 640, conv: 0 } },
  { adGroupId: "1103", term: "boutique hotel revenue management", status: "ADDED", via: "300007", base: { cost: 87.5, clicks: 16, impressions: 570, conv: 1, value: 850 } },

  // Campaign 2: Boutique Hotel Consultant
  { adGroupId: "1201", term: "boutique hotel consultant", status: "ADDED", via: "300008", base: { cost: 290.3, clicks: 52, impressions: 1390, conv: 3, value: 2550 } },
  { adGroupId: "1201", term: "boutique hotel for sale", status: "NONE", via: "300009", base: { cost: 71.5, clicks: 13, impressions: 520, conv: 0 } },
  { adGroupId: "1201", term: "how to start a boutique hotel", status: "NONE", via: "300009", base: { cost: 44.2, clicks: 12, impressions: 480, conv: 0 } },
  { adGroupId: "1201", term: "boutique hotel design consultant", status: "NONE", via: "300009", base: { cost: 33.1, clicks: 5, impressions: 150, conv: 0 } },
  { adGroupId: "1201", term: "boutique hotel jobs", status: "NONE", via: "300009", base: { cost: 29.9, clicks: 6, impressions: 210, conv: 0 } },
  { adGroupId: "1201", term: "boutique hotel consulting firms", status: "NONE", via: "300009", base: { cost: 51.4, clicks: 16, impressions: 290, conv: 0 } },
  { adGroupId: "1202", term: "independent hotel consultant", status: "ADDED", via: "300010", base: { cost: 178.6, clicks: 35, impressions: 1010, conv: 1, value: 850 } },
  { adGroupId: "1202", term: "hotel consultant near me", status: "NONE", via: "300011", base: { cost: 58.3, clicks: 9, impressions: 260, conv: 1, value: 850 } },
  { adGroupId: "1202", term: "small hotel consultant", status: "ADDED", via: "300011", base: { cost: 47.3, clicks: 12, impressions: 380, conv: 0 } },

  // Campaign 3: Hotel Opening Consultant
  { adGroupId: "1301", term: "hotel opening consultant", status: "ADDED", via: "300012", base: { cost: 198.4, clicks: 31, impressions: 860, conv: 2, value: 1700 } },
  { adGroupId: "1301", term: "hotel opening jobs", status: "NONE", via: "300012", base: { cost: 21.4, clicks: 5, impressions: 160, conv: 0 } },
  { adGroupId: "1301", term: "hotel pre opening consultant", status: "ADDED", via: "300013", base: { cost: 116.0, clicks: 18, impressions: 610, conv: 0 } },
  { adGroupId: "1302", term: "hotel opening checklist free", status: "NONE", via: "300014", base: { cost: 36.8, clicks: 9, impressions: 330, conv: 0 } },
  { adGroupId: "1302", term: "new hotel pre opening budget template", status: "NONE", via: "300014", base: { cost: 27.6, clicks: 6, impressions: 210, conv: 0 } },
  { adGroupId: "1302", term: "hotel pre-opening checklist", status: "ADDED", via: "300014", base: { cost: 144.7, clicks: 22, impressions: 650, conv: 0 } },

  // Campaign 4: Fractional Revenue Manager
  { adGroupId: "1401", term: "fractional revenue manager", status: "ADDED", via: "300015", base: { cost: 142.0, clicks: 35, impressions: 1160, conv: 0 } },
  { adGroupId: "1401", term: "fractional cfo", status: "NONE", via: "300016", base: { cost: 48.7, clicks: 11, impressions: 410, conv: 0 } },
  { adGroupId: "1401", term: "fractional revenue management", status: "ADDED", via: "300016", base: { cost: 95.4, clicks: 28, impressions: 890, conv: 0 } },
  { adGroupId: "1401", term: "revenue manager remote jobs", status: "NONE", via: "300016", base: { cost: 15.1, clicks: 5, impressions: 150, conv: 0 } },
  { adGroupId: "1402", term: "outsourced revenue management services", status: "NONE", via: "300017", base: { cost: 89.0, clicks: 22, impressions: 780, conv: 0 } },
  { adGroupId: "1402", term: "revenue manager remote jobs", status: "NONE", via: "300018", base: { cost: 66.3, clicks: 17, impressions: 520, conv: 0 } },
  { adGroupId: "1402", term: "outsourced revenue management", status: "ADDED", via: "300017", base: { cost: 29.4, clicks: 9, impressions: 340, conv: 0 } },
  { adGroupId: "1402", term: "remote revenue manager hotel", status: "ADDED", via: "300018", base: { cost: 13.0, clicks: 4, impressions: 170, conv: 0 } },

  // Campaign 5: Brand (paused)
  { adGroupId: "1501", term: "ramirez hospitality", status: "ADDED", via: "300019", base: { cost: 41.3, clicks: 38, impressions: 210, conv: 1, value: 850 } },
];

// ─── Implementation ────────────────────────────────────────────────────────

const campaignById = new Map(CAMPAIGNS.map((c) => [c.id, c]));
const adGroupById = new Map(AD_GROUPS.map((g) => [g.id, g]));
const keywordByCrit = new Map(KEYWORDS.map((k) => [k.critId, k]));

/** Small artificial latency so loading states are exercised like a real network call. */
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export class MockAdsDataSource implements AdsDataSource {
  readonly customerId = "000-000-0000";
  readonly label = "Mock data. Google Ads API token pending.";
  readonly isMock = true;

  async campaigns(range: DateRange): Promise<CampaignRow[]> {
    await wait(180);
    const f = daysInRange(range) / BASELINE_DAYS;
    return CAMPAIGNS.map((c) => ({
      campaign: {
        resourceName: res.campaign(c.id),
        id: c.id,
        name: c.name,
        status: c.status,
        advertisingChannelType: "SEARCH",
        biddingStrategyType: c.bidding,
        campaignBudget: res.budget(`9${c.id}`),
      },
      campaignBudget: { resourceName: res.budget(`9${c.id}`), amountMicros: micros(c.budgetPerDay) },
      metrics: {
        ...metrics(c.base, f),
        searchImpressionShare: c.impressionShare,
        searchBudgetLostImpressionShare: c.budgetLost,
      },
    }));
  }

  async adGroups(range: DateRange): Promise<AdGroupRow[]> {
    await wait(120);
    const f = daysInRange(range) / BASELINE_DAYS;
    return AD_GROUPS.map((g) => {
      const c = campaignById.get(g.campaignId)!;
      return {
        adGroup: {
          resourceName: res.adGroup(g.id),
          id: g.id,
          name: g.name,
          status: c.status === "PAUSED" ? "PAUSED" : "ENABLED",
          campaign: res.campaign(c.id),
        },
        campaign: { resourceName: res.campaign(c.id), id: c.id, name: c.name },
        metrics: metrics(g.base, f),
      };
    });
  }

  async keywords(range: DateRange): Promise<KeywordRow[]> {
    await wait(160);
    const f = daysInRange(range) / BASELINE_DAYS;
    return KEYWORDS.map((k) => {
      const g = adGroupById.get(k.adGroupId)!;
      const c = campaignById.get(g.campaignId)!;
      return {
        keywordView: { resourceName: res.keywordView(g.id, k.critId) },
        adGroupCriterion: {
          resourceName: res.criterion(g.id, k.critId),
          criterionId: k.critId,
          status: "ENABLED",
          negative: false,
          keyword: { text: k.text, matchType: k.match },
          qualityInfo: k.qs
            ? {
                qualityScore: k.qs,
                creativeQualityScore: k.qs >= 7 ? "ABOVE_AVERAGE" : k.qs >= 5 ? "AVERAGE" : "BELOW_AVERAGE",
                postClickQualityScore: k.qs >= 6 ? "AVERAGE" : "BELOW_AVERAGE",
                searchPredictedCtr: k.qs >= 7 ? "ABOVE_AVERAGE" : "AVERAGE",
              }
            : undefined,
        },
        adGroup: { resourceName: res.adGroup(g.id), id: g.id, name: g.name },
        campaign: { resourceName: res.campaign(c.id), id: c.id, name: c.name },
        metrics: metrics(k.base, f),
      };
    });
  }

  async searchTerms(range: DateRange): Promise<SearchTermRow[]> {
    await wait(220);
    const f = daysInRange(range) / BASELINE_DAYS;
    return SEARCH_TERMS.map((s) => {
      const g = adGroupById.get(s.adGroupId)!;
      const c = campaignById.get(g.campaignId)!;
      const k = keywordByCrit.get(s.via)!;
      return {
        searchTermView: {
          resourceName: res.searchTermView(c.id, g.id, s.term),
          searchTerm: s.term,
          status: s.status,
          adGroup: res.adGroup(g.id),
        },
        adGroup: { resourceName: res.adGroup(g.id), id: g.id, name: g.name },
        campaign: { resourceName: res.campaign(c.id), id: c.id, name: c.name },
        segments: {
          keyword: {
            adGroupCriterion: res.criterion(g.id, k.critId),
            info: { text: k.text, matchType: k.match },
          },
        },
        metrics: metrics(s.base, f),
      };
    });
  }
}
