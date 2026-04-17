"use client";

import { Search, Filter, BookOpen, Clock, BarChart,  } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { Button } from "@/components/ui/button";

// Mock Data
const courses = [
  { id: 'math-g8', title: "Grade 8 - Mathematics", instructor: "Anjali Sharma", students: 32, progress: 65, type: 'academic' },
  { id: 'phy-g9', title: "Grade 9 - Physics", instructor: "Ravi Kumar", students: 28, progress: 40, type: 'academic' },
  { id: 'ai-basics', title: "Advanced Python & AI Basics", instructor: "Arun K.", students: 150, progress: 0, type: 'outskill' },
  { id: 'design-pro', title: "Graphic Design Masterclass", instructor: "Sarah P.", students: 85, progress: 0, type: 'outskill' },
];

export default function LmsCatalogPage() {
  const { currentRole } = usePrototypeStore();
  const isStudent = currentRole === 'Student' || currentRole === 'Parent';

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Learning Management System</h1>
        <p className="text-sm font-medium text-slate-500">Browse your assigned academic courses and optional outskill journeys.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input type="text" placeholder="Search courses..." className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-100 bg-white" />
        </div>
        <div className="flex gap-2">
          <select className="h-12 px-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-600"><option>Type: All</option><option>Academic</option><option>Outskill</option></select>
          {!isStudent && <select className="h-12 px-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-600"><option>Grade: All</option></select>}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link href={`/lms/courses/${course.id}`} key={course.id} className="block bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-primary/40 hover:shadow-xl transition-all">
            <div className={cn("h-40 w-full flex items-end p-4", course.type === 'academic' ? 'bg-slate-800' : 'bg-rose-600')}>
              <h3 className="font-black text-2xl text-white tracking-tight leading-tight">{course.title}</h3>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs font-bold text-slate-500">
                  <p>Instructor: {course.instructor}</p>
                  <p>{course.students} Students</p>
                </div>
                <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full", course.type === 'academic' ? 'bg-slate-100 text-slate-600' : 'bg-rose-100 text-rose-600')}>
                  {course.type}
                </span>
              </div>
              {course.progress > 0 && (
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1"><span>Progress</span><span>{course.progress}%</span></div>
                  <div className="h-2 bg-slate-100 rounded-full"><div className="h-full bg-primary rounded-full" style={{width: `${course.progress}%`}}></div></div>
                </div>
              )}
              {course.progress === 0 && (
                <Button className="w-full font-black rounded-lg">Enroll Now</Button>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}