import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { DashboardTab } from '../../types';
import { Logo } from '../brand/Logo';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  BarChart3, 
  Settings, 
  Menu, 
  X, 
  ArrowLeft,
  Bell
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  onExitToWebsite: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onExitToWebsite,
}) => {
  const { activeTab, setActiveTab, selectLead, actionNotification, clearNotification, leads } = useLeads();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: { tab: DashboardTab; label: string; icon: React.FC<{ className?: string }>; badgeCount?: number }[] = [
    { tab: 'overview', label: 'Overview', icon: LayoutDashboard },
    { tab: 'leads', label: 'Leads', icon: Users, badgeCount: leads.filter(l => l.status === 'New').length },
    { tab: 'followups', label: 'Follow-ups', icon: CalendarClock, badgeCount: leads.filter(l => l.followUpDueDate === 'Today').length },
    { tab: 'analytics', label: 'Analytics', icon: BarChart3 },
    { tab: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: DashboardTab) => {
    setActiveTab(tab);
    if (tab !== 'leads') {
      selectLead(null);
    }
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] text-zinc-950">
      {/* Desktop Sidebar (Fixed width) */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-zinc-200 bg-white p-4 shrink-0">
        <div className="space-y-6">
          {/* Logo & Workspace Tag */}
          <div className="px-2 pt-2">
            <Logo size="md" />
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-100 text-[11px] font-medium text-zinc-600 border border-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Interactive Workspace</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1" aria-label="Dashboard Sidebar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => handleNavClick(item.tab)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors text-left',
                    isActive
                      ? 'bg-zinc-950 text-white font-semibold'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badgeCount && item.badgeCount > 0 ? (
                    <span
                      className={cn(
                        'text-[10px] font-mono px-1.5 py-0.2 rounded-full',
                        isActive
                          ? 'bg-zinc-800 text-zinc-200'
                          : 'bg-zinc-100 text-zinc-600'
                      )}
                    >
                      {item.badgeCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Area & Exit trigger */}
        <div className="space-y-4 pt-4 border-t border-zinc-100">
          <button
            type="button"
            onClick={onExitToWebsite}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketing Website</span>
          </button>

          {/* User profile placeholder */}
          <div className="flex items-center gap-3 px-2 pt-1">
            <Avatar name="Alex Vance" size="sm" status="online" />
            <div className="space-y-0.5 overflow-hidden">
              <span className="text-xs font-semibold text-zinc-950 block truncate">
                Alex Vance
              </span>
              <span className="text-[11px] text-zinc-400 block truncate">
                alex@flowdesk.demo
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full w-full overflow-x-hidden">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-zinc-200 px-3 sm:px-6 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-md text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 shrink-0"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-zinc-500 truncate">
              <span className="font-semibold text-zinc-950 capitalize truncate">{activeTab}</span>
              <span className="text-zinc-300">/</span>
              <span className="hidden sm:inline truncate">FlowDesk Product Demo</span>
              <span className="sm:hidden text-zinc-400 font-mono text-[10px]">Demo</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onExitToWebsite}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
              className="text-xs h-7.5 px-2.5 sm:px-3"
            >
              <span className="hidden xs:inline">Exit</span> Demo
            </Button>
          </div>
        </header>

        {/* Floating Toast Notification (Zero CLS) */}
        <Toast message={actionNotification} onClose={clearNotification} />

        {/* Content Viewport */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto overflow-x-hidden min-w-0 max-w-full w-full">
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white p-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Logo size="md" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      type="button"
                      onClick={() => handleNavClick(item.tab)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors text-left',
                        isActive
                          ? 'bg-zinc-950 text-white font-semibold'
                          : 'text-zinc-600 hover:bg-zinc-100'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badgeCount && item.badgeCount > 0 ? (
                        <span className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.2 rounded-full">
                          {item.badgeCount}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-zinc-100 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onExitToWebsite();
                }}
                className="w-full flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-950"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Exit to Marketing Site</span>
              </button>
              <div className="flex items-center gap-2.5 pt-2">
                <Avatar name="Alex Vance" size="sm" />
                <span className="text-xs font-semibold text-zinc-900">Alex Vance</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
