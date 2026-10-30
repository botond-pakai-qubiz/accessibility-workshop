import { useMemo } from "react";
import type { InputHTMLAttributes } from "react";
import { createId } from "@/lib/id";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Basic labelled text input used across the forms.
 */
export function TextField({
  label,
  error,
  className = "",
  id,
  ...rest
}: TextFieldProps) {
  const inputId = useMemo(
    () => id ?? `textfield-${createId("")}`,
    [id],
  );
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${className}`}
        {...rest}
      />
      {error && (
        <span
          id={errorId}
          className="text-xs text-red-500"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}
