"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Building2, MapPin, Phone, GraduationCap, ChevronRight } from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { ProgressBar } from "@/components/common/ProgressBar";
import schoolsData from "@/data/schools.json";

export default function SchoolsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");

  const filtered = schoolsData.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.udise.includes(search) ||
      s.district.toLowerCase().includes(search.toLowerCase()) ||
      s.principal.toLowerCase().includes(search.toLowerCase());

    const matchDist =
      districtFilter === "all" || s.district.toLowerCase() === districtFilter.toLowerCase();

    return matchSearch && matchDist;
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Institutions & Schools Directory
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Statewide Infrastructure & Academic Lab Tracking across Madhya Pradesh
          </p>
        </div>

        {/* Search & District Filter */}
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search school name, UDISE, principal..."
              className="w-full bg-card border border-border/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            />
          </div>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-card border border-border/80 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Districts</option>
            <option value="Jabalpur">Jabalpur</option>
            <option value="Rewa">Rewa</option>
            <option value="Indore">Indore</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Ujjain">Ujjain</option>
            <option value="Gwalior">Gwalior</option>
            <option value="Sagar">Sagar</option>
            <option value="Satna">Satna</option>
            <option value="Chhindwara">Chhindwara</option>
            <option value="Singrauli">Singrauli</option>
          </select>
        </div>
      </div>

      {/* Grid of School Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((school) => (
          <div
            key={school.udise}
            onClick={() => router.push(`/schools/${school.udise}`)}
            className="rounded-2xl bg-card border border-border/80 card-glow p-5 flex flex-col justify-between hover:border-primary/50 transition-all duration-200 cursor-pointer group text-left"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                      {school.name}
                    </h3>
                    <p className="text-[11px] font-mono text-primary mt-0.5">
                      UDISE: {school.udise}
                    </p>
                  </div>
                </div>

                <StatusPill status={school.status} />
              </div>

              <div className="mt-3.5 space-y-1.5 text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span className="truncate">{school.district} • {school.block}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-text-muted shrink-0" />
                  <span className="truncate">{school.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Active Scheme:</span>
                  <span className="text-white truncate">{school.activeProgramme}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-muted">Physical Progress</span>
                  <span className="font-bold text-emerald-400 tabular-nums">
                    {school.physicalProgress}%
                  </span>
                </div>
                <ProgressBar value={school.physicalProgress} color="success" height="h-1.5" />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
              <span className="text-text-muted text-[11px]">
                Principal: {school.principal}
              </span>
              <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-[11px]">
                View Details <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
