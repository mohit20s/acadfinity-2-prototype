"use client";
import { 
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, 
  Play, FileText, Download, PenTool, Lock, CheckCircle2, 
  MoreVertical, ChevronUp, ChevronDown, Maximize2, Minimize2,
  FileUp, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SeekhoLessonPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const router = useRouter();
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // NEW: Local state to manage assignment submission within the lesson
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to toggle fullscreen, triggered by a button click
  const toggleFullscreen = async () => {
    const elem = playerContainerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      try {
        await elem.requestFullscreen({ navigationUI: "hide" });
      } catch (err) {
        console.error("Fullscreen request failed", err);
      }
    } else {
      await document.exitFullscreen();
    }
  };

  // Effect to listen for native fullscreen changes (e.g., user pressing ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

return (
    <div 
      ref={playerContainerRef}
      className="bg-black h-[100dvh] w-full text-white md:bg-slate-900 animate-in fade-in duration-500 overflow-hidden flex flex-col relative"
    >
      <div className="w-full max-w-md mx-auto h-full bg-black md:shadow-2xl md:border-x border-slate-800 relative overflow-hidden flex flex-col">
        
        {/* =========================================
            1. THE VIDEO PLAYER
            ========================================= */}
        <div className={cn(
          "relative w-full transition-all duration-500 ease-in-out bg-slate-900 z-10 flex flex-col",
          isMaterialsOpen ? "h-[35vh]" : "h-full" 
        )}>
          {/* Mock Video Background */}
         <video 
  src="/sample-video.mp4" 
  autoPlay 
  loop 
  muted 
  playsInline
  className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
/>
          {/* Top Nav */}
          <div className="absolute top-0 left-0 right-0 p-3 pt-safe-area-inset-top z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
            <button onClick={() => router.back()} className="p-2 bg-black/40 backdrop-blur-md rounded-full"><ArrowLeft className="h-5 w-5 text-white" /></button>
            <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Module 1.1</span>
            </div>
            <button onClick={toggleFullscreen} className="p-2 bg-black/40 backdrop-blur-md rounded-full">{isFullscreen ? <Minimize2 className="h-5 w-5 text-white" /> : <Maximize2 className="h-5 w-5 text-white" />}</button>
          </div>

          {/* Center Play/Pause */}
          <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
            {!isPlaying && <div className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"><Play className="h-8 w-8 text-white fill-white ml-1" /></div>}
          </div>

          {/* Bottom Info & Swipe Up Prompt */}
          <div className={cn("absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500", isMaterialsOpen ? "p-3 pt-12" : "p-4 pt-24 pb-8")}>
            <h2 className={cn("font-bold text-white leading-tight drop-shadow-md mb-2 transition-all", isMaterialsOpen ? "text-sm w-full line-clamp-1" : "text-lg w-[80%] line-clamp-2")}>Introduction to Variables</h2>
            <div className="h-1 w-full bg-white/20 rounded-full relative mb-4">
               <div className="absolute left-0 top-0 h-full w-[35%] bg-purple-500 rounded-full"></div>
            </div>
            {!isMaterialsOpen && (
              <button onClick={() => setIsMaterialsOpen(true)} className="w-full flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition-colors animate-bounce mt-2">
                <ChevronUp className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Swipe up for materials</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================
            2. THE SLIDE-UP MATERIALS DRAWER (WITH EMBEDDED ASSIGNMENT)
            ========================================= */}
        <div className={cn("absolute left-0 right-0 bottom-0 bg-[#0f0f13] rounded-t-3xl z-40 flex flex-col transition-transform duration-500 ease-in-out shadow-[0_-20px_40px_rgba(0,0,0,0.5)]", isMaterialsOpen ? "translate-y-0 h-[65vh]" : "translate-y-full h-[65vh]")}>
          
          <div className="w-full flex flex-col items-center justify-center pt-3 pb-2 cursor-pointer shrink-0 border-b border-white/5" onClick={() => setIsMaterialsOpen(false)}>
             <div className="h-1.5 w-12 bg-white/20 rounded-full mb-2"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400"><ChevronDown className="inline h-3 w-3" /> Hide Materials</span>
          </div>

          <div className="flex-1 overflow-y-auto pb-20 px-1">
            
            {/* Lesson Materials */}
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Lesson Materials</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-emerald-500/30"><div className="flex items-center gap-3"><div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><FileText className="h-4 w-4" /></div><div><p className="text-xs font-bold text-emerald-400">Pre-Read: Core Concepts</p></div></div><CheckCircle2 className="h-4 w-4 text-emerald-500" /></div>
              </div>
            </div>

            {/* --- NEW: INTEGRATED ASSIGNMENT BLOCK --- */}
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Action Required</h3>
              
              {isSubmitted ? (
                // VIEW AFTER SUBMISSION
                <div className="p-5 bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/30 rounded-2xl animate-in fade-in duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Submitted for Grading</span>
                  </div>
                  <h4 className="font-bold text-white text-base">Variables Worksheet</h4>
                  <p className="text-xs text-slate-300 mt-1 mb-4 font-medium">Your work has been sent to the instructor. You will be notified when it's graded.</p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 font-bold rounded-xl h-10 text-xs">Resubmit Work</Button>
                </div>
              ) : (
                // VIEW BEFORE SUBMISSION
                <div className="p-5 bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/30 rounded-2xl">
                   <span className="text-[9px] font-black uppercase tracking-widest bg-purple-500 text-white px-2 py-0.5 rounded">Assignment</span>
                   <h4 className="font-bold text-white text-base mt-3 mb-1">Variables Worksheet</h4>
                   <p className="text-xs text-slate-300 mb-4 font-medium">Complete 10 practical questions to unlock the next video.</p>
                   {/* This is the drag-and-drop area */}
                   <div className="h-24 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/5 transition-colors mb-4">
                      <FileUp className="h-6 w-6 text-slate-400 group-hover:text-white" />
                      <p className="text-xs font-bold text-slate-300 mt-1">Upload your file</p>
                   </div>
                   <Button onClick={() => setIsSubmitted(true)} className="w-full bg-white text-black hover:bg-slate-200 font-black rounded-xl h-10 shadow-lg shadow-purple-500/20 text-xs">Submit Assignment</Button>
                </div>
              )}
            </div>

            {/* "Up Next" Playlist */}
            <div className="p-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Up Next</h3>
              <div className="space-y-3">
                <div className={cn("flex items-center gap-3 p-3 rounded-xl border border-white/5", isSubmitted ? "" : "opacity-50")}>
                   <div className="h-14 w-20 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                     {isSubmitted ? <Play className="h-5 w-5 text-white" /> : <Lock className="h-4 w-4 text-white/50" />}
                   </div>
                   <div className="flex-1">
                      <h4 className={cn("font-bold text-sm leading-tight mb-1", isSubmitted ? "text-white" : "text-slate-400")}>1.2 - Solving Linear Equations</h4>
                      <p className={cn("text-[9px] font-bold uppercase tracking-wider", isSubmitted ? "text-primary" : "text-slate-500")}>
                        {isSubmitted ? "Unlocked" : "Locked"}
                      </p>
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