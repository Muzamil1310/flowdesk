import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { CheckCircle2, Clock, Calendar, Check, ArrowRight } from 'lucide-react';

export const FollowUpsView: React.FC = () => {
  const { leads, selectLead, toggleFollowUpComplete } = useLeads();

  const dueToday = leads.filter((l) => l.followUpDueDate === 'Today' && l.status !== 'Won');
  const upcoming = leads.filter((l) => l.followUpDueDate && l.followUpDueDate.includes('In') || l.followUpDueDate === 'Tomorrow');
  const completed = leads.filter((l) => l.followUpDueDate === 'Completed' || l.followUpStatus === 'sent');

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
          Follow-up Cadence
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Review, schedule, and complete pending follow-up communications across your pipeline.
        </p>
      </div>

      {/* 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Due today</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums block mt-2">
            {dueToday.length}
          </span>
          <span className="text-[11px] text-zinc-400 block mt-1">Requires outreach before 5:00 PM</span>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Upcoming</span>
            <Calendar className="w-4 h-4 text-zinc-700" />
          </div>
          <span className="text-3xl font-extrabold text-zinc-950 font-mono tabular-nums block mt-2">
            {upcoming.length + 12}
          </span>
          <span className="text-[11px] text-zinc-400 block mt-1">Scheduled next 7 days</span>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums block mt-2">
            {completed.length + 38}
          </span>
          <span className="text-[11px] text-zinc-400 block mt-1">Dispatched successfully</span>
        </Card>
      </div>

      {/* Follow-up Queue Table */}
      <Card variant="default" className="p-0 overflow-hidden">
        <div className="p-4 bg-zinc-50/70 border-b border-zinc-200 flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-900">Active Follow-up Tasks</span>
          <span className="text-zinc-500 font-mono">Real-time local state</span>
        </div>

        <div className="divide-y divide-zinc-100">
          {leads.map((lead) => {
            const isDone = lead.followUpDueDate === 'Completed' || lead.followUpStatus === 'sent';
            return (
              <div
                key={lead.id}
                className="p-3.5 sm:p-4 hover:bg-zinc-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleFollowUpComplete(lead.id)}
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 mt-0.5 sm:mt-0 ${
                      isDone
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-zinc-300 hover:border-zinc-400 bg-white'
                    }`}
                    aria-label={`Mark follow-up for ${lead.name} as complete`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <Avatar name={lead.name} size="sm" />

                  <div className="min-w-0 flex-1">
                    <span
                      onClick={() => selectLead(lead.id)}
                      className={`font-semibold hover:underline cursor-pointer block truncate ${
                        isDone ? 'line-through text-zinc-400' : 'text-zinc-950'
                      }`}
                    >
                      {lead.name}
                    </span>
                    <span className="text-[11px] text-zinc-500 block truncate">
                      {lead.company} · {lead.originalMessage}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2.5 sm:gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={getPriorityBadgeVariant(lead.priority)} size="sm">
                      {lead.priority}
                    </Badge>

                    <span className="text-xs font-mono text-zinc-500 whitespace-nowrap">
                      {lead.followUpDueDate || 'Today'}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectLead(lead.id)}
                    rightIcon={<ArrowRight className="w-3 h-3 shrink-0" />}
                    className="h-7 px-2.5 text-xs whitespace-nowrap shrink-0"
                  >
                    Open Lead
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
