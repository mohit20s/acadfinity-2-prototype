"use client";

import { useState } from "react";
import { 
  Search, BookOpen, Clock, ChevronRight, PlayCircle, Star,
  CheckCircle2, Video, Download, Award, ArrowLeft, Users, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePrototypeStore } from "@/store/use-prototype-store";

const courses = [
  { id: 'math-g8', title: "Grade 8 - Mathematics", instructor: "Anjali Sharma", students: 32, progress: 65, type: 'academic', price: "Free" },
  { id: 'phy-g9', title: "Grade 9 - Physics", instructor: "Ravi Kumar", students: 28, progress: 40, type: 'academic', price: "Free" },
  { id: 'ai-basics', title: "Advanced Python & AI Basics", instructor: "Arun K.", students: 150, progress: 0, type: 'outskill', price: "₹2,500", oldPrice: "₹4,000" },
  { id: 'design-pro', title: "Graphic Design Masterclass", instructor: "Sarah P.", students: 85, progress: 0, type: 'outskill', price: "₹1,999", oldPrice: "₹4,999" },
];

export default function LmsCatalogPage() {
  const [view, setView] = useState<'catalog' | 'purchase'>('catalog');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const router = useRouter();
  const { currentRole } = usePrototypeStore();

  const activeCourses = courses.filter(c => c.progress > 0);
  const availableCourses = courses.filter(c => c.progress === 0);

  if (view === 'purchase' && selectedCourse) {
    return (
      <div className="animate-in slide-in-from-right duration-300">
        <Button variant="ghost" onClick={() => setView('catalog')} className="mb-4 font-bold text-slate-500"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
        <div className="bg-white p-8 rounded-3xl border shadow-xl flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-black mb-4">{selectedCourse.title}</h1>
            <p className="text-slate-600 mb-6 font-medium text-lg text-pretty">Build professional skills with this expert-led journey.</p>
            <div className="flex items-center gap-6 text-sm font-bold text-slate-700">
              <div className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 4.8 </div>
              <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-slate-400" /> {selectedCourse.students} enrolled</div>
            </div>
          </div>
          <div className="w-full lg:w-80 shrink-0 p-6 bg-slate-50 rounded-2xl border-2 border-slate-100">
            <p className="text-3xl font-black mb-4">{selectedCourse.price}</p>
            <Button className="w-full h-12 font-black rounded-xl" onClick={() => router.push(`/lms/courses/${selectedCourse.id}`)}>Buy & Enroll</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">Skill Academy</h1>
          <p className="text-sm font-medium text-slate-500">Your central hub for learning.</p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Continue Learning</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
          {activeCourses.map((course) => (
            <div key={course.id} onClick={() => router.push(`/lms/courses/${course.id}`)} className="min-w-[280px] md:min-w-[320px] shrink-0 snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-5 cursor-pointer hover:border-primary/40 transition-all">
               <div className={cn("h-32 w-full rounded-2xl mb-4", course.type === 'academic' ? 'bg-slate-800' : 'bg-rose-600')}></div>
               <h3 className="font-black text-slate-900 text-lg leading-tight mb-4">{course.title}</h3>
               <div className="h-1.5 w-full bg-slate-100 rounded-full"><div className="h-full bg-primary" style={{ width: `${course.progress}%` }}></div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><Star className="h-5 w-5 text-amber-500 fill-amber-500" /> Explore New</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
          {availableCourses.map((course) => (
            <div key={course.id} onClick={() => { setSelectedCourse(course); setView('purchase'); }} className="min-w-[280px] shrink-0 snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-5 cursor-pointer hover:border-amber-500/30 transition-all">
               <div className={cn("h-32 w-full rounded-2xl mb-4", course.type === 'academic' ? 'bg-slate-800' : 'bg-rose-600')}></div>
               <h3 className="font-black text-slate-900 text-lg leading-tight mb-2">{course.title}</h3>
               <p className="text-xs font-bold text-slate-500 mb-4">{course.instructor}</p>
               <div className="flex items-center justify-between mt-auto">
                 <span className="font-black text-lg text-slate-900">{course.price}</span>
                 <Button className="font-black rounded-lg h-9">Details</Button>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}