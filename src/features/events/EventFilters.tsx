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
    <div className="flex flex-wrap items-end gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-500">Search</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search events"
          className="w-64 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400"
        />
      </div>

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
          className="cursor-pointer rounded pb-2 text-sm text-slate-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          ✕
        </span>
      )}
    </div>
  );
}
