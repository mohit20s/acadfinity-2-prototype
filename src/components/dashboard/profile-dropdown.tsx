"use client";

import { LogOut, Settings, User, Activity, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { useRouter } from "next/navigation";

export function ProfileDropdown() {
  const { currentRole, setNotificationsOpen } = usePrototypeStore();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <DropdownMenu>
      {/* 1. The Trigger (The Avatar) */}
      <DropdownMenuTrigger asChild>
        <button className="relative h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black shadow-md focus:outline-none ring-2 ring-white hover:scale-105 transition-transform shrink-0">
          {currentRole.charAt(0)}
          {/* Mobile Red Dot Indicator on the Avatar */}
          <span className="sm:hidden absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-500 border-2 border-white animate-pulse"></span>
        </button>
      </DropdownMenuTrigger>

      {/* 2. The Content (The Menu) */}
      <DropdownMenuContent className="w-56 mt-2 mr-4" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none text-slate-900">Sanjay Verma</p>
            <p className="text-[10px] leading-none text-slate-500 font-medium uppercase tracking-tighter">
              {currentRole} Account
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {/* NEW: Mobile Notifications Access */}
        <DropdownMenuItem 
          onClick={() => setNotificationsOpen(true)} 
          className="sm:hidden cursor-pointer font-bold text-slate-900 bg-slate-50 mb-1"
        >
          <Bell className="mr-2 h-4 w-4 text-rose-500" />
          <span className="flex-1">Notifications</span>
          <span className="bg-rose-500 text-white text-[9px] px-2 py-0.5 rounded-full">2 NEW</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/analytics')} className="cursor-pointer font-medium">
          <Activity className="mr-2 h-4 w-4 text-slate-400" />
          <span>My Analytics Hub</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer font-medium">
          <Settings className="mr-2 h-4 w-4 text-slate-400" />
          <span>Account Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer font-medium">
          <User className="mr-2 h-4 w-4 text-slate-400" />
          <span>Personal Profile</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer font-bold text-rose-500 focus:bg-rose-50 focus:text-rose-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}