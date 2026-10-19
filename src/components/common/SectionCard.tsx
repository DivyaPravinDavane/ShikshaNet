"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export function SectionCard({
  title,
  subtitle,
  icon,
  action,
  children,
  className,
  headerClassName,
  bodyClassName,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "rounded-[12px] bg-card border border-border/80 card-glow overflow-hidden flex flex-col transition-all duration-200",
        className
      )}
    >
      {(title || action) && (
        <div
          className={cn(
            "px-4 py-3 border-b border-border/60 flex items-center justify-between gap-3 shrink-0",
            headerClassName
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {icon && <div className="shrink-0">{icon}</div>}
            <div className="min-w-0">
              {typeof title === "string" ? (
                <h3 className="text-[15px] font-semibold text-text tracking-tight truncate leading-tight">
                  {title}
                </h3>
              ) : (
                title
              )}
              {subtitle && (
                <p className="text-[11px] text-text-muted truncate mt-0.5 leading-none">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={cn("p-4 flex-1 min-h-0", bodyClassName)}>{children}</div>
    </div>
  );
}
