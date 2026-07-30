import { useMemo, useState } from "react";

export interface UsePaginationResult<T> {
  page: number;
  pageCount: number;
  pageItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

/** Client-side pagination over an in-memory list. */
export function usePagination<T>(
  items: T[],
  pageSize: number,
): UsePaginationResult<T> {
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, pageCount);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(1, next), pageCount));
  };

  return {
    page: safePage,
    pageCount,
    pageItems,
    goToPage,
    nextPage: () => goToPage(safePage + 1),
    prevPage: () => goToPage(safePage - 1),
  };
}
