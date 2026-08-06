import { useCallback, useEffect, useRef, useState } from "react";
import { SESSION_TIMEOUT_MS, WARNING_BEFORE_MS } from "@/lib/session-timeout";

export interface UseSessionTimeoutResult {
  showWarning: boolean;
  secondsLeft: number;
  stayLoggedIn: () => void;
}

export function useSessionTimeout(
  onExpire: () => void,
): UseSessionTimeoutResult {
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    Math.round(WARNING_BEFORE_MS / 1000),
  );

  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const clearAllTimers = useCallback(() => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);
  }, []);

  const startTimers = useCallback(() => {
    clearAllTimers();
    setShowWarning(false);

    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      setSecondsLeft(Math.round(WARNING_BEFORE_MS / 1000));

      countdownIntervalRef.current = setInterval(() => {
        setSecondsLeft((s) => Math.max(0, s - 1));
      }, 1000);
    }, SESSION_TIMEOUT_MS - WARNING_BEFORE_MS);

    logoutTimerRef.current = setTimeout(() => {
      clearAllTimers();
      setShowWarning(false);
      onExpireRef.current();
    }, SESSION_TIMEOUT_MS);
  }, [clearAllTimers]);

  const stayLoggedIn = useCallback(() => {
    startTimers();
  }, [startTimers]);

  useEffect(() => {
    startTimers();

    const handleActivity = () => startTimers();
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("mousedown", handleActivity);

    return () => {
      clearAllTimers();
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("mousedown", handleActivity);
    };
  }, [startTimers, clearAllTimers]);

  return { showWarning, secondsLeft, stayLoggedIn };
}
