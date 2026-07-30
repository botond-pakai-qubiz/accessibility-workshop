import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCarousel } from "./useCarousel";

const items = Array.from({ length: 10 }, (_, index) => index);

describe("useCarousel", () => {
  it("shows a window of items and advances by page", () => {
    const { result } = renderHook(() => useCarousel(items, 4));
    expect(result.current.visibleItems).toEqual([0, 1, 2, 3]);
    expect(result.current.canGoPrev).toBe(false);

    act(() => result.current.next());
    expect(result.current.visibleItems).toEqual([4, 5, 6, 7]);
    expect(result.current.canGoPrev).toBe(true);
  });

  it("clamps at the end of the list", () => {
    const { result } = renderHook(() => useCarousel(items, 4));
    act(() => result.current.next());
    act(() => result.current.next());
    act(() => result.current.next());
    expect(result.current.canGoNext).toBe(false);
    expect(result.current.visibleItems).toEqual([6, 7, 8, 9]);
  });
});
