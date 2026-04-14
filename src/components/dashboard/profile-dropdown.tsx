"use client";

import { LogOut, Settings, User } from "lucide-react";
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
  const { currentRole } = usePrototypeStore();
  const router = useRouter();

  // On logout, we simulate clearing the session by redirecting to the login page
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-black shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform hover:scale-105">
          {currentRole.charAt(0)}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4" align="end">
        <DropdownMenuLabel>
          <p className="font-bold">Sanjay Verma</p>
          <p className="text-xs text-slate-500 font-normal">Viewing as {currentRole}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <User className="mr-2 h-4 w-4" />
          <span>Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-rose-500 focus:bg-rose-50 focus:text-rose-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}