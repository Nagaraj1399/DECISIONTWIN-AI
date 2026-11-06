import { SimulatorConfig, ScenarioCardData } from '../types';

export const BASE_COMPANY_METRICS = {
  monthlyRevenue: 2500000,
  monthlyOperatingCosts: 1900000,
  monthlyOperatingProfit: 600000,
  baseMargin: 24.0,
  currentUtilization: 76,
  activeProjects: 12,
  headcount: 35,
};

export function formatINR(val: number): string {
  if (Math.abs(val) >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(val) >= 100000) {
    return `₹${(val / 100000).toFixed(2)} L`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

export function formatFullINR(val: number): string {
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

export function calculateScenarios(config: SimulatorConfig): ScenarioCardData[] {
  const period = config.simulationPeriodMonths;

  // Scenario A: Aggressive Growth (e.g., 5 hires or user configured high scale)
  const aHeadcount = Math.max(config.numEmployees, 5);
  const aRecruitmentTotal = aHeadcount * config.recruitmentCostPerEmployee;
  const aMonthlySalary = aHeadcount * config.monthlySalaryPerEmployee;
  // Overhead factor: 1.15 for laptop, licenses, benefits
  const aTotalMonthlyCost = aMonthlySalary * 1.15;
  // Billable capacity
  const aTotalHoursPerMonth = aHeadcount * config.expectedBillableHoursPerMonth * (config.expectedUtilization / 100);
  const aIncrementalMonthlyRevenue = aTotalHoursPerMonth * config.hourlyBillingRate;
  const aProjectedRevenue = BASE_COMPANY_METRICS.monthlyRevenue + aIncrementalMonthlyRevenue;
  const aProjectedOperatingCosts = BASE_COMPANY_METRICS.monthlyOperatingCosts + aTotalMonthlyCost;
  const aProjectedOperatingProfit = aProjectedRevenue - aProjectedOperatingCosts;
  const aExpectedMargin = (aProjectedOperatingProfit / aProjectedRevenue) * 100;
  
  // Break-even months: Upfront recruitment / (incremental monthly operating profit)
  const aNetIncrementalMonthly = aIncrementalMonthlyRevenue - aTotalMonthlyCost;
  const aBreakEven = aNetIncrementalMonthly > 0 ? Math.ceil(aRecruitmentTotal / aNetIncrementalMonthly) + 1 : 99;

  // Scenario B: Balanced Growth (e.g., 2 hires - Recommended)
  const bHeadcount = Math.min(Math.max(config.numEmployees, 2), 3);
  const bRecruitmentTotal = bHeadcount * config.recruitmentCostPerEmployee;
  const bMonthlySalary = bHeadcount * config.monthlySalaryPerEmployee;
  const bTotalMonthlyCost = bMonthlySalary * 1.12;
  const bTotalHoursPerMonth = bHeadcount * config.expectedBillableHoursPerMonth * (Math.min(config.expectedUtilization + 5, 85) / 100);
  const bIncrementalMonthlyRevenue = bTotalHoursPerMonth * config.hourlyBillingRate;
  const bProjectedRevenue = BASE_COMPANY_METRICS.monthlyRevenue + bIncrementalMonthlyRevenue;
  const bProjectedOperatingCosts = BASE_COMPANY_METRICS.monthlyOperatingCosts + bTotalMonthlyCost;
  const bProjectedOperatingProfit = bProjectedRevenue - bProjectedOperatingCosts;
  const bExpectedMargin = (bProjectedOperatingProfit / bProjectedRevenue) * 100;
  const bNetIncrementalMonthly = bIncrementalMonthlyRevenue - bTotalMonthlyCost;
  const bBreakEven = bNetIncrementalMonthly > 0 ? Math.ceil(bRecruitmentTotal / bNetIncrementalMonthly) + 1 : 99;

  // Scenario C: Flexible Expansion (Contractor model: 0 recruitment, variable pay)
  const cContractorCount = bHeadcount + 1;
  const cHourlyContractorRate = config.hourlyBillingRate * 0.65; // Contractor gets 65% of billing
  const cContractorHours = cContractorCount * (config.expectedBillableHoursPerMonth * 0.85);
  const cTotalMonthlyCost = cContractorHours * cHourlyContractorRate;
  const cIncrementalMonthlyRevenue = cContractorHours * config.hourlyBillingRate;
  const cProjectedRevenue = BASE_COMPANY_METRICS.monthlyRevenue + cIncrementalMonthlyRevenue;
  const cProjectedOperatingCosts = BASE_COMPANY_METRICS.monthlyOperatingCosts + cTotalMonthlyCost;
  const cProjectedOperatingProfit = cProjectedRevenue - cProjectedOperatingCosts;
  const cExpectedMargin = (cProjectedOperatingProfit / cProjectedRevenue) * 100;
  const cBreakEven = 1; // Immediate break-even because no recruitment capex and zero bench liability

  // Generate monthly trajectory
  const generateTrajectory = (
    upfrontCapex: number,
    incrementalRev: number,
    incrementalCost: number
  ) => {
    const trajectory = [];
    let cumulative = -upfrontCapex;
    for (let m = 1; m <= period; m++) {
      // Ramp-up factor (Month 1: 50%, Month 2: 75%, Month 3+: 100%)
      const ramp = m === 1 ? 0.45 : m === 2 ? 0.75 : 1.0;
      const netMonthly = (incrementalRev * ramp) - incrementalCost;
      cumulative += netMonthly;
      trajectory.push({
        month: m,
        cashFlow: netMonthly,
        cumulativeProfit: cumulative,
      });
    }
    return trajectory;
  };

  const scenarioA: ScenarioCardData = {
    id: 'scenario-a',
    code: 'A',
    name: 'Aggressive Growth',
    badge: 'High Upside / High Fixed Cost',
    tagline: `Hire ${aHeadcount} Full-Time Developers immediately`,
    isRecommended: false,
    additionalMonthlyCost: aTotalMonthlyCost,
    projectedRevenue: aProjectedRevenue,
    projectedOperatingProfit: aProjectedOperatingProfit,
    expectedProfitMargin: Number(aExpectedMargin.toFixed(1)),
    breakEvenPeriodMonths: Math.min(aBreakEven, 8),
    financialRiskScore: 68,
    financialRiskLevel: 'High Risk',
    keyAssumptions: [
      `Assumes all ${aHeadcount} engineers reach 75% billability within 60 days.`,
      `Requires closing at least 3 concurrent new project SOWs by next month.`,
      `Recruitment and hardware capex ₹${((aRecruitmentTotal + aHeadcount * 75000) / 100000).toFixed(1)}L front-loaded in Month 1.`,
    ],
    pros: [
      'Maximizes potential pipeline capture if macro enterprise demand surges',
      'Builds dedicated proprietary in-house domain knowledge',
      'Long-term lower blended hourly cost than long-term contractor rates',
    ],
    cons: [
      'Permanently increases monthly payroll break-even threshold by ₹' + (aTotalMonthlyCost / 100000).toFixed(2) + 'L',
      'Severe idle bench penalty if pipeline conversion experiences 30-day slip',
      'Heavy management bandwidth required for simultaneous onboarding',
    ],
    cashFlowTrajectory: generateTrajectory(aRecruitmentTotal, aIncrementalMonthlyRevenue, aTotalMonthlyCost),
  };

  const scenarioB: ScenarioCardData = {
    id: 'scenario-b',
    code: 'B',
    name: 'Balanced Growth',
    badge: 'DecisionTwin Recommended',
    tagline: `Hire ${bHeadcount} Full-Time Senior Developers`,
    isRecommended: true,
    additionalMonthlyCost: bTotalMonthlyCost,
    projectedRevenue: bProjectedRevenue,
    projectedOperatingProfit: bProjectedOperatingProfit,
    expectedProfitMargin: Number(bExpectedMargin.toFixed(1)),
    breakEvenPeriodMonths: Math.min(bBreakEven, 4),
    financialRiskScore: 28,
    financialRiskLevel: 'Low Risk',
    keyAssumptions: [
      `Absorbs existing backlog without saturating lead developers with mentoring overhead.`,
      `Recruitment capex kept under ₹${(bRecruitmentTotal / 100000).toFixed(2)}L.`,
      `Current 76% team utilization increases steadily toward 81% benchmark.`,
    ],
    pros: [
      'Controls fixed cost expansion while unlocking delivery bottlenecks',
      'Short 3.5-month break-even recovery timeline',
      'Safeguards working capital reserves against unforeseen client payment delays',
    ],
    cons: [
      'May require turning down low-priority exploratory leads if demand exceeds forecast',
      'Takes 30-45 days to source top-tier senior talent in current tech market',
    ],
    cashFlowTrajectory: generateTrajectory(bRecruitmentTotal, bIncrementalMonthlyRevenue, bTotalMonthlyCost),
  };

  const scenarioC: ScenarioCardData = {
    id: 'scenario-c',
    code: 'C',
    name: 'Flexible Expansion',
    badge: 'Low Commitment',
    tagline: `Deploy ${cContractorCount} Specialized Contractors as Needed`,
    isRecommended: false,
    additionalMonthlyCost: cTotalMonthlyCost,
    projectedRevenue: cProjectedRevenue,
    projectedOperatingProfit: cProjectedOperatingProfit,
    expectedProfitMargin: Number(cExpectedMargin.toFixed(1)),
    breakEvenPeriodMonths: cBreakEven,
    financialRiskScore: 38,
    financialRiskLevel: 'Moderate Risk',
    keyAssumptions: [
      `Zero recruitment fees or severance liabilities.`,
      `Pay-per-hour model: contractors only invoiced when client project is active.`,
      `Slightly lower gross margin per billable hour (35% margin vs 48% on full-time staff).`,
    ],
    pros: [
      'Zero bench cost risk if client contracts stall or reduce scope',
      'Instant deployment without lengthy notice period delays',
      'Leaves core permanent headcount intact at 35 team members',
    ],
    cons: [
      'Higher unit cost per hour limits long-term margin ceiling',
      'Lower institutional memory retention once contractor agreements conclude',
      'Contractor availability cannot be guaranteed across consecutive quarters',
    ],
    cashFlowTrajectory: generateTrajectory(0, cIncrementalMonthlyRevenue, cTotalMonthlyCost),
  };

  return [scenarioB, scenarioA, scenarioC];
}
