import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface FinalCTAProps {
  onStartFreeClick?: () => void;
  onSeeHowItWorksClick?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onStartFreeClick,
  onSeeHowItWorksClick,
}) => {
  return (
    <Section id="get-started" spacing="xl" background="surface" className="text-center">
      <Container>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-medium border border-zinc-200">
            <span>Ready in under 5 minutes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 leading-tight">
            Stop letting good leads go cold.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed">
            Capture every opportunity and follow up while the conversation is still fresh.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
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

          <p className="text-xs text-zinc-400 pt-2">
            Free starter plan available <span aria-hidden="true" className="mx-1">·</span> No credit card required <span aria-hidden="true" className="mx-1">·</span> Cancel anytime
          </p>
        </div>
      </Container>
    </Section>
  );
};
