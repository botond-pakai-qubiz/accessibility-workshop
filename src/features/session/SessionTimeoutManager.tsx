import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { SessionTimeoutModal } from "@/features/session/SessionTimeoutModal";

export function SessionTimeoutManager() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleExpire = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

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
