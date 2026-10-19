"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  FolderKanban,
  FileText,
  Clock,
  Calendar,
  X,
  ChevronRight,
  Download,
} from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { getPercentageColor } from "@/lib/status";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterProgramme, setFilterProgramme] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  const filtered = projectsData.filter((prj) => {
    const matchSearch =
      prj.id.toLowerCase().includes(search.toLowerCase()) ||
      prj.school.toLowerCase().includes(search.toLowerCase()) ||
      prj.district.toLowerCase().includes(search.toLowerCase()) ||
      prj.vendor.toLowerCase().includes(search.toLowerCase());

    const matchProg =
      filterProgramme === "all" ||
      prj.programme.toLowerCase().includes(filterProgramme.toLowerCase());

    const matchStatus =
      filterStatus === "all" ||
      prj.status.toLowerCase().replace(" ", "-") === filterStatus.toLowerCase();

    return matchSearch && matchProg && matchStatus;
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-5 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Department Works & Projects
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Tracking {projectsData.length} Active Infrastructure & Digital Lab Works across MP
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, school, district, vendor..."
              className="w-full bg-card border border-border/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            />
          </div>

          {/* Programme Filter */}
          <select
            value={filterProgramme}
            onChange={(e) => setFilterProgramme(e.target.value)}
            className="bg-card border border-border/80 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Programmes</option>
            <option value="PM SHRI">PM SHRI</option>
            <option value="Smart">Smart Classroom</option>
            <option value="TLM">TLM Kits</option>
            <option value="LEP">LEP Foundational</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Robotics">Robotics & STEM</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-card border border-border/80 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="on-track">On Track</option>
            <option value="watch">Watch</option>
            <option value="delayed">Delayed</option>
            <option value="at-risk">At Risk</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-card border border-border/80 card-glow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider bg-card-2">
              <tr>
                <th className="py-2.5 px-3">Project ID</th>
                <th className="py-2.5 px-3">School Name</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Programme</th>
                <th className="py-2.5 px-3">Vendor</th>
                <th className="py-2.5 px-3 text-right">Value (₹ Lakh)</th>
                <th className="py-2.5 px-3 text-right">Physical %</th>
                <th className="py-2.5 px-3 text-right">Financial %</th>
                <th className="py-2.5 px-3 text-right">Delay (Days)</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((prj) => (
                <tr
                  key={prj.id}
                  onClick={() => setSelectedProject(prj)}
                  className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                >
                  <td className="py-2.5 px-3 font-mono font-semibold text-primary group-hover:underline">
                    {prj.id}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-white group-hover:text-primary transition-colors">
                    {prj.school}
                  </td>
                  <td className="py-2.5 px-3 text-text-muted">{prj.district}</td>
                  <td className="py-2.5 px-3 text-white font-medium">{prj.programme}</td>
                  <td className="py-2.5 px-3 text-text-muted">{prj.vendor}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-bold text-white">
                    {prj.valueLakh}
                  </td>
                  <td
                    className={cn(
                      "py-2.5 px-3 text-right tabular-nums font-bold",
                      getPercentageColor(prj.physical)
                    )}
                  >
                    {prj.physical}%
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-text-muted">
                    {prj.financial}%
                  </td>
                  <td
                    className={cn(
                      "py-2.5 px-3 text-right tabular-nums font-semibold",
                      prj.delayDays > 0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {prj.delayDays > 0 ? `${prj.delayDays}d` : "0d"}
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

      {/* Detail Slide-out Sheet */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full sm:w-[500px] h-full bg-[#0A1128] border-l border-primary/40 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl text-left">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="font-mono text-primary font-bold text-sm">
                  {selectedProject.id}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded-lg text-text-muted hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">
                    {selectedProject.school}
                  </h2>
                </div>
                <p className="text-xs text-text-muted mt-0.5">
                  District: {selectedProject.district} • Programme: {selectedProject.programme}
                </p>
              </div>

              {/* Status and KPIs */}
              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-card border border-border/60">
                  <span className="text-text-muted block text-[11px]">Sanction Value</span>
                  <span className="text-lg font-bold text-white tabular-nums">
                    ₹{selectedProject.valueLakh} Lakh
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border/60">
                  <span className="text-text-muted block text-[11px]">Current Status</span>
                  <div className="mt-1">
                    <StatusPill status={selectedProject.status} />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border/60">
                  <span className="text-text-muted block text-[11px]">Physical Completion</span>
                  <span className="text-lg font-bold text-emerald-400 tabular-nums">
                    {selectedProject.physical}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-border/60">
                  <span className="text-text-muted block text-[11px]">Lag Duration</span>
                  <span className="text-lg font-bold text-rose-400 tabular-nums">
                    {selectedProject.delayDays} Days
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Project Timeline
                </h3>
                <div className="space-y-3 border-l-2 border-primary/40 pl-4 text-xs">
                  <div>
                    <span className="text-[10px] text-text-muted font-mono">
                      {selectedProject.startDate}
                    </span>
                    <p className="font-semibold text-white">Sanction & Work Order Issued</p>
                    <p className="text-[11px] text-text-muted">Assigned to {selectedProject.vendor}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-muted font-mono">
                      Target Completion: {selectedProject.targetDate}
                    </span>
                    <p className="font-semibold text-white">Milestone Verification</p>
                    <p className="text-[11px] text-text-muted">
                      {selectedProject.physical}% physical work certified by BEO.
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents attached */}
              <div className="mt-6">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Verified Documents
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-card border border-border flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      WorkOrder_{selectedProject.id}.pdf
                    </span>
                    <button className="text-text-muted hover:text-white">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card border border-border flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      GeoTagged_Photos_Batch_1.zip
                    </span>
                    <button className="text-text-muted hover:text-white">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end gap-2">
              <Link
                href={`/projects/${selectedProject.id}`}
                className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold text-center hover:bg-primary-hover shadow-sm"
              >
                Open Full Project Page →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
