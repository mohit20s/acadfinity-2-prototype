import { PlayCircle, ShoppingBag, BookOpen, ChevronRight, Star, Sparkles, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data for Public Feed
const courseBites = [
  { id: 1, title: "Intro to AI", image: "bg-blue-600", author: "Dr. Malik", rating: "4.9" },
  { id: 2, title: "Python Pro", image: "bg-indigo-600", author: "Arun K.", rating: "4.8" },
  { id: 3, title: "Design 101", image: "bg-rose-600", author: "Sarah P.", rating: "4.7" },
  { id: 4, title: "Leadership", image: "bg-amber-600", author: "Capt. Vyas", rating: "4.9" },
];

const shopCats = [
  { name: "Stationery", icon: "✏️", color: "bg-emerald-50" },
  { name: "Lab Kits", icon: "🧪", color: "bg-blue-50" },
  { name: "Robotics", icon: "🤖", color: "bg-purple-50" },
  { name: "Books", icon: "📚", color: "bg-orange-50" },
  { name: "Uniforms", icon: "👕", color: "bg-sky-50" },
];

const libraryNew = [
  { title: "Solar System", type: "Digital App", img: "bg-slate-800" },
  { title: "Lego Robotics", type: "Physical Kit", img: "bg-slate-700" },
  { title: "Phonics App", type: "Digital Book", img: "bg-slate-600" },
];

export default function PublicHomePage() {
  return (
    <div className="w-full bg-slate-50/50">
      <div className="container mx-auto px-0 sm:px-4 md:px-8 space-y-10 py-6 md:py-10 animate-in fade-in duration-500 pb-20">
        
        {/* 1. ACTION BANNER */}
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl mx-4 sm:mx-0">
           <div className="absolute right-0 top-0 h-full w-full md:w-1/2 bg-gradient-to-l from-primary/40 to-transparent opacity-50"></div>
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-amber-400">
                 <Sparkles className="h-5 w-5 fill-amber-400" />
                 <span className="text-xs font-black uppercase tracking-[0.2em]">The K-12 Ecosystem</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">Welcome to Acadfinity.</h1>
              <p className="text-slate-300 text-sm md:text-base max-w-lg font-medium mb-8">
                Explore courses, procure school supplies, or access the digital library. 
                Whether you are a School or an Independent Learner, everything is here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <Button asChild className="rounded-full font-black px-8 h-12 shadow-xl shadow-primary/20">
                    <Link href="/login">Get Started <ChevronRight className="ml-2 h-4 w-4" /></Link>
                 </Button>
                 <Button asChild variant="outline" className="rounded-full font-black px-8 h-12 bg-transparent border-white/20 text-white hover:bg-white hover:text-slate-900">
                    <Link href="/solutions">View School Modules</Link>
                 </Button>
              </div>
           </div>
        </section>

        {/* 2. TRENDING COURSES (Horizontal Scroll) */}
        <section className="space-y-4 px-4 sm:px-0">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
               <GraduationCap className="h-5 w-5 text-primary" /> Trending Skills
             </h2>
          </div>
          {/* Scrollable Container */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
             {courseBites.map((course) => (
               <Link href="/login" key={course.id} className="min-w-[240px] md:min-w-[280px] snap-start bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-primary/30 transition-all cursor-pointer block">
                  <div className={cn("h-40 w-full relative flex items-center justify-center", course.image)}>
                     <PlayCircle className="h-12 w-12 text-white/50 group-hover:scale-110 group-hover:text-white transition-all" />
                  </div>
                  <div className="p-5">
                     <h3 className="font-black text-slate-900 text-lg leading-tight mb-1">{course.title}</h3>
                     <p className="text-[10px] text-slate-400 font-bold mb-4 uppercase">{course.author}</p>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                           <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                           <span className="text-xs font-black">{course.rating}</span>
                        </div>
                        <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">Enroll</span>
                     </div>
                  </div>
               </Link>
             ))}
          </div>
        </section>

        {/* 3. SHOP CATEGORIES */}
        <section className="space-y-4 px-4 sm:px-0">
           <div className="flex items-center justify-between">
             <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
               <ShoppingBag className="h-5 w-5 text-emerald-500" /> Marketplace
             </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
             {shopCats.map((cat) => (
               <Link href="/login" key={cat.name} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                  <div className={cn("h-20 w-20 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-sm border border-slate-100 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all", cat.color)}>
                     {cat.icon}
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-emerald-600">{cat.name}</span>
               </Link>
             ))}
          </div>
        </section>

        {/* 4. LIBRARY FEATURED */}
        <section className="space-y-4 px-4 sm:px-0">
          <div className="flex items-center justify-between">
             <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
               <BookOpen className="h-5 w-5 text-indigo-500" /> Hybrid Library
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {libraryNew.map((item) => (
               <Link href="/login" key={item.title} className="bg-white p-4 rounded-3xl border border-slate-200 flex items-center gap-4 hover:shadow-lg hover:border-indigo-500/30 transition-all cursor-pointer group">
                  <div className={cn("h-16 w-16 rounded-2xl shrink-0 shadow-inner group-hover:scale-105 transition-transform", item.img)}></div>
                  <div>
                     <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-0.5">{item.type}</p>
                     <h4 className="font-bold text-slate-900">{item.title}</h4>
                  </div>
               </Link>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
}