import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { 
  Users, 
  UserPlus, 
  CalendarClock, 
  TrendingUp, 
  ArrowRight, 
  Clock, 
  Send,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { leads, selectLead, setActiveTab, metrics, activities } = useLeads();

  const recentLeads = leads.slice(0, 5);
  const pendingFollowups = leads.filter(
    (l) => l.followUpDueDate === 'Today' && l.status !== 'Won'
  ).slice(0, 3);

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
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
            Good morning, Alex.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Here's what's happening with your leads today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('followups')}
            className="w-full sm:w-auto text-xs"
          >
            Review Follow-ups ({metrics.followUpsDue})
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setActiveTab('leads')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="w-full sm:w-auto text-xs"
          >
            View All Leads
          </Button>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <Card variant="default" className="p-3.5 sm:p-5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 truncate">Total leads</span>
            <Users className="w-4 h-4 text-zinc-400 shrink-0 ml-1" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <span className="text-xl sm:text-3xl font-extrabold text-zinc-950 font-mono tabular-nums block truncate">
              {metrics.totalLeads}
            </span>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 block mt-1 truncate">+14 captured this week</span>
          </div>
        </Card>

        <Card variant="default" className="p-3.5 sm:p-5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 truncate">New leads</span>
            <UserPlus className="w-4 h-4 text-blue-600 shrink-0 ml-1" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <span className="text-xl sm:text-3xl font-extrabold text-blue-700 font-mono tabular-nums block truncate">
              {metrics.newLeads}
            </span>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 block mt-1 truncate">Initial follow-up needed</span>
          </div>
        </Card>

        <Card variant="default" className="p-3.5 sm:p-5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 truncate">Follow-ups due</span>
            <CalendarClock className="w-4 h-4 text-amber-600 shrink-0 ml-1" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <span className="text-xl sm:text-3xl font-extrabold text-amber-700 font-mono tabular-nums block truncate">
              {metrics.followUpsDue}
            </span>
            <span className="text-[10px] sm:text-[11px] text-zinc-400 block mt-1 truncate">Due before end of day</span>
          </div>
        </Card>

        <Card variant="default" className="p-3.5 sm:p-5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 truncate">Conversion rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
          </div>
          <div className="mt-2.5 sm:mt-3">
            <span className="text-xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums block truncate">
              {metrics.conversionRate}
            </span>
            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium block mt-1 truncate">+3.2% vs prev month</span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Recent Leads & Urgent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Recent Leads (7 Cols) */}
        <div className="lg:col-span-8 space-y-4 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-zinc-950 truncate">Recent Inbound Leads</h2>
              <p className="text-xs text-zinc-500 truncate">Select any lead to view analysis and generate drafts.</p>
            </div>
            <button
              onClick={() => setActiveTab('leads')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 shrink-0 whitespace-nowrap"
            >
              See all <ArrowRight className="w-3 h-3 shrink-0" />
            </button>
          </div>

          <Card variant="default" className="p-0 overflow-hidden divide-y divide-zinc-100">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => selectLead(lead.id)}
                className="p-3.5 sm:p-4.5 hover:bg-zinc-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                  <Avatar name={lead.name} size="md" status={lead.status === 'New' ? 'online' : undefined} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-zinc-950 hover:underline truncate">
                        {lead.name}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">{lead.id}</span>
                    </div>
                    <p className="text-xs text-zinc-500 truncate">{lead.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center pt-1 sm:pt-0">
                  <Badge variant={getStatusBadgeVariant(lead.status)} size="sm" dot>
                    {lead.status}
                  </Badge>
                  <Badge variant={getPriorityBadgeVariant(lead.priority)} size="sm">
                    {lead.priority}
                  </Badge>
                  <span className="text-xs text-zinc-400 font-mono pl-1 hidden sm:inline">
                    {lead.lastActivity}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Right Column: Follow-up Queue & Activity Stream (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Urgent Follow-ups */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
                Action Needed Today
              </h3>
              <span className="text-xs font-mono text-zinc-400">
                {pendingFollowups.length} queue
              </span>
            </div>

            <div className="space-y-3">
              {pendingFollowups.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => selectLead(lead.id)}
                  className="p-3 rounded-lg border border-zinc-200/90 hover:border-zinc-300 transition-colors bg-zinc-50/50 cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-900">{lead.name}</span>
                    <Badge variant="warning" size="sm">Due today</Badge>
                  </div>
                  <p className="text-xs text-zinc-600 line-clamp-1">"{lead.originalMessage}"</p>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 gap-2">
                    <span className="truncate min-w-0">{lead.company}</span>
                    <span className="text-blue-600 font-medium hover:text-blue-800 shrink-0 whitespace-nowrap inline-flex items-center gap-1">
                      Review & dispatch <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity Log */}
          <Card variant="default" className="p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
              Live Activity Stream
            </h3>

            <div className="space-y-3.5">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-zinc-900 block">{act.title}</span>
                    <p className="text-zinc-500 leading-normal">{act.description}</p>
                    <span className="text-[10px] text-zinc-400 font-mono block">{act.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
