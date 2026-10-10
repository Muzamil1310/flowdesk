import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { 
  FileText, 
  MessageSquareReply, 
  FolderKanban, 
  CalendarClock, 
  Target, 
  BarChart3 
} from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      title: 'AI Lead Summaries',
      description: 'Understand what each lead actually wants.',
      detail: 'Instantly distill lengthy form submissions or rambling emails into budget ranges, project scope, and key deliverables.',
      icon: FileText,
    },
    {
      title: 'Personalized Follow-ups',
      description: 'Generate responses based on the conversation.',
      detail: 'No robotic templates. FlowDesk references the prospect\'s specific requirements to craft warm, professional follow-up replies.',
      icon: MessageSquareReply,
    },
    {
      title: 'Lead Organization',
      description: 'Keep every prospect in one place.',
      detail: 'Consolidate leads from your landing page, contact forms, and inbound email into a unified, clean prospect ledger.',
      icon: FolderKanban,
    },
    {
      title: 'Follow-up Reminders',
      description: 'Never forget an important conversation.',
      detail: 'Automatic alert nudges notify your team if a qualified lead hasn\'t responded within 24 or 48 hours.',
      icon: CalendarClock,
    },
    {
      title: 'Smart Prioritization',
      description: 'Know which leads need attention first.',
      detail: 'Intelligently sorts incoming prospects based on urgency and purchase intent so you reach hot buyers immediately.',
      icon: Target,
    },
    {
      title: 'Simple Analytics',
      description: 'See how your lead pipeline is moving.',
      detail: 'Transparent metrics on median response speed, follow-up volume, and conversion rates without bloated BI reports.',
      icon: BarChart3,
    },
  ];

  return (
    <Section id="features" spacing="lg" background="surface" className="border-b border-zinc-200/80">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Engineered to keep conversations moving forward.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            Practical tools focused strictly on inbound sales momentum, lead response speed, and customer engagement.
          </p>
        </div>

        {/* 6 Features Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} variant="default" className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200/90 flex items-center justify-center text-zinc-900">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-zinc-950">{feature.title}</h3>
                  <p className="text-xs sm:text-sm font-medium text-zinc-700">{feature.description}</p>
                  <p className="text-xs text-zinc-600 leading-relaxed pt-1">
                    {feature.detail}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
