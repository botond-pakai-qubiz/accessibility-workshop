import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Credentials, PublicUser, RegisterInput, User } from "@/types";
import { createId } from "@/lib/id";
import { validateRegister, hasErrors } from "@/lib/validation";
import { addUser, findUserByEmail } from "@/lib/repositories/userRepository";
import {
  clearSession,
  getSession,
  setSession,
} from "@/lib/repositories/sessionRepository";
import {
  AuthContext,
  type AuthContextValue,
  type AuthResult,
} from "./auth-context";

function toPublicUser(user: User): PublicUser {
  const { password: _password, ...rest } = user;
  return rest;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(() =>
    getSession(),
  );

  const login = useCallback(({ email, password }: Credentials): AuthResult => {
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    const publicUser = toPublicUser(user);
    setSession(publicUser);
    setCurrentUser(publicUser);
    return { ok: true };
  }, []);

  const register = useCallback((input: RegisterInput): AuthResult => {
    const validation = validateRegister(input);
    if (hasErrors(validation)) {
      return { ok: false, error: "Please fix the highlighted fields." };
    }
    if (findUserByEmail(input.email)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const user: User = {
      id: createId("user"),
      name: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
      isAdmin: input.isAdmin,
      role: "Attendee",
      registeredAt: new Date().toISOString(),
    };
    addUser(user);

    const publicUser = toPublicUser(user);
    setSession(publicUser);
    setCurrentUser(publicUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setCurrentUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isAuthenticated: currentUser !== null,
      isAdmin: currentUser?.isAdmin ?? false,
      login,
      register,
      logout,
    }),
    [currentUser, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
