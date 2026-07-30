import { useCallback, useState } from "react";
import {
  getRegistrations,
  register as registerEvent,
} from "@/lib/repositories/registrationRepository";

export interface UseRegistrationsResult {
  registeredIds: string[];
  isRegistered: (eventId: string) => boolean;
  register: (eventId: string) => void;
}

/** Keeps the "My events" registration list in sync with localStorage. */
export function useRegistrations(): UseRegistrationsResult {
  const [registeredIds, setRegisteredIds] = useState<string[]>(() =>
    getRegistrations(),
  );

  const register = useCallback((eventId: string) => {
    setRegisteredIds(registerEvent(eventId));
  }, []);

  const isRegistered = useCallback(
    (eventId: string) => registeredIds.includes(eventId),
    [registeredIds],
  );

  return { registeredIds, isRegistered, register };
}
