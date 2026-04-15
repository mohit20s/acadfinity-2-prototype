"use client";

import { usePrototypeStore } from "@/store/use-prototype-store";
import { PlayCircle, ShoppingBag, Library, ChevronRight, Star, Sparkles, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data for Seekho-style feed
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
  { title: "Solar System", type: "Digital", img: "bg-slate-800" },
  { title: "Lego Robotics", type: "Physical", img: "bg-slate-700" },
  { title: "Phonics App", type: "Digital", img: "bg-slate-600" },
];

export default function DiscoveryHomePage() {
  const { currentRole, setShortsOpen } = usePrototypeStore();

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500">
      
      {/* 1. WELCOME BANNER (Personalized) */}
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl">
         <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/30 to-transparent opacity-50"></div>
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 text-amber-400">
               <Sparkles className="h-5 w-5 fill-amber-400" />
               <span className="text-xs font-black uppercase tracking-[0.2em]">New For You</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">Hello, {currentRole}!</h1>
            <p className="text-slate-400 text-sm md:text-base max-w-md font-medium mb-6">Explore new courses, toys, and school essentials curated just for your profile.</p>
            <Button onClick={() => setShortsOpen(true)} className="rounded-full font-black px-6 shadow-xl shadow-primary/20">
               START WATCHING <PlayCircle className="ml-2 h-4 w-4" />
            </Button>
         </div>
      </section>

      {/* 2. TRENDING COURSES (Horizontal Scroll) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
           <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
             <GraduationCap className="h-5 w-5 text-primary" /> Top Skill Journeys
           </h2>
           <Link href="/lms" className="text-xs font-bold text-primary flex items-center hover:underline uppercase tracking-widest">View All <ChevronRight className="h-3 w-3" /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x px-1 pb-4">
           {courseBites.map((course) => (
             <div key={course.id} className="min-w-[240px] md:min-w-[280px] snap-start bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:border-primary/30 transition-all cursor-pointer">
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
             </div>
           ))}
        </div>
      </section>

      {/* 3. SHOP CATEGORIES (Circle Icons) */}
      <section className="space-y-4">
         <div className="flex items-center justify-between px-1">
           <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
             <ShoppingBag className="h-5 w-5 text-emerald-500" /> Browse Marketplace
           </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-1 pb-2">
           {shopCats.map((cat) => (
             <div key={cat.name} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                <div className={cn("h-16 w-16 rounded-full flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:scale-110 group-hover:border-primary/20 transition-all", cat.color)}>
                   {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter group-hover:text-primary">{cat.name}</span>
             </div>
           ))}
        </div>
      </section>

      {/* 4. LIBRARY FEATURED (Staggered Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
           <h2 className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-2">
             <BookOpen className="h-5 w-5 text-indigo-500" /> New in Library
           </h2>
           <Link href="/library" className="text-xs font-bold text-primary uppercase tracking-widest">Explore <ChevronRight className="h-3 w-3" /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-1">
           {libraryNew.map((item) => (
             <div key={item.title} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer">
                <div className={cn("h-16 w-16 rounded-2xl shrink-0 shadow-inner", item.img)}></div>
                <div>
                   <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.type}</p>
                   <h4 className="font-bold text-slate-900">{item.title}</h4>
                   <p className="text-[10px] text-slate-400 font-medium">Available for Checkout</p>
                </div>
             </div>
           ))}
        </div>
      </section>

    </div>
  );
}