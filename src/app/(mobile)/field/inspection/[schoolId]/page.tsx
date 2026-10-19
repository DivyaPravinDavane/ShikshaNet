"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  School,
  Navigation,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  MapPin,
  Camera,
  FileText,
  Check,
  X,
  ShieldCheck,
  Upload,
  ExternalLink,
  Printer,
  Save,
  Compass,
} from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { ProgressBar } from "@/components/common/ProgressBar";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  status: "Completed" | "In Progress" | "Pending";
  remarks?: string;
}

export default function FieldInspectionPage() {
  const router = useRouter();
  const params = useParams();
  const schoolId = (params?.schoolId as string) || "23140101235";

  const [activeTab, setActiveTab] = useState<"checklist" | "photos" | "gps" | "notes">("checklist");
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [navMapOpen, setNavMapOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Form State
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "c1", label: "Classroom civil refurbishment & whitewash", category: "Civil Works", status: "Completed", remarks: "All 4 classrooms completed with fresh distemper." },
    { id: "c2", label: "Student dual-desk furniture installed", category: "Furniture", status: "Completed", remarks: "40 dual desks verified in classroom 1 & 2." },
    { id: "c3", label: "TLM foundational learning kits received", category: "Learning Material", status: "In Progress", remarks: "Batch 1 received, Grade 3 maths kit pending delivery." },
    { id: "c4", label: "Interactive smart board 75\" installation", category: "Digital Infra", status: "Pending", remarks: "Wall bracket fixed; power cabling under inspection." },
    { id: "c5", label: "Separate boys & girls toilets functional", category: "Sanitation", status: "Completed", remarks: "Running water tap connection and overhead tank operational." },
    { id: "c6", label: "Playground boundary fencing & levelling", category: "Civil Works", status: "Pending", remarks: "Vendor levelling work scheduled for next week." },
  ]);

  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  ]);

  const [gpsCaptured, setGpsCaptured] = useState(true);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number; accuracy: number }>({
    lat: 23.1795,
    lng: 79.989,
    accuracy: 8,
  });

  const [notes, setNotes] = useState(
    "Classroom civil refurbishment verified on site. Electrical earthing resistance test conducted with vendor engineer. Smart board wiring pending approval from PWD Electrical Cell."
  );
  const [certified, setCertified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const completedCount = checklist.filter((c) => c.status === "Completed").length;
  const progressPct = Math.round((completedCount / checklist.length) * 100);

  const handleUpdateChecklist = (status: "Completed" | "In Progress" | "Pending", remarks?: string) => {
    if (!selectedItem) return;
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? { ...item, status, remarks: remarks !== undefined ? remarks : item.remarks }
          : item
      )
    );
    setSelectedItem(null);
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotos((prev) => [...prev, url]);
    }
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCaptureGps = () => {
    setGpsCaptured(true);
    setGpsCoords({
      lat: 23.1795 + (Math.random() - 0.5) * 0.001,
      lng: 79.989 + (Math.random() - 0.5) * 0.001,
      accuracy: 6,
    });
  };

  const handleSubmit = () => {
    if (photos.length === 0) {
      setErrorMessage("Please capture at least 1 verified photographic evidence.");
      return;
    }
    if (!gpsCaptured) {
      setErrorMessage("Please verify GPS location coordinates first.");
      return;
    }
    if (!certified) {
      setErrorMessage("Please check the official declaration certifying physical inspection.");
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 px-6">
        <div className="p-10 rounded-2xl bg-[#0F1B3D] border border-border/80 shadow-2xl flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              Audit Stamped & Sealed
            </span>
            <h1 className="text-2xl font-bold text-white mt-3">
              Field Inspection Successfully Logged
            </h1>
            <p className="text-sm text-text-muted max-w-md mx-auto mt-2 leading-relaxed">
              Geotagged physical verification data for <span className="text-white font-semibold">Govt Primary School, Ranjhi</span> (UDISE: {schoolId}) has been uploaded to the Madhya Pradesh State Data Centre with SHA-256 cryptographic seal.
            </p>
          </div>

          {/* Audit Verification Certificate Box */}
          <div className="w-full max-w-lg p-5 rounded-xl bg-[#0A1128] border border-border text-left font-mono text-xs space-y-2">
            <div className="flex justify-between text-text-muted">
              <span>Transaction Ref:</span>
              <span className="text-primary font-bold">INS-MP-2026-99214</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Auditing Officer:</span>
              <span className="text-white">Rajesh Verma (BEO Jabalpur)</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Geo-Coordinates:</span>
              <span className="text-white">23.1795° N, 79.9890° E (±8m)</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Items Verified:</span>
              <span className="text-emerald-400 font-bold">{completedCount} of {checklist.length} Completed</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Security Hash:</span>
              <span className="text-text-muted/60 truncate max-w-[200px]">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                router.push("/inspections");
              }}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-primaryGlow"
            >
              Back to Inspections Directory
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-border text-xs font-semibold text-text-muted hover:text-white transition-all"
            >
              Review Stamped Inspection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/inspections"
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
              <Link href="/inspections" className="hover:text-primary transition-colors">
                Inspections
              </Link>
              <span>/</span>
              <span className="text-white font-medium">On-Site Verification</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">
              School Physical Inspection Cockpit
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-[#0F1B3D] border border-border/80 hover:border-primary/40 text-xs font-semibold text-text-muted hover:text-white transition-all flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Checklist</span>
          </button>
          <button
            onClick={() => setNavMapOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-primary/20 border border-primary/40 hover:bg-primary/30 text-xs font-bold text-primary transition-all flex items-center gap-2"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Navigate Route</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 card-glow flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary border border-primary/40 flex items-center justify-center shrink-0">
            <School className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-lg font-bold text-white">Govt Primary School, Ranjhi</h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PM SHRI Scheme
              </span>
              <StatusPill status="In Progress" />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted mt-1.5">
              <span>UDISE Code: <strong className="text-white font-mono">{schoolId}</strong></span>
              <span>•</span>
              <span>District: <strong className="text-white">Jabalpur</strong></span>
              <span>•</span>
              <span>Block: <strong className="text-white">Jabalpur Urban</strong></span>
              <span>•</span>
              <span>Officer: <strong className="text-white">Rajesh Verma (BEO)</strong></span>
            </div>
          </div>
        </div>

        {/* Progress Card in Hero */}
        <div className="w-full lg:w-72 p-4 rounded-xl bg-[#0A1128] border border-border/80 space-y-2 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-muted">Inspection Progress</span>
            <span className="font-bold text-emerald-400 tabular-nums">{progressPct}% Verified</span>
          </div>
          <ProgressBar value={progressPct} color="success" height="h-2.5" />
          <div className="flex items-center justify-between text-[11px] text-text-muted">
            <span>{completedCount} of {checklist.length} parameters passed</span>
            <span className="text-primary font-semibold">Live Audit</span>
          </div>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Checklist Progress</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1.5 tabular-nums">
            {completedCount} <span className="text-sm font-normal text-text-muted">/ {checklist.length}</span>
          </p>
          <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
            {checklist.filter((c) => c.status === "Pending").length} pending verification
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Geotagged Photos</span>
            <Camera className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-white mt-1.5 tabular-nums">
            {photos.length} <span className="text-sm font-normal text-text-muted">Uploaded</span>
          </p>
          <span className="text-[11px] text-text-muted block mt-0.5">High-resolution audit proof</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">GPS Telemetry</span>
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-1.5">Geo-Verified</p>
          <span className="text-[11px] text-text-muted block mt-0.5">Accuracy ±{gpsCoords.accuracy}m at school site</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border/80">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Geofence Proximity</span>
            <Compass className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-1.5 tabular-nums">12 meters</p>
          <span className="text-[11px] text-emerald-400 block mt-0.5">Inside authorized boundary</span>
        </div>
      </div>

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Checklist, Photos & Notes */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Verification Checklist */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Physical Verification Checklist
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Click any item to change status, update remarks, or record defects.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-border text-text-muted">
                {checklist.length} Mandatory Items
              </span>
            </div>

            <div className="space-y-2.5">
              {checklist.map((item) => {
                const isCompleted = item.status === "Completed";
                const isInProgress = item.status === "In Progress";

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={cn(
                      "p-4 rounded-xl border transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                      isCompleted
                        ? "bg-emerald-500/[0.04] border-emerald-500/30 hover:border-emerald-500/60"
                        : isInProgress
                        ? "bg-amber-500/[0.04] border-amber-500/30 hover:border-amber-500/60"
                        : "bg-white/[0.02] border-border/70 hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 sm:mt-0",
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : isInProgress
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                            : "bg-rose-500/20 text-rose-400 border-rose-500/40"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4" />
                        ) : isInProgress ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-white group-hover:text-primary transition-colors">
                            {item.label}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-text-muted border border-white/10 hidden sm:inline">
                            {item.category}
                          </span>
                        </div>
                        {item.remarks && (
                          <p className="text-xs text-text-muted mt-1 leading-relaxed">
                            {item.remarks}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <StatusPill status={item.status} />
                      <button className="text-xs font-semibold text-primary group-hover:underline px-2 py-1 rounded hover:bg-primary/10 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Photographic Evidence Gallery */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Photographic Evidence Gallery
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  High-resolution site captures stamped with time and geo-coordinates.
                </p>
              </div>

              <label className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold cursor-pointer transition-all flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Evidence Photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {photos.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden border border-border group bg-black/40"
                >
                  <img
                    src={url}
                    alt={`Audit Evidence ${i + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                    <button
                      onClick={() => setPreviewPhoto(url)}
                      className="text-[10px] text-white font-semibold hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(i)}
                      className="p-1 rounded-md bg-rose-500/80 text-white hover:bg-rose-600 transition-colors"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-emerald-400">
                    Photo #{i + 1}
                  </div>
                </div>
              ))}

              {/* Upload Dropzone */}
              <label className="aspect-video rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 flex flex-col items-center justify-center text-primary cursor-pointer transition-all">
                <Upload className="w-5 h-5 mb-1" />
                <span className="text-xs font-bold">+ Upload Photo</span>
                <span className="text-[10px] text-text-muted mt-0.5">JPEG / PNG</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
              </label>
            </div>
          </div>

          {/* Section 3: Field Officer Observations */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Field Officer Observations & Structural Remarks
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full bg-[#0A1128] border border-border/80 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary leading-relaxed"
              placeholder="Record structural defects, contractor material quality, principal remarks, and site readiness..."
            />
            <div className="flex items-center justify-between text-[11px] text-text-muted">
              <span>This statement will be permanently recorded in the State Audit Register.</span>
              <span className="font-mono">{notes.length} / 1000 characters</span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): GPS Telemetry, School Authority, and Final Submission */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Telemetry Card */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                GPS Telemetry
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Active Lock
              </span>
            </div>

            {/* Radar / Pin Visual Box */}
            <div className="h-36 rounded-xl bg-[#0A1128] border border-border/80 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2F80FF_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center animate-ping absolute opacity-20" />
              <div className="w-16 h-16 rounded-full border border-emerald-400/40 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/60 flex items-center justify-center font-bold text-xs shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[10px] text-text-muted bg-[#0F1B3D]/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-border">
                <span>Ranjhi, Jabalpur</span>
                <span className="text-emerald-400 font-bold">12m from School Gate</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono p-3 rounded-xl bg-[#0A1128] border border-border/60 text-text-muted">
              <div className="flex justify-between">
                <span>Latitude:</span>
                <span className="text-white font-bold">{gpsCoords.lat.toFixed(5)}° N</span>
              </div>
              <div className="flex justify-between">
                <span>Longitude:</span>
                <span className="text-white font-bold">{gpsCoords.lng.toFixed(5)}° E</span>
              </div>
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span className="text-emerald-400 font-bold">±{gpsCoords.accuracy} meters</span>
              </div>
              <div className="flex justify-between">
                <span>Time Stamp:</span>
                <span className="text-white">19-Oct-2026 18:25 IST</span>
              </div>
            </div>

            <button
              onClick={handleCaptureGps}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-border text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-primary" />
              <span>Re-Acquire Satellite Signal</span>
            </button>
          </div>

          {/* School & Vendor Authority Details */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Administrative Context
            </h3>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  School Headmaster
                </span>
                <p className="text-white font-bold mt-0.5">Smt. Pushpa Tiwari</p>
                <span className="text-[11px] text-text-muted">Present during physical audit</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  Executing Vendor
                </span>
                <p className="text-white font-bold mt-0.5">MPSEDC Digital Infra Ltd</p>
                <span className="text-[11px] text-text-muted">Contract Ref: WO-2026-9812</span>
              </div>

              <div className="p-3 rounded-xl bg-[#0A1128] border border-border/60">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block font-semibold">
                  Sanctioned Scheme
                </span>
                <p className="text-primary font-bold mt-0.5">PM SHRI Phase II</p>
                <span className="text-[11px] text-text-muted">Budget Allocated: ₹18.4 Lakh</span>
              </div>
            </div>
          </div>

          {/* Submission Card */}
          <div className="p-6 rounded-2xl bg-[#0F1B3D] border border-border/80 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Official Attestation
            </h3>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-[#0A1128] border border-border/60 hover:border-primary/40 transition-colors">
              <input
                type="checkbox"
                checked={certified}
                onChange={(e) => setCertified(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded bg-[#070D1E] border-border text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-xs text-text-muted leading-relaxed select-none">
                I solemnly certify that I have conducted this physical audit on site at Govt Primary School, Ranjhi, and all photographic evidence is genuine.
              </span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-primaryGlow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting & Digitally Signing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Signed Inspection</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Item Edit Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#0F1B3D] border border-border p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <div>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                  Update Parameter Status
                </span>
                <h3 className="font-bold text-sm text-white mt-0.5">{selectedItem.label}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-lg text-text-muted hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-text-muted block">Select Verification Status:</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Completed", "In Progress", "Pending"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateChecklist(st)}
                    className={cn(
                      "p-3 rounded-xl border font-bold text-center transition-all",
                      selectedItem.status === st
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-[#0A1128] border-border text-text-muted hover:text-white hover:border-primary/50"
                    )}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-text-muted block">Inspector Remarks for this Item:</label>
              <input
                type="text"
                defaultValue={selectedItem.remarks || ""}
                id="modal-remark-input"
                placeholder="e.g. 40 units verified, earthing test passed"
                className="w-full bg-[#0A1128] border border-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border/80">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById("modal-remark-input") as HTMLInputElement;
                  handleUpdateChecklist(selectedItem.status, input?.value);
                }}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-xs font-bold text-white shadow-primaryGlow"
              >
                Save Parameter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-border bg-[#0F1B3D]">
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={previewPhoto} alt="Evidence Preview" className="w-full max-h-[80vh] object-contain" />
            <div className="p-4 bg-[#0F1B3D] border-t border-border flex justify-between items-center text-xs text-text-muted">
              <span>Govt Primary School Ranjhi • On-Site Geotagged Capture</span>
              <span className="font-mono text-emerald-400">23.1795° N, 79.9890° E</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      {navMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#0F1B3D] border border-border p-5 text-xs space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border pb-2.5">
              <span className="font-bold text-sm text-white">Route Navigation</span>
              <button onClick={() => setNavMapOpen(false)}>
                <X className="w-4 h-4 text-text-muted hover:text-white" />
              </button>
            </div>
            <p className="text-text-muted leading-relaxed">
              Target: <strong className="text-white">Govt Primary School, Ranjhi</strong><br />
              Turn right onto Sector 3 Main Road • Estimated arrival in 6 mins (2.4 km) from BEO HQ.
            </p>
            <button
              onClick={() => setNavMapOpen(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold shadow-primaryGlow"
            >
              Start Turn-by-Turn Guidance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
