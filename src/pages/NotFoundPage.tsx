import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="text-5xl font-bold text-slate-300">404</div>
      <div className="text-lg font-semibold text-slate-700">
        This page could not be found
      </div>
      <div className="text-sm text-slate-400">
        The page you are looking for might have been moved or never existed.
      </div>
      <Link
        to="/dashboard"
        className="mt-2 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
