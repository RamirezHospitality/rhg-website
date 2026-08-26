/*
 * Ramirez Hospitality Group — "Copy for Claude" prompt builder
 *
 * Produces a plain-text prompt describing ONE recommendation and the change to
 * make, for pasting into a local Claude Code session that holds the Google Ads
 * API credentials. This dashboard never calls an AI service and never holds
 * credentials; the prompt is the only thing that leaves the page.
 *
 * Every prompt insists on validate_only first and an explicit go-ahead before
 * any mutation, because a mutation to a live ads account spends money.
 */

import type { Recommendation, RecommendationAction } from "./recommendations";

export interface PromptContext {
  /** Display customer id. The mock passes a placeholder; the live source passes the real one. */
  customerId: string;
  range: { start: string; end: string };
  isMock: boolean;
}

const usd = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

function actionBlock(a: RecommendationAction, cid: string): string {
  switch (a.op) {
    case "ADD_NEGATIVE_KEYWORDS":
      return [
        `Change to make: add ${a.terms.length} campaign-level negative keyword${a.terms.length === 1 ? "" : "s"} (match type ${a.matchType}).`,
        `Service: CampaignCriterionService.MutateCampaignCriteria`,
        `Resource: customers/${cid}/campaigns/${a.campaignId}`,
        `For each term below create a CampaignCriterion with negative=true and keyword {text, match_type=${a.matchType}}.`,
        ``,
        `Terms:`,
        ...a.terms.map((t) => `  - "${t}"`),
      ].join("\n");
    case "CHANGE_MATCH_TYPE_OR_PAUSE":
      return [
        `Change to make: stop the broad match keyword from spending.`,
        `Option A (preferred): create a new ad_group_criterion with keyword {text="${a.keyword}", match_type=${a.toMatchType}} in ad group customers/${cid}/adGroups/${a.adGroupId}, then set the existing criterion to PAUSED.`,
        `Option B: only pause the existing criterion if a ${a.toMatchType.toLowerCase()} or exact version of the same text already exists in the ad group.`,
        `Service: AdGroupCriterionService.MutateAdGroupCriteria`,
        `Existing criterion: customers/${cid}/adGroupCriteria/${a.adGroupId}~${a.criterionId} (currently ${a.fromMatchType})`,
        `Note: match type cannot be edited in place in the Google Ads API; it is a create + pause.`,
      ].join("\n");
    case "REVIEW_KEYWORD_QUALITY":
      return [
        `Change to make: this is a message-match fix, not a bid change.`,
        `1. Query ad_group_ad for ad group customers/${cid}/adGroups/${a.adGroupId} and show me the current responsive search ad headlines and final URL.`,
        `2. Propose headline edits that include "${a.keyword}" verbatim, and confirm the final URL points at a page whose H1 contains the phrase (the /lp/ pages on ramirezhospitality.com are built for this).`,
        `3. Query quality_info history for criterion customers/${cid}/adGroupCriteria/${a.adGroupId}~${a.criterionId} (current Quality Score: ${a.qualityScore ?? "n/a"}) so we can measure the change in 14 days.`,
        `Do not change bids as part of this.`,
      ].join("\n");
    case "ADD_EXACT_KEYWORD":
      return [
        `Change to make: add "${a.keyword}" as an ${a.matchType} match keyword.`,
        `Service: AdGroupCriterionService.MutateAdGroupCriteria`,
        `Ad group: customers/${cid}/adGroups/${a.adGroupId}`,
        `Create an AdGroupCriterion with status=ENABLED and keyword {text="${a.keyword}", match_type=${a.matchType}}. Leave the bid to the campaign strategy unless the campaign is on manual CPC, in which case propose a bid based on the ad group's current average CPC.`,
      ].join("\n");
    case "ADJUST_CAMPAIGN_BIDDING":
      return [
        `Change to make: bring cost per conversion down toward the target.`,
        `Campaign: customers/${cid}/campaigns/${a.campaignId} (current bidding: ${a.currentBidding})`,
        `1. Query the campaign's conversions for the last 30 days. If it has 15 or more, propose switching to TARGET_CPA with target_cpa_micros = ${a.suggestedTargetCpa * 1_000_000} via CampaignService.MutateCampaigns.`,
        `2. If it has fewer than 15, do not change the strategy. Instead list ad groups by cost per conversion and propose bid reductions on the ones with zero conversions.`,
      ].join("\n");
    case "PAUSE_OR_RESTRUCTURE_CAMPAIGN":
      return [
        `Change to make: decide between pausing and restructuring.`,
        `Campaign: customers/${cid}/campaigns/${a.campaignId}`,
        `1. Show me the search terms and keywords for this campaign over the last 90 days with cost and conversions.`,
        `2. If nothing in 90 days converted, propose setting campaign status to PAUSED via CampaignService.MutateCampaigns.`,
        `3. If some terms converted, propose the negative keywords and a budget reduction instead, and show me both options with numbers.`,
      ].join("\n");
  }
}

export function buildClaudePrompt(rec: Recommendation, ctx: PromptContext): string {
  const cid = ctx.isMock ? "{CUSTOMER_ID}" : ctx.customerId.replace(/-/g, "");
  const lines: string[] = [];

  lines.push(
    `You are working in my local Claude Code session that has Google Ads API access for Ramirez Hospitality Group (customer ID ${cid}). This request comes from my ads dashboard. Do not mutate anything until I say "go". Show me the exact operations first and run them with validate_only=true before asking for the go-ahead.`,
  );
  if (ctx.isMock) {
    lines.push(
      `NOTE: the dashboard is on MOCK data while the developer token is in review. Treat the campaign and ad group IDs below as illustrative. Re-query the account for the real IDs and numbers before proposing anything.`,
    );
  }
  lines.push(``);
  lines.push(`Recommendation: ${rec.title}`);
  lines.push(`Type: ${rec.type} (${rec.kind})`);
  lines.push(`Campaign: "${rec.campaignName}" (id ${rec.campaignId})`);
  if (rec.adGroupName) lines.push(`Ad group: "${rec.adGroupName}" (id ${rec.adGroupId})`);
  lines.push(`Date range analyzed: ${ctx.range.start} to ${ctx.range.end} (${rec.basis.days} days)`);
  lines.push(
    `${rec.kind === "waste" ? "Estimated monthly savings" : "Estimated monthly value"}: ${usd(rec.monthlyDollars)} (in-range spend ${usd(rec.basis.rangeSpend)}, conversions ${rec.basis.rangeConversions})`,
  );
  lines.push(``);
  lines.push(`Why: ${rec.issue}`);
  lines.push(`Suggested fix: ${rec.fix}`);

  if (rec.evidence.length > 0) {
    lines.push(``);
    lines.push(`Evidence (search term, spend, clicks, conversions${rec.evidence.some((e) => e.matchedKeyword) ? ", matched keyword" : ""}):`);
    for (const e of rec.evidence) {
      lines.push(
        `  - "${e.term}"  ${usd(e.spend)}  ${e.clicks} clicks  ${e.conversions} conv${e.matchedKeyword ? `  via "${e.matchedKeyword}"` : ""}`,
      );
    }
  }

  lines.push(``);
  lines.push(actionBlock(rec.action, cid));
  lines.push(``);
  lines.push(`Before mutating:`);
  lines.push(`1. Re-query the relevant resource for the last 90 days and confirm the numbers above still hold (a term that converted outside this window should not be excluded).`);
  lines.push(`2. Check for conflicts with existing keywords and negatives across the account (shared negative lists included).`);
  lines.push(`3. Run the mutate with validate_only=true, show me the request and the response, then wait for my "go".`);
  lines.push(`4. After the real mutate, print the resource names created or changed so I can paste them back into my notes.`);

  return lines.join("\n");
}

/** Clipboard write with a fallback for browsers that block the async API outside HTTPS. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
