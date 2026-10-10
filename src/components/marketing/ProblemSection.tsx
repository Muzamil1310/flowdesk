import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Inbox, Clock, MessageSquare } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      num: '01',
      title: 'Lost leads',
      description: 'Important prospects get buried across forms, email, and messages.',
      icon: Inbox,
      impact: 'Leads forgotten within 48 hours',
    },
    {
      num: '02',
      title: 'Slow follow-ups',
      description: 'Teams get busy and responses get delayed.',
      icon: Clock,
      impact: '5x lower conversion after 1 hour',
    },
    {
      num: '03',
      title: 'Generic replies',
      description: 'Copy-paste responses don\'t feel personal.',
      icon: MessageSquare,
      impact: 'Lost trust and poor engagement',
    },
  ];

  return (
    <Section spacing="lg" background="canvas" className="border-b border-zinc-200/80">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            The Follow-up Gap
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Leads shouldn't disappear after the first message.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            Most small businesses lose high-value deals not because the product is bad, but because follow-up is manual, fragmented, and late.
          </p>
        </div>

        {/* 3 Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <Card key={prob.num} variant="default" className="p-6 relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 font-semibold">{prob.num}</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold text-zinc-950">{prob.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100">
                  <span className="text-[11px] font-mono text-zinc-500 font-medium">
                    {prob.impact}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Resolution Statement Box */}
        <div className="max-w-3xl mx-auto p-5 sm:p-6 rounded-xl bg-white border border-zinc-200 shadow-xs text-center space-y-2">
          <span className="text-xs font-semibold text-zinc-950 uppercase tracking-wider">The Solution</span>
          <p className="text-base sm:text-lg font-semibold text-zinc-950">
            FlowDesk brings the follow-up workflow into one simple system.
          </p>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto">
            From instant capture to intent understanding and personalized drafts, every inbound inquiry is ready for your approval in seconds.
          </p>
        </div>
      </Container>
    </Section>
  );
};
