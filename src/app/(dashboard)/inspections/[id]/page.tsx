"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ClipboardCheck, Camera, MapPin, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { ProgressBar } from "@/components/common/ProgressBar";
import inspectionsData from "@/data/inspections.json";

export default function InspectionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) || "INS-2026-001";

  const ins = inspectionsData.find((i) => i.id === id) || inspectionsData[0];

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 space-y-6 select-none">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Inspections
      </button>

      <div className="p-6 rounded-2xl bg-card border border-border/80 card-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center border border-primary/40 shrink-0">
            <ClipboardCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {ins.schoolName}
              </h1>
              <StatusPill status={ins.status} />
            </div>
            <p className="text-xs text-text-muted mt-1">
              Audit ID: <span className="font-mono text-primary font-semibold">{ins.id}</span> • District: {ins.district} • Programme: {ins.programme}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-text-muted block">Inspecting Authority</span>
          <span className="text-sm font-bold text-white">{ins.officer}</span>
          <span className="text-xs text-text-muted font-mono block mt-0.5">{ins.date}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Evidence Completeness Score</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{ins.evidenceCompleteness}%</p>
          <ProgressBar value={ins.evidenceCompleteness} color="success" height="h-2" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Photographic Evidence</span>
          <p className="text-2xl font-bold text-white mt-1">{ins.photoCount} Uploaded</p>
          <span className="text-[11px] text-text-muted">High-res photos verified</span>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">GPS Telemetry Check</span>
          <p className={ins.gpsVerified ? "text-2xl font-bold text-emerald-400 mt-1" : "text-2xl font-bold text-rose-400 mt-1"}>
            {ins.gpsVerified ? "Geo-Verified ✓" : "Location Flagged ✕"}
          </p>
          <span className="text-[11px] text-text-muted">Within 50m of school coordinates</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Field Officer Auditor Remarks
        </h3>
        <p className="text-xs text-text-muted leading-relaxed p-4 rounded-xl bg-white/5 border border-border">
          {ins.remarks}
        </p>
      </div>
    </div>
  );
}
