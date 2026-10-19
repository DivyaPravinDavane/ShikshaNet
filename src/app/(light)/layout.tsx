"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, BookOpen, Search, Bell, HelpCircle, Settings, User } from "lucide-react";
import { RoleSwitcher } from "@/components/layout/RoleSwitcher";
import { cn } from "@/lib/utils";

export default function LightShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F4F7FC] text-[#0F1B3D] flex flex-col select-none">
      {/* Light Top Navbar */}
      <header className="h-[72px] bg-white border-b border-[#E5EAF3] px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link href="/command-centre" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <div className="relative">
                <Shield className="w-5 h-5 fill-primary/20 text-primary" />
                <BookOpen className="w-2.5 h-2.5 text-primary absolute inset-0 m-auto" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[16px] tracking-tight text-[#0F1B3D] leading-tight">
                Shiksha<span className="text-primary">Net</span>
              </span>
              <span className="text-[10px] text-[#6B7A99] font-medium leading-none">
                Madhya Pradesh
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            <Link
              href="/minister"
              className={cn(
                "px-3 py-1.5 rounded-lg transition-colors",
                pathname.startsWith("/minister")
                  ? "bg-primary text-white"
                  : "text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-100"
              )}
            >
              Minister Dashboard
            </Link>
            <Link
              href="/commissioner/jabalpur"
              className={cn(
                "px-3 py-1.5 rounded-lg transition-colors",
                pathname.startsWith("/commissioner")
                  ? "bg-primary text-white"
                  : "text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-100"
              )}
            >
              Districts (SPD)
            </Link>
            <Link
              href="/schools"
              className="px-3 py-1.5 rounded-lg text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-100 transition-colors"
            >
              Schools
            </Link>
            <Link
              href="/inspections"
              className="px-3 py-1.5 rounded-lg text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-100 transition-colors"
            >
              Inspections
            </Link>
            <Link
              href="/finance"
              className="px-3 py-1.5 rounded-lg text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-100 transition-colors"
            >
              Finance
            </Link>
          </nav>
        </div>

        {/* Center: Role Switcher */}
        <div className="hidden xl:flex items-center">
          <RoleSwitcher />
        </div>

        {/* Right: Actions & User Avatar */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-100">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-100 relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5" />
          </button>
          <button className="p-2 rounded-lg text-[#6B7A99] hover:text-[#0F1B3D] hover:bg-slate-100 hidden sm:block">
            <HelpCircle className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-[#E5EAF3] mx-1" />

          {/* User profile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary">
              RS
            </div>
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-xs font-bold text-[#0F1B3D]">R. Sharma</span>
              <span className="text-[10px] text-[#6B7A99]">Official Portal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
