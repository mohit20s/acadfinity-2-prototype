"use client";

import { 
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, 
  Play, FileText, Download, PenTool, Lock, CheckCircle2, 
  MoreVertical, ChevronUp, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SeekhoLessonPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  
  // NEW: State to manage the Slide-Up Materials Drawer
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);

  return (
    // MAIN CONTAINER: Locked to screen height, absolutely no body scrolling.
    <div className="bg-black h-[100dvh] w-full text-white md:bg-slate-900 animate-in fade-in duration-500 overflow-hidden flex flex-col relative">
      
      {/* Desktop Wrapper (Constrains width on large screens to look like a phone) */}
      <div className="w-full max-w-md mx-auto h-full bg-black md:shadow-2xl md:border-x border-slate-800 relative overflow-hidden">
        
        {/* =========================================
            1. THE FULL-SCREEN VIDEO PLAYER
            ========================================= */}
        <div className={cn(
          "absolute top-0 left-0 right-0 w-full transition-all duration-500 ease-in-out bg-slate-900 z-10",
          // If drawer is open, video visually shrinks to 35vh. If closed, it's 100vh full screen!
          isMaterialsOpen ? "h-[35vh]" : "h-[100dvh]" 
        )}>
          {/* Mock Video Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 transition-all duration-500"></div>
          
          {/* Top Nav (Back Button & Context) */}
          <div className="absolute top-0 left-0 right-0 p-3 pt-safe-area-inset-top z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
            <button onClick={() => router.back()} className="p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <div className="h-2 w-2 bg-rose-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Module 1.1</span>
            </div>
            <button className="p-2 text-white"><MoreVertical className="h-5 w-5" /></button>
          </div>

          {/* Center Play/Pause Toggle Simulator */}
          <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
            {!isPlaying && (
              <div className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </div>
            )}
          </div>

          {/* Right Side Floating Actions (Hide when Drawer is Open) */}
          <div className={cn(
            "absolute right-3 bottom-32 z-20 flex flex-col gap-4 items-center transition-opacity duration-300",
            isMaterialsOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-1 group">
              <Heart className={cn("h-7 w-7 transition-colors drop-shadow-lg", isLiked ? "fill-rose-500 text-rose-500" : "text-white group-hover:text-rose-400")} />
              <span className="text-[10px] font-bold drop-shadow-md">12K</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <MessageCircle className="h-7 w-7 text-white drop-shadow-lg group-hover:text-blue-400 transition-colors" />
              <span className="text-[10px] font-bold drop-shadow-md">342</span>
            </button>
            <button onClick={() => setIsSaved(!isSaved)} className="flex flex-col items-center gap-1 group">
              <Bookmark className={cn("h-7 w-7 transition-colors drop-shadow-lg", isSaved ? "fill-amber-400 text-amber-400" : "text-white group-hover:text-amber-400")} />
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <Share2 className="h-7 w-7 text-white drop-shadow-lg group-hover:text-emerald-400 transition-colors" />
            </button>
          </div>

          {/* Bottom Info & Swipe Up Prompt */}
          <div className={cn(
            "absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500",
            isMaterialsOpen ? "p-3 pt-12" : "p-4 pt-24 pb-8"
          )}>
            <h2 className={cn("font-bold text-white leading-tight drop-shadow-md mb-2 transition-all", isMaterialsOpen ? "text-sm w-full line-clamp-1" : "text-lg w-[80%] line-clamp-2")}>
              Introduction to Variables in Python
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-5 w-5 rounded-md bg-indigo-500 flex items-center justify-center font-bold text-[8px] border border-white/20">AK</div>
              <p className="text-xs font-bold text-slate-300 flex items-center gap-1">Arun Kumar <CheckCircle2 className="h-3 w-3 text-blue-400 fill-blue-400/20" /></p>
            </div>

            {/* The actual progress bar */}
            <div className="h-1 w-full bg-white/20 rounded-full relative mb-4">
               <div className="absolute left-0 top-0 h-full w-[35%] bg-purple-500 rounded-full">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(168,85,247,1)]"></div>
               </div>
            </div>

            {/* BUTTON TO OPEN MATERIALS DRAWER */}
            {!isMaterialsOpen && (
              <button 
                onClick={() => setIsMaterialsOpen(true)}
                className="w-full flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition-colors animate-bounce mt-2"
              >
                <ChevronUp className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Swipe up for course materials</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================
            2. THE SLIDE-UP MATERIALS DRAWER (BOTTOM SHEET)
            ========================================= */}
        <div className={cn(
          "absolute left-0 right-0 bottom-0 bg-[#0f0f13] rounded-t-3xl z-40 flex flex-col transition-transform duration-500 ease-in-out shadow-[0_-20px_40px_rgba(0,0,0,0.5)]",
          // If open, it slides up to cover 65vh. If closed, it hides below the screen.
          isMaterialsOpen ? "translate-y-0 h-[65vh]" : "translate-y-full h-[65vh]"
        )}>
          
          {/* Drawer Pull Handle (Click to close) */}
          <div 
            className="w-full flex flex-col items-center justify-center pt-3 pb-2 cursor-pointer shrink-0 border-b border-white/5"
            onClick={() => setIsMaterialsOpen(false)}
          >
             <div className="h-1.5 w-12 bg-white/20 rounded-full mb-2"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
               <ChevronDown className="h-3 w-3" /> Hide Materials
             </span>
          </div>

          {/* Scrollable Content inside the Drawer */}
          <div className="flex-1 overflow-y-auto pb-20 px-1">
            
            {/* Section: Lesson Materials */}
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Lesson Materials</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-emerald-500/30">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><FileText className="h-4 w-4" /></div>
                    <div><p className="text-xs font-bold text-emerald-400">Pre-Read: Core Concepts</p><p className="text-[9px] text-slate-400 uppercase font-bold mt-0.5">Completed • 5 mins</p></div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg"><Download className="h-4 w-4" /></div>
                    <div><p className="text-xs font-bold text-white">Cheat Sheet</p><p className="text-[9px] text-slate-400 uppercase font-bold mt-0.5">PDF Resource • 1.2 MB</p></div>
                  </div>
                  <Download className="h-4 w-4 text-slate-400" />
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-500/20 text-slate-400 rounded-lg"><FileText className="h-4 w-4" /></div>
                    <div><p className="text-xs font-bold text-white">Post-Read: Summary</p><p className="text-[9px] text-slate-400 uppercase font-bold mt-0.5">Unlock by finishing video</p></div>
                  </div>
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Section: Required Assignment */}
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Action Required</h3>
              <div className="p-5 bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/30 rounded-2xl relative overflow-hidden">
                 <div className="absolute right-[-10px] top-[-10px] opacity-20"><PenTool className="h-24 w-24 text-purple-400" /></div>
                 <div className="relative z-10">
                   <span className="text-[9px] font-black uppercase tracking-widest bg-purple-500 text-white px-2 py-0.5 rounded">Assignment</span>
                   <h4 className="font-bold text-white text-base mt-2 mb-1">Variables Worksheet</h4>
                   <p className="text-xs text-slate-300 mb-4 font-medium">Complete 10 practical coding questions to unlock the next video lesson.</p>
                   <Button className="w-full bg-white text-black hover:bg-slate-200 font-black rounded-xl h-10 shadow-lg shadow-purple-500/20 text-xs">Start Assignment</Button>
                 </div>
              </div>
            </div>

            {/* Section: Next in Module (Playlist) */}
            <div className="p-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Up Next in Module 1</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 opacity-50">
                   <div className="h-14 w-20 bg-slate-800 rounded-lg border border-white/10 flex items-center justify-center relative shrink-0">
                     <Lock className="h-4 w-4 text-white/50" />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-bold text-white text-xs leading-tight mb-1">1.2 - Solving Linear Equations</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Video • 8 mins</p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}