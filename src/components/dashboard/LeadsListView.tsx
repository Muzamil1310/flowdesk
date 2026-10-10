import React, { useState, useRef, useEffect } from 'react';
import { useLeads } from '../../context/LeadContext';
import { LeadStatus } from '../../types';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Search, ArrowRight, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const LeadsListView: React.FC = () => {
  const { leads, selectLead } = useLeads();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | LeadStatus>('All');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global search shortcut: Press "/" or "Cmd+K / Ctrl+K"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInputFocused =
        activeEl?.tagName === 'INPUT' ||
        activeEl?.tagName === 'TEXTAREA' ||
        activeEl?.tagName === 'SELECT';

      if (!isInputFocused && (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'))) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filterTabs: ('All' | LeadStatus)[] = ['All', 'New', 'Contacted', 'Follow-up', 'Won'];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.originalMessage.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' ? true : lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'New': return 'accent' as const;
      case 'Contacted': return 'neutral' as const;
      case 'Follow-up': return 'warning' as const;
      case 'Won': return 'success' as const;
      default: return 'neutral' as const;
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'High': return 'error' as const;
      case 'Medium': return 'warning' as const;
      case 'Low': return 'neutral' as const;
      default: return 'neutral' as const;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
            Leads Directory
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Browse and manage all captured prospects. Click any row to review intent and draft responses.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500">
          Showing <span className="font-semibold text-zinc-950">{filteredLeads.length}</span> of {leads.length} prospects
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div role="search" aria-label="Search and filter prospects" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-zinc-200">
        <div className="w-full sm:w-80 relative">
          <Input
            ref={searchInputRef}
            placeholder="Search leads (Press '/' or Cmd+K)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startIcon={<Search className="w-4 h-4 text-zinc-400" />}
            endIcon={
              searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="p-0.5 rounded text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <kbd className="hidden sm:inline font-mono text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                  /
                </kbd>
              )
            }
            className="h-8 text-xs"
            aria-label="Search leads by name, company, email, or message"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-0.5 bg-zinc-100 rounded-md border border-zinc-200/80 max-w-full">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={cn(
                'px-2.5 py-1 text-xs font-medium rounded transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950',
                statusFilter === tab
                  ? 'bg-white text-zinc-950 shadow-2xs font-semibold'
                  : 'text-zinc-600 hover:text-zinc-950'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table Card */}
      <Card variant="default" className="p-0 overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="py-16 text-center space-y-2 p-4">
            <span className="text-sm font-semibold text-zinc-800 block">No leads match your search</span>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {searchQuery
                ? `No prospects found matching "${searchQuery}". Clear your search or reset filters.`
                : 'No prospects found for this status filter.'}
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('All');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Mobile View: Dedicated cards (< 640px) */}
            <div className="sm:hidden divide-y divide-zinc-100">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => selectLead(lead.id)}
                  className="p-3.5 hover:bg-zinc-50/80 transition-colors cursor-pointer space-y-2.5 active:bg-zinc-100"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Avatar name={lead.name} size="sm" />
                      <div className="min-w-0">
                        <span className="font-semibold text-zinc-950 text-xs block truncate">
                          {lead.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 block truncate">
                          {lead.company}
                        </span>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(lead.status)} size="sm" dot>
                      {lead.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-100">
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityBadgeVariant(lead.priority)} size="sm">
                        {lead.priority}
                      </Badge>
                      <span className="font-mono text-zinc-400">{lead.source}</span>
                    </div>

                    <div className="inline-flex items-center gap-1 text-blue-600 font-medium shrink-0 whitespace-nowrap">
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3 shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Full data table with safe overflow container (>= 640px) */}
            <div className="hidden sm:block overflow-x-auto w-full">
              <table className="w-full min-w-[580px] text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50/70 text-zinc-500 font-medium">
                    <th className="py-3 px-4">Lead</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Last Activity</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => selectLead(lead.id)}
                      className="hover:bg-zinc-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Lead Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={lead.name} size="sm" />
                          <div>
                            <span className="font-semibold text-zinc-950 group-hover:underline block">
                              {lead.name}
                            </span>
                            <span className="text-[11px] text-zinc-400 font-mono block">
                              {lead.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Company & Channel */}
                      <td className="py-3.5 px-4 text-zinc-700">
                        <span className="font-medium text-zinc-900 block">{lead.company}</span>
                        <span className="text-[11px] text-zinc-400 block">{lead.source}</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <Badge variant={getStatusBadgeVariant(lead.status)} size="sm" dot>
                          {lead.status}
                        </Badge>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4">
                        <Badge variant={getPriorityBadgeVariant(lead.priority)} size="sm">
                          {lead.priority}
                        </Badge>
                      </td>

                      {/* Last activity */}
                      <td className="py-3.5 px-4 text-zinc-500 font-mono">
                        {lead.lastActivity}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 text-blue-600 font-medium group-hover:text-blue-800 shrink-0 whitespace-nowrap">
                          <span>Open</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
