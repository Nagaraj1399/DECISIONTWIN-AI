import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProjectProfitability } from '../../types';

interface CsvImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (newProjects: ProjectProfitability[]) => void;
}

export function CsvImportModal({ isOpen, onClose, onImportSuccess }: CsvImportModalProps) {
  const [csvText, setCsvText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const sampleCsv = `Project,Client,Revenue,EstimatedCost,ActualCost,HoursBilled,Status,Lead
Project Horizon,Apex Tech,320000,210000,205000,120,Healthy,Vikram Seth
Project Vertex,Zenith Corp,450000,300000,345000,190,Review Required,Anya Sharma`;

  const handleLoadSample = () => {
    setCsvText(sampleCsv);
    setError(null);
  };

  const handleParseAndImport = () => {
    setError(null);
    if (!csvText.trim()) {
      setError('Please provide or paste CSV rows to import.');
      return;
    }

    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setError('CSV must include a header line and at least one data row.');
        return;
      }

      const parsed: ProjectProfitability[] = [];
      // Skip header
      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(',').map((p) => p.trim());
        if (parts.length >= 5) {
          const name = parts[0] || `Imported Project ${i}`;
          const client = parts[1] || 'Enterprise Client';
          const revenue = parseFloat(parts[2]) || 200000;
          const estimatedCost = parseFloat(parts[3]) || 140000;
          const actualCost = parseFloat(parts[4]) || 135000;
          const hoursBilled = parts[5] ? parseInt(parts[5], 10) : 80;
          const statusRaw = (parts[6] || 'Healthy').toLowerCase();

          const expectedMargin = Number((((revenue - estimatedCost) / revenue) * 100).toFixed(1));
          const currentMargin = Number((((revenue - actualCost) / revenue) * 100).toFixed(1));

          let status: ProjectProfitability['status'] = 'Healthy';
          if (statusRaw.includes('margin') || statusRaw.includes('erosion')) {
            status = 'Margin Erosion';
          } else if (statusRaw.includes('review')) {
            status = 'Review Required';
          } else if (statusRaw.includes('under')) {
            status = 'Under Budget';
          }

          parsed.push({
            id: `imp-${Date.now()}-${i}`,
            name,
            client,
            revenue,
            estimatedCost,
            actualCost,
            expectedMargin,
            currentMargin,
            hoursBilled,
            hoursBudgeted: hoursBilled + 10,
            status,
            lead: parts[7] || 'Mohammed Al-Mansoor',
          });
        }
      }

      if (parsed.length === 0) {
        setError('Could not parse any valid rows. Please check CSV format.');
        return;
      }

      setSuccessCount(parsed.length);
      onImportSuccess(parsed);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(`Parsing failed: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setCsvText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Import CSV / Excel Timesheets</h3>
              <p className="text-[11px] text-slate-500">Update project profitability and cost records</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* File input */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <div className="font-semibold text-slate-700">Choose a CSV file or paste below</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Supports .csv and UTF-8 formatted exports</p>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="mt-3 block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-700">Paste CSV Contents</label>
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-[11px] text-blue-600 font-semibold hover:underline"
              >
                Insert Sample Data
              </button>
            </div>
            <textarea
              rows={4}
              value={csvText}
              onChange={(e) => setCsvText(e.target.value)}
              placeholder="Project,Client,Revenue,EstimatedCost,ActualCost,HoursBilled,Status,Lead..."
              className="w-full font-mono text-[11px] bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successCount !== null && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Successfully parsed and loaded {successCount} projects into live workspace!</span>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleParseAndImport}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              Import Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
