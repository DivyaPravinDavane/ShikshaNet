"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClipboardCheck, CheckCircle2, Clock, AlertTriangle, Camera, MapPin, Search } from "lucide-react";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusPill } from "@/components/common/StatusPill";
import inspectionsData from "@/data/inspections.json";
import { cn } from "@/lib/utils";

export default function InspectionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"incomplete" | "completed" | "scheduled">("incomplete");
  const [search, setSearch] = useState("");

  const incompleteCount = inspectionsData.filter((i) => i.tab === "incomplete").length;
  const completedCount = inspectionsData.filter((i) => i.tab === "completed").length;
  const scheduledCount = inspectionsData.filter((i) => i.tab === "scheduled").length;

  const filtered = inspectionsData.filter((item) => {
    const matchTab = item.tab === activeTab;
    const matchSearch =
      item.schoolName.toLowerCase().includes(search.toLowerCase()) ||
      item.district.toLowerCase().includes(search.toLowerCase()) ||
      item.officer.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Field Quality Inspections
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Physical Milestone Verification, Geotagged Audits & Handover Certifications
          </p>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search school, officer, district..."
            className="w-full bg-card border border-border/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-1">
        <button
          onClick={() => setActiveTab("incomplete")}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2",
            activeTab === "incomplete"
              ? "border-rose-500 text-rose-400 bg-rose-500/10"
              : "border-transparent text-text-muted hover:text-white"
          )}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Incomplete Evidence ({incompleteCount})</span>
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2",
            activeTab === "completed"
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
              : "border-transparent text-text-muted hover:text-white"
          )}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed ({completedCount})</span>
        </button>

        <button
          onClick={() => setActiveTab("scheduled")}
          className={cn(
            "px-4 py-2 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-2",
            activeTab === "scheduled"
              ? "border-primary text-primary bg-primary/10"
              : "border-transparent text-text-muted hover:text-white"
          )}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Scheduled ({scheduledCount})</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-card border border-border/80 card-glow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider bg-card-2">
              <tr>
                <th className="py-2.5 px-3">Inspection ID</th>
                <th className="py-2.5 px-3">School Name</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Programme</th>
                <th className="py-2.5 px-3">Inspecting Officer</th>
                <th className="py-2.5 px-3">Audit Date</th>
                <th className="py-2.5 px-3" style={{ minWidth: "160px" }}>Evidence Completeness</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => router.push(`/inspections/${item.id}`)}
                  className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 font-mono font-semibold text-primary">{item.id}</td>
                  <td className="py-3 px-3 font-semibold text-white group-hover:text-primary transition-colors">
                    {item.schoolName}
                  </td>
                  <td className="py-3 px-3 text-text-muted">{item.district}</td>
                  <td className="py-3 px-3 text-white font-medium">{item.programme}</td>
                  <td className="py-3 px-3 text-text-muted">{item.officer}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-text-muted">{item.date}</td>
                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className={item.evidenceCompleteness < 70 ? "text-rose-400" : "text-emerald-400"}>
                          {item.evidenceCompleteness}%
                        </span>
                        <span className="text-[10px] text-text-muted font-normal">
                          {item.photoCount} photos • {item.gpsVerified ? "GPS ✓" : "GPS ✕"}
                        </span>
                      </div>
                      <ProgressBar
                        value={item.evidenceCompleteness}
                        color={item.evidenceCompleteness < 70 ? "danger" : "success"}
                        height="h-1.5"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <StatusPill status={item.status} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="px-2.5 py-1 rounded bg-white/5 hover:bg-primary hover:text-white text-primary text-[11px] font-semibold transition-colors">
                      Review
                    </button>
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
