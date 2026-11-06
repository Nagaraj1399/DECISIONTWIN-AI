import React, { useState } from 'react';
import { KPIData } from '../../types';
import { Sparkline } from './Charts';
import {
  TrendingUp,
  TrendingDown,
  Info,
  DollarSign,
  PieChart,
  FolderGit2,
  Users,
  ShieldAlert,
  HelpCircle,
  X,
} from 'lucide-react';

export function MetricCard({ kpi }: { kpi: KPIData }) {
  const [showDetails, setShowDetails] = useState(false);

  // Icon mapping
  const getIcon = () => {
    switch (kpi.id) {
      case 'kpi-rev':
        return <DollarSign className="w-5 h-5 text-blue-600" />;
      case 'kpi-profit':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'kpi-margin':
        return <PieChart className="w-5 h-5 text-indigo-600" />;
      case 'kpi-projects':
        return <FolderGit2 className="w-5 h-5 text-amber-600" />;
      case 'kpi-util':
        return <Users className="w-5 h-5 text-teal-600" />;
      case 'kpi-risk':
        return <ShieldAlert className="w-5 h-5 text-rose-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSparklineColor = () => {
    if (kpi.changeType === 'positive') return '#16A34A';
    if (kpi.changeType === 'negative') return '#DC2626';
    return '#2563EB';
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 relative group flex flex-col justify-between">
        <div>
          {/* Card Top Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                {getIcon()}
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.name}</span>
            </div>
            <button
              onClick={() => setShowDetails(true)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
              title="View metric details & source"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Main Financial / Numerical Value */}
          <div className="flex items-baseline justify-between mt-1 mb-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
              {kpi.value}
            </span>
            <div className="shrink-0">
              <Sparkline data={kpi.sparkline} color={getSparklineColor()} width={72} height={24} />
            </div>
          </div>
        </div>

        {/* Change Indicator & Subtitle */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium">
            {kpi.changeType === 'positive' && (
              <span className="inline-flex items-center gap-0.5 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                <TrendingUp className="w-3 h-3" />
                {kpi.change}
              </span>
            )}
            {kpi.changeType === 'negative' && (
              <span className="inline-flex items-center gap-0.5 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                <TrendingDown className="w-3 h-3" />
                {kpi.change}
              </span>
            )}
            {kpi.changeType === 'neutral' && (
              <span className="inline-flex items-center gap-0.5 text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                {kpi.change}
              </span>
            )}
            <span className="text-slate-400 text-[11px] truncate max-w-[170px]" title={kpi.timeframe}>
              {kpi.timeframe}
            </span>
          </div>
        </div>
      </div>

      {/* Explanatory Metric Details Dialog */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  {getIcon()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{kpi.name}</h3>
                  <span className="text-xs text-slate-500 font-mono">Current: {kpi.value}</span>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-1">Metric Definition:</span>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {kpi.tooltip}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">Calculation Formula:</span>
                <p className="text-slate-700 font-mono bg-blue-50/60 p-2.5 rounded-xl border border-blue-100">
                  {kpi.formula}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">Authoritative Data Source:</span>
                <p className="text-slate-600 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {kpi.source}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
