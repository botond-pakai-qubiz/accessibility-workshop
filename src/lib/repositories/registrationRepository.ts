import { STORAGE_KEYS, readValue, writeValue } from "@/lib/storage";

/** Registrations are stored as a flat list of event ids for the current device. */
export function getRegistrations(): string[] {
  return readValue<string[]>(STORAGE_KEYS.registrations, []);
}

export function isRegistered(eventId: string): boolean {
  return getRegistrations().includes(eventId);
}

export function register(eventId: string): string[] {
  const current = getRegistrations();
  if (current.includes(eventId)) {
    return current;
  }
  const next = [...current, eventId];
  writeValue(STORAGE_KEYS.registrations, next);
  return next;
}

export function unregister(eventId: string): string[] {
  const next = getRegistrations().filter((id) => id !== eventId);
  writeValue(STORAGE_KEYS.registrations, next);
  return next;
}
