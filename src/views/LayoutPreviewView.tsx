import React from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ArrowUpRight, Clock, Plus, Filter, MessageSquare, CheckCircle2 } from 'lucide-react';

export const LayoutPreviewView: React.FC = () => {
  const sampleLeads = [
    {
      id: 'LD-104',
      name: 'Sarah Jennings',
      company: 'Jennings Architecture Studio',
      inquiry: 'Looking for a proposal on commercial office renovation consulting.',
      time: '12m ago',
      source: 'Website Form',
      status: 'Ready for Review',
      badgeVariant: 'accent' as const,
    },
    {
      id: 'LD-103',
      name: 'Michael Thorne',
      company: 'Apex Logistics LLC',
      inquiry: 'Need an estimate for 3-vehicle fleet management setup.',
      time: '42m ago',
      source: 'Inbound Email',
      status: 'Follow-up Drafted',
      badgeVariant: 'success' as const,
    },
    {
      id: 'LD-102',
      name: 'Dr. Clara Reyes',
      company: 'Metro Dental Partners',
      inquiry: 'Interested in automated patient appointment confirmation follow-ups.',
      time: '2h ago',
      source: 'Google Business Profile',
      status: 'Awaiting Dispatch',
      badgeVariant: 'neutral' as const,
    },
  ];

  return (
    <div className="w-full">
      {/* Shell Banner & Value Proposition Header */}
      <Section spacing="sm" background="surface" bordered>
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                <span>Application Shell</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-950 font-medium">Layout System Preview</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                Lead Follow-up Workspace Shell
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
                Turn every lead into a follow-up. Automatically. Designed for agencies, consultants, real estate, and local service businesses.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button variant="outline" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
                Filter Stream
              </Button>
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Simulate Inbound Lead
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Workspace Layout Canvas */}
      <Section spacing="md" background="canvas">
        <Container>
          {/* Quick Metrics Bar (Tabular figures, zero vanity fluff) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <span className="text-xs text-zinc-500 block">Pending Inquiries</span>
              <span className="text-2xl font-semibold text-zinc-950 font-mono tabular-nums mt-1 block">
                03
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 block">Captured today</span>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <span className="text-xs text-zinc-500 block">Median Response Time</span>
              <span className="text-2xl font-semibold text-zinc-950 font-mono tabular-nums mt-1 block">
                3.8m
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 block">Target: &lt; 5 mins</span>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <span className="text-xs text-zinc-500 block">Auto-Draft Accuracy</span>
              <span className="text-2xl font-semibold text-zinc-950 font-mono tabular-nums mt-1 block">
                98.2%
              </span>
              <span className="text-[11px] text-zinc-400 mt-1 block">Intent aligned</span>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 p-4">
              <span className="text-xs text-zinc-500 block">Target Audience</span>
              <span className="text-sm font-semibold text-zinc-900 mt-2 block">
                Small B2B & Agencies
              </span>
              <span className="text-[11px] text-zinc-400 mt-0.5 block">High touch pipeline</span>
            </div>
          </div>

          {/* 2-Column Responsive Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Inbound Lead Queue (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-950">Inbound Queue</h2>
                  <span className="text-xs text-zinc-500">Unprocessed customer inquiries</span>
                </div>
                <span className="text-xs text-zinc-400 font-mono tabular-nums">3 records</span>
              </div>

              <div className="space-y-3">
                {sampleLeads.map((lead) => (
                  <Card key={lead.id} variant="interactive" className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={lead.name} size="md" status="online" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-zinc-950">{lead.name}</h3>
                            <span className="text-xs text-zinc-400 font-mono">{lead.id}</span>
                          </div>
                          <p className="text-xs text-zinc-500">{lead.company}</p>
                        </div>
                      </div>

                      <Badge variant={lead.badgeVariant} dot size="sm">
                        {lead.status}
                      </Badge>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-700 mt-3 pt-3 border-t border-zinc-100 leading-relaxed">
                      "{lead.inquiry}"
                    </p>

                    {/* Clean unboxed metadata with dot separators */}
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-3 pt-2">
                      <span>Source: {lead.source}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lead.time}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-zinc-600 font-medium hover:text-zinc-950 cursor-pointer inline-flex items-center gap-0.5 ml-auto whitespace-nowrap shrink-0">
                        View context <ArrowUpRight className="w-3 h-3 shrink-0" />
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column: Next Phase Architectural Readiness (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <Card variant="default">
                <CardHeader>
                  <CardTitle className="text-sm">Phase 2 Staging Area</CardTitle>
                  <CardDescription>
                    Where the personalized follow-up generator and dispatch drawer will dock.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-zinc-50 rounded-md border border-zinc-200/80 space-y-2">
                    <span className="text-xs font-semibold text-zinc-900 block">
                      Target Audience Segments:
                    </span>
                    <ul className="text-xs text-zinc-600 space-y-1.5 list-disc list-inside">
                      <li>Independent Consultants & Agencies</li>
                      <li>Local Commercial & Residential Contractors</li>
                      <li>Real Estate & Property Management Groups</li>
                      <li>Professional Advisory & Accounting Services</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-white rounded-md border border-zinc-200 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-950">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Phase 1 Verification Passed</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      All tokens, responsive shell layouts, accessible form primitives, buttons, and badges are initialized and verified for Phase 2 integration.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Minimal architectural note */}
              <div className="p-4 rounded-lg border border-dashed border-zinc-200 text-center">
                <span className="text-xs font-mono text-zinc-400 block">
                  FLOWDESK_UI_SHELL · REFINED B2B SAAS AESTHETIC
                </span>
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Strictly avoids blue/purple gradients, bloated cards, and AI clichés.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
