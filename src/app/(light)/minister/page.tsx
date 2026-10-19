"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wallet,
  School,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Calendar,
  CheckCircle2,
  User,
} from "lucide-react";
import { CountUp } from "@/components/common/CountUp";
import { MPMap } from "@/components/map/MPMap";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusPill } from "@/components/common/StatusPill";
import districtsData from "@/data/districts.json";
import programmesData from "@/data/programmes.json";
import decisionsData from "@/data/decisions.json";
import { cn } from "@/lib/utils";

export default function MinisterPage() {
  const [activeTab, setActiveTab] = useState<"highlights" | "district" | "programme" | "decisions">("highlights");
  const [decisions, setDecisions] = useState(decisionsData);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const topDistricts = [
    { rank: 1, name: "Rewa", delayed: 43, physical: 48 },
    { rank: 2, name: "Jabalpur", delayed: 32, physical: 54 },
    { rank: 3, name: "Satna", delayed: 28, physical: 56 },
    { rank: 4, name: "Chhindwara", delayed: 24, physical: 58 },
    { rank: 5, name: "Singrauli", delayed: 22, physical: 61 },
  ];

  const actionItems = [
    { id: 1, text: "Review 43 delayed schools in Rewa", tag: "District Priority" },
    { id: 2, text: "Discuss vendor XYZ performance", tag: "Vendor Review" },
    { id: 3, text: "Approve extension for 17 projects", tag: "Statutory Sanction" },
    { id: 4, text: "Review payment pending > 30 days", tag: "Treasury Clearing" },
  ];

  const handleApprove = (id: number) => {
    setDecisions((prev) => prev.filter((d) => d.id !== id));
    setToastMsg("Sanction recorded under Ministerial Authority.");
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-5 select-none">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Greeting Card */}
      <div className="bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Minister photo placeholder */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 p-0.5 shrink-0 shadow-md">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-amber-700 text-lg">
              UD
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#0F1B3D] tracking-tight">
              Namaste Mantriji,
            </h1>
            <p className="text-xs text-[#6B7A99] font-medium mt-0.5">
              Here is the status of Education Programmes across Madhya Pradesh
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-[#E5EAF3] text-xs font-semibold text-[#0F1B3D] self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>12 Apr 2027</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#6B7A99]" />
        </div>
      </div>

      {/* 4 Stat Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E5EAF3] shadow-sm">
          <span className="text-xs text-[#6B7A99] font-medium">Total Programme</span>
          <p className="text-2xl font-bold text-[#0F1B3D] mt-1 tabular-nums">
            ₹<CountUp end={2480} /> Cr
          </p>
          <span className="text-[11px] text-[#6B7A99] mt-0.5 block">State + Central Budget</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5EAF3] shadow-sm">
          <span className="text-xs text-[#6B7A99] font-medium">Schools Covered</span>
          <p className="text-2xl font-bold text-[#0F1B3D] mt-1 tabular-nums">
            <CountUp end={8420} />
          </p>
          <span className="text-[11px] text-[#6B7A99] mt-0.5 block">Across 52 Districts</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5EAF3] shadow-sm">
          <span className="text-xs text-[#6B7A99] font-medium">Overall Progress</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">
            76%
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">On Track Target</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-rose-200 bg-rose-50/50 shadow-sm">
          <span className="text-xs text-rose-600 font-medium">Need Attention</span>
          <p className="text-2xl font-bold text-rose-600 mt-1 tabular-nums">
            <CountUp end={1140} />
          </p>
          <span className="text-[11px] text-rose-600 font-semibold mt-0.5 block">Schools Lagging</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5EAF3] pb-1">
        <button
          onClick={() => setActiveTab("highlights")}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2",
            activeTab === "highlights"
              ? "border-primary text-primary bg-blue-50/80"
              : "border-transparent text-[#6B7A99] hover:text-[#0F1B3D]"
          )}
        >
          Key Highlights
        </button>
        <button
          onClick={() => setActiveTab("district")}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2",
            activeTab === "district"
              ? "border-primary text-primary bg-blue-50/80"
              : "border-transparent text-[#6B7A99] hover:text-[#0F1B3D]"
          )}
        >
          District View
        </button>
        <button
          onClick={() => setActiveTab("programme")}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2",
            activeTab === "programme"
              ? "border-primary text-primary bg-blue-50/80"
              : "border-transparent text-[#6B7A99] hover:text-[#0F1B3D]"
          )}
        >
          Programme View
        </button>
        <button
          onClick={() => setActiveTab("decisions")}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2",
            activeTab === "decisions"
              ? "border-primary text-primary bg-blue-50/80"
              : "border-transparent text-[#6B7A99] hover:text-[#0F1B3D]"
          )}
        >
          Decisions ({decisions.length})
        </button>
      </div>

      {/* Tab 1: Key Highlights */}
      {activeTab === "highlights" && (
        <div className="space-y-5">
          {/* Middle Row: Left MP Heatmap & Right Top 5 Districts Needing Attention */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* Left: Map */}
            <div className="xl:col-span-7">
              <MPMap />
            </div>

            {/* Right: Top 5 Districts Needing Attention */}
            <div className="xl:col-span-5 bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F1B3D] tracking-tight pb-3 border-b border-[#E5EAF3]">
                  Top 5 Districts Needing Attention
                </h3>

                <div className="mt-4 space-y-3">
                  {topDistricts.map((d) => (
                    <div
                      key={d.name}
                      className="p-3 rounded-xl bg-slate-50 border border-[#E5EAF3] flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center shrink-0">
                          {d.rank}
                        </span>
                        <div>
                          <span className="font-bold text-sm text-[#0F1B3D]">
                            {d.name}
                          </span>
                          <span className="text-xs text-[#6B7A99] block">
                            {d.delayed} Schools Delayed
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-600 tabular-nums">
                        {d.physical}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5EAF3] text-right">
                <Link
                  href="/commissioner/jabalpur"
                  className="text-xs font-bold text-primary hover:underline flex items-center justify-end gap-1"
                >
                  Open District Portals →
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Row: Progress by Programme (left) & Action Items for Today (right) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* Bottom-left: Progress by Programme */}
            <div className="xl:col-span-6 bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#0F1B3D] tracking-tight pb-2 border-b border-[#E5EAF3]">
                Progress by Programme
              </h3>

              <div className="space-y-3.5 text-xs">
                {[
                  { name: "PM SHRI", progress: 72 },
                  { name: "LEP (Foundational)", progress: 78 },
                  { name: "TLM Kits", progress: 76 },
                  { name: "Smart Classroom", progress: 68 },
                  { name: "Infrastructure", progress: 71 },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between font-semibold text-[#0F1B3D]">
                      <span>{item.name}</span>
                      <span className="text-emerald-600 font-bold">{item.progress}%</span>
                    </div>
                    <ProgressBar value={item.progress} color="success" height="h-2.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-right: Action Items for Today */}
            <div className="xl:col-span-6 bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F1B3D] tracking-tight pb-2 border-b border-[#E5EAF3]">
                  Action Items for Today
                </h3>

                <div className="mt-3 space-y-2.5">
                  {actionItems.map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded-xl bg-slate-50 border border-[#E5EAF3] flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center shrink-0">
                          {act.id}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-[#0F1B3D] group-hover:text-primary transition-colors">
                            {act.text}
                          </p>
                          <span className="text-[10px] text-[#6B7A99]">{act.tag}</span>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-[#6B7A99] group-hover:translate-x-1 transition-transform shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5EAF3] text-[11px] text-[#6B7A99] text-center">
                Prepared by Directorate of Public Instruction • MP Shiksha Kendra
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: District View */}
      {activeTab === "district" && (
        <div className="bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#0F1B3D] mb-3">All 52 Districts Ranking</h3>
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] text-[#6B7A99] border-b border-[#E5EAF3] bg-slate-50 sticky top-0">
                <tr>
                  <th className="p-2.5">Rank</th>
                  <th className="p-2.5">District</th>
                  <th className="p-2.5 text-right">Schools</th>
                  <th className="p-2.5 text-right">Physical %</th>
                  <th className="p-2.5 text-right">Financial %</th>
                  <th className="p-2.5 text-right">Delayed</th>
                  <th className="p-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF3]">
                {districtsData.map((d, i) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono">{i + 1}</td>
                    <td className="p-2.5 font-bold text-[#0F1B3D]">{d.name}</td>
                    <td className="p-2.5 text-right tabular-nums">{d.schools}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">{d.physical}%</td>
                    <td className="p-2.5 text-right tabular-nums">{d.financial}%</td>
                    <td className="p-2.5 text-right text-rose-600 font-bold">{d.delayed}</td>
                    <td className="p-2.5 text-right">
                      <StatusPill status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Programme View */}
      {activeTab === "programme" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {programmesData.map((p) => (
            <div key={p.id} className="p-4 rounded-xl bg-white border border-[#E5EAF3] shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0F1B3D]">{p.name}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
                  {p.progress}%
                </span>
              </div>
              <p className="text-xs text-[#6B7A99]">Budget: ₹{p.budgetCr} Cr • {p.schools} schools</p>
              <ProgressBar value={p.progress} color="success" height="h-2" />
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Decisions */}
      {activeTab === "decisions" && (
        <div className="bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-[#0F1B3D]">Pending Ministerial Approvals</h3>
          <div className="divide-y divide-[#E5EAF3]">
            {decisions.map((dec) => (
              <div key={dec.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-[#0F1B3D]">{dec.title}</h4>
                  <p className="text-[11px] text-[#6B7A99] mt-0.5">{dec.description}</p>
                </div>
                <button
                  onClick={() => handleApprove(dec.id)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shrink-0"
                >
                  Approve Sanction
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
