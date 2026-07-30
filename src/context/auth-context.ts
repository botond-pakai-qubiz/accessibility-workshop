import { createContext } from 'react';
import type { Credentials, PublicUser, RegisterInput } from '@/types';

export interface AuthResult {
  ok: boolean;
  error?: string;
}

export interface AuthContextValue {
  currentUser: PublicUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: Credentials) => AuthResult;
  register: (input: RegisterInput) => AuthResult;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
