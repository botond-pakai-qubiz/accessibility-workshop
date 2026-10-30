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
          <h1 className="text-2xl font-semibold text-brand-600">Eventer</h1>
          <p className="text-sm text-slate-500">Log in to your account</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
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
            autoFocus
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

        <section className="mt-6 rounded-md bg-slate-50 p-3 text-xs text-slate-500" aria-label="Demo account credentials">
          <h2 className="mb-1 font-medium text-slate-600">Demo accounts</h2>
          <div>
            Admin: {DEMO_CREDENTIALS.admin.email} /{" "}
            {DEMO_CREDENTIALS.admin.password}
          </div>
          <div>
            User: {DEMO_CREDENTIALS.user.email} /{" "}
            {DEMO_CREDENTIALS.user.password}
          </div>
        </section>

        <div className="mt-4 text-center text-sm text-slate-500">
          No account?{" "}
          <Link
            to="/register"
            className="text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
