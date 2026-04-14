import { Users, BookOpen, Clock, CheckSquare, Calendar, Video, FileEdit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TeacherDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-black uppercase tracking-widest">My Students</span><Users className="h-4 w-4" />
          </div>
          <span className="text-3xl font-black text-slate-900">142</span>
          <span className="text-xs text-emerald-600 font-bold">Across 4 Sections</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-black uppercase tracking-widest">To Grade</span><CheckSquare className="h-4 w-4" />
          </div>
          <span className="text-3xl font-black text-rose-600">28</span>
          <span className="text-xs text-slate-500 font-bold">Assignments pending review</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-black uppercase tracking-widest">Next Class</span><Clock className="h-4 w-4" />
          </div>
          <span className="text-xl font-black text-primary mt-1">10:30 AM</span>
          <span className="text-xs text-slate-500 font-bold">Grade 8-B (Mathematics)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-black text-slate-900">Today's Schedule</h3>
            <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Tuesday</span>
          </div>
          <div className="p-6 space-y-6 flex-1">
            <div className="flex gap-4 opacity-50 grayscale">
               <div className="w-16 text-right"><p className="text-sm font-black text-slate-900">08:00</p><p className="text-[10px] font-bold text-slate-400">AM</p></div>
               <div className="h-full w-0.5 bg-slate-200 relative"><div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-slate-300"></div></div>
               <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">COMPLETED</p><p className="font-bold text-slate-900">Grade 9-A • Physics</p></div>
            </div>
            <div className="flex gap-4">
               <div className="w-16 text-right"><p className="text-sm font-black text-primary">10:30</p><p className="text-[10px] font-bold text-primary">AM</p></div>
               <div className="h-full w-0.5 bg-primary/20 relative"><div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20"></div></div>
               <div className="flex-1 bg-blue-50 border border-primary/20 rounded-xl p-4 shadow-sm"><p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">UPCOMING</p><p className="font-bold text-slate-900 mb-2">Grade 8-B • Mathematics</p><div className="flex gap-2"><Button size="sm" className="h-7 text-[10px] font-bold rounded-md">Take Attendance</Button><Button size="sm" variant="outline" className="h-7 text-[10px] font-bold rounded-md bg-white border-primary/20"><Video className="h-3 w-3 mr-1" /> Start Live</Button></div></div>
            </div>
            <div className="flex gap-4">
               <div className="w-16 text-right"><p className="text-sm font-black text-slate-600">01:15</p><p className="text-[10px] font-bold text-slate-400">PM</p></div>
               <div className="h-full w-0.5 bg-slate-100 relative"><div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-slate-200"></div></div>
               <div className="flex-1 bg-white border border-slate-100 rounded-xl p-4"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SCHEDULED</p><p className="font-bold text-slate-900">Grade 7-C • Algebra Setup</p></div>
            </div>
          </div>
        </div>

        {/* Quick Actions & LMS */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="font-black text-slate-900 mb-4">Quick Actions</h3>
             <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-12 font-bold text-slate-700 hover:text-primary hover:bg-blue-50 hover:border-primary/30"><FileEdit className="h-4 w-4 mr-3 text-slate-400" /> Grade Pending Assignments</Button>
                <Button variant="outline" className="w-full justify-start h-12 font-bold text-slate-700 hover:text-primary hover:bg-blue-50 hover:border-primary/30"><Calendar className="h-4 w-4 mr-3 text-slate-400" /> Plan Next Week's Syllabus</Button>
                <Button variant="outline" className="w-full justify-start h-12 font-bold text-slate-700 hover:text-primary hover:bg-blue-50 hover:border-primary/30"><BookOpen className="h-4 w-4 mr-3 text-slate-400" /> Go to LMS Creator Hub</Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}