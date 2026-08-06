import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-brand-600"
        >
          <span className="text-2xl">◆</span>
          <span className="text-lg font-semibold">Eventer</span>
        </Link>

        <div className="flex items-center gap-5 text-sm">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="text-slate-600 hover:text-brand-600"
              >
                Dashboard
              </Link>
              <Link
                to="/events"
                className="text-slate-600 hover:text-brand-600"
              >
                Events
              </Link>
            </>
          )}
          {isAdmin && (
            <div
              className="relative"
              onMouseEnter={() => setAdminMenuOpen(true)}
              onMouseLeave={() => setAdminMenuOpen(false)}
            >
              <span className="cursor-pointer text-slate-600 hover:text-brand-600">
                Admin
              </span>
              {adminMenuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-32 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
                  <Link
                    to="/admin/users"
                    onClick={() => setAdminMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/events"
                    onClick={() => setAdminMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600"
                  >
                    Events
                  </Link>
                </div>
              )}
            </div>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-slate-400">{currentUser?.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-brand-600">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded bg-brand-500 px-3 py-1.5 text-white hover:bg-brand-600"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
