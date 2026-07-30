import { useMemo, useState } from "react";

export interface UseCarouselResult<T> {
  visibleItems: T[];
  startIndex: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  next: () => void;
  prev: () => void;
  pageCount: number;
  activePage: number;
}

/** Windowed carousel state: shows `perView` items and pages by `perView`. */
export function useCarousel<T>(
  items: T[],
  perView: number,
): UseCarouselResult<T> {
  const [startIndex, setStartIndex] = useState(0);

  const maxStart = Math.max(0, items.length - perView);

  const visibleItems = useMemo(
    () => items.slice(startIndex, startIndex + perView),
    [items, startIndex, perView],
  );

  const next = () =>
    setStartIndex((index) => Math.min(index + perView, maxStart));
  const prev = () => setStartIndex((index) => Math.max(index - perView, 0));

  return {
    visibleItems,
    startIndex,
    canGoPrev: startIndex > 0,
    canGoNext: startIndex < maxStart,
    next,
    prev,
    pageCount: Math.max(1, Math.ceil(items.length / perView)),
    activePage: Math.floor(startIndex / perView) + 1,
  };
}
