"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, ShoppingBag, Database, PlayCircle, Library, ClipboardCheck } from "lucide-react";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { setShortsOpen, currentRole } = usePrototypeStore();
  const isB2C = currentRole === 'Independent Learner';

  // We added Library back to this list!
  const navItems = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard, show: true },
    
    { name: "LMS", href: "/lms", icon: BookOpen, show: true },
    { name: "Shop", href: "/marketplace", icon: ShoppingBag, show: true },
    { name: "Diagnostics", href: "/library", icon: ClipboardCheck, show: true },
  ].filter(item => item.show);

  // Split items so the Shorts button can sit in the middle
  const middleIndex = Math.ceil(navItems.length / 2);
  const leftItems = navItems.slice(0, middleIndex);
  const rightItems = navItems.slice(middleIndex);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-between items-center h-16 z-50 pb-safe-area-inset-bottom px-1 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
      
      {/* Left Items */}
      <div className="flex flex-1 justify-around h-full">
        {leftItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[9px] font-bold transition-colors", isActive ? "text-primary" : "text-slate-500")}>
              <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20 text-primary")} />
              <span className="truncate w-full text-center">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* CENTRAL PROMINENT ACTION: SHORTS */}
      <div className="relative -top-5 px-1 flex justify-center shrink-0">
        <button 
          onClick={() => setShortsOpen(true)}
          className="flex flex-col items-center justify-center h-14 w-14 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/30 hover:scale-105 transition-transform border-[3px] border-white"
        >
          <PlayCircle className="h-6 w-6 fill-white/20" />
        </button>
      </div>

      {/* Right Items */}
      <div className="flex flex-1 justify-around h-full">
        {rightItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[9px] font-bold transition-colors", isActive ? "text-primary" : "text-slate-500")}>
              <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20 text-primary")} />
              <span className="truncate w-full text-center">{item.name}</span>
            </Link>
          );
        })}
      </div>
      
    </nav>
  );
}