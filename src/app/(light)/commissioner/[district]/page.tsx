"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  Calendar,
  ChevronDown,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  School,
  X,
} from "lucide-react";
import { CountUp } from "@/components/common/CountUp";
import { ProgressBar } from "@/components/common/ProgressBar";
import { StatusPill } from "@/components/common/StatusPill";
import districtsData from "@/data/districts.json";
import schoolsData from "@/data/schools.json";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";

export default function CommissionerDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const rawDistrict = (params?.district as string) || "jabalpur";

  const district =
    districtsData.find(
      (d) => d.id.toLowerCase() === rawDistrict.toLowerCase() || d.name.toLowerCase() === rawDistrict.toLowerCase()
    ) || districtsData.find((d) => d.id === "jabalpur") || districtsData[0];

  const [activeTab, setActiveTab] = useState<"overview" | "schools" | "projects" | "vendors" | "inspections" | "payments">("overview");
  const [selectedPin, setSelectedPin] = useState<any | null>(null);

  // Exact 5 delayed schools for Jabalpur
  const delayedSchools = [
    { rank: 1, name: "Govt HS Ranjhi", udise: "23140101234", prog: "Smart Class", delay: 48, status: "At Risk" },
    { rank: 2, name: "Govt MS Panagar", udise: "23140203401", prog: "TLM", delay: 37, status: "Delayed" },
    { rank: 3, name: "Govt PS Khamaria", udise: "23140304502", prog: "LEP", delay: 35, status: "Delayed" },
    { rank: 4, name: "Govt HS Vijay Nagar", udise: "23140405603", prog: "Infrastructure", delay: 32, status: "Delayed" },
    { rank: 5, name: "Govt PS Golpur", udise: "23140506704", prog: "TLM", delay: 30, status: "Delayed" },
  ];

  // District pins for Jabalpur blocks
  const blockPins = [
    { id: "p1", name: "Govt HS Ranjhi", block: "Jabalpur Urban", x: 62, y: 48, status: "At Risk", prog: "Smart Class", delay: 48, udise: "23140101234" },
    { id: "p2", name: "Govt MS Panagar", block: "Panagar", x: 70, y: 25, status: "Delayed", prog: "TLM Kits", delay: 37, udise: "23140203401" },
    { id: "p3", name: "Govt PS Khamaria", block: "Khamaria", x: 78, y: 52, status: "Delayed", prog: "LEP", delay: 35, udise: "23140304502" },
    { id: "p4", name: "Govt HS Vijay Nagar", block: "Jabalpur Urban", x: 38, y: 45, status: "Delayed", prog: "Infrastructure", delay: 32, udise: "23140405603" },
    { id: "p5", name: "Govt PS Golpur", block: "Sihora", x: 80, y: 18, status: "Delayed", prog: "TLM Kits", delay: 30, udise: "23140506704" },
    { id: "p6", name: "Govt Model School Patan", block: "Patan", x: 25, y: 35, status: "On Track", prog: "PM SHRI", delay: 0, udise: "23140101235" },
    { id: "p7", name: "Govt HSS Kundam", block: "Kundam", x: 85, y: 72, status: "On Track", prog: "Robotics", delay: 0, udise: "23140101234" },
  ];

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/commissioner/${e.target.value}`);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-5 select-none">
      {/* Title & Select row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5EAF3] pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1B3D]">
            {district.name} District Dashboard
          </h1>
          <p className="text-xs text-[#6B7A99] mt-0.5 font-medium">
            Education Programmes • Monitoring & Grievance Redressal
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* District Select */}
          <div className="relative">
            <select
              value={district.id}
              onChange={handleDistrictChange}
              className="appearance-none bg-white border border-[#E5EAF3] text-xs font-bold text-[#0F1B3D] rounded-xl pl-3 pr-8 py-2 focus:ring-1 focus:ring-primary shadow-sm cursor-pointer"
            >
              {districtsData.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} District
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7A99] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E5EAF3] text-xs font-semibold text-[#0F1B3D] shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>Apr 2026 – Mar 2027</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5EAF3] pb-1 overflow-x-auto">
        {["overview", "schools", "projects", "vendors", "inspections", "payments"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t as any)}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-t-xl capitalize transition-all border-b-2",
              activeTab === t
                ? "border-primary text-primary bg-blue-50/80"
                : "border-transparent text-[#6B7A99] hover:text-[#0F1B3D]"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview Content */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          {/* 5 KPI Tiles: Schools | Physical % | Financial % | Delayed | At Risk */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-xl bg-white border border-[#E5EAF3] shadow-sm">
              <span className="text-xs text-[#6B7A99] font-medium">Schools Monitored</span>
              <p className="text-2xl font-bold text-[#0F1B3D] mt-1 tabular-nums">
                <CountUp end={district.schools} />
              </p>
              <span className="text-[11px] text-[#6B7A99] mt-0.5 block">Across 7 Tehsils</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5EAF3] shadow-sm">
              <span className="text-xs text-[#6B7A99] font-medium">Physical Progress</span>
              <p className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">
                {district.physical}%
              </p>
              <ProgressBar value={district.physical} color="success" height="h-1.5" className="mt-2" />
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5EAF3] shadow-sm">
              <span className="text-xs text-[#6B7A99] font-medium">Financial Progress</span>
              <p className="text-2xl font-bold text-[#0F1B3D] mt-1 tabular-nums">
                {district.financial}%
              </p>
              <ProgressBar value={district.financial} color="orange" height="h-1.5" className="mt-2" />
            </div>

            <div className="p-4 rounded-xl bg-white border border-rose-200 bg-rose-50/50 shadow-sm">
              <span className="text-xs text-rose-600 font-medium">Delayed Works</span>
              <p className="text-2xl font-bold text-rose-600 mt-1 tabular-nums">
                <CountUp end={district.delayed} />
              </p>
              <span className="text-[11px] text-rose-600 font-semibold mt-0.5 block">
                {((district.delayed / district.schools) * 100).toFixed(1)}% of District
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-amber-200 bg-amber-50/50 shadow-sm">
              <span className="text-xs text-amber-600 font-medium">At Risk</span>
              <p className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">
                <CountUp end={district.atRisk} />
              </p>
              <span className="text-[11px] text-amber-600 font-semibold mt-0.5 block">Urgent Review</span>
            </div>
          </div>

          {/* Middle Row: District Map (Blocks) & Programme-wise Progress */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
            {/* Left Card: District Map (Jabalpur Blocks) */}
            <div className="xl:col-span-7 bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF3]">
                <div>
                  <h3 className="text-sm font-bold text-[#0F1B3D]">
                    {district.name} Tehsil & Block Map
                  </h3>
                  <p className="text-xs text-[#6B7A99]">Click any location pin to view school status</p>
                </div>
                <span className="text-xs font-semibold text-primary">7 Blocks Monitored</span>
              </div>

              {/* Map SVG Graphic */}
              <div className="relative w-full h-[280px] bg-slate-50 rounded-xl border border-slate-200 mt-3 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 500 300" className="w-full h-full">
                  {/* Styled polygon blocks */}
                  <path d="M 50 120 L 150 40 L 280 30 L 420 70 L 460 200 L 380 270 L 220 280 L 80 230 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M 150 40 L 280 30 L 290 140 L 170 150 Z" fill="#EEF2F6" stroke="#CBD5E1" strokeWidth="1" />
                  <path d="M 280 30 L 420 70 L 380 160 L 290 140 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
                  <path d="M 170 150 L 290 140 L 320 250 L 190 260 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />

                  {/* Block labels */}
                  <text x="210" y="90" fontSize="11" fill="#64748B" fontWeight="bold">Panagar</text>
                  <text x="340" y="110" fontSize="11" fill="#64748B" fontWeight="bold">Sihora</text>
                  <text x="220" y="190" fontSize="11" fill="#2563EB" fontWeight="bold">Jabalpur Urban</text>
                  <text x="350" y="210" fontSize="11" fill="#64748B" fontWeight="bold">Kundam</text>
                  <text x="90" y="180" fontSize="11" fill="#64748B" fontWeight="bold">Patan</text>
                </svg>

                {/* Pins */}
                {blockPins.map((pin) => (
                  <button
                    key={pin.id}
                    onClick={() => setSelectedPin(pin)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-1 group transition-transform hover:scale-125"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md ring-2 ring-white",
                        pin.status === "At Risk"
                          ? "bg-rose-500"
                          : pin.status === "Delayed"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      )}
                    >
                      <MapPin className="w-3 h-3" />
                    </div>
                  </button>
                ))}

                {/* Pin Popover */}
                {selectedPin && (
                  <div
                    className="absolute z-20 p-3 rounded-xl bg-white border border-[#E5EAF3] shadow-xl text-xs space-y-1 min-w-[200px]"
                    style={{ left: `${Math.min(selectedPin.x, 70)}%`, top: `${Math.max(selectedPin.y - 25, 10)}%` }}
                  >
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="font-bold text-[#0F1B3D]">{selectedPin.name}</span>
                      <button onClick={() => setSelectedPin(null)}>
                        <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#6B7A99]">Block: {selectedPin.block}</p>
                    <p className="text-[11px] text-[#0F1B3D] font-medium">Scheme: {selectedPin.prog}</p>
                    <div className="flex justify-between items-center pt-1">
                      <StatusPill status={selectedPin.status} />
                      <Link href={`/school/${selectedPin.udise}`} className="text-primary font-bold hover:underline">
                        View School →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Card: Programme-wise Progress */}
            <div className="xl:col-span-5 bg-white rounded-2xl border border-[#E5EAF3] p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F1B3D] pb-3 border-b border-[#E5EAF3]">
                  Programme-wise Progress ({district.name})
                </h3>

                <div className="mt-4 space-y-4 text-xs">
                  {[
                    { name: "PM SHRI", val: district.programmeProgress.pmShri },
                    { name: "LEP (Foundational)", val: district.programmeProgress.lep },
                    { name: "TLM Kits", val: district.programmeProgress.tlm },
                    { name: "Smart Classroom", val: district.programmeProgress.smartClass },
                    { name: "School Infrastructure", val: district.programmeProgress.infra },
                  ].map((p) => (
                    <div key={p.name} className="space-y-1.5">
                      <div className="flex justify-between items-center font-semibold text-[#0F1B3D]">
                        <span>{p.name}</span>
                        <span className="font-bold text-emerald-600">{p.val}%</span>
                      </div>
                      <ProgressBar value={p.val} color="success" height="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5EAF3] text-[11px] text-[#6B7A99]">
                Critical lag noted in Smart Classroom and TLM Kit deliveries.
              </div>
            </div>
          </div>

          {/* Bottom Card: Delayed Schools (32) + View All */}
          <div className="bg-white rounded-2xl border border-[#E5EAF3] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#E5EAF3] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F1B3D]">
                Delayed Schools ({district.delayed})
              </h3>
              <Link href="/schools" className="text-xs font-bold text-primary hover:underline">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[11px] text-[#6B7A99] border-b border-[#E5EAF3] bg-slate-50 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">School Name</th>
                    <th className="py-2.5 px-3">Programme</th>
                    <th className="py-2.5 px-3 text-right">Delay (Days)</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF3]">
                  {delayedSchools.map((s) => (
                    <tr key={s.rank} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono text-[#6B7A99]">{s.rank}</td>
                      <td className="py-3 px-3 font-bold text-[#0F1B3D]">{s.name}</td>
                      <td className="py-3 px-3 text-[#6B7A99]">{s.prog}</td>
                      <td className="py-3 px-3 text-right font-bold text-rose-600 tabular-nums">
                        {s.delay}
                      </td>
                      <td className="py-3 px-3">
                        <StatusPill status={s.status} />
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/school/${s.udise}`}
                          className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-primary hover:text-white text-primary text-xs font-bold transition-colors inline-block"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Other Tabs show rich mock content */}
      {activeTab !== "overview" && (
        <div className="bg-white rounded-2xl border border-[#E5EAF3] p-6 shadow-sm text-xs">
          <h3 className="text-sm font-bold text-[#0F1B3D] uppercase tracking-wider mb-3">
            {district.name} District • {activeTab.toUpperCase()} Matrix
          </h3>
          <p className="text-[#6B7A99] mb-4">
            Displaying official monitoring records for {district.name} under State Programme Directorate.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-[#E5EAF3] text-[11px] text-[#6B7A99]">
                <tr>
                  <th className="p-2.5">Reference ID</th>
                  <th className="p-2.5">Institution / Entity</th>
                  <th className="p-2.5">Component</th>
                  <th className="p-2.5 text-right">Progress</th>
                  <th className="p-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF3]">
                {delayedSchools.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono text-primary font-bold">JBP-{20260 + idx}</td>
                    <td className="p-2.5 font-semibold text-[#0F1B3D]">{s.name}</td>
                    <td className="p-2.5 text-[#6B7A99]">{s.prog}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-600">62%</td>
                    <td className="p-2.5 text-right"><StatusPill status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
