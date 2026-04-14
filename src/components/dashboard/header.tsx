"use client";

import { Bell } from "lucide-react";
import { usePrototypeStore, Role } from "@/store/use-prototype-store";
import { Logo } from "@/components/shared/logo";
import { ProfileDropdown } from "./profile-dropdown";
export function Header() {
  const { currentRole, setRole } = usePrototypeStore();

  const roles: Role[] = ["Director", "Principal", "School Admin", "Teacher", "Parent", "Student", "Independent Learner"];
  const isB2C = currentRole === 'Independent Learner';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-30 shrink-0">
      
      {/* LEFT SIDE: Logo + School Info (Now visible on mobile) */}
      <div className="flex items-center gap-3">
        <div className="shrink-0 scale-90 md:scale-100">
           <Logo />
        </div>
        
        {/* We use a vertical stack that gets smaller on mobile */}
        <div className="flex flex-col justify-center border-l border-slate-200 pl-3">
          <h2 className="text-[11px] md:text-sm font-bold text-slate-900 leading-tight line-clamp-1">
            {isB2C ? "Personal Account" : "Delhi Public School"}
          </h2>
          <p className="text-[9px] md:text-xs text-slate-500 font-medium whitespace-nowrap">
            {isB2C ? "Learner Hub" : "2024-25"}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Role Switcher & Notifications */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* THE ROLE SWITCHER (Fixed for mobile visibility) */}
        <div className="flex items-center bg-amber-50 px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-amber-200 shadow-sm">
          <select 
            value={currentRole}
            onChange={(e) => setRole(e.target.value as Role)}
            className="text-[10px] md:text-xs font-black text-amber-900 bg-transparent outline-none cursor-pointer max-w-[70px] md:max-w-[120px] truncate"
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* NOTIFICATION BELL */}
        <button className="relative p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="h-5 w-5 md:h-5 md:w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white"></span>
        </button>
<ProfileDropdown />
        
      </div>
    </header>
  );
}