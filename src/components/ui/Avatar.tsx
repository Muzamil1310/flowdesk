import React, { useState } from 'react';
import { cn } from '../../lib/utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  name,
  size = 'md',
  status,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (text: string) => {
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeClasses: Record<AvatarSize, string> = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm font-semibold',
    xl: 'w-14 h-14 text-base font-semibold',
  };

  const statusSizeClasses: Record<AvatarSize, string> = {
    xs: 'w-1.5 h-1.5 ring-1',
    sm: 'w-2 h-2 ring-1.5',
    md: 'w-2.5 h-2.5 ring-2',
    lg: 'w-3 h-3 ring-2',
    xl: 'w-3.5 h-3.5 ring-2',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-zinc-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 rounded-full font-medium select-none overflow-visible',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full overflow-hidden border border-zinc-200/80 bg-zinc-100 text-zinc-700',
          sizeClasses[size]
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-white',
            statusSizeClasses[size],
            statusColors[status]
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
