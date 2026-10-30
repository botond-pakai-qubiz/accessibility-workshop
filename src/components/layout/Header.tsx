import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const openMenu = useCallback(() => setAdminMenuOpen(true), []);
  const closeMenu = useCallback(() => setAdminMenuOpen(false), []);
  const toggleMenu = useCallback(
    () => setAdminMenuOpen((v) => !v),
    [],
  );

  // Close menu when clicking outside
  useEffect(() => {
    if (!adminMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (
        (trigger && !trigger.contains(target)) &&
        (menu && !menu.contains(target))
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [adminMenuOpen, closeMenu]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
      // When opening, focus the first menu item after render
      if (!adminMenuOpen) {
        requestAnimationFrame(() => {
          const firstItem = menuRef.current?.querySelector('[role="menuitem"]');
          (firstItem as HTMLElement)?.focus();
        });
      }
    }
    if (e.key === "Tab" && adminMenuOpen) {
      // Tab from trigger opens menu and focuses first item
      e.preventDefault();
      openMenu();
      requestAnimationFrame(() => {
        const firstItem = menuRef.current?.querySelector('[role="menuitem"]');
        (firstItem as HTMLElement)?.focus();
      });
    }
    if (e.key === "Escape" && adminMenuOpen) {
      e.preventDefault();
      closeMenu();
    }
  };

  const handleMenuItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      triggerRef.current?.focus();
    }
  };

  return (
    <nav className="border-b border-slate-200 bg-white" aria-label="Main navigation">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded px-1"
        >
          <span className="text-2xl">◆</span>
          <span className="text-lg font-semibold">Eventer</span>
        </Link>

        <div className="flex items-center gap-5 text-sm">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="rounded px-1 py-0.5 text-slate-600 hover:text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Dashboard
              </Link>
              <Link
                to="/events"
                className="rounded px-1 py-0.5 text-slate-600 hover:text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Events
              </Link>
            </>
          )}
          {isAdmin && (
            <div className="relative">
              <button
                ref={triggerRef}
                type="button"
                onClick={toggleMenu}
                onKeyDown={handleTriggerKeyDown}
                className="cursor-pointer rounded px-1 py-0.5 text-slate-600 hover:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                aria-expanded={adminMenuOpen}
                aria-controls="admin-menu"
              >
                Admin
              </button>
              {adminMenuOpen && (
                <>
                  <div
                    id="admin-menu"
                    ref={menuRef}
                    className="absolute right-0 top-full z-20 w-32 pt-2"
                    role="menu"
                    onKeyDown={handleMenuItemKeyDown}
                  >
                    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
                      <Link
                        to="/admin/users"
                        onClick={() => closeMenu()}
                        role="menuitem"
                        tabIndex={adminMenuOpen ? 0 : -1}
                        className="block px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
                      >
                        Users
                      </Link>
                      <Link
                        to="/admin/events"
                        onClick={() => closeMenu()}
                        role="menuitem"
                        tabIndex={adminMenuOpen ? 0 : -1}
                        className="block px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600 focus:bg-brand-50 focus:text-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
                      >
                        Events
                      </Link>
                    </div>
                  </div>
                  {/* Live region for screen reader announcements */}
                  <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="sr-only"
                  >
                    {adminMenuOpen
                      ? "Admin menu opened. To explore the dropdown options, press tab. If not, press the tab button to jump to the next element."
                      : "Admin menu closed."}
                  </div>
                </>
              )}
            </div>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="font-medium text-slate-600">{currentUser?.name}</span>
              <button
                type="button"
                onClick={handleLogout}
                tabIndex={0}
                className="rounded bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                aria-label="Log out"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded px-1 py-0.5 text-slate-600 hover:text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded bg-brand-500 px-3 py-1.5 text-white hover:bg-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
