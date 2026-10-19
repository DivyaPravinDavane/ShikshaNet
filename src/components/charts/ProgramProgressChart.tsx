"use client";

import React, { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ChevronDown } from "lucide-react";
import monthlyTrendData from "@/data/monthlyTrend.json";
import programmesData from "@/data/programmes.json";

export function ProgramProgressChart() {
  const [selectedProg, setSelectedProg] = useState("All Programmes");

  // Adjust values slightly if filtered
  const chartData = monthlyTrendData.map((d) => {
    if (selectedProg === "All Programmes") return d;
    return {
      month: d.month,
      physical: Math.max(d.physical - 4, 10),
      financial: Math.max(d.financial - 6, 8),
      schoolsCompleted: Math.round(d.schoolsCompleted * 0.25),
    };
  });

  return (
    <div className="h-[270px] rounded-[12px] bg-card border border-border/80 card-glow p-3.5 flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary/20 text-primary flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-[13px] font-bold text-white tracking-tight">
            Programme Progress
          </h3>
        </div>

        {/* Dropdown "All Programmes" */}
        <div className="relative">
          <select
            value={selectedProg}
            onChange={(e) => setSelectedProg(e.target.value)}
            className="appearance-none bg-[#0A1128] border border-border/80 text-[11px] font-medium text-white rounded-md pl-2 pr-6 py-1 focus:ring-1 focus:ring-primary cursor-pointer hover:border-primary/50"
          >
            <option value="All Programmes">All Programmes</option>
            {programmesData.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-text-muted absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Chart */}
      <div className="w-full flex-1 min-h-[175px] mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#9AA7C7", fontSize: 10, fontWeight: 500 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            {/* Left Y-axis: Progress % */}
            <YAxis
              yAxisId="left"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fill: "#9AA7C7", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              unit="%"
            />
            {/* Right Y-axis: Schools Completed */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 10000]}
              ticks={[0, 2000, 4000, 6000, 8000, 10000]}
              tick={{ fill: "#9AA7C7", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#0F1B3D] border border-border p-2.5 rounded-lg shadow-xl text-xs space-y-1">
                      <p className="font-bold text-white border-b border-border/60 pb-1">{label} 2026-27</p>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <span className="w-2 h-2 rounded-sm bg-[#2F80FF]" />
                        <span>Physical Progress: {payload[0]?.value}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#2DD4A4] font-semibold">
                        <span className="w-2 h-2 rounded-sm bg-[#2DD4A4]" />
                        <span>Financial Progress: {payload[1]?.value}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#F5B301] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#F5B301]" />
                        <span>Schools Completed: {payload[2]?.value}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Bars: Physical (blue #2F80FF), Financial (green/teal #2DD4A4) */}
            <Bar
              yAxisId="left"
              dataKey="physical"
              fill="#2F80FF"
              radius={[3, 3, 0, 0]}
              barSize={8}
            />
            <Bar
              yAxisId="left"
              dataKey="financial"
              fill="#2DD4A4"
              radius={[3, 3, 0, 0]}
              barSize={8}
            />
            {/* Line: Schools Completed (yellow #F5B301) */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="schoolsCompleted"
              stroke="#F5B301"
              strokeWidth={2}
              dot={{ r: 2.5, fill: "#F5B301", stroke: "#0F1B3D", strokeWidth: 1 }}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend bottom */}
      <div className="flex items-center justify-center gap-4 pt-1 border-t border-border/40 text-[10px] text-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#2F80FF]" />
          <span>Physical Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#2DD4A4]" />
          <span>Financial Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5B301]" />
          <span>Schools Completed</span>
        </div>
      </div>
    </div>
  );
}
