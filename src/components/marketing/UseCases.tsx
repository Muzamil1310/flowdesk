import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Building2, Briefcase, UserCheck, Store, ArrowUpRight } from 'lucide-react';

export const UseCases: React.FC = () => {
  const useCases = [
    {
      role: 'Real Estate',
      hook: 'Respond to property inquiries faster.',
      detail: 'When buyers request disclosures or showing times on listings, automatically draft appointment options before they tour with another agent.',
      highlight: 'Disclose property specs & tour schedules instantly',
      icon: Building2,
    },
    {
      role: 'Agencies',
      hook: 'Manage inbound client opportunities.',
      detail: 'Parse client budgets, timelines, and scope requirements from website contact forms so account directors can reply with relevant case studies.',
      highlight: 'Extract scope, budget & deliverable timelines',
      icon: Briefcase,
    },
    {
      role: 'Consultants',
      hook: 'Turn inquiries into conversations.',
      detail: 'Never let executive referrals or discovery questions sit unaddressed. FlowDesk helps solo advisors deliver rapid, customized discovery links.',
      highlight: 'Book discovery calls within 5 minutes of inquiry',
      icon: UserCheck,
    },
    {
      role: 'Local Businesses',
      hook: 'Never miss a potential customer.',
      detail: 'From residential contractors to dental clinics, follow up immediately on quote requests while competitors are still reviewing their inboxes.',
      highlight: 'Turn estimates into booked service consultations',
      icon: Store,
    },
  ];

  return (
    <Section spacing="lg" background="canvas" className="border-b border-zinc-200/80">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Tailored Workflows
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Built for service businesses where response speed wins deals.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            Whether you operate solo or lead a dedicated sales team, FlowDesk adapts to your exact client onboarding cadence.
          </p>
        </div>

        {/* 4 Quadrants: Distinct alternating structural surface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.role}
                className="p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-950 uppercase tracking-wider bg-zinc-100 px-2.5 py-1 rounded">
                      {uc.role}
                    </span>
                    <div className="w-8 h-8 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-700">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-zinc-950">{uc.hook}</h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {uc.detail}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs gap-2">
                  <span className="text-zinc-900 font-semibold">{uc.highlight}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
