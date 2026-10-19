"use client";

import React, { useState } from "react";
import {
  FileText,
  BarChart3,
  Download,
  Calendar,
  CheckCircle2,
  X,
  Printer,
  Sparkles,
} from "lucide-react";

export default function ReportsPage() {
  const [activePreview, setActivePreview] = useState<{ title: string; content: string } | null>(null);
  const [downloadToast, setDownloadToast] = useState(false);

  const reportTemplates = [
    {
      id: "RPT-01",
      title: "State Weekly Review Briefing Note",
      target: "Hon'ble Minister & Chief Secretary",
      period: "Current Week (Apr 2027)",
      desc: "Executive summary of 52 districts, high-risk delays in Rewa & Jabalpur, and pending statutory sanctions.",
      content: `### STATE PROGRAMME WEEKLY REVIEW BRIEF
State of Madhya Pradesh • Department of School Education
Reporting Date: 12 April 2027

1. Macro Programme Health:
- Total Budget Monitored: ₹2,480 Cr (State Allocation: ₹500 Cr Phase 1)
- Overall Physical Achievement: 74% (▲ +6% vs last month)
- Financial Utilization: 68% (▲ +8% vs last month)
- Active Schools Monitored: 8,420 institutions

2. Priority Flashpoints:
- 287 delayed works identified across 52 districts with ₹31.4 Cr outlay at risk.
- Highest concentration in Rewa (43 delayed schools), Jabalpur (32 delayed), Satna (28 delayed).

3. Empanelled Contractor Audit:
- XYZ Constructions and Vision Projects flagged for >35% milestone lag.

Certified by: R. Sharma, IAS, Principal Secretary`,
    },
    {
      id: "RPT-02",
      title: "District Comprehensive Infrastructure Scorecard",
      target: "District Collectors & Joint Directors",
      period: "FY 2026-27 Cumulative",
      desc: "Performance matrix across all 52 districts covering PM SHRI, Smart Classroom, TLM Kits, and civil infrastructure.",
      content: `### MADHYA PRADESH DISTRICT PERFORMANCE SCORECARD
Consolidated Evaluation Matrix • FY 2026-27

District Ranking Highlights:
1. Indore: 320 Schools | 91% Physical | 86% Financial | Status: On Track (Excellent)
2. Bhopal: 280 Schools | 88% Physical | 82% Financial | Status: On Track (Excellent)
3. Gwalior: 240 Schools | 78% Physical | 71% Financial | Status: On Track (Good)
4. Ujjain: 260 Schools | 72% Physical | 68% Financial | Status: Watch
5. Jabalpur: 240 Schools | 64% Physical | 58% Financial | Status: Watch (Needs Attention)
6. Rewa: 190 Schools | 48% Physical | 42% Financial | Status: At Risk

Statewide District Classification:
- On Track (≥ 75%): 32 Districts
- Needs Attention (50 - 75%): 14 Districts
- At Risk (< 50%): 6 Districts`,
    },
    {
      id: "RPT-03",
      title: "Vendor Delivery Index & Penalty Evaluation",
      target: "State Procurement Committee",
      period: "Quarterly Audit Q4",
      desc: "SLA compliance, on-time handover rates, defect liability status, and bank guarantee audit for 12 vendors.",
      content: `### CONTRACTOR PERFORMANCE SCORECARD & PENALTY AUDIT
State Rate Contract • Infrastructure Works 2026-27

Top Performing Contractors:
- ABC Infra Ltd: 126 Projects | ₹42.6 Cr | 81% On-Time | Rating: 4.6 (Good)
- Shree Enterprises: 68 Projects | ₹24.1 Cr | 85% On-Time | Rating: 4.4 (Good)
- GreenClassrooms: 38 Projects | ₹14.1 Cr | 82% On-Time | Rating: 4.3 (Good)

Vendors Marked for Statutory Action:
- XYZ Constructions: 96 Projects | ₹38.2 Cr | 38% Delay Rate | Rating: 2.8 (Poor)
- Vision Projects: 54 Projects | ₹18.6 Cr | 43% Delay Rate | Rating: 2.6 (Poor)

Recommended Action: Issue 15-day show-cause notice and freeze Stage 2 disbursements.`,
    },
  ];

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 4000);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Toast */}
      {downloadToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-semibold">Generating & downloading official PDF report...</span>
          <button onClick={() => setDownloadToast(false)} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Official Reports & Executive Briefings
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Automated Generation for Hon&apos;ble Minister, Chief Secretary & Department Collectors
          </p>
        </div>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reportTemplates.map((rpt) => (
          <div
            key={rpt.id}
            className="p-5 rounded-2xl bg-card border border-border/80 card-glow flex flex-col justify-between hover:border-primary/50 transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-primary font-bold text-xs">{rpt.id}</span>
                <span className="text-[10px] text-text-muted font-medium bg-white/5 border border-border px-2 py-0.5 rounded-full">
                  {rpt.period}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-3 group-hover:text-primary transition-colors">
                {rpt.title}
              </h3>

              <p className="text-xs text-text-muted mt-1">
                Audience: <span className="text-white font-medium">{rpt.target}</span>
              </p>

              <p className="text-xs text-text-muted/80 mt-3 leading-relaxed">
                {rpt.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between gap-2">
              <button
                onClick={() => setActivePreview(rpt)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text text-xs font-semibold transition-colors"
              >
                Preview Document
              </button>

              <button
                onClick={handleDownload}
                className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Generate PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#0F1B3D] border border-border p-6 shadow-2xl flex flex-col justify-between text-left relative">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Executive Document Preview</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                {activePreview.title}
              </h2>
            </div>

            <div className="my-4 p-4 rounded-xl bg-[#0A1128] border border-border/80 overflow-y-auto max-h-[50vh] text-xs text-white/90 font-mono whitespace-pre-line leading-relaxed scrollbar-thin">
              {activePreview.content}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <button
                onClick={() => setActivePreview(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-text-muted hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActivePreview(null);
                  handleDownload();
                }}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Confirm & Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
