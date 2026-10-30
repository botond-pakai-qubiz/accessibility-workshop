import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { SessionTimeoutModal } from "@/features/session/SessionTimeoutModal";

// After logout + navigate("/login"), the component now waits for 
// the login page to render and focuses the email input field.

export function SessionTimeoutManager() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const justLoggedOutRef = useRef(false);

  const handleExpire = useCallback(() => {
    logout();
    navigate("/login"); 
    justLoggedOutRef.current = true;
  }, [logout, navigate]);

  useEffect(() => {
    if (justLoggedOutRef.current) {
      justLoggedOutRef.current = false;
      const emailInput = document.querySelector<HTMLInputElement>(
        'input[type="email"]',
      );
      if (emailInput) {
        emailInput.focus();
      }
    }
  });

  const { showWarning, secondsLeft, stayLoggedIn } =
    useSessionTimeout(handleExpire);

  return (
    <SessionTimeoutModal
      open={showWarning}
      secondsLeft={secondsLeft}
      onStay={stayLoggedIn}
      onLogout={handleExpire}
    />
  );
}
