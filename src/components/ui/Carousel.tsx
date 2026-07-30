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
 *
 * NOTE (workshop): the previous/next controls are icon-only <div>s, so they are
 * not focusable or operable by keyboard and expose no accessible name. There is
 * also no "slide X of Y" status for assistive tech. Planted issues.
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
    <div className="flex items-center gap-3">
      <div
        onClick={canGoPrev ? prev : undefined}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg ${
          canGoPrev
            ? "cursor-pointer text-slate-600 hover:bg-slate-100"
            : "text-slate-300"
        }`}
      >
        ‹
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visibleItems.map((item) => (
          <div key={getKey(item)}>{renderItem(item)}</div>
        ))}
      </div>

      <div
        onClick={canGoNext ? next : undefined}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-lg ${
          canGoNext
            ? "cursor-pointer text-slate-600 hover:bg-slate-100"
            : "text-slate-300"
        }`}
      >
        ›
      </div>
    </div>
  );
}
