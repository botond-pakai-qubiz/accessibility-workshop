import { useCallback, useState } from "react";
import type { User } from "@/types";
import {
  deleteUsers as deleteUsersFromStore,
  getUsers,
  updateUser as updateUserInStore,
} from "@/lib/repositories/userRepository";

export interface UseUsersResult {
  users: User[];
  updateUser: (id: string, changes: Partial<User>) => void;
  deleteUsers: (ids: readonly string[]) => void;
}

/** Loads users from storage and keeps the in-memory list in sync with edits. */
export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>(() => getUsers());

  const updateUser = useCallback((id: string, changes: Partial<User>) => {
    updateUserInStore(id, changes);
    setUsers(getUsers());
  }, []);

  const deleteUsers = useCallback((ids: readonly string[]) => {
    deleteUsersFromStore(ids);
    setUsers(getUsers());
  }, []);

  return { users, updateUser, deleteUsers };
}
