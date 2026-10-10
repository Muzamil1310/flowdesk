import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-medium rounded border transition-colors select-none tracking-tight whitespace-nowrap shrink-0';

  const variants: Record<BadgeVariant, string> = {
    neutral: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
    accent: 'bg-blue-50 text-blue-700 border-blue-200 font-medium',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    outline: 'bg-transparent text-zinc-700 border-zinc-300',
  };

  const sizes: Record<BadgeSize, string> = {
    sm: 'text-[11px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-0.5 gap-1.5',
  };

  const dotColors: Record<BadgeVariant, string> = {
    neutral: 'bg-zinc-500',
    accent: 'bg-blue-600',
    success: 'bg-emerald-600',
    warning: 'bg-amber-600',
    error: 'bg-red-600',
    outline: 'bg-zinc-400',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
