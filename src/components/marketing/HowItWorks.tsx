import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Capture',
      tagline: 'Bring new leads into one place.',
      description: 'Connect web forms, inbound email, or manual entries. FlowDesk consolidates incoming inquiries into a single unified queue instantly.',
      details: ['Website forms', 'Inbound email alerts', 'Booking inquiries'],
    },
    {
      step: '02',
      title: 'Understand',
      tagline: 'Turn messages into clear lead context and intent.',
      description: 'FlowDesk reads the inquiry to identify budget constraints, urgency, specific requirements, and buyer sentiment without manual tagging.',
      details: ['Intent categorization', 'Urgency scoring', 'Key request extraction'],
    },
    {
      step: '03',
      title: 'Follow up',
      tagline: 'Generate a personalized response and keep the conversation moving.',
      description: 'Generate high-converting, tailored email or message drafts that reference the prospect\'s actual needs. Review and send with a single click.',
      details: ['Contextual draft ready', '1-click send or edit', 'Automated follow-up timer'],
    },
  ];

  return (
    <Section id="how-it-works" spacing="lg" background="surface" className="border-b border-zinc-200/80">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            From new lead to next conversation in three steps.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            A frictionless pipeline designed for busy professionals who need to follow up fast without sacrificing personal touch.
          </p>

          {/* Visual pipeline pill flow */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-zinc-600">
            <span className="px-2.5 py-1 bg-zinc-100 rounded border border-zinc-200 text-zinc-900 whitespace-nowrap">Lead Inbound</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="px-2.5 py-1 bg-zinc-100 rounded border border-zinc-200 text-zinc-900 whitespace-nowrap">AI Understanding</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="px-2.5 py-1 bg-zinc-100 rounded border border-zinc-200 text-zinc-900 whitespace-nowrap">Follow-up Draft</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-950 text-white font-medium whitespace-nowrap">Active Conversation</span>
          </div>
        </div>

        {/* 3 Steps Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((st) => (
            <Card key={st.step} variant="default" className="p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded border border-zinc-200">
                    Step {st.step}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">FLOWDESK_PIPELINE</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-zinc-950">{st.title}</h3>
                  <p className="text-xs sm:text-sm font-medium text-zinc-700">{st.tagline}</p>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pt-1">
                    {st.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 space-y-1.5">
                {st.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="w-1 h-1 rounded-full bg-zinc-400" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};
