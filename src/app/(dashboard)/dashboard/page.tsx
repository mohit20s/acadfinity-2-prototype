"use client";

import { usePrototypeStore } from "@/store/use-prototype-store";
import { 
  PlayCircle, ShoppingBag, BookOpen, ChevronRight, Star, 
  Sparkles, GraduationCap, Clock, ArrowRight, Database 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- MOCK DATA (Required for the page to render) ---
const myActiveCourses = [
  { id: 101, title: "Python Logic & Control Flow", progress: 40, timeLeft: "2h 15m left", image: "bg-blue-600" },
  { id: 102, title: "Financial Wellness Basics", progress: 85, timeLeft: "15m left", image: "bg-emerald-600" },
];

const courseBites = [
  { id: 1, title: "Intro to AI & Prompting", image: "bg-indigo-600", author: "Dr. Malik", rating: "4.9" },
  { id: 2, title: "Leadership Masterclass", image: "bg-amber-600", author: "Capt. Vyas", rating: "4.8" },
  { id: 3, title: "Design 101 (Figma)", image: "bg-rose-600", author: "Sarah P.", rating: "4.7" },
  { id: 4, title: "Public Speaking", image: "bg-sky-600", author: "Arun K.", rating: "4.9" },
];

const recommendedCourses = [
  { id: 5, title: "Web Dev Basics", author: "Arun K.", rating: "4.9", image: "bg-purple-600" },
  { id: 6, title: "History of Art", author: "Mina S.", rating: "4.6", image: "bg-orange-600" },
];

const shopCats = [
  { name: "Stationery", icon: "✏️", color: "bg-emerald-50" },
  { name: "Lab Kits", icon: "🧪", color: "bg-blue-50" },
  { name: "Robotics", icon: "🤖", color: "bg-purple-50" },
  { name: "Books", icon: "📚", color: "bg-orange-50" },
  { name: "Uniforms", icon: "👕", color: "bg-sky-50" },
];

const libraryNew = [
  { title: "Solar System", type: "Digital", img: "bg-slate-800" },
  { title: "Lego Robotics", type: "Physical", img: "bg-slate-700" },
  { title: "Phonics App", type: "Digital", img: "bg-slate-600" },
];

export default function DiscoveryHomePage() {
  const { currentRole, setShortsOpen } = usePrototypeStore();
  const isB2B = currentRole !== 'Independent Learner';

  // Role-specific ERP Data
  const getErpData = () => {
    switch (currentRole) {
      case 'Director':
      case 'Principal':
        return { title: "New Admissions", value: "12", label: "Pending Approval" };
      case 'Teacher':
        return { title: "Attendance Today", value: "94%", label: "Marked for Grade 8-B" };
      case 'Parent':
        return { title: "Fees Due", value: "₹450", label: "For October Term" };
      default:
        return null;
    }
  };

  const erpData = getErpData();

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500 overflow-hidden">
      
      {/* 1. ERP QUICK ACCESS (Only for B2B) */}
      {isB2B && erpData && (
        <section className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row items-center gap-6 group hover:border-primary/30 transition-colors mx-1">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Database className="h-8 w-8" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-black text-xl text-slate-900 tracking-tight">{erpData.title}</h2>
            <p className="font-bold text-slate-500 text-sm">{erpData.value} <span className="font-medium text-slate-400">- {erpData.label}</span></p>
          </div>
          <Button asChild className="w-full sm:w-auto h-12 rounded-xl font-black shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <Link href="/erp">Go to ERP <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </section>
      )}

      {/* 2. WELCOME BANNER */}
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl mx-1">
         <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/30 to-transparent opacity-50"></div>
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-amber-400">
               <Sparkles className="h-5 w-5 fill-amber-400" />
               <span className="text-xs font-black uppercase tracking-[0.2em]">New For You</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">Hello, {currentRole}!</h1>
            <p className="text-slate-400 text-sm md:text-base max-w-md font-medium mb-6">Explore new courses, toys, and school essentials curated just for your profile.</p>
            <Button onClick={() => setShortsOpen(true)} className="rounded-full font-black px-6 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-white">
               WATCH SKILL BITES <PlayCircle className="ml-2 h-4 w-4" />
            </Button>
         </div>
      </section>

      {/* 3. CONTINUE LEARNING (Side Slider) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
           <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
             <Clock className="h-5 w-5 text-primary" /> Continue Learning
           </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x px-1 pb-4 -mx-4 sm:mx-0 sm:px-0 pl-4 sm:pl-0">
           {myActiveCourses.map((course) => (
             <Link href="/lms" key={course.id} className="min-w-[280px] md:min-w-[320px] snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer flex flex-col shrink-0">
                <div className={cn("h-32 w-full relative flex items-center justify-center", course.image)}>
                   <PlayCircle className="h-10 w-10 text-white/70 group-hover:scale-110 group-hover:text-white transition-all shadow-xl rounded-full" />
                </div>
                <div className="p-5 flex flex-col flex-1 bg-white">
                   <h3 className="font-black text-slate-900 text-lg leading-tight mb-4">{course.title}</h3>
                   <div className="mt-auto">
                     <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                       <span>{course.timeLeft}</span>
                       <span className="text-primary">{course.progress}%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-primary" style={{ width: `${course.progress}%` }}></div>
                     </div>
                   </div>
                </div>
             </Link>
           ))}
        </div>
      </section>

      {/* 4. TRENDING COURSES (Side Slider) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
           <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
             <GraduationCap className="h-5 w-5 text-rose-500" /> Top Skill Journeys
           </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x px-1 pb-4 -mx-4 sm:mx-0 sm:px-0 pl-4 sm:pl-0">
           {courseBites.map((course) => (
             <Link href="/lms" key={course.id} className="min-w-[240px] md:min-w-[280px] snap-start bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden group hover:border-primary/40 hover:shadow-lg transition-all cursor-pointer flex flex-col shrink-0">
                <div className={cn("h-36 w-full relative flex items-center justify-center", course.image)}>
                   <PlayCircle className="h-10 w-10 text-white/50 group-hover:scale-110 group-hover:text-white transition-all" />
                </div>
                <div className="p-4">
                   <h3 className="font-bold text-slate-900 leading-tight mb-1">{course.title}</h3>
                   <p className="text-[10px] text-slate-400 font-bold mb-3 uppercase">{course.author}</p>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                         <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                         <span className="text-[10px] font-black">{course.rating}</span>
                      </div>
                      <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded">ENROLL</span>
                   </div>
                </div>
             </Link>
           ))}
        </div>
      </section>

      {/* 5. SHOP CATEGORIES (Side Slider) */}
      <section className="space-y-4">
         <div className="flex items-center justify-between px-1">
           <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
             <ShoppingBag className="h-5 w-5 text-emerald-500" /> Marketplace
           </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-1 pb-2 -mx-4 sm:mx-0 sm:px-0 pl-4 sm:pl-0 snap-x">
           {shopCats.map((cat) => (
             <Link href="/marketplace" key={cat.name} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group snap-start">
                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:scale-110 group-hover:border-primary/20 transition-all", cat.color)}>
                   {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-primary">{cat.name}</span>
             </Link>
           ))}
        </div>
      </section>

      {/* 6. LIBRARY FEATURED */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
           <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
             <BookOpen className="h-5 w-5 text-indigo-500" /> New in Library
           </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-1 mx-1">
           {libraryNew.map((item) => (
             <Link href="/library" key={item.title} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer">
                <div className={cn("h-16 w-16 rounded-2xl shrink-0 shadow-inner", item.img)}></div>
                <div>
                   <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.type}</p>
                   <h4 className="font-bold text-slate-900">{item.title}</h4>
                   <p className="text-[10px] text-slate-400 font-medium">Available for Checkout</p>
                </div>
             </Link>
           ))}
        </div>
      </section>

    </div>
  );
}