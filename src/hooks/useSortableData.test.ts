import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useSortableData } from "./useSortableData";

interface Row {
  name: string;
  age: number;
}

const rows: Row[] = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
];

const accessors = {
  name: (row: Row) => row.name.toLowerCase(),
  age: (row: Row) => row.age,
};

describe("useSortableData", () => {
  it("returns the original order when no sort is set", () => {
    const { result } = renderHook(() => useSortableData(rows, accessors));
    expect(result.current.sorted.map((row) => row.name)).toEqual([
      "Charlie",
      "Alice",
      "Bob",
    ]);
  });

  it("sorts ascending then toggles to descending", () => {
    const { result } = renderHook(() => useSortableData(rows, accessors));

    act(() => result.current.toggleSort("name"));
    expect(result.current.sorted.map((row) => row.name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
    ]);

    act(() => result.current.toggleSort("name"));
    expect(result.current.sorted.map((row) => row.name)).toEqual([
      "Charlie",
      "Bob",
      "Alice",
    ]);
  });
});
