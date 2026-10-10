import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  bordered?: boolean;
  background?: 'canvas' | 'surface' | 'subtle';
}

export const Section: React.FC<SectionProps> = ({
  className,
  spacing = 'lg',
  bordered = false,
  background = 'canvas',
  children,
  ...props
}) => {
  const spacingClasses = {
    none: 'py-0',
    sm: 'py-8 sm:py-10',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-20',
    xl: 'py-20 sm:py-28',
  }[spacing];

  const bgClasses = {
    canvas: 'bg-[#FAFAFA]',
    surface: 'bg-white',
    subtle: 'bg-zinc-100/50',
  }[background];

  return (
    <section
      className={cn(
        'w-full relative',
        spacingClasses,
        bgClasses,
        bordered && 'border-b border-zinc-200/80',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
