"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, X, AlertTriangle } from "lucide-react";
import { useAppStore } from "@/store";
import aiInsightsData from "@/data/aiInsights.json";
import { cn } from "@/lib/utils";

export function AiPriorities() {
  const { openChatWithQuestion } = useAppStore();
  const [selectedInsight, setSelectedInsight] = useState<typeof aiInsightsData[0] | null>(null);
  const [askInput, setAskInput] = useState("");

  const chips = [
    "What should I review today?",
    "Show delayed schools in Rewa",
    "Which vendors are underperforming?",
    "Generate weekly review note",
  ];

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (askInput.trim()) {
      openChatWithQuestion(askInput.trim());
      setAskInput("");
    }
  };

  return (
    <div className="h-[410px] rounded-[12px] bg-card border border-border/80 card-glow p-4 flex flex-col justify-between select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5B301] fill-[#F5B301]/20 shrink-0" />
            <div>
              <h2 className="text-[14px] font-bold tracking-wider text-white uppercase leading-none">
                AI PRIORITIES
              </h2>
              <p className="text-[11px] text-text-muted mt-1 leading-none">
                Based on latest data and programme rules
              </p>
            </div>
          </div>
          <Link
            href="/ai-insights"
            className="text-[12px] font-semibold text-primary hover:text-primary-hover hover:underline transition-colors shrink-0"
          >
            View All
          </Link>
        </div>

        {/* 4 Rows */}
        <div className="mt-2.5 space-y-1.5">
          {aiInsightsData.slice(0, 4).map((item, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedInsight(item)}
                className={cn(
                  "p-2.5 rounded-lg border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer group text-left",
                  isFirst
                    ? "bg-rose-500/10 border-rose-500/30 hover:border-rose-500/50 shadow-sm"
                    : "bg-white/[0.02] border-border/40 hover:bg-white/[0.05] hover:border-border/80"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Red numbered circle 1-4 */}
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 font-bold text-[11px] flex items-center justify-center shrink-0 border border-rose-500/30">
                    {idx + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white tracking-tight truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-text-muted truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Ask Input + Prompt Chips */}
      <div className="pt-2 border-t border-border/50 space-y-2">
        {/* Input with glowing blue border and sparkle icon */}
        <form onSubmit={handleAskSubmit} className="relative flex items-center">
          <div className="absolute left-3 text-primary pointer-events-none">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={askInput}
            onChange={(e) => setAskInput(e.target.value)}
            placeholder="Ask the Department anything..."
            className="w-full bg-[#0A1128] border border-primary/40 rounded-lg pl-8 pr-10 py-1.5 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-1.5 w-6 h-6 rounded bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors"
            aria-label="Send query"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Chips (outlined, rounded) */}
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip, i) => (
            <button
              key={i}
              onClick={() => openChatWithQuestion(chip)}
              className="px-2.5 py-1 rounded-full border border-border/70 bg-white/[0.03] hover:bg-primary/15 hover:border-primary/50 text-[11px] text-text-muted hover:text-white transition-all truncate"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Sheet Modal when clicking an insight row */}
      {selectedInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-[#0F1B3D] border border-border p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedInsight(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  {selectedInsight.category} • Priority Alert
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {selectedInsight.title}
                </h3>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#0A1128] border border-border/60 text-xs text-text-muted leading-relaxed">
              {selectedInsight.details}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3 rounded-lg bg-white/5 border border-border/40">
                <span className="text-text-muted block text-[11px]">Financial Exposure</span>
                <span className="text-base font-bold text-white tabular-nums">
                  {selectedInsight.impactValue}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-border/40">
                <span className="text-text-muted block text-[11px]">Affected Entities</span>
                <span className="text-base font-bold text-white tabular-nums">
                  {selectedInsight.affectedCount}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedInsight(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-text-muted hover:text-white"
              >
                Dismiss
              </button>
              <Link
                href={selectedInsight.link}
                onClick={() => setSelectedInsight(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-primary text-white hover:bg-primary-hover shadow-sm"
              >
                {selectedInsight.actionLabel} →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
