"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  CheckCircle2,
  X,
  FileCheck2,
} from "lucide-react";
import { HealthGauge } from "@/components/charts/HealthGauge";
import { useAppStore } from "@/store";
import decisionsData from "@/data/decisions.json";
import { cn } from "@/lib/utils";

export function Option3AiDecisions() {
  const { openChatWithQuestion, completedDecisions, markDecisionDone } = useAppStore();
  const [activeDecisionModal, setActiveDecisionModal] = useState<typeof decisionsData[0] | null>(null);
  const [remarks, setRemarks] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [askText, setAskText] = useState("");

  const aiBullets = [
    { id: 1, text: "287 projects are delayed, impacting ₹31.4 Cr.", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
    { id: 2, text: "Rewa, Jabalpur and Satna need immediate review.", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
    { id: 3, text: "Vendor XYZ has highest number of delayed projects (19).", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    { id: 4, text: "Financial progress is 12% higher than physical progress in 17 districts.", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    { id: 5, text: "Inspection evidence incomplete in 142 schools.", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  ];

  const chips = [
    "Show me delayed schools in Rewa",
    "Which vendors are underperforming?",
    "Prepare weekly review for Minister",
    "Show payment pending > 30 days",
  ];

  const handleConfirmDecision = () => {
    if (!activeDecisionModal) return;
    markDecisionDone(activeDecisionModal.id);
    setToastMessage(`Action "${activeDecisionModal.action}" completed successfully for ${activeDecisionModal.title}`);
    setActiveDecisionModal(null);
    setRemarks("");

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-3">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Good Morning, Secretary
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            Here is what needs your attention today.
          </p>
        </div>
        <div className="text-xs font-semibold text-text-muted font-mono">
          Monday, 12 Apr 2027
        </div>
      </div>

      {/* Top 2 Cards: AI Summary (left) & Ask Shiksha AI (right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left card: AI Summary */}
        <div className="xl:col-span-7 rounded-2xl bg-card border border-border/80 card-glow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-border/50">
              <Sparkles className="w-4 h-4 text-warning" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                AI Summary
              </h2>
            </div>

            <div className="mt-3.5 space-y-2.5">
              {aiBullets.map((b) => (
                <div key={b.id} className="flex items-center gap-3 text-xs text-white/90">
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 border",
                      b.color
                    )}
                  >
                    {b.id}
                  </span>
                  <span className="leading-snug">{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/40 text-[11px] text-text-muted flex justify-between items-center">
            <span>Aggregated across 8,420 schools and 12 empanelled vendors</span>
            <button
              onClick={() => openChatWithQuestion("Generate weekly review note")}
              className="text-primary hover:underline font-semibold"
            >
              Export Summary →
            </button>
          </div>
        </div>

        {/* Right card: Ask Shiksha AI (purple gradient) */}
        <div className="xl:col-span-5 rounded-2xl bg-gradient-to-br from-[#1E1145] to-[#0F1B3D] border border-purple-500/30 p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-purple-500/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Ask Shiksha AI
              </h2>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (askText.trim()) {
                  openChatWithQuestion(askText);
                  setAskText("");
                }
              }}
              className="relative mt-4"
            >
              <input
                type="text"
                value={askText}
                onChange={(e) => setAskText(e.target.value)}
                placeholder="Ask anything about your programme..."
                className="w-full bg-[#0A1128]/90 border border-purple-500/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Chips */}
            <div className="mt-4 space-y-1.5">
              <span className="text-[10px] text-purple-300 uppercase font-bold tracking-wider">
                Suggested Prompts
              </span>
              <div className="flex flex-wrap gap-1.5">
                {chips.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => openChatWithQuestion(chip)}
                    className="px-3 py-1.5 rounded-full bg-purple-500/15 hover:bg-purple-500/30 border border-purple-500/30 text-[11px] text-purple-200 transition-colors text-left"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-500/20 text-[10px] text-purple-300">
            Powered by ShikshaNet Deep Learning Pipeline • Real-time telemetry
          </div>
        </div>
      </div>

      {/* Bottom 2 Cards: Key Decisions Required (7 items) & Overall Programme Health */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Key Decisions Required */}
        <div className="xl:col-span-8 rounded-2xl bg-card border border-border/80 card-glow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Key Decisions Required ({decisionsData.length} items)
                </h3>
              </div>
              <span className="text-xs font-semibold text-text-muted">
                {completedDecisions.length} of {decisionsData.length} completed
              </span>
            </div>

            <div className="mt-3 divide-y divide-border/40">
              {decisionsData.slice(0, 4).map((dec, idx) => {
                const isDone = completedDecisions.includes(dec.id);

                return (
                  <div
                    key={dec.id}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-white/[0.02] px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className={cn("text-xs font-semibold text-white truncate", isDone && "line-through text-text-muted")}>
                          {dec.title}
                        </p>
                        <p className="text-[11px] text-text-muted mt-0.5">
                          Target: {dec.target} • Value: {dec.value}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isDone ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center gap-1 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : (
                        <button
                          onClick={() => setActiveDecisionModal(dec)}
                          className={cn(
                            "px-3 py-1 rounded-lg text-xs font-bold transition-all shadow-sm",
                            dec.action === "Approve"
                              ? "bg-emerald-500 text-white hover:bg-emerald-600"
                              : dec.action === "Review"
                              ? "bg-amber-500 text-white hover:bg-amber-600"
                              : "bg-rose-500 text-white hover:bg-rose-600"
                          )}
                        >
                          {dec.action}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border/40 text-right">
            <Link href="/reports" className="text-xs font-semibold text-primary hover:underline">
              View All 7 Pending Decisions →
            </Link>
          </div>
        </div>

        {/* Right: Overall Programme Health Gauge */}
        <div className="xl:col-span-4 rounded-2xl bg-card border border-border/80 card-glow p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Overall Programme Health
              </h3>
              <span className="text-xs font-semibold text-emerald-400">
                FY 2026-27
              </span>
            </div>

            {/* Gauge */}
            <div className="mt-2">
              <HealthGauge percentage={74} status="On Track" />
            </div>

            {/* Legend counts */}
            <div className="mt-4 space-y-2 text-xs border-t border-border/40 pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-text-muted">On Track</span>
                </div>
                <span className="font-bold text-white tabular-nums">6,280</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-text-muted">Needs Attention</span>
                </div>
                <span className="font-bold text-white tabular-nums">1,140</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-text-muted">At Risk</span>
                </div>
                <span className="font-bold text-white tabular-nums">287</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-text-muted text-center border-t border-border/40">
            Total Monitored Portfolio: 7,707 critical components
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Decisions */}
      {activeDecisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-[#0F1B3D] border border-border p-6 shadow-2xl text-left relative">
            <button
              onClick={() => setActiveDecisionModal(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white">
              Confirm Action: {activeDecisionModal.action}
            </h3>
            <p className="text-xs text-text-muted mt-1">
              {activeDecisionModal.title}
            </p>

            <div className="mt-3 p-3 rounded-xl bg-[#0A1128] border border-border/60 text-xs text-text-muted leading-relaxed">
              {activeDecisionModal.description}
            </div>

            <div className="mt-4 space-y-1.5 text-xs">
              <label className="text-white font-medium block">
                Official Remarks / Instructions:
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks or condition of sanction..."
                className="w-full h-20 bg-[#0A1128] border border-border/80 rounded-xl p-3 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 text-xs font-semibold">
              <button
                onClick={() => setActiveDecisionModal(null)}
                className="px-4 py-2 rounded-lg text-text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecision}
                className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover font-bold shadow-sm"
              >
                Confirm {activeDecisionModal.action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
