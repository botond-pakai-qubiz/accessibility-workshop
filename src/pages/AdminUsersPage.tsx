import { useMemo, useState } from "react";
import type { User, UserRole } from "@/types";
import { useUsers } from "@/hooks/useUsers";
import { useSortableData } from "@/hooks/useSortableData";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { UsersTable, type UserSortKey } from "@/features/admin/UsersTable";
import { EditUserModal } from "@/features/admin/EditUserModal";

const PAGE_SIZE = 15;

const SORT_ACCESSORS: Record<UserSortKey, (user: User) => string> = {
  name: (user) => user.name.toLowerCase(),
  registeredAt: (user) => user.registeredAt,
};

export function AdminUsersPage() {
  const { users, updateUser, deleteUsers } = useUsers();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<User | null>(null);

  const { sorted, sort, toggleSort } = useSortableData<User, UserSortKey>(
    users,
    SORT_ACCESSORS,
    {
      key: "name",
      direction: "asc",
    },
  );
  const { page, pageCount, pageItems, goToPage } = usePagination(
    sorted,
    PAGE_SIZE,
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleDelete = () => {
    deleteUsers([...selectedIds]);
    setSelectedIds(new Set());
  };

  const handleSave = (
    id: string,
    changes: { name: string; role: UserRole },
  ) => {
    updateUser(id, changes);
  };

  const selectionCount = selectedIds.size;
  const rangeLabel = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE + 1;
    const end = Math.min(page * PAGE_SIZE, sorted.length);
    return `${start}–${end} of ${sorted.length}`;
  }, [page, sorted.length]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-800">
            Admin — users
          </div>
          <p className="text-sm text-slate-500">{rangeLabel} users</p>
        </div>
        {selectionCount > 0 && (
          <Button variant="danger" onClick={handleDelete}>
            Delete account{selectionCount > 1 ? "s" : ""} ({selectionCount})
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <UsersTable
          users={pageItems}
          selectedIds={selectedIds}
          sort={sort}
          onToggleSelect={toggleSelect}
          onToggleSort={toggleSort}
          onEdit={setEditing}
        />
        <Pagination page={page} pageCount={pageCount} onPageChange={goToPage} />
      </div>

      <EditUserModal
        user={editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
      />
    </div>
  );
}
