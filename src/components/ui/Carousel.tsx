import type { ReactNode } from "react";
import { useCarousel } from "@/hooks/useCarousel";

interface CarouselProps<T> {
  items: T[];
  perView?: number;
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
}

/**
 * Simple windowed carousel.
 */
export function Carousel<T>({
  items,
  perView = 4,
  getKey,
  renderItem,
}: CarouselProps<T>) {
  const { visibleItems, canGoPrev, canGoNext, next, prev } = useCarousel(
    items,
    perView,
  );

  return (
    <div className="flex items-center gap-3" role="region" aria-label="Carousel">
      <button
        type="button"
        onClick={canGoPrev ? prev : undefined}
        disabled={!canGoPrev}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
          canGoPrev
            ? "cursor-pointer text-slate-600 hover:bg-slate-100"
            : "text-slate-300 cursor-not-allowed"
        }`}
        aria-label="Previous slide"
        aria-controls="carousel-items"
      >
        ‹
      </button>

      <div id="carousel-items" className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visibleItems.map((item) => (
          <div key={getKey(item)}>{renderItem(item)}</div>
        ))}
      </div>

      <button
        type="button"
        onClick={canGoNext ? next : undefined}
        disabled={!canGoNext}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
          canGoNext
            ? "cursor-pointer text-slate-600 hover:bg-slate-100"
            : "text-slate-300 cursor-not-allowed"
        }`}
        aria-label="Next slide"
        aria-controls="carousel-items"
      >
        ›
      </button>
    </div>
  );
}
