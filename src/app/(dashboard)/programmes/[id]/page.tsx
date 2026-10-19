"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  GraduationCap,
  School,
  Wallet,
  BarChart3,
  Coins,
  AlertTriangle,
  Building2,
  UsersRound,
} from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { ProgressBar } from "@/components/common/ProgressBar";
import { ProgramProgressChart } from "@/components/charts/ProgramProgressChart";
import programmesData from "@/data/programmes.json";
import projectsData from "@/data/projects.json";
import districtsData from "@/data/districts.json";

export default function ProgrammeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) || "pm-shri";

  const prog = programmesData.find((p) => p.id === id) || programmesData[0];
  const relatedProjects = projectsData.filter((prj) =>
    prj.programme.toLowerCase().includes(prog.name.toLowerCase().split(" ")[0])
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Back button & Header */}
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Programmes
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center border border-primary/40 shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {prog.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30">
                  {prog.progress}% Overall
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">{prog.fullName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white bg-card border border-border px-3 py-1.5 rounded-xl">
              Budget: ₹{prog.budgetCr} Cr
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-card border border-border px-3 py-1.5 rounded-xl">
              Coverage: {prog.schools.toLocaleString()} Schools
            </span>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-[11px] text-text-muted">Awarded Ratio</span>
          <p className="text-2xl font-bold text-white mt-1 tabular-nums">{prog.awarded}%</p>
          <ProgressBar value={prog.awarded} color="primary" height="h-1.5" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-[11px] text-text-muted">Physical Progress</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">{prog.physical}%</p>
          <ProgressBar value={prog.physical} color="success" height="h-1.5" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-[11px] text-text-muted">Financial Utilisation</span>
          <p className="text-2xl font-bold text-white mt-1 tabular-nums">{prog.financial}%</p>
          <ProgressBar value={prog.financial} color="orange" height="h-1.5" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-rose-500/30 bg-rose-500/10">
          <span className="text-[11px] text-rose-300">Delayed / At-Risk</span>
          <p className="text-2xl font-bold text-rose-400 mt-1 tabular-nums">
            {prog.delayed} / {prog.atRisk}
          </p>
          <span className="text-[10px] text-rose-300/80 mt-1 block">Critical intervention required</span>
        </div>
      </div>

      {/* Progress Chart & District Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-6">
          <ProgramProgressChart />
        </div>

        <div className="xl:col-span-6 rounded-2xl bg-card border border-border/80 p-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            District Progress Breakdown ({prog.name})
          </h3>
          <div className="max-h-[220px] overflow-y-auto scrollbar-thin">
            <table className="w-full text-xs text-left">
              <thead className="text-[10px] text-text-muted border-b border-border/50 sticky top-0 bg-[#0F1B3D]">
                <tr>
                  <th className="py-1.5 px-2">District</th>
                  <th className="py-1.5 px-2 text-right">Schools</th>
                  <th className="py-1.5 px-2 text-right">Physical %</th>
                  <th className="py-1.5 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {districtsData.slice(0, 10).map((d) => (
                  <tr key={d.id} className="hover:bg-white/5">
                    <td className="py-1.5 px-2 font-medium text-white">{d.name}</td>
                    <td className="py-1.5 px-2 text-right tabular-nums text-text-muted">
                      {Math.round((d.schools / 8420) * prog.schools)}
                    </td>
                    <td className="py-1.5 px-2 text-right font-bold text-emerald-400 tabular-nums">
                      {d.physical}%
                    </td>
                    <td className="py-1.5 px-2 text-right">
                      <StatusPill status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-card border border-border/80 p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          Active Projects under {prog.name}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider bg-card-2">
              <tr>
                <th className="py-2 px-3">Project ID</th>
                <th className="py-2 px-3">School Name</th>
                <th className="py-2 px-3">District</th>
                <th className="py-2 px-3">Vendor</th>
                <th className="py-2 px-3 text-right">Value (₹ Lakh)</th>
                <th className="py-2 px-3 text-right">Physical %</th>
                <th className="py-2 px-3 text-right">Delay (Days)</th>
                <th className="py-2 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {relatedProjects.slice(0, 8).map((prj) => (
                <tr key={prj.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-primary font-semibold">{prj.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-white">{prj.school}</td>
                  <td className="py-2.5 px-3 text-text-muted">{prj.district}</td>
                  <td className="py-2.5 px-3 text-white">{prj.vendor}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-bold text-white">
                    {prj.valueLakh}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-bold text-emerald-400">
                    {prj.physical}%
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-rose-400 font-semibold">
                    {prj.delayDays}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <StatusPill status={prj.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
