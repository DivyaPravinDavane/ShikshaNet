"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Shield, BookOpen, Search, Bell, LogOut, ArrowLeft, Building2, ClipboardCheck, School } from "lucide-react";
import { RoleSwitcher } from "@/components/layout/RoleSwitcher";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuthStore } from "@/store";
import { cn } from "@/lib/utils";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const isField = pathname.startsWith("/field");
  const isSchool = pathname.startsWith("/school");

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0A1128] text-white flex flex-col select-none">
        {/* Top Desktop Navigation Bar */}
        <header className="h-[72px] bg-[#0F1B3D]/90 backdrop-blur-md border-b border-border/80 px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link href="/command-centre" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-primaryGlow group-hover:scale-105 transition-transform">
                <div className="relative">
                  <Shield className="w-5 h-5 fill-primary/30 text-primary" />
                  <BookOpen className="w-2.5 h-2.5 text-white absolute inset-0 m-auto" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[17px] tracking-tight text-white leading-tight">
                    Shiksha<span className="text-primary">Net</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                    {isField ? "Field Operations" : isSchool ? "Principal Portal" : "Portal"}
                  </span>
                </div>
                <span className="text-[10px] text-text-muted font-medium leading-none mt-0.5">
                  School Education Department • Govt. of Madhya Pradesh
                </span>
              </div>
            </Link>

            {/* Quick Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
              <Link
                href="/command-centre"
                className="px-3 py-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                Command Centre
              </Link>
              <Link
                href="/inspections"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors",
                  isField
                    ? "bg-primary text-white font-bold"
                    : "text-text-muted hover:text-white hover:bg-white/5"
                )}
              >
                Inspections
              </Link>
              <Link
                href="/schools"
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors",
                  isSchool
                    ? "bg-primary text-white font-bold"
                    : "text-text-muted hover:text-white hover:bg-white/5"
                )}
              >
                Schools Register
              </Link>
              <Link
                href="/minister"
                className="px-3 py-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                Cabinet View
              </Link>
            </nav>
          </div>

          {/* Center: Role Switcher */}
          <div className="hidden xl:flex items-center">
            <RoleSwitcher />
          </div>

          {/* Right: State Portal Sync & User Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1128] border border-border/80 text-xs text-text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MPSDC Online</span>
            </div>

            <div className="h-5 w-px bg-border/60 mx-1 hidden sm:block" />

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-xs text-primary">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "OP"}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-white truncate max-w-[140px]">
                  {user?.name || (isField ? "Rajesh Verma" : isSchool ? "Dr. Sunita Pathak" : "Official")}
                </span>
                <span className="text-[10px] text-text-muted truncate max-w-[140px]">
                  {user?.designation || (isField ? "Block Education Officer" : isSchool ? "Principal & DDO" : "Department Official")}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="ml-1 p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Sign out of ShikshaNet"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
