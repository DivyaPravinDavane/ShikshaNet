"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderKanban, FileText, CheckCircle2, Clock, Calendar, Download } from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { ProgressBar } from "@/components/common/ProgressBar";
import projectsData from "@/data/projects.json";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) || "PRJ-MP-001";

  const prj = projectsData.find((p) => p.id === id) || projectsData[0];

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 space-y-6 select-none">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white tracking-tight">{prj.school}</h1>
            <StatusPill status={prj.status} />
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Project ID: <span className="font-mono text-primary">{prj.id}</span> • District: {prj.district} • Programme: {prj.programme}
          </p>
        </div>

        <span className="text-base font-extrabold text-white bg-card border border-border px-4 py-2 rounded-xl">
          ₹{prj.valueLakh} Lakh Sanctioned
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Physical Completion</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{prj.physical}%</p>
          <ProgressBar value={prj.physical} color="success" height="h-2" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Financial Utilisation</span>
          <p className="text-2xl font-bold text-white mt-1">{prj.financial}%</p>
          <ProgressBar value={prj.financial} color="orange" height="h-2" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-rose-500/30 bg-rose-500/10">
          <span className="text-xs text-rose-300">Delay Period</span>
          <p className="text-2xl font-bold text-rose-400 mt-1">{prj.delayDays} Days</p>
          <span className="text-[11px] text-rose-300 block mt-1">Vendor: {prj.vendor}</span>
        </div>
      </div>

      {/* Timeline & Milestone */}
      <div className="rounded-2xl bg-card border border-border/80 p-5 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Milestone Progression
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-border">
            <span className="text-text-muted block text-[10px]">Step 1</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Site Clearance
            </span>
            <p className="text-[11px] text-text-muted mt-1">Completed on 15 May 2026</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-border">
            <span className="text-text-muted block text-[10px]">Step 2</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Hardware Procurement
            </span>
            <p className="text-[11px] text-text-muted mt-1">Components dispatched</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-border">
            <span className="text-text-muted block text-[10px]">Step 3</span>
            <span className="font-semibold text-amber-400 flex items-center gap-1 mt-1">
              <Clock className="w-3.5 h-3.5" /> Lab Installation
            </span>
            <p className="text-[11px] text-text-muted mt-1">Currently in execution</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-border">
            <span className="text-text-muted block text-[10px]">Step 4</span>
            <span className="font-semibold text-text-muted flex items-center gap-1 mt-1">
              <Clock className="w-3.5 h-3.5" /> Final Commissioning
            </span>
            <p className="text-[11px] text-text-muted mt-1">Target: {prj.targetDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
