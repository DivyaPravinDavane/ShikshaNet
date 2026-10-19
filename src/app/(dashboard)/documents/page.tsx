"use client";

import React, { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  Image as ImageIcon,
  Search,
  Upload,
  Download,
  CheckCircle2,
  Calendar,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [uploadToast, setUploadToast] = useState(false);

  const docs = [
    { id: "DOC-001", name: "State_Programme_Cabinet_Sanction_2026-27.pdf", type: "pdf", size: "4.2 MB", uploader: "Finance Dept", date: "15 Apr 2026", downloads: 412 },
    { id: "DOC-002", name: "District_Wise_Allocation_Matrix_v3.xlsx", type: "xlsx", size: "1.8 MB", uploader: "SPD Office", date: "10 Apr 2026", downloads: 825 },
    { id: "DOC-003", name: "Smart_Classroom_Technical_SLA_Guidelines.pdf", type: "pdf", size: "3.5 MB", uploader: "Tech Cell", date: "02 May 2026", downloads: 619 },
    { id: "DOC-004", name: "Govt_HS_Ranjhi_Site_Handover_Inspection.jpg", type: "image", size: "2.4 MB", uploader: "R. K. Verma (BEO)", date: "12 Apr 2027", downloads: 142 },
    { id: "DOC-005", name: "Vendor_XYZ_Penalty_ShowCause_Notice.pdf", type: "pdf", size: "1.1 MB", uploader: "Procurement Desk", date: "28 Mar 2027", downloads: 205 },
    { id: "DOC-006", name: "NEP_Foundational_TLM_Catalog_2026.pdf", type: "pdf", size: "6.8 MB", uploader: "State Pedagogy Board", date: "15 Jan 2027", downloads: 1140 },
    { id: "DOC-007", name: "GeoTagged_Classroom_Renovation_Batch_Rewa.zip", type: "image", size: "18.5 MB", uploader: "S. P. Mishra (BRC)", date: "05 Apr 2027", downloads: 78 },
    { id: "DOC-008", name: "Monthly_Progress_Reconciliation_Q3.xlsx", type: "xlsx", size: "2.1 MB", uploader: "Accounts Officer", date: "31 Mar 2027", downloads: 350 },
  ];

  const getDocIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-rose-400" />;
      case "xlsx":
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      default:
        return <ImageIcon className="w-5 h-5 text-primary" />;
    }
  };

  const filtered = docs.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.uploader.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || d.type === filterType;
    return matchSearch && matchType;
  });

  const handleUploadMock = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadToast(true);
      setTimeout(() => setUploadToast(false), 4000);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-6 space-y-6 select-none">
      {/* Toast */}
      {uploadToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-semibold">Document uploaded and indexed into ShikshaNet repository successfully!</span>
          <button onClick={() => setUploadToast(false)} className="ml-2 hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-wider text-white">
            Programme Documents & Circulars
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Government Sanctions, Tenders, Inspection Reports & Guidelines
          </p>
        </div>

        {/* Upload Mock Button */}
        <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-sm cursor-pointer self-start">
          <Upload className="w-4 h-4" />
          <span>Upload Official Document</span>
          <input type="file" className="hidden" onChange={handleUploadMock} />
        </label>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search document title, officer, ref..."
            className="w-full bg-card border border-border/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          {["all", "pdf", "xlsx", "image"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all",
                filterType === t
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-text-muted hover:text-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-2xl bg-card border border-border/80 card-glow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider bg-card-2">
              <tr>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">File Name</th>
                <th className="py-2.5 px-3">Uploaded By</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">File Size</th>
                <th className="py-2.5 px-3 text-right">Downloads</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-3 px-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-border/60 flex items-center justify-center">
                      {getDocIcon(d.type)}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-white block hover:text-primary transition-colors cursor-pointer">
                      {d.name}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">{d.id}</span>
                  </td>
                  <td className="py-3 px-3 text-text-muted">{d.uploader}</td>
                  <td className="py-3 px-3 font-mono text-text-muted">{d.date}</td>
                  <td className="py-3 px-3 font-mono text-text-muted">{d.size}</td>
                  <td className="py-3 px-3 text-right tabular-nums text-text-muted">{d.downloads}</td>
                  <td className="py-3 px-3 text-right">
                    <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-primary hover:text-white text-primary text-[11px] font-semibold transition-colors inline-flex items-center gap-1.5">
                      <Download className="w-3 h-3" /> Download
                    </button>
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
