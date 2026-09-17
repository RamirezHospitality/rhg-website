/*
 * Ramirez Hospitality Group — The Reserve · PLAN MODEL DEMO
 * An illustrative, interactive slice of the Modern Hotel Plan's financial
 * model: six inputs an owner can move, a stabilized-year P&L, a monthly
 * rooms-revenue chart on a desert seasonal curve, and a rate-by-occupancy
 * sensitivity grid. Every figure is computed in the browser from the sliders.
 * Sample property only; a real Plan runs on the owner's numbers and sources.
 */

import { useMemo, useState } from "react";

const MONTHS = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
// Desert seasonality: index 1.0 = the blended year. Peak is spring, trough is deep summer.
const SEASON_ADR = [0.95, 1.05, 1.0, 1.15, 1.3, 1.35, 1.4, 1.05, 0.7, 0.6, 0.6, 0.75];
const SEASON_OCC = [0.95, 1.05, 0.95, 1.15, 1.25, 1.3, 1.3, 1.05, 0.7, 0.6, 0.6, 0.8];
const DAYS = [31, 30, 31, 31, 28, 31, 30, 31, 30, 31, 31, 30];

const INPUTS = [
  { key: "keys", label: "Rooms", min: 10, max: 80, step: 1, fmt: (v: number) => `${v}` },
  { key: "adr", label: "Average daily rate", min: 120, max: 450, step: 5, fmt: (v: number) => `$${v}` },
  { key: "occ", label: "Blended occupancy", min: 40, max: 85, step: 1, fmt: (v: number) => `${v}%` },
  { key: "labor", label: "Labor, all in", min: 200_000, max: 900_000, step: 10_000, fmt: (v: number) => `$${Math.round(v / 1000)}K` },
  { key: "mkt", label: "Sales and marketing", min: 2, max: 10, step: 0.5, fmt: (v: number) => `${v}%` },
  { key: "cap", label: "Capitalization rate", min: 6, max: 10, step: 0.25, fmt: (v: number) => `${v}%` },
] as const;

type Key = (typeof INPUTS)[number]["key"];
type Inputs = Record<Key, number>;

const DEFAULTS: Inputs = { keys: 36, adr: 245, occ: 62, labor: 540_000, mkt: 5, cap: 8 };

function usd(n: number, k = false) {
  if (k) return `$${Math.round(n / 1000).toLocaleString()}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function model(i: Inputs, adrMult = 1, occMult = 1) {
  const occ = Math.min(0.95, (i.occ / 100) * occMult);
  const adr = i.adr * adrMult;
  const nights = i.keys * 365 * occ;
  const rooms = nights * adr;
  const resort = nights * 25;
  const ancillary = rooms * 0.1;
  const revenue = rooms + resort + ancillary;
  const ota = rooms * 0.4 * 0.18;
  const roomCosts = nights * 16;
  const ag = revenue * 0.06;
  const mkt = revenue * (i.mkt / 100);
  const utilities = i.keys * 3_500;
  const insurance = i.keys * 900;
  const tech = 8_400;
  const tax = i.keys * 2_400;
  const ffe = revenue * 0.04;
  const expenses = ota + roomCosts + i.labor + ag + mkt + utilities + insurance + tech + tax + ffe;
  const noi = revenue - expenses;
  return {
    nights, rooms, resort, ancillary, revenue, ota, roomCosts, ag, mkt, utilities, insurance, tech, tax, ffe, expenses, noi,
    revpar: rooms / (i.keys * 365),
    margin: revenue ? noi / revenue : 0,
    value: i.cap ? noi / (i.cap / 100) : 0,
  };
}

const SENS = [0.9, 1, 1.1];

export function PlanModelDemo() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const m = useMemo(() => model(inputs), [inputs]);

  const monthly = useMemo(() => {
    const raw = MONTHS.map((_, k) => {
      const occ = Math.min(0.97, (inputs.occ / 100) * SEASON_OCC[k]);
      return inputs.keys * DAYS[k] * occ * inputs.adr * SEASON_ADR[k];
    });
    const scale = m.rooms / raw.reduce((a, b) => a + b, 0);
    return raw.map((v) => v * scale);
  }, [inputs, m.rooms]);
  const peak = Math.max(...monthly);

  const grid = useMemo(() => SENS.map((a) => SENS.map((o) => model(inputs, a, o).noi)), [inputs]);
  const gridMin = Math.min(...grid.flat());
  const gridMax = Math.max(...grid.flat());

  const set = (k: Key, v: number) => setInputs((s) => ({ ...s, [k]: v }));

  const pl: [string, number, boolean?][] = [
    ["Rooms revenue", m.rooms],
    ["Resort fee", m.resort],
    ["Ancillary income, net", m.ancillary],
    ["Total revenue", m.revenue, true],
    ["Booking-site commissions", -m.ota],
    ["Room costs", -m.roomCosts],
    ["Labor", -inputs.labor],
    ["Administrative and general", -m.ag],
    ["Sales and marketing", -m.mkt],
    ["Utilities, insurance, technology", -(m.utilities + m.insurance + m.tech)],
    ["Property tax", -m.tax],
    ["Furniture and equipment reserve", -m.ffe],
    ["Owner NOI", m.noi, true],
  ];

  return (
    <div className="border border-brass/30 bg-card">
      {/* Inputs */}
      <div className="p-6 lg:p-8 border-b border-brass/15">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
          <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass">Move the inputs</div>
          <button
            type="button"
            onClick={() => setInputs(DEFAULTS)}
            className="text-[0.7rem] tracking-[0.18em] uppercase text-cream/55 hover:text-cream transition-colors underline underline-offset-4 decoration-brass/40"
          >
            Reset
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {INPUTS.map((f) => (
            <label key={f.key} className="block">
              <span className="flex justify-between text-sm text-cream/80">
                <span>{f.label}</span>
                <span className="font-display text-brass text-base tabular-nums">{f.fmt(inputs[f.key])}</span>
              </span>
              <input
                id={`plan-demo-${f.key}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={inputs[f.key]}
                onChange={(e) => set(f.key, Number(e.target.value))}
                className="mt-2 w-full accent-[var(--brass)] cursor-pointer"
                aria-label={f.label}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Headline */}
      <div className="grid sm:grid-cols-4 gap-px bg-brass/15 border-b border-brass/15">
        {[
          ["Total revenue", usd(m.revenue, true)],
          ["Owner NOI", usd(m.noi, true)],
          ["RevPAR", usd(m.revpar)],
          ["Implied value", usd(m.value, true)],
        ].map(([l, v]) => (
          <div key={l} className="bg-obsidian p-5">
            <div className="text-[0.6rem] tracking-[0.24em] uppercase text-cream/55">{l}</div>
            <div className="mt-1 font-display text-2xl lg:text-3xl text-cream tabular-nums">{v}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12">
        {/* P&L */}
        <div className="lg:col-span-5 min-w-0 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-brass/15">
          <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-4">Stabilized year</div>
          <table className="w-full text-sm">
            <tbody>
              {pl.map(([l, v, bold]) => (
                <tr key={l} className={bold ? "border-t border-brass/30 text-cream" : "text-cream/70"}>
                  <td className={`py-1.5 pr-3 ${bold ? "font-medium" : ""}`}>{l}</td>
                  <td className={`py-1.5 text-right tabular-nums ${bold ? "font-display text-base text-brass" : ""}`}>
                    {v < 0 ? `(${usd(-v)})` : usd(v)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-cream/45 text-xs leading-[1.6]">
            Margin {Math.round(m.margin * 100)}% of revenue. Unlevered, pre-tax, before any management fee.
          </p>
        </div>

        {/* Chart + sensitivity */}
        <div className="lg:col-span-7 min-w-0 p-6 lg:p-8">
          <div className="text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-4">Monthly rooms revenue, on a desert season</div>
          <div className="flex items-end gap-[6px] h-40" role="img" aria-label="Monthly rooms revenue across the fiscal year, highest in spring and lowest in deep summer">
            {monthly.map((v, k) => (
              <div key={MONTHS[k]} className="flex-1 min-w-0 flex flex-col items-center justify-end h-full group" title={`${MONTHS[k]}: ${usd(v, true)}`}>
                <span className="w-full truncate text-center text-[0.6rem] text-cream/55 tabular-nums mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{usd(v, true)}</span>
                <div className="w-full bg-brass/85 rounded-t-[4px] group-hover:bg-brass transition-colors" style={{ height: `${Math.max(3, (v / peak) * 100)}%` }} />
                <span className="mt-2 text-[0.6rem] text-cream/50 uppercase tracking-wider">{MONTHS[k]}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-[0.62rem] tracking-[0.32em] uppercase text-brass mb-3">Owner NOI if rate and occupancy move</div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center tabular-nums">
              <thead>
                <tr className="text-cream/50">
                  <th className="text-left font-normal py-1">Rate \ Occupancy</th>
                  {SENS.map((o) => (
                    <th key={o} className="font-normal py-1">{Math.round(o * inputs.occ)}%</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grid.map((row, ai) => (
                  <tr key={SENS[ai]}>
                    <td className="text-left text-cream/60 py-1">${Math.round(SENS[ai] * inputs.adr)}</td>
                    {row.map((v, oi) => {
                      const t = gridMax === gridMin ? 0.5 : (v - gridMin) / (gridMax - gridMin);
                      return (
                        <td key={oi} className="p-[2px]">
                          <div
                            className={`py-2 rounded-[3px] ${ai === 1 && oi === 1 ? "ring-1 ring-brass" : ""}`}
                            style={{ background: `color-mix(in oklab, var(--brass) ${Math.round(12 + t * 55)}%, var(--obsidian))`, color: "var(--cream)" }}
                            title={`Rate ${usd(SENS[ai] * inputs.adr)}, occupancy ${Math.round(SENS[oi] * inputs.occ)}%: NOI ${usd(v)}`}
                          >
                            {usd(v, true)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p className="px-6 lg:px-8 py-4 border-t border-brass/15 text-cream/45 text-xs leading-[1.6]">
        Illustrative. A sample conversion on rounded industry costs, computed in your browser. Your Plan runs on your property, your market and sourced inputs, and the model you keep has about sixty of them.
      </p>
    </div>
  );
}
