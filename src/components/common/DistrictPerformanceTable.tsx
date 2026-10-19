"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { StatusPill } from "./StatusPill";
import { getPercentageColor } from "@/lib/status";
import { cn } from "@/lib/utils";

interface DistrictRow {
  rank: number;
  id: string;
  name: string;
  schools: number;
  physical: number;
  financial: number;
  status: "On Track" | "Watch" | "At Risk";
}

const DEFAULT_DISTRICT_ROWS: DistrictRow[] = [
  { rank: 1, id: "indore", name: "Indore", schools: 320, physical: 91, financial: 86, status: "On Track" },
  { rank: 2, id: "bhopal", name: "Bhopal", schools: 280, physical: 88, financial: 82, status: "On Track" },
  { rank: 3, id: "ujjain", name: "Ujjain", schools: 260, physical: 72, financial: 68, status: "Watch" },
  { rank: 4, id: "gwalior", name: "Gwalior", schools: 240, physical: 78, financial: 71, status: "On Track" },
  { rank: 5, id: "jabalpur", name: "Jabalpur", schools: 240, physical: 64, financial: 58, status: "Watch" },
  { rank: 6, id: "rewa", name: "Rewa", schools: 190, physical: 48, financial: 42, status: "At Risk" },
  { rank: 7, id: "sagar", name: "Sagar", schools: 180, physical: 69, financial: 61, status: "Watch" },
  { rank: 8, id: "satna", name: "Satna", schools: 160, physical: 62, financial: 57, status: "Watch" },
];

export function DistrictPerformanceTable() {
  const router = useRouter();
  const [rows, setRows] = useState(DEFAULT_DISTRICT_ROWS);
  const [sortField, setSortField] = useState<keyof DistrictRow>("rank");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: keyof DistrictRow) => {
    const isAsc = sortField === field ? !sortAsc : true;
    setSortField(field);
    setSortAsc(isAsc);

    const sorted = [...rows].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? -1 : 1;
      if (a[field] > b[field]) return isAsc ? 1 : -1;
      return 0;
    });
    setRows(sorted);
  };

  return (
    <div className="h-[270px] rounded-[12px] bg-card border border-border/80 card-glow p-3.5 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary/20 text-primary flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-[13px] font-bold text-white tracking-tight">
            District Performance
          </h3>
        </div>

        <Link
          href="/schools"
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
              <th
                onClick={() => handleSort("rank")}
                className="py-1 px-1.5 font-semibold cursor-pointer hover:text-white"
              >
                #
              </th>
              <th
                onClick={() => handleSort("name")}
                className="py-1 px-2 font-semibold cursor-pointer hover:text-white"
              >
                District
              </th>
              <th
                onClick={() => handleSort("schools")}
                className="py-1 px-1.5 font-semibold text-right cursor-pointer hover:text-white"
              >
                Schools
              </th>
              <th
                onClick={() => handleSort("physical")}
                className="py-1 px-1.5 font-semibold text-right cursor-pointer hover:text-white"
              >
                Physical
              </th>
              <th
                onClick={() => handleSort("financial")}
                className="py-1 px-1.5 font-semibold text-right cursor-pointer hover:text-white"
              >
                Financial
              </th>
              <th className="py-1 px-2 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30 text-[11px]">
            {rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => router.push(`/commissioner/${row.id}`)}
                className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <td className="py-1.5 px-1.5 text-text-muted font-mono">{row.rank}</td>
                <td className="py-1.5 px-2 font-semibold text-white group-hover:text-primary transition-colors">
                  {row.name}
                </td>
                <td className="py-1.5 px-1.5 tabular-nums text-right text-text-muted">
                  {row.schools}
                </td>
                <td className={cn("py-1.5 px-1.5 tabular-nums text-right font-bold", getPercentageColor(row.physical))}>
                  {row.physical}%
                </td>
                <td className="py-1.5 px-1.5 tabular-nums text-right text-text-muted font-medium">
                  {row.financial}%
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
