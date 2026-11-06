import React from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  Sliders,
  History,
  TrendingUp,
  Coins,
  Users2,
  ShieldAlert,
  Database,
  GraduationCap,
  FileSpreadsheet,
  Network,
  Users,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenHindsightStatus: () => void;
}

export function Sidebar({
  currentRoute,
  onNavigate,
  collapsed,
  onToggleCollapse,
  onOpenHindsightStatus,
}: SidebarProps) {
  const navSections = [
    {
      title: 'WORKSPACE',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: '' },
        { id: 'decision-studio', label: 'Decision Studio', icon: BrainCircuit, badge: 'Active' },
        { id: 'simulator', label: 'Scenario Simulator', icon: Sliders, badge: 'Core' },
        { id: 'decisions', label: 'Decision History', icon: History, badge: '5' },
        { id: 'intelligence', label: 'Business Intelligence', icon: TrendingUp, badge: '' },
      ],
    },
    {
      title: 'BUSINESS INTELLIGENCE',
      items: [
        { id: 'financial-intelligence', label: 'Financial Intelligence', icon: Coins, badge: '' },
        { id: 'resource-intelligence', label: 'Resource Intelligence', icon: Users2, badge: '' },
        { id: 'risk-intelligence', label: 'Risk Intelligence', icon: ShieldAlert, badge: '32/100' },
      ],
    },
    {
      title: 'ORGANIZATIONAL MEMORY',
      items: [
        { id: 'memory', label: 'Business Memory', icon: Database, badge: '18 Facts' },
        { id: 'lessons', label: 'Lessons Learned', icon: GraduationCap, badge: '4 New' },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'reports', label: 'Reports', icon: FileSpreadsheet, badge: '' },
        { id: 'data-sources', label: 'Data Sources', icon: Network, badge: 'CSV Active' },
        { id: 'team', label: 'Team & Permissions', icon: Users, badge: '' },
        { id: 'settings', label: 'Settings', icon: Settings, badge: '' },
      ],
    },
  ];

  return (
    <aside
      className={`bg-[#111827] text-slate-300 transition-all duration-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 border-r border-slate-800 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header & Brand */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
          <div
            onClick={() => onNavigate('overview')}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 shrink-0">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white text-base tracking-tight">DecisionTwin</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    AI
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-tight font-medium">
                  Simulate Before You Decide
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-1.5 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm font-semibold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    {!collapsed && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-blue-700 text-white'
                            : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {collapsed && (
                      <span className="sr-only">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Footer with Workspace & Profile */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
        {!collapsed ? (
          <div className="space-y-2">
            {/* Hindsight Status Banner */}
            <button
              onClick={onOpenHindsightStatus}
              className="w-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl p-2.5 flex items-center justify-between text-left transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white">
                    Hindsight Memory
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">Isolated • Active</span>
                </div>
              </div>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
            </button>

            {/* User details */}
            <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                MA
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-white truncate">Mohammed Al-Mansoor</span>
                <span className="text-[10px] text-slate-400 truncate">Managing Director • NovaTech</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-1">
            <button
              onClick={onOpenHindsightStatus}
              className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 text-emerald-400"
              title="Hindsight Memory Status"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs cursor-pointer shadow-xs"
              title="Mohammed Al-Mansoor (MD)"
            >
              MA
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
