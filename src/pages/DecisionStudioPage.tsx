import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Database,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { DecisionCategory } from '../types';

interface DecisionStudioPageProps {
  onNavigateToSimulator: (params?: any) => void;
}

export function DecisionStudioPage({ onNavigateToSimulator }: DecisionStudioPageProps) {
  const [question, setQuestion] = useState(
    'Should I hire five additional developers next quarter to accelerate enterprise deliveries?'
  );
  const [category, setCategory] = useState<DecisionCategory>('Hiring & Workforce');
  const [title, setTitle] = useState('Q4 Developer Headcount Expansion');
  const [description, setDescription] = useState(
    'Evaluating whether to expand our engineering team by 5 full-stack developers to meet incoming client pipeline demand from FinCorp and RetailStream.'
  );
  const [investment, setInvestment] = useState('6,50,000');
  const [deadline, setDeadline] = useState('Q4 2026 (Dec 15)');
  const [businessUnit, setBusinessUnit] = useState('Engineering & Delivery');
  const [riskTolerance, setRiskTolerance] = useState<'Conservative' | 'Moderate' | 'Aggressive'>(
    'Moderate'
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [showWhyContextMatters, setShowWhyContextMatters] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const categories: DecisionCategory[] = [
    'Hiring & Workforce',
    'Pricing & Revenue',
    'Investment & Expansion',
    'Customer & Contracts',
    'Operations',
    'Cost Reduction',
    'Other',
  ];

  const handleAnalyze = async () => {
    if (!question.trim()) return;
    setAnalyzing(true);

    try {
      const response = await fetch('/api/ai/analyze-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          category,
          investment,
          deadline,
          businessUnit,
          riskTolerance,
        }),
      });
      const data = await response.json();
      setAnalysisResult(data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleResetNew = () => {
    setQuestion('');
    setTitle('');
    setDescription('');
    setInvestment('');
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              Intelligence Studio
            </span>
            <span className="text-xs text-slate-400 font-mono">Continuous Context Grounding</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Decision Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore your options before committing to a decision. Grounded in empirical organizational memory.
          </p>
        </div>

        <button
          onClick={handleResetNew}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          + New Decision
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN — Decision Input */}
        <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-1.5">
              What decision are you considering?
            </label>
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Example: Should I hire five additional developers next quarter?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:bg-white font-medium leading-relaxed transition-all"
            />
          </div>

          {/* Categories Selector */}
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Decision Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    category === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Decision Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Q4 Developer Expansion"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Expected Investment (₹)</label>
              <input
                type="text"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="e.g. ₹6,50,000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Decision Deadline</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Dec 15, 2026"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Business Unit</label>
              <input
                type="text"
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                placeholder="e.g. Engineering & Delivery"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1 text-xs">
              Risk Tolerance Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Conservative', 'Moderate', 'Aggressive'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setRiskTolerance(lvl)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                    riskTolerance === lvl
                      ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-2xs font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1 text-xs">
              Strategic Context / Rationale
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide background, customer demands, or constraints..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing || !question.trim()}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            {analyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing against NovaTech Ledger & Memories...
              </>
            ) : (
              <>
                <BrainCircuit className="w-4 h-4" />
                Analyse This Decision
              </>
            )}
          </button>
        </div>

        {/* RIGHT COLUMN — AI CONTEXT PANEL */}
        <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            {/* Top Bar with Persistent Memory Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">DecisionTwin Intelligence</h3>
                  <span className="text-[11px] text-slate-500">Autonomous context synthesizer</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <Database className="w-3 h-3 text-emerald-600" />
                Organizational memory active
              </div>
            </div>

            {/* Analysis Output Container */}
            <div className="space-y-4 pt-3 text-xs">
              {/* Executive Summary */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Executive Assessment
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {analysisResult?.summary ||
                    'Hiring 5 developers increases fixed monthly payroll commitments by ₹6.5L. When NovaTech added 3 developers in February 2026 without signed SOWs, 45 days of unbilled idle bench drag cost ₹3.6L.'}
                </p>
              </div>

              {/* 1. Verified Business Context */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  1. Current Business Context (Verified Data)
                </span>
                <ul className="space-y-1 pl-5 list-disc text-slate-600 text-[11px]">
                  <li>Monthly Revenue: ₹25,00,000 | Monthly Burn: ₹19,00,000 | Profit: ₹6,00,000</li>
                  <li>Current Team Utilization: 76% (Leaving ~24% unbilled capacity in existing 24 engineers)</li>
                  <li>Customer Concentration: Top 3 clients generate 64% of total billing (FinCorp, RetailStream, MedTech)</li>
                  <li>Liquid Working Capital Reserve: ₹18.4L (Approx 3.1 weeks at full monthly burn)</li>
                </ul>
              </div>

              {/* 2. Relevant Historical Decisions */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-600" />
                  2. Relevant Historical Decisions Retained
                </span>
                <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[11px] space-y-1">
                  <div className="font-bold text-indigo-900">
                    Decision #101: Hired 3 developers in Q1 without signed SOW (Feb 2026)
                  </div>
                  <p className="text-slate-700">
                    <strong>Outcome:</strong> Client delayed signature by 45 days. Resulted in ₹3,60,000 in unbilled payroll drain before project kickoff.
                  </p>
                  <p className="text-indigo-800 font-mono text-[10px]">
                    Relevance: High. Warns against scaling permanent overhead based purely on pipeline optimism.
                  </p>
                </div>
              </div>

              {/* 3 & 4. Verified Data vs Missing Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <span className="font-bold text-emerald-900 block text-[11px] mb-1">
                    Verified Financial Facts:
                  </span>
                  <ul className="text-[10px] text-slate-700 space-y-1 list-disc pl-3">
                    <li>Senior developer fully burdened cost: ₹1,20,000/mo</li>
                    <li>Recruitment agency placement fee: ₹85,000/hire</li>
                    <li>Standard client billing rate: ₹1,850/hr</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                  <span className="font-bold text-amber-900 block text-[11px] mb-1">
                    Missing Information to Confirm:
                  </span>
                  <ul className="text-[10px] text-slate-700 space-y-1 list-disc pl-3">
                    <li>Confirmed counter-signed SOW dates for Q4 enterprise leads</li>
                    <li>Expected onboarding ramp-up lead time (est. 30 days)</li>
                    <li>Client willingness to accept mid-level developer ratios</li>
                  </ul>
                </div>
              </div>

              {/* 5. Expandable "Why this context matters" */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowWhyContextMatters(!showWhyContextMatters)}
                  className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    Why this context matters (Zero AI Slop Discipline)
                  </span>
                  {showWhyContextMatters ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
                {showWhyContextMatters && (
                  <div className="p-3 bg-white text-[11px] text-slate-600 space-y-1 leading-relaxed border-t border-slate-100">
                    <p>
                      Generic AI tools invent market benchmarks. DecisionTwin grounds every calculation in NovaTech's verified payroll ledger, actual utilization rates, and historical contract post-mortems.
                    </p>
                    <p className="text-slate-700 font-semibold">
                      Crucial distinction: Verified facts (ledger totals) are strictly separated from forward assumptions (project demand forecasts).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Route to Simulator */}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigateToSimulator({ question, category, investment })}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Sliders className="w-4 h-4" />
              Send to Scenario Simulator (Compare 3 Possible Futures)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
