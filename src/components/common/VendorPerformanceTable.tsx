"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UsersRound } from "lucide-react";
import { StatusPill } from "./StatusPill";
import vendorsData from "@/data/vendors.json";
import { cn } from "@/lib/utils";

export function VendorPerformanceTable() {
  const router = useRouter();
  const rows = vendorsData.slice(0, 8);

  return (
    <div className="h-[270px] rounded-[12px] bg-card border border-border/80 card-glow p-3.5 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary/20 text-primary flex items-center justify-center">
            <UsersRound className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-[13px] font-bold text-white tracking-tight">
            Vendor Performance
          </h3>
        </div>

        <Link
          href="/vendors"
          className="text-[11px] font-semibold text-primary hover:text-primary-hover hover:underline transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto mt-1 scrollbar-thin">
        <table className="w-full text-left text-xs">
          <thead className="text-[10px] text-text-muted border-b border-border/50 sticky top-0 bg-[#0F1B3D] z-10">
            <tr>
              <th className="py-1 px-1.5 font-semibold">#</th>
              <th className="py-1 px-2 font-semibold">Vendor</th>
              <th className="py-1 px-1.5 font-semibold text-right">Projects</th>
              <th className="py-1 px-1.5 font-semibold text-right">Value (₹ Cr)</th>
              <th className="py-1 px-1.5 font-semibold text-right">On Time</th>
              <th className="py-1 px-1.5 font-semibold text-right">Delay</th>
              <th className="py-1 px-2 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30 text-[11px]">
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => router.push(`/vendors/${row.id}`)}
                className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <td className="py-1.5 px-1.5 text-text-muted font-mono">{row.rank}</td>
                <td className="py-1.5 px-2 font-semibold text-white group-hover:text-primary transition-colors max-w-[120px] truncate">
                  {row.name}
                </td>
                <td className="py-1.5 px-1.5 tabular-nums text-right text-text-muted">
                  {row.projects}
                </td>
                <td className="py-1.5 px-1.5 tabular-nums text-right text-white font-medium">
                  {row.valueCr}
                </td>
                <td className="py-1.5 px-1.5 tabular-nums text-right text-emerald-400 font-semibold">
                  {row.onTime}%
                </td>
                <td
                  className={cn(
                    "py-1.5 px-1.5 tabular-nums text-right font-semibold",
                    row.delay >= 30 ? "text-rose-400" : "text-text-muted"
                  )}
                >
                  {row.delay}%
                </td>
                <td className="py-1.5 px-2 text-right">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
