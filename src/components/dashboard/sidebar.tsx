"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Home, BookOpen, ShoppingBag, Settings, X, ClipboardCheck, FileText, PlayCircle, AppWindow, Box, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrototypeStore } from "@/store/use-prototype-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Sidebar() {
  const pathname = usePathname();
  const { isMobileSidebarOpen, closeMobileSidebar, setShortsOpen } = usePrototypeStore();

  // --- NEW: Hierarchical Navigation Structure ---
  const mainNav = [
    { name: "Home", href: "/dashboard", icon: Home }, 
  ];

  const learnNav = {
    name: "Learn",
    icon: BookOpen,
    subItems: [
      { name: "Skill Academy (LMS)", href: "/lms", icon: BookOpen },
      { name: "AI Diagnostics", href: "/diagnostics", icon: ClipboardCheck },
    ]
  };

  const exploreNav = {
    name: "Explore",
    icon: AppWindow,
    subItems: [
      { name: "Shop (Marketplace)", href: "/marketplace", icon: ShoppingBag },
      { name: "Library (Subscription)", href: "/library", icon: Box },
      { name: "Wishlist", href: "#", icon: Heart },
    ]
  };

  // Check if any sub-item is active to keep the accordion open
  const isLearnActive = learnNav.subItems.some(item => pathname.startsWith(item.href));
  const isExploreActive = exploreNav.subItems.some(item => pathname.startsWith(item.href));

  return (
   <aside
  className={cn(
    "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out flex flex-col shrink-0",
    "md:translate-x-0 md:static", // This line is the fix! It makes it sit side-by-side on desktop.
    isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
  )}
>
      
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto flex flex-col gap-2">
        
        {/* Shorts Button */}
        <button
          onClick={() => setShortsOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-3 mb-2 rounded-xl text-sm font-black text-white bg-gradient-to-r from-rose-500 to-amber-500 shadow-md hover:scale-[1.02] transition-transform"
        >
          <PlayCircle className="h-5 w-5 fill-white/20" />
          Skill Bites (Shorts)
        </button>

        {/* Main Nav Items (e.g., Home) */}
        {mainNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold", isActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50")}>
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}

        {/* --- ACCORDION MENU FOR VERTICALS --- */}
        <Accordion type="multiple" defaultValue={[isLearnActive ? 'learn' : '', isExploreActive ? 'explore' : '']} className="w-full">
          
          {/* Learn Accordion */}
          <AccordionItem value="learn" className="border-b-0">
            <AccordionTrigger className={cn("px-3 py-2.5 rounded-lg text-sm font-bold hover:no-underline hover:bg-slate-50", isLearnActive ? "text-primary" : "text-slate-600")}>
              <div className="flex items-center gap-3">
                <learnNav.icon className={cn("h-5 w-5", isLearnActive ? "text-primary" : "text-slate-400")} />
                <span>{learnNav.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-6 pt-2">
              <div className="flex flex-col gap-1 border-l-2 border-slate-200">
                {learnNav.subItems.map(subItem => {
                  const isActive = pathname.startsWith(subItem.href);
                  return (
                    <Link key={subItem.name} href={subItem.href} className={cn("pl-5 py-2 text-xs font-bold flex items-center gap-3 rounded-r-lg border-l-2", isActive ? "border-primary text-primary bg-primary/5" : "border-transparent text-slate-500 hover:bg-slate-100")}>
                      <subItem.icon className="h-4 w-4" /> {subItem.name}
                    </Link>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Explore Accordion */}
          <AccordionItem value="explore" className="border-b-0">
            <AccordionTrigger className={cn("px-3 py-2.5 rounded-lg text-sm font-bold hover:no-underline hover:bg-slate-50", isExploreActive ? "text-primary" : "text-slate-600")}>
              <div className="flex items-center gap-3">
                <exploreNav.icon className={cn("h-5 w-5", isExploreActive ? "text-primary" : "text-slate-400")} />
                <span>{exploreNav.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-6 pt-2">
              <div className="flex flex-col gap-1 border-l-2 border-slate-200">
                {exploreNav.subItems.map(subItem => {
                  const isActive = pathname.startsWith(subItem.href);
                  return (
                    <Link key={subItem.name} href={subItem.href} className={cn("pl-5 py-2 text-xs font-bold flex items-center gap-3 rounded-r-lg border-l-2", isActive ? "border-primary text-primary bg-primary/5" : "border-transparent text-slate-500 hover:bg-slate-100")}>
                      <subItem.icon className="h-4 w-4" /> {subItem.name}
                    </Link>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-slate-200 shrink-0 mt-auto">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
          <Settings className="h-5 w-5 text-slate-400" />
          Settings
        </Link>
      </div>
    </aside>
  );
}