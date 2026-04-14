"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, ShoppingBag, Database, PlayCircle } from "lucide-react";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { setShortsOpen } = usePrototypeStore();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "ERP", href: "/erp", icon: Database },
    { name: "LMS", href: "/lms", icon: BookOpen },
    { name: "Shop", href: "/marketplace", icon: ShoppingBag },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-between items-center h-16 z-50 pb-safe-area-inset-bottom px-2 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
      
      {/* Left Items (Home, ERP) */}
      <div className="flex flex-1 justify-around h-full">
        {navItems.slice(0, 2).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[10px] font-semibold transition-colors", isActive ? "text-primary" : "text-slate-500")}>
              <item.icon className={cn("h-6 w-6", isActive && "fill-primary/20 text-primary")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* CENTRAL PROMINENT ACTION: SHORTS */}
      <div className="relative -top-6 px-2 flex justify-center w-auto">
        <button 
          onClick={() => setShortsOpen(true)}
          className="flex flex-col items-center justify-center h-16 w-16 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-xl shadow-rose-500/30 hover:scale-105 transition-transform border-4 border-white"
        >
          <PlayCircle className="h-8 w-8 fill-white/20" />
        </button>
      </div>

      {/* Right Items (LMS, Shop) */}
      <div className="flex flex-1 justify-around h-full">
        {navItems.slice(2, 4).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={cn("flex flex-col items-center justify-center w-full h-full space-y-1 text-[10px] font-semibold transition-colors", isActive ? "text-primary" : "text-slate-500")}>
              <item.icon className={cn("h-6 w-6", isActive && "fill-primary/20 text-primary")} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      
    </nav>
  );
}