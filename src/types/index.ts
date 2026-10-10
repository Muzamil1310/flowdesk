export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Won';
export type LeadPriority = 'High' | 'Medium' | 'Low';
export type LeadIntent = 'High' | 'Medium' | 'Low';

export interface ActivityItem {
  id: string;
  leadId: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'inbound' | 'analysis' | 'draft' | 'sent' | 'status_change';
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  source: 'Website' | 'Email Forward' | 'Zillow' | 'Google Profile' | 'Referral';
  status: LeadStatus;
  priority: LeadPriority;
  originalMessage: string;
  createdAt: string;
  lastActivity: string;
  
  // AI Analysis fields
  isAnalyzed: boolean;
  intent?: LeadIntent;
  summary?: string;
  suggestedAction?: string;

  // Follow-up generator fields
  followUpGenerated?: boolean;
  followUpMessage?: string;
  followUpStatus?: 'draft' | 'ready' | 'sent';
  followUpDueDate?: string;
}

export interface FollowUpItem {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  dueDate: string;
  status: 'Due today' | 'Upcoming' | 'Completed';
  priority: LeadPriority;
  messageSnippet: string;
}

export type DashboardTab = 'overview' | 'leads' | 'followups' | 'analytics' | 'settings';
