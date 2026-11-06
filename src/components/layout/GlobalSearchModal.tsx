import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  History,
  Database,
  FolderGit2,
  Sliders,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { HISTORICAL_DECISIONS, BUSINESS_MEMORIES, PROJECT_PROFITABILITY } from '../../data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string, itemId?: string) => void;
}

export function GlobalSearchModal({ isOpen, onClose, onNavigate }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent, but if inside, escape closes
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredDecisions = HISTORICAL_DECISIONS.filter(
    (d) => !q || d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
  ).slice(0, 4);

  const filteredMemories = BUSINESS_MEMORIES.filter(
    (m) =>
      !q ||
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
  ).slice(0, 4);

  const filteredProjects = PROJECT_PROFITABILITY.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
  ).slice(0, 3);

  const quickPages = [
    { label: 'Scenario Simulator', route: 'simulator', icon: Sliders, hint: 'Test hiring & pricing' },
    { label: 'Decision Studio', route: 'decision-studio', icon: Sparkles, hint: 'Explore new options' },
    { label: 'Business Memory Explorer', route: 'memory', icon: Database, hint: '18 retained business facts' },
    { label: 'Monthly Business Reports', route: 'reports', icon: FileSpreadsheet, hint: 'Export P&L & health' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search decisions, memories, projects, simulations..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden font-medium"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] bg-white text-slate-500 px-2 py-1 rounded border border-slate-200 font-mono shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-5 text-xs">
          {/* Quick Actions if query is empty */}
          {!q && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Navigation
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.route}
                      onClick={() => {
                        onNavigate(page.route);
                        onClose();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-600 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{page.label}</div>
                          <div className="text-[10px] text-slate-500">{page.hint}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Decisions */}
          {filteredDecisions.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-blue-600" />
                Decisions & Simulations ({filteredDecisions.length})
              </div>
              <div className="space-y-1.5">
                {filteredDecisions.map((dec) => (
                  <button
                    key={dec.id}
                    onClick={() => {
                      onNavigate('decisions', dec.id);
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{dec.title}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-blue-600">{dec.category}</span>
                        <span>•</span>
                        <span>{dec.status}</span>
                        {dec.variance && <span>• {dec.variance}</span>}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Organizational Memories */}
          {filteredMemories.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-600" />
                Business Memories & Hindsight Knowledge ({filteredMemories.length})
              </div>
              <div className="space-y-1.5">
                {filteredMemories.map((mem) => (
                  <button
                    key={mem.id}
                    onClick={() => {
                      onNavigate('memory');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-50/50 border border-transparent hover:border-indigo-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{mem.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                        {mem.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{mem.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />
                Active Client Engagements ({filteredProjects.length})
              </div>
              <div className="space-y-1.5">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate('overview');
                      onClose();
                    }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{p.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {p.client} • Margin: {p.currentMargin}% (Expected {p.expectedMargin}%)
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        p.status === 'Healthy'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-600" />
            DecisionTwin Unified Index
          </span>
          <span className="font-mono text-slate-400">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
