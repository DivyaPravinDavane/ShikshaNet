"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  BookOpen,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Building2,
  GraduationCap,
  ClipboardCheck,
  UserCheck,
  Server,
  HelpCircle,
} from "lucide-react";
import { useAuthStore, useAppStore, Role } from "@/store";
import { cn } from "@/lib/utils";

interface DemoRoleOption {
  id: Role;
  name: string;
  designation: string;
  email: string;
  targetUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  badgeColor: string;
}

const DEMO_ROLES: DemoRoleOption[] = [
  {
    id: "secretary",
    name: "R. Sharma, IAS",
    designation: "Principal Secretary, Education",
    email: "r.sharma.ias@mp.gov.in",
    targetUrl: "/command-centre",
    icon: UserCheck,
    badge: "Executive Cockpit",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    id: "minister",
    name: "Shri Uday Pratap Singh",
    designation: "Hon'ble Minister of School Education",
    email: "minister.education@mp.gov.in",
    targetUrl: "/minister",
    icon: Building2,
    badge: "Cabinet Overview",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    id: "commissioner",
    name: "Divisional Commissioner",
    designation: "SPD / Commissioner, Jabalpur Division",
    email: "commissioner.jabalpur@mp.gov.in",
    targetUrl: "/commissioner/jabalpur",
    icon: GraduationCap,
    badge: "District Operations",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "field",
    name: "Rajesh Verma",
    designation: "Block Education Officer / Field Inspection",
    email: "beo.jabalpur@mp.gov.in",
    targetUrl: "/field/inspection/SCH-JBP-001",
    icon: ClipboardCheck,
    badge: "Field Operations",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    id: "principal",
    name: "Dr. Sunita Pathak",
    designation: "Principal, Govt HS School Ranjhi",
    email: "principal.ranjhi@mp.gov.in",
    targetUrl: "/school/23140101234",
    icon: BookOpen,
    badge: "Principal Portal",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { setRole } = useAppStore();

  const [email, setEmail] = useState("r.sharma.ias@mp.gov.in");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successRole, setSuccessRole] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleLogin = (e?: React.FormEvent, customRole?: DemoRoleOption) => {
    if (e) e.preventDefault();
    setError(null);

    const selectedRole = customRole || DEMO_ROLES[0];

    if (!selectedRole && (!email.trim() || !password.trim())) {
      setError("Please provide your authorized Government Email and Password.");
      return;
    }

    setLoading(true);
    setSuccessRole(selectedRole.name);

    setTimeout(() => {
      setRole(selectedRole.id);
      login({
        name: selectedRole.name,
        email: selectedRole.email,
        role: selectedRole.id,
        designation: selectedRole.designation,
      });

      router.replace(selectedRole.targetUrl);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Ambience & MP Map Silhouette */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl -z-10" />
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[400px] bg-purple-500/10 blur-3xl -z-10" />

        {/* Subtle Decorative Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Faint MP State Silhouette */}
        <svg
          viewBox="0 0 800 520"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] opacity-[0.04] stroke-white stroke-[1.5] fill-white/[0.02]"
        >
          <path d="M 60 180 C 90 80, 240 40, 360 40 C 440 20, 600 50, 720 160 C 820 250, 780 400, 680 480 C 520 540, 240 530, 100 480 C 40 420, 20 320, 60 180 Z" />
        </svg>
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* State Emblem & Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-primaryGlow">
            <div className="relative">
              <Shield className="w-6 h-6 fill-primary/30 text-primary" />
              <BookOpen className="w-3 h-3 text-white absolute inset-0 m-auto" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white leading-tight">
                Shiksha<span className="text-primary">Net</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                Official Portal
              </span>
            </div>
            <p className="text-[11px] text-text-muted leading-none font-medium mt-0.5">
              Government of Madhya Pradesh • School Education Department
            </p>
          </div>
        </div>

        {/* Live System Operational Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-border/80 text-xs text-text-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>MPSDC Gateway Online</span>
          <span className="text-white/20">|</span>
          <span className="text-primary font-medium">FY 2026-27</span>
        </div>
      </header>

      {/* Main Login Card Section */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-6 py-6 flex flex-col items-center">
        <div className="w-full bg-[#0F1B3D]/80 backdrop-blur-xl border border-border/80 rounded-2xl p-7 sm:p-9 shadow-2xl relative">
          {/* Card Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Sign In to Command Centre
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-1.5 leading-relaxed">
              Enter your credentials or choose a quick role below to enter the live prototype.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-muted block">
                Official Email / Government ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name.ias@mp.gov.in"
                  className="w-full bg-[#0A1128] border border-border/80 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-text-muted/60 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-text-muted block">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setHelpOpen(true)}
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your security password"
                  className="w-full bg-[#0A1128] border border-border/80 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-text-muted/60 transition-all outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-text-muted hover:text-white transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-[#0A1128] border-border text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                />
                <span>Remember this terminal session</span>
              </label>
              <span className="text-[11px] text-text-muted/80">Secured via NIC</span>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-primaryGlow transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In as {successRole || "Official"}...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Command Centre</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Role Section */}
          <div className="mt-7 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Quick One-Click Demo Access
              </span>
              <span className="text-[10px] text-primary font-medium">Select a role to preview</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DEMO_ROLES.map((role, idx) => {
                const Icon = role.icon;
                const isFullWidth = idx === 4;

                return (
                  <button
                    key={role.id}
                    onClick={() => handleLogin(undefined, role)}
                    disabled={loading}
                    className={cn(
                      "p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-border/60 hover:border-primary/50 text-left transition-all group flex items-start gap-3 overflow-hidden disabled:opacity-60",
                      isFullWidth && "sm:col-span-2"
                    )}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 min-w-0">
                        <span className="font-bold text-xs text-white group-hover:text-primary transition-colors truncate">
                          {role.name}
                        </span>
                        <span
                          className={cn(
                            "text-[9px] font-semibold px-2 py-0.5 rounded border whitespace-nowrap shrink-0",
                            role.badgeColor
                          )}
                        >
                          {role.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-muted truncate mt-0.5 leading-tight">
                        {role.designation}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Help Modal */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0F1B3D] border border-border p-6 shadow-2xl relative text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/30">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  State NIC Credential Assistance
                </h3>
                <p className="text-xs text-text-muted">
                  Official School Education Department Helpline
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0A1128] border border-border/80 text-xs text-text-muted space-y-2 leading-relaxed">
              <p>
                To reset your official ShikshaNet credentials, contact the Madhya Pradesh State NIC Education Cell:
              </p>
              <div className="pt-1 space-y-1 text-white font-mono text-[11px]">
                <p>📞 Toll-Free Helpline: 1800-233-0175</p>
                <p>✉️ Email: helpdesk-shikshanet@mp.gov.in</p>
                <p>🏢 MPSDC Vallabh Bhavan, Bhopal</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setHelpOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors"
              >
                Close Assistance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            256-Bit SSL Encrypted
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-primary" />
            MP State Data Centre (MPSDC)
          </span>
        </div>

        <p className="text-[11px] text-text-muted/80 text-center">
          © 2026 Department of School Education, Govt. of Madhya Pradesh. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
