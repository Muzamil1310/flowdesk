import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { DashboardLayout } from './DashboardLayout';
import { OverviewView } from './OverviewView';
import { LeadsListView } from './LeadsListView';
import { LeadDetailView } from './LeadDetailView';
import { FollowUpsView } from './FollowUpsView';
import { AnalyticsView } from './AnalyticsView';
import { SettingsView } from './SettingsView';

export interface DashboardMainProps {
  onExitToWebsite: () => void;
}

export const DashboardMain: React.FC<DashboardMainProps> = ({ onExitToWebsite }) => {
  const { activeTab, selectedLeadId } = useLeads();

  return (
    <DashboardLayout onExitToWebsite={onExitToWebsite}>
      {activeTab === 'overview' && <OverviewView />}
      {activeTab === 'leads' && (selectedLeadId ? <LeadDetailView /> : <LeadsListView />)}
      {activeTab === 'followups' && <FollowUpsView />}
      {activeTab === 'analytics' && <AnalyticsView />}
      {activeTab === 'settings' && <SettingsView />}
    </DashboardLayout>
  );
};
