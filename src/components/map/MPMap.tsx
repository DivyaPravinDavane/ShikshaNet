"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus, RotateCcw, Map as MapIcon, List, Flame } from "lucide-react";
import { MP_MAP_CALLOUTS } from "@/data/mp-map-data";
import { REAL_MP_DISTRICTS } from "@/data/mp-real-shapes";
import districtsData from "@/data/districts.json";
import { StatusPill } from "@/components/common/StatusPill";
import { cn } from "@/lib/utils";

type ViewMode = "map" | "list" | "heatmap";

export function MPMap() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeLegendFilter, setActiveLegendFilter] = useState<string | null>(null);

  // Map of district data keyed by id
  const districtMap = React.useMemo(() => {
    const map = new Map<string, typeof districtsData[0]>();
    districtsData.forEach((d) => {
      map.set(d.id.toLowerCase(), d);
    });
    return map;
  }, []);

  const hoveredDistrict = hoveredDistrictId ? districtMap.get(hoveredDistrictId.toLowerCase()) : null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleRecentre = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const getDistrictFill = (districtId: string, physical: number) => {
    // If legend filter active
    if (activeLegendFilter) {
      if (activeLegendFilter === "onTrack" && physical < 75) return "rgba(107, 114, 128, 0.2)";
      if (activeLegendFilter === "watch" && (physical < 50 || physical >= 75)) return "rgba(107, 114, 128, 0.2)";
      if (activeLegendFilter === "atRisk" && physical >= 50) return "rgba(107, 114, 128, 0.2)";
    }

    if (viewMode === "heatmap") {
      // Continuous gradient: 40% (red) to 95% (emerald)
      if (physical >= 85) return "#15803D";
      if (physical >= 75) return "#22C55E";
      if (physical >= 65) return "#EAB308";
      if (physical >= 55) return "#F59E0B";
      if (physical >= 50) return "#F97316";
      return "#EF4444";
    }

    // Standard Choropleth
    if (physical >= 85) return "#16A34A";
    if (physical >= 75) return "#22C55E";
    if (physical >= 60) return "#EAB308";
    if (physical >= 50) return "#F5B301";
    return "#EF4444";
  };

  return (
    <div className="relative w-full h-[410px] bg-[#0A1128]/90 rounded-[12px] border border-border/80 card-glow overflow-hidden flex flex-col select-none">
      {/* Header with Title and Segmented View Switcher */}
      <div className="px-5 py-3 border-b border-border/60 flex items-center justify-between gap-3 bg-[#0B1330]/80 backdrop-blur-sm z-10 shrink-0">
        <div>
          <h2 className="text-[15px] font-bold text-white tracking-tight flex items-center gap-2">
            District Performance Map
          </h2>
          <p className="text-[11px] text-text-muted mt-0.5">
            School Infrastructure & Learning Enhancement Programmes
          </p>
        </div>

        {/* Segmented Control: Map | List | Heatmap */}
        <div className="flex items-center bg-[#0F1B3D] p-0.5 rounded-lg border border-border/80 text-xs">
          <button
            onClick={() => setViewMode("map")}
            className={cn(
              "px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5",
              viewMode === "map"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-white"
            )}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Map
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5",
              viewMode === "list"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-white"
            )}
          >
            <List className="w-3.5 h-3.5" />
            List
          </button>
          <button
            onClick={() => setViewMode("heatmap")}
            className={cn(
              "px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5",
              viewMode === "heatmap"
                ? "bg-primary text-white shadow-sm"
                : "text-text-muted hover:text-white"
            )}
          >
            <Flame className="w-3.5 h-3.5" />
            Heatmap
          </button>
        </div>
      </div>

      {/* Main Map Body / List Body */}
      {viewMode === "list" ? (
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] text-text-muted border-b border-border/60 uppercase tracking-wider sticky top-0 bg-[#0A1128] z-10">
              <tr>
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">District</th>
                <th className="py-2 px-3">Schools</th>
                <th className="py-2 px-3">Physical %</th>
                <th className="py-2 px-3">Financial %</th>
                <th className="py-2 px-3">Delayed</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {districtsData.map((d, i) => (
                <tr
                  key={d.id}
                  onClick={() => router.push(`/commissioner/${d.id}`)}
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="py-2 px-3 font-mono text-text-muted">{i + 1}</td>
                  <td className="py-2 px-3 font-semibold text-white group-hover:text-primary transition-colors">
                    {d.name}
                  </td>
                  <td className="py-2 px-3 tabular-nums">{d.schools}</td>
                  <td className="py-2 px-3 font-bold tabular-nums text-emerald-400">
                    {d.physical}%
                  </td>
                  <td className="py-2 px-3 font-bold tabular-nums text-text-muted">
                    {d.financial}%
                  </td>
                  <td className="py-2 px-3 tabular-nums text-rose-400">
                    {d.delayed}
                  </td>
                  <td className="py-2 px-3">
                    <StatusPill status={d.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          className="relative flex-1 cursor-grab active:cursor-grabbing overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Zoom controls stack right edge */}
          <div className="absolute right-4 top-4 z-20 flex flex-col gap-1.5 bg-[#0F1B3D]/90 backdrop-blur-md p-1 rounded-lg border border-border shadow-lg">
            <button
              onClick={handleZoomIn}
              className="w-7 h-7 flex items-center justify-center rounded text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-7 h-7 flex items-center justify-center rounded text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="h-px bg-border/60 mx-1" />
            <button
              onClick={handleRecentre}
              className="w-7 h-7 flex items-center justify-center rounded text-text-muted hover:text-white hover:bg-white/10 transition-colors"
              title="Recentre Map"
              aria-label="Recentre Map"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SVG Canvas */}
          <svg
            viewBox="0 0 800 520"
            className="w-full h-full"
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          >
            {/* Background Faint Neighboring States Outline */}
            <g opacity="0.15" stroke="#9AA7C7" strokeDasharray="3 3" fill="none">
              <path d="M 60 180 C 90 80, 240 40, 360 40 C 440 20, 600 50, 720 160 C 820 250, 780 400, 680 480 C 520 540, 240 530, 100 480 C 40 420, 20 320, 60 180 Z" />
              <text x="130" y="80" fill="#9AA7C7" fontSize="11" fontWeight="600" letterSpacing="3">RAJASTHAN</text>
              <text x="490" y="45" fill="#9AA7C7" fontSize="11" fontWeight="600" letterSpacing="3">UTTAR PRADESH</text>
              <text x="690" y="320" fill="#9AA7C7" fontSize="11" fontWeight="600" letterSpacing="3">CHHATTISGARH</text>
              <text x="350" y="510" fill="#9AA7C7" fontSize="11" fontWeight="600" letterSpacing="3">MAHARASHTRA</text>
              <text x="30" y="370" fill="#9AA7C7" fontSize="11" fontWeight="600" letterSpacing="3">GUJARAT</text>
            </g>

            {/* 52 Real MP Districts Polygons */}
            <g id="mp-districts-polygons">
              {REAL_MP_DISTRICTS.map((shape) => {
                const distData = districtMap.get(shape.id.toLowerCase());
                const physical = distData ? distData.physical : 70;
                const fillColor = getDistrictFill(shape.id, physical);
                const isHovered = hoveredDistrictId === shape.id;

                return (
                  <path
                    key={shape.id}
                    d={shape.path}
                    fill={fillColor}
                    stroke={isHovered ? "#FFFFFF" : "#0A1128"}
                    strokeWidth={isHovered ? 2.5 : 1.2}
                    className="cursor-pointer transition-all duration-150"
                    style={{
                      filter: isHovered ? "brightness(1.25) drop-shadow(0 0 6px rgba(255,255,255,0.4))" : undefined,
                    }}
                    onMouseEnter={() => setHoveredDistrictId(shape.id)}
                    onMouseLeave={() => setHoveredDistrictId(null)}
                    onClick={() => router.push(`/commissioner/${shape.id}`)}
                  />
                );
              })}
            </g>

            {/* Floating Callout Labels matching Image 1:
                Gwalior 78% (Good) green, top;
                Rewa 48% (At Risk) red, right-upper;
                Ujjain 72% (On Track) amber border, left;
                Bhopal 88% (Excellent) green, centre;
                Indore 91% (Excellent) green, lower-left;
                Jabalpur 64% (Needs Attention) amber, lower-centre-right.
            */}
            <g id="map-callouts" className="pointer-events-none">
              {MP_MAP_CALLOUTS.map((c) => {
                const isHovered = hoveredDistrictId === c.districtId;

                const dotFill =
                  c.statusType === "On Track"
                    ? "#22C55E"
                    : c.statusType === "Needs Attention"
                    ? "#F5B301"
                    : "#EF4444";

                const statusColor =
                  c.statusType === "On Track"
                    ? "#4ADE80"
                    : c.statusType === "Needs Attention"
                    ? "#FBBF24"
                    : "#F87171";

                return (
                  <g key={c.districtId} className="transition-all duration-200">
                    {/* Connecting line */}
                    <line
                      x1={c.calloutX + 45}
                      y1={c.calloutY + 20}
                      x2={c.targetX}
                      y2={c.targetY}
                      stroke={dotFill}
                      strokeWidth={1.5}
                      strokeDasharray="2 2"
                      opacity={0.8}
                    />

                    {/* Centroid pulsing dot */}
                    <circle
                      cx={c.targetX}
                      cy={c.targetY}
                      r={isHovered ? 5 : 3.5}
                      fill={dotFill}
                      stroke="#0A1128"
                      strokeWidth={1.5}
                      className="animate-pulse"
                    />

                    {/* Callout box */}
                    <foreignObject
                      x={c.calloutX}
                      y={c.calloutY}
                      width={118}
                      height={54}
                      className="overflow-visible"
                    >
                      <div
                        className={cn(
                          "px-2.5 py-1.5 rounded-lg bg-[#0F1B3D]/95 backdrop-blur-md border shadow-lg text-left transition-all duration-200 pointer-events-auto cursor-pointer",
                          c.statusType === "On Track"
                            ? "border-emerald-500/60 shadow-emerald-500/10"
                            : c.statusType === "Needs Attention"
                            ? "border-amber-500/60 shadow-amber-500/10"
                            : "border-rose-500/60 shadow-rose-500/10",
                          isHovered && "scale-105 ring-2 ring-white/50"
                        )}
                        onClick={() => router.push(`/commissioner/${c.districtId}`)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-white tracking-tight">
                            {c.districtName}
                          </span>
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: dotFill }}
                          />
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-[15px] font-extrabold text-white tabular-nums leading-none">
                            {c.percentage}%
                          </span>
                          <span
                            className="text-[10px] font-semibold leading-none truncate"
                            style={{ color: statusColor }}
                          >
                            ({c.statusLabel})
                          </span>
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Interactive Hover Tooltip */}
          {hoveredDistrict && tooltipPos && (
            <div
              className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-full mb-3"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 12}px`,
              }}
            >
              <div className="px-3.5 py-2.5 rounded-xl bg-[#0F1B3D]/98 border border-primary/40 shadow-2xl backdrop-blur-md min-w-[170px] text-left">
                <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-1.5 mb-1.5">
                  <span className="text-xs font-bold text-white">
                    {hoveredDistrict.name}
                  </span>
                  <StatusPill status={hoveredDistrict.status} />
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-text-muted">
                    <span>Total Schools:</span>
                    <span className="font-semibold text-white tabular-nums">
                      {hoveredDistrict.schools}
                    </span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Physical Progress:</span>
                    <span className="font-bold text-emerald-400 tabular-nums">
                      {hoveredDistrict.physical}%
                    </span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Financial Progress:</span>
                    <span className="font-bold text-white tabular-nums">
                      {hoveredDistrict.financial}%
                    </span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Delayed Projects:</span>
                    <span className="font-bold text-rose-400 tabular-nums">
                      {hoveredDistrict.delayed}
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 pt-1 text-[9px] text-primary/80 font-medium text-center">
                  Click to open District Dashboard →
                </div>
              </div>
            </div>
          )}

          {/* Legend Box Bottom-Right (Exact Section 5.2):
              green square "On Track (≥ 75%)" 32 districts;
              amber square "Needs Attention (50 - 75%)" 14 districts;
              red square "At Risk (< 50%)" 6 districts.
          */}
          <div className="absolute right-4 bottom-3 z-10 bg-[#0B1330]/90 backdrop-blur-md border border-border/80 px-3 py-2 rounded-xl shadow-lg flex flex-col gap-1.5 text-[11px]">
            <button
              onClick={() => setActiveLegendFilter(activeLegendFilter === "onTrack" ? null : "onTrack")}
              className={cn(
                "flex items-center justify-between gap-3 px-1.5 py-0.5 rounded transition-all text-left",
                activeLegendFilter === "onTrack" ? "bg-emerald-500/20 font-bold" : "hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shrink-0" />
                <span className="text-text-muted">On Track (≥ 75%)</span>
              </div>
              <span className="font-bold text-white tabular-nums">32 districts</span>
            </button>

            <button
              onClick={() => setActiveLegendFilter(activeLegendFilter === "watch" ? null : "watch")}
              className={cn(
                "flex items-center justify-between gap-3 px-1.5 py-0.5 rounded transition-all text-left",
                activeLegendFilter === "watch" ? "bg-amber-500/20 font-bold" : "hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 shrink-0" />
                <span className="text-text-muted">Needs Attention (50 - 75%)</span>
              </div>
              <span className="font-bold text-white tabular-nums">14 districts</span>
            </button>

            <button
              onClick={() => setActiveLegendFilter(activeLegendFilter === "atRisk" ? null : "atRisk")}
              className={cn(
                "flex items-center justify-between gap-3 px-1.5 py-0.5 rounded transition-all text-left",
                activeLegendFilter === "atRisk" ? "bg-rose-500/20 font-bold" : "hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 shrink-0" />
                <span className="text-text-muted">At Risk (&lt; 50%)</span>
              </div>
              <span className="font-bold text-white tabular-nums">6 districts</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
