"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Books & Toys Library", href: "/library" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 md:px-8 flex h-16 items-center justify-between">
          
          <div className="flex items-center gap-6 md:gap-10">
            <Logo />
            <nav className="hidden md:flex gap-6">
              {navLinks.slice(0, 4).map(link => (
                <Link key={link.name} href={link.href} className="text-sm font-medium text-slate-500 transition-colors hover:text-primary">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="text-sm font-medium text-slate-500 hover:text-primary">Contact</Link>
            <Button asChild><Link href="/login">Institute Login</Link></Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6 text-slate-700" />
            </Button>
          </div>
        </div>
      </header>

      {/* --- FIXED MOBILE MENU DRAWER --- */}
      {/* 1. The dark overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-sm md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* 2. The solid white drawer */}
      <div className={`fixed top-0 right-0 z-[100] h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <Logo />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-2 p-6 overflow-y-auto">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className="text-lg font-semibold text-slate-800 hover:text-primary p-3 rounded-lg hover:bg-slate-50 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <Button className="w-full h-12 text-md" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/login">Institute Login</Link>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}