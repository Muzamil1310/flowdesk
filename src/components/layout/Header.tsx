import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Logo } from '../brand/Logo';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

export interface HeaderProps {
  onSignInClick?: () => void;
  onGetStartedClick?: () => void;
  activeItem?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSignInClick,
  onGetStartedClick,
  activeItem,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="relative w-full bg-white border-b border-zinc-200">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Zone 1: Brand Wordmark (Single text/mark element) */}
          <div className="flex items-center shrink-0">
            <a
              href="#"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded-sm"
              aria-label="FlowDesk Home"
            >
              <Logo size="md" />
            </a>
          </div>

          {/* Zone 2: Navigation Links (Text with hover underlines, 1-2 words) */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'transition-colors duration-150 py-1 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded-xs',
                  activeItem === item.label
                    ? 'text-zinc-950 font-semibold border-b-2 border-zinc-950 -mb-[2px]'
                    : ''
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (1-2 single-line buttons) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSignInClick}
              className="text-zinc-700 hover:text-zinc-950"
            >
              Sign in
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onGetStartedClick}
            >
              Get started
            </Button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean, no overflow, single layer) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onSignInClick?.();
              }}
            >
              Sign in
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => {
                setMobileMenuOpen(false);
                onGetStartedClick?.();
              }}
            >
              Get started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
