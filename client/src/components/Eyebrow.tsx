/*
 * Ramirez Hospitality Group — The Reserve
 * Eyebrow label with brass hairline + roman numeral marker.
 */

interface EyebrowProps {
  numeral?: string;
  label: string;
  className?: string;
  variant?: "brass" | "cream";
}

export function Eyebrow({ numeral, label, className = "", variant = "brass" }: EyebrowProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 ${className}`}
      style={{ color: variant === "cream" ? "oklch(0.96 0.02 85)" : undefined }}
    >
      <span className="h-px w-9 bg-brass/70" />
      {numeral && (
        <span className="font-display italic text-brass text-sm tracking-wider">
          {numeral}
        </span>
      )}
      {numeral && <span className="text-brass/60 text-xs">·</span>}
      <span
        className={`text-[0.62rem] tracking-[0.32em] uppercase font-medium ${
          variant === "cream" ? "text-cream/80" : "text-brass"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
