import { ShoppingCart, UserCircle, PlayCircle, Store } from "lucide-react";
import Link from "next/link";

// B2C-specific Bottom Nav Component
function B2CBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 z-50 pb-safe-area-inset-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <Link href="/lms" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-primary">
        <PlayCircle className="h-6 w-6 fill-primary/20" />
        <span className="text-[10px] font-bold">Learn (LMS)</span>
      </Link>
      <Link href="/marketplace" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500">
        <Store className="h-6 w-6" />
        <span className="text-[10px] font-bold">Store</span>
      </Link>
    </nav>
  );
}

// B2C-specific Header Component
function B2CHeader() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
      <div className="font-black text-lg text-primary tracking-tighter">Skill Academy</div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 text-slate-500 hover:text-primary"><ShoppingCart className="h-5 w-5" /></button>
        <button className="relative p-2 text-slate-500 hover:text-primary"><UserCircle className="h-6 w-6" /></button>
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