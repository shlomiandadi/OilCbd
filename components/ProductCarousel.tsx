'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard from '@/components/ProductCard';

export type CarouselCard = {
  key: string;
  id: string;
  productSlug: string;
  name: string;
  variantLabel: string;
  description: string;
  price: number;
  cbdPercentage: number;
  image: string;
  promo?: boolean;
};

type Props = {
  title: string;
  subtitle?: string;
  hint?: string;
  items: CarouselCard[];
};

const AUTO_MS = 5500;

/** קרוסלה: חיצים, נקודות, גלילה אוטומטית, snap — תואם RTL */
export default function ProductCarousel({ title, subtitle, hint, items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  activeRef.current = active;

  const scrollToIndex = useCallback(
    (i: number, behavior: ScrollBehavior = 'smooth') => {
      const n = items.length;
      if (n === 0) return;
      const clamped = Math.max(0, Math.min(n - 1, i));
      const el = slideRefs.current[clamped];
      el?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
      setActive(clamped);
    },
    [items.length]
  );

  const goPrev = () => scrollToIndex(active - 1);
  const goNext = () => scrollToIndex(active + 1);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, items.length);
  }, [items.length]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || items.length === 0) return;

    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (slides.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.35)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best = visible[0];
        if (!best?.target) return;
        const idx = slides.indexOf(best.target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      { root, threshold: [0.35, 0.55, 0.75] }
    );

    slides.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      const n = items.length;
      const next = (activeRef.current + 1) % n;
      const el = slideRefs.current[next];
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActive(next);
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [items.length, paused, items]);

  if (items.length === 0) return null;

  const canPrev = active > 0;
  const canNext = active < items.length - 1;

  return (
    <section
      className="relative"
      aria-labelledby="carousel-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-100 sm:text-3xl" id="carousel-heading">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 max-w-2xl text-neutral-400">{subtitle}</p>
          ) : null}
          {hint ? <p className="mt-2 text-sm text-neutral-500">{hint}</p> : null}
        </div>

        {items.length > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/90 text-lg text-neutral-200 shadow-lg transition hover:border-amber-500/50 hover:text-amber-400 disabled:pointer-events-none disabled:opacity-30"
              aria-label="שקופית קודמת"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/90 text-lg text-neutral-200 shadow-lg transition hover:border-amber-500/50 hover:text-amber-400 disabled:pointer-events-none disabled:opacity-30"
              aria-label="שקופית הבאה"
            >
              ›
            </button>
          </div>
        ) : null}
      </div>

      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              disabled={!canPrev}
              className="absolute right-0 top-1/2 z-10 hidden h-12 w-10 -translate-y-1/2 items-center justify-center rounded-l-lg border border-neutral-700/80 bg-neutral-950/85 text-2xl text-amber-400/95 shadow-md backdrop-blur-sm transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-25 md:flex"
              aria-label="שקופית קודמת"
            >
              ›
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canNext}
              className="absolute left-0 top-1/2 z-10 hidden h-12 w-10 -translate-y-1/2 items-center justify-center rounded-r-lg border border-neutral-700/80 bg-neutral-950/85 text-2xl text-amber-400/95 shadow-md backdrop-blur-sm transition hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-25 md:flex"
              aria-label="שקופית הבאה"
            >
              ‹
            </button>
          </>
        ) : null}

        <div
          ref={containerRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-1"
          style={{ scrollPaddingInline: '1rem' }}
        >
          {items.map((c, i) => (
            <div
              key={c.key}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="w-[min(100%,340px)] shrink-0 snap-center sm:w-[300px] md:w-[320px]"
            >
              <div className="relative h-full">
                {c.promo ? (
                  <span className="absolute -top-1 left-1/2 z-20 -translate-x-1/2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    מבצע
                  </span>
                ) : null}
                <ProductCard
                  id={c.id}
                  name={c.name}
                  productSlug={c.productSlug}
                  variantLabel={c.variantLabel}
                  description={c.description}
                  price={c.price}
                  cbdPercentage={c.cbdPercentage}
                  image={c.image}
                  variant="compact"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 ? (
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="מיקום בקרוסלה"
        >
          {items.map((c, i) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`מוצר ${i + 1} מתוך ${items.length}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-8 bg-amber-500'
                  : 'w-2.5 bg-neutral-600 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
