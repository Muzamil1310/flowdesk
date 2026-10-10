import React from 'react';
import { cn } from '../../lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

export const Divider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  label,
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn('inline-block w-px self-stretch bg-zinc-200/90 mx-2', className)}
        role="separator"
        aria-orientation="vertical"
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        className={cn('flex items-center w-full my-4 text-xs text-zinc-500', className)}
        role="separator"
        aria-orientation="horizontal"
        {...props}
      >
        <div className="flex-grow border-t border-zinc-200" />
        <span className="px-3 font-normal text-zinc-400 select-none">{label}</span>
        <div className="flex-grow border-t border-zinc-200" />
      </div>
    );
  }

  return (
    <hr
      className={cn('w-full border-t border-zinc-200 my-4', className)}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
};
