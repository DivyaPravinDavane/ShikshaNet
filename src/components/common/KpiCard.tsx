"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";
import { CountUp } from "./CountUp";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  subLabel: string;
  badgeText?: string;
  badgePositive?: boolean;
  icon: LucideIcon;
  variant: "blue" | "green" | "cyan" | "purple" | "red" | "orange";
  href?: string;
  hasChevronDown?: boolean;
  hasChevronRight?: boolean;
  className?: string;
}

export function KpiCard({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  subLabel,
  badgeText,
  badgePositive = true,
  icon: Icon,
  variant,
  href,
  hasChevronDown = false,
  hasChevronRight = false,
  className,
}: KpiCardProps) {
  const styles = {
    blue: {
      gradient: "from-[#2F80FF]/15 to-[#0F1B3D]/90",
      border: "border-[#2F80FF]/25 hover:border-[#2F80FF]/50",
      iconBg: "bg-[#2F80FF]/20 text-[#2F80FF]",
    },
    green: {
      gradient: "from-[#22C55E]/15 to-[#0F1B3D]/90",
      border: "border-[#22C55E]/25 hover:border-[#22C55E]/50",
      iconBg: "bg-[#22C55E]/20 text-[#22C55E]",
    },
    cyan: {
      gradient: "from-[#14B8A6]/15 to-[#0F1B3D]/90",
      border: "border-[#14B8A6]/25 hover:border-[#14B8A6]/50",
      iconBg: "bg-[#14B8A6]/20 text-[#14B8A6]",
    },
    purple: {
      gradient: "from-[#8B5CF6]/15 to-[#0F1B3D]/90",
      border: "border-[#8B5CF6]/25 hover:border-[#8B5CF6]/50",
      iconBg: "bg-[#8B5CF6]/20 text-[#8B5CF6]",
    },
    red: {
      gradient: "from-[#EF4444]/15 to-[#0F1B3D]/90",
      border: "border-[#EF4444]/25 hover:border-[#EF4444]/50",
      iconBg: "bg-[#EF4444]/20 text-[#EF4444]",
    },
    orange: {
      gradient: "from-[#F97316]/15 to-[#0F1B3D]/90",
      border: "border-[#F97316]/25 hover:border-[#F97316]/50",
      iconBg: "bg-[#F97316]/20 text-[#F97316]",
    },
  };

  const currentStyle = styles[variant];

  const content = (
    <div
      className={cn(
        "relative flex items-center justify-between p-3.5 rounded-[12px] border bg-gradient-to-br transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-cardHover",
        currentStyle.gradient,
        currentStyle.border,
        className
      )}
      style={{ minHeight: "102px" }}
    >
      <div className="flex items-center gap-3.5 w-full">
        {/* 48px rounded icon tile */}
        <div
          className={cn(
            "w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105",
            currentStyle.iconBg
          )}
        >
          <Icon className="w-6 h-6 stroke-[2]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-text-muted truncate leading-tight">
            {label}
          </p>

          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-[28px] font-bold text-white tracking-tight tabular-nums leading-none">
              <CountUp
                end={value}
                prefix={prefix}
                suffix={suffix}
                decimals={decimals}
              />
            </span>

            {badgeText && (
              <span
                className={cn(
                  "text-[11px] font-semibold flex items-center gap-0.5 ml-1 leading-none",
                  badgePositive ? "text-emerald-400" : "text-rose-400"
                )}
              >
                {badgeText}
              </span>
            )}

            {hasChevronDown && (
              <ChevronDown className="w-4 h-4 text-text-muted opacity-70 group-hover:opacity-100 transition-opacity ml-0.5" />
            )}
          </div>

          <p className="text-[11px] text-text-muted/80 truncate mt-1">
            {subLabel}
          </p>
        </div>

        {hasChevronRight && (
          <ChevronRight className="w-4 h-4 text-text-muted opacity-60 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }

  return content;
}
