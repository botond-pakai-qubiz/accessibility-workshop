import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { DEMO_CREDENTIALS } from "@/data/seedUsers";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = login({ email, password });
    if (result.ok) {
      navigate("/dashboard");
    } else {
      setError(result.error ?? "Unable to log in.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="text-2xl font-semibold text-brand-600">Eventer</div>
          <div className="text-sm text-slate-400">Log in to your account</div>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Button type="submit" className="mt-2 w-full">
            Log in
          </Button>
        </form>

        <div className="mt-6 rounded-md bg-slate-50 p-3 text-xs text-slate-500">
          <div className="mb-1 font-medium text-slate-600">Demo accounts</div>
          <div>
            Admin: {DEMO_CREDENTIALS.admin.email} /{" "}
            {DEMO_CREDENTIALS.admin.password}
          </div>
          <div>
            User: {DEMO_CREDENTIALS.user.email} /{" "}
            {DEMO_CREDENTIALS.user.password}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-slate-500">
          No account?{" "}
          <Link to="/register" className="text-brand-600 hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
