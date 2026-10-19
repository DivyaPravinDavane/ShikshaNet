"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  height?: string;
  color?: "primary" | "success" | "warning" | "danger" | "teal" | "purple" | "orange";
  customColor?: string;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  height = "h-2",
  color = "primary",
  customColor,
  className,
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colorClasses = {
    primary: "bg-[#2F80FF]",
    success: "bg-[#22C55E]",
    warning: "bg-[#F5B301]",
    danger: "bg-[#EF4444]",
    teal: "bg-[#14B8A6]",
    purple: "bg-[#8B5CF6]",
    orange: "bg-[#F97316]",
  };

  return (
    <div className={cn("w-full flex items-center gap-2", className)}>
      <div className={cn("w-full bg-white/10 dark:bg-white/10 rounded-full overflow-hidden", height)}>
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", !customColor && colorClasses[color])}
          style={{
            width: `${percentage}%`,
            backgroundColor: customColor || undefined,
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold tabular-nums text-text-muted min-w-[36px] text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
