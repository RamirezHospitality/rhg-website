/*
 * Ramirez Hospitality Group — Ads data source contract
 *
 * The dashboard components talk ONLY to this interface. Today the single
 * implementation is the mock in ./mock.ts. When the Google Ads API developer
 * token is approved, add a live implementation that runs the GAQL below
 * through an authenticated backend and returns the same row shapes, then
 * change getAdsDataSource() to return it. No component changes.
 *
 * The dashboard must never hold Google Ads credentials. A live source should
 * call a server endpoint (for example a Pages Function behind the same
 * Basic Auth gate) that holds the refresh token as a Cloudflare secret.
 */

import type { AdGroupRow, CampaignRow, KeywordRow, SearchTermRow } from "./types";

/** Inclusive date range in YYYY-MM-DD, account time zone. */
export interface DateRange {
  start: string;
  end: string;
}

export interface AdsDataSource {
  /** Display form, e.g. "123-456-7890". Mock uses a placeholder. */
  readonly customerId: string;
  /** Shown in the dashboard header so nobody mistakes mock numbers for real ones. */
  readonly label: string;
  readonly isMock: boolean;
  campaigns(range: DateRange): Promise<CampaignRow[]>;
  adGroups(range: DateRange): Promise<AdGroupRow[]>;
  keywords(range: DateRange): Promise<KeywordRow[]>;
  searchTerms(range: DateRange): Promise<SearchTermRow[]>;
}

/**
 * The GAQL a live implementation should run. Kept next to the contract so the
 * types above and the queries stay in one place.
 */
export const GAQL = {
  campaigns: (r: DateRange) => `
    SELECT
      campaign.resource_name, campaign.id, campaign.name, campaign.status,
      campaign.advertising_channel_type, campaign.bidding_strategy_type,
      campaign.campaign_budget, campaign_budget.amount_micros,
      metrics.impressions, metrics.clicks, metrics.cost_micros,
      metrics.conversions, metrics.conversions_value, metrics.ctr,
      metrics.average_cpc, metrics.search_impression_share,
      metrics.search_budget_lost_impression_share
    FROM campaign
    WHERE campaign.status != 'REMOVED'
      AND segments.date BETWEEN '${r.start}' AND '${r.end}'
    ORDER BY metrics.cost_micros DESC`,

  adGroups: (r: DateRange) => `
    SELECT
      ad_group.resource_name, ad_group.id, ad_group.name, ad_group.status,
      ad_group.campaign, campaign.id, campaign.name,
      metrics.impressions, metrics.clicks, metrics.cost_micros,
      metrics.conversions, metrics.conversions_value
    FROM ad_group
    WHERE ad_group.status != 'REMOVED'
      AND segments.date BETWEEN '${r.start}' AND '${r.end}'`,

  keywords: (r: DateRange) => `
    SELECT
      keyword_view.resource_name,
      ad_group_criterion.resource_name, ad_group_criterion.criterion_id,
      ad_group_criterion.status, ad_group_criterion.negative,
      ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type,
      ad_group_criterion.quality_info.quality_score,
      ad_group_criterion.quality_info.creative_quality_score,
      ad_group_criterion.quality_info.post_click_quality_score,
      ad_group_criterion.quality_info.search_predicted_ctr,
      ad_group.id, ad_group.name, campaign.id, campaign.name,
      metrics.impressions, metrics.clicks, metrics.cost_micros,
      metrics.conversions, metrics.conversions_value
    FROM keyword_view
    WHERE ad_group_criterion.status != 'REMOVED'
      AND segments.date BETWEEN '${r.start}' AND '${r.end}'`,

  searchTerms: (r: DateRange) => `
    SELECT
      search_term_view.resource_name, search_term_view.search_term,
      search_term_view.status, search_term_view.ad_group,
      segments.keyword.ad_group_criterion, segments.keyword.info.text,
      segments.keyword.info.match_type,
      ad_group.id, ad_group.name, campaign.id, campaign.name,
      metrics.impressions, metrics.clicks, metrics.cost_micros,
      metrics.conversions, metrics.conversions_value
    FROM search_term_view
    WHERE segments.date BETWEEN '${r.start}' AND '${r.end}'
    ORDER BY metrics.cost_micros DESC`,
} as const;

let cached: AdsDataSource | null = null;

/** The one place that decides which implementation the dashboard uses. */
export async function getAdsDataSource(): Promise<AdsDataSource> {
  if (cached) return cached;
  // Swap this import for the live source when the developer token is approved.
  const { MockAdsDataSource } = await import("./mock");
  cached = new MockAdsDataSource();
  return cached;
}
