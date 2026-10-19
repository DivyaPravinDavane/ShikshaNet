"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, UsersRound, Phone, Mail, Star, Building2, CheckCircle2 } from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { ProgressBar } from "@/components/common/ProgressBar";
import vendorsData from "@/data/vendors.json";
import projectsData from "@/data/projects.json";

export default function VendorDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) || "v1";

  const vendor = vendorsData.find((v) => v.id === id) || vendorsData[0];
  const activeProjects = projectsData.filter((p) =>
    p.vendor.toLowerCase().includes(vendor.name.toLowerCase().split(" ")[0])
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 space-y-6 select-none">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Vendors List
      </button>

      {/* Header */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 card-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center border border-primary/40 shrink-0">
            <UsersRound className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {vendor.name}
              </h1>
              <StatusPill status={vendor.status} />
            </div>
            <p className="text-xs text-text-muted mt-1">
              Contact: {vendor.contact} • {vendor.email} • {vendor.phone}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-base justify-end">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{vendor.rating} / 5.0 Rating</span>
          </div>
          <span className="text-xs text-text-muted mt-0.5 block">
            Rank #{vendor.rank} in MP Empanelment
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Total Portfolio Value</span>
          <p className="text-2xl font-bold text-white mt-1">₹{vendor.valueCr} Cr</p>
          <span className="text-[11px] text-text-muted">{vendor.projects} Sanctioned Work Orders</span>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">On-Time Execution Rate</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{vendor.onTime}%</p>
          <ProgressBar value={vendor.onTime} color="success" height="h-2" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Delay Index</span>
          <p className="text-2xl font-bold text-rose-400 mt-1">{vendor.delay}%</p>
          <ProgressBar value={vendor.delay} color="danger" height="h-2" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Operational Territories</span>
          <p className="text-sm font-semibold text-white mt-2 leading-relaxed">
            {vendor.districts.join(", ")}
          </p>
        </div>
      </div>

      {/* Projects Assigned Table */}
      <div className="rounded-2xl bg-card border border-border/80 p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          Assigned Works for {vendor.name}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider bg-card-2">
              <tr>
                <th className="py-2.5 px-3">Project ID</th>
                <th className="py-2.5 px-3">School Name</th>
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Programme</th>
                <th className="py-2.5 px-3 text-right">Value (₹ Lakh)</th>
                <th className="py-2.5 px-3 text-right">Physical %</th>
                <th className="py-2.5 px-3 text-right">Delay</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {activeProjects.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-primary font-semibold">{p.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-white">{p.school}</td>
                  <td className="py-2.5 px-3 text-text-muted">{p.district}</td>
                  <td className="py-2.5 px-3 text-white">{p.programme}</td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-bold text-white">
                    {p.valueLakh}
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums font-bold text-emerald-400">
                    {p.physical}%
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums text-rose-400 font-semibold">
                    {p.delayDays}d
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <StatusPill status={p.status} />
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
