/*
 * Ramirez Hospitality Group — The Reserve
 * Monogram lockup. Brass wordmark with hairline + "By Adam Ramirez" byline.
 */

import { Link } from "wouter";

interface MonogramProps {
  variant?: "full" | "compact";
  className?: string;
}

export function Monogram({ variant = "compact", className = "" }: MonogramProps) {
  if (variant === "full") {
    return (
      <Link href="/" className={`group inline-flex flex-col items-start gap-1.5 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="font-display text-[1.6rem] leading-none tracking-[0.02em] text-cream font-semibold">
            Ramirez<span className="text-brass"> · </span>Hospitality
          </div>
        </div>
        <div className="flex items-center gap-2 pl-0.5">
          <div className="h-px w-8 bg-brass/70 group-hover:w-12 transition-all duration-500" />
          <span className="text-[0.62rem] tracking-[0.32em] uppercase text-cream/70">
            By Adam Ramirez
          </span>
        </div>
      </Link>
    );
  }
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <div className="relative">
        <span className="font-display text-[1.35rem] leading-none tracking-[0.02em] text-cream font-semibold">
          Ramirez<span className="text-brass"> · </span>Hospitality
        </span>
        <div className="absolute -bottom-1.5 left-0 h-px w-10 bg-brass/60 group-hover:w-full transition-all duration-700" />
      </div>
    </Link>
  );
}
