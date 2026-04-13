"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, ShoppingBag, Library, Database } from "lucide-react";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const { currentRole } = usePrototypeStore();

  // Check if the user is a B2C Independent Learner
  const isB2C = currentRole === 'Independent Learner';

  // Dynamic Array: ERP is added only if it's a B2B (School) User
  const navItems = [
    { name: "Home", href: "/dashboard", icon: LayoutDashboard, show: true },
    { name: "ERP", href: "/erp", icon: Database, show: !isB2C }, // Only shows for School roles
    { name: "LMS", href: "/lms", icon: BookOpen, show: true },
    { name: "Shop", href: "/marketplace", icon: ShoppingBag, show: true },
    { name: "Library", href: "/library", icon: Library, show: true },
  ].filter(item => item.show);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 z-50 pb-safe-area-inset-bottom px-1 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 text-[10px] font-semibold transition-colors", 
              isActive ? "text-primary" : "text-slate-500 hover:text-slate-900"
            )}
          >
            {/* The icon gets a slight fill when active */}
            <item.icon className={cn("h-[22px] w-[22px]", isActive && "fill-primary/20 text-primary")} />
            <span className="truncate w-full text-center px-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}