import { CONFIG } from "@/data/config";
import districtsData from "@/data/districts.json";
import programmesData from "@/data/programmes.json";
import vendorsData from "@/data/vendors.json";
import projectsData from "@/data/projects.json";
import schoolsData from "@/data/schools.json";
import inspectionsData from "@/data/inspections.json";
import decisionsData from "@/data/decisions.json";
import aiInsightsData from "@/data/aiInsights.json";
import notificationsData from "@/data/notifications.json";
import monthlyTrendData from "@/data/monthlyTrend.json";

export interface DashboardKPIs {
  budgetCr: number;
  totalSchools: number;
  physicalProgress: number;
  financialProgress: number;
  delayedProjects: number;
  atRiskAmountCr: number;
  needAttentionCount: number;
  delayedPct: number;
  onTrackDistrictsCount: number;
  needAttentionDistrictsCount: number;
  atRiskDistrictsCount: number;
}

export function getFilteredKPIs(programmeFilter?: string, districtFilter?: string): DashboardKPIs {
  // If no filters or "All", return consistent state totals
  const isAllProg = !programmeFilter || programmeFilter === "All Education Programmes";
  const isAllDist = !districtFilter || districtFilter === "All Districts";

  if (isAllProg && isAllDist) {
    const onTrack = districtsData.filter((d) => d.physical >= 75).length;
    const needAttn = districtsData.filter((d) => d.physical >= 50 && d.physical < 75).length;
    const atRisk = districtsData.filter((d) => d.physical < 50).length;

    return {
      budgetCr: CONFIG.TOTAL_BUDGET_CR,
      totalSchools: CONFIG.TOTAL_SCHOOLS,
      physicalProgress: CONFIG.OVERALL_PHYSICAL_PROGRESS,
      financialProgress: CONFIG.OVERALL_FINANCIAL_PROGRESS,
      delayedProjects: CONFIG.DELAYED_PROJECTS,
      atRiskAmountCr: CONFIG.AT_RISK_AMOUNT_CR,
      needAttentionCount: CONFIG.NEED_ATTENTION_COUNT,
      delayedPct: 3.4,
      onTrackDistrictsCount: onTrack,
      needAttentionDistrictsCount: needAttn,
      atRiskDistrictsCount: atRisk,
    };
  }

  // Filtered by district
  if (!isAllDist && isAllProg) {
    const dist = districtsData.find((d) => d.name.toLowerCase() === districtFilter.toLowerCase()) || districtsData[0];
    return {
      budgetCr: Math.round((dist.schools / 8420) * CONFIG.TOTAL_BUDGET_CR),
      totalSchools: dist.schools,
      physicalProgress: dist.physical,
      financialProgress: dist.financial,
      delayedProjects: dist.delayed,
      atRiskAmountCr: Number(((dist.delayed * 0.11) + (dist.atRisk * 0.4)).toFixed(1)),
      needAttentionCount: Math.round(dist.schools * 0.14),
      delayedPct: Number(((dist.delayed / dist.schools) * 100).toFixed(1)),
      onTrackDistrictsCount: dist.physical >= 75 ? 1 : 0,
      needAttentionDistrictsCount: dist.physical >= 50 && dist.physical < 75 ? 1 : 0,
      atRiskDistrictsCount: dist.physical < 50 ? 1 : 0,
    };
  }

  // Filtered by programme
  if (!isAllProg && isAllDist) {
    const prog = programmesData.find((p) => p.name.toLowerCase().includes(programmeFilter.toLowerCase())) || programmesData[0];
    return {
      budgetCr: prog.budgetCr,
      totalSchools: prog.schools,
      physicalProgress: prog.physical,
      financialProgress: prog.financial,
      delayedProjects: prog.delayed,
      atRiskAmountCr: Number(((prog.delayed * 0.12)).toFixed(1)),
      needAttentionCount: Math.round(prog.schools * 0.13),
      delayedPct: Number(((prog.delayed / prog.schools) * 100).toFixed(1)),
      onTrackDistrictsCount: prog.physical >= 75 ? 32 : 24,
      needAttentionDistrictsCount: 14,
      atRiskDistrictsCount: 6,
    };
  }

  // Both filtered
  return {
    budgetCr: 18,
    totalSchools: 120,
    physicalProgress: 68,
    financialProgress: 62,
    delayedProjects: 14,
    atRiskAmountCr: 2.4,
    needAttentionCount: 22,
    delayedPct: 11.6,
    onTrackDistrictsCount: 1,
    needAttentionDistrictsCount: 0,
    atRiskDistrictsCount: 0,
  };
}

export function getAllDistricts() {
  return districtsData;
}

export function getDistrictById(id: string) {
  return districtsData.find((d) => d.id.toLowerCase() === id.toLowerCase() || d.name.toLowerCase() === id.toLowerCase());
}

export function getAllProgrammes() {
  return programmesData;
}

export function getProgrammeById(id: string) {
  return programmesData.find((p) => p.id.toLowerCase() === id.toLowerCase());
}

export function getAllVendors() {
  return vendorsData;
}

export function getVendorById(id: string) {
  return vendorsData.find((v) => v.id.toLowerCase() === id.toLowerCase());
}

export function getAllProjects() {
  return projectsData;
}

export function getAllSchools() {
  return schoolsData;
}

export function getSchoolByUdise(udise: string) {
  return schoolsData.find((s) => s.udise === udise) || schoolsData[0];
}

export function getAllInspections() {
  return inspectionsData;
}

export function getAllDecisions() {
  return decisionsData;
}

export function getAllAiInsights() {
  return aiInsightsData;
}

export function getAllNotifications() {
  return notificationsData;
}

export function getMonthlyTrend() {
  return monthlyTrendData;
}
