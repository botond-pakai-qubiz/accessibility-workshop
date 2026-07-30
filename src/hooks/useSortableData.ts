import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

export interface SortState<K extends string> {
  key: K;
  direction: SortDirection;
}

export interface UseSortableDataResult<T, K extends string> {
  sorted: T[];
  sort: SortState<K> | null;
  toggleSort: (key: K) => void;
}

/**
 * Sorts a list by a configured set of accessor functions.
 *
 * Clicking the same key flips direction; a new key starts ascending.
 */
export function useSortableData<T, K extends string>(
  items: T[],
  accessors: Record<K, (item: T) => string | number>,
  initial: SortState<K> | null = null,
): UseSortableDataResult<T, K> {
  const [sort, setSort] = useState<SortState<K> | null>(initial);

  const sorted = useMemo(() => {
    if (!sort) {
      return items;
    }
    const accessor = accessors[sort.key];
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...items].sort((a, b) => {
      const aValue = accessor(a);
      const bValue = accessor(b);
      if (aValue < bValue) return -1 * factor;
      if (aValue > bValue) return 1 * factor;
      return 0;
    });
  }, [items, sort, accessors]);

  const toggleSort = (key: K) => {
    setSort((current) => {
      if (current?.key === key) {
        return { key, direction: current.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return { sorted, sort, toggleSort };
}
