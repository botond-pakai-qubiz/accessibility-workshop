import type { User } from "@/types";
import type { SortState } from "@/hooks/useSortableData";
import { formatDate } from "@/lib/format";

export type UserSortKey = "name" | "registeredAt";

interface UsersTableProps {
  users: User[];
  selectedIds: Set<string>;
  sort: SortState<UserSortKey> | null;
  onToggleSelect: (id: string) => void;
  onToggleSort: (key: UserSortKey) => void;
  onEdit: (user: User) => void;
}

function sortIndicator(
  sort: SortState<UserSortKey> | null,
  key: UserSortKey,
): string {
  if (sort?.key !== key) {
    return "";
  }
  return sort.direction === "asc" ? " ▲" : " ▼";
}

export function UsersTable({
  users,
  selectedIds,
  sort,
  onToggleSelect,
  onToggleSort,
  onEdit,
}: UsersTableProps) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-slate-200 text-left text-slate-500">
          <th className="w-10 px-3 py-2"></th>
          <th className="px-3 py-2">
            <span
              onClick={() => onToggleSort("name")}
              className="cursor-pointer font-medium hover:text-slate-700"
            >
              Name{sortIndicator(sort, "name")}
            </span>
          </th>
          <th className="px-3 py-2 font-medium">Email</th>
          <th className="px-3 py-2 font-medium">Role</th>
          <th className="px-3 py-2">
            <span
              onClick={() => onToggleSort("registeredAt")}
              className="cursor-pointer font-medium hover:text-slate-700"
            >
              Registered{sortIndicator(sort, "registeredAt")}
            </span>
          </th>
          <th className="w-12 px-3 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className="border-b border-slate-100 hover:bg-slate-50"
          >
            <td className="px-3 py-2">
              <input
                type="checkbox"
                checked={selectedIds.has(user.id)}
                onChange={() => onToggleSelect(user.id)}
              />
            </td>
            <td className="px-3 py-2 font-medium text-slate-800">
              {user.name}
            </td>
            <td className="px-3 py-2 text-slate-500">{user.email}</td>
            <td className="px-3 py-2 text-slate-500">{user.role}</td>
            <td className="px-3 py-2 text-slate-500">
              {formatDate(user.registeredAt)}
            </td>
            <td className="px-3 py-2">
              <button
                type="button"
                onClick={() => onEdit(user)}
                className="cursor-pointer rounded p-1 text-slate-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                aria-label={`Edit ${user.name}`}
              >
                ✎
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
