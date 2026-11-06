import React, { useState } from 'react';
import {
  Sparkles,
  Download,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle2,
  Filter,
  FileSpreadsheet,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { RevenueCostsChart, BusinessHealthRadial } from '../components/common/Charts';
import {
  KPIData,
  MonthlyTrend,
  BusinessHealthDimension,
  AIInsight,
  ActivityTimelineItem,
  ProjectProfitability,
} from '../types';
import { formatINR } from '../utils/simulationEngine';

interface OverviewPageProps {
  kpis: KPIData[];
  trends: MonthlyTrend[];
  healthDimensions: BusinessHealthDimension[];
  insights: AIInsight[];
  activities: ActivityTimelineItem[];
  projects: ProjectProfitability[];
  onNavigate: (route: string, itemId?: string) => void;
  onOpenExportReport: () => void;
  onOpenCsvImport: () => void;
  onOpenAiAssistant: () => void;
}

export function OverviewPage({
  kpis,
  trends,
  healthDimensions,
  insights,
  activities,
  projects,
  onNavigate,
  onOpenExportReport,
  onOpenCsvImport,
  onOpenAiAssistant,
}: OverviewPageProps) {
  const [projectFilter, setProjectFilter] = useState<'All' | 'Healthy' | 'Review Required' | 'Margin Erosion'>('All');

  const filteredProjects = projects.filter((p) => {
    if (projectFilter === 'All') return true;
    return p.status === projectFilter;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              Executive Cockpit
            </span>
            <span className="text-xs text-slate-400 font-mono">Q4 Fiscal Quarter 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good morning, Mohammed
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here is what is happening across your business. Simulated before you decide.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenCsvImport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            Import CSV Timesheets
          </button>

          <button
            onClick={onOpenExportReport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Executive Report
          </button>

          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Ask DecisionTwin
          </button>
        </div>
      </div>

      {/* KPI Cards (6 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* MAIN DASHBOARD GRID - ROW 1: Trends & Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Revenue & Profit Trends */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Financial Performance
              </span>
              <h3 className="text-base font-bold text-slate-900">Revenue, Costs & Profit Trajectory</h3>
            </div>
            <button
              onClick={() => onNavigate('financial-intelligence')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group"
            >
              Full Intelligence <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <RevenueCostsChart data={trends} />

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-500 block">Avg Monthly Run Rate</span>
              <span className="font-bold text-slate-900 font-mono">₹23.53 Lakhs</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-500 block">Gross Profit Contribution</span>
              <span className="font-bold text-emerald-600 font-mono">₹6.00 Lakhs (+8.2%)</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <span className="text-[10px] text-slate-500 block">Cost-to-Revenue Ratio</span>
              <span className="font-bold text-slate-900 font-mono">76.0%</span>
            </div>
          </div>
        </div>

        {/* Right: Business Health */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col">
          <BusinessHealthRadial dimensions={healthDimensions} />
        </div>
      </div>

      {/* MAIN DASHBOARD GRID - ROW 2: AI Decision Insights & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Decision Insights */}
        <div className="lg:col-span-7 xl:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">AI Decision Insights</h3>
                  <span className="text-[11px] text-slate-500">Root-cause diagnostic from memory & operations</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase bg-slate-100 px-2 py-0.5 rounded">
                Grounded Heuristics
              </span>
            </div>

            <div className="space-y-3.5">
              {insights.map((ins) => (
                <div
                  key={ins.id}
                  className="p-4 rounded-xl border border-slate-200/90 hover:border-blue-300 transition-all bg-slate-50/50 hover:bg-blue-50/30 group"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          ins.priority === 'critical'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : ins.priority === 'high'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {ins.priority} priority
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">Category: {ins.category}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{ins.timestamp}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {ins.title}
                  </h4>

                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    <strong className="text-slate-800">Reason:</strong> {ins.reason}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-rose-600 font-mono">
                      {ins.financialImpact}
                    </span>
                    <button
                      onClick={() => onNavigate('simulator')}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors shadow-2xs"
                    >
                      Simulate Fix <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Decision Activity Timeline */}
        <div className="lg:col-span-5 xl:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Decision Activity Timeline</h3>
                  <span className="text-[11px] text-slate-500">Continuous organizational governance</span>
                </div>
              </div>
              <button
                onClick={() => onNavigate('decisions')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All
              </button>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {activities.map((act) => (
                <div key={act.id} className="relative group text-xs">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-white border-2 border-blue-600 group-hover:scale-125 transition-transform"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{act.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{act.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {act.description}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-[10px]">
                    <span className="text-slate-400 font-medium">By: {act.actor}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                      {act.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Hindsight continuous retention active</span>
            <button
              onClick={() => onNavigate('memory')}
              className="text-blue-600 font-semibold hover:underline text-[11px]"
            >
              Browse 53 Retained Memories →
            </button>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD GRID - ROW 3: Project Profitability Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                Operational Realities
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono font-bold">
                {projects.length} Total Engagements
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Project Profitability & Variance Audit</h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(['All', 'Healthy', 'Review Required', 'Margin Erosion'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  projectFilter === filter
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Project</th>
                <th className="pb-3">Client</th>
                <th className="pb-3 text-right">Revenue</th>
                <th className="pb-3 text-right">Est. Cost</th>
                <th className="pb-3 text-right">Actual Cost</th>
                <th className="pb-3 text-right">Expected Margin</th>
                <th className="pb-3 text-right">Current Margin</th>
                <th className="pb-3 text-center pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredProjects.map((proj) => {
                const marginDelta = proj.currentMargin - proj.expectedMargin;
                return (
                  <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3 pl-2 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {proj.name}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        Lead: {proj.lead} • {proj.hoursBilled}h billed
                      </span>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">{proj.client}</td>
                    <td className="py-3 text-right font-mono font-bold text-slate-900">
                      {formatINR(proj.revenue)}
                    </td>
                    <td className="py-3 text-right font-mono text-slate-500">
                      {formatINR(proj.estimatedCost)}
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-slate-800">
                      {formatINR(proj.actualCost)}
                    </td>
                    <td className="py-3 text-right font-mono text-slate-500">
                      {proj.expectedMargin}%
                    </td>
                    <td className="py-3 text-right font-mono font-bold">
                      <span
                        className={
                          proj.currentMargin >= proj.expectedMargin
                            ? 'text-emerald-600'
                            : proj.currentMargin >= 25
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }
                      >
                        {proj.currentMargin}%
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        ({marginDelta >= 0 ? `+${marginDelta.toFixed(1)}` : marginDelta.toFixed(1)} pp)
                      </span>
                    </td>
                    <td className="py-3 text-center pr-2">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          proj.status === 'Healthy' || proj.status === 'Under Budget'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : proj.status === 'Review Required'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
