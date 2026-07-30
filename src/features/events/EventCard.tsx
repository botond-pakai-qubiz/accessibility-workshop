import type { EventItem } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";

interface EventCardProps {
  event: EventItem;
  onOpen?: (eventId: string) => void;
  badge?: string;
}

/**
 * NOTE (workshop): the whole card is a clickable <div> (not a link or button),
 * so it is not focusable or keyboard-operable, and the image has no alt text.
 * Planted issues.
 */
export function EventCard({ event, onOpen, badge }: EventCardProps) {
  const clickable = typeof onOpen === "function";

  return (
    <div
      onClick={clickable ? () => onOpen?.(event.id) : undefined}
      className={`flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white ${
        clickable ? "cursor-pointer hover:border-brand-300 hover:shadow-md" : ""
      }`}
    >
      <div className="relative">
        <img src={event.image} className="h-36 w-full object-cover" />
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
        <div className="text-xs text-slate-400">{event.location}</div>
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
