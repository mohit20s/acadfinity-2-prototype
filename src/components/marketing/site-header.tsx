"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info, Phone, LayoutGrid } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-6 md:gap-10 shrink-0">
          <Logo />
          
          {/* DESKTOP MENU DROPDOWN */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-primary transition-colors outline-none">
                  Explore <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 mt-2 rounded-xl p-2 z-50 bg-white">
                <DropdownMenuItem asChild className="cursor-pointer font-bold rounded-lg py-2.5">
                  <Link href="/solutions"><LayoutGrid className="h-4 w-4 mr-2 text-slate-400" /> Platform Modules</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-bold rounded-lg py-2.5">
                  <Link href="/about"><Info className="h-4 w-4 mr-2 text-slate-400" /> About Us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-bold rounded-lg py-2.5">
                  <Link href="/contact"><Phone className="h-4 w-4 mr-2 text-slate-400" /> Contact</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* DESKTOP LOGIN BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild className="rounded-full font-black px-6 shadow-md">
            <Link href="/login">Login / Sign Up</Link>
          </Button>
        </div>

        {/* MOBILE ONLY: Simple Login Button in Header to encourage signups */}
        <div className="md:hidden">
          <Button asChild size="sm" className="rounded-full font-black px-4 shadow-sm text-xs h-8">
            <Link href="/login">Sign Up</Link>
          </Button>
        </div>

      </div>
    </header>
  );
}