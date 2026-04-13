import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export default function SelectSchoolPage() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Select Institute</h1>
        <p className="text-sm text-slate-500 mt-2">Choose the school workspace you want to enter.</p>
      </div>

      <div className="space-y-3">
        {/* Mock School 1 */}
        <Link 
          href="/dashboard" 
          className="flex items-center justify-between p-4 border rounded-lg hover:border-primary hover:bg-slate-50 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Delhi Public School</p>
              <p className="text-xs text-slate-500">Role: Director</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
        </Link>

        {/* Mock School 2 */}
        <Link 
          href="/dashboard" 
          className="flex items-center justify-between p-4 border rounded-lg hover:border-primary hover:bg-slate-50 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Global International Academy</p>
              <p className="text-xs text-slate-500">Role: Director</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t flex justify-center">
        <Button variant="ghost" asChild>
          <Link href="/login">← Back to Login</Link>
        </Button>
      </div>
    </div>
  );
}