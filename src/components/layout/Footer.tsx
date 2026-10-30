import { useNavigate } from "react-router-dom";
import { resetSeedData } from "@/lib/seed";

export function Footer() {
  const navigate = useNavigate();

  // Hidden facilitator convenience: wipes localStorage and reseeds demo data.
  const handleReset = () => {
    resetSeedData();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-xs text-slate-500">
        <span>© 2026 Eventer — a demo app for the accessibility workshop.</span>
        <button
          type="button"
          onClick={handleReset}
          className="cursor-pointer rounded px-1 text-slate-500 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          title="Reset demo data"
        >
          reset
        </button>
      </div>
    </div>
  );
}
