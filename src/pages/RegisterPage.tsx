import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterInput } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { validateRegister, type ValidationErrors } from "@/lib/validation";

const EMPTY_FORM: RegisterInput = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAdmin: false,
};

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<ValidationErrors<RegisterInput>>({});
  const [formError, setFormError] = useState("");

  const update = <K extends keyof RegisterInput>(
    key: K,
    value: RegisterInput[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateRegister(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    const result = register(form);
    if (result.ok) {
      navigate("/dashboard");
    } else {
      setFormError(result.error ?? "Unable to create the account.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-brand-600">
            Create your account
          </h1>
          <p className="text-sm text-slate-500">
            Join Eventer in a few seconds
          </p>
        </div>

        {formError && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Full name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Full name"
            error={errors.name}
            autoFocus
          />

          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            error={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="At least 6 characters"
            error={errors.password}
          />
          <TextField
            label="Confirm password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            placeholder="Repeat your password"
            error={errors.confirmPassword}
          />

          <div
            className="flex cursor-pointer items-center gap-2 text-sm text-slate-600"
            onClick={() => update("isAdmin", !form.isAdmin)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                update("isAdmin", !form.isAdmin);
              }
            }}
            role="checkbox"
            aria-checked={form.isAdmin}
            tabIndex={0}
          >
            <input type="checkbox" checked={form.isAdmin} readOnly />
            <span>Register as an administrator</span>
          </div>

          <Button type="submit" className="mt-2 w-full">
            Create account
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
