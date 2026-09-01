import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

export function Input({ label, error, className, id, required, ...props }: InputProps) {
  const inputId = id ?? `input-${String(props.name ?? "")}`;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
        {required ? <span aria-hidden className="text-brand-600"> *</span> : null}
      </label>
      <input
        id={inputId}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          "w-full rounded-lg border bg-white px-4 py-2.5 text-base text-ink-900 transition-colors",
          "focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20",
          error ? "border-error" : "border-gray-200",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
