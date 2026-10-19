"use client";

import React from "react";
import Link from "next/link";
import {
  Wallet,
  School,
  BarChart3,
  Coins,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { MPMap } from "@/components/map/MPMap";
import { ProgramProgressChart } from "@/components/charts/ProgramProgressChart";
import { CountUp } from "@/components/common/CountUp";
import { useAppStore } from "@/store";
import aiInsightsData from "@/data/aiInsights.json";

export function Option1Compact() {
  const { openChatWithQuestion } = useAppStore();

  const updates = [
    { id: 1, title: "Inspection completed - Govt HS Rewa", time: "12 min ago", color: "bg-emerald-400" },
    { id: 2, title: "Invoice submitted - Smart Class Jabalpur", time: "1 hour ago", color: "bg-primary" },
    { id: 3, title: "Payment released - TLM Indore", time: "2 hours ago", color: "bg-emerald-400" },
    { id: 4, title: "Delay flag raised - 14 schools in Satna", time: "3 hours ago", color: "bg-rose-400" },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 space-y-3.5 select-none text-xs">
      {/* KPI strip (6 compact tiles) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5">
        {/* 1. Total Budget */}
        <div className="p-2.5 rounded-xl bg-card border border-border/80 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Wallet className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-text-muted block">Total Budget</span>
            <span className="text-base font-bold text-white tabular-nums">
              ₹<CountUp end={2480} /> Cr
            </span>
          </div>
        </div>

        {/* 2. Schools */}
        <div className="p-2.5 rounded-xl bg-card border border-border/80 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <School className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-text-muted block">Schools</span>
            <span className="text-base font-bold text-white tabular-nums">
              <CountUp end={8420} />
            </span>
          </div>
        </div>

        {/* 3. Physical Progress */}
        <div className="p-2.5 rounded-xl bg-card border border-border/80 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-text-muted block">Physical Progress</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-white tabular-nums">74%</span>
              <span className="text-[10px] font-semibold text-emerald-400">▲+6%</span>
            </div>
          </div>
        </div>

        {/* 4. Financial Progress */}
        <div className="p-2.5 rounded-xl bg-card border border-border/80 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-text-muted block">Financial Progress</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-white tabular-nums">68%</span>
              <span className="text-[10px] font-semibold text-emerald-400">▲+8%</span>
            </div>
          </div>
        </div>

        {/* 5. Delayed Projects */}
        <div className="p-2.5 rounded-xl bg-card border border-rose-500/30 bg-rose-500/10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-rose-300 block">Delayed Projects</span>
            <span className="text-base font-bold text-rose-400 tabular-nums">
              <CountUp end={287} />
            </span>
          </div>
        </div>

        {/* 6. Need Attention */}
        <div className="p-2.5 rounded-xl bg-card border border-amber-500/30 bg-amber-500/10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-amber-300 block">Need Attention</span>
            <span className="text-base font-bold text-amber-400 tabular-nums">
              <CountUp end={1140} />
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Map, Right AI + Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5">
        {/* Left: Map */}
        <div className="xl:col-span-7">
          <MPMap />
        </div>

        {/* Right: AI Insights & Monthly Progress Trend */}
        <div className="xl:col-span-5 flex flex-col gap-3.5">
          {/* Top AI Insights */}
          <div className="p-3.5 rounded-xl bg-card border border-border/80 card-glow flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-warning" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Top AI Insights
                </h3>
              </div>
              <Link href="/ai-insights" className="text-[11px] font-semibold text-primary hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-1.5 mt-2">
              {aiInsightsData.slice(0, 4).map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openChatWithQuestion(item.title)}
                  className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-border/40 flex items-center justify-between gap-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-medium text-white truncate text-[11px]">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Progress Trend */}
          <div className="h-[210px]">
            <ProgramProgressChart />
          </div>
        </div>
      </div>

      {/* Bottom: Recent Updates ticker */}
      <div className="p-3 rounded-xl bg-card border border-border/80 flex items-center gap-4 overflow-x-auto">
        <span className="font-bold text-[11px] text-white uppercase tracking-wider shrink-0 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Recent Updates:
        </span>
        <div className="flex items-center gap-6 min-w-max text-[11px]">
          {updates.map((u) => (
            <div key={u.id} className="flex items-center gap-2 text-text-muted">
              <span className={`w-1.5 h-1.5 rounded-full ${u.color}`} />
              <span className="text-white font-medium">{u.title}</span>
              <span className="text-[10px] text-text-muted font-mono">({u.time})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
