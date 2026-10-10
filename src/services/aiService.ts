import { Lead, LeadIntent, LeadPriority } from '../types';

export type FollowUpTone = 'Professional' | 'Friendly' | 'Concise';

export interface LeadAnalysisResult {
  intent: LeadIntent;
  priority: LeadPriority;
  summary: string;
  suggestedAction: string;
  provider?: 'gemini' | 'openai' | 'groq' | 'mock';
  model?: string;
}

export interface FollowUpResult {
  message: string;
  subject?: string;
  provider?: 'gemini' | 'openai' | 'groq' | 'mock';
  model?: string;
}

export interface AIProvider {
  analyzeLead(lead: Lead, signal?: AbortSignal): Promise<LeadAnalysisResult>;
  generateFollowUp(
    lead: Lead,
    options?: { tone?: FollowUpTone; previousMessage?: string; variation?: number; signal?: AbortSignal }
  ): Promise<FollowUpResult>;
}

/**
 * 1. Mock / Fallback Provider
 * Ensures the app never crashes even without an API key or during network downtime.
 * Cycles through distinct variations so Regenerate ALWAYS produces a fresh message.
 */
class MockAIProvider implements AIProvider {
  async analyzeLead(lead: Lead, _signal?: AbortSignal): Promise<LeadAnalysisResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const msg = lead.originalMessage.toLowerCase();

    if (
      msg.includes('pricing') ||
      msg.includes('availability') ||
      msg.includes('quote') ||
      msg.includes('asap') ||
      msg.includes('urgent') ||
      msg.includes('disclosures')
    ) {
      return {
        intent: 'High',
        priority: 'High',
        summary: `${lead.name} exhibits direct purchasing intent regarding ${lead.company || 'their inquiry'}. The inquiry indicates an active buying window and explicit requests for pricing, availability, or documentation.`,
        suggestedAction:
          'Respond with concrete pricing or availability immediately, and propose two convenient times for an introductory call within 24 hours.',
        provider: 'mock',
        model: 'Local Sales Heuristic',
      };
    }

    if (
      msg.includes('interested') ||
      msg.includes('evaluating') ||
      msg.includes('retainer') ||
      msg.includes('bids') ||
      msg.includes('next month')
    ) {
      return {
        intent: 'Medium',
        priority: 'Medium',
        summary: `${lead.name} is evaluating vendor solutions for ${lead.company}. The inquiry demonstrates an ongoing procurement or planning cycle.`,
        suggestedAction:
          'Provide a capability summary and client references, then request a 15-minute scoping call.',
        provider: 'mock',
        model: 'Local Sales Heuristic',
      };
    }

    return {
      intent: 'Low',
      priority: 'Low',
      summary: `${lead.name} submitted an informational inquiry with an exploratory timeline.`,
      suggestedAction:
        'Send introductory overview resources and schedule a check-in reminder for the next planning quarter.',
      provider: 'mock',
      model: 'Local Sales Heuristic',
    };
  }

  async generateFollowUp(
    lead: Lead,
    options?: { tone?: FollowUpTone; previousMessage?: string; variation?: number }
  ): Promise<FollowUpResult> {
    await new Promise((resolve) => setTimeout(resolve, 650));
    const firstName = lead.name.split(' ')[0];
    const tone = options?.tone || 'Professional';

    const toneTemplates: Record<FollowUpTone, string[]> = {
      Professional: [
        `Hi ${firstName},\n\nThank you for contacting FlowDesk regarding ${lead.company}. I have reviewed your inquiry and would be glad to assist with your requirements.\n\nCould we arrange a brief 15-minute discussion tomorrow morning to review next steps? Please let me know what time suits your schedule.\n\nBest regards,\nAlex · FlowDesk Client Advisory`,
        `Hello ${firstName},\n\nThanks for reaching out about ${lead.company}. We frequently help teams manage similar requirements and can ensure a smooth timeline.\n\nWould tomorrow at 10:30 AM or 2:00 PM work for a quick introductory discussion?\n\nSincerely,\nAlex · Client Partnerships`,
        `Hi ${firstName},\n\nI appreciate your message regarding ${lead.company}. We have tailored solutions readily available that address your specific parameters.\n\nWould you prefer I email across our complete deck, or should we schedule a brief phone call this week?\n\nBest regards,\nAlex`,
      ],
      Friendly: [
        `Hi ${firstName}!\n\nGreat to connect with you. Thanks so much for reaching out about your inquiry for ${lead.company}.\n\nWe'd love to help you with this—we frequently support projects with your exact scope and timeline. Would tomorrow at 11:00 AM or 3:00 PM work for a friendly introductory chat?\n\nWarmly,\nAlex · FlowDesk`,
        `Hey ${firstName}!\n\nThanks for getting in touch! Just saw your note about ${lead.company} and wanted to follow up right away.\n\nWe have a few great approaches that fit what you're looking for. Does later today or tomorrow afternoon work for a quick 10-minute catch-up?\n\nCheers,\nAlex`,
        `Hi ${firstName}!\n\nHope you're having a great week! I saw your inquiry for ${lead.company} and would be thrilled to help.\n\nLet me know if you'd like me to send over our quick walkthrough, or if a quick phone call is easier for you.\n\nWarm regards,\nAlex`,
      ],
      Concise: [
        `Hi ${firstName},\n\nThanks for reaching out about ${lead.company}. I reviewed your note regarding "${lead.originalMessage.slice(0, 48)}...".\n\nDo you have 10 minutes tomorrow afternoon for a quick intro call?\n\nBest,\nAlex`,
        `Hi ${firstName},\n\nFollowing up on your inquiry for ${lead.company}. We can accommodate your request starting this week.\n\nDoes tomorrow at 11:00 AM work to connect briefly?\n\nBest,\nAlex`,
        `Hello ${firstName},\n\nReceived your inquiry for ${lead.company}. We have available options and pricing ready for your review.\n\nCan I send the breakdown over, or do you prefer a quick phone call?\n\nRegards,\nAlex`,
      ],
    };

    const variations = toneTemplates[tone] || toneTemplates.Professional;
    let chosenIndex = 0;

    if (options?.previousMessage) {
      const prevIdx = variations.findIndex((msg) => msg === options.previousMessage);
      if (prevIdx !== -1) {
        chosenIndex = (prevIdx + 1) % variations.length;
      } else {
        chosenIndex = 1;
      }
    }

    return {
      message: variations[chosenIndex],
      subject: `Follow-up regarding ${lead.company}`,
      provider: 'mock',
      model: 'Local Sales Heuristic',
    };
  }
}

/**
 * 2. Real AI Server Provider
 * Communicates with server endpoints which support Google Gemini, OpenAI, or Groq.
 */
class RealAIServerProvider implements AIProvider {
  async analyzeLead(lead: Lead, signal?: AbortSignal): Promise<LeadAnalysisResult> {
    const timeoutSignal = AbortSignal.timeout(12000);
    const combinedSignal = signal || timeoutSignal;

    const res = await fetch('/api/analyze-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: combinedSignal,
      body: JSON.stringify({
        lead: {
          name: lead.name,
          company: lead.company,
          email: lead.email,
          originalMessage: lead.originalMessage,
          source: lead.source,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with status ${res.status}`);
    }

    const json = await res.json();
    if (json.fallback) {
      return new MockAIProvider().analyzeLead(lead);
    }

    return {
      intent: json.data.intent,
      priority: json.data.priority,
      summary: json.data.summary,
      suggestedAction: json.data.suggestedAction,
      provider: json.mode || 'gemini',
      model: json.model || 'gemini-3.8-flash',
    };
  }

  async generateFollowUp(
    lead: Lead,
    options?: { tone?: FollowUpTone; previousMessage?: string; variation?: number; signal?: AbortSignal }
  ): Promise<FollowUpResult> {
    const timeoutSignal = AbortSignal.timeout(12000);
    const combinedSignal = options?.signal || timeoutSignal;

    const res = await fetch('/api/generate-followup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: combinedSignal,
      body: JSON.stringify({
        lead: {
          name: lead.name,
          company: lead.company,
          originalMessage: lead.originalMessage,
          source: lead.source,
          summary: lead.summary,
          intent: lead.intent,
          suggestedAction: lead.suggestedAction,
        },
        tone: options?.tone || 'Professional',
        previousMessage: options?.previousMessage,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with status ${res.status}`);
    }

    const json = await res.json();
    if (json.fallback) {
      return new MockAIProvider().generateFollowUp(lead, options);
    }

    return {
      message: json.data.message,
      subject: json.data.subject,
      provider: json.mode || 'gemini',
      model: json.model || 'gemini-3.8-flash',
    };
  }
}

/**
 * Check AI backend health and active engine
 */
export async function checkAIServiceHealth(): Promise<{
  mode: 'gemini' | 'openai' | 'groq' | 'mock-fallback';
  model: string;
  hasKey: boolean;
}> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    const data = await res.json();
    return {
      mode: data.mode || (data.hasKey ? 'gemini' : 'mock-fallback'),
      model: data.model || 'gemini-3.8-flash',
      hasKey: Boolean(data.hasKey),
    };
  } catch {
    return {
      mode: 'mock-fallback',
      model: 'Deterministic Heuristic Fallback',
      hasKey: false,
    };
  }
}

// Master Application-Level Service Functions
const serverAIProvider = new RealAIServerProvider();
const mockFallbackProvider = new MockAIProvider();

export async function analyzeLead(lead: Lead, signal?: AbortSignal): Promise<LeadAnalysisResult> {
  try {
    return await serverAIProvider.analyzeLead(lead, signal);
  } catch (error) {
    console.warn('Live AI request failed, falling back to mock provider:', error);
    return await mockFallbackProvider.analyzeLead(lead);
  }
}

export async function generateFollowUp(
  lead: Lead,
  options?: { tone?: FollowUpTone; previousMessage?: string; signal?: AbortSignal }
): Promise<FollowUpResult> {
  try {
    return await serverAIProvider.generateFollowUp(lead, options);
  } catch (error) {
    console.warn('Live AI request failed, falling back to mock provider:', error);
    return await mockFallbackProvider.generateFollowUp(lead, options);
  }
}

export async function regenerateFollowUp(
  lead: Lead,
  options?: { tone?: FollowUpTone; previousMessage?: string; signal?: AbortSignal }
): Promise<FollowUpResult> {
  return generateFollowUp(lead, options);
}
