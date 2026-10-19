"use client";

import React from "react";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <PhoneFrame>{children}</PhoneFrame>
    </AuthGuard>
  );
}
