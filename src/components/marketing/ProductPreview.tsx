import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { 
  Check, 
  Send, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  FileText, 
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  RotateCw
} from 'lucide-react';

export const ProductPreview: React.FC = () => {
  const [activeLeadIndex, setActiveLeadIndex] = useState(0);

  const leads = [
    {
      id: 'LD-8041',
      name: 'Claire Montgomery',
      company: 'Highland Architects',
      channel: 'Web Form · Inbound',
      time: '14 min ago',
      intent: 'Budget Inquiry: $45k - $60k',
      urgency: 'Immediate',
      status: 'Ready for Review',
      statusVariant: 'accent' as const,
      message: 'Hi team, we need a consultation on modernizing our commercial studio space in downtown Seattle starting next month. Can we schedule a 20-min call?',
      generatedDraft: 'Hi Claire,\n\nThanks for reaching out about modernizing your commercial studio space in Seattle. We frequently handle renovations in that exact scope ($45k-$60k) and can definitely accommodate a start next month.\n\nI would be delighted to connect for a quick 20-minute call. Does tomorrow at 10:30 AM or 2:00 PM PT work for your schedule?\n\nBest regards,\nAlex · FlowDesk Advisory',
    },
    {
      id: 'LD-8039',
      name: 'David Vance',
      company: 'Apex Logistics',
      channel: 'Email Forward',
      time: '42 min ago',
      intent: 'Fleet System Integration',
      urgency: 'Medium',
      status: 'Draft Prepared',
      statusVariant: 'neutral' as const,
      message: 'Looking to understand if your system syncs with existing telematics platforms for a 25-vehicle fleet rollout before Q3.',
      generatedDraft: 'Hello David,\n\nYes, FlowDesk integrates directly with telematics exports and inbound dispatch streams. For a 25-vehicle fleet, setup takes under 15 minutes.\n\nWould Thursday morning work to walk through a live demo tailored to your Q3 roadmap?\n\nBest,\nAlex',
    },
    {
      id: 'LD-8035',
      name: 'Sofia Alva',
      company: 'Cascade Realty',
      channel: 'Zillow / Direct Lead',
      time: '1 hr ago',
      intent: 'Buyer Lead Tour Request',
      urgency: 'High',
      status: 'Dispatched',
      statusVariant: 'success' as const,
      message: 'Client interested in viewing 742 Evergreen Terrace this weekend. Need seller disclosures.',
      generatedDraft: 'Hi Sofia,\n\nThank you for reaching out regarding 742 Evergreen Terrace. The seller disclosures and inspection summaries are attached for your client\'s review.\n\nWe have slots open Saturday at 1:00 PM and Sunday at 3:00 PM for private showings. Let me know what suits you best!\n\nWarm regards,\nAlex',
    },
  ];

  const currentLead = leads[activeLeadIndex];

  return (
    <Section spacing="lg" background="canvas" className="border-b border-zinc-200/80">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Workspace Walkthrough
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Everything your sales workflow needs. Nothing it doesn't.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            A purpose-built workspace engineered for clarity. Inspect incoming lead context on the left, review the automatically generated follow-up on the right, and approve.
          </p>
        </div>

        {/* Big Product Showcase Surface */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          {/* Top Operational Bar */}
          <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-zinc-950">FlowDesk Studio</span>
              <span className="text-xs text-zinc-300">|</span>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Sync engine online</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500 font-mono">Response queue:</span>
              <span className="font-semibold text-zinc-900 bg-white px-2 py-0.5 rounded border border-zinc-200 font-mono">
                3 ready for dispatch
              </span>
            </div>
          </div>

          {/* Interactive Split Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Queue List (5 Cols) */}
            <div className="lg:col-span-5 border-r border-zinc-200 bg-zinc-50/40 p-4 space-y-3">
              <div className="flex items-center justify-between px-1 text-xs text-zinc-500 font-medium">
                <span>Incoming Prospects ({leads.length})</span>
                <span className="text-zinc-400">Click to preview</span>
              </div>

              <div className="space-y-2">
                {leads.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveLeadIndex(idx)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer text-left space-y-2 ${
                      activeLeadIndex === idx
                        ? 'bg-white border-zinc-950 shadow-xs'
                        : 'bg-white/80 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Avatar name={item.name} size="sm" />
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-zinc-950 block truncate">{item.name}</span>
                          <span className="text-[11px] text-zinc-500 block truncate">{item.company}</span>
                        </div>
                      </div>
                      <Badge variant={item.statusVariant} size="sm" dot className="shrink-0 whitespace-nowrap">
                        {item.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-100 gap-2">
                      <span className="truncate min-w-0">{item.channel}</span>
                      <span className="font-mono shrink-0 whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Conversion Stats in Sidebar */}
              <div className="p-3.5 bg-white rounded-lg border border-zinc-200 space-y-2 mt-4">
                <span className="text-xs font-semibold text-zinc-900 block">Weekly Follow-up Velocity</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-zinc-950 font-mono tabular-nums">94.8%</span>
                  <span className="text-xs text-emerald-700 font-medium">+18% vs manual outreach</span>
                </div>
                <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-950 h-full w-[94.8%]" />
                </div>
              </div>
            </div>

            {/* Right Lead Inspector & Follow-up Draft Generator (7 Cols) */}
            <div className="lg:col-span-7 p-4 sm:p-6 space-y-5 sm:space-y-6 flex flex-col justify-between min-w-0">
              <div className="space-y-4 sm:space-y-5 min-w-0">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-zinc-100 gap-2.5 sm:gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-zinc-950 truncate">{currentLead.name}</h3>
                      <span className="text-xs font-mono text-zinc-400">{currentLead.id}</span>
                    </div>
                    <p className="text-xs text-zinc-500 truncate">{currentLead.company} · {currentLead.channel}</p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="text-[11px] sm:text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 break-words max-w-full">
                      Intent: {currentLead.intent}
                    </span>
                  </div>
                </div>

                {/* Original Client Inquiry Box */}
                <div className="space-y-1.5 min-w-0">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Inbound Inquiry Message
                  </span>
                  <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 leading-relaxed font-sans break-words">
                    "{currentLead.message}"
                  </div>
                </div>

                {/* Auto-Generated Follow-up Draft */}
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      Generated Personalized Follow-up
                    </span>
                    <span className="text-[11px] text-zinc-400 font-mono">Ready to dispatch</span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-md bg-white border border-blue-200/90 text-xs text-zinc-800 leading-relaxed font-sans whitespace-pre-line shadow-2xs break-words">
                    {currentLead.generatedDraft}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <span className="text-xs text-zinc-400 text-center sm:text-left">
                  Clicking dispatch sends via your connected email provider.
                </span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    Customize Draft
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    rightIcon={<Send className="w-3.5 h-3.5" />}
                    className="w-full sm:w-auto"
                  >
                    Approve & Dispatch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
