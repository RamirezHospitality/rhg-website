/*
 * Ramirez Hospitality Group — The Reserve · EVENT GALLERY
 * Design: Emerald Reserve — obsidian/brass/emerald, Playfair + Inter
 * Hero carousel (cinematic, auto-advance) + masonry grid organized by brand.
 * Placeholder slots ready for Adam's real event photos.
 * Brand logos: Hugo Boss · Levi's · NYX Cosmetics · BMW · Volkswagen
 */

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Camera, Upload } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/brand";

/* ─── Brand event data ─────────────────────────────────────────────────────── */

interface EventPhoto {
  id: string;
  src: string | null; // null = placeholder slot
  alt: string;
  caption?: string;
}

interface BrandEvent {
  id: string;
  brand: string;
  tagline: string;
  color: string; // brand accent color for the logo badge
  heroPhotos: EventPhoto[]; // first 1-3 go into the hero carousel
  galleryPhotos: EventPhoto[]; // rest go into the masonry grid
}

const BRAND_EVENTS: BrandEvent[] = [
  {
    id: "hugo-boss",
    brand: "Hugo Boss",
    tagline: "Full Hotel Takeover",
    color: "#1a1a1a",
    heroPhotos: [
      {
        id: "hb-hero-1",
        src: IMAGES.events,
        alt: "Hugo Boss full hotel takeover — grand arrival",
        caption: "Hugo Boss · Full Hotel Takeover · Palm Springs",
      },
    ],
    galleryPhotos: [
      { id: "hb-1", src: null, alt: "Hugo Boss event — lobby activation" },
      { id: "hb-2", src: null, alt: "Hugo Boss event — private dinner" },
      { id: "hb-3", src: null, alt: "Hugo Boss event — brand installation" },
    ],
  },
  {
    id: "levis",
    brand: "Levi's",
    tagline: "Total Hotel Takeover · Sands Hotel & Spa",
    color: "#c41e3a",
    heroPhotos: [
      {
        id: "lv-hero-1",
        src: null,
        alt: "Levi's total hotel takeover — pool activation",
        caption: "Levi's · Total Hotel Takeover · Sands Hotel & Spa",
      },
    ],
    galleryPhotos: [
      { id: "lv-1", src: null, alt: "Levi's event — poolside setup" },
      { id: "lv-2", src: null, alt: "Levi's event — branded rooms" },
      { id: "lv-3", src: null, alt: "Levi's event — custom F&B" },
      { id: "lv-4", src: null, alt: "Levi's event — entertainment" },
    ],
  },
  {
    id: "nyx",
    brand: "NYX Cosmetics",
    tagline: "Beauty Bar Activation · The Paloma Resort",
    color: "#8b1a4a",
    heroPhotos: [
      {
        id: "nyx-hero-1",
        src: null,
        alt: "NYX Cosmetics beauty bar — setup",
        caption: "NYX Cosmetics · Beauty Bar Activation · The Paloma Resort",
      },
    ],
    galleryPhotos: [
      { id: "nyx-1", src: null, alt: "NYX beauty bar — station design" },
      { id: "nyx-2", src: null, alt: "NYX beauty bar — product display" },
      { id: "nyx-3", src: null, alt: "NYX beauty bar — guest experience" },
    ],
  },
  {
    id: "bmw-vw",
    brand: "BMW · Volkswagen",
    tagline: "Vehicle Launch Events",
    color: "#0066b2",
    heroPhotos: [
      {
        id: "bmw-hero-1",
        src: null,
        alt: "BMW vehicle launch event — reveal setup",
        caption: "BMW · Volkswagen · Vehicle Launch Events",
      },
    ],
    galleryPhotos: [
      { id: "bmw-1", src: null, alt: "BMW launch — vehicle reveal" },
      { id: "bmw-2", src: null, alt: "BMW launch — VIP reception" },
      { id: "vw-1", src: null, alt: "Volkswagen launch — brand activation" },
    ],
  },
];

/* ─── Hero Carousel ────────────────────────────────────────────────────────── */

const HERO_SLIDES = BRAND_EVENTS.flatMap((e) =>
  e.heroPhotos.map((p) => ({ ...p, brand: e.brand, tagline: e.tagline }))
);

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 350);
    },
    [isTransitioning]
  );

  const prev = () => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = useCallback(
    () => goTo((current + 1) % HERO_SLIDES.length),
    [current, goTo]
  );

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-obsidian group">
      {/* Image / placeholder */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {slide.src ? (
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderSlot label={slide.brand} />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/50 to-transparent" />
      </div>

      {/* Caption */}
      <div
        className={`absolute bottom-0 left-0 p-6 md:p-10 transition-all duration-700 ${
          isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="text-[0.6rem] tracking-[0.32em] uppercase text-brass mb-2">
          {slide.tagline}
        </div>
        <div className="font-display italic text-cream text-xl md:text-3xl">
          {slide.caption || slide.alt}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-brass/30 flex items-center justify-center text-brass hover:bg-brass/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-brass/30 flex items-center justify-center text-brass hover:bg-brass/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-6 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 ${
              i === current
                ? "w-6 h-1.5 bg-brass"
                : "w-1.5 h-1.5 bg-brass/35 hover:bg-brass/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Placeholder slot ─────────────────────────────────────────────────────── */

function PlaceholderSlot({ label, tall }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`w-full ${tall ? "h-full" : "aspect-[4/3]"} bg-obsidian border border-brass/15 flex flex-col items-center justify-center gap-3 group hover:border-brass/35 transition-colors duration-300`}
    >
      <Camera className="w-8 h-8 text-brass/25 group-hover:text-brass/50 transition-colors duration-300" />
      <div className="text-center">
        <div className="text-[0.6rem] tracking-[0.28em] uppercase text-brass/40 group-hover:text-brass/65 transition-colors duration-300">
          {label}
        </div>
        <div className="text-[0.55rem] tracking-[0.2em] uppercase text-cream/20 mt-1">
          Photo coming soon
        </div>
      </div>
      <Upload className="w-4 h-4 text-brass/15 group-hover:text-brass/35 transition-colors duration-300" />
    </div>
  );
}

/* ─── Brand logo badge ─────────────────────────────────────────────────────── */

function BrandBadge({ brand, tagline }: { brand: string; tagline: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px flex-1 bg-brass/20" />
      <div className="text-center px-4">
        <div className="font-display italic text-brass text-lg leading-none">{brand}</div>
        <div className="text-[0.55rem] tracking-[0.28em] uppercase text-cream/40 mt-1">
          {tagline}
        </div>
      </div>
      <div className="h-px flex-1 bg-brass/20" />
    </div>
  );
}

/* ─── Masonry grid per brand ───────────────────────────────────────────────── */

function BrandGallerySection({ event }: { event: BrandEvent }) {
  const photos = event.galleryPhotos;

  // Layout patterns based on photo count
  const renderGrid = () => {
    if (photos.length === 3) {
      // 1 large + 2 small
      return (
        <div className="grid grid-cols-2 gap-3">
          <div className="row-span-2">
            {photos[0].src ? (
              <img
                src={photos[0].src}
                alt={photos[0].alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <PlaceholderSlot label={event.brand} tall />
            )}
          </div>
          {photos.slice(1).map((photo) => (
            <div key={photo.id} className="aspect-[4/3]">
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PlaceholderSlot label={event.brand} />
              )}
            </div>
          ))}
        </div>
      );
    }

    if (photos.length === 4) {
      // 2x2 grid
      return (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="aspect-[4/3]">
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PlaceholderSlot label={event.brand} />
              )}
            </div>
          ))}
        </div>
      );
    }

    // Default: single row
    return (
      <div className={`grid gap-3 grid-cols-${Math.min(photos.length, 3)}`}>
        {photos.map((photo) => (
          <div key={photo.id} className="aspect-[4/3]">
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <PlaceholderSlot label={event.brand} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Reveal className="mb-14 last:mb-0">
      <BrandBadge brand={event.brand} tagline={event.tagline} />
      {renderGrid()}
    </Reveal>
  );
}

/* ─── Main EventGallery export ─────────────────────────────────────────────── */

export function EventGallery() {
  return (
    <div className="mt-10 space-y-2">
      {/* Hero Carousel */}
      <Reveal>
        <div className="relative">
          <div className="absolute -top-3 -left-3 w-12 h-12 border-l border-t border-brass/40 z-10 pointer-events-none" />
          <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r border-b border-brass/40 z-10 pointer-events-none" />
          <HeroCarousel />
        </div>
      </Reveal>

      {/* Upload note */}
      <Reveal>
        <div className="flex items-center gap-3 py-5 border-b border-brass/15">
          <Camera className="w-4 h-4 text-brass/50 shrink-0" />
          <p className="text-cream/45 text-xs tracking-[0.12em] uppercase">
            Personal photography from past brand activations · Photos being added shortly
          </p>
        </div>
      </Reveal>

      {/* Brand sections */}
      <div className="pt-8">
        {BRAND_EVENTS.map((event) => (
          <BrandGallerySection key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
