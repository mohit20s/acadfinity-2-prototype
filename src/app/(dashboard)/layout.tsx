import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { MobileNav } from "@/components/dashboard/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop Sidebar (Hidden on mobile) */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header />
        
        {/* Scrollable Page Content 
            Note the 'pb-20 md:pb-8': This adds extra padding to the bottom on mobile 
            so the content clears the bottom navigation bar! 
        */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation (Hidden on desktop) */}
        <MobileNav />
      </div>
    </div>
  );
}