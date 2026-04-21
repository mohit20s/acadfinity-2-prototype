"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Home, Database, BookOpen, ShoppingBag, Settings, X, ClipboardCheck, FileText, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrototypeStore } from "@/store/use-prototype-store";

export function Sidebar() {
  const pathname = usePathname();
  // Extract setShortsOpen from our global store
  const { isMobileSidebarOpen, closeMobileSidebar, currentRole, setShortsOpen } = usePrototypeStore();

  const isB2C = currentRole === 'Independent Learner';

  // Dynamic navigation array
  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home, show: true },
    { name: "Skill Academy", href: "/lms", icon: BookOpen, show: true },
   
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag, show: true },
    { name: "Diagnostics", href: "/library", icon: ClipboardCheck, show: true },
  ].filter(item => item.show);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" 
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out md:translate-x-0 md:static flex flex-col",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
          <Logo />
          <button onClick={closeMobileSidebar} className="md:hidden text-slate-500 hover:text-slate-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto flex flex-col gap-2">
          
          {/* --- NEW: GLOBAL SHORTS BUTTON IN SIDEBAR --- */}
          <button
            onClick={() => {
              setShortsOpen(true);
              closeMobileSidebar();
            }}
            className="w-full flex items-center gap-3 px-3 py-3 mb-4 rounded-xl text-sm font-black text-white bg-gradient-to-r from-rose-500 to-amber-500 shadow-md shadow-rose-500/20 hover:scale-[1.02] transition-transform"
          >
            <PlayCircle className="h-5 w-5 fill-white/20" />
            Skill Bites (Shorts)
          </button>

          {/* Standard Navigation Links */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileSidebar}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Settings / Bottom Area */}
        <div className="p-4 border-t border-slate-200 shrink-0">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Settings className="h-5 w-5 text-slate-400" />
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
}