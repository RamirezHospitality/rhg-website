/*
 * Ramirez Hospitality Group — The Reserve · LAUNCH DELIVERABLES
 * What an owner holds at the end of The Modern Hotel Launch, drawn from a
 * live opening engagement: a sample status board, and the real improvements
 * program, labor budget and city brief from a Plan delivered in September
 * 2026 for a 38-key conversion in the California desert, shared with the
 * owner's permission and without the property's name.
 */

import { Reveal } from "@/components/Reveal";

const BOARD = [
  { t: "Concept and positioning", s: "done" },
  { t: "Brand identity", s: "done" },
  { t: "Budget and year-one model", s: "done" },
  { t: "Systems selection and setup", s: "now" },
  { t: "Sales and distribution build", s: "now" },
  { t: "Hiring plan and org chart", s: "next" },
  { t: "Standards and training", s: "next" },
  { t: "Marketing launch", s: "" },
  { t: "Soft opening", s: "" },
  { t: "Public opening and handoff", s: "" },
] as const;

const IMPROVEMENTS: [string, string, string][] = [
  ["Main pool zone", "Deck, coping, equipment and chiller, loungers, cabanas, grill pergola, safety gates", "$250,000"],
  ["Spa courtyard and second pool", "Adults-only positioning", "$150,000"],
  ["Fountain refurbishment", "", "$50,000"],
  ["Landscape and trees", "Pool privacy hedging, planters, a palm allee, statement trees", "$50,000"],
  ["Exterior lighting and sconces", "Palm uplighting", "$40,000"],
  ["Gates, railings, exterior paint, unified unit doors", "", "$60,000"],
  ["Concrete and walkways", "Accessibility included", "$50,000"],
  ["Signage and a commissioned art walk", "", "$25,000"],
  ["Laundry room build-out", "Two commercial washers, two dryers, folding tables; serves the hotel and outside businesses", "$40,000"],
  ["Contingency, 10%", "", "$71,500"],
];

const LABOR: [string, string, string, string][] = [
  ["Guest experience agents", "2.5", "$22.00", "$143,000"],
  ["Housekeepers", "4.0", "$19.00", "$197,600"],
  ["Houseperson", "1.0", "$17.00", "$44,200"],
  ["Maintenance tech", "1.0", "$25.00", "$65,000"],
  ["General manager, oversight share", "1.0", "$45.00", "$117,000"],
  ["Night audit, remote answering service", "", "$1,500 a month", "$18,000"],
];

const SHELF = [
  { t: "The written opening plan", d: "The market, the concept, the positioning, the operating direction and the recommendation, in one document." },
  { t: "The live financial model", d: "Carried in from the Plan and kept current through opening. Every input sourced, graded and editable." },
  { t: "The opening budget and capital plan", d: "Line by line, in tiers, per key, with a confidence grade on every line and contingency on top." },
  { t: "The labor budget", d: "Every position, hours, wage and burden, sized for how the hotel will actually run." },
  { t: "The ancillary income model", d: "Every income stream beyond the room rate, priced from named local benchmarks." },
  { t: "The improvements program", d: "The capital plan from the on-property assessment, checked against local cost benchmarks." },
  { t: "The brief for the city", d: "What the property needs from planning, written before the meeting, so nothing is learned at the counter." },
  { t: "The status board", d: "Where the project is, what is being fine-tuned and what is next, updated as we go." },
  { t: "The site visit record", d: "Photographs, transcripts and findings from every walk of the property." },
  { t: "The review packet", d: "The numbers in six pages, for lenders, partners and buyers, with every assumption and its source on the last page." },
];

const SOURCE_NOTE = "From a Plan delivered in September 2026 for a 38-key conversion in the California desert, shared with the owner's permission and without the property's name.";

export function LaunchDeliverables() {
  const done = BOARD.filter((b) => b.s === "done").length;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-12 gap-8 lg:gap-10">
      {/* Status board */}
      <Reveal className="lg:col-span-5 min-w-0 border border-brass/30 bg-card p-6 lg:p-8">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">The status board</div>
          <div className="text-cream/55 text-xs tabular-nums">{done} of {BOARD.length} phases complete</div>
        </div>
        <div className="mt-3 h-1 bg-brass/15 rounded-sm overflow-hidden" aria-hidden="true">
          <div className="h-full bg-brass" style={{ width: `${(done / BOARD.length) * 100}%` }} />
        </div>
        <ol className="mt-6 space-y-2.5">
          {BOARD.map((b, i) => (
            <li key={b.t} className="flex items-center gap-3 text-sm">
              <span
                className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center text-[0.6rem] ${
                  b.s === "done"
                    ? "bg-brass border-brass text-obsidian"
                    : b.s === "now"
                      ? "border-brass text-brass"
                      : "border-brass/30 text-cream/40"
                }`}
                aria-hidden="true"
              >
                {b.s === "done" ? "✓" : i + 1}
              </span>
              <span className={b.s === "done" ? "text-cream/55 line-through decoration-brass/40" : b.s === "now" ? "text-cream" : "text-cream/60"}>
                {b.t}
              </span>
              {b.s === "now" && <span className="ml-auto text-[0.6rem] tracking-[0.2em] uppercase text-brass">In progress</span>}
              {b.s === "next" && <span className="ml-auto text-[0.6rem] tracking-[0.2em] uppercase text-cream/40">Next</span>}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-cream/45 text-xs leading-[1.6]">A sample board, mid-project. Yours reads the same way, on your phone, updated every week.</p>

        <div className="mt-8 pt-6 border-t border-brass/15">
          <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">The brief for the city</div>
          <p className="mt-3 text-cream/75 text-sm leading-[1.65]">
            Hotel use in this zone needs a conditional use permit. The city's pre-application review is the confirmed first step, so the conversion is planned at the same unit count, with no added keys assumed until the city says otherwise.
          </p>
          <p className="mt-3 text-cream/75 text-sm leading-[1.65]">
            Exterior work runs through design review. Millwork and furnishings ordered before January 1, 2027 avoid announced tariff increases of 30 to 50 percent.
          </p>
          <p className="mt-3 text-cream/45 text-xs leading-[1.6]">Two paragraphs from the brief written before the owner's first meeting with planning.</p>
        </div>
      </Reveal>

      {/* Improvements program + labor */}
      <div className="lg:col-span-7 min-w-0 grid grid-cols-[minmax(0,1fr)] gap-8 lg:gap-10">
        <Reveal delay={120} className="min-w-0 border border-brass/30 bg-card p-6 lg:p-8">
          <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">The improvements program</div>
          <p className="mt-2 text-cream/60 text-sm leading-[1.6]">The capital plan from the walk of the property, checked against Coachella Valley cost benchmarks, contractor bids pending.</p>
          <table className="mt-5 w-full text-sm">
            <tbody>
              {IMPROVEMENTS.map(([l, d, v]) => (
                <tr key={l} className="border-t border-brass/15 text-cream/75 align-top">
                  <td className="py-2 pr-3">
                    <div className="text-cream">{l}</div>
                    {d && <div className="text-cream/50 text-xs mt-0.5 leading-[1.5]">{d}</div>}
                  </td>
                  <td className="py-2 text-right tabular-nums whitespace-nowrap">{v}</td>
                </tr>
              ))}
              <tr className="border-t border-brass/40 text-cream">
                <td className="py-3 font-medium">Total improvements</td>
                <td className="py-3 text-right font-display text-lg text-brass tabular-nums">$786,500</td>
              </tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={200} className="min-w-0 border border-brass/30 bg-card p-6 lg:p-8">
          <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">The labor budget</div>
          <p className="mt-2 text-cream/60 text-sm leading-[1.6]">Self-managed staffing built around guest experience agents: self check-in arrival, hosts on site who curate the stay and run the income streams. Wages respect the 2026 California floor; burden at 25 percent.</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm min-w-[440px]">
              <thead>
                <tr className="text-[0.6rem] tracking-[0.2em] uppercase text-cream/50">
                  <th className="text-left font-normal pb-2 pr-3">Position</th>
                  <th className="text-right font-normal pb-2 px-2">FTE</th>
                  <th className="text-right font-normal pb-2 px-2">Rate</th>
                  <th className="text-right font-normal pb-2 pl-2">Annual, with burden</th>
                </tr>
              </thead>
              <tbody>
                {LABOR.map(([p, fte, rate, annual]) => (
                  <tr key={p} className="border-t border-brass/15 text-cream/75">
                    <td className="py-2 pr-3 text-cream">{p}</td>
                    <td className="py-2 px-2 text-right tabular-nums">{fte}</td>
                    <td className="py-2 px-2 text-right tabular-nums whitespace-nowrap">{rate}</td>
                    <td className="py-2 pl-2 text-right tabular-nums whitespace-nowrap">{annual}</td>
                  </tr>
                ))}
                <tr className="border-t border-brass/40 text-cream">
                  <td className="py-3 font-medium" colSpan={3}>Total labor, 9.5 FTE plus remote night audit</td>
                  <td className="py-3 pl-2 text-right font-display text-lg text-brass tabular-nums">$585,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>

      <p className="lg:col-span-12 text-cream/45 text-xs leading-[1.6] -mt-2">{SOURCE_NOTE}</p>

      {/* Shelf */}
      <div className="lg:col-span-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-brass/15 border border-brass/15">
        {SHELF.map((s, i) => (
          <Reveal key={s.t} delay={i * 40} className="bg-obsidian p-5 lg:p-6">
            <div className="font-display text-lg text-cream leading-snug">{s.t}</div>
            <p className="mt-2 text-cream/60 text-[0.8125rem] leading-[1.6]">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
