import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      options,
      placeholder,
      disabled,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const selectId =
      id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium text-zinc-800 select-none"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            className={cn(
              'w-full h-9 appearance-none rounded-md bg-white border px-3 pr-9 text-sm text-zinc-950 transition-colors shadow-2xs cursor-pointer',
              'focus:outline-none focus:ring-2 focus:ring-zinc-950/20 focus:border-zinc-950',
              'disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed',
              error
                ? 'border-red-400 focus:border-red-600 focus:ring-red-600/20'
                : 'border-zinc-200 hover:border-zinc-300',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-3 w-4 h-4 text-zinc-400 pointer-events-none"
            aria-hidden="true"
          />
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

Select.displayName = 'Select';
