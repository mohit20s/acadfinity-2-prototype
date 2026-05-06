"use client";

import { useState } from "react";
import { 
  Search, BookOpen, Clock, ChevronRight, PlayCircle, Star,
  CheckCircle2, Video, Download, Award, ArrowLeft, Users, Plus, Flame, Target, PenTool, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePrototypeStore } from "@/store/use-prototype-store";

// --- MOCK DATA ---
const courses = [
  { id: 'FF-a01', title: "Financial Framework of Indian Education", instructor: "Mohit Gotecha", students: 340, progress: 65, type: 'academic', price: "Free", oldPrice: null },
  { id: 'phy-g9', title: "Grade 9 - Physics", instructor: "Ravi Kumar", students: 28, progress: 40, type: 'academic', price: "Free", oldPrice: null },
  { id: 'ai-basics', title: "Financial Framework of Indian Education", instructor: "Mohit G.", students: 150, progress: 0, type: 'outskill', price: "₹2,500", oldPrice: "₹4,000" },
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
      <div className="animate-in slide-in-from-right duration-500 pb-24 px-1 w-full">
        
        <Button variant="ghost" onClick={() => setView('catalog')} className="mb-4 font-bold text-slate-500 hover:text-slate-900 -ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
        </Button>

        {/* MAIN LAYOUT: Side-by-Side on Desktop, Stacked on Mobile */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT SIDE (Desktop): Contains Title AND Content */}
          <div className="flex-1 space-y-12 order-2 lg:order-1 flex flex-col">
            
            {/* 1. TITLE SECTION */}
            <section className="mb-2 space-y-3 md:mb-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black mb-4 uppercase tracking-widest">
                 School Transformation Program
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">
                {selectedCourse.title}
              </h1>
              <p className="text-base md:text-xl text-slate-600 font-medium max-w-3xl mb-6 leading-relaxed">
                Build a complete, system-driven financial framework to manage, control, and grow your institution’s finances with clarity and confidence.
              </p>
              <div className="flex items-center gap-6 text-sm font-bold text-slate-700">
                <div className="flex items-center gap-1.5"><Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 4.8 <span className="text-slate-400 font-medium">(2,140 ratings)</span></div>
                <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-slate-400" /> {selectedCourse.students} enrolled</div>
              </div>
            </section>

            {/* --- NEW CONTENT: What This Course Will Help You Achieve --- */}
            <section className="p-6 md:p-8 border-2 border-slate-100 rounded-3xl bg-white shadow-sm">
              <h2 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> What you will achieve</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Build a complete financial system for your school.</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Structure and manage financial data effectively.</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Implement accounting systems and workflows.</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Understand and manage cash flow, budgeting, and control.</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Ensure compliance and regulatory readiness.</p></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><p className="font-semibold text-slate-700">Make informed financial decisions for growth.</p></div>
              </div>
            </section>

            {/* --- NEW CONTENT: Who This Course is For --- */}
            <section className="px-1">
              <h2 className="text-xl font-black mb-4">Who This Course is For</h2>
              <div className="flex flex-wrap gap-3">
                {["School Owners", "Directors", "Principals", "Administrators", "Coaching Institute Owners"].map(audience => (
                  <span key={audience} className="bg-slate-100 border border-slate-200 text-slate-700 font-bold px-4 py-2 rounded-full text-sm">
                    {audience}
                  </span>
                ))}
              </div>
            </section>

            {/* --- NEW CONTENT: Course Outcome Banner --- */}
            <section className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/20 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
               <div className="absolute -right-10 -top-10 opacity-10"><Award className="h-40 w-40 text-emerald-500" /></div>
               <h2 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4">Course Outcome</h2>
               <p className="text-xl md:text-3xl font-black text-slate-900 leading-tight relative z-10 italic">
                 “You will not just learn finance — <br className="hidden md:block"/>you will build a structured financial operating system for your institution.”
               </p>
            </section>

            {/* --- NEW CONTENT: Deliverables (Learning Methodology) --- */}
            <section className="px-1">
              <h2 className="text-xl font-black mb-2">Learning Methodology</h2>
              <p className="text-slate-500 font-medium mb-6">This course follows a practical implementation approach. Each module includes:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-colors">
                   <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Video className="h-5 w-5" /></div><h3 className="font-black text-lg">Video Learning</h3></div>
                   <ul className="text-sm font-medium text-slate-600 space-y-1 ml-12 list-disc pl-4"><li>Concept explanation</li><li>Real-life examples</li><li>Step-by-step guidance</li></ul>
                </div>
                <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-colors">
                   <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><BookOpen className="h-5 w-5" /></div><h3 className="font-black text-lg">Content Notes</h3></div>
                   <ul className="text-sm font-medium text-slate-600 space-y-1 ml-12 list-disc pl-4"><li>Structured explanations</li><li>Key frameworks</li><li>Simplified concepts</li></ul>
                </div>
                <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-colors">
                   <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Download className="h-5 w-5" /></div><h3 className="font-black text-lg">Practical Templates</h3></div>
                   <ul className="text-sm font-medium text-slate-600 space-y-1 ml-12 list-disc pl-4"><li>Ready-to-use formats</li><li>Excel sheets</li><li>Trackers and tools</li></ul>
                </div>
                <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-colors">
                   <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Target className="h-5 w-5" /></div><h3 className="font-black text-lg">Assessments</h3></div>
                   <ul className="text-sm font-medium text-slate-600 space-y-1 ml-12 list-disc pl-4"><li>Quizzes (concept + app)</li><li>Scenario-based questions</li><li>Real implementation tasks</li></ul>
                </div>
              </div>
            </section>

            {/* --- NEW CONTENT: Course Structure --- */}
            <section>
              <h2 className="text-xl font-black mb-2 px-1">Course Structure</h2>
              <p className="text-slate-500 font-medium mb-6 px-1">This course is divided into 5 structured modules, each designed to build a complete financial system step-by-step.</p>
              <div className="space-y-3">
                {[
                  "Module 1: Financial Planning & Data Structuring",
                  "Module 2: Accounting System Setup",
                  "Module 3: Loan Facilitation",
                  "Module 4: Financial Control, Budgeting & Decision Making",
                  "Module 5: Compliance & Regulatory System"
                ].map((mod, index) => (
                  <div key={index} className="bg-white border-2 border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-200 transition-colors shadow-sm">
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 font-black flex items-center justify-center shrink-0">{index + 1}</div>
                    <p className="font-bold text-slate-900">{mod}</p>
                  </div>
                ))}
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

          {/* RIGHT SIDE (Desktop) / TOP (Mobile): CHECKOUT CARD */}
          <div className="w-full lg:w-[360px] shrink-0 order-1 lg:order-2 px-1 sm:px-0">
            <div className="lg:sticky top-24 space-y-4 bg-white rounded-[2rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
              
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
                <div className="lg:hidden block mb-4 border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-black text-slate-900 leading-tight">{selectedCourse.title}</h2>
                </div>

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
                
                <div className="pt-6 border-t border-slate-100 space-y-4 text-sm font-semibold text-slate-600">
                  <p className="font-black text-slate-900">This course includes:</p>
                  <div className="flex items-center gap-3"><Video className="h-4 w-4 text-slate-400" />Video Learning</div>
                  <div className="flex items-center gap-3"><Download className="h-4 w-4 text-slate-400" />Practical Templates</div>
                  <div className="flex items-center gap-3"><Target className="h-4 w-4 text-slate-400" />Assessments & Quizzes</div>
                  <div className="flex items-center gap-3"><Award className="h-4 w-4 text-slate-400" />Certificate of completion</div>
                </div>
              </div>
            </div>
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