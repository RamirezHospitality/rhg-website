/*
 * Ramirez Hospitality Group — Google Ads API types
 *
 * These mirror the Google Ads REST API `searchStream` response shape
 * (camelCase JSON, int64 fields serialized as strings, enums as string names)
 * for the four resources the dashboard reads:
 *   campaign, ad_group, keyword_view, search_term_view
 *
 * Reference: https://developers.google.com/google-ads/api/rest/reference/rest
 * The gRPC/Python client returns the same fields in snake_case; if the live
 * data source is written in Python, convert keys once at the boundary.
 *
 * Only fields the dashboard uses are declared. Add fields here as the live
 * queries grow; the UI never reads anything not declared in this file.
 */

// ─── Enums (string names exactly as the REST API returns them) ─────────────

export type CampaignStatus = "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED";
export type AdGroupStatus = "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED";
export type AdGroupCriterionStatus = "UNSPECIFIED" | "UNKNOWN" | "ENABLED" | "PAUSED" | "REMOVED";

export type AdvertisingChannelType =
  | "UNSPECIFIED"
  | "UNKNOWN"
  | "SEARCH"
  | "DISPLAY"
  | "SHOPPING"
  | "HOTEL"
  | "VIDEO"
  | "MULTI_CHANNEL"
  | "LOCAL"
  | "SMART"
  | "PERFORMANCE_MAX"
  | "LOCAL_SERVICES"
  | "TRAVEL"
  | "DEMAND_GEN";

export type BiddingStrategyType =
  | "UNSPECIFIED"
  | "UNKNOWN"
  | "MANUAL_CPC"
  | "MAXIMIZE_CONVERSIONS"
  | "MAXIMIZE_CONVERSION_VALUE"
  | "TARGET_CPA"
  | "TARGET_ROAS"
  | "TARGET_SPEND"
  | "TARGET_IMPRESSION_SHARE";

export type KeywordMatchType = "UNSPECIFIED" | "UNKNOWN" | "EXACT" | "PHRASE" | "BROAD";

/** search_term_view.status */
export type SearchTermTargetingStatus =
  | "UNSPECIFIED"
  | "UNKNOWN"
  | "ADDED"
  | "EXCLUDED"
  | "ADDED_EXCLUDED"
  | "NONE";

export type QualityScoreBucket = "UNSPECIFIED" | "UNKNOWN" | "BELOW_AVERAGE" | "AVERAGE" | "ABOVE_AVERAGE";

// ─── Resources ─────────────────────────────────────────────────────────────

export interface Campaign {
  /** customers/{cid}/campaigns/{id} */
  resourceName: string;
  /** int64 as string */
  id: string;
  name: string;
  status: CampaignStatus;
  advertisingChannelType: AdvertisingChannelType;
  biddingStrategyType?: BiddingStrategyType;
  /** customers/{cid}/campaignBudgets/{id} */
  campaignBudget?: string;
  startDate?: string;
  endDate?: string;
}

export interface CampaignBudget {
  resourceName: string;
  /** Daily budget in micros (1,000,000 micros = 1 USD), int64 as string */
  amountMicros: string;
}

export interface AdGroup {
  /** customers/{cid}/adGroups/{id} */
  resourceName: string;
  id: string;
  name: string;
  status: AdGroupStatus;
  /** customers/{cid}/campaigns/{id} */
  campaign: string;
  cpcBidMicros?: string;
}

export interface KeywordInfo {
  text: string;
  matchType: KeywordMatchType;
}

export interface QualityInfo {
  /** 1 to 10. Absent when Google has not computed one yet. */
  qualityScore?: number;
  creativeQualityScore?: QualityScoreBucket;
  postClickQualityScore?: QualityScoreBucket;
  searchPredictedCtr?: QualityScoreBucket;
}

export interface AdGroupCriterion {
  /** customers/{cid}/adGroupCriteria/{adGroupId}~{criterionId} */
  resourceName: string;
  criterionId: string;
  status: AdGroupCriterionStatus;
  negative?: boolean;
  keyword?: KeywordInfo;
  qualityInfo?: QualityInfo;
  cpcBidMicros?: string;
}

export interface KeywordView {
  /** customers/{cid}/keywordViews/{adGroupId}~{criterionId} */
  resourceName: string;
}

export interface SearchTermView {
  /** customers/{cid}/searchTermViews/{campaignId}~{adGroupId}~{base64Term} */
  resourceName: string;
  searchTerm: string;
  status: SearchTermTargetingStatus;
  /** customers/{cid}/adGroups/{id} */
  adGroup: string;
}

// ─── Metrics and segments ──────────────────────────────────────────────────

export interface Metrics {
  /** int64 as string */
  impressions?: string;
  /** int64 as string */
  clicks?: string;
  /** int64 as string, micros */
  costMicros?: string;
  /** double */
  conversions?: number;
  /** double, in account currency */
  conversionsValue?: number;
  allConversions?: number;
  /** double, 0 to 1 */
  ctr?: number;
  /** double, micros */
  averageCpc?: number;
  /** double, in account currency */
  costPerConversion?: number;
  /** double, 0 to 1. Only populated on campaign and ad group queries. */
  searchImpressionShare?: number;
  searchBudgetLostImpressionShare?: number;
  searchRankLostImpressionShare?: number;
}

export interface Segments {
  /** YYYY-MM-DD */
  date?: string;
  keyword?: {
    /** customers/{cid}/adGroupCriteria/{adGroupId}~{criterionId} */
    adGroupCriterion: string;
    info: KeywordInfo;
  };
}

// ─── Rows ──────────────────────────────────────────────────────────────────

/**
 * One row of a searchStream result. Only the fields named in the GAQL SELECT
 * are present, so every resource is Partial here; the per-query row types
 * below narrow to what their query actually selects.
 */
export interface GoogleAdsRow {
  campaign?: Partial<Campaign>;
  campaignBudget?: Partial<CampaignBudget>;
  adGroup?: Partial<AdGroup>;
  adGroupCriterion?: Partial<AdGroupCriterion>;
  keywordView?: Partial<KeywordView>;
  searchTermView?: Partial<SearchTermView>;
  metrics?: Metrics;
  segments?: Segments;
}

/** Row shape for `SELECT campaign.*, campaign_budget.amount_micros, metrics.* FROM campaign` */
export interface CampaignRow extends GoogleAdsRow {
  campaign: Campaign;
  campaignBudget?: CampaignBudget;
  metrics: Metrics;
}

/** Row shape for `SELECT ad_group.*, campaign.id, campaign.name, metrics.* FROM ad_group` */
export interface AdGroupRow extends GoogleAdsRow {
  adGroup: AdGroup;
  campaign: Pick<Campaign, "resourceName" | "id" | "name">;
  metrics: Metrics;
}

/** Row shape for `SELECT ad_group_criterion.*, ad_group.*, campaign.*, metrics.* FROM keyword_view` */
export interface KeywordRow extends GoogleAdsRow {
  keywordView: KeywordView;
  adGroupCriterion: AdGroupCriterion & { keyword: KeywordInfo };
  adGroup: Pick<AdGroup, "resourceName" | "id" | "name">;
  campaign: Pick<Campaign, "resourceName" | "id" | "name">;
  metrics: Metrics;
}

/** Row shape for `SELECT search_term_view.*, segments.keyword.info, ad_group.*, campaign.*, metrics.* FROM search_term_view` */
export interface SearchTermRow extends GoogleAdsRow {
  searchTermView: SearchTermView;
  adGroup: Pick<AdGroup, "resourceName" | "id" | "name">;
  campaign: Pick<Campaign, "resourceName" | "id" | "name">;
  metrics: Metrics;
  segments?: Segments;
}

/** searchStream returns an array of these chunks; the live source concatenates `results`. */
export interface SearchGoogleAdsStreamResponse {
  results: GoogleAdsRow[];
  fieldMask?: string;
  requestId?: string;
}
