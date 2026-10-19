"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Eye } from "lucide-react";
import { useAppStore, Role } from "@/store";
import { cn } from "@/lib/utils";

const ROLES: { id: Role; label: string; path: string }[] = [
  { id: "secretary", label: "Principal Secretary", path: "/command-centre" },
  { id: "minister", label: "Minister", path: "/minister" },
  { id: "commissioner", label: "Commissioner/SPD", path: "/commissioner/jabalpur" },
  { id: "field", label: "Field Officer", path: "/field/inspection/23140101235" },
  { id: "principal", label: "School Principal", path: "/school/23140101234" },
];

export function RoleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { setRole } = useAppStore();

  const handleRoleChange = (selectedRole: Role, path: string) => {
    setRole(selectedRole);
    router.push(path);
  };

  // Determine current active role from path
  const currentRole = pathname.startsWith("/minister")
    ? "minister"
    : pathname.startsWith("/commissioner")
    ? "commissioner"
    : pathname.startsWith("/field")
    ? "field"
    : pathname.startsWith("/school")
    ? "principal"
    : "secretary";

  return (
    <div className="flex items-center gap-1.5 bg-[#0B1330]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary/30 shadow-cardGlow text-xs">
      <div className="flex items-center gap-1.5 text-text-muted mr-1">
        <Eye className="w-3.5 h-3.5 text-primary" />
        <span className="font-medium text-[11px] uppercase tracking-wider hidden md:inline">
          View as:
        </span>
      </div>

      <div className="flex items-center gap-1">
        {ROLES.map((r) => {
          const isActive = currentRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => handleRoleChange(r.id, r.path)}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-medium transition-all",
                isActive
                  ? "bg-primary text-white font-semibold shadow-sm"
                  : "text-text-muted hover:text-white hover:bg-white/5"
              )}
            >
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
