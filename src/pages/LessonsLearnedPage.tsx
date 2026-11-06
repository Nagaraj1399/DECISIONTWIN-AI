import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Plus,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  User,
  X,
} from 'lucide-react';
import { LessonLearnedItem } from '../types';

interface LessonsLearnedPageProps {
  lessons: LessonLearnedItem[];
  onAddLesson: (lesson: LessonLearnedItem) => void;
  onNavigateToSimulator: () => void;
}

export function LessonsLearnedPage({
  lessons,
  onAddLesson,
  onNavigateToSimulator,
}: LessonsLearnedPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New lesson form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<LessonLearnedItem['category']>('Operational');
  const [whatHappened, setWhatHappened] = useState('');
  const [whatWasExpected, setWhatWasExpected] = useState('');
  const [whatActuallyHappened, setWhatActuallyHappened] = useState('');
  const [whyDifferenceOccurred, setWhyDifferenceOccurred] = useState('');
  const [whatLearned, setWhatLearned] = useState('');
  const [howInfluencesFuture, setHowInfluencesFuture] = useState('');
  const [financialImpact, setFinancialImpact] = useState('');

  const categories = ['All', 'Financial', 'Customer', 'Operational', 'Hiring', 'Pricing', 'Strategy'];

  const filteredLessons = lessons.filter(
    (l) => selectedCategory === 'All' || l.category === selectedCategory
  );

  const handleSubmitNewLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newLesson: LessonLearnedItem = {
      id: `les-${Date.now()}`,
      title,
      category,
      whatHappened,
      whatWasExpected,
      whatActuallyHappened,
      whyDifferenceOccurred,
      whatLearned,
      howInfluencesFuture,
      relatedDecisionTitle: 'Recorded Post-Mortem',
      actualFinancialImpact: financialImpact || '₹0 direct impact',
      date: new Date().toISOString().split('T')[0],
      verifiedBy: 'Mohammed Al-Mansoor (MD)',
    };

    onAddLesson(newLesson);
    setShowAddModal(false);
    setTitle('');
    setWhatHappened('');
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
              Organizational Learning Loop
            </span>
            <span className="text-xs text-slate-400 font-mono">Continuous Improvement</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lessons Learned
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How previous decisions improve future decisions. Converting variance into institutional wisdom.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Record New Lesson
        </button>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lessons Cards List */}
      <div className="space-y-6">
        {filteredLessons.map((les) => (
          <div
            key={les.id}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-5"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  {les.category} Lesson
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-mono text-[11px]">Retained: {les.date}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 text-[11px]">Verified by {les.verifiedBy}</span>
              </div>

              <div className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                Financial Impact: {les.actualFinancialImpact}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">{les.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Related Historical Decision: <strong>{les.relatedDecisionTitle}</strong>
              </p>
            </div>

            {/* 6 Structured Breakdown Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* 1. What Happened */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                  1. What Happened:
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{les.whatHappened}</p>
              </div>

              {/* 2. What Was Expected */}
              <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
                  2. What Was Expected:
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{les.whatWasExpected}</p>
              </div>

              {/* 3. What Actually Happened */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                  3. What Actually Happened:
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{les.whatActuallyHappened}</p>
              </div>

              {/* 4. Why Difference Occurred */}
              <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider block">
                  4. Why the Difference Occurred:
                </span>
                <p className="text-slate-700 leading-relaxed text-[11px]">{les.whyDifferenceOccurred}</p>
              </div>
            </div>

            {/* 5 & 6. What Was Learned & How It Influences Future Decisions */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                  5. What the Company Learned:
                </span>
                <p className="text-slate-800 font-semibold text-xs mt-0.5">{les.whatLearned}</p>
              </div>

              <div className="pt-2 border-t border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
                  6. How This Influences Future Decisions:
                </span>
                <p className="text-slate-700 text-[11px] mt-0.5 leading-relaxed">
                  {les.howInfluencesFuture}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to add a new lesson */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm">Record New Organizational Lesson</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewLesson} className="p-5 space-y-3.5 text-xs max-h-[75vh] overflow-y-auto">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Lesson Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scope Creep Risk in Fixed-Fee Mobile Deliveries"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="Operational">Operational</option>
                    <option value="Financial">Financial</option>
                    <option value="Customer">Customer</option>
                    <option value="Hiring">Hiring</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Financial Impact (₹)</label>
                  <input
                    type="text"
                    value={financialImpact}
                    onChange={(e) => setFinancialImpact(e.target.value)}
                    placeholder="e.g. ₹1,20,000 variance"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">What Happened</label>
                <textarea
                  rows={2}
                  value={whatHappened}
                  onChange={(e) => setWhatHappened(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">What Was Learned</label>
                <textarea
                  rows={2}
                  value={whatLearned}
                  onChange={(e) => setWhatLearned(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">How This Influences Future Decisions</label>
                <textarea
                  rows={2}
                  value={howInfluencesFuture}
                  onChange={(e) => setHowInfluencesFuture(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-xs"
                >
                  Retain Lesson into Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
