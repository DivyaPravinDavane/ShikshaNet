"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, AlertTriangle, AlertCircle, TrendingUp, CheckCircle2, ArrowRight, X } from "lucide-react";
import { useAppStore } from "@/store";
import aiInsightsData from "@/data/aiInsights.json";
import { cn } from "@/lib/utils";

export default function AiInsightsPage() {
  const { openChatWithQuestion } = useAppStore();
  const [actionToast, setActionToast] = useState<string | null>(null);

  const handleCreateAction = (title: string) => {
    setActionToast(`Direct executive directive generated for: "${title}". Synced with Secretary Decision Queue.`);
    setTimeout(() => setActionToast(null), 4000);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Toast */}
      {actionToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-primary text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">{actionToast}</span>
          <button onClick={() => setActionToast(null)} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-warning/20 text-warning flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold uppercase tracking-wider text-white">
              AI Programme Intelligence & Early Warnings
            </h1>
          </div>
          <p className="text-xs text-text-muted mt-1">
            Machine Learning Risk Scoring, Disbursement Anomalies & Telemetry Audits
          </p>
        </div>

        <button
          onClick={() => openChatWithQuestion("What should I review today?")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-sm self-start"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AI Assistant</span>
        </button>
      </div>

      {/* Cards feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {aiInsightsData.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              "p-5 rounded-2xl border card-glow flex flex-col justify-between transition-all duration-200",
              insight.severity === "high"
                ? "bg-rose-500/[0.06] border-rose-500/30 hover:border-rose-500/60"
                : "bg-card border-border/80 hover:border-border"
            )}
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                      insight.severity === "high"
                        ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                        : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    )}
                  >
                    {insight.severity === "high" ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                      {insight.category} • {insight.severity} Severity
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {insight.title}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-bold text-white font-mono bg-white/5 border border-border px-2.5 py-1 rounded-lg">
                  {insight.impactValue}
                </span>
              </div>

              <p className="text-xs text-text-muted mt-3.5 leading-relaxed">
                {insight.details}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-[#0A1128]/80 border border-border/50 flex items-center justify-between text-xs">
                <span className="text-text-muted">Impact Footprint:</span>
                <span className="font-bold text-white tabular-nums">
                  {insight.affectedCount} Entities Affected
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center justify-between gap-3">
              <Link
                href={insight.link}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                {insight.actionLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => handleCreateAction(insight.title)}
                className="px-3 py-1.5 rounded-lg bg-primary/20 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all"
              >
                Create Action Directive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
