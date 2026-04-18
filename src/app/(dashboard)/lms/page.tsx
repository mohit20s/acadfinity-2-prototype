"use client";

import { useState } from "react";
import { 
  Search, BookOpen, Clock, BarChart, ChevronRight, PlayCircle, Star,
  CheckCircle2, Video, Download, Award, ArrowLeft, Users
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { Button } from "@/components/ui/button";

// Your exact Mock Data
const courses = [
  { id: 'math-g8', title: "Grade 8 - Mathematics", instructor: "Anjali Sharma", students: 32, progress: 65, type: 'academic', price: "Free", oldPrice: null },
  { id: 'phy-g9', title: "Grade 9 - Physics", instructor: "Ravi Kumar", students: 28, progress: 40, type: 'academic', price: "Free", oldPrice: null },
  { id: 'ai-basics', title: "Advanced Python & AI Basics", instructor: "Arun K.", students: 150, progress: 0, type: 'outskill', price: "₹2,500", oldPrice: "₹4,000" },
  { id: 'design-pro', title: "Graphic Design Masterclass", instructor: "Sarah P.", students: 85, progress: 0, type: 'outskill', price: "₹1,999", oldPrice: "₹4,999" },
];

export default function LmsCatalogPage() {
  const { currentRole } = usePrototypeStore();
  const router = useRouter();
  
  // State to manage viewing the catalog vs a purchase page
  const [view, setView] = useState<'catalog' | 'purchase'>('catalog');
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  const isStudent = currentRole === 'Student' || currentRole === 'Parent';

  const activeCourses = courses.filter(c => c.progress > 0);
  const availableCourses = courses.filter(c => c.progress === 0);

  // --- VIEW 1: SIDE-SCROLLING CATALOG ---
  if (view === 'catalog') {
    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-24 overflow-x-hidden">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Learning Management System</h1>
          <p className="text-sm font-medium text-slate-500">Browse your assigned academic courses and optional outskill journeys.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-3 px-1">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input type="text" placeholder="Search courses..." className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-slate-100 bg-white outline-none focus:border-primary/50" />
          </div>
          <div className="flex gap-2">
            <select className="h-12 px-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-600 outline-none"><option>Type: All</option><option>Academic</option><option>Outskill</option></select>
            {!isStudent && <select className="h-12 px-4 rounded-xl border-2 border-slate-100 bg-white text-sm font-bold text-slate-600 outline-none"><option>Grade: All</option></select>}
          </div>
        </div>

        {/* 1. SIDE SLIDER: Continue Learning */}
        {activeCourses.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
               <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                 <Clock className="h-5 w-5 text-primary" /> Continue Learning
               </h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-4 -mx-4 sm:mx-0 sm:px-0 pl-4 sm:pl-0">
              {activeCourses.map((course) => (
                <div key={course.id} onClick={() => router.push(`/lms/courses/${course.id}`)} className="min-w-[280px] md:min-w-[320px] shrink-0 snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-primary/40 hover:shadow-xl transition-all flex flex-col cursor-pointer">
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
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. SIDE SLIDER: Explore / Purchase */}
        {availableCourses.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
               <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                 <Star className="h-5 w-5 text-amber-500 fill-amber-500" /> Explore New Courses
               </h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-4 -mx-4 sm:mx-0 sm:px-0 pl-4 sm:pl-0">
              {availableCourses.map((course) => (
                <div 
                  key={course.id} 
                  onClick={() => { setSelectedCourse(course); setView('purchase'); window.scrollTo(0,0); }} 
                  className="min-w-[280px] shrink-0 snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-amber-500/30 hover:shadow-xl transition-all flex flex-col cursor-pointer"
                >
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
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-black text-lg text-slate-900">{course.price}</span>
                      <Button className="font-black rounded-xl h-9 px-4 shadow-sm">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    );
  }

 // --- VIEW 2: COURSE PURCHASE/DETAILS PAGE (Fixed Mobile Order) ---
  if (view === 'purchase' && selectedCourse) {
    return (
      <div className="animate-in slide-in-from-right duration-300 pb-24 px-1">
        
        {/* Back Button */}
        <Button variant="ghost" onClick={() => setView('catalog')} className="mb-4 font-bold text-slate-500 hover:text-slate-900 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
        </Button>

        {/* 1. TITLE SECTION (Always on top) */}
        <section className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black mb-4 uppercase tracking-widest">
             {selectedCourse.type}
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">
            {selectedCourse.title}
          </h1>
          <p className="text-base md:text-lg text-slate-600 font-medium max-w-3xl">
            Master the fundamentals and advance your career with this comprehensive, expert-led journey.
          </p>
        </section>

        {/* 2. MAIN LAYOUT: Using Order to swap on Mobile */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* CHECKOUT CARD: 
              - order-1 on Mobile (Immediately after title)
              - order-2 on Desktop (Sidebar)
          */}
          <div className="w-full lg:w-[360px] shrink-0 order-1 lg:order-2">
            <div className="lg:sticky top-24 space-y-4 bg-white rounded-[2rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
              <div className={cn("aspect-video flex items-center justify-center relative group", selectedCourse.type === 'academic' ? 'bg-slate-800' : 'bg-rose-600')}>
                <PlayCircle className="h-16 w-16 text-white/70 group-hover:scale-110 group-hover:text-white transition-all cursor-pointer drop-shadow-lg" />
                <p className="absolute bottom-3 text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md">Preview Course</p>
              </div>
              
              <div className="p-6 md:p-8 pt-4 space-y-6">
                <div>
                  <div className="flex items-end gap-3 mb-1">
                    <span className="text-4xl font-black tracking-tighter text-slate-900">{selectedCourse.price}</span>
                    {selectedCourse.oldPrice && <span className="text-lg font-bold text-slate-400 line-through mb-1">{selectedCourse.oldPrice}</span>}
                  </div>
                  {selectedCourse.oldPrice && <p className="text-xs font-black text-rose-500 uppercase tracking-widest">Limited Time Offer</p>}
                </div>
                
                <Button onClick={() => router.push(`/lms/courses/${selectedCourse.id}`)} className="w-full h-14 text-lg font-black shadow-xl shadow-primary/20 rounded-xl">
                  {selectedCourse.price === "Free" ? "Enroll for Free" : "Buy Now & Enroll"}
                </Button>
                
                <div className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest">30-Day Money-Back Guarantee</div>
                
                <div className="pt-6 border-t border-slate-100 space-y-4 text-sm font-semibold text-slate-600">
                  <p className="font-black text-slate-900">This course includes:</p>
                  <div className="flex items-center gap-3"><Video className="h-4 w-4 text-slate-400" />8 hours of on-demand video</div>
                  <div className="flex items-center gap-3"><Download className="h-4 w-4 text-slate-400" />14 downloadable resources</div>
                  <div className="flex items-center gap-3"><Award className="h-4 w-4 text-slate-400" />Certificate of completion</div>
                </div>
              </div>
            </div>
          </div>

          {/* COURSE DETAILS CONTENT:
              - order-2 on Mobile (After the card)
              - order-1 on Desktop (Main content)
          */}
          <div className="flex-1 space-y-12 order-2 lg:order-1">
            <div className="flex items-center gap-6 text-sm font-bold text-slate-700">
              <div className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 4.8 <span className="text-slate-400 font-medium">(2,140 ratings)</span></div>
              <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-slate-400" /> {selectedCourse.students} enrolled</div>
            </div>

            {/* What you'll learn */}
            <section className="p-6 md:p-8 border-2 border-slate-100 rounded-3xl bg-white shadow-sm">
              <h2 className="text-xl font-black mb-6">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Understand the core concepts and real-world applications.</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Build a professional portfolio of completed projects.</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Master industry-standard tools and workflows.</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Gain a verifiable certificate to share on your resume.</p></div>
              </div>
            </section>

            {/* Course Content */}
            <section>
              <h2 className="text-xl font-black mb-6 px-1">Course Content</h2>
              <div className="space-y-3">
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-5 flex items-center justify-between hover:border-slate-200 transition-colors shadow-sm"><div className="flex items-center gap-4"><BookOpen className="h-5 w-5 text-slate-400" /><p className="font-bold text-slate-900">Module 1: Introduction & Setup</p></div><span className="hidden sm:block text-xs font-black text-slate-400 tracking-widest uppercase">4 lessons • 45m</span></div>
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-5 flex items-center justify-between hover:border-slate-200 transition-colors shadow-sm"><div className="flex items-center gap-4"><BookOpen className="h-5 w-5 text-slate-400" /><p className="font-bold text-slate-900">Module 2: Core Fundamentals</p></div><span className="hidden sm:block text-xs font-black text-slate-400 tracking-widest uppercase">8 lessons • 2h 15m</span></div>
              </div>
            </section>
            
            {/* Instructor Profile */}
            <section>
              <h2 className="text-xl font-black mb-6 px-1">Your Instructor</h2>
              <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-indigo-100 flex items-center justify-center font-black text-indigo-600 shadow-inner text-xl shrink-0">
                  {selectedCourse.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-black text-lg md:text-xl text-slate-900">{selectedCourse.instructor}</h3>
                  <p className="text-sm text-slate-500 font-semibold">Senior Educator & Industry Expert</p>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    );
  }   
  return null;
}