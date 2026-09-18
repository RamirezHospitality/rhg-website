/*
 * Ramirez Hospitality Group — The Reserve · PLAN PATHS + ANCILLARY
 * Two tables from a Plan delivered in September 2026 for a 38-key conversion
 * in the California desert, shared with the owner's permission and without
 * the property's name: the paths compared side by side (executive summary,
 * model v6, September 11, 2026) and the nine ancillary income streams
 * (review packet, September 10, 2026).
 */

const PATHS: { path: string; note: string; capital: string; noi1: string; cash1: string; noi5: string }[] = [
  { path: "Keep the master lease", note: "No capital. Income drifts as dues rise against flat rent.", capital: "$0", noi1: "$693K", cash1: "$693K", noi5: "$611K" },
  { path: "Hotel, 38 keys, operated for the owner", note: "Convert and reposition the footprint controlled today.", capital: "$1.29M", noi1: "$38K", cash1: "($1.17M)", noi5: "$1.27M" },
  { path: "Hotel, 52 keys, operated for the owner", note: "The above plus buying the remaining units for full control.", capital: "$4.96M", noi1: "($42K)", cash1: "($2.53M)", noi5: "$1.73M" },
];

const SALES = [
  { path: "Sell as one block", note: "Investor pricing at the listing ask nets about $6.6M to $7.1M in one closing. Below the $8M basis." },
  { path: "Sell down, unit by unit", note: "Recent unit comps of $220K to $269K, about two sales a month. Net proceeds of about $8.7M over about 19 months. Clears basis." },
];

const ANCILLARY: [string, string, string, string][] = [
  ["Pool day passes", "$35", "1,500 a year", "$39,400"],
  ["Daybeds and cabanas", "$150", "200 a year", "$22,500"],
  ["Private buyouts", "$6,000", "30 a year", "$153,000"],
  ["Family events", "$1,500", "30 a year", "$38,250"],
  ["Athletic club memberships", "$900 a year", "50 members", "$40,500"],
  ["Market lounge, premium vending", "$2,000 a month", "one", "$12,000"],
  ["Commercial laundry service", "$300,000 gross", "one", "$120,000"],
  ["Pet fees", "$35 a night", "1,383 nights", "$48,400"],
  ["Late checkout and early check-in", "$50", "355 stays", "$17,700"],
];

export function PlanPaths() {
  return (
    <div className="border border-brass/30 bg-card p-6 lg:p-8">
      <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">The paths, side by side</div>
      <p className="mt-2 text-cream/60 text-sm leading-[1.6]">
        Owner-level economics on one set of assumptions, from the delivered Plan. Unlevered and pre-tax. The two year-one lines differ because the hotel paths absorb their capital in year one: NOI is the operating result, cash flow is what the owner actually sees.
      </p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-[0.6rem] tracking-[0.2em] uppercase text-cream/50">
              <th className="text-left font-normal pb-2 pr-3">Path</th>
              <th className="text-right font-normal pb-2 px-2">Capital in</th>
              <th className="text-right font-normal pb-2 px-2">Year 1 NOI</th>
              <th className="text-right font-normal pb-2 px-2">Year 1 cash</th>
              <th className="text-right font-normal pb-2 pl-2">Year 5 NOI</th>
            </tr>
          </thead>
          <tbody>
            {PATHS.map((p) => (
              <tr key={p.path} className="border-t border-brass/15 align-top">
                <td className="py-3 pr-3">
                  <div className="text-cream">{p.path}</div>
                  <div className="text-cream/50 text-xs mt-0.5 leading-[1.5]">{p.note}</div>
                </td>
                <td className="py-3 px-2 text-right tabular-nums text-cream/80 whitespace-nowrap">{p.capital}</td>
                <td className="py-3 px-2 text-right tabular-nums text-cream/80 whitespace-nowrap">{p.noi1}</td>
                <td className="py-3 px-2 text-right tabular-nums text-cream/80 whitespace-nowrap">{p.cash1}</td>
                <td className="py-3 pl-2 text-right tabular-nums font-display text-base text-brass whitespace-nowrap">{p.noi5}</td>
              </tr>
            ))}
            {SALES.map((p) => (
              <tr key={p.path} className="border-t border-brass/15 align-top">
                <td className="py-3 pr-3" colSpan={5}>
                  <div className="text-cream">{p.path}</div>
                  <div className="text-cream/50 text-xs mt-0.5 leading-[1.5]">{p.note}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-cream/55 text-xs leading-[1.6]">
        The model also answers the question the owner did not ask: the most the owner could pay per added unit to go from 38 to 52 keys is about $139K at an 8% return and $204K at 6%, against a $195K ask. Year 5 NOI on the hotel paths is after every cost, including our fee.
      </p>
    </div>
  );
}

export function PlanAncillary() {
  return (
    <div className="border border-brass/30 bg-card p-6 lg:p-8 h-full">
      <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">Beyond the room rate</div>
      <p className="mt-2 text-cream/60 text-sm leading-[1.6]">
        Nine income streams found on the property walk, each priced from named local benchmarks. Net of platform fees and margins.
      </p>
      <table className="mt-5 w-full text-sm">
        <tbody>
          {ANCILLARY.map(([s, price, vol, net]) => (
            <tr key={s} className="border-t border-brass/15 align-top">
              <td className="py-2 pr-3">
                <div className="text-cream/85">{s}</div>
                <div className="text-cream/45 text-xs mt-0.5">{price} · {vol}</div>
              </td>
              <td className="py-2 text-right tabular-nums text-cream/80 whitespace-nowrap">{net}</td>
            </tr>
          ))}
          <tr className="border-t border-brass/40 text-cream">
            <td className="py-3 font-medium">Total ancillary, net</td>
            <td className="py-3 text-right font-display text-lg text-brass tabular-nums">$492,000</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-3 text-cream/45 text-xs leading-[1.6]">
        Every stream is run by the same on-site guest experience team that runs the front of house. Fifteen percent of revenue, found before the first guest checked in.
      </p>
    </div>
  );
}
