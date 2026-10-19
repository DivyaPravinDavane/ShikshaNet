import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A1128] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-4 shadow-primaryGlow">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight">404 – Page Not Found</h1>
      <p className="text-sm text-[#9AA7C7] mt-2 max-w-md">
        The requested ShikshaNet command centre module could not be found or is currently unavailable.
      </p>
      <Link
        href="/command-centre"
        className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/80 transition-all flex items-center gap-2 shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Command Centre
      </Link>
    </div>
  );
}
