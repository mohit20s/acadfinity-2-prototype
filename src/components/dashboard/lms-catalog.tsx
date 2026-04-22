"use client";

import { useState } from "react";
import { 
  Search, BookOpen, Clock, ChevronRight, PlayCircle, Star,
  CheckCircle2, Video, Download, Award, ArrowLeft, Users, Plus, Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePrototypeStore } from "@/store/use-prototype-store";

// --- MOCK DATA ---
const courses = [
  { id: 'math-g8', title: "Grade 8 - Mathematics", instructor: "Anjali Sharma", students: 32, progress: 65, type: 'academic', price: "Free", oldPrice: null },
  { id: 'phy-g9', title: "Grade 9 - Physics", instructor: "Ravi Kumar", students: 28, progress: 40, type: 'academic', price: "Free", oldPrice: null },
  { id: 'ai-basics', title: "Advanced Python & AI Basics", instructor: "Arun K.", students: 150, progress: 0, type: 'outskill', price: "₹2,500", oldPrice: "₹4,000" },
  { id: 'design-pro', title: "Graphic Design Masterclass", instructor: "Sarah P.", students: 85, progress: 0, type: 'outskill', price: "₹1,999", oldPrice: "₹4,999" },
];

export default function LmsCatalogPage() {
  const [view, setView] = useState<'catalog' | 'purchase'>('catalog');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const router = useRouter();
  const { currentRole, setShortsOpen } = usePrototypeStore();

  const activeCourses = courses.filter(c => c.progress > 0);
  const availableCourses = courses.filter(c => c.progress === 0);
  const isAdmin = currentRole === "Director" || currentRole === "Educational Institute Admin" || currentRole === "Principal";

  // ==========================================
  // VIEW 1: DETAILED COURSE PURCHASE PAGE (PDP)
  // ==========================================
  if (view === 'purchase' && selectedCourse) {
    return (
      <div className="animate-in slide-in-from-right duration-500 pb-24 px-1">
        
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

        {/* 2. MAIN LAYOUT: Order Swaps on Mobile */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* CHECKOUT CARD: order-1 on Mobile, order-2 on Desktop */}
          <div className="w-full lg:w-[360px] shrink-0 order-1 lg:order-2">
            <div className="lg:sticky top-24 space-y-4 bg-white rounded-[2rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
              
              {/* --- LOCAL VIDEO PLAYER PREVIEW --- */}
              <div className="aspect-video bg-slate-900 flex items-center justify-center relative group overflow-hidden">
                <video 
                  src="/sample-video.mp4" 
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer">
                  <PlayCircle className="h-16 w-16 text-white/80 group-hover:scale-110 group-hover:text-white transition-all drop-shadow-lg" />
                </div>
                <p className="absolute bottom-3 text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md w-full text-center z-10">Preview Course</p>
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

          {/* COURSE DETAILS CONTENT: order-2 on Mobile, order-1 on Desktop */}
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
                  {selectedCourse.instructor.split(' ').map((n: string) => n[0]).join('')}
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

  // ==========================================
  // VIEW 2: MAIN SIDE-SCROLLING CATALOG
  // ==========================================
  return (
    <div className="space-y-10 pb-24 overflow-x-hidden animate-in fade-in duration-500">
      
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">Skill Academy</h1>
          <p className="text-sm font-medium text-slate-500">Your central hub for learning.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Search courses..." className="w-full h-10 pl-10 pr-4 rounded-full border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          
          <Button onClick={() => setShortsOpen(true)} className="hidden md:flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black shadow-lg shadow-rose-500/20 hover:scale-105 transition-transform border border-rose-400/50">
            <PlayCircle className="h-5 w-5 fill-white/20" />
            <span>Skill Bites</span>
          </Button>

          {isAdmin && (
            <Button size="icon" className="rounded-full shrink-0 shadow-md h-10 w-10">
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* CONTINUE LEARNING */}
      {activeCourses.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 px-1"><Clock className="h-5 w-5 text-primary" /> Continue Learning</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
            {activeCourses.map((course) => (
              <div key={course.id} onClick={() => router.push(`/lms/courses/${course.id}`)} className="min-w-[280px] md:min-w-[320px] shrink-0 snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer flex flex-col">
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

      {/* EXPLORE NEW */}
      {availableCourses.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 px-1"><Star className="h-5 w-5 text-amber-500 fill-amber-500" /> Explore New Courses</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
            {availableCourses.map((course) => (
              <div key={course.id} onClick={() => { setSelectedCourse(course); setView('purchase'); window.scrollTo(0,0); }} className="min-w-[280px] shrink-0 snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-amber-500/30 hover:shadow-xl transition-all flex flex-col cursor-pointer">
                <div className={cn("h-36 w-full flex items-center justify-center relative", course.type === 'academic' ? 'bg-slate-800' : 'bg-rose-600')}>
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
                    <Button className="font-black rounded-xl h-9 px-4 shadow-md">View Details</Button>
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