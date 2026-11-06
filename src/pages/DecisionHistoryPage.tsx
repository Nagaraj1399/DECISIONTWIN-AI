import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Database,
  Calendar,
  User,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { Decision, DecisionStatus, DecisionCategory } from '../types';
import { formatINR } from '../utils/simulationEngine';

interface DecisionHistoryPageProps {
  decisions: Decision[];
  selectedDecisionId?: string | null;
  onSelectDecision: (id: string | null) => void;
  onNavigateToStudio: () => void;
}

export function DecisionHistoryPage({
  decisions,
  selectedDecisionId,
  onSelectDecision,
  onNavigateToStudio,
}: DecisionHistoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const selectedDecision = decisions.find((d) => d.id === selectedDecisionId);

  // If a decision is selected, render the DECISION DETAIL PAGE
  if (selectedDecision) {
    return (
      <div className="space-y-6 pb-12 animate-fadeIn">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onSelectDecision(null)}
            className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Decision History
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">ID: {selectedDecision.id}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedDecision.status === 'Completed'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : selectedDecision.status === 'Under Review'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}
            >
              {selectedDecision.status}
            </span>
          </div>
        </div>

        {/* Detail Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              {selectedDecision.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Created {selectedDecision.createdDate}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 font-medium flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Owner: {selectedDecision.owner}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {selectedDecision.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            {selectedDecision.description}
          </p>
        </div>

        {/* 10-Item Structured History Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Context, Options, and Comparison */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Original Business Question */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                1. Original Business Question
              </span>
              <p className="text-sm font-bold text-slate-900 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                "{selectedDecision.originalQuestion}"
              </p>
            </div>

            {/* 2. Information Available at the Time */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                2. Information Available at the Time
              </span>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedDecision.informationAvailable.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Options Evaluated */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                3. Options Evaluated in Studio
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedDecision.optionsEvaluated.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border text-xs flex flex-col justify-between ${
                      opt.name.includes(selectedDecision.selectedOption)
                        ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-500'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900 mb-1">{opt.name}</div>
                      <p className="text-[11px] text-slate-600">{opt.description}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between text-[11px]">
                      <span className="font-mono text-emerald-700 font-bold">{opt.projectedRoi}</span>
                      <span className="text-slate-500 font-medium">Risk: {opt.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 & 5. Simulation Results & AI Recommendation */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-4 h-4 text-indigo-600" />
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  4 & 5. Simulation Results & DecisionTwin Recommendation
                </h4>
              </div>
              <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs space-y-1.5">
                <div className="font-semibold text-indigo-900">
                  Recommended: {selectedDecision.recommendedOption}
                </div>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  {selectedDecision.simulationResultsSummary}
                </p>
                <p className="text-indigo-800 text-[11px] font-medium pt-1">
                  {selectedDecision.aiRecommendation}
                </p>
              </div>
            </div>

            {/* 6 & 7. Owner's Final Decision & Rationale */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                6 & 7. Owner's Final Decision & Rationale
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    Selected Option: {selectedDecision.selectedOption}
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                    Authorized Sign-off
                  </span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  <strong className="text-slate-900">Stated Rationale:</strong>{' '}
                  {selectedDecision.finalReasoning || 'Approved to scale capacity and capture customer commitments.'}
                </p>
              </div>
            </div>

            {/* 8. Predicted vs Actual Outcome (Variance!) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                8. Predicted vs Actual Outcome Analysis
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
                    Predicted Outcome
                  </span>
                  <p className="font-medium text-slate-800 leading-relaxed">
                    {selectedDecision.predictedImpact}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    Actual Measured Outcome
                  </span>
                  <p className="font-medium text-slate-800 leading-relaxed">
                    {selectedDecision.actualImpact || 'Measurement in progress. Review scheduled for end of quarter.'}
                  </p>
                  {selectedDecision.variance && (
                    <div className="mt-2 text-[11px] font-bold text-rose-700 font-mono">
                      Variance: {selectedDecision.variance}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 9. Lessons Learned */}
            {selectedDecision.lessonsLearned && selectedDecision.lessonsLearned.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  9. Lessons Learned Retained into Hindsight
                </span>
                <div className="space-y-2 text-xs">
                  {selectedDecision.lessonsLearned.map((les, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <p className="text-[11px] font-medium leading-relaxed">{les}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: 10. Event Timeline */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <Clock className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  10. Decision Lifecycle Timeline
                </h4>
              </div>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 text-xs">
                {selectedDecision.timeline.map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-white border-2 border-blue-600"></div>
                    <div className="font-mono text-[10px] text-slate-400">{item.date}</div>
                    <div className="font-bold text-slate-900 mt-0.5">{item.event}</div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Hindsight Vector Lineage</span>
              <span className="font-mono text-emerald-600 font-semibold">Immutable Record</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TABLE VIEW OF ALL DECISIONS
  const filteredDecisions = decisions.filter((d) => {
    const matchesSearch =
      !searchTerm ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              Organizational Ledger
            </span>
            <span className="text-xs text-slate-400 font-mono">Traceable Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Decision History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Every important business decision, preserved with its reasoning and outcome.
          </p>
        </div>

        <button
          onClick={onNavigateToStudio}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Simulate New Decision
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search decisions by title, keyword, or category..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Outcome Pending">Outcome Pending</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Categories</option>
            <option value="Hiring & Workforce">Hiring & Workforce</option>
            <option value="Pricing & Revenue">Pricing & Revenue</option>
            <option value="Customer & Contracts">Customer & Contracts</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
      </div>

      {/* Filterable Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3.5 pl-4">Decision Title</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Date</th>
                <th className="py-3.5 px-3">Owner</th>
                <th className="py-3.5 px-3">Selected Plan</th>
                <th className="py-3.5 px-3">Predicted Impact</th>
                <th className="py-3.5 px-3">Actual Impact</th>
                <th className="py-3.5 px-3 text-center">Status</th>
                <th className="py-3.5 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredDecisions.map((dec) => (
                <tr
                  key={dec.id}
                  onClick={() => onSelectDecision(dec.id)}
                  className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 pl-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors max-w-[260px]">
                    {dec.title}
                    <span className="text-[10px] text-slate-400 block font-normal truncate">
                      {dec.description}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-200">
                      {dec.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {dec.createdDate}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-medium whitespace-nowrap">
                    {dec.owner}
                  </td>
                  <td className="py-3.5 px-3 text-slate-800 font-semibold max-w-[180px] truncate">
                    {dec.selectedOption}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 font-mono text-[11px] max-w-[160px] truncate">
                    {dec.predictedImpact}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[11px] max-w-[160px] truncate">
                    {dec.actualImpact ? (
                      <span className="text-slate-900">{dec.actualImpact}</span>
                    ) : (
                      <span className="text-slate-400 italic">Pending measurement</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        dec.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : dec.status === 'Under Review'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : dec.status === 'Approved'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {dec.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDecision(dec.id);
                      }}
                      className="px-2.5 py-1 rounded-lg text-blue-600 hover:bg-blue-50 font-semibold text-xs flex items-center gap-1 ml-auto"
                    >
                      View Detail <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
