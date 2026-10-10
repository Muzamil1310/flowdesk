import React, { useState, useEffect } from 'react';
import { useLeads } from '../../context/LeadContext';
import { FollowUpTone } from '../../services/aiService';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Skeleton } from '../ui/Skeleton';
import { 
  ArrowLeft, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  RotateCw, 
  Edit3, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn, copyToClipboard } from '../../lib/utils';

export const LeadDetailView: React.FC = () => {
  const { 
    selectedLead, 
    selectLead, 
    activities, 
    isAnalyzing, 
    isGenerating, 
    isSending, 
    selectedTone,
    setSelectedTone,
    analyzeLeadAction, 
    generateFollowUpAction, 
    regenerateFollowUpAction,
    updateFollowUpMessage,
    markFollowUpReady,
    simulateSendFollowUp,
    updateLeadStatus
  } = useLeads();

  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExpandedMessage, setIsExpandedMessage] = useState(false);

  // Keyboard shortcut: Escape returns to lead list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isEditing) {
        selectLead(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectLead, isEditing]);

  if (!selectedLead) {
    return null;
  }

  const handleCopy = async () => {
    if (selectedLead.followUpMessage) {
      const ok = await copyToClipboard(selectedLead.followUpMessage);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    }
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (selectedLead.followUpStatus !== 'sent' && !isSending) {
        simulateSendFollowUp(selectedLead.id);
      }
    }
  };

  const leadActivities = activities.filter((a) => a.leadId === selectedLead.id);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'New': return 'accent' as const;
      case 'Contacted': return 'neutral' as const;
      case 'Follow-up': return 'warning' as const;
      case 'Won': return 'success' as const;
      default: return 'neutral' as const;
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'High': return 'error' as const;
      case 'Medium': return 'warning' as const;
      case 'Low': return 'neutral' as const;
      default: return 'neutral' as const;
    }
  };

  const tones: FollowUpTone[] = ['Professional', 'Friendly', 'Concise'];
  const isMessageLong = selectedLead.originalMessage.length > 280;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-zinc-200">
        <button
          type="button"
          onClick={() => selectLead(null)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded px-1 -ml-1 whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap inline-flex items-center gap-1">Back to All Leads <kbd className="hidden sm:inline font-mono text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">Esc</kbd></span>
        </button>

        <div className="flex items-center gap-2">
          <label htmlFor="lead-status-select" className="text-xs text-zinc-500 font-medium">Change Status:</label>
          <select
            id="lead-status-select"
            value={selectedLead.status}
            onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as any)}
            className="text-xs bg-white border border-zinc-200 rounded px-2.5 py-1 text-zinc-800 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Won">Won</option>
          </select>
        </div>
      </div>

      {/* Lead Title & Quick Header */}
      <section aria-labelledby="lead-profile-heading" className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-white p-4 sm:p-5 rounded-lg border border-zinc-200 shadow-2xs">
        <div className="flex items-start gap-3.5 min-w-0">
          <Avatar name={selectedLead.name} size="lg" status="online" />
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 id="lead-profile-heading" className="text-xl font-bold tracking-tight text-zinc-950 truncate">
                {selectedLead.name}
              </h1>
              <Badge variant={getStatusBadgeVariant(selectedLead.status)} size="sm" dot>
                {selectedLead.status}
              </Badge>
              <Badge variant={getPriorityBadgeVariant(selectedLead.priority)} size="sm">
                {selectedLead.priority} Priority
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 font-medium truncate">
              {selectedLead.company} · Source: <span className="text-zinc-700">{selectedLead.source}</span> · ID: <span className="font-mono">{selectedLead.id}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-zinc-500 self-start sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 min-w-0">
            <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" aria-hidden="true" />
            <span className="font-mono text-zinc-700 truncate max-w-[200px] sm:max-w-none">{selectedLead.email}</span>
          </div>
          {selectedLead.phone && (
            <div className="flex items-center gap-1.5 min-w-0">
              <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" aria-hidden="true" />
              <span className="font-mono text-zinc-700 truncate">{selectedLead.phone}</span>
            </div>
          )}
        </div>
      </section>

      {/* 2-Column Split Details Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 Cols): Inbound Message & Timeline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Original Client Inquiry */}
          <Card variant="default" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
                Original Inbound Message
              </h2>
              <span className="text-[11px] text-zinc-400 font-mono">{selectedLead.createdAt}</span>
            </div>

            <div className="p-3.5 rounded-md bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 leading-relaxed font-sans">
              <p className={cn(!isExpandedMessage && isMessageLong && 'line-clamp-4')}>
                "{selectedLead.originalMessage}"
              </p>
              {isMessageLong && (
                <button
                  type="button"
                  onClick={() => setIsExpandedMessage(!isExpandedMessage)}
                  className="mt-2 text-[11px] text-zinc-900 font-semibold inline-flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 rounded"
                >
                  {isExpandedMessage ? (
                    <>Show less <ChevronUp className="w-3 h-3" /></>
                  ) : (
                    <>Read full message <ChevronDown className="w-3 h-3" /></>
                  )}
                </button>
              )}
            </div>

            <div className="text-[11px] text-zinc-400 pt-1">
              Captured via {selectedLead.source} form routing.
            </div>
          </Card>

          {/* Activity Timeline */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
                Activity Timeline
              </h2>
              <span className="text-xs font-mono text-zinc-400">{leadActivities.length} events</span>
            </div>

            <div className="space-y-4">
              {leadActivities.length === 0 ? (
                <p className="text-xs text-zinc-400">No activity logged yet.</p>
              ) : (
                leadActivities.map((act) => (
                  <div key={act.id} className="relative pl-5 border-l border-zinc-200 space-y-1">
                    <span className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-zinc-950 ring-2 ring-white" />
                    <span className="text-xs font-semibold text-zinc-900 block">{act.title}</span>
                    <p className="text-xs text-zinc-500 leading-normal">{act.description}</p>
                    <span className="text-[10px] text-zinc-400 font-mono block pt-0.5">{act.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Column (7 Cols): AI Analysis & Follow-up Generator */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. AI Lead Summary & Intent Card */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
                  AI Lead Summary & Intent
                </h2>
              </div>

              {!selectedLead.isAnalyzed ? (
                <Button
                  size="sm"
                  variant="primary"
                  isLoading={isAnalyzing}
                  disabled={isAnalyzing}
                  onClick={() => analyzeLeadAction(selectedLead.id)}
                >
                  {isAnalyzing ? 'Analyzing lead...' : 'Analyze Lead'}
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={() => analyzeLeadAction(selectedLead.id)}
                  disabled={isAnalyzing}
                  aria-label="Re-analyze lead"
                  className="text-xs text-zinc-500 hover:text-zinc-900 font-medium inline-flex items-center gap-1 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded px-1"
                >
                  <RotateCw className={cn('w-3 h-3', isAnalyzing && 'animate-spin')} />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Re-analyze'}</span>
                </button>
              )}
            </div>

            {isAnalyzing ? (
              /* Shimmer Skeleton (Zero CLS) */
              <div aria-live="polite" className="space-y-3 py-1">
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </div>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : !selectedLead.isAnalyzed ? (
              <div className="py-6 text-center space-y-2">
                <p className="text-xs text-zinc-500">
                  Run structured AI analysis on {selectedLead.name}'s inquiry to detect budget intent, urgency, and recommended actions.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  isLoading={isAnalyzing}
                  disabled={isAnalyzing}
                  onClick={() => analyzeLeadAction(selectedLead.id)}
                >
                  Run Instant Analysis
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-[11px] text-zinc-500 block">Identified Intent</span>
                    <span className="text-sm font-semibold text-zinc-950 mt-0.5 block">
                      {selectedLead.intent || 'High'} Intent
                    </span>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded border border-zinc-200">
                    <span className="text-[11px] text-zinc-500 block">Suggested Priority</span>
                    <span className="text-sm font-semibold text-zinc-950 mt-0.5 block">
                      {selectedLead.priority} Priority
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-zinc-700 block">Lead Analysis Summary</span>
                  <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50/60 p-3 rounded border border-zinc-100">
                    {selectedLead.summary}
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-md space-y-1">
                  <span className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                    Suggested Next Action
                  </span>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    {selectedLead.suggestedAction}
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* 2. Follow-up Generator & Review Card */}
          <Card variant="default" className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-zinc-900" aria-hidden="true" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
                  Personalized Follow-up Generator
                </h2>
              </div>

              {selectedLead.followUpGenerated && (
                <div className="flex items-center gap-2">
                  <Badge variant={selectedLead.followUpStatus === 'sent' ? 'success' : 'neutral'} size="sm">
                    {selectedLead.followUpStatus === 'sent' ? 'Sent' : selectedLead.followUpStatus === 'ready' ? 'Ready' : 'Draft'}
                  </Badge>
                </div>
              )}
            </div>

            {/* Tone Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-50 rounded-lg border border-zinc-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-zinc-700">Follow-up Tone:</span>
                <div className="grid grid-cols-3 sm:inline-flex items-center p-0.5 bg-zinc-200/70 rounded-md w-full sm:w-auto" role="radiogroup" aria-label="Select follow-up tone">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      role="radio"
                      aria-checked={selectedTone === tone}
                      disabled={isGenerating}
                      onClick={() => {
                        setSelectedTone(tone);
                        if (selectedLead.followUpGenerated) {
                          regenerateFollowUpAction(selectedLead.id, tone);
                        }
                      }}
                      className={cn(
                        'px-2 sm:px-2.5 py-1 text-xs font-medium rounded transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950',
                        selectedTone === tone
                          ? 'bg-white text-zinc-950 font-semibold shadow-2xs'
                          : 'text-zinc-600 hover:text-zinc-950'
                      )}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-zinc-400 self-start sm:self-center">
                Tailored for {selectedLead.name}
              </div>
            </div>

            {isGenerating ? (
              /* Shimmer Skeleton (Zero CLS) */
              <div aria-live="polite" className="space-y-3 py-2">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-28 w-full" />
                <div className="flex justify-between items-center pt-1">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            ) : !selectedLead.followUpGenerated ? (
              <div className="py-8 text-center space-y-3">
                <span className="text-sm font-semibold text-zinc-900 block">
                  No follow-up generated yet
                </span>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Generate a tailored response taking into account {selectedLead.name}'s specific questions, requirements, and urgency in a {selectedTone.toLowerCase()} tone.
                </p>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    isLoading={isGenerating}
                    disabled={isGenerating}
                    onClick={() => generateFollowUpAction(selectedLead.id, selectedTone)}
                    rightIcon={<Sparkles className="w-4 h-4 text-blue-300" />}
                  >
                    Generate {selectedTone} Follow-up
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Draft Message Viewer or Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                      Generated Follow-up Message ({selectedTone})
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 rounded px-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{isEditing ? 'Done Editing' : 'Edit Message'}</span>
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="space-y-1">
                      <Textarea
                        rows={6}
                        value={selectedLead.followUpMessage || ''}
                        onChange={(e) => updateFollowUpMessage(selectedLead.id, e.target.value)}
                        onKeyDown={handleEditorKeyDown}
                        className="font-sans text-xs leading-relaxed"
                        aria-label="Edit follow up message"
                      />
                      <span className="text-[10px] text-zinc-400 block text-right">
                        Tip: Press <kbd className="font-mono bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200">Cmd+Enter</kbd> to send
                      </span>
                    </div>
                  ) : (
                    <div className="p-4 rounded-md bg-white border border-blue-200/90 text-xs text-zinc-800 leading-relaxed font-sans whitespace-pre-line shadow-2xs">
                      {selectedLead.followUpMessage}
                    </div>
                  )}
                </div>

                {/* Follow-up Controls Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      className="w-full sm:w-auto"
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      isLoading={isGenerating}
                      disabled={isGenerating}
                      onClick={() => regenerateFollowUpAction(selectedLead.id, selectedTone)}
                      leftIcon={<RotateCw className="w-3.5 h-3.5" />}
                      className="w-full sm:w-auto"
                    >
                      Regenerate
                    </Button>

                    {selectedLead.followUpStatus !== 'sent' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => markFollowUpReady(selectedLead.id)}
                        leftIcon={<Check className="w-3.5 h-3.5" />}
                        className="col-span-2 sm:col-span-1 w-full sm:w-auto"
                      >
                        Mark as Ready
                      </Button>
                    )}
                  </div>

                  {/* Send Simulation Button */}
                  <div className="w-full sm:w-auto">
                    {selectedLead.followUpStatus === 'sent' ? (
                      <span className="inline-flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 w-full sm:w-auto">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Follow-up Sent</span>
                      </span>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        isLoading={isSending}
                        disabled={isSending}
                        onClick={() => simulateSendFollowUp(selectedLead.id)}
                        rightIcon={<Send className="w-3.5 h-3.5" />}
                        className="w-full sm:w-auto"
                      >
                        {isSending ? 'Sending...' : 'Send Follow-up (Simulation)'}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-zinc-50 rounded border border-zinc-100 text-[11px] text-zinc-500">
                  <strong>Demo Simulation Note:</strong> Clicking "Send follow-up" changes the lead status to <em>Contacted</em>, updates response logs in the timeline, and refreshes dashboard velocity metrics locally.
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
