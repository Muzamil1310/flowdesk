import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-zinc-800 select-none"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-zinc-400">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            className={cn(
              'w-full h-9 rounded-md bg-white border px-3 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors shadow-2xs',
              'focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950',
              'disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed',
              Boolean(startIcon) ? 'pl-9' : '',
              Boolean(endIcon) ? 'pr-9' : '',
              error
                ? 'border-red-400 focus:border-red-600 focus:ring-red-600/20'
                : 'border-zinc-200 hover:border-zinc-300',
              className
            )}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-zinc-400">
              {endIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-xs text-red-600 font-normal">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-zinc-500 font-normal">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
