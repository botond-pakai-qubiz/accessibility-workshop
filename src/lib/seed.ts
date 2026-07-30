import { buildSeedEvents } from "@/data/seedEvents";
import { buildSeedUsers } from "@/data/seedUsers";
import { STORAGE_KEYS, hasValue, removeValue } from "@/lib/storage";
import { saveEvents } from "@/lib/repositories/eventRepository";
import { saveUsers } from "@/lib/repositories/userRepository";

/** Seeds users and events on first load only; existing data is left untouched. */
export function ensureSeedData(): void {
  if (!hasValue(STORAGE_KEYS.users)) {
    saveUsers(buildSeedUsers());
  }
  if (!hasValue(STORAGE_KEYS.events)) {
    saveEvents(buildSeedEvents());
  }
}

/** Wipes all app data and reseeds it — used by the hidden "Reset data" control. */
export function resetSeedData(): void {
  removeValue(STORAGE_KEYS.registrations);
  removeValue(STORAGE_KEYS.session);
  saveUsers(buildSeedUsers());
  saveEvents(buildSeedEvents());
}
