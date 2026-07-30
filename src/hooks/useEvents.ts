import { useState } from "react";
import type { EventItem } from "@/types";
import { getEvents } from "@/lib/repositories/eventRepository";

/** Loads the events list from storage once for the current view. */
export function useEvents(): EventItem[] {
  const [events] = useState<EventItem[]>(() => getEvents());
  return events;
}
