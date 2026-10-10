import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export const TrustStrip: React.FC = () => {
  const fictionalTeams = [
    'Summit Architectural Studio',
    'Northstar Realty Group',
    'Vela Growth Consulting',
    'Craftworks Remodeling',
    'Ridgeline Wealth Partners',
  ];

  return (
    <Section spacing="sm" background="surface" className="border-b border-zinc-200/80">
      <Container>
        <div className="text-center space-y-4">
          <p className="text-xs sm:text-sm font-medium text-zinc-600 max-w-xl mx-auto">
            Built for teams that don't want good leads slipping through the cracks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-1">
            {fictionalTeams.map((team) => (
              <span
                key={team}
                className="text-xs sm:text-sm font-semibold text-zinc-400 tracking-tight select-none hover:text-zinc-600 transition-colors"
              >
                {team}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
