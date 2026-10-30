import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface SessionTimeoutModalProps {
  open: boolean;
  secondsLeft: number;
  onStay: () => void;
  onLogout: () => void;
}

// Replaced spans with Button elements for better accessibility and keyboard navigation.
export function SessionTimeoutModal({
  open,
  secondsLeft,
  onStay,
  onLogout,
}: SessionTimeoutModalProps) {
  return (
    <Modal open={open} title="Session expiring" onClose={onStay}>
      <div className="flex flex-col gap-4">
        <p className="text-slate-700">
          You have been inactive. For your security, you will be automatically
          signed out in:
        </p>

        <div className="text-center text-3xl font-bold text-red-600">
          {secondsLeft}s
        </div>

        <p className="text-sm text-slate-500">
          Move your mouse or click below to stay signed in.
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onLogout}>
            Log out now
          </Button>

          <Button onClick={onStay}>
            Stay signed in
          </Button>
        </div>
      </div>
    </Modal>
  );
}
