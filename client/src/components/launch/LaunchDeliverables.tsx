/*
 * Ramirez Hospitality Group — The Reserve · LAUNCH DELIVERABLES
 * What an owner holds at the end of The Modern Hotel Launch, drawn from a
 * live opening engagement: a sample status board, a sample opening budget,
 * and the shelf of documents. Figures on this component are illustrative.
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

const BUDGET: [string, string, string][] = [
  ["Exterior and grounds", "Pool zone, courtyard, landscape, lighting, paint, walkways, signage", "$690K"],
  ["Rooms, per key", "Furniture, fixtures, soft goods, keyless entry", "$14K"],
  ["Back of house", "Laundry, storage, maintenance, housekeeping carts", "$65K"],
  ["Code and life safety", "Placeholders until the city has spoken", "$40K"],
  ["Soft costs and pre-opening", "Design, permits, systems, pre-opening payroll and marketing", "$180K"],
  ["Contingency, 10%", "", "$148K"],
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

export function LaunchDeliverables() {
  const done = BOARD.filter((b) => b.s === "done").length;
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
      {/* Status board */}
      <Reveal className="lg:col-span-5 border border-brass/30 bg-card p-6 lg:p-8">
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
      </Reveal>

      {/* Opening budget */}
      <Reveal delay={120} className="lg:col-span-7 border border-brass/30 bg-card p-6 lg:p-8">
        <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">The opening budget</div>
        <p className="mt-2 text-cream/60 text-sm">A sample tier for a 36-room conversion. Every line carries its basis and a confidence grade.</p>
        <table className="mt-5 w-full text-sm">
          <tbody>
            {BUDGET.map(([l, d, v]) => (
              <tr key={l} className="border-t border-brass/15 text-cream/75 align-top">
                <td className="py-2.5 pr-3">
                  <div className="text-cream">{l}</div>
                  {d && <div className="text-cream/50 text-xs mt-0.5 leading-[1.5]">{d}</div>}
                </td>
                <td className="py-2.5 text-right tabular-nums whitespace-nowrap">{v}</td>
              </tr>
            ))}
            <tr className="border-t border-brass/40 text-cream">
              <td className="py-3 font-medium">Total opening budget</td>
              <td className="py-3 text-right font-display text-lg text-brass tabular-nums">$1.63M</td>
            </tr>
            <tr className="text-cream/55 text-xs">
              <td className="pb-1">Per key</td>
              <td className="pb-1 text-right tabular-nums">$45K</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-cream/45 text-xs leading-[1.6]">Illustrative, rounded. The real budget is built from the walk of your property and checked against local cost benchmarks and contractor bids.</p>
      </Reveal>

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
