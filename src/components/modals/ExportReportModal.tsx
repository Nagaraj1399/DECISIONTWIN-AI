import React, { useState } from 'react';
import { X, Download, Printer, FileText, CheckCircle2 } from 'lucide-react';
import { ReportItem } from '../../types';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportItem | null;
}

export function ExportReportModal({ isOpen, onClose, report }: ExportReportModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [exportedFormat, setExportedFormat] = useState<'pdf' | 'csv' | null>(null);

  if (!isOpen || !report) return null;

  const handleDownload = (format: 'pdf' | 'csv') => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setExportedFormat(format);

      if (format === 'csv') {
        const csvContent = `data:text/csv;charset=utf-8,Report,${report.title}\nCategory,${report.category}\nDate,${report.lastGenerated}\nCompany,NovaTech Solutions\nRevenue,2500000\nOperating Profit,600000\nOperating Margin,24.0%\nUtilization,76%\nActive Projects,12\nRisk Score,32/100`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${report.title.toLowerCase().replace(/\s+/g, '_')}_novatech.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.print();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Export Executive Report</h3>
              <p className="text-[11px] text-slate-500">{report.title}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Preview */}
        <div className="p-6 space-y-4 text-xs">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 font-mono">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 font-sans">NovaTech Solutions HQ</span>
              <span className="text-slate-500 text-[10px]">Date: Nov 06, 2026</span>
            </div>
            <div className="text-[11px] text-slate-700 font-sans leading-relaxed">
              {report.description}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
              <div>Monthly Revenue: ₹25,00,000</div>
              <div>Operating Margin: 24.0%</div>
              <div>Active Headcount: 35</div>
              <div>Risk Index: 32 (Moderate)</div>
            </div>
            <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex justify-between">
              <span>Security: Internal Executive Use Only</span>
              <span>Audit Trail: Verified Hindsight Ledger</span>
            </div>
          </div>

          {exportedFormat && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Report exported successfully as {exportedFormat.toUpperCase()}!</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleDownload('pdf')}
              disabled={downloading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => handleDownload('csv')}
              disabled={downloading}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download CSV Data</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
