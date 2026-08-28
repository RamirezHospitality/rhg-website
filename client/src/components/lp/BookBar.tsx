/*
 * Ramirez Hospitality Group — Sticky mobile "Book" bar
 * Hidden at lg and up. Jumps to the lead form (step one of booking), the same
 * target as every other "Book The Modern Hotel Audit" CTA on this page.
 * The landing page adds bottom padding so content is never covered.
 */

import { ArrowRight } from "lucide-react";

export function BookBar() {
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-brass/25 bg-obsidian/95 backdrop-blur px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <a href="#lead-form" className="btn-brass w-full justify-center text-sm">
        Book The Modern Hotel Audit <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
}
