import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Bell,
  Sparkles,
  ChevronDown,
  Building2,
  CheckCircle2,
  Menu,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

interface TopNavbarProps {
  onOpenSearch: () => void;
  onOpenAiAssistant: () => void;
  onToggleMobileMenu: () => void;
  dateRange: string;
  setDateRange: (range: string) => void;
}

export function TopNavbar({
  onOpenSearch,
  onOpenAiAssistant,
  onToggleMobileMenu,
  dateRange,
  setDateRange,
}: TopNavbarProps) {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

  const dateOptions = [
    'Last 30 Days',
    'Current Month (Nov 2026)',
    'Q3 2026',
    'Last 6 Months',
    'Financial Year 2026-27',
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
      {/* Left side: Mobile menu, Workspace selector & Workspace label */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Workspace Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 leading-tight">NovaTech Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="text-[10px] text-slate-500 font-medium leading-tight">
                IT Consulting & Software
              </span>
            </div>
          </button>

          {showWorkspaceDropdown && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Active Organization
              </div>
              <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">NovaTech Solutions HQ</div>
                  <div className="text-[11px] text-slate-500">35 Employees • INR (₹)</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 px-3 py-1">
                Demo environment with mathematically consistent records.
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Decision Intelligence Workspace
          </span>
          <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-medium border border-amber-200/60 hidden xl:inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Simulated Demo Data
          </span>
        </div>
      </div>

      {/* Right side: Global Search, Date Picker, AI Status, Notifications, Ask DecisionTwin */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/70 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors border border-slate-200/60"
          title="Search decisions, memories, projects (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Quick Search...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] bg-white text-slate-500 px-1.5 py-0.5 rounded border border-slate-300 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200 transition-colors shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showDateDropdown && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fadeIn">
              {dateOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setDateRange(opt);
                    setShowDateDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                    dateRange === opt
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                  {dateRange === opt && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* AI Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-[11px] font-semibold text-slate-700">DecisionTwin Engine: Active</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors relative"
            title="Notifications & Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Intelligence Alerts
                </span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark read</span>
              </div>
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-700 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Customer Concentration (64%)
                  </div>
                  <p className="text-[11px] text-slate-600">
                    FinCorp, RetailStream, MedTech represent 64% of total billing. Diversification action recommended.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Delivery Margin Slip
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Project Alpha delivery costs ran ₹85,000 above original estimate. Review SOW terms.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA: Ask DecisionTwin */}
        <button
          onClick={onOpenAiAssistant}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Ask DecisionTwin</span>
        </button>
      </div>
    </header>
  );
}
