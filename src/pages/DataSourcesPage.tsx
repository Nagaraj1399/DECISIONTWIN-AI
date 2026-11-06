import React, { useState } from 'react';
import {
  Network,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  FileSpreadsheet,
  Link2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { DataSourceItem } from '../types';

interface DataSourcesPageProps {
  dataSources: DataSourceItem[];
  onOpenCsvImport: () => void;
}

export function DataSourcesPage({ dataSources, onOpenCsvImport }: DataSourcesPageProps) {
  const [sources, setSources] = useState<DataSourceItem[]>(dataSources);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const handleSimulateSync = (id: string, name: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setSyncFeedback(`Successfully synchronized recent records from ${name}!`);
      setTimeout(() => setSyncFeedback(null), 3000);
    }, 900);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              Data Ingestion Layer
            </span>
            <span className="text-xs text-slate-400 font-mono">Automated Reconciliation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Connect Your Business Data
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Unify financial ledgers, timesheets, and CRM pipelines to feed continuous decision simulations.
          </p>
        </div>

        <button
          onClick={onOpenCsvImport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all self-start sm:self-auto"
        >
          <Upload className="w-3.5 h-3.5" />
          Import CSV / Excel Records
        </button>
      </div>

      {syncFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{syncFeedback}</span>
          </div>
          <button onClick={() => setSyncFeedback(null)} className="text-emerald-700 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Integration Principles Notice */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-blue-900 block">Integration Fidelity & Privacy Protocol:</span>
          Local CSV/Excel uploads are immediately active and update live profitability tables. Cloud connectors indicate simulated development states for demonstration clarity without pretending live OAuth connections exist.
        </div>
      </div>

      {/* Grid of Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((src) => {
          const isConnected = src.status === 'Connected';
          const isSimulated = src.status === 'Simulated Development State';

          return (
            <div
              key={src.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    {src.type}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isSimulated
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {src.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center font-bold text-slate-700">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{src.name}</h3>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {src.recordCount > 0 ? `${src.recordCount} Synced Records` : 'No Active Records'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-2">{src.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    Data Categories:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {src.dataCategories.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 font-mono"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                  {src.lastSync}
                </span>

                {src.id === 'ds-csv' ? (
                  <button
                    onClick={onOpenCsvImport}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-2xs transition-colors flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload File
                  </button>
                ) : (
                  <button
                    onClick={() => handleSimulateSync(src.id, src.name)}
                    disabled={syncingId === src.id}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncingId === src.id ? 'animate-spin' : ''}`} />
                    {syncingId === src.id ? 'Syncing...' : 'Sync Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
