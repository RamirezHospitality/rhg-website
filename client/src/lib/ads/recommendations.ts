/*
 * Ramirez Hospitality Group — Recommendations engine
 *
 * Pure functions over normalized rows. Produces a ranked list of things worth
 * changing in the account, each with a monthly dollar figure attached, sorted
 * by dollars descending. Every threshold is in CONFIG so it can be tuned
 * without touching the rules.
 *
 * "monthlyDollars" is always a 30-day figure, scaled from the selected range.
 * kind "waste" = spend that stops if the fix is applied (recoverable).
 * kind "opportunity" = value the account is likely leaving on the table
 * (estimated, not recoverable spend). Both rank in the same list; the UI labels them.
 */

import type { DateRange } from "./dataSource";
import { monthlyFactor, type CampaignSummary, type KeywordSummary, type SearchTermSummary } from "./normalize";

export const CONFIG = {
  /** What a lead is worth paying for. First-month Essentials revenue is the floor. */
  targetCostPerConversion: 250,
  /** Minimum spend (in-range dollars) before a search term is worth a negative. */
  negativeMinSpend: 15,
  negativeMinClicks: 4,
  /** Quality Score at or below this with spend is a message-match problem. */
  lowQualityScore: 4,
  lowQsMinSpend: 40,
  /** Estimated CPC discount from lifting a keyword from QS 3-4 to 6-7. Conservative. */
  lowQsRecoverableShare: 0.25,
  broadMinSpend: 60,
  /** A converting search term with at least this many conversions deserves its own exact keyword. */
  addKeywordMinConversions: 1,
  /** Campaign flagged when CPA exceeds target by this multiple. */
  cpaMultiple: 1.5,
  /** Campaign with no conversions is flagged after this much spend (in-range dollars). */
  zeroConvMinSpend: 200,
} as const;

export type RecommendationType =
  | "NEGATIVE_KEYWORDS"
  | "LOW_QUALITY_SCORE"
  | "BROAD_MATCH_WASTE"
  | "ADD_CONVERTING_TERM"
  | "CAMPAIGN_CPA"
  | "CAMPAIGN_NO_CONVERSIONS";

export interface TermEvidence {
  term: string;
  spend: number;
  clicks: number;
  conversions: number;
  matchedKeyword?: string | null;
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  kind: "waste" | "opportunity";
  /** Short label for the row. */
  title: string;
  /** What is wrong, in one or two sentences. */
  issue: string;
  /** What to do about it. */
  fix: string;
  monthlyDollars: number;
  /** Where in the account. */
  campaignId: string;
  campaignName: string;
  adGroupId?: string;
  adGroupName?: string;
  /** Supporting rows shown in the expanded view and included in the Claude prompt. */
  evidence: TermEvidence[];
  /** Structured description of the API change, consumed by claudePrompt.ts. */
  action: RecommendationAction;
  /** In-range figures behind the monthly number, for transparency. */
  basis: { rangeSpend: number; rangeConversions: number; days: number };
}

export type RecommendationAction =
  | {
      op: "ADD_NEGATIVE_KEYWORDS";
      level: "CAMPAIGN";
      campaignId: string;
      matchType: "PHRASE" | "EXACT";
      terms: string[];
    }
  | {
      op: "REVIEW_KEYWORD_QUALITY";
      adGroupId: string;
      criterionId: string;
      keyword: string;
      matchType: string;
      qualityScore: number | null;
    }
  | {
      op: "CHANGE_MATCH_TYPE_OR_PAUSE";
      adGroupId: string;
      criterionId: string;
      keyword: string;
      fromMatchType: string;
      toMatchType: "PHRASE";
    }
  | {
      op: "ADD_EXACT_KEYWORD";
      adGroupId: string;
      keyword: string;
      matchType: "EXACT";
    }
  | {
      op: "ADJUST_CAMPAIGN_BIDDING";
      campaignId: string;
      currentBidding: string;
      suggestedTargetCpa: number;
    }
  | {
      op: "PAUSE_OR_RESTRUCTURE_CAMPAIGN";
      campaignId: string;
    };

export interface RecommendationInput {
  range: DateRange;
  campaigns: CampaignSummary[];
  keywords: KeywordSummary[];
  searchTerms: SearchTermSummary[];
}

const round = (n: number) => Math.round(n);

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function buildRecommendations(input: RecommendationInput): Recommendation[] {
  const { range, campaigns, keywords, searchTerms } = input;
  const f = monthlyFactor(range);
  const days = Math.round(30 / f);
  const out: Recommendation[] = [];

  // Track waste already attributed at term level so campaign-level rules do not double count.
  const attributedWasteByCampaign = new Map<string, number>();

  // ── 1. Search terms with spend and zero conversions → negative keywords (per campaign) ──
  const byCampaign = new Map<string, SearchTermSummary[]>();
  for (const t of searchTerms) {
    if (t.status === "EXCLUDED" || t.status === "ADDED_EXCLUDED") continue;
    if (t.status === "ADDED") continue; // it is a keyword we chose; handled by keyword rules
    if (t.conversions > 0) continue;
    if (t.spend < CONFIG.negativeMinSpend || t.clicks < CONFIG.negativeMinClicks) continue;
    const list = byCampaign.get(t.campaignId) ?? [];
    list.push(t);
    byCampaign.set(t.campaignId, list);
  }
  for (const [campaignId, terms] of byCampaign) {
    terms.sort((a, b) => b.spend - a.spend);
    const rangeSpend = terms.reduce((s, t) => s + t.spend, 0);
    attributedWasteByCampaign.set(campaignId, rangeSpend);
    const c = terms[0];
    // Collapse duplicate terms that hit through more than one ad group.
    const uniqueTerms = Array.from(new Set(terms.map((t) => t.term)));
    out.push({
      id: `neg-${campaignId}`,
      type: "NEGATIVE_KEYWORDS",
      kind: "waste",
      title: `${uniqueTerms.length} search term${uniqueTerms.length === 1 ? "" : "s"} with spend and zero conversions`,
      issue: `${uniqueTerms.length} search terms in "${c.campaignName}" spent ${usd(rangeSpend)} over ${days} days and produced no conversions. Most are job seekers, students, software shoppers, or buyers, not owners looking for a consultant.`,
      fix: `Add them as campaign-level negative keywords (phrase match) so the budget goes back to the terms that convert.`,
      monthlyDollars: round(rangeSpend * f),
      campaignId,
      campaignName: c.campaignName,
      evidence: terms.map((t) => ({
        term: t.term,
        spend: t.spend,
        clicks: t.clicks,
        conversions: t.conversions,
        matchedKeyword: t.matchedKeyword,
      })),
      action: { op: "ADD_NEGATIVE_KEYWORDS", level: "CAMPAIGN", campaignId, matchType: "PHRASE", terms: uniqueTerms },
      basis: { rangeSpend, rangeConversions: 0, days },
    });
  }

  // ── 2. Broad match keywords bleeding with no conversions ──
  const broadHandled = new Set<string>();
  for (const k of keywords) {
    if (k.matchType !== "BROAD") continue;
    if (k.conversions > 0 || k.spend < CONFIG.broadMinSpend) continue;
    // Subtract term-level waste already counted for this campaign to avoid double counting.
    const already = attributedWasteByCampaign.get(k.campaignId) ?? 0;
    const termsViaKeyword = searchTerms.filter(
      (t) => t.campaignId === k.campaignId && t.matchedKeyword === k.text && t.matchedMatchType === "BROAD" && t.conversions === 0 && t.status !== "EXCLUDED",
    );
    const overlap = Math.min(already, termsViaKeyword.reduce((s, t) => s + t.spend, 0));
    const rangeSpend = Math.max(0, k.spend - overlap);
    if (rangeSpend < CONFIG.negativeMinSpend) continue; // its waste is already counted under the negatives
    broadHandled.add(k.criterionId);
    out.push({
      id: `broad-${k.criterionId}`,
      type: "BROAD_MATCH_WASTE",
      kind: "waste",
      title: `Broad match "${k.text}" has no conversions`,
      issue: `The broad match keyword "${k.text}" in "${k.adGroupName}" spent ${usd(k.spend)} over ${days} days with ${k.clicks} clicks and zero conversions. Broad match lets Google decide what counts as related; here it is deciding wrong.`,
      fix: `Change the keyword to phrase match, or pause it and rely on the exact and phrase versions already in the ad group.`,
      monthlyDollars: round(rangeSpend * f),
      campaignId: k.campaignId,
      campaignName: k.campaignName,
      adGroupId: k.adGroupId,
      adGroupName: k.adGroupName,
      evidence: termsViaKeyword.map((t) => ({ term: t.term, spend: t.spend, clicks: t.clicks, conversions: t.conversions })),
      action: {
        op: "CHANGE_MATCH_TYPE_OR_PAUSE",
        adGroupId: k.adGroupId,
        criterionId: k.criterionId,
        keyword: k.text,
        fromMatchType: k.matchType,
        toMatchType: "PHRASE",
      },
      basis: { rangeSpend, rangeConversions: 0, days },
    });
  }

  // ── 3. Low Quality Score with meaningful spend ──
  for (const k of keywords) {
    if (k.qualityScore === null || k.qualityScore > CONFIG.lowQualityScore) continue;
    if (k.spend < CONFIG.lowQsMinSpend) continue;
    if (broadHandled.has(k.criterionId)) continue; // rule 2 already covers it
    const rangeSpend = k.spend * CONFIG.lowQsRecoverableShare;
    out.push({
      id: `qs-${k.criterionId}`,
      type: "LOW_QUALITY_SCORE",
      kind: "waste",
      title: `Quality Score ${k.qualityScore}/10 on "${k.text}"`,
      issue: `"${k.text}" (${k.matchType.toLowerCase()}) spent ${usd(k.spend)} over ${days} days at Quality Score ${k.qualityScore}. Low Quality Score raises the price of every click; Google is charging a premium because the ad or landing page does not match the search.`,
      fix: `Point this keyword at a landing page whose H1 matches the term and rewrite the responsive search ad headlines to include it. Estimated at ${Math.round(CONFIG.lowQsRecoverableShare * 100)}% of spend, the CPC discount typically seen when Quality Score moves from 3 or 4 to 6 or 7.`,
      monthlyDollars: round(rangeSpend * f),
      campaignId: k.campaignId,
      campaignName: k.campaignName,
      adGroupId: k.adGroupId,
      adGroupName: k.adGroupName,
      evidence: [{ term: k.text, spend: k.spend, clicks: k.clicks, conversions: k.conversions }],
      action: {
        op: "REVIEW_KEYWORD_QUALITY",
        adGroupId: k.adGroupId,
        criterionId: k.criterionId,
        keyword: k.text,
        matchType: k.matchType,
        qualityScore: k.qualityScore,
      },
      basis: { rangeSpend, rangeConversions: k.conversions, days },
    });
  }

  // ── 4. Converting search terms not yet added as keywords (opportunity) ──
  for (const t of searchTerms) {
    if (t.status !== "NONE") continue;
    if (t.conversions < CONFIG.addKeywordMinConversions) continue;
    const monthlyValue = t.conversionsValue * f;
    out.push({
      id: `add-${slug(t.term)}-${t.adGroupId}`,
      type: "ADD_CONVERTING_TERM",
      kind: "opportunity",
      title: `"${t.term}" converts but is not a keyword`,
      issue: `The search "${t.term}" produced ${t.conversions} conversion${t.conversions === 1 ? "" : "s"} on ${usd(t.spend)} in "${t.adGroupName}" while matching through "${t.matchedKeyword ?? "a broader keyword"}". Google is only showing your ad for it when it feels like it.`,
      fix: `Add it as an exact match keyword in the same ad group so it gets its own bid and its own Quality Score, and consider a headline that uses the phrase.`,
      monthlyDollars: round(monthlyValue),
      campaignId: t.campaignId,
      campaignName: t.campaignName,
      adGroupId: t.adGroupId,
      adGroupName: t.adGroupName,
      evidence: [{ term: t.term, spend: t.spend, clicks: t.clicks, conversions: t.conversions, matchedKeyword: t.matchedKeyword }],
      action: { op: "ADD_EXACT_KEYWORD", adGroupId: t.adGroupId, keyword: t.term, matchType: "EXACT" },
      basis: { rangeSpend: t.spend, rangeConversions: t.conversions, days },
    });
  }

  // ── 5. Campaign-level CPA and no-conversion checks ──
  for (const c of campaigns) {
    if (c.status !== "ENABLED") continue;
    const already = attributedWasteByCampaign.get(c.id) ?? 0;

    if (c.conversions === 0) {
      const rangeSpend = Math.max(0, c.spend - already);
      if (c.spend < CONFIG.zeroConvMinSpend || rangeSpend < CONFIG.negativeMinSpend) continue;
      out.push({
        id: `noconv-${c.id}`,
        type: "CAMPAIGN_NO_CONVERSIONS",
        kind: "waste",
        title: `"${c.name}" has spent ${usd(c.spend)} with no conversions`,
        issue: `${c.clicks} clicks over ${days} days and nobody filled out the form. Either the keyword theme attracts the wrong searcher or the landing page does not match what they searched. The negative keyword recommendation covers ${usd(already)} of this; the rest is the theme itself.`,
        fix: `Pause the campaign, or cut the daily budget in half and route it to a landing page whose headline matches the keyword theme. Revisit after 30 days of clean data.`,
        monthlyDollars: round(rangeSpend * f),
        campaignId: c.id,
        campaignName: c.name,
        evidence: [],
        action: { op: "PAUSE_OR_RESTRUCTURE_CAMPAIGN", campaignId: c.id },
        basis: { rangeSpend, rangeConversions: 0, days },
      });
      continue;
    }

    const cpa = c.costPerConversion ?? 0;
    if (cpa > CONFIG.targetCostPerConversion * CONFIG.cpaMultiple) {
      const excess = c.spend - c.conversions * CONFIG.targetCostPerConversion;
      const rangeSpend = Math.max(0, excess - already);
      if (rangeSpend < CONFIG.negativeMinSpend) continue;
      out.push({
        id: `cpa-${c.id}`,
        type: "CAMPAIGN_CPA",
        kind: "waste",
        title: `Cost per conversion ${usd(cpa)} in "${c.name}"`,
        issue: `Target is ${usd(CONFIG.targetCostPerConversion)}. Over ${days} days the campaign paid ${usd(excess)} more than target for its ${c.conversions} conversions${already > 0 ? `, of which ${usd(already)} is already covered by the negative keyword recommendation` : ""}.`,
        fix: `Move the campaign to Target CPA bidding at ${usd(CONFIG.targetCostPerConversion)} once it has at least 15 conversions in 30 days; until then, lower manual bids on the ad groups that are not converting.`,
        monthlyDollars: round(rangeSpend * f),
        campaignId: c.id,
        campaignName: c.name,
        evidence: [],
        action: {
          op: "ADJUST_CAMPAIGN_BIDDING",
          campaignId: c.id,
          currentBidding: c.bidding,
          suggestedTargetCpa: CONFIG.targetCostPerConversion,
        },
        basis: { rangeSpend, rangeConversions: c.conversions, days },
      });
    }
  }

  return out.filter((r) => r.monthlyDollars > 0).sort((a, b) => b.monthlyDollars - a.monthlyDollars);
}

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}
