/*
 * Ramirez Hospitality Group — Sticky click-to-call bar (mobile only)
 * Hidden at lg and up. The landing page adds bottom padding so content is never covered.
 */

import { Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function MobileCallBar() {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-brass/25 bg-obsidian/95 backdrop-blur px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <a
        href={BRAND.phoneHref}
        className="btn-brass w-full justify-center text-sm"
        aria-label={`Call Adam Ramirez at ${BRAND.phone}`}
      >
        <Phone className="w-4 h-4" /> Call Adam · {BRAND.phone}
      </a>
    </div>
  );
}
