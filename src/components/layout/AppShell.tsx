import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export interface AppShellProps {
  children: React.ReactNode;
  onSignInClick?: () => void;
  onGetStartedClick?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  onSignInClick,
  onGetStartedClick,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-950 w-full max-w-full overflow-x-hidden">
      <Header
        onSignInClick={onSignInClick}
        onGetStartedClick={onGetStartedClick}
      />
      <main className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};
