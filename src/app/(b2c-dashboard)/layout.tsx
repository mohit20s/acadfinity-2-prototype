import { ShoppingCart, UserCircle, PlayCircle, Store, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";

// B2C-specific Bottom Nav Component
function B2CBottomNav() {
  const pathname = usePathname();
  const { setShortsOpen } = usePrototypeStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-between items-center h-16 z-50 pb-safe-area-inset-bottom px-4 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
      
      {/* Left Item */}
      <Link href="/lms" className={cn("flex flex-col items-center justify-center w-20 h-full space-y-1 text-[10px] font-semibold transition-colors", pathname === "/lms" ? "text-primary" : "text-slate-500")}>
        <BookOpen className={cn("h-6 w-6", pathname === "/lms" && "fill-primary/20 text-primary")} />
        <span>LMS</span>
      </Link>

      {/* CENTRAL SHORTS BUTTON */}
      <div className="relative -top-6 px-2 flex justify-center w-auto">
        <button 
          onClick={() => setShortsOpen(true)}
          className="flex flex-col items-center justify-center h-16 w-16 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-xl shadow-rose-500/30 hover:scale-105 transition-transform border-4 border-white"
        >
          <PlayCircle className="h-8 w-8 fill-white/20" />
        </button>
      </div>

      {/* Right Item */}
      <Link href="/marketplace" className={cn("flex flex-col items-center justify-center w-20 h-full space-y-1 text-[10px] font-semibold transition-colors", pathname === "/marketplace" ? "text-primary" : "text-slate-500")}>
        <Store className={cn("h-6 w-6", pathname === "/marketplace" && "fill-primary/20 text-primary")} />
        <span>Store</span>
      </Link>
    </nav>
  );
}

// B2C-specific Header Component
// 1. Add this import at the top of src/app/(b2c-dashboard)/layout.tsx
import { ProfileDropdown } from "@/components/dashboard/profile-dropdown";

// 2. Replace the old B2CHeader function with this one
function B2CHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="font-black text-xl text-primary tracking-tighter">Skill Academy</div>
      
      <div className="flex items-center gap-3">
        {/* Shopping Cart for B2C */}
        <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
          <ShoppingCart className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
        </button>
        
        {/* REUSED PROFILE DROPDOWN (Includes Logout) */}
        <ProfileDropdown />
      </div>
    </header>
  );
}

export default function B2CDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <B2CHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
        <B2CBottomNav />
      </div>
    </div>
  );
}