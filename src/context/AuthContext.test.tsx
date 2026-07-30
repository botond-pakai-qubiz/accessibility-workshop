import { describe, expect, it, beforeEach } from "vitest";
import type { ReactNode } from "react";
import { act, renderHook } from "@testing-library/react";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { ensureSeedData } from "@/lib/seed";
import { DEMO_CREDENTIALS } from "@/data/seedUsers";

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe("AuthContext", () => {
  beforeEach(() => {
    ensureSeedData();
  });

  it("logs in a seeded user with valid credentials", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    let outcome = { ok: false } as { ok: boolean };
    act(() => {
      outcome = result.current.login(DEMO_CREDENTIALS.user);
    });

    expect(outcome.ok).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isAdmin).toBe(false);
  });

  it("flags the admin account as admin", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login(DEMO_CREDENTIALS.admin);
    });
    expect(result.current.isAdmin).toBe(true);
  });

  it("rejects invalid credentials", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let outcome = { ok: true } as { ok: boolean };
    act(() => {
      outcome = result.current.login({
        email: "demo@eventer.app",
        password: "wrong",
      });
    });
    expect(outcome.ok).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("registers a new account and signs the user in", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.register({
        name: "New Person",
        email: "new.person@example.com",
        password: "secret1",
        confirmPassword: "secret1",
        isAdmin: false,
      });
    });
    expect(result.current.currentUser?.email).toBe("new.person@example.com");
  });

  it("logs out", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login(DEMO_CREDENTIALS.user);
    });
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
  });
});
