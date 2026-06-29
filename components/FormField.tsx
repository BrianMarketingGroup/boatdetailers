import { forwardRef } from "react";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, required, error, hint, children, className }: FormFieldProps) {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-semibold text-navy">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
          {hint && <span className="ml-2 text-xs font-normal text-muted">({hint})</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-600" role="alert">{error}</p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={!!error}
      className={clsx(
        "w-full rounded-lg border bg-white px-4 py-3 text-sm text-dark placeholder-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal",
        error ? "border-red-400" : "border-sky-dark hover:border-teal/50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, rows = 3, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={!!error}
      className={clsx(
        "w-full rounded-lg border bg-white px-4 py-3 text-sm text-dark placeholder-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal resize-none",
        error ? "border-red-400" : "border-sky-dark hover:border-teal/50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={!!error}
        className={clsx(
          "w-full rounded-lg border bg-white px-4 py-3 pr-10 text-sm text-dark transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal appearance-none cursor-pointer",
          error ? "border-red-400" : "border-sky-dark hover:border-teal/50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
    </div>
  ),
);
Select.displayName = "Select";
