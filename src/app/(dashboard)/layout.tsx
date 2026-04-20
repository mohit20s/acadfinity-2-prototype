"use client";

import { usePrototypeStore } from "@/store/use-prototype-store";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import B2CDashboardLayout from "../(b2c-dashboard)/layout";
import { NotificationsDrawer } from "@/components/dashboard/notifications-drawer";
import { GlobalShortsPlayer } from "@/components/dashboard/global-shorts-player";
import { usePathname } from 'next/navigation';
import { useEffect } from "react";

export default function DashboardLayoutSelector({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentRole, isLessonPlayerOpen, setLessonPlayerOpen } = usePrototypeStore();
  const pathname = usePathname();
  const isB2C = currentRole === 'Independent Learner';

  // This effect listens to the URL and tells the state when the player opens/closes
  useEffect(() => {
    if (pathname.includes('/lms/lessons/')) {
      setLessonPlayerOpen(true);
    } else {
      setLessonPlayerOpen(false);
    }
    // Clean up on component unmount
    return () => setLessonPlayerOpen(false);
  }, [pathname, setLessonPlayerOpen]);

  // If the lesson player is open, we hide the ENTIRE dashboard layout
  if (isLessonPlayerOpen) {
    return <>{children}</>;
  }
  
  // If B2C, render the B2C layout
  if (isB2C) {
    return (
      <>
        <B2CDashboardLayout>{children}</B2CDashboardLayout>
        <NotificationsDrawer />
        <GlobalShortsPlayer />
      </>
    );
  }

  // Otherwise, render the standard B2B School Portal layout.
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <div className="hidden md:flex"><Sidebar /></div>
        <div className="flex flex-col flex-1 overflow-hidden relative">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
            {children}
          </main>
          <MobileNav />
        </div>
      </div>
      <NotificationsDrawer />
      <GlobalShortsPlayer />
    </>
  );
}