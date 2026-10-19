"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { getStatusConfig } from "@/lib/status";

interface StatusPillProps {
  status: string;
  className?: string;
  dot?: boolean;
}

export function StatusPill({ status, className, dot = false }: StatusPillProps) {
  const cfg = getStatusConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors",
        cfg.badgeBg,
        cfg.badgeText,
        cfg.badgeBorder,
        className
      )}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: cfg.colorHex }}
        />
      )}
      {cfg.label}
    </span>
  );
}
