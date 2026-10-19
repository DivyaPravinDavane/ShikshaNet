"use client";

import React from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useFilterStore } from "@/store";
import { RoleSwitcher } from "./RoleSwitcher";
import { NotificationDropdown } from "./NotificationDropdown";
import { AvatarDropdown } from "./AvatarDropdown";
import districtsData from "@/data/districts.json";
import programmesData from "@/data/programmes.json";

export function TopBar() {
  const { programme, district, dateRange, setProgramme, setDistrict } = useFilterStore();

  return (
    <header className="h-[72px] bg-sidebar/95 backdrop-blur-md border-b border-border/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 select-none">
      {/* Left: Title & Subtitle */}
      <div className="flex flex-col min-w-0">
        <h1 className="text-[17px] xl:text-[20px] font-bold text-white uppercase tracking-wide truncate leading-tight">
          EDUCATION PROGRAMME COMMAND CENTRE
        </h1>
        <p className="text-[11px] xl:text-[12px] text-text-muted truncate mt-0.5 font-medium">
          State Programme Monitoring • FY 2026-27
        </p>
      </div>

      {/* Middle: Role Switcher */}
      <div className="hidden 2xl:flex items-center">
        <RoleSwitcher />
      </div>

      {/* Centre-right & Right Filters & Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Programme Select */}
        <div className="relative hidden lg:block">
          <select
            value={programme}
            onChange={(e) => setProgramme(e.target.value)}
            className="appearance-none bg-card-2 border border-border/80 text-text text-xs rounded-lg pl-3 pr-8 py-2 focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer hover:border-border transition-colors font-medium"
          >
            <option value="All Education Programmes">Programme: All Education Programmes</option>
            {programmesData.map((p) => (
              <option key={p.id} value={p.name}>
                Programme: {p.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* District Select */}
        <div className="relative hidden md:block">
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="appearance-none bg-card-2 border border-border/80 text-text text-xs rounded-lg pl-3 pr-8 py-2 focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer hover:border-border transition-colors font-medium"
          >
            <option value="All Districts">District: All Districts</option>
            {districtsData.map((d) => (
              <option key={d.id} value={d.name}>
                District: {d.name} ({d.physical}%)
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Date-range picker button */}
        <button
          className="flex items-center gap-2 bg-card-2 border border-border/80 text-text text-xs rounded-lg px-3 py-2 hover:border-primary/50 transition-colors font-medium shrink-0"
          title="Date Range"
        >
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span className="tabular-nums hidden sm:inline">{dateRange}</span>
        </button>

        <div className="h-6 w-px bg-border/60 mx-1 hidden sm:block" />

        {/* Notification bell */}
        <NotificationDropdown />

        {/* User avatar & dropdown */}
        <AvatarDropdown />
      </div>
    </header>
  );
}
