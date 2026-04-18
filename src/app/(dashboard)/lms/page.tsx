"use client";

import { Search, Filter, BookOpen, Clock, BarChart, ChevronRight, PlayCircle, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { Button } from "@/components/ui/button";

// Your exact Mock Data
const courses = [
  { id: 'math-g8', title: "Grade 8 - Mathematics", instructor: "Anjali Sharma", students: 32, progress: 65, type: 'academic' },
  { id: 'phy-g9', title: "Grade 9 - Physics", instructor: "Ravi Kumar", students: 28, progress: 40, type: 'academic' },
  { id: 'ai-basics', title: "Advanced Python & AI Basics", instructor: "Arun K.", students: 150, progress: 0, type: 'outskill' },
  { id: 'design-pro', title: "Graphic Design Masterclass", instructor: "Sarah P.", students: 85, progress: 0, type: 'outskill' },
];

export default function LmsCatalogPage() {
  const { currentRole } = usePrototypeStore();
  const isStudent = currentRole === 'Student' || currentRole === 'Parent';

  // Automatically separate the courses based on progress!
  const activeCourses = courses.filter(c => c.progress > 0);
  const availableCourses = courses.filter(c => c.progress === 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-24 overflow-x-hidden">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Learning Management System</h1>
        <p className="text-sm font-medium text-slate-500">Browse your assigned academic courses and optional outskill journeys.</p>
      </div>

      {/* Your exact Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 px-1">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input type="text" placeholder="Search courses..." className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-100 bg-white" />
        </div>
        <div className="flex gap-2">
          <select className="h-12 px-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-600"><option>Type: All</option><option>Academic</option><option>Outskill</option></select>
          {!isStudent && <select className="h-12 px-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-600"><option>Grade: All</option></select>}
        </div>
      </div>

      {/* 1. SIDE SLIDER: Continue Learning (Progress > 0) */}
      {activeCourses.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
               <Clock className="h-5 w-5 text-primary" /> Continue Learning
             </h2>
             <Button variant="ghost" size="sm" className="text-[10px] font-bold text-primary uppercase tracking-widest h-8 px-2">
               My Courses <ChevronRight className="h-3 w-3 ml-1" />
             </Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-4 -mx-4 sm:mx-0 sm:px-0 pl-4 sm:pl-0">
            {activeCourses.map((course) => (
              <Link href={`/lms/courses/${course.id}`} key={course.id} className="min-w-[280px] md:min-w-[320px] shrink-0 snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-primary/40 hover:shadow-xl transition-all flex flex-col">
                <div className={cn("h-36 w-full flex items-center justify-center relative", course.type === 'academic' ? 'bg-slate-800' : 'bg-rose-600')}>
                  <PlayCircle className="h-12 w-12 text-white/50 group-hover:scale-110 group-hover:text-white transition-all shadow-xl rounded-full" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full", course.type === 'academic' ? 'bg-slate-100 text-slate-600' : 'bg-rose-100 text-rose-600')}>
                      {course.type}
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-xl leading-tight mb-2">{course.title}</h3>
                  <p className="text-xs font-bold text-slate-500 mb-4">Instructor: {course.instructor}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      <span>Progress</span>
                      <span className="text-primary">{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 2. SIDE SLIDER: Explore / Recommended (Progress === 0) */}
      {availableCourses.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
               <Star className="h-5 w-5 text-amber-500 fill-amber-500" /> Explore New Courses
             </h2>
             <Button variant="ghost" size="sm" className="text-[10px] font-bold text-amber-600 uppercase tracking-widest h-8 px-2">
               View All <ChevronRight className="h-3 w-3 ml-1" />
             </Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-4 -mx-4 sm:mx-0 sm:px-0 pl-4 sm:pl-0">
            {availableCourses.map((course) => (
              <Link href={`/lms/courses/${course.id}`} key={course.id} className="min-w-[280px] shrink-0 snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-amber-500/30 hover:shadow-xl transition-all flex flex-col">
                <div className={cn("h-32 w-full flex items-center justify-center relative", course.type === 'academic' ? 'bg-slate-800' : 'bg-rose-600')}>
                  <PlayCircle className="h-10 w-10 text-white/50 group-hover:scale-110 group-hover:text-white transition-all" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full", course.type === 'academic' ? 'bg-slate-100 text-slate-600' : 'bg-rose-100 text-rose-600')}>
                      {course.type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{course.students} Students</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight mb-2">{course.title}</h3>
                  <p className="text-xs font-bold text-slate-500 mb-4">Instructor: {course.instructor}</p>
                  
                  <div className="mt-auto">
                    <Button className="w-full font-black rounded-xl h-10 shadow-md">Enroll Now</Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}