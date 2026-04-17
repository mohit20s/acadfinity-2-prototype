"use client";

import { Bell, LayoutGrid, Database, Activity } from "lucide-react";
import { usePrototypeStore, Role } from "@/store/use-prototype-store";
import { Logo } from "@/components/shared/logo";
import { ProfileDropdown } from "./profile-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Header() {
  const { currentRole, setRole } = usePrototypeStore();

  const roles: Role[] = ["Director", "Principal", "Educational Institute Admin", "Teacher", "Parent", "Student", "Independent Learner"];
  const isB2C = currentRole === 'Independent Learner';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 md:px-8 z-30 shrink-0 w-full overflow-hidden">
      
      {/* LEFT SIDE: Logo + Educational Institute Info */}
      <div className="flex items-center shrink-0">
        <div className="scale-90 md:scale-100 origin-left shrink-0">
           <Logo />
        </div>
        
        {/* HIDDEN ON MOBILE: We hide this text on small screens to save space! */}
        <div className="hidden sm:flex flex-col justify-center border-l border-slate-200 pl-3 ml-3">
          <h2 className="text-sm font-bold text-slate-900 leading-tight line-clamp-1">
            {isB2C ? "Personal Account" : "Delhi Public Educational Institute"}
          </h2>
          <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
            {isB2C ? "Learner Hub" : "2024-25"}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Role Switcher, Apps, Profile */}
      {/* Reduced gaps on mobile to make everything fit tightly */}
      <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
        
        {/* ROLE SWITCHER */}
        <div className="flex items-center bg-amber-50 px-1.5 py-1 md:px-3 md:py-1.5 rounded-full border border-amber-200 shadow-sm shrink-0">
          <select 
            value={currentRole}
            onChange={(e) => setRole(e.target.value as Role)}
            className="text-[10px] md:text-xs font-black text-amber-900 bg-transparent outline-none cursor-pointer w-[65px] sm:w-auto md:max-w-[120px] truncate"
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* APPS DROPDOWN (ONLY FOR B2B Educational Institute USERS) */}
        {!isB2C && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-1.5 text-slate-400 hover:text-primary transition-colors focus:outline-none shrink-0">
                <LayoutGrid className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl p-2 z-50 bg-white shadow-xl border-slate-100">
              <DropdownMenuLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Educational Institute Operations</DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2" />
              
              <DropdownMenuItem asChild className="cursor-pointer font-bold rounded-lg py-3 hover:bg-slate-50 transition-colors">
                <Link href="/erp">
                  <div className="h-8 w-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mr-3 shrink-0">
                    <Database className="h-4 w-4" />
                  </div>
                  ERP Dashboard
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild className="cursor-pointer font-bold rounded-lg py-3 hover:bg-slate-50 transition-colors mt-1">
                <Link href="/analytics">
                  <div className="h-8 w-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center mr-3 shrink-0">
                    <Activity className="h-4 w-4" />
                  </div>
                  Analytics Hub
                </Link>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* NOTIFICATION BELL (Hidden on mobile to save space) */}
        {/* NOTIFICATION BELL */}
        <button 
          onClick={() => usePrototypeStore.getState().setNotificationsOpen(true)} // <-- ADD THIS ONCLICK
          className="relative p-1.5 text-slate-400 hover:text-slate-600 transition-colors hidden sm:block shrink-0"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white animate-pulse"></span>
        </button>

        {/* PROFILE DROPDOWN */}
        <div className="shrink-0 ml-1">
          <ProfileDropdown />
        </div>
        
      </div>
    </header>
  );
}