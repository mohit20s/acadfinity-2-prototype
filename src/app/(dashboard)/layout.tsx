"use client";

import { usePrototypeStore } from "@/store/use-prototype-store";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import B2CDashboardLayout from "../(b2c-dashboard)/layout"; // Importing our new B2C layout
import { GlobalShortsPlayer } from "@/components/dashboard/global-shorts-player";
export default function DashboardLayoutSelector({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentRole } = usePrototypeStore();
  const isB2C = currentRole === 'Independent Learner';

  // If the user is an Independent Learner, render the dedicated B2C layout.
  if (isB2C) {
    return <B2CDashboardLayout>{children}</B2CDashboardLayout>;
     <GlobalShortsPlayer />
  }

  // Otherwise, render the standard B2B School Portal layout.
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className="hidden md:flex"><Sidebar /></div>
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
        <MobileNav />
      </div>
      <GlobalShortsPlayer />
    </div>
  );
}