import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Sparkles,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Save,
  RefreshCw,
  MessageSquare,
  BookmarkCheck,
  Info,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { SimulatorConfig, ScenarioCardData } from '../types';
import { calculateScenarios, formatINR, BASE_COMPANY_METRICS } from '../utils/simulationEngine';
import { ScenarioCashflowChart } from '../components/common/Charts';

interface ScenarioSimulatorPageProps {
  onOpenRecordModal: (scenario: ScenarioCardData) => void;
  onOpenAiAssistant: () => void;
}

export function ScenarioSimulatorPage({
  onOpenRecordModal,
  onOpenAiAssistant,
}: ScenarioSimulatorPageProps) {
  // Configurable simulation assumptions
  const [config, setConfig] = useState<SimulatorConfig>({
    numEmployees: 2,
    monthlySalaryPerEmployee: 110000,
    recruitmentCostPerEmployee: 85000,
    expectedBillableHoursPerMonth: 140,
    hourlyBillingRate: 1850,
    expectedProjectDemand: 4,
    revenuePerProject: 450000,
    expectedUtilization: 78,
    simulationPeriodMonths: 6,
  });

  const [activeMetricTab, setActiveMetricTab] = useState<'profit' | 'revenue' | 'cashflow' | 'risk'>(
    'profit'
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scenario-b');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  // Dynamic scenario calculation
  const scenarios = useMemo(() => calculateScenarios(config), [config]);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];
  const recommendedScenario = scenarios.find((s) => s.isRecommended) || scenarios[0];

  const handlePeriodChange = (period: 3 | 6 | 12 | 24) => {
    setConfig((prev) => ({ ...prev, simulationPeriodMonths: period }));
  };

  const handleSaveScenario = () => {
    setSavedNotification(`Scenario "${activeScenario.name}" successfully bookmarked into active workspace!`);
    setTimeout(() => setSavedNotification(null), 3500);
  };

  const handleResetDefaults = () => {
    setConfig({
      numEmployees: 2,
      monthlySalaryPerEmployee: 110000,
      recruitmentCostPerEmployee: 85000,
      expectedBillableHoursPerMonth: 140,
      hourlyBillingRate: 1850,
      expectedProjectDemand: 4,
      revenuePerProject: 450000,
      expectedUtilization: 78,
      simulationPeriodMonths: 6,
    });
  };

  // Trajectories for cash flow chart
  const trajectories = useMemo(() => {
    const colors: Record<string, string> = {
      'scenario-b': '#2563EB',
      'scenario-a': '#DC2626',
      'scenario-c': '#16A34A',
    };
    return scenarios.map((s) => ({
      name: s.name,
      color: colors[s.id] || '#64748B',
      data: s.cashFlowTrajectory.map((t) => ({
        month: t.month,
        cumulativeProfit: t.cumulativeProfit,
      })),
    }));
  }, [scenarios]);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              Core Simulation Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Mathematical Sensitivity Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Scenario Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare possible futures before making your decision. Dynamic multi-variable stress testing.
          </p>
        </div>

        {/* Time Horizon Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 self-start sm:self-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase px-2">Horizon:</span>
          {([3, 6, 12, 24] as const).map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                config.simulationPeriodMonths === period
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {period}M
            </button>
          ))}
        </div>
      </div>

      {savedNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{savedNotification}</span>
          </div>
          <button onClick={() => setSavedNotification(null)} className="text-emerald-700 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* INTERACTIVE CONFIGURATION PANEL */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Simulation Assumptions Configuration</h3>
              <span className="text-[11px] text-slate-500">
                Current baseline: ₹25L Monthly Revenue • ₹19L Costs • 76% Utilization
              </span>
            </div>
          </div>
          <button
            onClick={handleResetDefaults}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <RefreshCw className="w-3 h-3" /> Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* 1. Number of Employees */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700">Team Headcount to Add</label>
              <span className="font-mono font-bold text-blue-600 text-sm">
                {config.numEmployees} {config.numEmployees === 1 ? 'Hire' : 'Hires'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={config.numEmployees}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, numEmployees: parseInt(e.target.value, 10) }))
              }
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1</span>
              <span>4</span>
              <span>8</span>
            </div>
          </div>

          {/* 2. Monthly Salary Per Employee */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700">Monthly CTC per Hire (₹)</label>
              <span className="font-mono font-bold text-slate-900">
                {formatINR(config.monthlySalaryPerEmployee)}
              </span>
            </div>
            <input
              type="range"
              min="75000"
              max="200000"
              step="5000"
              value={config.monthlySalaryPerEmployee}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  monthlySalaryPerEmployee: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹75k</span>
              <span>₹1.4L</span>
              <span>₹2.0L</span>
            </div>
          </div>

          {/* 3. Recruitment Cost per Employee */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700">Recruitment Agency Fee (₹)</label>
              <span className="font-mono font-bold text-slate-900">
                {formatINR(config.recruitmentCostPerEmployee)}
              </span>
            </div>
            <input
              type="range"
              min="40000"
              max="150000"
              step="5000"
              value={config.recruitmentCostPerEmployee}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  recruitmentCostPerEmployee: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹40k</span>
              <span>₹95k</span>
              <span>₹1.5L</span>
            </div>
          </div>

          {/* 4. Expected Billable Rate & Utilization */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-slate-700">Expected Utilization</label>
              <span className="font-mono font-bold text-emerald-600 text-sm">
                {config.expectedUtilization}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={config.expectedUtilization}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  expectedUtilization: parseInt(e.target.value, 10),
                }))
              }
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50%</span>
              <span>Rate: ₹{config.hourlyBillingRate}/hr</span>
              <span>95%</span>
            </div>
          </div>
        </div>
      </div>

      {/* SCENARIO COMPARISON (3 CARDS) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
              Scenario Matrix
            </span>
            <h3 className="text-lg font-bold text-slate-900">Three Contrasting Strategic Futures</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Horizon: {config.simulationPeriodMonths} Months • All calculations in INR (₹)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            const isRec = sc.isRecommended;

            return (
              <div
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between relative border ${
                  isSelected
                    ? isRec
                      ? 'bg-white ring-2 ring-blue-600 border-blue-600 shadow-lg'
                      : 'bg-white ring-2 ring-slate-800 border-slate-800 shadow-lg'
                    : 'bg-white border-slate-200/90 hover:border-blue-300 shadow-xs'
                }`}
              >
                {/* Badge */}
                {sc.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs ${
                        isRec
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-slate-800 text-white'
                      }`}
                    >
                      {sc.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mt-2 mb-1">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      SCENARIO {sc.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sc.financialRiskLevel === 'Low Risk'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : sc.financialRiskLevel === 'Moderate Risk'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {sc.financialRiskLevel} ({sc.financialRiskScore}/100)
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{sc.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{sc.tagline}</p>

                  {/* Financial Metrics Stack */}
                  <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-mono">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-sans">Addl Monthly Cost:</span>
                      <span className="font-bold text-slate-800">{formatINR(sc.additionalMonthlyCost)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-sans">Projected Revenue:</span>
                      <span className="font-bold text-blue-600">{formatINR(sc.projectedRevenue)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-sans">Projected Operating Profit:</span>
                      <span className="font-bold text-emerald-600">{formatINR(sc.projectedOperatingProfit)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-1.5 border-t border-slate-200">
                      <span className="text-slate-600 font-sans font-medium">Expected Profit Margin:</span>
                      <span className="font-bold text-slate-900">{sc.expectedProfitMargin}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 font-sans font-medium">Break-even Period:</span>
                      <span className="font-bold text-slate-900 font-sans">
                        {sc.breakEvenPeriodMonths === 1 ? 'Immediate (M1)' : `${sc.breakEvenPeriodMonths} Months`}
                      </span>
                    </div>
                  </div>

                  {/* Key Assumptions */}
                  <div className="mt-4 space-y-1.5 text-[11px]">
                    <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                      Key Assumptions:
                    </span>
                    <ul className="text-slate-600 space-y-1 list-disc pl-4">
                      {sc.keyAssumptions.map((asm, i) => (
                        <li key={i}>{asm}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Selection Button */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {isSelected ? 'Currently Selected' : 'Click to analyze'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRecordModal(sc);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                      isRec
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    Record This Plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* VISUAL ANALYTICS SECTION */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
              Comparative Modeling
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Cash Flow Trajectory & Recovery Timeline ({config.simulationPeriodMonths} Months)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              Zero line represents break-even recovery of upfront capex
            </span>
          </div>
        </div>

        <ScenarioCashflowChart
          trajectories={trajectories}
          period={config.simulationPeriodMonths}
        />

        {/* Comparison Summary Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className={`p-3 rounded-xl border text-xs ${
                sc.id === selectedScenarioId
                  ? 'bg-blue-50/60 border-blue-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-bold text-slate-900">{sc.name}</div>
              <div className="text-[11px] text-slate-600 mt-1">
                Net Cumulative Profit at M{config.simulationPeriodMonths}:{' '}
                <strong className="text-emerald-700 font-mono">
                  {formatINR(
                    sc.cashFlowTrajectory[sc.cashFlowTrajectory.length - 1]?.cumulativeProfit || 0
                  )}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI RECOMMENDATION PANEL */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400 shadow-inner">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  DecisionTwin Recommendation
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  Confidence: 88%
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Grounded in NovaTech historical recruitment lead times and client concentration thresholds
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Deterministic Financial Logic
          </div>
        </div>

        {/* Recommendation Statement */}
        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-400 font-mono">
              Recommended Choice:
            </span>
            <span className="text-base font-extrabold text-white">
              {recommendedScenario.name} — Hire {config.numEmployees} Senior Developers
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Based on the supplied assumptions and historical post-mortems, this option offers a controlled increase in fixed monthly payroll (adds {formatINR(recommendedScenario.additionalMonthlyCost)}) while preserving liquidity and recovering upfront recruitment costs in <strong>{recommendedScenario.breakEvenPeriodMonths} months</strong>.
          </p>
        </div>

        {/* Grid of Reasoning, Disadvantages, and Critical Assumptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Reasons Supporting */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Supporting Arguments:
            </span>
            <ul className="text-slate-300 space-y-1.5 list-disc pl-4 text-[11px]">
              <li>Short 3.5-month break-even recovery safeguards current 3.1-week cash runway.</li>
              <li>Absorbs current pipeline demands without incurring high contractor hourly markups (+35%).</li>
              <li>Senior developers build in-house proprietary knowledge for long-term retainers.</li>
            </ul>
          </div>

          {/* Potential Disadvantages */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Potential Disadvantages:
            </span>
            <ul className="text-slate-300 space-y-1.5 list-disc pl-4 text-[11px]">
              <li>If client deals from FinCorp delay by 30 days, temporary bench drag will total ~₹2.2L.</li>
              <li>Takes approximately 34 days to recruit senior tech talent in Bangalore.</li>
              <li>Requires senior leads to allocate 15% time to technical onboarding during Month 1.</li>
            </ul>
          </div>

          {/* What Could Invalidate */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
              What Could Invalidate This:
            </span>
            <ul className="text-slate-300 space-y-1.5 list-disc pl-4 text-[11px]">
              <li>Cancellation or scope reduction in top 3 customer contracts (64% concentration).</li>
              <li>Inability to maintain standard hourly rate floor of ₹1,850/hr across new SOWs.</li>
              <li>Recruitment placement fees exceeding 10% annual CTC threshold.</li>
            </ul>
          </div>
        </div>

        {/* Mandatory Transparency Note */}
        <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-2.5 text-[11px] text-slate-400">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-300">Important Governance Rule:</strong> Projected results are mathematical simulations based on stated assumptions, not guaranteed returns. Owner approval is strictly required before executing commitments.
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveScenario}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
            >
              <Save className="w-3.5 h-3.5 text-blue-400" />
              Save Scenario
            </button>

            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              Compare Again
            </button>

            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              Ask Follow-up
            </button>
          </div>

          <button
            onClick={() => onOpenRecordModal(activeScenario)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02]"
          >
            <BookmarkCheck className="w-4 h-4" />
            Record Official Decision
          </button>
        </div>
      </div>
    </div>
  );
}
