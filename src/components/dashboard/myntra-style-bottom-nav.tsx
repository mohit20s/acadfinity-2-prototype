"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PlayCircle, ClipboardCheck, ShoppingBag, Box, Heart, AppWindow } from "lucide-react";
import { usePrototypeStore, NavContext } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";
import React from "react";

interface NavItem {
  name: string;
  href?: string;
  action?: () => void;
  icon: any;
  context?: NavContext;
  isActive?: boolean;
  badge?: number;
}

export function MyntraStyleBottomNav() {
  const pathname = usePathname();
  const { isShortsOpen, setShortsOpen, navContext, setNavContext } = usePrototypeStore();

  const handleNav = (context: NavContext) => {
    setNavContext(context);
    setShortsOpen(false);
  };

  // MAIN TABS
  const mainItems: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: Home, context: 'main' },
    { name: "Learn", href: "/lms", icon: BookOpen, context: 'learn' },
    { name: "Shorts", action: () => setShortsOpen(true), icon: PlayCircle, isActive: isShortsOpen },
    { name: "Procure", href: "/marketplace", icon: AppWindow, context: 'explore' },
    { name: "Bag", href: "/marketplace", icon: ShoppingBag, context: 'main', badge: 2 },
  ];

  // LEARN TABS (Completely separate routes)
  const learnItems: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: Home, context: 'main' },
    { name: "LMS", href: "/lms", icon: BookOpen, context: 'learn' },
    { name: "Diagnos", href: "/diagnostics", icon: ClipboardCheck, context: 'learn' }, // NEW DEDICATED ROUTE
     { name: "Procure", href: "/marketplace", icon: AppWindow, context: 'explore' },
    { name: "Bag", href: "/marketplace", icon: ShoppingBag, context: 'main', badge: 2 },
  ];

  // EXPLORE TABS (Completely separate routes)
  const exploreItems: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: Home, context: 'main' },
    { name: "Shop", href: "/marketplace", icon: ShoppingBag, context: 'explore' }, // EXACT MATCH /marketplace
    { name: "Library", href: "/library", icon: Box, context: 'explore' },          // EXACT MATCH /library
    { name: "Wishlist", href: "#", icon: Heart, context: 'explore' },
    { name: "Bag", href: "/marketplace", icon: ShoppingBag, context: 'explore', badge: 2 },
  ];

  const itemsToRender = navContext === 'explore' ? exploreItems : navContext === 'learn' ? learnItems : mainItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-between h-16 z-50 pb-safe-area-inset-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.03)] px-1">
      {itemsToRender.map((item) => {
        
        // --- THE FIX: EXACT MATCHING ---
        // Instead of startsWith, we check if the pathname equals the href exactly.
        // This ensures Shop and Library don't both light up at the same time.
        const isCurrentRoute = item.href && (pathname === item.href || pathname.startsWith(item.href + '/'));
        
        // Wishlist and Bag are placeholders, so we don't highlight them for the demo
        const isActive = (item.isActive || isCurrentRoute) && item.name !== "Wishlist" && item.name !== "Bag" && item.name !== "Explore" && item.name !== "Learn";

        // Hardcode specific overrides so the context switchers light up when clicked
        const isExploreTab = item.name === "Explore" && navContext === 'explore';
        const isLearnTab = item.name === "Learn" && navContext === 'learn';
        const finalActive = isActive || isExploreTab || isLearnTab;
        
        const Content = (
          <>
            {finalActive && <div className="absolute top-0 w-8 h-1 bg-rose-500 rounded-b-full animate-in zoom-in"></div>}
            <div className="relative mt-1">
              <item.icon className={cn("h-6 w-6 transition-all", finalActive ? "fill-rose-100 text-rose-600 scale-110" : "text-slate-500")} strokeWidth={finalActive ? 2.5 : 2} />
              {item.badge && <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">{item.badge}</span>}
            </div>
            <span className={cn("text-[10px] font-bold mt-1 tracking-tight", finalActive ? "text-rose-600" : "text-slate-500")}>{item.name}</span>
          </>
        );

        if (item.href) {
          return <Link key={item.name} href={item.href} onClick={() => handleNav(item.context as NavContext)} className="relative flex flex-col items-center justify-center flex-1 h-full cursor-pointer">{Content}</Link>;
        }
        return <button key={item.name} onClick={item.action} className="relative flex flex-col items-center justify-center flex-1 h-full cursor-pointer outline-none">{Content}</button>;
      })}
    </nav>
  );
}