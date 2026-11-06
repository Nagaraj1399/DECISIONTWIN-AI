export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export interface KPIData {
  id: string;
  name: string;
  value: string;
  numericValue: number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  timeframe: string;
  sparkline: number[];
  tooltip: string;
  formula: string;
  source: string;
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  operatingCosts: number;
  operatingProfit: number;
  marginPercent: number;
}

export interface BusinessHealthDimension {
  name: string;
  score: number;
  status: 'optimal' | 'stable' | 'attention' | 'critical';
  trend: string;
  description: string;
  keyDriver: string;
}

export interface AIInsight {
  id: string;
  title: string;
  reason: string;
  suggestedAction: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  financialImpact: string;
  category: 'Margin' | 'Risk' | 'Resources' | 'Revenue' | 'Operations';
  timestamp: string;
  verifiedDataRef: string;
}

export interface ActivityTimelineItem {
  id: string;
  type: 'decision_created' | 'scenario_simulated' | 'recommendation_accepted' | 'outcome_recorded' | 'memory_updated';
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  badge: string;
  relatedId?: string;
}

export interface ProjectProfitability {
  id: string;
  name: string;
  client: string;
  revenue: number;
  estimatedCost: number;
  actualCost: number;
  expectedMargin: number;
  currentMargin: number;
  hoursBilled: number;
  hoursBudgeted: number;
  status: 'Healthy' | 'Review Required' | 'Margin Erosion' | 'Under Budget';
  lead: string;
}

export type DecisionCategory =
  | 'Hiring & Workforce'
  | 'Pricing & Revenue'
  | 'Investment & Expansion'
  | 'Customer & Contracts'
  | 'Operations'
  | 'Cost Reduction'
  | 'Other';

export type DecisionStatus =
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'In Progress'
  | 'Outcome Pending'
  | 'Completed';

export interface Decision {
  id: string;
  title: string;
  category: DecisionCategory;
  description: string;
  expectedInvestment: number;
  deadline: string;
  businessUnit: string;
  riskTolerance: 'Conservative' | 'Moderate' | 'Aggressive';
  createdDate: string;
  owner: string;
  recommendedOption: string;
  selectedOption: string;
  predictedImpact: string;
  actualImpact?: string;
  status: DecisionStatus;
  variance?: string;
  confidenceScore: number;
  originalQuestion: string;
  informationAvailable: string[];
  optionsEvaluated: {
    name: string;
    description: string;
    projectedRoi: string;
    risk: 'Low' | 'Medium' | 'High';
  }[];
  simulationResultsSummary: string;
  aiRecommendation: string;
  finalReasoning?: string;
  lessonsLearned?: string[];
  timeline: {
    date: string;
    event: string;
    detail: string;
  }[];
}

export interface SimulatorConfig {
  numEmployees: number;
  monthlySalaryPerEmployee: number;
  recruitmentCostPerEmployee: number;
  expectedBillableHoursPerMonth: number;
  hourlyBillingRate: number;
  expectedProjectDemand: number;
  revenuePerProject: number;
  expectedUtilization: number;
  simulationPeriodMonths: 3 | 6 | 12 | 24;
}

export interface ScenarioCardData {
  id: 'scenario-a' | 'scenario-b' | 'scenario-c';
  code: 'A' | 'B' | 'C';
  name: string;
  badge?: string;
  tagline: string;
  isRecommended?: boolean;
  additionalMonthlyCost: number;
  projectedRevenue: number;
  projectedOperatingProfit: number;
  expectedProfitMargin: number;
  breakEvenPeriodMonths: number;
  financialRiskScore: number;
  financialRiskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  keyAssumptions: string[];
  pros: string[];
  cons: string[];
  cashFlowTrajectory: { month: number; cumulativeProfit: number; cashFlow: number }[];
}

export type MemoryCategory = 'Business Facts' | 'Decision History' | 'Lessons Learned' | 'Strategic Preferences';

export interface BusinessMemoryEntry {
  id: string;
  title: string;
  description: string;
  category: MemoryCategory;
  relatedProject?: string;
  relatedDecision?: string;
  dateRetained: string;
  lastRetrieved: string;
  source: string;
  confidence: number;
  status: 'Verified Fact' | 'Empirical Lesson' | 'Stated Preference';
  vectorId: string;
  tags: string[];
}

export interface LessonLearnedItem {
  id: string;
  title: string;
  category: 'Financial' | 'Customer' | 'Operational' | 'Hiring' | 'Pricing' | 'Strategy';
  whatHappened: string;
  whatWasExpected: string;
  whatActuallyHappened: string;
  whyDifferenceOccurred: string;
  whatLearned: string;
  howInfluencesFuture: string;
  relatedDecisionTitle: string;
  actualFinancialImpact: string;
  date: string;
  verifiedBy: string;
}

export interface ReportItem {
  id: string;
  title: string;
  description: string;
  category: string;
  frequency: string;
  lastGenerated: string;
  readyForExport: boolean;
  metricsCovered: string[];
}

export interface DataSourceItem {
  id: string;
  name: string;
  type: string;
  logo: string;
  description: string;
  status: 'Connected' | 'Simulated Development State' | 'Disconnected';
  lastSync: string;
  dataCategories: string[];
  recordCount: number;
}
