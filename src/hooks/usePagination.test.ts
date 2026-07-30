import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { usePagination } from "./usePagination";

const items = Array.from({ length: 45 }, (_, index) => index + 1);

describe("usePagination", () => {
  it("splits items into pages of the given size", () => {
    const { result } = renderHook(() => usePagination(items, 15));
    expect(result.current.pageCount).toBe(3);
    expect(result.current.pageItems).toHaveLength(15);
    expect(result.current.pageItems[0]).toBe(1);
  });

  it("navigates between pages and clamps to bounds", () => {
    const { result } = renderHook(() => usePagination(items, 15));

    act(() => result.current.nextPage());
    expect(result.current.page).toBe(2);
    expect(result.current.pageItems[0]).toBe(16);

    act(() => result.current.goToPage(99));
    expect(result.current.page).toBe(3);

    act(() => result.current.prevPage());
    expect(result.current.page).toBe(2);
  });
});
