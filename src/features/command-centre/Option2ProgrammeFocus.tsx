"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Wallet,
  School,
  BarChart3,
  Coins,
  AlertTriangle,
  Clock,
  GraduationCap,
  BookOpen,
  Boxes,
  Monitor,
  Building2,
  Cpu,
  ChevronRight,
} from "lucide-react";
import { CountUp } from "@/components/common/CountUp";
import { ProgressBar } from "@/components/common/ProgressBar";
import programmesData from "@/data/programmes.json";
import { cn } from "@/lib/utils";

export function Option2ProgrammeFocus() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Programmes");

  const tabs = [
    "All Programmes",
    "PM SHRI",
    "LEP",
    "TLM",
    "Smart Classroom",
    "Infrastructure",
    "Others",
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-primary" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-emerald-500" />;
      case "Boxes":
        return <Boxes className="w-5 h-5 text-teal-500" />;
      case "Monitor":
        return <Monitor className="w-5 h-5 text-purple-500" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-orange-500" />;
      default:
        return <Cpu className="w-5 h-5 text-amber-500" />;
    }
  };

  const filteredProgrammes = programmesData.filter((p) => {
    if (activeTab === "All Programmes") return true;
    if (activeTab === "PM SHRI") return p.name.includes("PM SHRI");
    if (activeTab === "LEP") return p.name.includes("LEP");
    if (activeTab === "TLM") return p.name.includes("TLM");
    if (activeTab === "Smart Classroom") return p.name.includes("Smart");
    if (activeTab === "Infrastructure") return p.name.includes("Infrastructure");
    return p.name.includes("Robotics");
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-5 bg-[#F4F7FC] text-[#0F1B3D] min-h-screen select-none">
      {/* Title & Subtitle banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5EAF3] pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1B3D]">
            Education Programmes Overview
          </h1>
          <p className="text-xs text-[#6B7A99] mt-0.5 font-medium">
            Madhya Pradesh • FY 2026-27
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-full bg-white border border-[#E5EAF3] text-xs font-semibold text-[#0F1B3D] shadow-sm flex items-center gap-2 self-start">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>Apr 2026 – Mar 2027</span>
        </div>
      </div>

      {/* KPI row (white cards, coloured icon tiles) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <div className="p-3.5 rounded-xl bg-white border border-[#E5EAF3] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#6B7A99] block font-medium">Total Budget</span>
            <span className="text-lg font-bold text-[#0F1B3D] tabular-nums">
              ₹<CountUp end={2480} /> Cr
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E5EAF3] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <School className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#6B7A99] block font-medium">Schools</span>
            <span className="text-lg font-bold text-[#0F1B3D] tabular-nums">
              <CountUp end={8420} />
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E5EAF3] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#6B7A99] block font-medium">Physical Progress</span>
            <span className="text-lg font-bold text-[#0F1B3D] tabular-nums">74%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#E5EAF3] shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-[#6B7A99] block font-medium">Financial Progress</span>
            <span className="text-lg font-bold text-[#0F1B3D] tabular-nums">68%</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-rose-100 bg-rose-50/50 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-rose-600 block font-medium">Delayed</span>
            <span className="text-lg font-bold text-rose-600 tabular-nums">
              <CountUp end={287} />
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-amber-100 bg-amber-50/50 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-amber-600 block font-medium">Need Attention</span>
            <span className="text-lg font-bold text-amber-600 tabular-nums">
              <CountUp end={1140} />
            </span>
          </div>
        </div>
      </div>

      {/* Tab pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
              activeTab === tab
                ? "bg-primary text-white shadow-sm"
                : "bg-white border border-[#E5EAF3] text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3-column x 2-row grid of programme cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredProgrammes.map((p) => {
          const badgeBg =
            p.progress >= 75
              ? "bg-emerald-50 text-emerald-600 border-emerald-200"
              : p.progress >= 60
              ? "bg-amber-50 text-amber-600 border-amber-200"
              : "bg-rose-50 text-rose-600 border-rose-200";

          return (
            <div
              key={p.id}
              onClick={() => router.push(`/programmes/${p.id}`)}
              className="bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              {/* Card Top */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getIcon(p.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#0F1B3D] group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#6B7A99] font-medium mt-0.5">
                        {p.schools.toLocaleString()} schools
                      </p>
                    </div>
                  </div>

                  <span className={cn("px-2.5 py-1 rounded-full text-xs font-extrabold border tabular-nums", badgeBg)}>
                    {p.progress}%
                  </span>
                </div>

                {/* Progress bars & Budget rows */}
                <div className="mt-5 space-y-3 text-xs">
                  <div className="flex justify-between items-center text-[#6B7A99]">
                    <span className="font-medium">Budget</span>
                    <span className="font-bold text-[#0F1B3D] text-sm tabular-nums">
                      ₹{p.budgetCr} Cr
                    </span>
                  </div>

                  {/* Awarded */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-[#6B7A99]">
                      <span>Awarded</span>
                      <span className="font-bold text-[#0F1B3D]">{p.awarded}%</span>
                    </div>
                    <ProgressBar value={p.awarded} color="primary" height="h-2" />
                  </div>

                  {/* Physical */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-[#6B7A99]">
                      <span>Physical</span>
                      <span className="font-bold text-emerald-600">{p.physical}%</span>
                    </div>
                    <ProgressBar value={p.physical} color="success" height="h-2" />
                  </div>

                  {/* Financial */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-[#6B7A99]">
                      <span>Financial</span>
                      <span className="font-bold text-[#0F1B3D]">{p.financial}%</span>
                    </div>
                    <ProgressBar value={p.financial} color="orange" height="h-2" />
                  </div>
                </div>
              </div>

              {/* Card Footer in red */}
              <div className="mt-5 pt-3.5 border-t border-[#E5EAF3] flex items-center justify-between text-xs font-semibold text-rose-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>
                    {p.delayed} delayed • {p.atRisk} at risk
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
