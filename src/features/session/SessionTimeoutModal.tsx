import { Modal } from "@/components/ui/Modal";

interface SessionTimeoutModalProps {
  open: boolean;
  secondsLeft: number;
  onStay: () => void;
  onLogout: () => void;
}

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
          <span
            onClick={onLogout}
            className="cursor-pointer px-4 py-2 text-sm text-slate-500 hover:text-slate-700"
          >
            Log out now
          </span>

          <span
            onClick={onStay}
            className="cursor-pointer rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            Stay signed in
          </span>
        </div>
      </div>
    </Modal>
  );
}
