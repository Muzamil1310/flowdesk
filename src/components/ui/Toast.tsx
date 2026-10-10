import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ToastProps {
  message: string | null;
  onClose: () => void;
  type?: 'success' | 'info' | 'error';
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  type = 'success',
  duration = 3800,
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center gap-3 p-3.5 bg-zinc-950 text-white rounded-lg shadow-xl border border-zinc-800 text-xs">
        {icons[type]}
        <span className="flex-1 font-medium leading-relaxed">{message}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
