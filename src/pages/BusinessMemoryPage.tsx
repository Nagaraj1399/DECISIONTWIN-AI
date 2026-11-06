import React, { useState } from 'react';
import {
  Database,
  Search,
  Sparkles,
  Calendar,
  Lock,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Clock,
  HelpCircle,
  FileText,
  Filter,
} from 'lucide-react';
import { BusinessMemoryEntry, MemoryCategory } from '../types';

interface BusinessMemoryPageProps {
  memories: BusinessMemoryEntry[];
  onOpenHindsightModal: () => void;
  onNavigateToSimulator: () => void;
}

export function BusinessMemoryPage({
  memories,
  onOpenHindsightModal,
  onNavigateToSimulator,
}: BusinessMemoryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'explorer' | 'timeline' | 'search'>('explorer');

  const categories: MemoryCategory[] = [
    'Business Facts',
    'Decision History',
    'Lessons Learned',
    'Strategic Preferences',
  ];

  const filteredMemories = memories.filter((m) => {
    const matchesSearch =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const memoryTimeline = [
    {
      month: 'January 2026',
      title: 'Premature Capacity Expansion Hazard',
      desc: 'Hired 3 developers prior to SOW signoff, leading to ₹3.6L unbilled idle bench drag.',
      category: 'Hiring',
      impact: '-₹3.6L idle drag',
    },
    {
      month: 'March 2026',
      title: 'Phased Billing Rate Grandfathering',
      desc: 'Successfully increased hourly rate floor to ₹1,850/hr with zero client churn across 18 accounts.',
      category: 'Pricing',
      impact: '+₹2.4L/mo margin expansion',
    },
    {
      month: 'August 2026',
      title: 'Fixed-Price Informal Scope Creep Trap',
      desc: 'Project Alpha experienced 14% margin slip due to unbilled sprint feature additions.',
      category: 'Operations',
      impact: '14 pp margin erosion',
    },
    {
      month: 'September 2026',
      title: 'Contractor Agility for Niche Stacks',
      desc: 'Engaged external graph database contractors on Project Delta, avoiding permanent bench severance.',
      category: 'Strategy',
      impact: 'Protected ₹2.8L in avoided overhead',
    },
    {
      month: 'November 2026',
      title: 'Customer Concentration Diversification Imperative',
      desc: 'Identified 64% revenue concentration across top 3 accounts, mandating mid-market pipeline focus.',
      category: 'Risk',
      impact: 'Ongoing strategic governance rule',
    },
  ];

  const exampleQueries = [
    'Have we faced a similar hiring situation before?',
    'What happened after our last developer hiring decision?',
    'Which projects repeatedly exceeded delivery budget?',
    'What lessons have we learned about customer pricing?',
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              Hindsight Vector Memory
            </span>
            <span className="text-xs text-slate-400 font-mono">Isolated Workspace: novatech-solutions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Organizational Memory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Your business learns from its decisions and experiences. Retained, recalled, and reflected continuously.
          </p>
        </div>

        <button
          onClick={onOpenHindsightModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors self-start sm:self-auto"
        >
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          Hindsight Architecture & Status
        </button>
      </div>

      {/* 4 MEMORY CATEGORIES OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const count = memories.filter((m) => m.category === cat).length;
          return (
            <div
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                  : 'bg-white border-slate-200/80 hover:border-blue-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Category
                </span>
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md">
                  {count} Retained
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{cat}</h4>
              <p className="text-[11px] text-slate-500 mt-1">
                {cat === 'Business Facts' && 'Verified payroll CTC, client billing floors, and lead times.'}
                {cat === 'Decision History' && 'Past recorded commitments, chosen plans, and variance logs.'}
                {cat === 'Lessons Learned' && 'Post-mortems from delivery slips, scope creep, and hiring.'}
                {cat === 'Strategic Preferences' && 'Board policies, 25% margin floor, and 60-day cash buffer.'}
              </p>
            </div>
          );
        })}
      </div>

      {/* View Switcher: Explorer / Timeline / Search */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'explorer'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Memory Explorer ({filteredMemories.length})
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'timeline'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Knowledge Timeline
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'search'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Ask Business Memory
          </button>
        </div>

        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs text-blue-600 font-semibold hover:underline"
          >
            Clear Filter ({selectedCategory})
          </button>
        )}
      </div>

      {/* TAB 1: MEMORY EXPLORER */}
      {activeTab === 'explorer' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search business memory by tag, keyword, or decision reference..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMemories.map((mem) => (
              <div
                key={mem.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                      {mem.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        mem.status === 'Verified Fact'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : mem.status === 'Empirical Lesson'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {mem.status} ({mem.confidence}%)
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm tracking-tight">{mem.title}</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{mem.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="truncate max-w-[200px]">Source: {mem.source}</span>
                    <span className="font-mono text-[10px]">Retained: {mem.dateRetained}</span>
                  </div>

                  {mem.tags && (
                    <div className="flex flex-wrap gap-1">
                      {mem.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KNOWLEDGE TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Knowledge Accumulation Narrative</h3>
            <p className="text-xs text-slate-500">
              How NovaTech Solutions converts delivery experiences and decisions into persistent strategic memory
            </p>
          </div>

          <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-200">
            {memoryTimeline.map((item, idx) => (
              <div key={idx} className="relative group text-xs">
                <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 shadow-xs"></div>
                <div className="flex items-center justify-between text-[11px] font-mono text-indigo-600 font-bold">
                  <span>{item.month}</span>
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px]">
                    Category: {item.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-3xl">{item.desc}</p>
                <div className="mt-2 text-[11px] font-semibold text-emerald-700 font-mono">
                  Lesson Impact: {item.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ASK BUSINESS MEMORY */}
      {activeTab === 'search' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Interactive Memory Search</h3>
            <p className="text-xs text-slate-500">
              Query your company's past decisions, vendor lessons, and financial precedents with semantic attribution
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask your business memory... (e.g. Have we faced a similar hiring situation before?)"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all font-medium"
              />
              <button
                onClick={() => setSearchQuery('hiring')}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Search Memory
              </button>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Suggested Inquiries:</span>
              {exampleQueries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setSearchQuery(q.split(' ')[2] || 'hiring')}
                  className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>

          {/* Results preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Retrieved Memory Citations (Top Semantic Matches)
              </span>
              <span className="font-mono text-emerald-600">Cosine Similarity: 0.94</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px]">
                <div className="font-bold text-slate-900 mb-0.5">
                  Decision #101: Premature Q1 Hiring Bench Drag
                </div>
                <p className="text-slate-600">
                  "Hiring 3 full-stack developers ahead of executed contract resulted in 45 days of unbilled bench time costing ₹3,60,000 in idle payroll."
                </p>
                <div className="mt-1.5 text-[10px] text-slate-400 font-mono">
                  Source: Retrospective Audit #Q1-2026 • Verified by MD
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-[11px]">
                <div className="font-bold text-slate-900 mb-0.5">
                  Policy Fact: Minimum 60-Day Working Capital Sweep
                </div>
                <p className="text-slate-600">
                  "Maintain minimum 60 days of operational payroll and facilities burn (~₹38,00,000) before approving speculative capex."
                </p>
                <div className="mt-1.5 text-[10px] text-slate-400 font-mono">
                  Source: Treasury Policy Charter • Status: Stated Preference
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
