import type { PublicUser } from "@/types";
import {
  STORAGE_KEYS,
  readValue,
  removeValue,
  writeValue,
} from "@/lib/storage";

export function getSession(): PublicUser | null {
  return readValue<PublicUser | null>(STORAGE_KEYS.session, null);
}

export function setSession(user: PublicUser): void {
  writeValue(STORAGE_KEYS.session, user);
}

export function clearSession(): void {
  removeValue(STORAGE_KEYS.session);
}
