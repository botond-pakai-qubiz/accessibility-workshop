import type { User, UserRole } from "@/types";
import { USER_ROLES } from "@/types";

const FIRST_NAMES = [
  "Ava",
  "Liam",
  "Sofia",
  "Noah",
  "Mia",
  "Ethan",
  "Isla",
  "Lucas",
  "Emma",
  "Leo",
  "Nora",
  "Hugo",
  "Elena",
  "Max",
  "Clara",
  "Adam",
  "Lena",
  "Theo",
  "Ruby",
  "Felix",
  "Iris",
  "Oscar",
  "Maya",
  "Jonas",
  "Alba",
  "Victor",
  "Freya",
  "Milan",
  "Zoe",
  "Aaron",
  "Nina",
  "Bruno",
  "Lea",
  "Simon",
  "Vera",
  "Elias",
  "Tara",
  "David",
  "Anna",
  "Karl",
  "Emil",
  "Sara",
  "Jan",
  "Lily",
  "Marco",
];

const LAST_NAMES = [
  "Novak",
  "Popescu",
  "Ionescu",
  "Kovacs",
  "Muller",
  "Rossi",
  "Silva",
  "Nagy",
  "Horvath",
  "Weber",
  "Dubois",
  "Costa",
  "Marin",
  "Fischer",
  "Georgiev",
  "Petrov",
  "Lindqvist",
  "Andersen",
  "Kowalski",
  "Vasilev",
  "Moreau",
  "Bianchi",
  "Schneider",
  "Radev",
  "Toma",
  "Barbu",
  "Meyer",
  "Sokolov",
  "Jensen",
  "Almeida",
  "Ferrari",
  "Krause",
  "Dimitrov",
  "Lundgren",
  "Marek",
  "Stan",
  "Vogel",
  "Ilic",
  "Bauer",
  "Novotny",
  "Katz",
  "Voss",
  "Reid",
  "Bogdan",
  "Falk",
];

/** Deterministic pseudo-random generator so the seed is stable across reloads. */
function seededRole(index: number): UserRole {
  return USER_ROLES[index % USER_ROLES.length];
}

function isoDaysAgo(days: number): string {
  const date = new Date("2026-07-01T09:00:00.000Z");
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

/** 45 generated members, plus one admin and one regular demo account (47 total). */
export function buildSeedUsers(): User[] {
  const generated: User[] = Array.from({ length: 45 }, (_, index) => {
    const first = FIRST_NAMES[index % FIRST_NAMES.length];
    const last = LAST_NAMES[(index * 7) % LAST_NAMES.length];
    return {
      id: `user-${index + 1}`,
      name: `${first} ${last}`,
      email: `${first}.${last}`.toLowerCase() + `@example.com`,
      password: "password123",
      isAdmin: false,
      role: seededRole(index),
      registeredAt: isoDaysAgo((index * 11) % 400),
    };
  });

  const admin: User = {
    id: "user-admin",
    name: "Admin Ada",
    email: "admin@eventer.app",
    password: "admin123",
    isAdmin: true,
    role: "Organizer",
    registeredAt: isoDaysAgo(420),
  };

  const demo: User = {
    id: "user-demo",
    name: "Demo Dana",
    email: "demo@eventer.app",
    password: "demo123",
    isAdmin: false,
    role: "Attendee",
    registeredAt: isoDaysAgo(30),
  };

  return [admin, demo, ...generated];
}

/** Credentials surfaced on the login page so QAs can reach every area. */
export const DEMO_CREDENTIALS = {
  admin: { email: "admin@eventer.app", password: "admin123" },
  user: { email: "demo@eventer.app", password: "demo123" },
} as const;
