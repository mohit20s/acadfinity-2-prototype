"use client";

import { 
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, 
  Play, FileText, Download, PenTool, Lock, CheckCircle2, 
  MoreVertical, ChevronUp, ChevronDown, Maximize2, Minimize2, HelpCircle, X, Volume2, VolumeX, List,Clock,
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

const endVideoQuestion = {
  question: "Which of the following is an INVALID variable name?",
  options: ["my_var", "myVar", "1st_var", "_myVar"],
  correct: 2
};

export default function SeekhoLessonPlayerPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  // UI States
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingMaterial, setReadingMaterial] = useState<'preread' | 'postread' | null>(null);

  // Video Controls
  const [isMuted, setIsMuted] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  const [durationStr, setDurationStr] = useState("00:00");

  // MCQ States
  const [mcqState, setMcqState] = useState<'none' | 'mid_active' | 'mid_done' | 'end_active' | 'end_done'>('none');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  // Video Control Functions
  const pauseVideo = () => { if (videoRef.current) { videoRef.current.pause(); setIsPlaying(false); } };
  const resumeVideo = () => { if (videoRef.current) { videoRef.current.play(); setIsPlaying(true); } };
  const togglePlay = () => { if (isPlaying) pauseVideo(); else resumeVideo(); };

  const formatTime = (timeInSeconds: number) => {
    const m = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const s = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    
    setCurrentTimeStr(formatTime(current));
    setProgressPercent((current / duration) * 100);

    if (current >= 5 && current < 6 && mcqState === 'none') {
      pauseVideo();
      setMcqState('mid_active');
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDurationStr(formatTime(videoRef.current.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTo = (Number(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTo;
    setProgressPercent(Number(e.target.value));
  };

  const handleVideoEnd = () => {
    pauseVideo();
    setMcqState('end_active');
  };

  const handleMCQSubmit = () => {
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setSelectedOption(null);
      if (mcqState === 'mid_active') {
        setMcqState('mid_done');
        resumeVideo();
      } else if (mcqState === 'end_active') {
        setMcqState('end_done');
        setIsMaterialsOpen(true); 
      }
    }, 2500); 
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

  const renderMCQ = () => {
    if (mcqState === 'none' || mcqState === 'mid_done' || mcqState === 'end_done') return null;
    const qData = mcqState === 'mid_active' ? midVideoQuestion : endVideoQuestion;

    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900 border-2 border-primary/30 p-6 md:p-8 rounded-3xl w-full max-w-sm shadow-2xl text-center">
           <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4"><HelpCircle className="h-6 w-6" /></div>
           <h3 className="text-white font-black text-xl mb-1">{mcqState === 'mid_active' ? "Knowledge Check!" : "Lesson Complete!"}</h3>
           <p className="text-slate-300 text-sm font-medium mb-6 leading-relaxed">{qData.question}</p>
           <div className="space-y-3 w-full mb-6">
             {qData.options.map((opt, idx) => {
               const isSelected = selectedOption === idx;
               const isCorrect = idx === qData.correct;
               let btnClass = "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"; 
               if (isSelected) btnClass = "border-primary bg-primary/20 text-white";
               if (showResult) {
                 if (isCorrect) btnClass = "border-emerald-500 bg-emerald-500/20 text-emerald-400";
                 else if (isSelected && !isCorrect) btnClass = "border-rose-500 bg-rose-500/20 text-rose-400";
               }
               return (
                 <button key={idx} disabled={showResult} onClick={() => setSelectedOption(idx)} className={cn("w-full p-3 rounded-xl border-2 text-sm font-bold transition-all text-left flex justify-between items-center", btnClass)}>
                   {opt}
                   {showResult && isCorrect && <CheckCircle2 className="h-4 w-4" />}
                 </button>
               );
             })}
           </div>
           <Button disabled={selectedOption === null || showResult} onClick={handleMCQSubmit} className="w-full h-12 rounded-full font-black">{showResult ? "Evaluating..." : "Submit Answer"}</Button>
        </div>
      </div>
    );
  };

  return (
    <div ref={playerContainerRef} className="bg-black h-[100dvh] w-full text-white md:bg-slate-900 animate-in fade-in duration-500 overflow-hidden flex flex-col relative">
      <div className="w-full max-w-md mx-auto h-full bg-black md:shadow-2xl md:border-x border-slate-800 relative overflow-hidden flex flex-col">
        
        {/* =========================================
            1. THE VIDEO PLAYER
            ========================================= */}
        <div className={cn("relative w-full transition-all duration-500 ease-in-out bg-slate-900 z-10 flex flex-col", isFullscreen ? "h-[100dvh]" : isMaterialsOpen ? "h-[35vh]" : "h-[100dvh]")}>
          
          <video ref={videoRef} src="/sample-video.mp4" autoPlay muted={isMuted} playsInline onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={handleVideoEnd} className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />

          {renderMCQ()}
          
          <div className="absolute top-0 left-0 right-0 p-3 pt-safe-area-inset-top z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
            <button onClick={() => isFullscreen ? toggleFullscreen() : router.back()} className="p-2 bg-black/40 backdrop-blur-md rounded-full"><ArrowLeft className="h-5 w-5 text-white" /></button>
            <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2"><span className="text-[10px] font-black uppercase tracking-widest text-white">Module 1.1</span></div>
            <div className="flex gap-2">
              <button onClick={() => setIsMuted(!isMuted)} className="p-2 bg-black/40 backdrop-blur-md rounded-full">{isMuted ? <VolumeX className="h-5 w-5 text-rose-400" /> : <Volume2 className="h-5 w-5 text-white" />}</button>
              <button onClick={toggleFullscreen} className="p-2 bg-black/40 backdrop-blur-md rounded-full">{isFullscreen ? <Minimize2 className="h-5 w-5 text-white" /> : <Maximize2 className="h-5 w-5 text-white" />}</button>
            </div>
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
            {!isPlaying && mcqState === 'none' && <div className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"><Play className="h-8 w-8 text-white fill-white ml-1" /></div>}
          </div>

          <div className={cn("absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500", isMaterialsOpen ? "p-3 pt-12" : "p-4 pt-24 pb-8")}>
            <h2 className="font-bold text-white leading-tight drop-shadow-md mb-2">Introduction to Variables</h2>
            
            <div className="flex items-center gap-3 mb-2 w-full">
              <span className="text-[10px] font-mono font-bold">{currentTimeStr}</span>
              <div className="relative flex-1 h-2 group cursor-pointer flex items-center">
                <div className="absolute left-0 right-0 h-1 bg-white/20 rounded-full pointer-events-none"><div className="h-full bg-purple-500 rounded-full" style={{ width: `${progressPercent}%` }}></div></div>
                <input type="range" min="0" max="100" value={progressPercent} onChange={handleSeek} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
              <span className="text-[10px] font-mono font-bold text-white/50">{durationStr}</span>
            </div>

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
        <div className={cn("absolute left-0 right-0 bottom-0 bg-[#0f0f13] rounded-t-3xl z-40 flex flex-col transition-transform duration-500 ease-in-out shadow-[0_-20px_40px_rgba(0,0,0,0.5)]", isMaterialsOpen ? "translate-y-0 h-[65vh]" : "translate-y-full h-[65vh]")}>
          
          <div className="w-full flex flex-col items-center justify-center pt-3 pb-2 cursor-pointer shrink-0 border-b border-white/5" onClick={() => setIsMaterialsOpen(false)}>
             <div className="h-1.5 w-12 bg-white/20 rounded-full mb-2"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400"><ChevronDown className="inline h-3 w-3" /> Hide Materials</span>
          </div>

          <div className="flex-1 overflow-y-auto pb-20 px-1">
            
            {/* Materials */}
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Lesson Materials</h3>
              <div className="space-y-2">
                <div onClick={() => { setReadingMaterial('preread'); pauseVideo(); }} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-emerald-500/30 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3"><div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><FileText className="h-4 w-4" /></div><div><p className="text-xs font-bold text-emerald-400">Pre-Read: Core Concepts</p></div></div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3"><div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg"><Download className="h-4 w-4" /></div><div><p className="text-xs font-bold text-white">Cheat Sheet</p></div></div>
                  <Download className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
            
            {/* Practical Assignment */}
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Practical Application</h3>
              <div className="p-5 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/30 rounded-2xl relative overflow-hidden">
                 <div className="absolute right-[-10px] top-[-10px] opacity-20"><PenTool className="h-24 w-24 text-purple-400" /></div>
                 <div className="relative z-10">
                   <span className="text-[9px] font-black uppercase bg-purple-500 text-white px-2 py-0.5 rounded">Assignment</span>
                   <h4 className="font-bold text-white text-base mt-2 mb-1">Variables Worksheet</h4>
                   <p className="text-xs text-slate-300 mb-4 font-medium">Complete 10 practical questions to pass this module.</p>
                   <Button className="w-full bg-white text-black font-black rounded-xl h-10 text-xs shadow-lg shadow-purple-500/20">Start Assignment</Button>
                 </div>
              </div>
            </div>

            {/* NEW: Module Assessment (Quiz) */}
            <div className="p-4 border-b border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Knowledge Check</h3>
              <div className="p-5 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded-2xl relative overflow-hidden">
                 <div className="absolute right-[-10px] top-[-10px] opacity-20"><HelpCircle className="h-24 w-24 text-blue-400" /></div>
                 <div className="relative z-10">
                   <span className="text-[9px] font-black uppercase bg-blue-500 text-white px-2 py-0.5 rounded">Module Quiz</span>
                   <h4 className="font-bold text-white text-base mt-2 mb-1">Module 1 Evaluation</h4>
                   <div className="flex items-center gap-4 text-xs text-slate-300 mb-4 font-medium">
                     <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 15 Mins</span>
                     <span className="flex items-center gap-1"><List className="h-3 w-3" /> 10 Questions</span>
                   </div>
                   <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl h-10 text-xs shadow-lg shadow-blue-500/20 border-0">
                     Start Quiz
                   </Button>
                 </div>
              </div>
            </div>

            {/* Up Next */}
            <div className="p-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Up Next</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 opacity-50"><div className="h-14 w-20 bg-slate-800 rounded-lg border border-white/10 flex items-center justify-center shrink-0"><Lock className="h-4 w-4 text-white/50" /></div><div className="flex-1"><h4 className="font-bold text-white text-xs leading-tight mb-1">1.2 - Solving Linear Equations</h4></div></div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            3. THE READING MODE OVERLAY
            ========================================= */}
        {readingMaterial && (
          <div className="absolute inset-0 z-50 bg-white text-slate-900 flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 bg-white shadow-sm">
              <button onClick={() => { setReadingMaterial(null); resumeVideo(); }} className="flex items-center gap-2 text-slate-900 font-bold hover:text-primary"><X className="h-5 w-5" /> Close Reading</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pb-24">
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pre-Read Material</span>
               <h1 className="text-3xl font-black text-slate-900 leading-tight my-4">Chapter 1: Welcome & Program Overview</h1>
               <article className="prose prose-slate max-w-none mt-8"><p className="text-slate-600 font-medium">Review the safety guidelines and risk management structures before watching.</p></article>
               <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
                 <Button onClick={() => { setReadingMaterial(null); resumeVideo(); }} className="h-12 px-8 rounded-full font-black shadow-lg">Finish Reading & Return</Button>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}