/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { AiAssistantDrawer } from './components/ai/AiAssistantDrawer';
import { RecordDecisionModal } from './components/modals/RecordDecisionModal';
import { ExportReportModal } from './components/modals/ExportReportModal';
import { CsvImportModal } from './components/modals/CsvImportModal';
import { HindsightStatusModal } from './components/modals/HindsightStatusModal';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { DecisionStudioPage } from './pages/DecisionStudioPage';
import { ScenarioSimulatorPage } from './pages/ScenarioSimulatorPage';
import { DecisionHistoryPage } from './pages/DecisionHistoryPage';
import { BusinessIntelligencePage } from './pages/BusinessIntelligencePage';
import { BusinessMemoryPage } from './pages/BusinessMemoryPage';
import { LessonsLearnedPage } from './pages/LessonsLearnedPage';
import { ReportsPage } from './pages/ReportsPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { SettingsPage } from './pages/SettingsPage';

// Data
import {
  INITIAL_KPIS,
  MONTHLY_TRENDS,
  BUSINESS_HEALTH_DIMENSIONS,
  AI_INSIGHTS,
  ACTIVITY_TIMELINE,
  PROJECT_PROFITABILITY,
  HISTORICAL_DECISIONS,
  BUSINESS_MEMORIES,
  LESSONS_LEARNED,
  REPORTS_DATA,
  DATA_SOURCES,
} from './data/mockData';

import {
  CurrencyCode,
  Decision,
  ProjectProfitability,
  LessonLearnedItem,
  ReportItem,
  ScenarioCardData,
} from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals & Drawers state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [exportReportModalOpen, setExportReportModalOpen] = useState(false);
  const [hindsightModalOpen, setHindsightModalOpen] = useState(false);
  const [csvImportModalOpen, setCsvImportModalOpen] = useState(false);

  // Selections
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [selectedReportForExport, setSelectedReportForExport] = useState<ReportItem | null>(null);
  const [selectedScenarioForRecord, setSelectedScenarioForRecord] = useState<ScenarioCardData | null>(null);

  // Global settings
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  // Application Data State
  const [kpis, setKpis] = useState(INITIAL_KPIS);
  const [trends, setTrends] = useState(MONTHLY_TRENDS);
  const [healthDimensions, setHealthDimensions] = useState(BUSINESS_HEALTH_DIMENSIONS);
  const [insights, setInsights] = useState(AI_INSIGHTS);
  const [activities, setActivities] = useState(ACTIVITY_TIMELINE);
  const [projects, setProjects] = useState(PROJECT_PROFITABILITY);
  const [decisions, setDecisions] = useState(HISTORICAL_DECISIONS);
  const [memories, setMemories] = useState(BUSINESS_MEMORIES);
  const [lessons, setLessons] = useState(LESSONS_LEARNED);
  const [reports, setReports] = useState(REPORTS_DATA);
  const [dataSources, setDataSources] = useState(DATA_SOURCES);

  // Global keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (route: string, itemId?: string) => {
    setCurrentRoute(route);
    setMobileSidebarOpen(false);
    if (route === 'decisions') {
      setSelectedDecisionId(itemId || null);
    } else {
      setSelectedDecisionId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenExportReport = (report?: ReportItem) => {
    setSelectedReportForExport(report || reports[0]);
    setExportReportModalOpen(true);
  };

  const handleOpenRecordDecision = (scenario?: ScenarioCardData) => {
    setSelectedScenarioForRecord(scenario || null);
    setRecordModalOpen(true);
  };

  const handleConfirmRecordDecision = (newDec: Partial<Decision>) => {
    const fullDecision: Decision = {
      id: `dec-${Date.now()}`,
      title: newDec.title || 'Recorded Business Decision',
      category: newDec.category || 'Hiring & Workforce',
      description: newDec.finalReasoning || 'Decision recorded and committed to historical ledger.',
      expectedInvestment: 320000,
      deadline: 'Q4 2026',
      businessUnit: 'Engineering',
      riskTolerance: 'Moderate',
      createdDate: new Date().toISOString().split('T')[0],
      owner: newDec.owner || 'Mohammed Al-Mansoor (MD)',
      recommendedOption: 'Balanced Growth',
      selectedOption: newDec.selectedOption || 'Balanced Growth (2 Hires)',
      predictedImpact: newDec.predictedImpact || '+₹3.1L operating profit with 3.5m break-even',
      status: 'Approved',
      confidenceScore: 88,
      originalQuestion: newDec.title || 'Decision Studio simulation query',
      informationAvailable: [
        'Current team utilization is 76%',
        'Liquid cash reserves at 3.1 weeks buffer',
        'Verified standard hourly billing floor ₹1,850/hr',
      ],
      optionsEvaluated: [
        { name: 'Aggressive Growth (5 Hires)', description: 'Scale fast', projectedRoi: '+32%', risk: 'High' },
        { name: 'Balanced Growth (2 Hires)', description: 'Controlled risk', projectedRoi: '+24%', risk: 'Low' },
        { name: 'Flexible Contractors', description: 'Zero fixed payroll', projectedRoi: '+18%', risk: 'Medium' },
      ],
      simulationResultsSummary: 'Balanced Growth offered lowest fixed burn risk with 3.5-month break-even.',
      aiRecommendation: 'Balanced Growth approved by Managing Director.',
      finalReasoning: newDec.finalReasoning,
      lessonsLearned: [
        'Ensure customer milestone signoffs occur in weekly cycles to prevent bench delay.',
      ],
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          event: 'Decision Formally Recorded',
          detail: 'Owner authorized sign-off committed to Hindsight organizational memory.',
        },
      ],
    };

    setDecisions((prev) => [fullDecision, ...prev]);

    // Add activity timeline item
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'decision_created',
        title: `Decision Approved: ${fullDecision.title}`,
        description: `Owner committed plan "${fullDecision.selectedOption}" to memory.`,
        actor: 'Mohammed Al-Mansoor',
        timestamp: 'Just now',
        badge: 'Approved',
      },
      ...prev,
    ]);

    // Also retain to memory
    setMemories((prev) => [
      {
        id: `mem-${Date.now()}`,
        title: `Decision Context: ${fullDecision.title}`,
        description: `Approved plan: ${fullDecision.selectedOption}. Expected impact: ${fullDecision.predictedImpact}. Stated rationale: ${fullDecision.finalReasoning}`,
        category: 'Decision History',
        relatedDecision: fullDecision.id,
        dateRetained: new Date().toISOString().split('T')[0],
        lastRetrieved: 'Just now',
        source: 'Executive Decision Studio Sign-off',
        confidence: 95,
        status: 'Verified Fact',
        vectorId: `vec_${Date.now()}`,
        tags: ['decision', 'governance', 'signoff', 'hiring'],
      },
      ...prev,
    ]);
  };

  const handleImportProjectsSuccess = (newProjects: ProjectProfitability[]) => {
    setProjects((prev) => [...newProjects, ...prev]);

    // Update KPI for active projects
    setKpis((prev) =>
      prev.map((k) =>
        k.id === 'kpi-projects'
          ? {
              ...k,
              value: String(projects.length + newProjects.length),
              numericValue: projects.length + newProjects.length,
            }
          : k
      )
    );

    // Record activity
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'memory_updated',
        title: `Imported ${newProjects.length} Projects via CSV`,
        description: 'Updated timesheets and actual labor margins across active client engagements.',
        actor: 'Mohammed Al-Mansoor',
        timestamp: 'Just now',
        badge: 'CSV Ingested',
      },
      ...prev,
    ]);
  };

  const handleAddLesson = (newLesson: LessonLearnedItem) => {
    setLessons((prev) => [newLesson, ...prev]);

    // Retain to memory
    setMemories((prev) => [
      {
        id: `mem-les-${Date.now()}`,
        title: newLesson.title,
        description: `Lesson: ${newLesson.whatLearned} Future guidance: ${newLesson.howInfluencesFuture}`,
        category: 'Lessons Learned',
        dateRetained: newLesson.date,
        lastRetrieved: 'Just now',
        source: `Post-Mortem (${newLesson.verifiedBy})`,
        confidence: 94,
        status: 'Empirical Lesson',
        vectorId: `vec_les_${Date.now()}`,
        tags: [newLesson.category.toLowerCase(), 'post-mortem', 'learning'],
      },
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] flex text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenHindsightStatus={() => setHindsightModalOpen(true)}
      />

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="relative z-10 w-64 bg-[#111827] h-full shadow-2xl">
            <Sidebar
              currentRoute={currentRoute}
              onNavigate={handleNavigate}
              collapsed={false}
              onToggleCollapse={() => setMobileSidebarOpen(false)}
              onOpenHindsightStatus={() => {
                setMobileSidebarOpen(false);
                setHindsightModalOpen(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Persistent Top Navigation */}
        <TopNavbar
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenAiAssistant={() => setAiAssistantOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(true)}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentRoute === 'overview' && (
            <OverviewPage
              kpis={kpis}
              trends={trends}
              healthDimensions={healthDimensions}
              insights={insights}
              activities={activities}
              projects={projects}
              onNavigate={handleNavigate}
              onOpenExportReport={() => handleOpenExportReport()}
              onOpenCsvImport={() => setCsvImportModalOpen(true)}
              onOpenAiAssistant={() => setAiAssistantOpen(true)}
            />
          )}

          {currentRoute === 'decision-studio' && (
            <DecisionStudioPage
              onNavigateToSimulator={(params) => {
                handleNavigate('simulator');
              }}
            />
          )}

          {currentRoute === 'simulator' && (
            <ScenarioSimulatorPage
              onOpenRecordModal={handleOpenRecordDecision}
              onOpenAiAssistant={() => setAiAssistantOpen(true)}
            />
          )}

          {currentRoute === 'decisions' && (
            <DecisionHistoryPage
              decisions={decisions}
              selectedDecisionId={selectedDecisionId}
              onSelectDecision={(id) => setSelectedDecisionId(id)}
              onNavigateToStudio={() => handleNavigate('decision-studio')}
            />
          )}

          {(currentRoute === 'intelligence' ||
            currentRoute === 'financial-intelligence' ||
            currentRoute === 'resource-intelligence' ||
            currentRoute === 'risk-intelligence') && (
            <BusinessIntelligencePage
              initialTab={
                currentRoute === 'financial-intelligence'
                  ? 'financial'
                  : currentRoute === 'resource-intelligence'
                  ? 'resources'
                  : currentRoute === 'risk-intelligence'
                  ? 'operations'
                  : 'financial'
              }
              projects={projects}
              trends={trends}
              onNavigateToSimulator={() => handleNavigate('simulator')}
            />
          )}

          {currentRoute === 'memory' && (
            <BusinessMemoryPage
              memories={memories}
              onOpenHindsightModal={() => setHindsightModalOpen(true)}
              onNavigateToSimulator={() => handleNavigate('simulator')}
            />
          )}

          {currentRoute === 'lessons' && (
            <LessonsLearnedPage
              lessons={lessons}
              onAddLesson={handleAddLesson}
              onNavigateToSimulator={() => handleNavigate('simulator')}
            />
          )}

          {currentRoute === 'reports' && (
            <ReportsPage
              reports={reports}
              onOpenExportReport={(report) => handleOpenExportReport(report)}
            />
          )}

          {currentRoute === 'data-sources' && (
            <DataSourcesPage
              dataSources={dataSources}
              onOpenCsvImport={() => setCsvImportModalOpen(true)}
            />
          )}

          {(currentRoute === 'settings' || currentRoute === 'team') && (
            <SettingsPage
              initialTab={currentRoute === 'team' ? 'team' : 'profile'}
              currency={currency}
              onCurrencyChange={setCurrency}
            />
          )}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      <AiAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onNavigateToSimulator={() => handleNavigate('simulator')}
      />

      <RecordDecisionModal
        isOpen={recordModalOpen}
        onClose={() => setRecordModalOpen(false)}
        scenarioData={selectedScenarioForRecord}
        onConfirmRecord={handleConfirmRecordDecision}
      />

      <ExportReportModal
        isOpen={exportReportModalOpen}
        onClose={() => setExportReportModalOpen(false)}
        report={selectedReportForExport}
      />

      <CsvImportModal
        isOpen={csvImportModalOpen}
        onClose={() => setCsvImportModalOpen(false)}
        onImportSuccess={handleImportProjectsSuccess}
      />

      <HindsightStatusModal
        isOpen={hindsightModalOpen}
        onClose={() => setHindsightModalOpen(false)}
      />
    </div>
  );
}
