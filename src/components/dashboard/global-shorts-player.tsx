"use client";

import { Heart, MessageCircle, Bookmark, Share2, PlayCircle, X, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { useRouter } from "next/navigation";

export function GlobalShortsPlayer() {
  const { isShortsOpen, setShortsOpen } = usePrototypeStore();
  const router = useRouter();

  if (!isShortsOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black animate-in fade-in zoom-in-95 duration-300 md:hidden">
      
      {/* Full Screen Mobile Player Container */}
      <div className="w-full h-full relative shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Top Bar */}
        <div className="p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10 absolute top-0 w-full pt-safe-area-inset-top">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => setShortsOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
          <span className="text-white font-bold text-xs uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Skill Bites</span>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Video Placeholder (Center) */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
           <PlayCircle className="h-24 w-24 text-white/30 animate-pulse" />
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-40 flex flex-col gap-6 items-center z-10">
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-rose-500/80 transition-colors"><Heart className="h-6 w-6" /></div>
            <span className="text-white text-xs font-bold drop-shadow-md">12.4K</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"><MessageCircle className="h-6 w-6" /></div>
            <span className="text-white text-xs font-bold drop-shadow-md">342</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"><Bookmark className="h-6 w-6" /></div>
            <span className="text-white text-xs font-bold drop-shadow-md">Save</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"><Share2 className="h-6 w-6" /></div>
            <span className="text-white text-xs font-bold drop-shadow-md">Share</span>
          </div>
        </div>

        {/* Bottom Info Area */}
        <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10 absolute bottom-0 w-full flex flex-col gap-3 pb-8 pt-20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">AK</div>
              <span className="text-white font-bold text-sm drop-shadow-md">Arun Kumar</span>
            </div>
            <h3 className="text-white font-bold text-xl leading-tight drop-shadow-md">Mastering Python Loops 🐍</h3>
            <p className="text-white/80 text-sm mt-1 max-w-[85%] line-clamp-2">Learn list comprehensions, lambda functions, and zip() in 60 seconds!</p>
          </div>
          
          <div className="mt-2 p-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/30 transition-colors" 
            onClick={() => {
              setShortsOpen(false);
              router.push('/lms');
            }}>
             <div className="flex items-center gap-3">
               <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center text-white"><FileText className="h-4 w-4" /></div>
               <div><p className="text-white text-xs font-bold">Python Masterclass</p><p className="text-white/80 text-[10px]">Full Course</p></div>
             </div>
             <span className="text-slate-900 text-xs font-bold bg-white px-4 py-2 rounded-full shadow-lg">Enroll</span>
          </div>
        </div>
      </div>
    </div>
  );
}