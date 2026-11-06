import React, { useState } from 'react';
import {
  TrendingUp,
  Coins,
  Users,
  FolderGit2,
  PieChart,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Clock,
  Layers,
} from 'lucide-react';
import { ProjectProfitability, MonthlyTrend } from '../types';
import { formatINR } from '../utils/simulationEngine';
import { RevenueCostsChart } from '../components/common/Charts';

interface BusinessIntelligencePageProps {
  initialTab?: 'financial' | 'customers' | 'projects' | 'resources' | 'operations';
  projects: ProjectProfitability[];
  trends: MonthlyTrend[];
  onNavigateToSimulator: () => void;
}

export function BusinessIntelligencePage({
  initialTab = 'financial',
  projects,
  trends,
  onNavigateToSimulator,
}: BusinessIntelligencePageProps) {
  const [activeTab, setActiveTab] = useState<'financial' | 'customers' | 'projects' | 'resources' | 'operations'>(
    initialTab
  );

  const tabs = [
    { id: 'financial', label: 'Financial Intelligence', icon: Coins },
    { id: 'customers', label: 'Customer Intelligence', icon: Building2 },
    { id: 'projects', label: 'Project Intelligence', icon: FolderGit2 },
    { id: 'resources', label: 'Resource Intelligence', icon: Users },
    { id: 'operations', label: 'Operations & Delivery', icon: Layers },
  ] as const;

  // Derived customer metrics
  const clientConcentration = [
    { name: 'FinCorp Global', share: 28.6, monthlyBilling: 715000, margin: 26.2, risk: 'High Concentration' },
    { name: 'RetailStream', share: 18.6, monthlyBilling: 465000, margin: 24.8, risk: 'Moderate' },
    { name: 'MedTech Health', share: 16.0, monthlyBilling: 400000, margin: 31.8, risk: 'Healthy' },
    { name: 'LogisticsX Express', share: 11.6, monthlyBilling: 290000, margin: 24.1, risk: 'Stable' },
    { name: 'Other 14 Clients', share: 25.2, monthlyBilling: 630000, margin: 34.0, risk: 'Diversified' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              Deep Analytical Synthesis
            </span>
            <span className="text-xs text-slate-400 font-mono">Ledger Verified</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Business Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Structured analysis of financial margins, client concentration, resource loads, and operational delivery.
          </p>
        </div>

        <button
          onClick={onNavigateToSimulator}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Simulate Strategic Rebalancing
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
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

      {/* TAB CONTENT: FINANCIAL */}
      {activeTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Monthly Revenue & Profit Run-Rate</h3>
                  <p className="text-xs text-slate-500">6-Month historical performance trend</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +12.4% Rev Growth
                </span>
              </div>
              <RevenueCostsChart data={trends} />
            </div>

            {/* Financial Expense Breakdown */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Operating Cost Breakdown</h3>
                <p className="text-xs text-slate-500 mb-4">Total Monthly Burn: ₹19,00,000</p>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-medium text-slate-700 mb-1">
                      <span>Engineering Payroll (24 staff)</span>
                      <span className="font-mono font-bold text-slate-900">₹14.50L (76.3%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '76.3%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-slate-700 mb-1">
                      <span>Cloud, Tools & Licenses</span>
                      <span className="font-mono font-bold text-slate-900">₹2.10L (11.1%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '11.1%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-slate-700 mb-1">
                      <span>Office & Facility Overhead</span>
                      <span className="font-mono font-bold text-slate-900">₹1.40L (7.4%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '7.4%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium text-slate-700 mb-1">
                      <span>Sales, Travel & Ops</span>
                      <span className="font-mono font-bold text-slate-900">₹1.00L (5.2%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full" style={{ width: '5.2%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block mb-0.5">Fixed vs Variable Ratio:</span>
                Payroll and facilities represent <strong>83.7% fixed commitments</strong>. Adding new headcount permanently raises monthly break-even by CTC + 15%.
              </div>
            </div>
          </div>

          {/* AI Explanation Panel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">
                DecisionTwin Financial Synthesis
              </h4>
              <p className="text-slate-600 leading-relaxed">
                NovaTech’s operating profit expanded to ₹6,00,000 this month (+8.2%), driven by new billing milestones on Project Epsilon and Project Zeta. However, net profit margin experienced a 2.1 percentage point contraction (24.0% vs prior quarter 26.1%) due to 142 unbilled hours on fixed-price projects. Cash reserves equal 3.1 weeks of full operational burn.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CUSTOMERS */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Customer Revenue Concentration (Herfindahl Index)</h3>
                <p className="text-xs text-slate-500">
                  Total Active Accounts: 18 • Top 3 Accounts represent 64% of total billing
                </p>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Critical Concentration Risk
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {clientConcentration.map((c) => (
                <div key={c.name} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2">
                  <div className="text-xs font-bold text-slate-900 truncate" title={c.name}>
                    {c.name}
                  </div>
                  <div className="text-xl font-extrabold text-blue-600 font-mono">{c.share}%</div>
                  <div className="text-xs text-slate-500 font-mono">
                    Billing: {formatINR(c.monthlyBilling)}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Margin: <strong className="text-emerald-700 font-mono">{c.margin}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Customer Insights */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">
                DecisionTwin Customer Intelligence
              </h4>
              <p className="text-slate-600 leading-relaxed">
                FinCorp Global alone represents 28.6% of your monthly billing. Retaining this client is mandatory for current profitability. However, because customer concentration exceeds your internal governance ceiling (50%), a single billing dispute or delay would plunge operating cash flow negative. Recommend focusing next quarter’s business development on mid-market accounts with ₹1.5L–₹3.0L monthly budgets.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Project Margin Drift Audit</h3>
            <p className="text-xs text-slate-500">Tracking original SOW estimates vs actual labor costs</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] font-semibold">
                    <th className="pb-2">Project</th>
                    <th className="pb-2">Client</th>
                    <th className="pb-2 text-right">Revenue</th>
                    <th className="pb-2 text-right">Budget Hours</th>
                    <th className="pb-2 text-right">Billed Hours</th>
                    <th className="pb-2 text-right">Variance</th>
                    <th className="pb-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.slice(0, 6).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 font-bold text-slate-900">{p.name}</td>
                      <td className="py-3 text-slate-600">{p.client}</td>
                      <td className="py-3 text-right font-mono font-bold">{formatINR(p.revenue)}</td>
                      <td className="py-3 text-right font-mono text-slate-500">{p.hoursBudgeted}h</td>
                      <td className="py-3 text-right font-mono font-bold text-slate-800">{p.hoursBilled}h</td>
                      <td className="py-3 text-right font-mono font-bold">
                        <span className={p.hoursBilled > p.hoursBudgeted ? 'text-rose-600' : 'text-emerald-600'}>
                          {p.hoursBilled - p.hoursBudgeted > 0 ? `+${p.hoursBilled - p.hoursBudgeted}h` : `${p.hoursBilled - p.hoursBudgeted}h`}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Healthy' || p.status === 'Under Budget'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: RESOURCES */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs uppercase font-bold text-slate-500">Utilization Rate</span>
              <div className="text-3xl font-extrabold text-blue-600 font-mono">76%</div>
              <p className="text-xs text-slate-500">Benchmark target: 82% across all 24 developers</p>
              <div className="pt-2 text-xs text-slate-600">
                Untapped billable capacity: <strong>195 hours/month</strong> (~₹3.6L potential gross revenue)
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs uppercase font-bold text-slate-500">Senior Capacity Load</span>
              <div className="text-3xl font-extrabold text-amber-600 font-mono">88%</div>
              <p className="text-xs text-slate-500">Senior leads near threshold for mentoring overhead</p>
              <div className="pt-2 text-xs text-slate-600">
                Architect lead bottleneck: <strong>Vikram Seth & Anya Sharma</strong>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs uppercase font-bold text-slate-500">Blended Hourly Cost</span>
              <div className="text-3xl font-extrabold text-emerald-600 font-mono">₹785/hr</div>
              <p className="text-xs text-slate-500">Fully burdened labor vs ₹1,850/hr billing rate</p>
              <div className="pt-2 text-xs text-slate-600">
                Gross labor contribution margin: <strong>57.5%</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: OPERATIONS */}
      {activeTab === 'operations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Operational Efficiency & Quality Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">On-Time Delivery Rate</span>
                <div className="text-2xl font-bold text-emerald-600 font-mono">75.0%</div>
                <span className="text-[10px] text-slate-400">9 of 12 projects on schedule</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Rework & Revision Overhead</span>
                <div className="text-2xl font-bold text-amber-600 font-mono">11.4%</div>
                <span className="text-[10px] text-slate-400">Target is under 8.0%</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Average Sprint Velocity</span>
                <div className="text-2xl font-bold text-blue-600 font-mono">84 Pts</div>
                <span className="text-[10px] text-slate-400">Per 2-week sprint cycle</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium">Contract Renewal Rate</span>
                <div className="text-2xl font-bold text-emerald-600 font-mono">92.0%</div>
                <span className="text-[10px] text-slate-400">Annual recurring retainers</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
