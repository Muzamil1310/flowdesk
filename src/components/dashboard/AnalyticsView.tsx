import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, Users, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const statusDistribution = [
    { label: 'New Inbound', count: 24, percent: 18.8, color: 'bg-zinc-950' },
    { label: 'Follow-up Sent', count: 58, percent: 45.3, color: 'bg-zinc-700' },
    { label: 'Awaiting Action', count: 22, percent: 17.2, color: 'bg-zinc-500' },
    { label: 'Won / Converted', count: 24, percent: 18.7, color: 'bg-emerald-600' },
  ];

  const weeklyTrend = [
    { week: 'W1', count: 18 },
    { week: 'W2', count: 26 },
    { week: 'W3', count: 34 },
    { week: 'W4', count: 50 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
          Pipeline Analytics
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Track inbound response volume, follow-up velocity, and deal conversions.
        </p>
      </div>

      {/* 5 Core Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <Card variant="default" className="p-3.5 sm:p-4 min-w-0 overflow-hidden">
          <span className="text-xs text-zinc-500 block truncate">Leads this month</span>
          <span className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-mono mt-1 block tabular-nums truncate">
            128
          </span>
          <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium block mt-1 truncate">+24% vs last mo</span>
        </Card>

        <Card variant="default" className="p-3.5 sm:p-4 min-w-0 overflow-hidden">
          <span className="text-xs text-zinc-500 block truncate">Follow-ups</span>
          <span className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-mono mt-1 block tabular-nums truncate">
            94
          </span>
          <span className="text-[10px] sm:text-[11px] text-zinc-400 block mt-1 truncate">Avg 3.4m delay</span>
        </Card>

        <Card variant="default" className="p-3.5 sm:p-4 min-w-0 overflow-hidden">
          <span className="text-xs text-zinc-500 block truncate">Responses</span>
          <span className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-mono mt-1 block tabular-nums truncate">
            62
          </span>
          <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium block mt-1 truncate">66% reply rate</span>
        </Card>

        <Card variant="default" className="p-3.5 sm:p-4 min-w-0 overflow-hidden">
          <span className="text-xs text-zinc-500 block truncate">Conversions</span>
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono mt-1 block tabular-nums truncate">
            24
          </span>
          <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium block mt-1 truncate">Won clients</span>
        </Card>

        <Card variant="default" className="p-3.5 sm:p-4 col-span-2 sm:col-span-1 min-w-0 overflow-hidden">
          <span className="text-xs text-zinc-500 block truncate">Conversion rate</span>
          <span className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-mono mt-1 block tabular-nums truncate">
            18.4%
          </span>
          <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium block mt-1 truncate">Industry avg 8%</span>
        </Card>
      </div>

      {/* 2 Lightweight Visual Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Weekly Lead Trend */}
        <Card variant="default" className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
              Inbound Leads Velocity
            </h2>
            <span className="text-xs font-mono text-zinc-400">Past 4 weeks</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-4 pt-6 px-4 border-b border-zinc-100">
            {weeklyTrend.map((item) => (
              <div key={item.week} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-mono font-semibold text-zinc-800">
                  {item.count}
                </span>
                <div
                  className="w-full max-w-[48px] bg-zinc-900 rounded-t transition-all hover:bg-zinc-700"
                  style={{ height: `${(item.count / 55) * 100}%` }}
                />
                <span className="text-xs text-zinc-400 font-mono">{item.week}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500">
            Lead capture volume accelerated following web form auto-sync integration.
          </p>
        </Card>

        {/* Chart 2: Pipeline Status Breakdown */}
        <Card variant="default" className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-950">
              Pipeline Distribution
            </h2>
            <span className="text-xs font-mono text-zinc-400">128 Total</span>
          </div>

          <div className="space-y-3 pt-2">
            {statusDistribution.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-700 font-medium">{item.label}</span>
                  <span className="font-mono text-zinc-500">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-zinc-500 pt-2 border-t border-zinc-100">
            Median first-touch follow-up speed sits at <strong>3.4 minutes</strong>.
          </p>
        </Card>
      </div>
    </div>
  );
};
