"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function HealthGauge({ percentage = 74, status = "On Track" }: { percentage?: number; status?: string }) {
  // Semicircle gauge (180 deg)
  const data = [
    { name: "Score", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  return (
    <div className="relative w-full h-[180px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#F5B301" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="85%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="95%"
            paddingAngle={0}
            dataKey="value"
          >
            <Cell key="val" fill="url(#gaugeGradient)" stroke="none" />
            <Cell key="rem" fill="rgba(255,255,255,0.08)" stroke="none" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Centre text */}
      <div className="absolute bottom-2 inset-x-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-extrabold text-white tracking-tight tabular-nums leading-none">
          {percentage}%
        </span>
        <span className="text-xs font-bold text-emerald-400 mt-1 uppercase tracking-wider">
          {status}
        </span>
      </div>
    </div>
  );
}
