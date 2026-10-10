import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Avatar } from '../components/ui/Avatar';
import { Divider } from '../components/ui/Divider';
import { Modal } from '../components/ui/Modal';
import { 
  ArrowRight, 
  Search, 
  Mail, 
  Send, 
  Sparkles, 
  Check, 
  SlidersHorizontal,
  Layers,
  Palette,
  Type,
  LayoutGrid
} from 'lucide-react';

export const DesignSystemView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'primitives' | 'forms' | 'typography' | 'tokens'>('primitives');

  const triggerLoading = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 1800);
  };

  return (
    <div className="w-full">
      {/* Foundation Hero Header */}
      <Section spacing="md" background="surface" bordered>
        <Container>
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
              <span>FlowDesk Architecture</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-900 font-semibold">Phase 1 Foundation</span>
              <span aria-hidden="true">·</span>
              <span>Design System & Primitives</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Foundation & UI Component System
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
              Production-ready frontend architecture built for FlowDesk. Engineered with a restrained neutral palette, 
              strict typography hierarchy, zero-pill discipline, and modern B2B SaaS standards.
            </p>
          </div>

          {/* Navigation segmented tabs for exploring the system */}
          <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-lg max-w-fit border border-zinc-200/80">
            <button
              onClick={() => setSelectedTab('primitives')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedTab === 'primitives'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>UI Primitives</span>
            </button>
            <button
              onClick={() => setSelectedTab('forms')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedTab === 'forms'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Form Controls</span>
            </button>
            <button
              onClick={() => setSelectedTab('typography')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedTab === 'typography'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Typography Scale</span>
            </button>
            <button
              onClick={() => setSelectedTab('tokens')}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                selectedTab === 'tokens'
                  ? 'bg-white text-zinc-950 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Color & Tokens</span>
            </button>
          </div>
        </Container>
      </Section>

      {/* Main Content Areas */}
      <Section spacing="lg" background="canvas">
        <Container>
          {/* TAB 1: UI PRIMITIVES */}
          {selectedTab === 'primitives' && (
            <div className="space-y-12">
              {/* Button System */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h2 className="text-base font-semibold text-zinc-950">Button Component</h2>
                  <span className="text-xs text-zinc-500 font-mono">components/ui/Button.tsx</span>
                </div>

                <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-6">
                  {/* Variants */}
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Variants</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary">Primary Action</Button>
                      <Button variant="secondary">Secondary Action</Button>
                      <Button variant="outline">Outline Button</Button>
                      <Button variant="ghost">Ghost Button</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>

                  <Divider />

                  {/* Sizes */}
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">Sizes</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm" variant="outline">Small (32px)</Button>
                      <Button size="md" variant="outline">Medium (36px)</Button>
                      <Button size="lg" variant="outline">Large (44px)</Button>
                    </div>
                  </div>

                  <Divider />

                  {/* Interactive States & Icons */}
                  <div>
                    <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-400 mb-3">States & Affordances</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant="primary"
                        isLoading={buttonLoading}
                        onClick={triggerLoading}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        {buttonLoading ? 'Processing...' : 'Click to Simulate Loading'}
                      </Button>

                      <Button
                        variant="outline"
                        leftIcon={<Mail className="w-4 h-4" />}
                      >
                        Send Email
                      </Button>

                      <Button variant="primary" disabled>
                        Disabled State
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => setModalOpen(true)}
                        leftIcon={<LayoutGrid className="w-4 h-4" />}
                      >
                        Open Modal Dialog
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge System */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h2 className="text-base font-semibold text-zinc-950">Badge Component</h2>
                  <span className="text-xs text-zinc-500 font-mono">components/ui/Badge.tsx</span>
                </div>

                <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
                  <p className="text-xs text-zinc-500">
                    Restrained status indicators with subtle borders and moderate rounding. No oversized pill capsules.
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="neutral" dot>Neutral · Pending</Badge>
                    <Badge variant="accent" dot>Accent · High Priority</Badge>
                    <Badge variant="success" dot>Success · Qualified</Badge>
                    <Badge variant="warning" dot>Warning · Needs Review</Badge>
                    <Badge variant="error" dot>Error · Overdue</Badge>
                    <Badge variant="outline">Outline · Draft</Badge>
                  </div>
                </div>
              </div>

              {/* Card System */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <h2 className="text-base font-semibold text-zinc-950">Card Layouts</h2>
                  <span className="text-xs text-zinc-500 font-mono">components/ui/Card.tsx</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Default Card */}
                  <Card variant="default">
                    <CardHeader>
                      <CardTitle>Standard Surface</CardTitle>
                      <CardDescription>Default 1px hairline border</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Pure white surface designed for dense operational dashboards, lead tables, and structured data blocks.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <span className="text-xs text-zinc-500 font-mono">border-zinc-200</span>
                    </CardFooter>
                  </Card>

                  {/* Interactive Card */}
                  <Card variant="interactive">
                    <CardHeader>
                      <CardTitle>Interactive Card</CardTitle>
                      <CardDescription>Subtle hover lift & border state</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Hover over this container to see the smooth 150ms border-color shift without heavy distracting shadows.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <span className="text-xs text-zinc-900 font-semibold inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                        Select item <ArrowRight className="w-3 h-3 shrink-0" />
                      </span>
                    </CardFooter>
                  </Card>

                  {/* Subtle Card */}
                  <Card variant="subtle">
                    <CardHeader>
                      <CardTitle>Muted Surface</CardTitle>
                      <CardDescription>Subtle tinted background</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Used for secondary configuration boxes, audit trails, and read-only context drawers.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <span className="text-xs text-zinc-500 font-mono">bg-zinc-50/70</span>
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* Avatar & Divider System */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <h3 className="text-sm font-semibold text-zinc-950">Avatar Scales</h3>
                    <span className="text-xs text-zinc-400 font-mono">Avatar.tsx</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar name="Sarah Chen" size="xs" status="online" />
                    <Avatar name="Marcus Vance" size="sm" status="away" />
                    <Avatar name="Elena Rostova" size="md" status="online" />
                    <Avatar name="David Kim" size="lg" status="busy" />
                    <Avatar name="FlowDesk Team" size="xl" />
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-zinc-200 p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <h3 className="text-sm font-semibold text-zinc-950">Dividers</h3>
                    <span className="text-xs text-zinc-400 font-mono">Divider.tsx</span>
                  </div>
                  <div className="space-y-4">
                    <Divider />
                    <Divider label="OR CONTINUE WITH" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FORM CONTROLS */}
          {selectedTab === 'forms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <h2 className="text-base font-semibold text-zinc-950">Form Inputs & Field Primitives</h2>
                <span className="text-xs text-zinc-500 font-mono">components/ui/Input.tsx · Textarea.tsx · Select.tsx</span>
              </div>

              <div className="bg-white rounded-lg border border-zinc-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Standard text input */}
                  <Input
                    label="Business Email"
                    placeholder="name@company.com"
                    helperText="We'll send lead notifications to this inbox."
                    startIcon={<Mail className="w-4 h-4" />}
                    required
                  />

                  {/* Search input with icon */}
                  <Input
                    label="Search Prospects"
                    placeholder="Search by contact name, company, or note..."
                    startIcon={<Search className="w-4 h-4" />}
                  />

                  {/* Input with validation error */}
                  <Input
                    label="Follow-up Delay (Minutes)"
                    defaultValue="-5"
                    error="Delay cannot be negative. Must be between 0 and 120 minutes."
                  />

                  {/* Select dropdown */}
                  <Select
                    label="Lead Status Classification"
                    options={[
                      { label: 'Uncontacted Inbound', value: 'uncontacted' },
                      { label: 'Follow-up Scheduled', value: 'scheduled' },
                      { label: 'Follow-up Sent', value: 'sent' },
                      { label: 'High Intent / Replied', value: 'high_intent' },
                      { label: 'Closed / Won', value: 'won' },
                    ]}
                    defaultValue="uncontacted"
                    helperText="Controls automated cadence routing."
                  />

                  {/* Textarea */}
                  <div className="md:col-span-2">
                    <Textarea
                      label="Custom Follow-up Prompt / Guidance"
                      placeholder="e.g. Reference the kitchen remodeling budget mentioned in their form inquiry and offer a 15-min discovery call tomorrow..."
                      helperText="Instructions provided to the lead follow-up engine."
                      rows={3}
                    />
                  </div>

                  {/* Action row */}
                  <div className="md:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                    <Button variant="ghost" size="sm">Reset</Button>
                    <Button variant="primary" size="sm">Save Configuration</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TYPOGRAPHY SCALE */}
          {selectedTab === 'typography' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <h2 className="text-base font-semibold text-zinc-950">Typography System & Hierarchy</h2>
                <span className="text-xs text-zinc-500 font-mono">Plus Jakarta Sans & JetBrains Mono</span>
              </div>

              <div className="bg-white rounded-lg border border-zinc-200 divide-y divide-zinc-100">
                <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-mono text-zinc-400 w-36 shrink-0">Display (36px / 700)</span>
                  <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                      Turn every lead into a follow-up. Automatically.
                    </h1>
                  </div>
                </div>

                <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-mono text-zinc-400 w-36 shrink-0">H1 (28px / 600)</span>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950">
                      Capture leads and understand intent in real time.
                    </h2>
                  </div>
                </div>

                <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-mono text-zinc-400 w-36 shrink-0">H2 (22px / 600)</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
                      Automated outreach tailored to service businesses.
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-mono text-zinc-400 w-36 shrink-0">Body (15px / 400)</span>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
                      FlowDesk automatically parses incoming lead inquiries, extracts core budget and timeline constraints,
                      and drafts personalized follow-up emails ready for 1-click dispatch.
                    </p>
                  </div>
                </div>

                <div className="p-5 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <span className="text-xs font-mono text-zinc-400 w-36 shrink-0">Data (13px / Mono)</span>
                  <div className="flex-1">
                    <span className="font-mono text-xs tabular-nums text-zinc-700 bg-zinc-100 px-2 py-1 rounded">
                      LEAD_ID: #4092 · AVG_RESPONSE: 3.2m · CONVERSION: 28.4%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COLOR & TOKENS */}
          {selectedTab === 'tokens' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <h2 className="text-base font-semibold text-zinc-950">Color System & Token Budget</h2>
                <span className="text-xs text-zinc-500 font-mono">tokens/tokens.ts · 60-30-10 Rule</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 60% Canvas */}
                <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-950">60% Canvas & Background</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Neutral, warm off-white foundation</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-[#FAFAFA] border border-zinc-200">
                      <span className="text-xs font-medium text-zinc-800">Canvas Default</span>
                      <span className="text-xs font-mono text-zinc-500">#FAFAFA</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-zinc-200">
                      <span className="text-xs font-medium text-zinc-800">Surface White</span>
                      <span className="text-xs font-mono text-zinc-500">#FFFFFF</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-100 border border-zinc-200">
                      <span className="text-xs font-medium text-zinc-800">Subtle Panel</span>
                      <span className="text-xs font-mono text-zinc-500">#F4F4F5</span>
                    </div>
                  </div>
                </div>

                {/* 30% Structural & Typography */}
                <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-950">30% Structure & Text</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">High-contrast near-black and muted grays</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-950 text-white">
                      <span className="text-xs font-medium">Text Primary / Dark Element</span>
                      <span className="text-xs font-mono text-zinc-400">#09090B</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-700 text-white">
                      <span className="text-xs font-medium">Text Secondary</span>
                      <span className="text-xs font-mono text-zinc-300">#52525B</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-200 text-zinc-800">
                      <span className="text-xs font-medium">Hairline Border</span>
                      <span className="text-xs font-mono text-zinc-600">#E4E4E7</span>
                    </div>
                  </div>
                </div>

                {/* 10% Restrained Accent */}
                <div className="bg-white rounded-lg border border-zinc-200 p-5 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-950">10% Restrained Accent</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">Strictly reserved for focus and active indicators</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-900 text-white">
                      <span className="text-xs font-medium">Dark Ink Accent</span>
                      <span className="text-xs font-mono text-zinc-300">#18181B</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-zinc-100 border border-zinc-200 text-zinc-900">
                      <span className="text-xs font-medium">Subtle Tint</span>
                      <span className="text-xs font-mono text-zinc-700">#F4F4F5</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-900">
                      <span className="text-xs font-medium">Semantic Success</span>
                      <span className="text-xs font-mono text-emerald-700">#15803D</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Accessible Interactive Modal Dialog */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Automated Follow-up Trigger"
        description="Verify prompt rules before dispatching this follow-up sequence."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalOpen(false)}
              leftIcon={<Check className="w-3.5 h-3.5" />}
            >
              Confirm Configuration
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-xs text-zinc-600">
            This dialog demonstrates full keyboard accessibility (<kbd className="px-1 py-0.5 bg-zinc-100 rounded text-zinc-800 font-mono text-[10px]">Esc</kbd> to exit), 
            backdrop blur, focus constraints, and single-elevation card depth.
          </p>
          <div className="p-3 bg-zinc-50 rounded border border-zinc-200 text-xs text-zinc-700">
            <strong>Active Policy:</strong> Auto-reply within 4 minutes during operating hours (8:00 AM – 6:00 PM EST).
          </div>
        </div>
      </Modal>
    </div>
  );
};
