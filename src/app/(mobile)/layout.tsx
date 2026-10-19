"use client";

import React from "react";
import { PhoneFrame } from "@/components/layout/PhoneFrame";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PhoneFrame>{children}</PhoneFrame>;
}
