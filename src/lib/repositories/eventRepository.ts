import type { EventItem, NewEventInput } from "@/types";
import { STORAGE_KEYS, readValue, writeValue } from "@/lib/storage";
import { createId } from "@/lib/id";

export function getEvents(): EventItem[] {
  return readValue<EventItem[]>(STORAGE_KEYS.events, []);
}

export function saveEvents(events: EventItem[]): void {
  writeValue(STORAGE_KEYS.events, events);
}

export function findEventById(id: string | undefined): EventItem | undefined {
  if (!id) {
    return undefined;
  }
  return getEvents().find((event) => event.id === id);
}

export function addEvent(input: NewEventInput): EventItem {
  const event: EventItem = {
    ...input,
    id: createId("evt"),
    paymentOutcome: "success",
  };
  saveEvents([event, ...getEvents()]);
  return event;
}
