"use client";

import React, { useState } from "react";
import {
  Wallet,
  Coins,
  IndianRupee,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Download,
  Filter,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatusPill } from "@/components/common/StatusPill";
import { CountUp } from "@/components/common/CountUp";
import monthlyTrendData from "@/data/monthlyTrend.json";

export default function FinancePage() {
  const [filterDistrict, setFilterDistrict] = useState("all");

  const financialTrend = monthlyTrendData.map((d) => ({
    month: d.month,
    allocated: Math.round(d.physical * 22),
    released: Math.round(d.financial * 20),
    utilised: Math.round(d.financial * 18),
  }));

  const paymentDisbursements = [
    { id: "TXN-2027-8891", vendor: "ABC Infra Ltd", district: "Indore", scheme: "Smart Classroom", amountCr: 4.8, date: "12 Apr 2027", status: "Completed" },
    { id: "TXN-2027-8892", vendor: "GreenClassrooms", district: "Bhopal", scheme: "PM SHRI", amountCr: 3.5, date: "10 Apr 2027", status: "Completed" },
    { id: "TXN-2027-8893", vendor: "EduBuild Pvt Ltd", district: "Gwalior", scheme: "Infrastructure", amountCr: 4.2, date: "08 Apr 2027", status: "In Progress" },
    { id: "TXN-2027-8894", vendor: "SB Developers", district: "Jabalpur", scheme: "Smart Classroom", amountCr: 3.8, date: "05 Apr 2027", status: "Pending" },
    { id: "TXN-2027-8895", vendor: "Shree Enterprises", district: "Ujjain", scheme: "TLM Kits", amountCr: 2.9, date: "04 Apr 2027", status: "Completed" },
    { id: "TXN-2027-8896", vendor: "XYZ Constructions", district: "Rewa", scheme: "PM SHRI", amountCr: 8.2, date: "02 Apr 2027", status: "Pending" },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Finance & Disbursement Portal
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Budget Allocations, Tranche Releases & Treasury PFMS Reconciliations • FY 2026-27
          </p>
        </div>

        <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-white hover:bg-white/5 transition-all self-start">
          <Download className="w-3.5 h-3.5 text-primary" />
          <span>Export PFMS Ledger</span>
        </button>
      </div>

      {/* KPI Cards: Allocated, Released, Utilised, Pending > 30 days */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80 card-glow">
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <Wallet className="w-4 h-4 text-primary" />
            <span>Budget Allocated</span>
          </div>
          <p className="text-2xl font-bold text-white mt-1 tabular-nums">
            ₹<CountUp end={2480} /> Cr
          </p>
          <span className="text-[11px] text-text-muted mt-0.5 block">State + Central Share</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 card-glow">
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <Coins className="w-4 h-4 text-emerald-400" />
            <span>Funds Released</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
            ₹<CountUp end={1980} /> Cr
          </p>
          <span className="text-[11px] text-emerald-400 mt-0.5 block">79.8% of Total Outlay</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-border/80 card-glow">
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>Utilised (Verified)</span>
          </div>
          <p className="text-2xl font-bold text-white mt-1 tabular-nums">
            ₹<CountUp end={1686} /> Cr
          </p>
          <span className="text-[11px] text-text-muted mt-0.5 block">68% Financial Milestone</span>
        </div>

        <div className="p-4 rounded-xl bg-card border border-rose-500/30 bg-rose-500/10">
          <div className="flex items-center gap-2 text-rose-300 text-xs">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>Pending &gt; 30 Days</span>
          </div>
          <p className="text-2xl font-bold text-rose-400 mt-1 tabular-nums">
            ₹<CountUp end={14.8} decimals={1} /> Cr
          </p>
          <span className="text-[11px] text-rose-300 mt-0.5 block">42 Vendor Claims Pending</span>
        </div>
      </div>

      {/* Chart: Stacked Bar Chart of Monthly Releases */}
      <div className="rounded-2xl bg-card border border-border/80 card-glow p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Monthly Financial Releases & Expenditure Trend (₹ Cr)
          </h3>
          <div className="flex items-center gap-4 text-[11px] text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#2F80FF]" /> Allocated
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]" /> Released
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#8B5CF6]" /> Utilised
            </span>
          </div>
        </div>

        <div className="w-full h-64 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#9AA7C7", fontSize: 11 }} />
              <YAxis tick={{ fill: "#9AA7C7", fontSize: 11 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0F1B3D] border border-border p-3 rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-white border-b border-border/60 pb-1">{label} 2026-27</p>
                        <p className="text-primary">Allocated: ₹{payload[0]?.value} Cr</p>
                        <p className="text-emerald-400">Released: ₹{payload[1]?.value} Cr</p>
                        <p className="text-purple-400">Utilised: ₹{payload[2]?.value} Cr</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="allocated" fill="#2F80FF" radius={[3, 3, 0, 0]} barSize={10} />
              <Bar dataKey="released" fill="#22C55E" radius={[3, 3, 0, 0]} barSize={10} />
              <Bar dataKey="utilised" fill="#8B5CF6" radius={[3, 3, 0, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl bg-card border border-border/80 card-glow overflow-hidden">
        <div className="p-4 border-b border-border/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Recent Electronic Fund Transfers (PFMS Queue)
          </h3>
          <span className="text-xs text-text-muted">Direct Benefit & Vendor Settlements</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider bg-card-2">
              <tr>
                <th className="py-2.5 px-3">Transaction Ref</th>
                <th className="py-2.5 px-3">Payee / Vendor</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Scheme</th>
                <th className="py-2.5 px-3 text-right">Disbursed (₹ Cr)</th>
                <th className="py-2.5 px-3">Release Date</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {paymentDisbursements.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-3 px-3 font-mono font-semibold text-primary">{txn.id}</td>
                  <td className="py-3 px-3 font-semibold text-white">{txn.vendor}</td>
                  <td className="py-3 px-3 text-text-muted">{txn.district}</td>
                  <td className="py-3 px-3 text-white">{txn.scheme}</td>
                  <td className="py-3 px-3 text-right font-bold text-white tabular-nums">
                    ₹{txn.amountCr}
                  </td>
                  <td className="py-3 px-3 text-text-muted font-mono">{txn.date}</td>
                  <td className="py-3 px-3 text-right">
                    <StatusPill status={txn.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
