import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  Inbox, 
  Send,
  MoreVertical
} from 'lucide-react';

export interface HeroProps {
  onStartFreeClick?: () => void;
  onSeeHowItWorksClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartFreeClick,
  onSeeHowItWorksClick,
}) => {
  const recentLeads = [
    {
      name: 'Sarah Mitchell',
      company: 'Acme Properties',
      status: 'New',
      priority: 'High priority',
      statusVariant: 'accent' as const,
      priorityVariant: 'error' as const,
      inquiry: 'Looking for 3-building commercial security consultation.',
      time: '6m ago',
    },
    {
      name: 'James Wilson',
      company: 'Wilson Consulting',
      status: 'Contacted',
      priority: 'Medium priority',
      statusVariant: 'neutral' as const,
      priorityVariant: 'warning' as const,
      inquiry: 'Sent proposal breakdown for quarterly advisory retainer.',
      time: '24m ago',
    },
    {
      name: 'Priya Shah',
      company: 'Nova Realty',
      status: 'Follow-up',
      priority: 'High priority',
      statusVariant: 'success' as const,
      priorityVariant: 'error' as const,
      inquiry: 'Draft response ready referencing requested open-house schedule.',
      time: '48m ago',
    },
  ];

  return (
    <Section id="product" spacing="lg" background="canvas" className="pt-10 sm:pt-14 pb-16 sm:pb-24 border-b border-zinc-200/80">
      <Container>
        {/* Hero Copy Block */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200/80">
            <span>AI-powered lead follow-up</span>
          </div>

          {/* Main Headline with text-wrap balance */}
          <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-zinc-950 leading-[1.12]">
            Turn every lead into a follow-up. Automatically.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            FlowDesk helps small businesses capture leads, understand what they need, and generate personalized follow-ups before opportunities disappear.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="primary"
              onClick={onStartFreeClick}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Start free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onSeeHowItWorksClick}
              className="w-full sm:w-auto"
            >
              See how it works
            </Button>
          </div>

          {/* Micro Trust Line */}
          <p className="text-xs text-zinc-500 pt-1">
            No credit card required <span aria-hidden="true" className="mx-1 text-zinc-300">·</span> Set up in minutes
          </p>
        </div>

        {/* Hero Visual: Realistic SaaS Product Preview */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            {/* Window Topbar */}
            <div className="px-4 py-3 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
                <span className="ml-3 text-xs font-medium text-zinc-500 font-mono hidden sm:inline">
                  flowdesk.app/workspace/inbox
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-zinc-700">Auto-Drafting Active</span>
              </div>
            </div>

            {/* Dashboard UI Inner Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
              {/* Mini Sidebar */}
              <div className="hidden md:flex md:col-span-3 border-r border-zinc-200 bg-zinc-50/60 p-4 flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2">
                    WORKSPACE
                  </div>
                  <nav className="space-y-1 text-xs font-medium">
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-zinc-950 text-white">
                      <span className="flex items-center gap-2">
                        <Inbox className="w-3.5 h-3.5" /> Leads Queue
                      </span>
                      <span className="font-mono text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded">12</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-zinc-600 hover:bg-zinc-100">
                      <span className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" /> Sent Follow-ups
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">48</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md text-zinc-600 hover:bg-zinc-100">
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> Scheduled
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">5</span>
                    </div>
                  </nav>
                </div>

                {/* Response Rate Summary */}
                <div className="p-3 bg-white rounded-md border border-zinc-200/80 text-xs space-y-1">
                  <span className="text-zinc-500 text-[11px] block">Avg. First Response</span>
                  <span className="font-semibold text-zinc-950 font-mono text-base block tabular-nums">3.4 min</span>
                  <span className="text-[11px] text-emerald-700 font-medium">4x faster than manual</span>
                </div>
              </div>

              {/* Main Preview Content */}
              <div className="col-span-1 md:col-span-9 p-4 sm:p-6 space-y-5">
                {/* Metrics header */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pb-4 border-b border-zinc-100">
                  <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60">
                    <span className="text-[11px] text-zinc-500 font-medium block">Total Leads Captured</span>
                    <span className="text-xl font-bold text-zinc-950 font-mono tabular-nums mt-0.5 block">128</span>
                  </div>
                  <div className="p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60">
                    <span className="text-[11px] text-zinc-500 font-medium block">Follow-ups Dispatched</span>
                    <span className="text-xl font-bold text-zinc-950 font-mono tabular-nums mt-0.5 block">116</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-3 bg-zinc-50/70 rounded-lg border border-zinc-200/60">
                    <span className="text-[11px] text-zinc-500 font-medium block">Intent Identified</span>
                    <span className="text-xl font-bold text-emerald-700 font-mono tabular-nums mt-0.5 block">98.4%</span>
                  </div>
                </div>

                {/* Recent Leads Table View */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-semibold text-zinc-900">Recent Inbound Opportunities</span>
                    <span className="font-mono">Real-time sync</span>
                  </div>

                  <div className="space-y-2.5">
                    {recentLeads.map((lead) => (
                      <div
                        key={lead.name}
                        className="p-3 sm:p-4 rounded-lg border border-zinc-200 hover:border-zinc-300 transition-colors bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3"
                      >
                        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                          <Avatar name={lead.name} size="md" status="online" />
                          <div className="space-y-0.5 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-zinc-950 truncate">{lead.name}</span>
                              <span className="text-xs text-zinc-400">·</span>
                              <span className="text-xs text-zinc-500 truncate">{lead.company}</span>
                            </div>
                            <p className="text-xs text-zinc-600 line-clamp-1 break-words">{lead.inquiry}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-center pt-1 sm:pt-0">
                          <Badge variant={lead.statusVariant} size="sm" dot>
                            {lead.status}
                          </Badge>
                          <Badge variant={lead.priorityVariant} size="sm">
                            {lead.priority}
                          </Badge>
                          <span className="text-[11px] text-zinc-400 font-mono pl-1">{lead.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
