import type { User } from "@/types";
import { STORAGE_KEYS, readValue, writeValue } from "@/lib/storage";

export function getUsers(): User[] {
  return readValue<User[]>(STORAGE_KEYS.users, []);
}

export function saveUsers(users: User[]): void {
  writeValue(STORAGE_KEYS.users, users);
}

export function findUserByEmail(email: string): User | undefined {
  const normalized = email.trim().toLowerCase();
  return getUsers().find((user) => user.email.toLowerCase() === normalized);
}

export function addUser(user: User): void {
  saveUsers([...getUsers(), user]);
}

export function updateUser(
  id: string,
  changes: Partial<User>,
): User | undefined {
  const users = getUsers();
  let updated: User | undefined;
  const next = users.map((user) => {
    if (user.id !== id) {
      return user;
    }
    updated = { ...user, ...changes, id: user.id };
    return updated;
  });
  saveUsers(next);
  return updated;
}

export function deleteUsers(ids: readonly string[]): void {
  const toRemove = new Set(ids);
  saveUsers(getUsers().filter((user) => !toRemove.has(user.id)));
}
