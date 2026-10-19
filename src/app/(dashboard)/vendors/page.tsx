"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, UsersRound, Star, Phone, Mail, ChevronRight } from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import vendorsData from "@/data/vendors.json";
import { cn } from "@/lib/utils";

export default function VendorsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = vendorsData.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.contact.toLowerCase().includes(search.toLowerCase()) ||
    v.districts.some((d) => d.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Empanelled Contractors & Vendors
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Performance Scorecards, SLA Tracking & Active Work Orders
          </p>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendor name, contact, district..."
            className="w-full bg-card border border-border/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      {/* Vendors Table */}
      <div className="rounded-2xl bg-card border border-border/80 card-glow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider bg-card-2">
              <tr>
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Vendor / Enterprise</th>
                <th className="py-2.5 px-3 text-right">Projects</th>
                <th className="py-2.5 px-3 text-right">Value (₹ Cr)</th>
                <th className="py-2.5 px-3 text-right">On-Time %</th>
                <th className="py-2.5 px-3 text-right">Delay %</th>
                <th className="py-2.5 px-3">Active Districts</th>
                <th className="py-2.5 px-3 text-right">Rating</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  onClick={() => router.push(`/vendors/${v.id}`)}
                  className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 font-mono text-text-muted">{v.rank}</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-white group-hover:text-primary transition-colors block">
                      {v.name}
                    </span>
                    <span className="text-[11px] text-text-muted">{v.contact}</span>
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-text-muted">{v.projects}</td>
                  <td className="py-3 px-3 text-right tabular-nums font-bold text-white">
                    ₹{v.valueCr}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums font-bold text-emerald-400">
                    {v.onTime}%
                  </td>
                  <td
                    className={cn(
                      "py-3 px-3 text-right tabular-nums font-bold",
                      v.delay >= 30 ? "text-rose-400" : "text-text-muted"
                    )}
                  >
                    {v.delay}%
                  </td>
                  <td className="py-3 px-3 text-text-muted">
                    {v.districts.join(", ")}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center gap-1 font-bold text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {v.rating}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <StatusPill status={v.status} />
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
