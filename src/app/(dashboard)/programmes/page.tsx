"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Boxes,
  Monitor,
  Building2,
  Cpu,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Search,
} from "lucide-react";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusPill } from "@/components/common/StatusPill";
import programmesData from "@/data/programmes.json";
import { cn } from "@/lib/utils";

export default function ProgrammesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-primary" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      case "Boxes":
        return <Boxes className="w-5 h-5 text-teal-400" />;
      case "Monitor":
        return <Monitor className="w-5 h-5 text-purple-400" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-orange-400" />;
      default:
        return <Cpu className="w-5 h-5 text-amber-400" />;
    }
  };

  const filtered = programmesData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            State Education Programmes
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Centrally Sponsored & State Flagship Schemes • FY 2026-27
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programmes..."
            className="w-full bg-card border border-border/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      {/* Grid of 6 Programme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => router.push(`/programmes/${p.id}`)}
            className="rounded-2xl bg-card border border-border/80 card-glow p-5 flex flex-col justify-between hover:border-primary/50 transition-all duration-200 cursor-pointer group"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-border/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {getIcon(p.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 line-clamp-1">
                      {p.fullName}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 tabular-nums">
                  {p.progress}%
                </span>
              </div>

              <p className="text-xs text-text-muted mt-3 line-clamp-2 leading-relaxed">
                {p.description}
              </p>

              {/* Progress Rows */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-text-muted">
                  <span>Programme Budget</span>
                  <span className="font-bold text-white tabular-nums">
                    ₹{p.budgetCr} Cr
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-text-muted">
                    <span>Awarded</span>
                    <span className="font-bold text-white">{p.awarded}%</span>
                  </div>
                  <ProgressBar value={p.awarded} color="primary" height="h-1.5" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-text-muted">
                    <span>Physical Progress</span>
                    <span className="font-bold text-emerald-400">{p.physical}%</span>
                  </div>
                  <ProgressBar value={p.physical} color="success" height="h-1.5" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-text-muted">
                    <span>Financial Utilisation</span>
                    <span className="font-bold text-white">{p.financial}%</span>
                  </div>
                  <ProgressBar value={p.financial} color="orange" height="h-1.5" />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3.5 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-rose-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>
                  {p.delayed} delayed • {p.atRisk} at risk
                </span>
              </div>
              <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px]">
                Details <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Table */}
      <div className="rounded-2xl bg-card border border-border/80 card-glow p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          Programme Financial & Execution Summary
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider bg-card-2">
              <tr>
                <th className="py-2.5 px-3">Programme</th>
                <th className="py-2.5 px-3 text-right">Schools</th>
                <th className="py-2.5 px-3 text-right">Budget (₹ Cr)</th>
                <th className="py-2.5 px-3 text-right">Awarded</th>
                <th className="py-2.5 px-3 text-right">Physical</th>
                <th className="py-2.5 px-3 text-right">Financial</th>
                <th className="py-2.5 px-3 text-right">Delayed</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {programmesData.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">
                    {p.name}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-text-muted">
                    {p.schools.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-bold text-white">
                    ₹{p.budgetCr}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-primary font-semibold">
                    {p.awarded}%
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-emerald-400 font-bold">
                    {p.physical}%
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-white">
                    {p.financial}%
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-rose-400 font-semibold">
                    {p.delayed}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/programmes/${p.id}`}
                      className="px-2.5 py-1 rounded-md bg-primary/20 hover:bg-primary text-primary hover:text-white font-semibold transition-all inline-block text-[11px]"
                    >
                      View
                    </Link>
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
