"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
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
  School,
  Building2,
  Users,
  Shield,
  Download,
  AlertTriangle,
  Send,
  Zap,
  ExternalLink,
} from "lucide-react";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusPill } from "@/components/common/StatusPill";
import { cn } from "@/lib/utils";

interface ActionTask {
  id: number;
  title: string;
  due: string;
  desc: string;
  category: string;
  priority: "High" | "Medium" | "Normal";
}

export default function PrincipalSchoolPage() {
  const router = useRouter();
  const params = useParams();
  const udise = (params?.udise as string) || "23140101234";

  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "assets" | "docs" | "comms">("overview");
  const [selectedTask, setSelectedTask] = useState<ActionTask | null>(null);
  const [tasksDone, setTasksDone] = useState<number[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; time: string; text: string; isSelf: boolean }>>([
    {
      sender: "DEO Office Jabalpur",
      time: "10:30 AM",
      text: "Please ensure all photographic evidence for the 27 computer nodes is uploaded before the 15th for state subsidy release.",
      isSelf: false,
    },
    {
      sender: "Dr. Sunita Pathak (Principal)",
      time: "11:15 AM",
      text: "Acknowledged. Electrical earthing test has been completed with BEO Shri Rajesh Verma today. Uploading photos this afternoon.",
      isSelf: true,
    },
  ]);

  const nextActions: ActionTask[] = [
    {
      id: 1,
      title: "Upload installation photos for Digital Classroom",
      due: "15 Apr 2027",
      desc: "Submit 4 corner high-res photos of the computer laboratory with students seated and screens powered on.",
      category: "Digital Infra",
      priority: "High",
    },
    {
      id: 2,
      title: "Complete earthing & UPS backup verification checklist",
      due: "16 Apr 2027",
      desc: "Confirm earthing resistance test (<2 Ohms) and 30-minute online battery backup duration certificate.",
      category: "Compliance",
      priority: "High",
    },
    {
      id: 3,
      title: "Submit joint work completion certificate",
      due: "25 Apr 2027",
      desc: "Joint sign-off document with BEO Jabalpur and MPSEDC site engineer for Smart Classroom Phase 1.",
      category: "Certification",
      priority: "Medium",
    },
    {
      id: 4,
      title: "Countersign final retainage payment release request",
      due: "After verification",
      desc: "Release remaining 20% retainage fee to vendor post 100% satisfactory hardware commissioning.",
      category: "Finance",
      priority: "Normal",
    },
  ];

  const handleMarkTaskDone = (id: number) => {
    setTasksDone((prev) => [...prev, id]);
    setToastMsg(`Action #${id} verified and logged to District Education Office!`);
    setSelectedTask(null);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "Dr. Sunita Pathak (Principal)",
        time: "Just now",
        text: chatInput,
        isSelf: true,
      },
    ]);
    setChatInput("");
  };

  return (
    <div className="space-y-6 select-none">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Breadcrumb Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/schools"
            className="p-2 rounded-xl bg-[#0F1B3D] border border-border hover:border-primary/50 text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Link href="/command-centre" className="hover:text-primary transition-colors">
                Command Centre
              </Link>
              <span>/</span>
              <Link href="/schools" className="hover:text-primary transition-colors">
                Schools Register
              </Link>
              <span>/</span>
              <span className="text-white font-medium">Principal Cockpit</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">
              School Operations & Asset Management Portal
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-[#0F1B3D] border border-border/80 hover:border-primary/40 text-xs font-semibold text-text-muted hover:text-white transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export School Dossier</span>
          </button>
          <button
            onClick={() => setActiveTab("comms")}
            className="px-3.5 py-2 rounded-xl bg-primary/20 border border-primary/40 hover:bg-primary/30 text-xs font-bold text-primary transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact DEO Office</span>
          </button>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="rounded-2xl bg-[#0F1B3D] border border-border/80 overflow-hidden relative shadow-xl">
        {/* Visual Banner Accent */}
        <div className="h-28 w-full bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900/80 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2F80FF_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-4 right-6 flex items-center gap-2">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              DPI Affiliated • Code 2314
            </span>
          </div>
        </div>

        {/* Content Overlap */}
        <div className="px-6 pb-6 -mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-10">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-2xl bg-[#0A1128] border-2 border-primary/50 text-primary flex items-center justify-center shadow-2xl shrink-0">
              <School className="w-10 h-10" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Govt Higher Secondary School, Ranjhi
                </h2>
                <StatusPill status="In Progress" />
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted mt-1.5">
                <span>UDISE: <strong className="text-white font-mono">{udise}</strong></span>
                <span>•</span>
                <span>Principal: <strong className="text-white">Dr. Sunita Pathak</strong> (M.Sc., B.Ed.)</span>
                <span>•</span>
                <span>District: <strong className="text-white">Jabalpur</strong></span>
                <span>•</span>
                <span>Category: <strong className="text-white">Grades 9 to 12</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-[#0A1128] border border-border/80 text-right">
              <span className="text-[10px] text-text-muted block uppercase tracking-wider font-semibold">
                DDO Account Code
              </span>
              <span className="font-mono text-xs font-bold text-primary">2314-DDO-08</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-[#0A1128] border border-border/80 text-right">
              <span className="text-[10px] text-text-muted block uppercase tracking-wider font-semibold">
                State Grant Sanction
              </span>
              <span className="font-bold text-xs text-emerald-400">₹18.40 Lakh</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Smart Classroom Progress</span>
            <Monitor className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1.5 tabular-nums">63%</p>
          <ProgressBar value={63} color="primary" height="h-2" className="mt-2" />
          <span className="text-[10px] text-text-muted block mt-1">₹11.2L of ₹18.4L disbursed</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Compliance Actions</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-amber-400 mt-1.5 tabular-nums">
            {nextActions.length - tasksDone.length} <span className="text-xs text-text-muted font-normal">Pending</span>
          </p>
          <span className="text-[11px] text-text-muted block mt-2">Due before next SPD audit</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Enrolled Students</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-white mt-1.5 tabular-nums">842</p>
          <span className="text-[11px] text-emerald-400 block mt-2">28 Appointed Teachers</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Audit Verification</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-1.5">Inspected ✓</p>
          <span className="text-[11px] text-text-muted block mt-2">12 Apr 2027 by BEO Jabalpur</span>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-border/80 text-xs font-semibold overflow-x-auto gap-2">
        {[
          { id: "overview", label: "Overview & Schemes" },
          { id: "tasks", label: `Principal Actions (${nextActions.length - tasksDone.length})` },
          { id: "assets", label: "Asset Register (5 Items)" },
          { id: "docs", label: "Sanctions & Certificates" },
          { id: "comms", label: "DEO Helpdesk & Liaison" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "py-3 px-4 transition-all border-b-2 whitespace-nowrap",
              activeTab === tab.id
                ? "border-primary text-primary font-bold bg-primary/5 rounded-t-lg"
                : "border-transparent text-text-muted hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Tab Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* Active Programme Work Order Card */}
              <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Smart Classroom Programme - Phase 1</h3>
                      <p className="text-xs text-text-muted">Digital Lab Commissioning & Interactive Touch Board</p>
                    </div>
                  </div>
                  <StatusPill status="In Progress" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border/60">
                  <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                      Sanctioned Work Order
                    </span>
                    <p className="text-base font-bold text-white mt-0.5">₹18.40 Lakh</p>
                    <span className="text-[10px] text-text-muted">MPSEDC Agreement #9812</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                      Disbursed Grant
                    </span>
                    <p className="text-base font-bold text-emerald-400 mt-0.5">₹11.20 Lakh</p>
                    <span className="text-[10px] text-emerald-400/80">61% Funds Released</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                      Physical Readiness
                    </span>
                    <p className="text-base font-bold text-primary mt-0.5">63% Verified</p>
                    <span className="text-[10px] text-text-muted">27 of 30 PCs online</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">Overall Phase 1 Progress</span>
                    <span className="font-bold text-white">63% Completed</span>
                  </div>
                  <ProgressBar value={63} color="primary" height="h-2.5" />
                </div>
              </div>

              {/* Next Actions List */}
              <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Principal Action Items ({nextActions.length - tasksDone.length} Pending)
                  </h3>
                  <span className="text-xs text-text-muted">Click an action to review and complete</span>
                </div>

                <div className="space-y-2.5">
                  {nextActions.map((act) => {
                    const isDone = tasksDone.includes(act.id);
                    return (
                      <div
                        key={act.id}
                        onClick={() => !isDone && setSelectedTask(act)}
                        className={cn(
                          "p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer group",
                          isDone
                            ? "bg-emerald-500/[0.04] border-emerald-500/20 opacity-60"
                            : "bg-[#0A1128] border-border/70 hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          <span
                            className={cn(
                              "w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border mt-0.5 sm:mt-0",
                              isDone
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                : "bg-purple-500/20 text-purple-300 border-purple-500/40"
                            )}
                          >
                            {isDone ? <Check className="w-4 h-4" /> : act.id}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p
                                className={cn(
                                  "text-xs sm:text-sm font-bold text-white group-hover:text-primary transition-colors",
                                  isDone && "line-through text-text-muted"
                                )}
                              >
                                {act.title}
                              </p>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-text-muted border border-white/10 hidden sm:inline">
                                {act.category}
                              </span>
                            </div>
                            <p className="text-xs text-text-muted mt-1 leading-relaxed">
                              {act.desc}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <span className="text-xs text-text-muted font-mono">{act.due}</span>
                          {!isDone && (
                            <button className="px-3 py-1 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-semibold transition-colors">
                              Take Action
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Installed Assets Grid */}
              <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Assets Delivered & Operational Status
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-xl bg-[#0A1128] border border-border/60 space-y-2">
                    <Tv className="w-5 h-5 text-primary" />
                    <div>
                      <span className="font-bold text-white text-xs block">Smart Board 75&quot;</span>
                      <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                        1 Installed (1/1)
                      </span>
                    </div>
                    <span className="text-[10px] text-text-muted block">S/N: 88921-MP</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A1128] border border-border/60 space-y-2">
                    <Computer className="w-5 h-5 text-teal-400" />
                    <div>
                      <span className="font-bold text-white text-xs block">Student Computers</span>
                      <span className="text-[11px] text-amber-400 font-semibold block mt-0.5">
                        27 Online (27/30)
                      </span>
                    </div>
                    <span className="text-[10px] text-text-muted block">Core i5 / 16GB / SSD</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A1128] border border-border/60 space-y-2">
                    <Armchair className="w-5 h-5 text-orange-400" />
                    <div>
                      <span className="font-bold text-white text-xs block">Dual Desk Furniture</span>
                      <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                        40 Desks (100%)
                      </span>
                    </div>
                    <span className="text-[10px] text-text-muted block">Heavy Gauge Steel</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A1128] border border-border/60 space-y-2">
                    <Boxes className="w-5 h-5 text-purple-400" />
                    <div>
                      <span className="font-bold text-white text-xs block">TLM & STEM Kits</span>
                      <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                        All Kits Received
                      </span>
                    </div>
                    <span className="text-[10px] text-text-muted block">Grades 9-10 Physics/Chem</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: TASKS */}
          {activeTab === "tasks" && (
            <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Comprehensive Principal Compliance Queue
                </h3>
                <span className="text-xs text-text-muted">Target completion before 25 Apr 2027</span>
              </div>

              <div className="space-y-3">
                {nextActions.map((act) => {
                  const isDone = tasksDone.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      className="p-4 rounded-xl bg-[#0A1128] border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{act.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted">
                            {act.category}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">{act.desc}</p>
                        <span className="text-[11px] text-primary font-mono block">Deadline: {act.due}</span>
                      </div>

                      <button
                        onClick={() => handleMarkTaskDone(act.id)}
                        disabled={isDone}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0",
                          isDone
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-primary hover:bg-primary-hover text-white shadow-primaryGlow"
                        )}
                      >
                        {isDone ? "Submitted ✓" : "Execute & Submit"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ASSETS */}
          {activeTab === "assets" && (
            <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Institutional Asset Register (Government Provided)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A1128] text-text-muted uppercase text-[10px] tracking-wider border-b border-border">
                    <tr>
                      <th className="p-3">Asset Item</th>
                      <th className="p-3">Serial No</th>
                      <th className="p-3">Quantity</th>
                      <th className="p-3">Vendor</th>
                      <th className="p-3">Condition</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-white">Smart Board 75&quot; Touch</td>
                      <td className="p-3 font-mono text-text-muted">88921-MP-JBP</td>
                      <td className="p-3">1 unit</td>
                      <td className="p-3 text-text-muted">MPSEDC Digital</td>
                      <td className="p-3 text-emerald-400">Excellent</td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          Online
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-white">Desktop PCs (Student Lab)</td>
                      <td className="p-3 font-mono text-text-muted">PC-JBP-001..030</td>
                      <td className="p-3">30 units</td>
                      <td className="p-3 text-text-muted">HCL Infosystems</td>
                      <td className="p-3 text-amber-400">27 Active / 3 Config</td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                          90% Online
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-white">5kVA Online UPS + Batteries</td>
                      <td className="p-3 font-mono text-text-muted">UPS-5K-9901</td>
                      <td className="p-3">1 set</td>
                      <td className="p-3 text-text-muted">Exide Power Ltd</td>
                      <td className="p-3 text-emerald-400">Tested (30 min)</td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-3 font-bold text-white">Dual Desk Class Furniture</td>
                      <td className="p-3 font-mono text-text-muted">FUR-DESK-40</td>
                      <td className="p-3">40 pairs</td>
                      <td className="p-3 text-text-muted">Godrej Interio</td>
                      <td className="p-3 text-emerald-400">New</td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          Verified
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: DOCS */}
          {activeTab === "docs" && (
            <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Official Sanction Orders & Certificates
              </h3>

              <div className="space-y-3">
                {[
                  { title: "Sanction_Order_Ranjhi_SmartClass_Phase1.pdf", size: "2.4 MB", date: "15-Jan-2026", type: "Government Sanction" },
                  { title: "Physical_Verification_Certificate_BEO_Jabalpur.pdf", size: "1.1 MB", date: "12-Apr-2027", type: "Inspection Report" },
                  { title: "Utilisation_Certificate_Form_19A_Interim.pdf", size: "780 KB", date: "02-Apr-2027", type: "Financial Audit" },
                  { title: "Electrical_Safety_Earthing_Test_PWD.pdf", size: "950 KB", date: "10-Apr-2027", type: "Safety Compliance" },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0A1128] border border-border flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{doc.title}</p>
                        <span className="text-xs text-text-muted">
                          {doc.type} • {doc.size} • Issued {doc.date}
                        </span>
                      </div>
                    </div>

                    <button className="px-3.5 py-1.5 rounded-lg bg-primary/20 hover:bg-primary text-primary hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMMS */}
          {activeTab === "comms" && (
            <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Official Communication Thread with DEO Jabalpur
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Direct official channel for DPI compliance, grants, and defect reporting.
                </p>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0A1128] border border-border max-h-80 overflow-y-auto">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-3.5 rounded-xl max-w-lg text-xs leading-relaxed space-y-1",
                      msg.isSelf
                        ? "ml-auto bg-primary text-white rounded-br-none"
                        : "mr-auto bg-[#0F1B3D] border border-border text-text-muted rounded-bl-none"
                    )}
                  >
                    <div className="flex justify-between items-center gap-4 text-[10px] opacity-80">
                      <strong className={msg.isSelf ? "text-white" : "text-primary"}>{msg.sender}</strong>
                      <span>{msg.time}</span>
                    </div>
                    <p className={msg.isSelf ? "text-white font-medium" : "text-white/90"}>
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type an official dispatch or inquiry to District Education Officer..."
                  className="flex-1 bg-[#0A1128] border border-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center gap-1.5 shadow-primaryGlow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Quick Contacts & School Demographics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Institutional Demographics */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              School Profile
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  Total Students Enrolled
                </span>
                <p className="text-white font-bold text-sm mt-0.5">842 Students (Grades 9-12)</p>
                <span className="text-[11px] text-emerald-400">460 Girls • 382 Boys</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  Classrooms & Facilities
                </span>
                <p className="text-white font-bold text-sm mt-0.5">18 Classrooms • 4 Labs</p>
                <span className="text-[11px] text-text-muted">Separate Sanitation Blocks Verified</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  Broadband & Power Backup
                </span>
                <p className="text-white font-bold text-sm mt-0.5">100 Mbps BSNL FTTH Active</p>
                <span className="text-[11px] text-emerald-400">Solar + 5kVA UPS Backup Operational</span>
              </div>
            </div>
          </div>

          {/* Key Authority Contacts */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              District Liaison Officials
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  Block Education Officer (BEO)
                </span>
                <p className="text-white font-bold mt-0.5">Shri Rajesh Verma</p>
                <span className="text-[11px] text-primary font-mono">beo.jabalpur@mp.gov.in</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  District Education Officer (DEO)
                </span>
                <p className="text-white font-bold mt-0.5">Dr. M. K. Rathore</p>
                <span className="text-[11px] text-primary font-mono">deo-jabalpur@mp.gov.in</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  MPSEDC Tech Helpdesk
                </span>
                <p className="text-white font-bold mt-0.5">State Smart Lab Support</p>
                <span className="text-[11px] text-text-muted font-mono">Toll-Free: 1800-233-0175</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Principal Operations
            </h3>

            <button
              onClick={() => setActiveTab("tasks")}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-border text-xs font-semibold text-white transition-colors text-left px-3 flex items-center justify-between"
            >
              <span>Submit Monthly Utilization Cert</span>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </button>

            <button
              onClick={() => setActiveTab("assets")}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-border text-xs font-semibold text-white transition-colors text-left px-3 flex items-center justify-between"
            >
              <span>Report Equipment Defect / Repair</span>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </button>

            <Link
              href="/schools"
              className="w-full py-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/40 text-xs font-bold text-primary transition-colors text-center block"
            >
              Back to State Schools Directory
            </Link>
          </div>
        </div>
      </div>

      {/* Task Execution Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-[#0F1B3D] border border-border p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                  Execute Compliance Task #{selectedTask.id}
                </span>
                <h3 className="font-bold text-sm text-white mt-0.5">{selectedTask.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-1 rounded-lg text-text-muted hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0A1128] border border-border text-xs text-text-muted space-y-2 leading-relaxed">
              <p>{selectedTask.desc}</p>
              <div className="flex justify-between text-[11px] text-white pt-1">
                <span>Category: <strong>{selectedTask.category}</strong></span>
                <span>Deadline: <strong className="text-amber-400">{selectedTask.due}</strong></span>
              </div>
            </div>

            {/* Mock Attachment Upload */}
            <div className="p-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 flex flex-col items-center justify-center text-primary text-xs cursor-pointer hover:bg-primary/10 transition-colors">
              <Upload className="w-5 h-5 mb-1" />
              <span className="font-bold">Attach Proof / Signed Document</span>
              <span className="text-[10px] text-text-muted mt-0.5">PDF or Geo-Tagged JPEG</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border/80">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleMarkTaskDone(selectedTask.id)}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-xs font-bold text-white shadow-primaryGlow"
              >
                Sign & Submit to DEO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
