"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  FolderKanban,
  Building2,
  UsersRound,
  ClipboardCheck,
  IndianRupee,
  FileText,
  Sparkles,
  BarChart3,
  Shield,
  BookOpen,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Command Centre", href: "/command-centre", icon: LayoutDashboard },
  { name: "Programmes", href: "/programmes", icon: GraduationCap },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Schools", href: "/schools", icon: Building2 },
  { name: "Vendors", href: "/vendors", icon: UsersRound },
  { name: "Inspections", href: "/inspections", icon: ClipboardCheck },
  { name: "Finance", href: "/finance", icon: IndianRupee },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "AI Insights", href: "/ai-insights", icon: Sparkles },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[176px] xl:w-[176px] lg:w-[160px] md:w-[64px] shrink-0 bg-sidebar border-r border-border flex flex-col justify-between h-screen sticky top-0 z-30 transition-all select-none">
      {/* Top: Logo & Nav items */}
      <div className="flex flex-col">
        {/* Logo */}
        <Link
          href="/command-centre"
          className="h-[72px] flex items-center gap-2.5 px-4 border-b border-border/60 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-primaryGlow">
            <div className="relative">
              <Shield className="w-5 h-5 fill-primary/30 text-primary" />
              <BookOpen className="w-2.5 h-2.5 text-white absolute inset-0 m-auto" />
            </div>
          </div>
          <div className="flex flex-col md:hidden lg:flex">
            <span className="font-bold text-[16px] tracking-tight text-white leading-tight">
              Shiksha<span className="text-primary">Net</span>
            </span>
            <span className="text-[10px] text-text-muted leading-none font-medium">
              Govt. of MP
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="p-2 space-y-1 mt-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/command-centre" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all group",
                  isActive
                    ? "bg-primary text-white shadow-sm font-semibold"
                    : "text-text-muted hover:text-white hover:bg-white/5"
                )}
                title={item.name}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-text-muted group-hover:text-white"
                  )}
                />
                <span className="truncate md:hidden lg:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom block: Synced, Secure, Operational */}
      <div className="p-3 border-t border-border/60 space-y-2.5 text-[11px] text-text-muted bg-sidebar/50">
        <div className="flex items-center gap-2 px-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
          <div className="md:hidden lg:block leading-tight">
            <span className="text-text-muted">Last synced</span>
            <div className="text-[11px] font-semibold text-white">2 min ago</div>
          </div>
        </div>

        <div className="h-px bg-border/40 my-1 md:hidden lg:block" />

        <div className="flex items-center gap-2 px-1 text-text-muted/80 md:hidden lg:flex">
          <Lock className="w-3.5 h-3.5 text-text-muted shrink-0" />
          <span className="truncate text-[10px]">Secure Connection</span>
        </div>

        <div className="flex items-center gap-2 px-1 text-emerald-400 md:hidden lg:flex">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="truncate text-[10px] font-medium">All systems operational</span>
        </div>
      </div>
    </aside>
  );
}
