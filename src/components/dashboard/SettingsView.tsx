import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { User, Bell, Palette, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [leadAlertsEnabled, setLeadAlertsEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
          Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Configure notification alerts, sender profiles, and follow-up preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <Card variant="default" className="p-6 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
            <User className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-semibold text-zinc-950">User Profile</h2>
          </div>

          <div className="flex items-center gap-4">
            <Avatar name="Alex Vance" size="lg" />
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-zinc-950 block">Alex Vance</span>
              <span className="text-xs text-zinc-500 block">Workspace Owner · Small Business Tier</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              defaultValue="Alex Vance"
              required
            />
            <Input
              label="Work Email"
              defaultValue="alex@flowdesk.demo"
              type="email"
              required
              helperText="Notifications will route to this email."
            />
          </div>
        </Card>

        {/* Notifications Card */}
        <Card variant="default" className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
            <Bell className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-semibold text-zinc-950">Follow-up Alerts</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
              <div className="min-w-0 flex-1 pr-2">
                <span className="text-xs font-semibold text-zinc-900 block truncate">
                  Follow-up Reminders
                </span>
                <span className="text-[11px] text-zinc-500 block leading-normal break-words">
                  Alert me when a high-priority lead has sat uncontacted for more than 1 hour.
                </span>
              </div>
              <input
                type="checkbox"
                checked={remindersEnabled}
                onChange={(e) => setRemindersEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-zinc-950 focus:ring-zinc-950 cursor-pointer shrink-0 mt-0.5 sm:mt-0"
              />
            </div>

            <div className="flex items-start sm:items-center justify-between gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
              <div className="min-w-0 flex-1 pr-2">
                <span className="text-xs font-semibold text-zinc-900 block truncate">
                  Instant Lead Inbound Alerts
                </span>
                <span className="text-[11px] text-zinc-500 block leading-normal break-words">
                  Send desktop push alerts immediately when new inquiries are captured.
                </span>
              </div>
              <input
                type="checkbox"
                checked={leadAlertsEnabled}
                onChange={(e) => setLeadAlertsEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-zinc-950 focus:ring-zinc-950 cursor-pointer shrink-0 mt-0.5 sm:mt-0"
              />
            </div>
          </div>
        </Card>

        {/* Appearance Placeholder */}
        <Card variant="default" className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
            <Palette className="w-4 h-4 text-zinc-700" />
            <h2 className="text-sm font-semibold text-zinc-950">Appearance</h2>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-600">
            <span>Theme Preference</span>
            <span className="font-semibold text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded border border-zinc-200">
              Light (Linear B2B Neutral)
            </span>
          </div>
        </Card>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Settings updated
            </span>
          )}
          <Button variant="primary" size="md" type="submit">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};
