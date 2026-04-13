import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative p-4">
      {/* Back to home link top-left */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <Link href="/" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
          ← Back to Website
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}