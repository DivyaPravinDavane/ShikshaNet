"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreVertical,
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
} from "lucide-react";
import { StatusPill } from "@/components/common/StatusPill";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  label: string;
  status: "Completed" | "In Progress" | "Pending";
  remarks?: string;
}

export default function FieldInspectionPage() {
  const router = useRouter();
  const params = useParams();
  const schoolId = (params?.schoolId as string) || "23140101235";

  const [activeTab, setActiveTab] = useState<"checklist" | "photos" | "gps" | "notes">("checklist");
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMapOpen, setNavMapOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);

  // Form State
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "c1", label: "Classroom refurbished", status: "Completed" },
    { id: "c2", label: "Furniture installed", status: "Completed" },
    { id: "c3", label: "TLM kits received", status: "In Progress" },
    { id: "c4", label: "Smart board installation", status: "Pending" },
    { id: "c5", label: "Toilets functional", status: "Completed" },
    { id: "c6", label: "Playground development", status: "Pending" },
  ]);

  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80",
  ]);

  const [gpsCaptured, setGpsCaptured] = useState(true);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number; accuracy: number }>({
    lat: 23.1795,
    lng: 79.989,
    accuracy: 12,
  });

  const [notes, setNotes] = useState("Classroom refurbishment verified. Power back-up testing pending.");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const completedCount = checklist.filter((c) => c.status === "Completed").length;

  const handleUpdateChecklist = (status: "Completed" | "In Progress" | "Pending", remarks?: string) => {
    if (!selectedItem) return;
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id ? { ...item, status, remarks } : item
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
      accuracy: 8,
    });
  };

  const handleSubmit = () => {
    if (photos.length === 0) {
      setErrorMessage("Please capture at least 1 verified photo.");
      return;
    }
    if (!gpsCaptured) {
      setErrorMessage("Please verify GPS location first.");
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  if (submitted) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[600px] text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-bold text-white">Inspection Submitted!</h2>
        <p className="text-xs text-text-muted max-w-xs">
          Geotagged verification data for Govt Primary School, Ranjhi has been logged into the State Data Centre with SHA-256 hash stamp.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            router.push("/inspections");
          }}
          className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-lg"
        >
          View in Inspection Portal
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0A1128] text-white select-none">
      {/* Top Bar */}
      <div className="h-14 px-4 border-b border-border/60 flex items-center justify-between bg-[#0F1B3D] shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => router.back()}
            className="p-1 rounded-lg text-text-muted hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-white">School Inspection</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg text-text-muted hover:text-white"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#0F1B3D] border border-border shadow-2xl py-1 text-xs z-50">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full px-3 py-1.5 text-left text-text-muted hover:text-white hover:bg-white/5"
              >
                Save draft
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full px-3 py-1.5 text-left text-text-muted hover:text-white hover:bg-white/5"
              >
                Report issue
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full px-3 py-1.5 text-left text-text-muted hover:text-white hover:bg-white/5"
              >
                Help & Guide
              </button>
            </div>
          )}
        </div>
      </div>

      {/* School Card */}
      <div className="p-3.5 bg-[#0F1B3D] border-b border-border/60 shrink-0">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white leading-tight">
                Govt Primary School, Ranjhi
              </h2>
              <p className="text-[10px] text-text-muted mt-0.5">
                UDISE: {schoolId} • Distance: 2.4 km
              </p>
            </div>
          </div>

          <button
            onClick={() => setNavMapOpen(true)}
            className="px-2.5 py-1 rounded-lg border border-primary/40 text-primary text-[11px] font-bold hover:bg-primary/20 transition-all flex items-center gap-1 shrink-0"
          >
            <Navigation className="w-3 h-3" />
            Navigate
          </button>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="grid grid-cols-4 border-b border-border/60 text-xs font-semibold bg-[#0F1B3D]/50 shrink-0">
        {(["checklist", "photos", "gps", "notes"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "py-2.5 text-center capitalize transition-all border-b-2",
              activeTab === tab
                ? "border-primary text-primary font-bold"
                : "border-transparent text-text-muted"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5">
        {/* Error message */}
        {errorMessage && (
          <div className="p-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tab 1: Checklist */}
        {activeTab === "checklist" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-text-muted">
              <span>Verification Checklist ({completedCount} of {checklist.length})</span>
              <span className="font-bold text-emerald-400">
                {Math.round((completedCount / checklist.length) * 100)}% Verified
              </span>
            </div>

            <div className="space-y-2">
              {checklist.map((item) => {
                const isCompleted = item.status === "Completed";
                const isInProgress = item.status === "In Progress";

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="p-3 rounded-xl bg-[#0F1B3D] border border-border/70 flex items-center justify-between gap-3 hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 border",
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : isInProgress
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                        )}
                      >
                        {isCompleted ? <Check className="w-3 h-3" /> : isInProgress ? <Clock className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      </div>
                      <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors">
                        {item.label}
                      </span>
                    </div>

                    <StatusPill status={item.status} />
                  </div>
                );
              })}
            </div>

            {/* Photo Strip under Checklist (Image 2 exact match) */}
            <div className="mt-4 pt-3 border-t border-border/50">
              <span className="text-[11px] text-text-muted block mb-2 font-medium">
                Captured Evidence Photos ({photos.length})
              </span>
              <div className="grid grid-cols-4 gap-2">
                {photos.slice(0, 3).map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden border border-border group"
                  >
                    <img src={url} alt="School inspection" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleDeletePhoto(i)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}

                {/* Add Photo Tile */}
                <label className="aspect-square rounded-xl border-2 border-dashed border-primary/50 bg-primary/10 flex flex-col items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-all">
                  <Plus className="w-4 h-4" />
                  <span className="text-[9px] font-bold mt-1">+ Add Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Photos Tab */}
        {activeTab === "photos" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-muted">High-Resolution Geotagged Photos</span>
              <label className="px-3 py-1 rounded-lg bg-primary text-white text-[11px] font-bold cursor-pointer">
                + Take Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {photos.map((p, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border">
                  <img src={p} alt={`Evidence ${i}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleDeletePhoto(i)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: GPS Tab */}
        {activeTab === "gps" && (
          <div className="p-4 rounded-xl bg-[#0F1B3D] border border-border space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">Geographic Telemetry Verification</span>
            </div>
            <div className="space-y-1 text-text-muted text-[11px]">
              <p>Latitude: <span className="font-mono text-white">{gpsCoords.lat.toFixed(5)}° N</span></p>
              <p>Longitude: <span className="font-mono text-white">{gpsCoords.lng.toFixed(5)}° E</span></p>
              <p>Accuracy: <span className="font-mono text-emerald-400">± {gpsCoords.accuracy} meters</span></p>
            </div>

            {gpsCaptured && (
              <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Within 50 m of school
              </div>
            )}

            <button
              onClick={handleCaptureGps}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs mt-2"
            >
              Re-Capture Coordinates
            </button>
          </div>
        )}

        {/* Tab 4: Notes Tab */}
        {activeTab === "notes" && (
          <div className="space-y-2 text-xs">
            <label className="text-text-muted block">Field Officer Observations:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="w-full bg-[#0F1B3D] border border-border rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Record structural defects, component condition, etc."
            />
            <span className="text-[10px] text-text-muted block text-right font-mono">
              {notes.length} / 500 characters
            </span>
          </div>
        )}
      </div>

      {/* Sticky Submit Button */}
      <div className="p-3.5 bg-[#0F1B3D] border-t border-border/60 shrink-0">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <span>Validating & Uploading...</span>
          ) : (
            <span>Submit Inspection</span>
          )}
        </button>
      </div>

      {/* Item Status Bottom Sheet */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-[390px] mx-auto bg-[#0F1B3D] rounded-t-3xl border-t border-border p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-border pb-2">
              <h3 className="font-bold text-sm text-white">{selectedItem.label}</h3>
              <button onClick={() => setSelectedItem(null)}>
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {(["Completed", "In Progress", "Pending"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => handleUpdateChecklist(st)}
                  className={cn(
                    "w-full p-2.5 rounded-xl border text-left font-semibold flex items-center justify-between",
                    selectedItem.status === st
                      ? "bg-primary/20 border-primary text-white"
                      : "bg-white/5 border-border text-text-muted hover:text-white"
                  )}
                >
                  <span>{st}</span>
                  {selectedItem.status === st && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Modal */}
      {navMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xs rounded-2xl bg-[#0F1B3D] border border-border p-4 text-xs space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Route to Govt PS Ranjhi</span>
              <button onClick={() => setNavMapOpen(false)}>
                <X className="w-4 h-4 text-text-muted" />
              </button>
            </div>
            <p className="text-text-muted">
              Turn right onto Sector 3 Main Road • Estimated arrival in 6 mins (2.4 km)
            </p>
            <button
              onClick={() => setNavMapOpen(false)}
              className="w-full py-2 rounded-xl bg-primary text-white font-bold"
            >
              Start GPS Guidance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
