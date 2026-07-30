/**
 * Thin, typed wrapper around `localStorage`.
 *
 * All persistence in the app goes through these helpers so reads/writes are
 * consistent, JSON-safe and easy to stub in tests.
 */

export const STORAGE_KEYS = {
  users: "aw_users",
  events: "aw_events",
  registrations: "aw_registrations",
  session: "aw_session",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function readValue<T>(key: StorageKey, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeValue<T>(key: StorageKey, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeValue(key: StorageKey): void {
  window.localStorage.removeItem(key);
}

export function hasValue(key: StorageKey): boolean {
  return window.localStorage.getItem(key) !== null;
}
