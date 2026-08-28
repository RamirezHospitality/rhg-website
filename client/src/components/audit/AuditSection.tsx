/*
 * Ramirez Hospitality Group — The Modern Hotel Audit (signature product)
 *
 * The Lincoln, Marfa case study spine. This block is identical wherever it
 * appears — the Google Ads landing page and the homepage both render this
 * component so the audit's numbers and copy can never drift between pages.
 * The Lincoln's owners signed a marketing release; every other property
 * referenced (the rate ladder) stays anonymized by category, per that release.
 *
 * All figures here are the real, timestamped findings from that audit. They
 * are hardcoded rather than data-driven on purpose: this is one specific,
 * evidence-backed case, not a template to be re-populated per property.
 */

import { Eyebrow } from "@/components/Eyebrow";

interface Dimension {
  label: string;
  weight: string;
  score: number;
  grade: string;
  tone: "good" | "mid" | "bad";
}

const DIMENSIONS: Dimension[] = [
  { label: "Reputation and rate-worthiness", weight: "10%", score: 90, grade: "A", tone: "good" },
  { label: "Direct booking engine", weight: "15%", score: 70, grade: "B−", tone: "mid" },
  { label: "Distribution and channel health", weight: "15%", score: 60, grade: "C", tone: "mid" },
  { label: "Technology and automation", weight: "10%", score: 60, grade: "C", tone: "mid" },
  { label: "Demand capture", weight: "15%", score: 20, grade: "F", tone: "bad" },
  { label: "Pricing and rate strategy", weight: "25%", score: 10, grade: "F", tone: "bad" },
  { label: "Whole-property yield", weight: "10%", score: 10, grade: "F", tone: "bad" },
];

const TONE_COLOR: Record<Dimension["tone"], string> = {
  good: "var(--emerald-glimmer)",
  mid: "var(--brass)",
  bad: "var(--destructive)",
};

interface ReviewTheme {
  label: string;
  count: number;
  cream?: boolean;
}

const REVIEW_THEMES: ReviewTheme[] = [
  { label: "Location", count: 19 },
  { label: "Design", count: 15 },
  { label: "Quiet", count: 14 },
  { label: "Cleanliness", count: 11 },
  { label: "Check-in", count: 6 },
  { label: "Price", count: 1, cream: true },
];
const REVIEW_MAX = 19;

interface RateRow {
  label: string;
  price: number;
  highlight?: "mid" | "own";
}

const RATE_LADDER: RateRow[] = [
  { label: "Full-service hotel", price: 330 },
  { label: "Boutique motel", price: 296 },
  { label: "The Lincoln on Expedia", price: 223, highlight: "mid" },
  { label: "The Lincoln, own site", price: 164, highlight: "own" },
  { label: "Design boutique", price: 148 },
  { label: "2.5-star motel", price: 131 },
];
const RATE_MAX = 330;

const OPPORTUNITY_SEGMENTS = [
  { label: "Rate normalization", amount: 53, opacity: 1 },
  { label: "Booking.com", amount: 18, opacity: 0.8 },
  { label: "Events", amount: 15, opacity: 0.62 },
  { label: "Buyouts", amount: 12, opacity: 0.46 },
  { label: "Min-stay", amount: 10, opacity: 0.32 },
  { label: "Pet fee", amount: 8, opacity: 0.2 },
];

const HOW_IT_RUNS = [
  {
    n: "01",
    t: "Intake",
    p: "A short questionnaire, your PMS exports, and a voice memo on what keeps you up at night.",
  },
  {
    n: "02",
    t: "Recon",
    p: "Rate shops, channel captures, and market data, all timestamped, none of it needing anything from you.",
  },
  {
    n: "03",
    t: "Score",
    p: "Thirty-five checkpoints, seven grades, one composite, dollars on every finding.",
  },
  {
    n: "04",
    t: "Deliver",
    p: "A scored dashboard and a written report, with the evidence behind every number.",
  },
];

const SCOPES = [
  {
    label: "Buying",
    p: "Feasibility and underwriting: what the property can earn before you sign.",
  },
  {
    label: "Opening",
    p: "Pro forma, rate architecture, and channels set before the first guest.",
  },
  {
    label: "Operating",
    p: "Where the revenue is leaking today, and the order to fix it in.",
  },
];

interface AuditSectionProps {
  /** Roman numeral shown in the section eyebrow — differs by page. */
  numeral?: string;
}

export function AuditSection({ numeral = "II" }: AuditSectionProps) {
  return (
    <section className="py-20 lg:py-28 panel-walnut grain border-y border-brass/15">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start mb-14">
          <div className="lg:col-span-7">
            <Eyebrow numeral={numeral} label="The Modern Hotel Audit" />
            <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] text-cream">
              One audit. The whole property,
              <br />
              <span className="italic text-brass">scored, and sized in dollars.</span>
            </h2>
            <p className="mt-6 leading-[1.7] max-w-xl text-cream/80">
              Every client starts here, whether they are buying a hotel, opening one, or
              running one. Seven dimensions, each scored against what a well-run independent
              of your size can actually do, each finding tied to a timestamped exhibit and an
              annual dollar figure. Free. No strings.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-px bg-brass/15 border border-brass/15 self-end">
            {SCOPES.map((s) => (
              <div key={s.label} className="bg-obsidian p-5">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2.5">
                  {s.label}
                </div>
                <p className="text-cream/75 text-[0.8125rem] leading-[1.6]">{s.p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Row 1: score dial + opportunity bar */}
        <div className="grid lg:grid-cols-12 gap-px bg-brass/15 border border-brass/15">
          <div className="lg:col-span-5 bg-obsidian p-8 lg:p-10 flex flex-col gap-5">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">
              Case: The Lincoln, Marfa, Texas · 2026
            </div>
            <div className="flex items-center gap-8">
              <svg
                width="200"
                height="120"
                viewBox="0 0 200 120"
                role="img"
                aria-label="Revenue Health Score 41 of 100, grade D"
                className="shrink-0"
              >
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="var(--brass)"
                  strokeOpacity={0.18}
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <path
                  d="M 20 100 A 80 80 0 0 1 84.6 23.5"
                  fill="none"
                  stroke="var(--brass)"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <text
                  x={100}
                  y={92}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontSize={52}
                  fill="var(--cream)"
                >
                  41
                </text>
                <text
                  x={100}
                  y={114}
                  textAnchor="middle"
                  fontFamily="var(--font-sans)"
                  fontSize={9}
                  letterSpacing={2.5}
                  fill="var(--cream)"
                  fillOpacity={0.55}
                >
                  REVENUE HEALTH SCORE
                </text>
              </svg>
              <div>
                <div className="inline-flex items-center gap-2.5 border border-brass/50 px-3.5 py-2">
                  <span className="font-display text-2xl leading-none text-brass">D</span>
                  <span className="text-[0.7rem] tracking-[0.18em] uppercase text-cream/55">
                    Systematic underperformance
                  </span>
                </div>
                <p className="mt-3.5 text-cream/75 text-[0.8125rem] leading-[1.6] max-w-[260px]">
                  A top-rated property with the revenue function missing. The most fixable
                  configuration there is.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-1 text-[0.62rem] tracking-[0.12em] uppercase">
              <div className="border-t-2 border-cream/25 pt-1.5 text-cream/45">F &lt;40</div>
              <div className="border-t-2 border-brass pt-1.5 text-brass">D 40&ndash;54</div>
              <div className="border-t-2 border-cream/25 pt-1.5 text-cream/45">C 55&ndash;69</div>
              <div className="border-t-2 border-cream/25 pt-1.5 text-cream/45">B 70&ndash;84</div>
              <div className="border-t-2 border-cream/25 pt-1.5 text-cream/45">A 85+</div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-obsidian p-8 lg:p-10 flex flex-col gap-5">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">
              Annual revenue opportunity identified
            </div>
            <div className="flex items-baseline gap-4 flex-wrap">
              <span className="font-display text-4xl lg:text-5xl leading-none text-cream">$110K</span>
              <span className="text-cream/55 text-sm">
                base case · $55K conservative · $185K stretch · on a $444K base
              </span>
            </div>
            <svg
              width="100%"
              height="64"
              viewBox="0 0 640 64"
              preserveAspectRatio="none"
              role="img"
              aria-label="Base revenue $444K, conservative case adds $55K, stretch case adds $185K"
            >
              <rect x={0} y={20} width={452} height={18} rx={4} fill="var(--cream)" fillOpacity={0.22} />
              <rect x={452} y={20} width={56} height={18} rx={4} fill="var(--brass)" />
              <rect x={508} y={20} width={56} height={18} rx={4} fill="var(--brass)" fillOpacity={0.65} />
              <rect x={564} y={20} width={76} height={18} rx={4} fill="var(--brass)" fillOpacity={0.3} />
            </svg>
            <div className="grid grid-cols-[452fr_56fr_56fr_76fr] text-[0.68rem] tracking-[0.08em] -mt-4">
              <div className="text-cream/55">Today · $444K</div>
              <div className="text-brass whitespace-nowrap">+12%</div>
              <div className="text-brass whitespace-nowrap">+25%</div>
              <div className="text-cream/75 text-right">+42%</div>
            </div>
            <p className="text-cream/75 text-[0.8125rem] leading-[1.6]">
              The owners asked for 10 to 15%. The conservative case alone reaches 12%, so the
              target is met before leaving the cautious math. Three cases per finding, nothing
              double-counted, every figure traced to a timestamped exhibit.
            </p>
            <div>
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2">
                Where the base case comes from
              </div>
              <div className="flex h-10 gap-0.5">
                {OPPORTUNITY_SEGMENTS.map((seg) => (
                  <div
                    key={seg.label}
                    className="flex items-center justify-center overflow-hidden whitespace-nowrap text-[0.6rem] font-semibold"
                    style={{
                      flex: `${seg.amount} 0 0`,
                      backgroundColor: "var(--brass)",
                      opacity: seg.opacity,
                      color: seg.opacity > 0.5 ? "var(--obsidian)" : "var(--cream)",
                    }}
                  >
                    {seg.label} ${seg.amount}K
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: seven dimensions + how it runs / free moves */}
        <div className="grid lg:grid-cols-12 gap-px bg-brass/15 border border-brass/15 border-t-0">
          <div className="lg:col-span-5 bg-obsidian p-8 lg:p-10">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-1.5">
              Seven dimensions, scored
            </div>
            <p className="text-cream/75 text-[0.8125rem] leading-[1.6] mb-5">
              An A for reputation, F&apos;s where the money is. Sorted best first, because the
              A is the point: the asset is excellent, the revenue function is missing.
            </p>
            <div className="flex flex-col gap-3">
              {DIMENSIONS.map((d) => (
                <div
                  key={d.label}
                  className="grid grid-cols-[1fr_100px_38px_28px] sm:grid-cols-[1fr_110px_44px_30px] items-center gap-3 text-[0.8125rem]"
                >
                  <span className="text-cream/75">
                    {d.label}
                    <span className="text-cream/45 text-[0.65rem] ml-2">{d.weight}</span>
                  </span>
                  <div className="h-1.5 bg-cream/10">
                    <div
                      className="h-1.5"
                      style={{ width: `${d.score}%`, backgroundColor: TONE_COLOR[d.tone] }}
                    />
                  </div>
                  <span className="text-cream/55 text-right tabular-nums">{d.score}</span>
                  <span
                    className="text-center font-display text-[0.95rem] leading-none py-1 border"
                    style={{ borderColor: TONE_COLOR[d.tone], color: TONE_COLOR[d.tone] }}
                  >
                    {d.grade}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-cream/45 text-[0.72rem] leading-[1.6]">
              Fixed weights on every property (pricing counts 25%). Every grade carries a
              confidence tag when the data is thin.
            </p>
          </div>

          <div className="lg:col-span-7 bg-obsidian p-8 lg:p-10 flex flex-col gap-7">
            <div>
              <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-5">
                How it runs
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {HOW_IT_RUNS.map((step) => (
                  <div key={step.n} className="border-t border-brass/40 pt-3.5">
                    <div className="font-display italic text-brass text-xl">{step.n}</div>
                    <div className="mt-2 font-display text-lg text-cream">{step.t}</div>
                    <p className="mt-1.5 text-cream/75 text-[0.78rem] leading-[1.6]">{step.p}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-1">
                  What 66 recent guests praised
                </div>
                <p className="text-cream/45 text-[0.72rem] mb-3.5">Review themes, The Lincoln</p>
                <div className="flex flex-col gap-2 text-[0.78rem]">
                  {REVIEW_THEMES.map((r) => (
                    <div
                      key={r.label}
                      className="grid grid-cols-[88px_1fr_22px] gap-2.5 items-center"
                    >
                      <span className={r.cream ? "text-cream" : "text-cream/75"}>{r.label}</span>
                      <div className="h-3 bg-brass/10">
                        <div
                          className="h-3"
                          style={{
                            width: `${(r.count / REVIEW_MAX) * 100}%`,
                            backgroundColor: r.cream ? "var(--destructive)" : "var(--brass)",
                          }}
                        />
                      </div>
                      <span className={`text-right ${r.cream ? "text-cream" : "text-cream/55"}`}>
                        {r.count}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-cream/75 text-[0.78rem] leading-[1.6]">
                  Price came up once. The guests do not think the hotel is cheap. Only the rate
                  sheet does.
                </p>
              </div>
              <div className="bg-background border border-brass/30 p-5">
                <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-2.5">
                  Two free moves, every audit
                </div>
                <p className="font-display text-xl leading-[1.4] text-cream">
                  The two <span className="italic text-brass">highest-value</span> quick wins,
                  given away in full. Not the two cheapest.
                </p>
                <p className="mt-2.5 text-cream/75 text-[0.78rem] leading-[1.6]">
                  For The Lincoln: reprice the dates that always sell out (New Year&apos;s Eve
                  was selling at $149; a $279 floor with a three-night minimum) and add the $35
                  pet fee the market&apos;s default pet hotel had never charged. Roughly $14K a
                  year, handed over before any signature.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: two-year chart + rate ladder */}
        <div className="grid sm:grid-cols-2 gap-px bg-brass/15 border border-brass/15 border-t-0">
          <div className="bg-obsidian p-6 lg:p-8">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-1">
              Two years, same revenue, opposite strategies
            </div>
            <p className="text-cream/45 text-[0.72rem] mb-4">The signature chart of the audit</p>
            <svg width="100%" height="220" viewBox="0 0 600 220" role="img" aria-label="Two fiscal years at $442K and $444K, from opposite rate and occupancy strategies">
              <rect x={90} y={52} width={150} height={143} rx={4} fill="var(--brass)" fillOpacity={0.55} />
              <rect x={360} y={50} width={150} height={145} rx={4} fill="var(--brass)" />
              <text x={165} y={42} textAnchor="middle" fontFamily="var(--font-display)" fontSize={22} fill="var(--cream)">$442K</text>
              <text x={435} y={40} textAnchor="middle" fontFamily="var(--font-display)" fontSize={22} fill="var(--cream)">$444K</text>
              <text x={165} y={212} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11} fill="var(--cream)" fillOpacity={0.7}>
                Sep 24 to Aug 25 · ADR $203 · Occ 49.8%
              </text>
              <text x={435} y={212} textAnchor="middle" fontFamily="var(--font-sans)" fontSize={11} fill="var(--cream)" fillOpacity={0.7}>
                Sep 25 to Aug 26 · ADR $181 · Occ 56.0%
              </text>
              <path d="M 245 100 Q 300 60 355 100" fill="none" stroke="var(--brass)" strokeWidth={1.5} strokeDasharray="4 4" />
              <text x={300} y={58} textAnchor="middle" fontFamily="var(--font-display)" fontStyle="italic" fontSize={12} fill="var(--brass)">
                rate down $22, occupancy up 6 points, revenue flat
              </text>
            </svg>
            <p className="mt-2 text-cream/75 text-[0.8125rem] leading-[1.6]">
              270 more room nights sold for the same revenue. More turnovers, more cleaning,
              more wear. Pricing by feel.
            </p>
          </div>
          <div className="bg-obsidian p-6 lg:p-8">
            <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-1">
              The Marfa rate ladder, same September weekend
            </div>
            <p className="text-cream/45 text-[0.72rem] mb-4">
              Live-shopped, screenshot-evidenced. Other properties anonymized.
            </p>
            <div className="flex flex-col gap-2.5 text-[0.8rem]">
              {RATE_LADDER.map((row) => (
                <div key={row.label} className="grid grid-cols-[150px_1fr_46px] sm:grid-cols-[170px_1fr_50px] gap-3 items-center">
                  <span className={row.highlight === "own" ? "text-cream" : "text-cream/75"}>
                    {row.label}
                  </span>
                  <div className="h-3.5 bg-brass/10">
                    <div
                      className="h-3.5"
                      style={{
                        width: `${(row.price / RATE_MAX) * 100}%`,
                        backgroundColor:
                          row.highlight === "own"
                            ? "var(--brass)"
                            : row.highlight === "mid"
                              ? "var(--brass)"
                              : "var(--cream)",
                        opacity: row.highlight === "own" ? 1 : row.highlight === "mid" ? 0.6 : 0.35,
                      }}
                    />
                  </div>
                  <span className={`text-right ${row.highlight === "own" ? "text-cream" : "text-cream/55"}`}>
                    ${row.price}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3.5 text-cream/75 text-[0.8125rem] leading-[1.6]">
              The best-reviewed hotel in town, priced beneath a 2.5-star motel, while its own
              guests pay $59 more a night for the same rooms on Expedia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
