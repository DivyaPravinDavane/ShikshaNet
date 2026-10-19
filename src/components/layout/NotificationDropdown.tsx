"use client";

import React, { useState } from "react";
import { Bell, CheckCheck, AlertCircle, Clock, CheckCircle2, ShieldAlert } from "lucide-react";
import { useAppStore } from "@/store";
import notificationsData from "@/data/notifications.json";

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { unreadNotifications, clearNotifications } = useAppStore();

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-4 h-4 text-rose-400" />;
      case "payment":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case "vendor":
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      default:
        return <Clock className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors focus:ring-1 focus:ring-primary"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotifications > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#0A1128] animate-pulse">
            {unreadNotifications}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-card border border-border shadow-2xl z-50 overflow-hidden divide-y divide-border/60">
            <div className="px-4 py-3 flex items-center justify-between bg-card-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-text">Notifications</span>
                {unreadNotifications > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-semibold">
                    {unreadNotifications} new
                  </span>
                )}
              </div>
              {unreadNotifications > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-border/40">
              {notificationsData.map((item) => (
                <div
                  key={item.id}
                  className="p-3 hover:bg-white/5 transition-colors flex gap-3 text-left"
                >
                  <div className="mt-0.5 shrink-0">{getIcon(item.type)}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-text leading-snug">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                    <span className="text-[10px] text-text-muted/70 mt-1 block font-mono">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 text-center bg-card-2">
              <span className="text-xs text-text-muted">
                Showing recent 5 alerts
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
