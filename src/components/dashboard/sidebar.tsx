"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Home, Database, BookOpen, ShoppingBag, Library, Settings, X,  ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrototypeStore } from "@/store/use-prototype-store";

export function Sidebar() {
  const pathname = usePathname();
  const { isMobileSidebarOpen, closeMobileSidebar, currentRole } = usePrototypeStore();

  const isB2C = currentRole === 'Independent Learner';

  // Dynamic navigation array. ERP is hidden if the user is B2C.
  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home, show: true },
    
    { name: "Skill Academy (LMS)", href: "/lms", icon: BookOpen, show: true },
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
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileSidebar}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-bold" 
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
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Settings className="h-5 w-5 text-slate-400" />
            Settings
          </Link>
        </div>
      </aside>
    </>
  );
}