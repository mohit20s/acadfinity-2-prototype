"use client";

import { useEffect, useRef } from "react";
import { Heart, MessageCircle, Bookmark, Share2, PlayCircle, X, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { useRouter } from "next/navigation";

export function GlobalShortsPlayer() {
  const { isShortsOpen, setShortsOpen } = usePrototypeStore();
  const router = useRouter();
  const playerRef = useRef<HTMLDivElement>(null);

  // --- NATIVE FULLSCREEN LOGIC ---
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (playerRef.current && document.fullscreenElement === null) {
          await playerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.log("Fullscreen API not supported or blocked by user.", err);
      }
    };

    const exitFullscreen = async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.log("Exit fullscreen failed.", err);
      }
    };

    if (isShortsOpen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }

    // Cleanup: Exit fullscreen if the component unmounts unexpectedly
    return () => {
      exitFullscreen();
    };
  }, [isShortsOpen]);

  const handleClose = () => {
    setShortsOpen(false); // The useEffect will handle exiting fullscreen automatically
  };

  if (!isShortsOpen) return null;

  return (
    // The ref is attached to this outermost div. This is the element that becomes fullscreen.
    <div 
      ref={playerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black animate-in fade-in zoom-in-95 duration-300"
    >
      
      {/* Full Screen Mobile Player Container */}
      <div className="w-full max-w-md h-[100dvh] relative shadow-2xl flex flex-col justify-between overflow-hidden bg-slate-900">
        
        {/* Top Bar */}
        <div className="p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10 absolute top-0 w-full pt-safe-area-inset-top">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={handleClose}>
            <X className="h-6 w-6" />
          </Button>
          <span className="text-white font-black text-xs uppercase tracking-[0.2em] bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">Skill Bites</span>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Video Placeholder (Center) */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
           <PlayCircle className="h-24 w-24 text-white/30 animate-pulse" />
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-3 bottom-40 flex flex-col gap-6 items-center z-10">
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-rose-500/80 transition-colors border border-white/10"><Heart className="h-6 w-6" /></div>
            <span className="text-white text-[10px] font-black drop-shadow-md">12.4K</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors border border-white/10"><MessageCircle className="h-6 w-6" /></div>
            <span className="text-white text-[10px] font-black drop-shadow-md">342</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors border border-white/10"><Bookmark className="h-6 w-6" /></div>
            <span className="text-white text-[10px] font-black drop-shadow-md">Save</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors border border-white/10"><Share2 className="h-6 w-6" /></div>
            <span className="text-white text-[10px] font-black drop-shadow-md">Share</span>
          </div>
        </div>

        {/* Bottom Info Area */}
        <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-10 absolute bottom-0 w-full flex flex-col gap-3 pb-8 pt-24">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-black border-2 border-white shadow-lg">AK</div>
              <span className="text-white font-black text-sm drop-shadow-md">Arun Kumar</span>
            </div>
            <h3 className="text-white font-black text-xl leading-tight drop-shadow-md">Mastering Python Loops 🐍</h3>
            <p className="text-white/80 text-xs font-medium mt-2 max-w-[85%] line-clamp-2">Learn list comprehensions, lambda functions, and zip() in 60 seconds!</p>
          </div>
          
          <div className="mt-4 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/20 transition-colors" 
            onClick={() => {
              handleClose(); // Close player AND exit fullscreen
              router.push('/lms'); // Redirect to the course
            }}>
             <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-inner"><FileText className="h-5 w-5" /></div>
               <div><p className="text-white text-xs font-black">Python Masterclass</p><p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-0.5">Full Course</p></div>
             </div>
             <span className="text-slate-900 text-xs font-black bg-white px-5 py-2.5 rounded-full shadow-lg">ENROLL</span>
          </div>
        </div>
      </div>
    </div>
  );
}