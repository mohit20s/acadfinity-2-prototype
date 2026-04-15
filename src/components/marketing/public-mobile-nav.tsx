"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, PlayCircle, Info, LogIn } from "lucide-react";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";

export function PublicMobileNav() {
  const pathname = usePathname();
  const { setShortsOpen } = usePrototypeStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-between h-16 z-50 pb-safe-area-inset-bottom shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)] px-2">
      
      {/* Left Items */}
      <div className="flex flex-1 justify-around h-full">
        <Link href="/" className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[10px] font-bold transition-colors", pathname === "/" ? "text-primary" : "text-slate-500")}>
          <Home className={cn("h-5 w-5", pathname === "/" && "fill-primary/20 text-primary")} />
          <span>Home</span>
        </Link>
        <Link href="/solutions" className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[10px] font-bold transition-colors", pathname === "/solutions" ? "text-primary" : "text-slate-500")}>
          <LayoutGrid className={cn("h-5 w-5", pathname === "/solutions" && "fill-primary/20 text-primary")} />
          <span>Modules</span>
        </Link>
      </div>

      {/* CENTRAL PROMINENT ACTION: SHORTS (Available without login!) */}
      <div className="relative -top-5 px-1 flex justify-center shrink-0">
        <button 
          onClick={() => setShortsOpen(true)}
          className="flex flex-col items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/30 hover:scale-105 transition-transform border-[3px] border-white z-[60]"
        >
          <PlayCircle className="h-6 w-6 fill-white/20" />
        </button>
      </div>

      {/* Right Items */}
      <div className="flex flex-1 justify-around h-full">
        <Link href="/about" className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[10px] font-bold transition-colors", pathname === "/about" ? "text-primary" : "text-slate-500")}>
          <Info className={cn("h-5 w-5", pathname === "/about" && "fill-primary/20 text-primary")} />
          <span>About</span>
        </Link>
        <Link href="/login" className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[10px] font-bold transition-colors", pathname === "/login" ? "text-primary" : "text-slate-500")}>
          <LogIn className={cn("h-5 w-5", pathname === "/login" && "fill-primary/20 text-primary")} />
          <span>Login</span>
        </Link>
      </div>
      
    </nav>
  );
}