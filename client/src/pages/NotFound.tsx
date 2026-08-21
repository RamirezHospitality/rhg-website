/*
 * Ramirez Hospitality Group — The Reserve · 404
 * Brand-consistent 404 page. Noindex.
 */

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

export default function NotFound() {
  return (
    <PageLayout
      title="Page Not Found — Ramirez Hospitality Group"
      description="The page you are looking for does not exist. Return to the Ramirez Hospitality Group homepage."
      noindex={true}
      hideCTA={true}
    >
      <section className="min-h-[70vh] flex items-center bg-obsidian">
        <div className="container">
          <div className="max-w-2xl">
            <div className="font-display text-[8rem] lg:text-[12rem] leading-none text-brass/20 tracking-tight select-none">
              404
            </div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl text-cream leading-[1.05]">
              This page doesn't exist.
              <br />
              <span className="italic text-brass">But your revenue opportunity does.</span>
            </h1>
            <p className="mt-7 text-cream/70 text-lg leading-[1.7] max-w-lg">
              The page you were looking for has moved or never existed. Head back to the
              homepage or schedule a free property audit — no charge, no pitch.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/">
                <span className="btn-brass">
                  Back to Home <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link href="/audit">
                <span className="link-brass pr-6">
                  Schedule Free Audit <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
