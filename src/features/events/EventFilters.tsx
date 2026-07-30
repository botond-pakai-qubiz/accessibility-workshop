import { Dropdown } from "@/components/ui/Dropdown";

interface EventFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  locations: string[];
}

export function EventFilters({
  search,
  onSearchChange,
  location,
  onLocationChange,
  locations,
}: EventFiltersProps) {
  const locationOptions = locations.map((value) => ({ label: value, value }));

  return (
    <div className="flex flex-wrap items-center gap-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search events"
        className="w-64 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400"
      />

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-500">Location</span>
        <Dropdown
          options={locationOptions}
          value={location}
          onChange={onLocationChange}
          placeholder="All locations"
        />
      </div>

      {(search || location) && (
        <span
          onClick={() => {
            onSearchChange("");
            onLocationChange("");
          }}
          className="cursor-pointer text-sm text-slate-400 hover:text-slate-600"
        >
          ✕
        </span>
      )}
    </div>
  );
}
