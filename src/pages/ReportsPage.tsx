import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Share2,
  Calendar,
  Building2,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { ReportItem } from '../types';

interface ReportsPageProps {
  reports: ReportItem[];
  onOpenExportReport: (report: ReportItem) => void;
}

export function ReportsPage({ reports, onOpenExportReport }: ReportsPageProps) {
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedRange, setSelectedRange] = useState('Q4 2026');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (report: ReportItem) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedId(report.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              Audit & Governance
            </span>
            <span className="text-xs text-slate-400 font-mono">Formal Executive Packages</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Decision & Business Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Production-grade reporting templates for board reviews, investor updates, and operational post-mortems.
          </p>
        </div>

        {/* Global Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="bg-white border border-slate-200 text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 shadow-2xs focus:outline-hidden"
          >
            <option value="All Units">All Business Units</option>
            <option value="Engineering">Engineering & Delivery</option>
            <option value="Sales">Sales & Marketing</option>
            <option value="Executive">Executive Leadership</option>
          </select>

          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="bg-white border border-slate-200 text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 shadow-2xs focus:outline-hidden"
          >
            <option value="Q4 2026">Q4 Fiscal Quarter 2026</option>
            <option value="Oct 2026">October 2026</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="FY 2026-27">Full Financial Year 2026-27</option>
          </select>
        </div>
      </div>

      {copiedId && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Report link copied to clipboard for internal sharing!</span>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {rep.category}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{rep.frequency}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {rep.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{rep.description}</p>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Key Metrics Covered:
                </span>
                <div className="flex flex-wrap gap-1">
                  {rep.metricsCovered.map((m, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">Last Run: {rep.lastGenerated}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleShare(rep)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Share report link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenExportReport(rep)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
