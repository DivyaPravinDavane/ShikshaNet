import React from "react";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-[#0A1128] p-6 space-y-4 animate-pulse">
      <div className="h-16 bg-[#0F1B3D] rounded-xl border border-white/5" />
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-[#0F1B3D] rounded-xl border border-white/5" />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-8 h-96 bg-[#0F1B3D] rounded-xl border border-white/5" />
        <div className="xl:col-span-4 h-96 bg-[#0F1B3D] rounded-xl border border-white/5" />
      </div>
    </div>
  );
}
