"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Monitor,
  CheckCircle2,
  ChevronRight,
  Clock,
  Tv,
  Computer,
  Armchair,
  Boxes,
  FileText,
  MessageSquare,
  Check,
  X,
  Upload,
} from "lucide-react";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusPill } from "@/components/common/StatusPill";
import { cn } from "@/lib/utils";

export default function PrincipalSchoolPage() {
  const router = useRouter();
  const params = useParams();
  const udise = (params?.udise as string) || "23140101234";

  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "assets" | "docs" | "comms">("overview");
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [tasksDone, setTasksDone] = useState<number[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const nextActions = [
    { id: 1, title: "Upload installation photos", due: "15 Apr", desc: "Submit 4 corner photos of the computer laboratory with students seated." },
    { id: 2, title: "Complete checklist", due: "16 Apr", desc: "Confirm earthing resistance and UPS backup duration test." },
    { id: 3, title: "Submit completion certificate", due: "25 Apr", desc: "Joint sign-off with BEO and vendor site engineer." },
    { id: 4, title: "Request final payment", due: "After verification", desc: "Release remaining 20% retainage fee to XYZ Constructions." },
  ];

  const handleMarkTaskDone = (id: number) => {
    setTasksDone((prev) => [...prev, id]);
    setToastMsg(`Task #${id} submitted and signed!`);
    setSelectedTask(null);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A1128] text-white select-none">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-12 inset-x-4 z-50 p-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="h-14 px-4 border-b border-border/60 flex items-center justify-between bg-[#0F1B3D] shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight text-white">
            Shiksha<span className="text-primary">Net</span>
          </span>
          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
            School App
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg text-text-muted hover:text-white">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg text-text-muted hover:text-white relative">
            <Bell className="w-4 h-4" />
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute top-1 right-1" />
          </button>
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center font-bold text-xs text-white">
            P
          </div>
        </div>
      </div>

      {/* School Banner & Greeting */}
      <div className="relative shrink-0">
        <div className="h-28 w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80"
            alt="School Banner"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent" />
        </div>

        <div className="px-4 -mt-10 relative z-10">
          <div className="p-3.5 rounded-2xl bg-[#0F1B3D] border border-border/80 shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
              Welcome, Principal
            </span>
            <h1 className="text-xs font-bold text-white mt-0.5 leading-snug">
              Govt Higher Secondary School, Ranjhi
            </h1>
            <p className="text-[10px] text-text-muted mt-0.5">
              UDISE: <span className="font-mono text-white">{udise}</span> • District: Jabalpur
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-5 border-b border-border/60 text-[11px] font-semibold bg-[#0F1B3D]/50 mt-3 shrink-0">
        {[
          { id: "overview", label: "Overview" },
          { id: "tasks", label: "My Tasks" },
          { id: "assets", label: "Assets" },
          { id: "docs", label: "Docs" },
          { id: "comms", label: "Comms" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "py-2 text-center transition-all border-b-2 truncate px-1",
              activeTab === tab.id
                ? "border-primary text-primary font-bold"
                : "border-transparent text-text-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <>
            {/* Programme Status Card */}
            <div className="p-4 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Smart Classroom - Phase 1</h3>
                    <span className="text-[10px] text-text-muted">Digital Lab Commissioning</span>
                  </div>
                </div>
                <StatusPill status="In Progress" />
              </div>

              <div className="space-y-2 text-xs pt-1 border-t border-border/40">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-muted">Work Order Value:</span>
                  <span className="font-bold text-white tabular-nums">₹18.4 Lakh</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-muted">Amount Received:</span>
                  <span className="font-bold text-emerald-400 tabular-nums">₹11.2 Lakh (61%)</span>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-text-muted">
                    <span>Physical Completion</span>
                    <span className="font-bold text-white">63%</span>
                  </div>
                  <ProgressBar value={63} color="primary" height="h-2" />
                </div>
              </div>
            </div>

            {/* Next Actions (numbered purple circles) */}
            <div className="p-4 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Next Actions ({nextActions.length - tasksDone.length} Pending)
              </h3>

              <div className="space-y-2">
                {nextActions.map((act) => {
                  const isDone = tasksDone.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      onClick={() => !isDone && setSelectedTask(act)}
                      className={cn(
                        "p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-colors cursor-pointer",
                        isDone
                          ? "bg-emerald-500/10 border-emerald-500/20 opacity-60"
                          : "bg-white/[0.03] border-border/60 hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[11px] flex items-center justify-center shrink-0 border border-purple-500/40">
                          {isDone ? <Check className="w-3 h-3 text-emerald-400" /> : act.id}
                        </span>
                        <div className="min-w-0">
                          <p className={cn("text-xs font-bold text-white truncate", isDone && "line-through text-text-muted")}>
                            {act.title}
                          </p>
                          <span className="text-[10px] text-text-muted">Due: {act.due}</span>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-text-muted shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assets Delivered Tiles */}
            <div className="p-4 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Assets Delivered & Installed
              </h3>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-border/60 space-y-1">
                  <Tv className="w-4 h-4 text-primary" />
                  <span className="font-bold text-white block text-[11px]">Smart Board</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block">1 installed (1/1)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-border/60 space-y-1">
                  <Computer className="w-4 h-4 text-teal-400" />
                  <span className="font-bold text-white block text-[11px]">Computers</span>
                  <span className="text-[10px] text-amber-400 font-semibold block">27 installed (27/30)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-border/60 space-y-1">
                  <Armchair className="w-4 h-4 text-orange-400" />
                  <span className="font-bold text-white block text-[11px]">Furniture</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block">Completed</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-border/60 space-y-1">
                  <Boxes className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-white block text-[11px]">TLM Kits</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block">Received</span>
                </div>
              </div>
            </div>

            {/* Recent Updates Timeline */}
            <div className="p-4 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Recent Updates
              </h3>
              <div className="space-y-3 border-l-2 border-emerald-500/40 pl-3.5 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>12 Apr 2027</span>
                  </div>
                  <p className="font-semibold text-white mt-0.5">Inspection done by BEO</p>
                  <span className="text-[10px] text-text-muted">4 photos uploaded & verified</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>10 Apr 2027</span>
                  </div>
                  <p className="font-semibold text-white mt-0.5">20 computers installed</p>
                  <span className="text-[10px] text-text-muted">Classroom wiring certified</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>05 Apr 2027</span>
                  </div>
                  <p className="font-semibold text-white mt-0.5">Furniture delivered</p>
                  <span className="text-[10px] text-text-muted">Batch 1 desks and chairs verified</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* OTHER TABS */}
        {activeTab === "tasks" && (
          <div className="p-4 rounded-2xl bg-[#0F1B3D] border border-border space-y-2 text-xs">
            <h3 className="font-bold text-white">Principal Compliance Queue</h3>
            <p className="text-text-muted">Complete all due actions before the monthly SPD audit.</p>
            {nextActions.map((a) => (
              <div key={a.id} className="p-3 rounded-xl bg-white/5 border border-border flex justify-between items-center">
                <span>{a.title}</span>
                <button
                  onClick={() => handleMarkTaskDone(a.id)}
                  className="px-3 py-1 rounded bg-primary text-white font-bold"
                >
                  Action
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "assets" && (
          <div className="p-4 rounded-2xl bg-[#0F1B3D] border border-border space-y-3 text-xs">
            <h3 className="font-bold text-white">Institutional Asset Register</h3>
            <div className="space-y-2 text-text-muted">
              <p>• Smart Board 75&quot; Touch: S/N 88921-MP (Online)</p>
              <p>• Student PC Nodes: 27 units in Lab 1 (Online)</p>
              <p>• 5kVA Online UPS: Battery backup tested (Active)</p>
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="p-4 rounded-2xl bg-[#0F1B3D] border border-border space-y-2 text-xs">
            <h3 className="font-bold text-white">Sanction Orders & Certs</h3>
            <div className="p-2.5 rounded-lg bg-white/5 border border-border flex justify-between items-center">
              <span>Sanction_Order_Ranjhi_SmartClass.pdf</span>
              <span className="text-primary font-bold">View</span>
            </div>
          </div>
        )}

        {activeTab === "comms" && (
          <div className="p-4 rounded-2xl bg-[#0F1B3D] border border-border space-y-2 text-xs">
            <h3 className="font-bold text-white">Official Helpdesk & Grievance</h3>
            <p className="text-text-muted">Direct messaging with District Education Officer Jabalpur.</p>
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-white">
              DEO Jabalpur: &quot;Please ensure all photo uploads for computers are completed by 15th.&quot;
            </div>
          </div>
        )}
      </div>

      {/* Action Task Sheet */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[390px] mx-auto bg-[#0F1B3D] rounded-t-3xl border-t border-border p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <h3 className="font-bold text-sm text-white">{selectedTask.title}</h3>
              <button onClick={() => setSelectedTask(null)}>
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              {selectedTask.desc}
            </p>

            <button
              onClick={() => handleMarkTaskDone(selectedTask.id)}
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs uppercase"
            >
              Confirm & Submit Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
