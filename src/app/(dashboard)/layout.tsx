"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ChatDrawer } from "@/components/ai/ChatDrawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg text-text">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <TopBar />

        {/* Dynamic page content */}
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>

      {/* Global AI Chat Drawer */}
      <ChatDrawer />
    </div>
  );
}
