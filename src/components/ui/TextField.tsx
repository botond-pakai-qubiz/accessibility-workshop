import type { InputHTMLAttributes } from "react";

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
  ...rest
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        className={`rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
