"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { ProgressBar } from "@/components/common/ProgressBar";
import schoolsData from "@/data/schools.json";

export default function SchoolDetailPage() {
  const router = useRouter();
  const params = useParams();
  const udise = (params?.udise as string) || "23140101234";

  const school = schoolsData.find((s) => s.udise === udise) || schoolsData[0];

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 space-y-6 select-none">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Schools Directory
        </button>

        {/* View in Principal Portal Link */}
        <Link
          href={`/school/${school.udise}`}
          className="px-3 py-1.5 rounded-lg bg-primary/20 hover:bg-primary text-primary hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Switch to Principal Portal View</span>
        </Link>
      </div>

      {/* Header */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 card-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center border border-primary/40 shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">
                {school.name}
              </h1>
              <StatusPill status={school.status} />
            </div>
            <p className="text-xs text-text-muted mt-1">
              UDISE: <span className="font-mono text-primary font-semibold">{school.udise}</span> • District: {school.district} • Block: {school.block}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-text-muted block">Enrolment & Faculty</span>
          <span className="text-sm font-bold text-white">
            {school.students} Students • {school.teachers} Teachers
          </span>
        </div>
      </div>

      {/* Progress & Scheme Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Active Scheme</span>
          <p className="text-base font-bold text-white mt-1">{school.activeProgramme}</p>
          <span className="text-xs text-amber-400 font-semibold block mt-1">
            Status: {school.activeProgrammeStatus}
          </span>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Physical Completion</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{school.physicalProgress}%</p>
          <ProgressBar value={school.physicalProgress} color="success" height="h-2" className="mt-2" />
        </div>
        <div className="p-4 rounded-xl bg-card border border-border/80">
          <span className="text-xs text-text-muted">Sanctioned Work Order</span>
          <p className="text-2xl font-bold text-white mt-1">₹{school.workOrderLakh} Lakh</p>
          <span className="text-xs text-text-muted block mt-1">Received: ₹{school.amountReceivedLakh} Lakh</span>
        </div>
      </div>

      {/* Contact & Principal Info */}
      <div className="p-5 rounded-2xl bg-card border border-border/80 space-y-3 text-xs">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          School Administrative Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-text-muted block text-[11px]">Head of Institution</span>
            <span className="text-sm font-bold text-white">{school.principal}</span>
          </div>
          <div>
            <span className="text-text-muted block text-[11px]">Contact Phone</span>
            <span className="text-sm font-bold text-white font-mono">{school.phone}</span>
          </div>
          <div>
            <span className="text-text-muted block text-[11px]">Address</span>
            <span className="text-sm text-text-muted">{school.address}</span>
          </div>
          <div>
            <span className="text-text-muted block text-[11px]">Empanelled Execution Contractor</span>
            <span className="text-sm font-semibold text-primary">{school.vendor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
