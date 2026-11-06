import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Database, AlertCircle, Sparkles } from 'lucide-react';
import { Decision, ScenarioCardData } from '../../types';
import { formatINR } from '../../utils/simulationEngine';

interface RecordDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioData?: ScenarioCardData | null;
  onConfirmRecord: (newDecision: Partial<Decision>) => void;
}

export function RecordDecisionModal({
  isOpen,
  onClose,
  scenarioData,
  onConfirmRecord,
}: RecordDecisionModalProps) {
  const [title, setTitle] = useState(
    scenarioData ? `Capacity Expansion: ${scenarioData.name}` : 'Q4 Engineering Capacity Expansion'
  );
  const [selectedOption, setSelectedOption] = useState(
    scenarioData ? scenarioData.name : 'Balanced Growth (Hire 2 Full-Time Senior Developers)'
  );
  const [reasoning, setReasoning] = useState(
    'Based on the simulation, this option offers a controlled increase in fixed costs while preserving the opportunity to expand delivery capacity with a 3.5-month break-even recovery.'
  );
  const [ownerConfirmed, setOwnerConfirmed] = useState(true);
  const [retainToMemory, setRetainToMemory] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerConfirmed) return;

    onConfirmRecord({
      title,
      selectedOption,
      finalReasoning: reasoning,
      status: 'Approved',
      owner: 'Mohammed Al-Mansoor (MD)',
      predictedImpact: scenarioData
        ? `+₹${(scenarioData.projectedOperatingProfit / 100000).toFixed(1)}L operating profit (${scenarioData.expectedProfitMargin}% margin, ${scenarioData.breakEvenPeriodMonths}m break-even)`
        : '+₹3.1L monthly operating profit with 3.5m break-even',
      createdDate: new Date().toISOString().split('T')[0],
      category: 'Hiring & Workforce',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Record Official Business Decision</h3>
              <p className="text-[11px] text-slate-500">Requires owner sign-off before committing to history</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Decision Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Chosen Option / Plan</label>
            <input
              type="text"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          {scenarioData && (
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 space-y-1">
              <span className="font-bold text-blue-900 text-[11px]">Simulated Parameters to Commit:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-blue-800 font-mono mt-1">
                <div>Addl Cost: {formatINR(scenarioData.additionalMonthlyCost)}/mo</div>
                <div>Projected Profit: {formatINR(scenarioData.projectedOperatingProfit)}/mo</div>
                <div>Expected Margin: {scenarioData.expectedProfitMargin}%</div>
                <div>Break-even: {scenarioData.breakEvenPeriodMonths} Months</div>
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Executive Rationale & Context</label>
            <textarea
              rows={3}
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="Explain why this option was chosen over alternatives..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          {/* Hindsight Auto-retention Checkbox */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <input
              type="checkbox"
              id="retain"
              checked={retainToMemory}
              onChange={(e) => setRetainToMemory(e.target.checked)}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="retain" className="cursor-pointer text-[11px] text-slate-600">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                Retain into Hindsight Organizational Memory
              </span>
              Preserves this decision rationale and assumptions for future recall when similar situations arise.
            </label>
          </div>

          {/* Owner Approval Sign-Off */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200">
            <input
              type="checkbox"
              id="confirmOwner"
              checked={ownerConfirmed}
              onChange={(e) => setOwnerConfirmed(e.target.checked)}
              className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="confirmOwner" className="cursor-pointer text-[11px] text-slate-700">
              <span className="font-bold text-slate-900 block">
                Owner Sign-off: Mohammed Al-Mansoor (Managing Director)
              </span>
              I confirm this decision represents our authorized commitment and should be tracked for predicted vs actual outcome variance.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!ownerConfirmed}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Commit Decision to History
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
