"use client";

import { Bell } from "lucide-react";
import { usePrototypeStore, Role } from "@/store/use-prototype-store";
import { Logo } from "@/components/shared/logo";

export function Header() {
  const { currentRole, setRole } = usePrototypeStore();

  const roles: Role[] = ["Director", "Principal", "School Admin", "Teacher", "Parent", "Student", "Independent Learner"];
  const isB2C = currentRole === 'Independent Learner';

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-30 shrink-0">
      
      {/* Left Side Context */}
      <div className="flex items-center gap-4">
        {/* On Mobile: Show a tiny logo instead of the school name for space */}
        <div className="md:hidden flex items-center">
           <Logo />
        </div>

        {/* On Desktop: Show the School Name / B2C Context */}
        <div className="hidden md:block">
          <h2 className="text-sm font-semibold text-slate-900">
            {isB2C ? "Personal Account" : "Delhi Public School"}
          </h2>
          <p className="text-xs text-slate-500">
            {isB2C ? "Independent Learner Hub" : "Academic Year 2024-25"}
          </p>
        </div>
      </div>

      {/* Right Side: Role Switcher & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Prototype Role Switcher */}
        <div className="flex items-center gap-1 md:gap-2 bg-amber-50 px-2 py-1.5 md:px-3 rounded-full border border-amber-200">
          <span className="text-[10px] md:text-xs font-medium text-amber-800 hidden sm:inline-block">Viewing as:</span>
          <select 
            value={currentRole}
            onChange={(e) => setRole(e.target.value as Role)}
            className="text-xs font-bold text-amber-900 bg-transparent outline-none cursor-pointer max-w-[80px] md:max-w-[120px] truncate"
          >
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600">
          <Bell className="h-5 w-5 md:h-5 md:w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>

        {/* Avatar */}
        <div className="hidden md:flex h-8 w-8 rounded-full bg-primary text-white items-center justify-center text-sm font-bold shadow-sm">
          {currentRole.charAt(0)}
        </div>
      </div>
    </header>
  );
}