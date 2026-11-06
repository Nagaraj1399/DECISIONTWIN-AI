import React, { useState } from 'react';
import { MonthlyTrend, BusinessHealthDimension } from '../../types';
import { formatINR } from '../../utils/simulationEngine';

// Micro Sparkline Component
export function Sparkline({
  data,
  color = '#2563EB',
  height = 28,
  width = 80,
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - 4) + 2;
      const y = height - 4 - ((val - min) / range) * (height - 8);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible inline-block">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

// Multi-series Revenue, Costs, and Operating Profit Line/Area Chart
export function RevenueCostsChart({ data }: { data: MonthlyTrend[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 640;
  const height = 260;
  const padding = { top: 20, right: 25, bottom: 35, left: 65 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.revenue)) * 1.1;
  const minVal = 0;

  const getX = (idx: number) => padding.left + (idx / (data.length - 1)) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;

  // Paths
  const revPoints = data.map((d, i) => `${getX(i)},${getY(d.revenue)}`).join(' ');
  const costPoints = data.map((d, i) => `${getX(i)},${getY(d.operatingCosts)}`).join(' ');
  const profitPoints = data.map((d, i) => `${getX(i)},${getY(d.operatingProfit)}`).join(' ');

  const revArea = `${getX(0)},${padding.top + chartHeight} ${revPoints} ${getX(data.length - 1)},${padding.top + chartHeight}`;

  const hoveredItem = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="w-full relative select-none">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span className="text-slate-600">Monthly Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-600">Operating Costs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span className="text-slate-600">Operating Profit</span>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-mono">Last 6 Months • In Lakhs (₹)</span>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[500px]"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padding.top + chartHeight * (1 - pct);
            const val = minVal + pct * (maxVal - minVal);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-mono"
                >
                  ₹{(val / 100000).toFixed(1)}L
                </text>
              </g>
            );
          })}

          {/* Area fill for revenue */}
          <polygon points={revArea} fill="url(#revGrad)" />

          {/* Lines */}
          <polyline
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={revPoints}
          />
          <polyline
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3 3"
            points={costPoints}
          />
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={profitPoints}
          />

          {/* X axis labels and hover trigger areas */}
          {data.map((d, i) => {
            const x = getX(i);
            const isHovered = hoverIndex === i;
            return (
              <g key={i}>
                {/* Vertical hover indicator */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={padding.top + chartHeight}
                    stroke="#94A3B8"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Point dots */}
                <circle
                  cx={x}
                  cy={getY(d.revenue)}
                  r={isHovered ? 5 : 3.5}
                  className="fill-blue-600 transition-all duration-150"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <circle
                  cx={x}
                  cy={getY(d.operatingProfit)}
                  r={isHovered ? 5 : 3.5}
                  className="fill-emerald-600 transition-all duration-150"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />

                <text
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  className={`text-xs font-medium ${isHovered ? 'fill-blue-600 font-bold' : 'fill-slate-500'}`}
                >
                  {d.month}
                </text>

                {/* Invisible hover slice */}
                <rect
                  x={x - chartWidth / (data.length * 2)}
                  y={padding.top}
                  width={chartWidth / data.length}
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIndex(i)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Tooltip */}
      {hoveredItem && hoverIndex !== null && (
        <div
          className="absolute z-20 pointer-events-none bg-slate-900 text-white rounded-lg p-3 text-xs shadow-xl border border-slate-700 -translate-x-1/2 transition-all duration-100"
          style={{
            left: `${(getX(hoverIndex) / width) * 100}%`,
            top: '30px',
          }}
        >
          <div className="font-semibold text-slate-200 border-b border-slate-700 pb-1 mb-1.5 flex justify-between gap-4">
            <span>{hoveredItem.month} 2026</span>
            <span className="text-emerald-400 font-mono">{hoveredItem.marginPercent}% margin</span>
          </div>
          <div className="space-y-1 font-mono">
            <div className="flex justify-between gap-3">
              <span className="text-blue-400">Revenue:</span>
              <span>{formatINR(hoveredItem.revenue)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-amber-400">Costs:</span>
              <span>{formatINR(hoveredItem.operatingCosts)}</span>
            </div>
            <div className="flex justify-between gap-3 font-semibold text-emerald-400 border-t border-slate-800 pt-1">
              <span>Op. Profit:</span>
              <span>{formatINR(hoveredItem.operatingProfit)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Business Health Radial / Circular visualization
export function BusinessHealthRadial({ dimensions }: { dimensions: BusinessHealthDimension[] }) {
  const overallScore = Math.round(
    dimensions.reduce((acc, curr) => acc + curr.score, 0) / dimensions.length
  );

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Composite Health</span>
          <h4 className="text-base font-bold text-slate-900">Multi-Dimensional Score</h4>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Resilient (78/100)
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 items-center">
        {/* Center Circular Gauge */}
        <div className="flex flex-col items-center justify-center relative">
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="58"
              stroke="#F1F5F9"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="72"
              cy="72"
              r="58"
              stroke="#2563EB"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 58}
              strokeDashoffset={2 * Math.PI * 58 * (1 - overallScore / 100)}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{overallScore}</span>
            <span className="text-[11px] font-medium text-slate-500">out of 100</span>
          </div>
        </div>

        {/* Dimension Breakdown Bars */}
        <div className="space-y-3">
          {dimensions.map((dim) => {
            const barColor =
              dim.score >= 80 ? 'bg-emerald-500' : dim.score >= 70 ? 'bg-blue-600' : 'bg-amber-500';
            return (
              <div key={dim.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{dim.name}</span>
                  <span className="font-bold text-slate-900 font-mono">{dim.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor} transition-all duration-700`}
                    style={{ width: `${dim.score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="truncate max-w-[160px]">{dim.keyDriver}</span>
                  <span className="font-mono">{dim.trend}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold">
          i
        </div>
        <div>
          <span className="font-semibold text-slate-800">CFO Advisory Note:</span> Financial & Resource health remain optimal. Customer concentration is your primary resilience vulnerability (64% in top 3 clients).
        </div>
      </div>
    </div>
  );
}

// Monthly Cash Flow & Cumulative Break-even Timeline for Scenarios
export function ScenarioCashflowChart({
  trajectories,
  period,
}: {
  trajectories: { name: string; color: string; data: { month: number; cumulativeProfit: number }[] }[];
  period: number;
}) {
  const width = 640;
  const height = 240;
  const padding = { top: 20, right: 30, bottom: 35, left: 70 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find min and max across all trajectories
  let allVals: number[] = [0];
  trajectories.forEach((t) => t.data.forEach((d) => allVals.push(d.cumulativeProfit)));
  const minVal = Math.min(...allVals);
  const maxVal = Math.max(...allVals) * 1.15;
  const range = maxVal - minVal || 1;

  const getX = (m: number) => padding.left + ((m - 1) / (period - 1)) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - ((val - minVal) / range) * chartHeight;

  const zeroY = getY(0);

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4 text-xs">
          {trajectories.map((t) => (
            <div key={t.name} className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: t.color }}></span>
              <span className="text-slate-700 font-medium">{t.name}</span>
            </div>
          ))}
        </div>
        <span className="text-xs text-slate-400 font-mono">Cumulative Net Cash Flow (₹)</span>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[520px]">
          {/* Zero line (Break-even threshold) */}
          <line
            x1={padding.left}
            y1={zeroY}
            x2={width - padding.right}
            y2={zeroY}
            stroke="#64748B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={width - padding.right}
            y={zeroY - 6}
            textAnchor="end"
            className="text-[10px] font-bold fill-slate-500 uppercase tracking-wider"
          >
            Break-Even Line (₹0)
          </text>

          {/* Lines for each trajectory */}
          {trajectories.map((t) => {
            const points = t.data.map((d) => `${getX(d.month)},${getY(d.cumulativeProfit)}`).join(' ');
            return (
              <g key={t.name}>
                <polyline
                  fill="none"
                  stroke={t.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />
                {t.data.map((d) => (
                  <circle
                    key={d.month}
                    cx={getX(d.month)}
                    cy={getY(d.cumulativeProfit)}
                    r={3.5}
                    fill={t.color}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            );
          })}

          {/* Month labels on X axis */}
          {Array.from({ length: period }, (_, i) => i + 1).map((m) => (
            <text
              key={m}
              x={getX(m)}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-slate-500 font-mono"
            >
              M{m}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
