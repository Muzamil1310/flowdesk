import React, { useState } from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is FlowDesk?',
      answer:
        'FlowDesk is an AI-powered lead follow-up platform designed for small businesses, agencies, and consultants. It consolidates inbound inquiries from your website or email, analyzes the prospect\'s requirements, and drafts personalized follow-up responses ready for your review and approval in seconds.',
    },
    {
      question: 'Do I need technical knowledge?',
      answer:
        'Not at all. FlowDesk is built for non-technical business owners and operators. You connect your inbound email or embed a simple contact link, and incoming messages immediately flow into your clean inbox queue.',
    },
    {
      question: 'Can FlowDesk write responses for me?',
      answer:
        'Yes. FlowDesk generates fully contextual follow-up drafts based on the lead\'s specific request, budget, and urgency. You always maintain full editorial control—review, edit in one click, or send automatically according to your custom rules.',
    },
    {
      question: 'Can I connect my existing lead forms?',
      answer:
        'Yes. You can route leads directly from WordPress, Webflow, Squarespace, Typeform, or standard email forwards into FlowDesk with zero custom code.',
    },
    {
      question: 'Is my lead data secure?',
      answer:
        'Yes. FlowDesk adheres to strict privacy standards. Your lead communications and customer emails are never used to train public language models, and all transmissions are encrypted in transit and at rest.',
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Yes. FlowDesk offers month-to-month plans with no long-term contracts or cancellation penalties. You can upgrade, downgrade, or cancel directly from your settings at any time.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" spacing="lg" background="canvas" className="border-b border-zinc-200/80">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto">
            Everything you need to know about setting up automated lead follow-up.
          </p>
        </div>

        {/* Accessible Accordion */}
        <div className="max-w-3xl mx-auto divide-y divide-zinc-200 border-y border-zinc-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded-sm"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="text-sm sm:text-base font-semibold text-zinc-950 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200',
                      isOpen && 'transform rotate-180 text-zinc-950'
                    )}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="pt-2 pb-2 text-xs sm:text-sm text-zinc-600 leading-relaxed pr-6"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
