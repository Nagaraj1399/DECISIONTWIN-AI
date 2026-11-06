import React, { useState } from 'react';
import {
  Settings,
  Users,
  ShieldCheck,
  Database,
  Building2,
  DollarSign,
  Bell,
  CheckCircle2,
  Lock,
  Cpu,
  Save,
} from 'lucide-react';
import { CurrencyCode } from '../types';

interface SettingsPageProps {
  initialTab?: 'profile' | 'financial' | 'team' | 'ai' | 'subscription';
  currency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
}

export function SettingsPage({
  initialTab = 'profile',
  currency,
  onCurrencyChange,
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'financial' | 'team' | 'ai' | 'subscription'>(
    initialTab
  );

  // Settings state
  const [companyName, setCompanyName] = useState('NovaTech Solutions');
  const [industry, setIndustry] = useState('IT Consulting & Software Development');
  const [headcount, setHeadcount] = useState(35);
  const [fiscalYear, setFiscalYear] = useState('April 01 - March 31 (Indian FY)');
  const [marginFloor, setMarginFloor] = useState(25);
  const [hurdleRate, setHurdleRate] = useState(15);
  const [workingDays, setWorkingDays] = useState(21.5);
  const [savedAlert, setSavedAlert] = useState(false);

  const teamMembers = [
    { name: 'Mohammed Al-Mansoor', email: 'mohammed@novatech.io', role: 'Managing Director & Owner', access: 'Full Governance & Sign-off' },
    { name: 'Aisha Khan', email: 'aisha@novatech.io', role: 'Finance Lead (CFO)', access: 'Financial Audit & P&L Approval' },
    { name: 'Rajesh Patel', email: 'rajesh@novatech.io', role: 'Operations Director', access: 'Resource Scheduling & SOWs' },
    { name: 'Vikram Seth', email: 'vikram@novatech.io', role: 'Principal Architect', access: 'Technical Review & Timesheets' },
  ];

  const handleSave = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              Workspace Configuration
            </span>
            <span className="text-xs text-slate-400 font-mono">Enterprise Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings & Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage organization profile, financial parameters, currency, RBAC team roles, and memory isolation.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Save className="w-3.5 h-3.5" />
          Save Changes
        </button>
      </div>

      {savedAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Workspace preferences and financial parameters updated successfully!</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'profile', label: 'Company Profile', icon: Building2 },
          { id: 'financial', label: 'Financial Assumptions', icon: DollarSign },
          { id: 'team', label: 'Team & Permissions', icon: Users },
          { id: 'ai', label: 'AI & Hindsight Memory', icon: Cpu },
          { id: 'subscription', label: 'Subscription & Billing', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab: Company Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Corporate Information</h3>
            <p className="text-xs text-slate-500">Legal business entity and operational baseline</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company Legal Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Industry Vertical</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Total Full-Time Headcount</label>
              <input
                type="number"
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value, 10))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Fiscal Year Cycle</label>
              <input
                type="text"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Financial Assumptions */}
      {activeTab === 'financial' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Financial Assumptions & Hurdle Rates</h3>
            <p className="text-xs text-slate-500">Configure global thresholds for simulation validation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Operating Currency</label>
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold"
              >
                <option value="INR">INR (₹) - Indian Rupee (Default)</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="AED">AED (د.إ) - UAE Dirham</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Minimum Target Margin Floor (%)</label>
              <input
                type="number"
                value={marginFloor}
                onChange={(e) => setMarginFloor(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Flag proposals below this threshold as 'Margin Erosion'
              </span>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Capex Hurdle Rate (IRR %)</label>
              <input
                type="number"
                value={hurdleRate}
                onChange={(e) => setHurdleRate(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Standard Working Days/Month</label>
              <input
                type="number"
                value={workingDays}
                onChange={(e) => setWorkingDays(parseFloat(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Team & Permissions */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Authorized Decision Makers & RBAC</h3>
              <p className="text-xs text-slate-500">Only authorized users can record official business decisions</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] font-semibold">
                  <th className="pb-3 pl-2">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Governance Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teamMembers.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 pl-2 font-bold text-slate-900">{m.name}</td>
                    <td className="py-3 text-slate-600 font-mono">{m.email}</td>
                    <td className="py-3 text-slate-800 font-medium">{m.role}</td>
                    <td className="py-3 text-emerald-700 font-semibold">{m.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: AI & Hindsight Memory */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Hindsight Persistent Memory Controls</h3>
            <p className="text-slate-500">Workspace isolation and automatic retention rules</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                Hard Multi-Tenant Isolation
              </span>
              <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ACTIVE
              </span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Memories, financial parameters, and simulated options are encrypted and bounded strictly to tenant ID <strong>novatech-solutions-prod-in</strong>. No cross-organizational data leakage is possible.
            </p>
          </div>

          <div className="space-y-3">
            <label className="font-semibold text-slate-700 block">Automatic Memory Retention Policies:</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-slate-700">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Auto-retain post-mortems when project actual margin diverges &gt; 5% from estimate</span>
              </label>
              <label className="flex items-center gap-2 text-slate-700">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Require owner approval before publishing lessons learned to organizational ledger</span>
              </label>
              <label className="flex items-center gap-2 text-slate-700">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span>Enforce 60-day liquid cash reserve threshold during all hiring simulations</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Subscription */}
      {activeTab === 'subscription' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Enterprise Subscription</h3>
            <p className="text-slate-500">Dedicated instance with unlimited simulations and vector memory</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                Current Plan
              </span>
              <h4 className="text-xl font-extrabold mt-0.5">DecisionTwin Enterprise</h4>
              <p className="text-slate-400 text-xs mt-1">Unlimited Scenarios • Dedicated Hindsight Memory • Multi-seat RBAC</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs rounded-full border border-emerald-400/30">
              Active & Verified
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
