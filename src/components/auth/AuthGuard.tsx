"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { Shield, Lock } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, router]);

  // While checking or redirecting, show an authentic government verification screen
  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center p-6 select-none">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-primaryGlow">
              <Shield className="w-7 h-7 fill-primary/30 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Lock className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              ShikshaNet Authentication
            </h3>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Verifying authorized government session credentials...
            </p>
          </div>

          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
            <div className="w-1/2 h-full bg-primary rounded-full animate-[pulseSubtle_1.5s_infinite_ease-in-out]" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
