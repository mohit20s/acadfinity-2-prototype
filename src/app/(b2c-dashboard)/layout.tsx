"use client";

import { ShoppingCart, UserCircle, PlayCircle, Store, BookOpen, ClipboardCheck, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";
import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";
import { GlobalShortsPlayer } from "@/components/dashboard/global-shorts-player";
import { MyntraStyleBottomNav } from "@/components/dashboard/myntra-style-bottom-nav";
// 1. MOBILE BOTTOM NAV (Updated to include Diagnostics)
function B2CBottomNav() {
  const pathname = usePathname();
  const { setShortsOpen } = usePrototypeStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex items-center justify-between h-16 z-50 pb-safe-area-inset-bottom shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)] px-1 sm:px-2">
      
      {/* Left Items (LMS & Diagnostics) */}
      <div className="flex flex-1 justify-around h-full">
        <Link href="/lms" className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[9px] font-black transition-colors", pathname === "/lms" ? "text-primary" : "text-slate-500")}>
          <BookOpen className={cn("h-5 w-5", pathname === "/lms" && "fill-primary/20 text-primary")} />
          <span className="uppercase tracking-widest">Learn</span>
        </Link>
        {/* NEW: Diagnostics added back for B2C */}
        <Link href="/library" className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[9px] font-black transition-colors", pathname === "/library" ? "text-primary" : "text-slate-500")}>
          <ClipboardCheck className={cn("h-5 w-5", pathname === "/library" && "fill-primary/20 text-primary")} />
          <span className="uppercase tracking-widest">Assess</span>
        </Link>
      </div>

      {/* CENTRAL SHORTS BUTTON (Fixed Position) */}
      <div className="relative -top-5 px-1 flex justify-center shrink-0">
        <button 
          onClick={() => setShortsOpen(true)}
          className="flex flex-col items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/30 hover:scale-105 transition-transform border-[3px] border-white z-[60]"
        >
          <PlayCircle className="h-6 w-6 fill-white/20" />
        </button>
      </div>

      {/* Right Items (Store & Empty spacer to balance) */}
      <div className="flex flex-1 justify-around h-full">
        <Link href="/marketplace" className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[9px] font-black transition-colors", pathname === "/marketplace" ? "text-primary" : "text-slate-500")}>
          <Store className={cn("h-5 w-5", pathname === "/marketplace" && "fill-primary/20 text-primary")} />
          <span className="uppercase tracking-widest">Store</span>
        </Link>
        {/* Invisible spacer balances the layout so the Shorts button stays dead center */}
        <div className="w-full h-full"></div>
      </div>

    </nav>
  );
}

// 2. DESKTOP & MOBILE HEADER (Updated to include Diagnostics)
function B2CHeader() {
  const pathname = usePathname();
  const { setShortsOpen } = usePrototypeStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 z-30 w-full">
      
      {/* Logo Area */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="font-black text-xl text-primary tracking-tighter">Skill Academy</div>
        
        {/* DESKTOP ONLY: Top Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 border-l border-slate-200 pl-6">
          <Link href="/lms" className={cn("text-sm font-bold transition-colors", pathname === "/lms" ? "text-primary" : "text-slate-500 hover:text-slate-900")}>
            Learning Hub
          </Link>
          <Link href="/marketplace" className={cn("text-sm font-bold transition-colors", pathname === "/marketplace" ? "text-primary" : "text-slate-500 hover:text-slate-900")}>
            Course Store
          </Link>
          {/* NEW: Diagnostics added back for Desktop B2C */}
          <Link href="/library" className={cn("text-sm font-bold transition-colors flex items-center gap-1.5", pathname === "/library" ? "text-emerald-600" : "text-slate-500 hover:text-emerald-600")}>
            <ClipboardCheck className="h-4 w-4" /> AI Diagnostics
          </Link>
          
          {/* Desktop Shorts Button */}
          <button 
            onClick={() => setShortsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors text-xs font-black tracking-widest uppercase ml-2"
          >
            <PlayCircle className="h-4 w-4" /> Shorts
          </button>
        </nav>
      </div>
      
      {/* Right Actions (Notifications,Cart & Profile) */}
     <div className="flex items-center gap-3 shrink-0 ml-4">
        
        <button className="relative p-2 text-slate-500 hover:text-primary transition-colors hidden sm:block">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
        </button>
         <button 
  onClick={() => {
    usePrototypeStore.getState().setShortsOpen(false);
    usePrototypeStore.getState().setNotificationsOpen(true);
  }}
  className="relative p-2 text-slate-500 hover:text-primary transition-colors"
>
  <Bell className="h-6 w-6" />
  <span className="absolute top-1 right-1 h-3 w-3 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
</button>

        <ProfileDropdown />
      </div>
    </header>
  );
}

// 3. MAIN B2C LAYOUT CONTAINER
export default function B2CDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <div className="flex flex-col flex-1 overflow-hidden relative w-full">
          <B2CHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 w-full">
            {children}
          </main>
          <MyntraStyleBottomNav />
        </div>
      </div>
      
      {/* Global overlay for shorts (Needs to be outside the main flex container) */}
      <GlobalShortsPlayer />
      
    </>
  );
}