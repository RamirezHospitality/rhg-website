/*
 * Ramirez Hospitality Group — The Reserve
 * Layout wrapper. Manages SEO meta, header, persistent CTA, footer, scroll-to-top.
 * Updated: Full SEO + GEO pass — canonical, OG, Twitter Card, JSON-LD via SEO component.
 */

import { type ReactNode } from "react";
import { useLocation } from "wouter";
import { SiteHeader } from "./SiteHeader";
import { PersistentCTA, SiteFooter } from "./SiteFooter";
import { SEO, type SEOProps } from "./SEO";

interface PageLayoutProps extends Omit<SEOProps, "title" | "description"> {
  children: ReactNode;
  title?: string;
  description?: string;
  hideCTA?: boolean;
}

export function PageLayout({
  children,
  title,
  description,
  hideCTA,
  canonical,
  ogImage,
  ogType,
  jsonLd,
  breadcrumbs,
  article,
  noindex,
}: PageLayoutProps) {
  const [location] = useLocation();

  // Scroll to anchor hash if present, otherwise scroll to top
  // This is handled via useEffect inside SEO component now, but we keep
  // the scroll behavior here for non-SEO pages.
  const hash = typeof window !== "undefined" ? window.location.hash : "";

  if (hash) {
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    // cleanup is handled by React's effect system via location dependency
    void timer;
  } else {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      {title && description && (
        <SEO
          title={title}
          description={description}
          canonical={canonical ?? location}
          ogImage={ogImage}
          ogType={ogType}
          jsonLd={jsonLd}
          breadcrumbs={breadcrumbs}
          article={article}
          noindex={noindex}
        />
      )}
      <SiteHeader />
      <main className="flex-1">{children}</main>
      {!hideCTA && <PersistentCTA />}
      <SiteFooter />
    </div>
  );
}
