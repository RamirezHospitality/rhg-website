/*
 * Ramirez Hospitality Group — The Reserve
 * Sticky editorial top nav. Translucent obsidian, brass hairline beneath,
 * brass underline draws on hover. Mobile drawer.
 */

import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/brand";
import { Monogram } from "./Monogram";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian/85 backdrop-blur-md border-b border-brass/15"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ backgroundColor: scrolled ? "oklch(0.10 0.005 150 / 0.85)" : "transparent" }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-[78px]">
          <Monogram />

          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`relative text-[0.78rem] tracking-[0.16em] uppercase font-medium transition-colors duration-300 ${
                      isActive ? "text-brass" : "text-cream/85 hover:text-cream"
                    } group`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-brass transition-all duration-500 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={BRAND.auditBookingUrl} target="_blank" rel="noopener noreferrer" className="btn-brass">
              Book The Modern Hotel Audit
            </a>
          </div>

          <button
            className="lg:hidden text-cream p-2 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          open ? "max-h-[600px] border-t border-brass/15" : "max-h-0"
        }`}
        style={{ backgroundColor: "oklch(0.10 0.005 150 / 0.97)" }}
      >
        <div className="container py-6 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="block py-3 border-b border-brass/10 text-cream/85 text-sm tracking-[0.16em] uppercase">
                {link.label}
              </span>
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a
              href={BRAND.auditBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brass w-full justify-center"
            >
              Book The Modern Hotel Audit
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
