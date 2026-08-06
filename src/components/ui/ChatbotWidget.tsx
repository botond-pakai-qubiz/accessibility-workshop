import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

/**
 * NOTE (workshop): this "Eva" support chatbot has intentionally planted chatbot
 * accessibility issues, based on
 * https://www.makethingsaccessible.com/guides/chatbots-and-web-accessibility-addressing-usability-issues-and-embracing-inclusive-design/
 */

const CANNED_REPLIES: { match: RegExp; reply: string }[] = [
  {
    match: /ticket|buy|book|payment|pay/i,
    reply:
      "You can buy tickets from any event's detail page using the Buy Ticket button. Need anything else?",
  },
  {
    match: /refund|cancel/i,
    reply:
      "Refunds are handled by the event organiser. Try contacting them from the event page.",
  },
  {
    match: /login|password|account|sign/i,
    reply:
      "You can sign in from the Login page. Use the demo accounts shown there if you're just exploring.",
  },
  {
    match: /event|when|where|date/i,
    reply:
      "Browse everything on the Events page — you can filter by category and date there.",
  },
];

function getReply(text: string): string {
  const found = CANNED_REPLIES.find((r) => r.match.test(text));
  return (
    found?.reply ??
    "Thanks for your message! One of our virtual assistants will get back to you shortly."
  );
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "bot",
      text: "Hi there! 👋 I'm Eva, your event assistant. How can I help?",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  // Pop-up appears on its own a moment after load, interrupting the user.
  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 10000);
    return () => window.clearTimeout(timer);
  }, []);

  // Keep the transcript scrolled to the newest message.
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }
    setMessages((prev) => [...prev, { from: "user", text }]);
    setDraft("");
    // Bot "thinks" and replies silently — no live-region announcement.
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: getReply(text) }]);
    }, 700);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand-500 px-4 py-3 text-white">
            <span className="text-sm font-semibold">Eva — Event Assistant</span>
            <span
              onClick={() => setOpen(false)}
              className="cursor-pointer text-lg leading-none"
            >
              ×
            </span>
          </div>

          <div
            ref={listRef}
            className="flex-1 space-y-2 overflow-y-auto px-3 py-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "bot"
                    ? "max-w-[80%] rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-300"
                    : "ml-auto max-w-[80%] rounded-lg bg-brand-500/90 px-3 py-2 text-sm text-white"
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-200 px-3 py-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  send();
                }
              }}
              placeholder="Type a message…"
              className="flex-1 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300"
            />
            <div
              onClick={send}
              className="cursor-pointer select-none rounded-md bg-brand-500 px-3 py-2 text-white"
            >
              ➤
            </div>
          </div>
        </div>
      )}

      <div
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-brand-500 text-2xl text-white shadow-lg hover:bg-brand-600"
      >
        💬
      </div>
    </div>
  );
}
