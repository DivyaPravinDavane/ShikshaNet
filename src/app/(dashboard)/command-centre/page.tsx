"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Layers, Sparkles, SlidersHorizontal, Map } from "lucide-react";
import { Option1Full } from "@/features/command-centre/Option1Full";
import { Option1Compact } from "@/features/command-centre/Option1Compact";
import { Option2ProgrammeFocus } from "@/features/command-centre/Option2ProgrammeFocus";
import { Option3AiDecisions } from "@/features/command-centre/Option3AiDecisions";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";

function CommandCentreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { variant, setVariant, density, setDensity } = useAppStore();

  // Read URL params or fallback to store
  const urlVariant = (searchParams.get("variant") as "1" | "2" | "3") || variant;
  const urlDensity = (searchParams.get("density") as "normal" | "compact") || density;

  const handleVariantChange = (newVariant: "1" | "2" | "3") => {
    setVariant(newVariant);
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", newVariant);
    router.push(`/command-centre?${params.toString()}`);
  };

  const handleDensityToggle = () => {
    const nextDensity = urlDensity === "normal" ? "compact" : "normal";
    setDensity(nextDensity);
    const params = new URLSearchParams(searchParams.toString());
    params.set("density", nextDensity);
    router.push(`/command-centre?${params.toString()}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Layout Variant Toolbar (for Principal Secretary) */}
      <div className="bg-[#0B1330]/90 border-b border-border/60 px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
        {/* Segmented Control for 3 Variants */}
        <div className="flex items-center gap-1 bg-[#0A1128] p-1 rounded-xl border border-border/80">
          <button
            onClick={() => handleVariantChange("1")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all",
              urlVariant === "1"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-white"
            )}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Option 1 – Map Focus</span>
          </button>

          <button
            onClick={() => handleVariantChange("2")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all",
              urlVariant === "2"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-white"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Option 2 – Programme Focus</span>
          </button>

          <button
            onClick={() => handleVariantChange("3")}
            className={cn(
              "px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all",
              urlVariant === "3"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-white"
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-warning" />
            <span>Option 3 – AI + Decisions</span>
          </button>
        </div>

        {/* Density toggle (visible only on Option 1) */}
        {urlVariant === "1" && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-text-muted font-medium">Layout Density:</span>
            <button
              onClick={handleDensityToggle}
              className={cn(
                "px-3 py-1 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5",
                urlDensity === "compact"
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-white/5 border-border text-text-muted hover:text-white"
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{urlDensity === "compact" ? "Compact Density (Screen 2)" : "Full Detail (Screen 1)"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Render Variant */}
      <div className="flex-1">
        {urlVariant === "1" && (urlDensity === "compact" ? <Option1Compact /> : <Option1Full />)}
        {urlVariant === "2" && <Option2ProgrammeFocus />}
        {urlVariant === "3" && <Option3AiDecisions />}
      </div>
    </div>
  );
}

export default function CommandCentrePage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 space-y-4 animate-pulse">
          <div className="h-24 bg-card rounded-xl" />
          <div className="h-96 bg-card rounded-xl" />
        </div>
      }
    >
      <CommandCentreContent />
    </Suspense>
  );
}
