import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Lead, ActivityItem, LeadStatus, DashboardTab } from '../types';
import { INITIAL_LEADS, INITIAL_ACTIVITIES } from '../data/mockData';
import {
  analyzeLead,
  generateFollowUp,
  regenerateFollowUp,
  checkAIServiceHealth,
  FollowUpTone,
} from '../services/aiService';

interface EngineInfo {
  mode: 'gemini' | 'openai' | 'groq' | 'mock-fallback';
  model: string;
  hasKey: boolean;
}

interface LeadContextType {
  leads: Lead[];
  selectedLeadId: string | null;
  selectedLead: Lead | null;
  activities: ActivityItem[];
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  selectLead: (id: string | null) => void;

  // Asynchronous workflow actions with loading states
  isAnalyzing: boolean;
  isGenerating: boolean;
  isSending: boolean;
  actionNotification: string | null;
  selectedTone: FollowUpTone;
  setSelectedTone: (tone: FollowUpTone) => void;
  engineInfo: EngineInfo;

  analyzeLeadAction: (id: string) => Promise<void>;
  generateFollowUpAction: (id: string, tone?: FollowUpTone) => Promise<void>;
  regenerateFollowUpAction: (id: string, tone?: FollowUpTone) => Promise<void>;
  updateFollowUpMessage: (id: string, message: string) => void;
  markFollowUpReady: (id: string) => void;
  simulateSendFollowUp: (id: string) => Promise<void>;
  toggleFollowUpComplete: (id: string) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  clearNotification: () => void;

  metrics: {
    totalLeads: number;
    newLeads: number;
    followUpsDue: number;
    conversionRate: string;
  };
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [actionNotification, setActionNotification] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<FollowUpTone>('Professional');

  const [engineInfo, setEngineInfo] = useState<EngineInfo>({
    mode: 'gemini',
    model: 'gemini-3.8-flash',
    hasKey: true,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    checkAIServiceHealth().then((info) => {
      setEngineInfo(info);
    });
  }, []);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || null;

  const showNotification = (msg: string) => {
    setActionNotification(msg);
    setTimeout(() => {
      setActionNotification(null);
    }, 3800);
  };

  const selectLead = (id: string | null) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsAnalyzing(false);
      setIsGenerating(false);
    }
    setSelectedLeadId(id);
    if (id && activeTab !== 'leads') {
      setActiveTab('leads');
    }
  };

  const analyzeLeadAction = async (id: string) => {
    const target = leads.find((l) => l.id === id);
    if (!target) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsAnalyzing(true);
    try {
      const result = await analyzeLead(target, controller.signal);

      setLeads((prev) =>
        prev.map((l) =>
          l.id === id
            ? {
                ...l,
                isAnalyzed: true,
                intent: result.intent,
                priority: result.priority,
                summary: result.summary,
                suggestedAction: result.suggestedAction,
                lastActivity: 'Just now',
              }
            : l
        )
      );

      // Add to timeline
      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        leadId: id,
        title: 'AI Lead Analysis',
        description: `Intent detected as ${result.intent}. Suggested action formulated.`,
        timestamp: 'Just now',
        type: 'analysis',
      };
      setActivities((prev) => [newActivity, ...prev]);
      showNotification('Lead context analyzed.');
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        showNotification('AI analysis is temporarily unavailable. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateFollowUpAction = async (id: string, tone?: FollowUpTone) => {
    const target = leads.find((l) => l.id === id);
    if (!target) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const useTone = tone || selectedTone;
    setIsGenerating(true);
    try {
      const res = await generateFollowUp(target, { tone: useTone, signal: controller.signal });

      setLeads((prev) =>
        prev.map((l) =>
          l.id === id
            ? {
                ...l,
                followUpGenerated: true,
                followUpMessage: res.message,
                followUpStatus: 'draft',
                lastActivity: 'Just now',
              }
            : l
        )
      );

      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        leadId: id,
        title: `Follow-up draft generated (${useTone})`,
        description: 'Personalized response formulated for prospect.',
        timestamp: 'Just now',
        type: 'draft',
      };
      setActivities((prev) => [newActivity, ...prev]);
      showNotification(`Personalized follow-up generated (${useTone} tone).`);
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        showNotification('Unable to generate a follow-up right now. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateFollowUpAction = async (id: string, tone?: FollowUpTone) => {
    const target = leads.find((l) => l.id === id);
    if (!target) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const useTone = tone || selectedTone;
    setIsGenerating(true);
    try {
      const res = await regenerateFollowUp(target, {
        tone: useTone,
        previousMessage: target.followUpMessage,
        signal: controller.signal,
      });

      setLeads((prev) =>
        prev.map((l) =>
          l.id === id
            ? {
                ...l,
                followUpMessage: res.message,
                followUpStatus: 'draft',
                lastActivity: 'Just now',
              }
            : l
        )
      );
      showNotification(`Generated alternative variation (${useTone} tone).`);
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        showNotification('Unable to regenerate follow-up right now. Please try again.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const updateFollowUpMessage = (id: string, message: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, followUpMessage: message } : l))
    );
  };

  const markFollowUpReady = (id: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, followUpStatus: 'ready', lastActivity: 'Just now' } : l
      )
    );
    showNotification('Follow-up marked as ready for dispatch.');
  };

  const simulateSendFollowUp = async (id: string) => {
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 550));

    try {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === id
            ? {
                ...l,
                status: 'Contacted',
                followUpStatus: 'sent',
                lastActivity: 'Just now',
                followUpDueDate: 'In 2 days',
              }
            : l
        )
      );

      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        leadId: id,
        title: 'Follow-up sent (simulated)',
        description: 'Response dispatched. Lead status updated to Contacted.',
        timestamp: 'Just now',
        type: 'sent',
      };
      setActivities((prev) => [newActivity, ...prev]);
      showNotification('Follow-up sent successfully! Status updated to Contacted.');
    } finally {
      setIsSending(false);
    }
  };

  const toggleFollowUpComplete = (id: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              followUpDueDate: l.followUpDueDate === 'Completed' ? 'Today' : 'Completed',
              lastActivity: 'Just now',
            }
          : l
      )
    );
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, lastActivity: 'Just now' } : l))
    );
  };

  // Dynamically compute metrics from current state
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const followUpsDue = leads.filter(
    (l) => l.followUpDueDate === 'Today' && l.status !== 'Won'
  ).length;
  const wonCount = leads.filter((l) => l.status === 'Won').length;
  const conversionRate = `${((wonCount / totalLeads) * 100).toFixed(1)}%`;

  return (
    <LeadContext.Provider
      value={{
        leads,
        selectedLeadId,
        selectedLead,
        activities,
        activeTab,
        setActiveTab,
        selectLead,
        isAnalyzing,
        isGenerating,
        isSending,
        actionNotification,
        selectedTone,
        setSelectedTone,
        engineInfo,
        analyzeLeadAction,
        generateFollowUpAction,
        regenerateFollowUpAction,
        updateFollowUpMessage,
        markFollowUpReady,
        simulateSendFollowUp,
        toggleFollowUpComplete,
        updateLeadStatus,
        clearNotification: () => setActionNotification(null),
        metrics: {
          totalLeads,
          newLeads,
          followUpsDue,
          conversionRate,
        },
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
