import { useState } from "react";
import type { EventItem } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { formatCurrency } from "@/lib/format";

export interface PaymentResult {
  type: "success" | "error";
  text: string;
}

interface BuyTicketModalProps {
  open: boolean;
  event: EventItem;
  result: PaymentResult | null;
  onClose: () => void;
  onPay: () => void;
}

export function BuyTicketModal({
  open,
  event,
  result,
  onClose,
  onPay,
}: BuyTicketModalProps) {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = (formEvent: React.FormEvent) => {
    formEvent.preventDefault();
    onPay();
  };

  return (
    <Modal open={open} title={`Buy ticket — ${event.name}`} onClose={onClose}>
      {result && (
        <div
          className={`mb-4 rounded-md px-3 py-2 text-sm ${
            result.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {result.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={card}
          onChange={(e) => setCard(e.target.value)}
          placeholder="Card number"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400"
        />
        <TextField
          label="Name on card"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM/YY"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400"
          />
          <input
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="CVC"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm text-slate-500">Total</span>
          <span className="text-lg font-semibold text-slate-800">
            {formatCurrency(event.price)}
          </span>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Pay now</Button>
        </div>
      </form>
    </Modal>
  );
}
