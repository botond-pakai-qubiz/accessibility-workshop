import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Lightweight modal.
 *
 * NOTE (workshop): this modal intentionally does not manage focus — focus is
 * not moved into the dialog on open, it is not trapped, Escape does not close
 * it, the background is not inert, and focus is not restored to the trigger on
 * close. The title is a styled text node rather than a heading, and there is no
 * dialog semantics. These are the planted accessibility issues.
 */
export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="w-full max-w-lg rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <span className="text-lg font-semibold text-slate-800">{title}</span>
          <span
            onClick={onClose}
            className="cursor-pointer text-xl leading-none text-slate-400 hover:text-slate-600"
          >
            ×
          </span>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
