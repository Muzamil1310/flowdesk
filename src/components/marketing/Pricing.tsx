import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Check } from 'lucide-react';

export interface PricingProps {
  onPlanSelect?: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onPlanSelect }) => {
  const plans = [
    {
      name: 'STARTER',
      audience: 'For freelancers & solo operators',
      price: '$0',
      period: '/month',
      description: 'Test the automated follow-up engine on initial inbound volume.',
      features: [
        '25 leads included monthly',
        'Basic follow-up drafts',
        'Single email account connection',
        'Lead tracking & status updates',
        'Community support',
      ],
      cta: 'Start free',
      variant: 'default' as const,
      isPopular: false,
    },
    {
      name: 'PRO',
      audience: 'For growing service businesses & agencies',
      price: '$29',
      period: '/month',
      description: 'Full automated workflow with AI intent detection and prioritization.',
      features: [
        'Unlimited inbound leads',
        'Contextual AI follow-up drafts',
        'Smart lead intent & prioritization',
        'Automated follow-up timer alerts',
        'Pipeline response analytics',
        'Custom brand tone of voice',
      ],
      cta: 'Start free trial',
      variant: 'default' as const,
      isPopular: true,
    },
    {
      name: 'BUSINESS',
      audience: 'For multi-person sales teams & firms',
      price: '$79',
      period: '/month',
      description: 'Team permissions, multi-inbox routing, and priority assistance.',
      features: [
        'Everything in Pro tier',
        'Multiple user team seats (up to 10)',
        'Multi-channel inbound routing',
        'Advanced conversion analytics',
        'Custom webhook & CRM sync',
        'Priority technical support',
      ],
      cta: 'Start free trial',
      variant: 'default' as const,
      isPopular: false,
    },
  ];

  return (
    <Section id="pricing" spacing="lg" background="surface" className="border-b border-zinc-200/80">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Simple plans for every stage of your business.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            Start free, configure your workflow in minutes, and upgrade only when your lead volume accelerates.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                plan.isPopular
                  ? 'bg-white border-2 border-zinc-950 shadow-md ring-1 ring-zinc-950/10'
                  : 'bg-white border border-zinc-200 shadow-xs'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-zinc-950 text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                    Recommended
                  </span>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 tracking-wider uppercase">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">{plan.audience}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-zinc-950 font-mono tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">{plan.period}</span>
                </div>

                <p className="text-xs text-zinc-600 leading-relaxed border-b border-zinc-100 pb-5">
                  {plan.description}
                </p>

                {/* Features list */}
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Included Features
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-zinc-100">
                <Button
                  variant={plan.isPopular ? 'primary' : 'outline'}
                  size="md"
                  fullWidth
                  onClick={() => onPlanSelect?.(plan.name)}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Fictional demo notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-400">
            Note: FlowDesk is a portfolio prototype. All tier listings and dollar amounts are fictional specifications for demonstration purposes.
          </p>
        </div>
      </Container>
    </Section>
  );
};
