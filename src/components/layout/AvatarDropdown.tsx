"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, Moon, Sun, Languages, LogOut, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/store";

export function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage } = useAppStore();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 p-1 pl-1.5 rounded-lg hover:bg-white/5 transition-all text-left focus:ring-1 focus:ring-primary"
      >
        {/* Blue Avatar circle "RS" */}
        <div className="w-9 h-9 rounded-full bg-primary/25 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs shrink-0 shadow-sm">
          RS
        </div>

        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-[13px] font-semibold text-white tracking-tight">
            R. Sharma
          </span>
          <span className="text-[11px] text-text-muted">
            Principal Secretary
          </span>
        </div>

        <ChevronDown className="w-3.5 h-3.5 text-text-muted opacity-80" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 rounded-xl bg-card border border-border shadow-2xl z-50 overflow-hidden divide-y divide-border/60">
            <div className="p-3 bg-card-2 flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-sm">
                RS
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text truncate">
                  R. Sharma, IAS
                </p>
                <p className="text-[11px] text-text-muted truncate">
                  Principal Secretary, Education
                </p>
              </div>
            </div>

            <div className="p-1 text-xs">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-text hover:bg-white/5 transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  {theme === "dark" ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-primary" />}
                  Theme Mode
                </span>
                <span className="text-[11px] font-medium text-text-muted capitalize">
                  {theme || "dark"}
                </span>
              </button>

              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-text hover:bg-white/5 transition-colors text-left"
              >
                <span className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-emerald-400" />
                  Language
                </span>
                <span className="text-[11px] font-bold text-primary">
                  {language === "EN" ? "English" : "हिंदी"}
                </span>
              </button>

              <div className="px-3 py-2 flex items-center gap-2 text-text-muted text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Govt Verified Official</span>
              </div>
            </div>

            <div className="p-1">
              <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors text-xs text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout (Mock)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
