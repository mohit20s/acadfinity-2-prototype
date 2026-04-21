"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, PlayCircle, ClipboardCheck, ShoppingBag, Box, Heart, AppWindow } from "lucide-react";
import { usePrototypeStore, NavContext } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";
import React from "react";

// 1. Define the structure of a Navigation Item
interface NavItem {
  name: string;
  href?: string;       // Optional for buttons
  action?: () => void; // Optional for links
  icon: any;           // The Lucide icon
  context?: NavContext;
  isActive?: boolean;  // Specifically for the Shorts button
  badge?: number;
}

export function MyntraStyleBottomNav() {
  const pathname = usePathname();
  const { isShortsOpen, setShortsOpen, navContext, setNavContext } = usePrototypeStore();

  const handleNav = (context: NavContext) => {
    setNavContext(context);
    setShortsOpen(false);
  };

  // 2. Explicitly type the arrays as NavItem[]
  const mainItems: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: Home, context: 'main' },
    { name: "Learn", href: "/lms", icon: BookOpen, context: 'main' },
    { name: "Shorts", action: () => setShortsOpen(true), icon: PlayCircle, isActive: isShortsOpen },
    { name: "Explore", href: "/library", icon: AppWindow, context: 'explore' },
    { name: "Assess", href: "/library", icon: ClipboardCheck, context: 'main' },
  ];

  const exploreItems: NavItem[] = [
    { name: "Home", href: "/dashboard", icon: Home, context: 'main' },
    { name: "Shop", href: "/library", icon: ShoppingBag, context: 'explore' },
    { name: "Library", href: "/library", icon: Box, context: 'explore' },
    { name: "Wishlist", href: "#", icon: Heart, context: 'explore' },
    { name: "Bag", href: "#", icon: ShoppingBag, context: 'explore', badge: 1 },
  ];

  const itemsToRender = navContext === 'explore' ? exploreItems : mainItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-between h-16 z-50 pb-safe-area-inset-bottom shadow-[0_-4px_10px_rgba(0,0,0,0.03)] px-1">
      {itemsToRender.map((item) => {
        // Logic to determine if this specific tab is active
        const isCurrentRoute = item.href && pathname.startsWith(item.href) && navContext === item.context;
        const isActive = item.isActive || isCurrentRoute;
        
        const Content = (
          <>
            {isActive && (
              <div className="absolute top-0 w-8 h-1 bg-rose-500 rounded-b-full animate-in zoom-in"></div>
            )}
            <div className="relative mt-1">
              <item.icon 
                className={cn(
                  "h-6 w-6 transition-all", 
                  isActive ? "fill-rose-100 text-rose-600 scale-110" : "text-slate-500"
                )} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={cn(
              "text-[10px] font-bold mt-1 tracking-tight", 
              isActive ? "text-rose-600" : "text-slate-500"
            )}>
              {item.name}
            </span>
          </>
        );

        if (item.href) {
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => handleNav(item.context as NavContext)} 
              className="relative flex flex-col items-center justify-center flex-1 h-full cursor-pointer"
            >
              {Content}
            </Link>
          );
        }

        return (
          <button 
            key={item.name} 
            onClick={item.action} 
            className="relative flex flex-col items-center justify-center flex-1 h-full cursor-pointer outline-none"
          >
            {Content}
          </button>
        );
      })}
    </nav>
  );
}