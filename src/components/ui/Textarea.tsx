import React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      disabled,
      required,
      id,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const textareaId =
      id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-medium text-zinc-800 select-none"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          required={required}
          className={cn(
            'w-full rounded-md bg-white border p-3 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors shadow-2xs resize-y min-h-[80px]',
            'focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950',
            'disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed',
            error
              ? 'border-red-400 focus:border-red-600 focus:ring-red-600/20'
              : 'border-zinc-200 hover:border-zinc-300',
            className
          )}
          {...props}
        />

        {error ? (
          <p className="text-xs text-red-600 font-normal">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-zinc-500 font-normal">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
