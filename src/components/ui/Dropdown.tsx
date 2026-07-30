import { useEffect, useRef, useState } from "react";

export interface DropdownOption<T extends string> {
  label: string;
  value: T;
}

interface DropdownProps<T extends string> {
  options: DropdownOption<T>[];
  value: T | "";
  onChange: (value: T) => void;
  placeholder?: string;
}

/**
 * Custom dropdown built from <div>s.
 *
 * NOTE (workshop): this is deliberately a mouse-only widget. The trigger is a
 * div that toggles on click, with no keyboard handlers and no listbox
 * semantics, so it cannot be opened or operated with the keyboard. This is one
 * of the required planted issues.
 */
export function Dropdown<T extends string>({
  options,
  value,
  onChange,
  placeholder = "Select…",
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selected = options.find((option) => option.value === value);

  const handleSelect = (next: T) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-56">
      <div
        onClick={() => setOpen((current) => !current)}
        className="flex cursor-pointer items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
      >
        <span className={selected ? "" : "text-slate-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="text-slate-400">▾</span>
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="cursor-pointer px-3 py-2 text-sm text-slate-700 hover:bg-brand-50"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
