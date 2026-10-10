import React from 'react';
import { cn } from '../../lib/utils';

export interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className,
  showWordmark = true,
  size = 'md',
}) => {
  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
  }[size];

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }[size];

  return (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      {/* Minimal geometric glyph: Dark neutral surface with clean typographic flow notch */}
      <div
        className={cn(
          'flex items-center justify-center rounded-md bg-zinc-950 text-white shrink-0 transition-transform duration-150',
          iconSizeClasses
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-zinc-100"
        >
          {/* Crisp minimal geometric flow icon */}
          <path d="M4 7h16" />
          <path d="M4 12h11" />
          <path d="M4 17h7" />
        </svg>
      </div>

      {showWordmark && (
        <span
          className={cn(
            'font-bold tracking-tight text-zinc-950 font-sans whitespace-nowrap shrink-0',
            textSizeClasses
          )}
        >
          FlowDesk
        </span>
      )}
    </div>
  );
};
