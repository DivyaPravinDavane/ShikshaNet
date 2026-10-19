"use client";

import React from "react";
import {
  Wallet,
  School,
  BarChart3,
  Coins,
  AlertTriangle,
  AlertOctagon,
} from "lucide-react";
import { KpiCard } from "@/components/common/KpiCard";
import { MPMap } from "@/components/map/MPMap";
import { AiPriorities } from "@/components/ai/AiPriorities";
import { ProgramProgressChart } from "@/components/charts/ProgramProgressChart";
import { DistrictPerformanceTable } from "@/components/common/DistrictPerformanceTable";
import { VendorPerformanceTable } from "@/components/common/VendorPerformanceTable";
import { useFilterStore } from "@/store";
import { getFilteredKPIs } from "@/lib/selectors";

export function Option1Full() {
  const { programme, district } = useFilterStore();
  const kpis = getFilteredKPIs(programme, district);

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-4 select-none">
      {/* Row A: 6 KPI cards, equal width, height ~104px */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. Programme Budget */}
        <KpiCard
          label="Programme Budget"
          value={kpis.budgetCr}
          prefix="₹"
          suffix=" Cr"
          subLabel="Total Allocation"
          icon={Wallet}
          variant="blue"
          hasChevronDown={true}
          href="/finance"
        />

        {/* 2. Schools */}
        <KpiCard
          label="Schools"
          value={kpis.totalSchools}
          subLabel="Across 52 Districts"
          icon={School}
          variant="green"
          href="/schools"
        />

        {/* 3. Physical Progress */}
        <KpiCard
          label="Physical Progress"
          value={kpis.physicalProgress}
          suffix="%"
          subLabel="vs last month"
          badgeText="▲ +6%"
          badgePositive={true}
          icon={BarChart3}
          variant="cyan"
          href="/programmes"
        />

        {/* 4. Financial Progress */}
        <KpiCard
          label="Financial Progress"
          value={kpis.financialProgress}
          suffix="%"
          subLabel="vs last month"
          badgeText="▲ +8%"
          badgePositive={true}
          icon={Coins}
          variant="purple"
          href="/finance"
        />

        {/* 5. Delayed Projects */}
        <KpiCard
          label="Delayed Projects"
          value={kpis.delayedProjects}
          subLabel={`${kpis.delayedPct}% of total`}
          icon={AlertTriangle}
          variant="red"
          href="/projects?status=delayed"
        />

        {/* 6. At-Risk Amount */}
        <KpiCard
          label="At-Risk Amount"
          value={kpis.atRiskAmountCr}
          prefix="₹"
          suffix=" Cr"
          decimals={1}
          subLabel={`Across ${kpis.delayedProjects} projects`}
          icon={AlertOctagon}
          variant="orange"
          hasChevronRight={true}
          href="/projects?status=at-risk"
        />
      </div>

      {/* Row B: Map card (col-span ~8 of 12) + AI Priorities card (col-span ~4 of 12) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8">
          <MPMap />
        </div>
        <div className="xl:col-span-4">
          <AiPriorities />
        </div>
      </div>

      {/* Row C: 3 equal cards, height ~270px */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Programme Progress Chart */}
        <ProgramProgressChart />

        {/* District Performance Table */}
        <DistrictPerformanceTable />

        {/* Vendor Performance Table */}
        <VendorPerformanceTable />
      </div>
    </div>
  );
}
