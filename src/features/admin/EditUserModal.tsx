import { useState } from "react";
import type { User, UserRole } from "@/types";
import { USER_ROLES } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { Dropdown } from "@/components/ui/Dropdown";

interface EditUserModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (id: string, changes: { name: string; role: UserRole }) => void;
}

const ROLE_OPTIONS = USER_ROLES.map((role) => ({ label: role, value: role }));

export function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [name, setName] = useState(user?.name ?? "");
  const [role, setRole] = useState<UserRole>(user?.role ?? "Attendee");

  if (!user) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(user.id, { name: name.trim(), role });
    onClose();
  };

  return (
    <Modal open title={`Edit ${user.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">Role</span>
          <Dropdown options={ROLE_OPTIONS} value={role} onChange={setRole} />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Modal>
  );
}
