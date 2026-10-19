"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Wifi, Battery, Signal, Eye } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070D1E] text-white flex flex-col items-center justify-center p-4 sm:p-8 select-none">
      {/* Top Navigation banner on desktop to return to command centre */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 pb-3 border-b border-white/10">
        <Link
          href="/command-centre"
          className="flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Command Centre</span>
        </Link>

        <div className="flex items-center gap-3">
          <RoleSwitcher />
        </div>
      </div>

      {/* Phone Mockup Frame (390 x 844) */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-black rounded-[48px] p-3 shadow-[0_0_60px_rgba(47,128,255,0.2)] border-[8px] border-[#2A3450] flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 inset-x-0 mx-auto w-28 h-6 bg-black rounded-full z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1F30] ml-auto mr-3" />
        </div>

        {/* Mobile Status Bar (9:41, Signal, Wifi, Battery) */}
        <div className="h-10 pt-2 px-6 flex items-center justify-between text-xs font-semibold text-white/90 z-30 select-none">
          <span className="font-mono text-[11px] tracking-tight">9:41</span>
          <div className="flex items-center gap-1.5 text-white/90">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Inner Phone Screen Content */}
        <div className="flex-1 w-full overflow-y-auto bg-[#0A1128] text-white rounded-b-[36px] flex flex-col relative scrollbar-none">
          {children}
        </div>

        {/* Home Bar */}
        <div className="h-4 bg-transparent flex items-center justify-center shrink-0">
          <div className="w-32 h-1 bg-white/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
