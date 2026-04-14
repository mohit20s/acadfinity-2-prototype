import { BookOpen, Award, Clock, PlayCircle, Flame, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrototypeStore } from "@/store/use-prototype-store";

export default function StudentDashboard() {
  const { currentRole } = usePrototypeStore();
  const isB2C = currentRole === 'Independent Learner';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center md:text-left">
           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black mb-3 uppercase tracking-widest">
             <Flame className="h-3 w-3" /> 12 Day Streak!
           </div>
           <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Welcome back, Learner!</h2>
           <p className="text-slate-400 text-sm font-medium max-w-md">You are doing great. You have 2 assignments due this week and 1 active module.</p>
        </div>
        <div className="relative z-10 flex gap-4">
           <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-center min-w-[100px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total XP</p>
              <p className="text-2xl font-black text-amber-400">2,450</p>
           </div>
           {!isB2C && (
             <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-center min-w-[100px]">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Attendance</p>
                <p className="text-2xl font-black text-emerald-400">96%</p>
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning (LMS) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-black text-slate-900">Continue Learning</h3>
             <Button variant="ghost" size="sm" className="text-[10px] font-black text-primary uppercase tracking-widest">View All</Button>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4 group cursor-pointer hover:border-primary/30 transition-colors">
             <div className="h-16 w-16 bg-slate-900 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md">
                <PlayCircle className="h-8 w-8 text-white/50 group-hover:text-white transition-colors" />
             </div>
             <div className="flex-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Module 02</p>
                <p className="font-bold text-slate-900 leading-tight mb-2">Python Logic & Control Flow</p>
                <div className="flex items-center gap-2">
                   <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full w-[40%] bg-primary"></div></div>
                   <span className="text-[10px] font-black text-slate-400">40%</span>
                </div>
             </div>
          </div>
        </div>

        {/* Pending Tasks & Library */}
        <div className="space-y-6">
           {/* Tasks */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><Clock className="h-4 w-4 text-rose-500" /> Due Soon</h3>
              <div className="space-y-3">
                 <div className="flex items-center justify-between p-3 bg-rose-50 border border-rose-100 rounded-xl">
                    <div><p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-0.5">DUE TOMORROW</p><p className="text-sm font-bold text-slate-900">Science Lab Report</p></div>
                    <Button size="sm" className="h-7 text-[10px] font-black rounded-md bg-white text-slate-900 hover:bg-slate-100 shadow-sm">Submit</Button>
                 </div>
              </div>
           </div>

           {/* Library Status */}
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><BookOpen className="h-4 w-4 text-emerald-500" /> Library Status</h3>
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                 <div><p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">ISSUED (RETURN BY FRI)</p><p className="text-sm font-bold text-slate-900">The Solar System Guide</p></div>
                 <Download className="h-5 w-5 text-emerald-600 opacity-50" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}