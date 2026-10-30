import type { EventItem } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";

interface EventCardProps {
  event: EventItem;
  onOpen?: (eventId: string) => void;
  onDismiss?: (eventId: string) => void;
  badge?: string;
}

export function EventCard({ event, onOpen, onDismiss, badge }: EventCardProps) {
  const clickable = typeof onOpen === "function";

  return (
    <div
      onClick={clickable ? () => onOpen?.(event.id) : undefined}
      className={`relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white ${
        clickable ? "cursor-pointer hover:border-brand-300 hover:shadow-md" : ""
      }`}
    >
      {onDismiss && (
        <button
          type="button"
          onClick={() => onDismiss(event.id)}
          className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/60 text-white hover:bg-slate-900/80"
        >
          ×
        </button>
      )}
      <div className="relative">
        <img src={event.image} alt={event.name} className="h-36 w-full object-cover" />
        {badge && (
          <span className="absolute left-2 top-2 rounded bg-brand-500 px-2 py-0.5 text-xs font-medium text-white">
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-base font-semibold text-slate-800">
          {event.name}
        </div>
        <div className="text-xs text-slate-500">{event.location}</div>
        <div className="text-xs text-slate-500">
          {formatDate(event.startDateTime)}
        </div>
        <div className="mt-auto pt-2 text-sm font-medium text-brand-600">
          {formatCurrency(event.price)}
        </div>
      </div>
    </div>
  );
}
