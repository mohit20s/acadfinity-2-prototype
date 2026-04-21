"use client";

import { 
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, 
  Play, FileText, Download, PenTool, Lock, CheckCircle2, 
  MoreVertical, ChevronUp, ChevronDown, Maximize2, Minimize2, HelpCircle, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const midVideoQuestion = {
  question: "What is the primary purpose of a variable in Python?",
  options: ["To store data values", "To create a loop", "To import libraries", "To print text"],
  correct: 0
};

export default function SeekhoLessonPlayerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [mcqState, setMcqState] = useState<'none' | 'mid_active' | 'mid_done'>('none');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const [readingMaterial, setReadingMaterial] = useState<'preread' | 'postread' | null>(null);

  // --- NEW: STRICT VIDEO CONTROL FUNCTIONS ---
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (isPlaying) pauseVideo();
    else resumeVideo();
  };

  // --- OTHER EVENT HANDLERS ---
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    if (time >= 5 && time < 6 && mcqState === 'none') {
      pauseVideo(); // Use the strict pause function here too!
      setMcqState('mid_active');
    }
  };

  const handleMCQSubmit = () => {
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setSelectedOption(null);
      setMcqState('mid_done');
      resumeVideo(); // Auto-resume after answering
    }, 2000);
  };

  const toggleFullscreen = async () => {
    const elem = playerContainerRef.current;
    if (!elem) return;
    if (!document.fullscreenElement) {
      try { await elem.requestFullscreen({ navigationUI: "hide" }); } catch (err) {}
    } else {
      await document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div ref={playerContainerRef} className="bg-black h-[100dvh] w-full text-white md:bg-slate-900 animate-in fade-in duration-500 overflow-hidden flex flex-col relative">
      <div className="w-full max-w-md mx-auto h-full bg-black md:shadow-2xl md:border-x border-slate-800 relative overflow-hidden flex flex-col">
        
        {/* =========================================
            1. THE VIDEO PLAYER
            ========================================= */}
        <div className={cn("relative w-full transition-all duration-500 ease-in-out bg-slate-900 z-10 flex flex-col", isFullscreen ? "h-[100dvh]" : isMaterialsOpen ? "h-[35vh]" : "h-[100dvh]")}>
          
          <video 
            ref={videoRef} 
            src="/sample-video.mp4" 
            autoPlay 
            muted 
            playsInline 
            onTimeUpdate={handleTimeUpdate} 
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" 
          />

          {/* MCQ Overlay */}
          {mcqState === 'mid_active' && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in zoom-in-95">
              <div className="bg-slate-900 border-2 border-primary/30 p-6 rounded-3xl w-full max-w-sm text-center">
                 <h3 className="text-white font-black text-xl mb-4">Quick Knowledge Check!</h3>
                 <div className="space-y-3 mb-6">
                   {midVideoQuestion.options.map((opt, idx) => (
                     <button key={idx} onClick={() => setSelectedOption(idx)} className={cn("w-full p-3 rounded-xl border-2 text-sm font-bold", selectedOption === idx ? "border-primary bg-primary/20" : "border-slate-700 bg-slate-800")}>{opt}</button>
                   ))}
                 </div>
                 <Button disabled={selectedOption === null} onClick={handleMCQSubmit} className="w-full h-12 rounded-full font-black">Submit Answer</Button>
              </div>
            </div>
          )}
          
          <div className="absolute top-0 left-0 right-0 p-3 pt-safe-area-inset-top z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
            <button onClick={() => isFullscreen ? toggleFullscreen() : router.back()} className="p-2 bg-black/40 backdrop-blur-md rounded-full"><ArrowLeft className="h-5 w-5 text-white" /></button>
            <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2"><span className="text-[10px] font-black uppercase tracking-widest text-white">Module 1.1</span></div>
            <button onClick={toggleFullscreen} className="p-2 bg-black/40 backdrop-blur-md rounded-full">{isFullscreen ? <Minimize2 className="h-5 w-5 text-white" /> : <Maximize2 className="h-5 w-5 text-white" />}</button>
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
            {!isPlaying && mcqState === 'none' && <div className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"><Play className="h-8 w-8 text-white fill-white ml-1" /></div>}
          </div>

          <div className={cn("absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500", isMaterialsOpen ? "p-3 pt-12" : "p-4 pt-24 pb-8")}>
            <h2 className="font-bold text-white leading-tight drop-shadow-md mb-4">Introduction to Variables</h2>
            {!isMaterialsOpen && !isFullscreen && (
              <button onClick={() => setIsMaterialsOpen(true)} className="w-full flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition-colors animate-bounce mt-2">
                <ChevronUp className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Swipe up for materials</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================
            2. THE SLIDE-UP MATERIALS DRAWER
            ========================================= */}
        <div className={cn("absolute left-0 right-0 bottom-0 bg-[#0f0f13] rounded-t-3xl z-30 flex flex-col transition-transform duration-500 ease-in-out shadow-[0_-20px_40px_rgba(0,0,0,0.5)]", isMaterialsOpen ? "translate-y-0 h-[65vh]" : "translate-y-full h-[65vh]")}>
          
          <div className="w-full flex flex-col items-center justify-center pt-3 pb-2 cursor-pointer shrink-0 border-b border-white/5" onClick={() => setIsMaterialsOpen(false)}>
             <div className="h-1.5 w-12 bg-white/20 rounded-full mb-2"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400"><ChevronDown className="inline h-3 w-3" /> Hide Materials</span>
          </div>

          <div className="flex-1 overflow-y-auto pb-20 px-1">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Lesson Materials</h3>
              <div className="space-y-2">
                
                {/* --- CLICK TO OPEN READING AND PAUSE VIDEO --- */}
                <div 
                  onClick={() => {
                     setReadingMaterial('preread');
                     pauseVideo(); // EXACTLY pause the video!
                  }} 
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-emerald-500/30 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><FileText className="h-4 w-4" /></div>
                    <div><p className="text-xs font-bold text-emerald-400">Pre-Read: Core Concepts</p><p className="text-[9px] text-slate-400 uppercase font-bold mt-0.5">Click to Read • 5 mins</p></div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3"><div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg"><Download className="h-4 w-4" /></div><div><p className="text-xs font-bold text-white">Cheat Sheet</p><p className="text-[9px] text-slate-400 uppercase font-bold mt-0.5">PDF Resource • 1.2 MB</p></div></div>
                  <Download className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
            
            {/* The rest of the drawer content... */}
            <div className="p-4 border-b border-white/5"><h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Action Required</h3><div className="p-5 bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/30 rounded-2xl"><span className="text-[9px] font-black uppercase bg-purple-500 text-white px-2 py-0.5 rounded">Assignment</span><h4 className="font-bold text-white text-base mt-2 mb-4">Variables Worksheet</h4><Button className="w-full bg-white text-black font-black rounded-xl h-10 text-xs">Start Assignment</Button></div></div>
          </div>
        </div>

        {/* =========================================
            3. THE READING MODE OVERLAY
            ========================================= */}
        {readingMaterial && (
          <div className="absolute inset-0 z-50 bg-white text-slate-900 flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 bg-white shadow-sm">
              
              {/* --- CLICK TO CLOSE READING AND RESUME VIDEO --- */}
              <button 
                onClick={() => {
                  setReadingMaterial(null);
                  resumeVideo(); // EXACTLY resume the video!
                }} 
                className="flex items-center gap-2 text-slate-900 font-bold hover:text-primary"
              >
                <X className="h-5 w-5" /> Close Reading
              </button>
              
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-primary"><Bookmark className="h-5 w-5" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 pb-24">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pre-Read Material</span>
               <h1 className="text-3xl font-black text-slate-900 leading-tight my-4">Chapter 1: Welcome & Program Overview</h1>
               <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                 <h3 className="font-bold text-slate-900 mb-3">Table of Contents</h3>
                 <ul className="space-y-2 text-sm font-medium text-primary">
                   <li>1.1 What to Expect Over the Next 14 Days</li>
                   <li>1.2 Key Outcomes You'll Walk Away With</li>
                 </ul>
               </div>

               <article className="prose prose-slate max-w-none">
                 <h2 className="text-xl font-black text-slate-900 mb-3">1.1 What to Expect</h2>
                 <p className="text-slate-600 leading-relaxed text-base mb-6 font-medium">
                   Before you watch the video, please review the safety guidelines and risk management structures required for sustainable deployment of logic flows.
                 </p>
                 <h3 className="text-lg font-black text-slate-900 mb-3">Common Risks</h3>
                 <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 font-medium">
                   <li><strong>Bias:</strong> Models can perpetuate harmful stereotypes.</li>
                   <li><strong>Misinformation:</strong> Generating vast quantities of false content.</li>
                 </ul>
               </article>

               <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
                 <Button 
                   onClick={() => {
                     setReadingMaterial(null);
                     resumeVideo(); // Auto-resume video when finished reading!
                   }} 
                   className="h-12 px-8 rounded-full font-black shadow-lg"
                 >
                   Finish Reading & Return to Video
                 </Button>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}