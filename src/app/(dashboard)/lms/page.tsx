"use client";

import { useState } from "react";
import { 
  PlayCircle, FileText, Download, Calendar, Award, 
  MessageCircle, HelpCircle, Star, Plus, ArrowLeft,
  CheckCircle2, Lock, Heart, Share2, Bookmark, Flame, 
  Search, Video, Clock, Send, ChevronRight, PenLine, List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Data for the Course Store
const storeCourses = [
  { id: 1, title: "Advanced Python & AI Basics", target: "Students", type: "Full Course", price: "₹2,500", rating: 4.8, enrolled: 340, image: "bg-blue-100 text-blue-600" },
  { id: 2, title: "Digital Wellness for Families", target: "Parents", type: "Guidance", price: "Free", rating: 4.9, enrolled: 850, image: "bg-teal-100 text-teal-600" },
  { id: 3, title: "21st Century Leadership", target: "Teachers", type: "Upskill", price: "₹1,200", rating: 4.7, enrolled: 120, image: "bg-amber-100 text-amber-600" },
  { id: 4, title: "Financial Literacy 101", target: "All", type: "Full Course", price: "₹999", rating: 4.6, enrolled: 530, image: "bg-emerald-100 text-emerald-600" },
];

export default function LMSPage() {
  const [view, setView] = useState<'store' | 'journey' | 'shorts'>('store');
  const [activeTab, setActiveTab] = useState('qa');
  const [progress, setProgress] = useState(40);

  // --- VIEW 1: THE COURSE STORE ---
  if (view === 'store') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Skill Academy & LMS</h1>
            <p className="text-sm text-slate-500">Create, sell, and track learning journeys for your ecosystem.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Create Course
          </Button>
        </div>

        {/* Seekho-style 'Skill Bites' Banner */}
        <div 
          onClick={() => setView('shorts')}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold mb-3 uppercase tracking-wider">
              <Flame className="h-4 w-4" /> Skill Bites
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Learn in 60 Seconds</h2>
            <p className="text-slate-400 max-w-md text-sm sm:text-base">
              Swipe through bite-sized upskilling videos from top experts.
            </p>
          </div>
          <Button className="relative z-10 rounded-full h-12 px-8 bg-white text-slate-900 hover:bg-slate-100 font-bold shrink-0">
            Watch Now <PlayCircle className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <h2 className="text-lg font-bold text-slate-900 mb-4">Featured Deep-Dive Journeys</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {storeCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setView('journey')}>
              <div className={`h-32 flex items-center justify-center ${course.image}`}>
                <PlayCircle className="h-10 w-10 opacity-50 group-hover:scale-110 transition-transform text-white" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{course.type}</span>
                  <span className="text-xs font-semibold text-primary">{course.price}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1 leading-tight">{course.title}</h3>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-auto pt-4">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-700">{course.rating}</span>
                  <span className="ml-2">{course.enrolled} Enrolled</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

 // --- VIEW 2: SEEKHO/SHORTS VERTICAL VIDEO PLAYER ---
  if (view === 'shorts') {
    return (
      <div className="h-[calc(100vh-8rem)] w-full flex items-center justify-center bg-black rounded-xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden relative">
        <div className="w-full max-w-md h-full bg-slate-900 relative shadow-2xl flex flex-col justify-between">
          <div className="p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-10 absolute top-0 w-full">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full" onClick={() => setView('store')}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <span className="text-white font-bold text-sm tracking-widest uppercase">Skill Bites</span>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-0">
             <PlayCircle className="h-20 w-20 text-white/40 hover:text-white/80 cursor-pointer transition-colors" />
          </div>

          <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-10">
            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-rose-500/80 transition-colors"><Heart className="h-6 w-6" /></div>
              <span className="text-white text-xs font-bold shadow-sm">12.4K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"><MessageCircle className="h-6 w-6" /></div>
              <span className="text-white text-xs font-bold shadow-sm">342</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"><Bookmark className="h-6 w-6" /></div>
              <span className="text-white text-xs font-bold shadow-sm">Save</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors"><Share2 className="h-6 w-6" /></div>
              <span className="text-white text-xs font-bold shadow-sm">Share</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 absolute bottom-0 w-full flex flex-col gap-3 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">AK</div>
                <span className="text-white font-bold text-sm">Arun Kumar</span>
              </div>
              <h3 className="text-white font-bold text-lg leading-tight">3 Python Tricks you didn't know 🐍</h3>
              <p className="text-slate-300 text-xs mt-1 max-w-[80%] line-clamp-2">Learn list comprehensions, lambda functions, and zip() in 60 seconds.</p>
            </div>
            
            <div className="mt-2 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/20 transition-colors" onClick={() => setView('journey')}>
               <div className="flex items-center gap-3">
                 <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center text-white"><FileText className="h-4 w-4" /></div>
                 <div><p className="text-white text-xs font-bold">Python Masterclass</p><p className="text-white/60 text-[10px]">Full Course</p></div>
               </div>
               <span className="text-white text-xs font-bold bg-primary px-3 py-1.5 rounded-full">Enroll</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 3: PREMIUM DETAILED FULL JOURNEY PLAYER ---
  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-8rem)] bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in slide-in-from-right duration-500">
      
      {/* 1. TOP HEADER: MODULE PROGRESS & XP */}
      <div className="shrink-0 bg-slate-900 text-white px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 z-30">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="ghost" size="icon" onClick={() => setView('store')} className="text-white hover:bg-white/10 shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 mb-0.5">
               <span className="text-[10px] font-black bg-primary px-1.5 py-0.5 rounded uppercase tracking-tighter">Module 02</span>
               <h2 className="font-bold text-sm md:text-base truncate">Python Loops & AI Logic</h2>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex-1 h-1.5 w-24 md:w-48 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-primary shadow-[0_0_8px_rgba(0,149,255,0.8)] transition-all duration-1000" style={{ width: `${progress}%` }}></div>
               </div>
               <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap uppercase">{progress}% COMPLETED</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t border-white/10 md:border-0 pt-2 md:pt-0">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
             <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
             <span className="text-[10px] font-bold tracking-widest">450 XP EARNED</span>
          </div>
          <Button size="sm" className={cn("text-[10px] font-bold h-8 px-4 rounded-full transition-all", progress === 100 ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-700 opacity-50")}>
            {progress === 100 ? "CLAIM CERTIFICATE" : "CERTIFICATE LOCKED"}
          </Button>
        </div>
      </div>

      {/* 2. MAIN LAYOUT: SIDEBAR + CONTENT */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden relative">
        
        {/* LEFT SIDEBAR: THE STAIRCASE JOURNEY MAP */}
        <aside className="hidden md:flex w-80 bg-slate-50 border-r overflow-y-auto shrink-0 flex-col">
          <div className="p-4 border-b bg-slate-50/50 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Syllabus Journey</span>
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <div className="p-6 space-y-0 flex-1">
            
            {/* JOURNEY STEP 1 */}
            <div className="relative pb-10 group cursor-pointer">
              <div className="absolute left-[13px] top-8 bottom-0 w-[2px] bg-emerald-500"></div>
              <div className="flex gap-4">
                <div className="h-7 w-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 z-10 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 mb-0.5">COMPLETED</p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">01. Setup & Environment</p>
                  <p className="text-[10px] text-slate-400 font-medium">12:45 • Video Lesson</p>
                </div>
              </div>
            </div>

            {/* JOURNEY STEP 2 (ACTIVE) */}
            <div className="relative pb-10 group cursor-pointer">
              <div className="absolute left-[13px] top-8 bottom-0 w-[2px] bg-slate-200"></div>
              <div className="flex gap-4">
                <div className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 z-10 shadow-xl shadow-primary/30 ring-4 ring-primary/10 scale-110">
                  <PlayCircle className="h-4 w-4" />
                </div>
                <div className="bg-white p-3 rounded-xl border border-primary/20 shadow-sm flex-1 -mt-1 ring-1 ring-primary/5">
                  <p className="text-[10px] font-black text-primary mb-0.5 tracking-widest uppercase">Now Studying</p>
                  <p className="text-sm font-black text-slate-900">02. Logic & Control Flow</p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1 flex items-center gap-1"><Clock className="h-3 w-3" /> 15 MINS REMAINING</p>
                </div>
              </div>
            </div>

            {/* JOURNEY STEP 3 (LOCKED) */}
            <div className="relative pb-10 group opacity-50">
              <div className="absolute left-[13px] top-8 bottom-0 w-[2px] bg-slate-100"></div>
              <div className="flex gap-4">
                <div className="h-7 w-7 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0 z-10">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 mb-0.5 uppercase">Locked</p>
                  <p className="text-sm font-bold text-slate-700">03. AI Integration Basics</p>
                  <p className="text-[10px] text-slate-400 font-medium italic">Complete previous module</p>
                </div>
              </div>
            </div>

            {/* LIVE SESSION STEP */}
            <div className="relative pb-10 group opacity-50">
              <div className="flex gap-4">
                <div className="h-7 w-7 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 z-10">
                  <Video className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-rose-500 mb-0.5 uppercase tracking-tighter">Upcoming Live</p>
                  <p className="text-sm font-bold text-slate-700">Live Workshop with Arun</p>
                  <p className="text-[10px] text-slate-400 font-medium">Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT CONTENT AREA: PLAYER & INTERACTIVE DATA */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50/30">
          
          {/* THE PLAYER (Aspect Ratio locked for Premium Feel) */}
          <div className="w-full aspect-video md:aspect-auto md:h-[450px] shrink-0 bg-black relative group shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 grayscale"></div>
             
             <div className="absolute inset-0 flex items-center justify-center z-10">
               <div className="h-20 w-20 rounded-full bg-primary/90 text-white flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-primary transition-all shadow-2xl shadow-primary/40 group">
                  <PlayCircle className="h-10 w-10 fill-white" />
               </div>
             </div>

             {/* Player Overlay Controls */}
             <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="h-6 w-6 text-white cursor-pointer" />
                <div className="flex-1 h-1.5 bg-white/20 rounded-full relative overflow-hidden cursor-pointer">
                   <div className="absolute left-0 top-0 h-full w-[35%] bg-primary"></div>
                </div>
                <div className="flex items-center gap-6">
                   <span className="text-[11px] font-mono text-white font-bold">05:12 / 15:00</span>
                   <Button size="sm" className="h-8 rounded-full bg-white text-slate-900 font-black text-[10px] px-4 hover:bg-slate-200">
                      NEXT LESSON <ChevronRight className="h-3 w-3 ml-1" />
                   </Button>
                </div>
             </div>
          </div>

          {/* THE INTERACTIVE WORKSPACE TABS */}
          <div className="flex flex-col flex-1 min-h-[500px]">
             {/* Sticky Tab Navigator */}
             <div className="flex bg-white border-b border-slate-200 px-2 md:px-8 shrink-0 overflow-x-auto scrollbar-hide sticky top-0 z-20">
                {[
                  { id: 'qa', name: 'Community Q&A', icon: MessageCircle },
                  { id: 'resources', name: 'Resource Hub', icon: Download },
                  { id: 'helpdesk', name: 'Help Desk', icon: HelpCircle },
                  { id: 'notes', name: 'Study Notes', icon: PenLine },
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] transition-all border-b-4 whitespace-nowrap",
                      activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
             </div>

             {/* Tab Content: High Detail */}
             <div className="p-4 md:p-10 bg-white flex-1">
                
                {/* 1. Q&A DETAILED HUB */}
                {activeTab === 'qa' && (
                  <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-2">
                       <h3 className="font-black text-slate-900 text-lg">Course Discussions</h3>
                       <Button size="sm" variant="outline" className="rounded-full text-[10px] font-bold">ASK A QUESTION</Button>
                    </div>

                    {/* Threaded Comment 1 */}
                    <div className="flex gap-5 group">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-100 border-2 border-white shadow-sm shrink-0 overflow-hidden flex items-center justify-center font-bold text-indigo-600">SJ</div>
                      <div className="flex-1">
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                           <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sanjay Jha (Student) • 2h ago</span>
                              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">RESOLVED</div>
                           </div>
                           <p className="text-sm text-slate-700 leading-relaxed font-semibold mb-4">"I'm confused about the AI logic gate we discussed at 04:30. Does the 'If' statement evaluate before the loop cycles?"</p>
                           
                           {/* Instructor Reply */}
                           <div className="bg-white border-l-4 border-primary p-4 rounded-xl mt-4 shadow-sm ring-1 ring-slate-100">
                              <div className="flex items-center gap-2 mb-2">
                                 <div className="h-6 w-6 rounded-lg bg-primary text-white text-[10px] font-bold flex items-center justify-center">AK</div>
                                 <span className="text-[10px] font-black text-primary uppercase">Arun Kumar (Instructor)</span>
                                 <Award className="h-3 w-3 text-primary fill-primary/20" />
                              </div>
                              <p className="text-sm text-slate-600">Great question, Sanjay! The gate evaluates at the start of every cycle. Think of it as a checkpoint. Check the reading module in Step 3 for a flow diagram.</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6 mt-3 px-2">
                           <button className="text-[10px] font-black text-slate-400 hover:text-primary tracking-widest flex items-center gap-1.5"><MessageCircle className="h-3 w-3" /> REPLY</button>
                           <button className="text-[10px] font-black text-slate-400 hover:text-rose-500 tracking-widest flex items-center gap-1.5"><Heart className="h-3 w-3" /> 24 HELPFUL</button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Input Bar */}
                    <div className="sticky bottom-4 left-0 right-0 pt-6">
                       <div className="bg-white border-2 border-slate-100 p-2 rounded-2xl shadow-2xl flex items-center gap-3">
                          <input type="text" placeholder="Have a doubt? Ask the community..." className="flex-1 bg-transparent px-4 text-sm font-medium outline-none" />
                          <Button size="icon" className="h-10 w-10 rounded-xl shadow-lg shadow-primary/20"><Send className="h-4 w-4" /></Button>
                       </div>
                    </div>
                  </div>
                )}

                {/* 2. RESOURCE HUB DETAILED */}
                {activeTab === 'resources' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                    {[
                      { name: 'Module_2_Logic_Flow.pdf', size: '2.4 MB', type: 'PDF DOCUMENT', color: 'bg-rose-50 text-rose-600' },
                      { name: 'Python_Cheatsheet.png', size: '1.1 MB', type: 'IMAGE GUIDE', color: 'bg-indigo-50 text-indigo-600' },
                      { name: 'Sample_Code_Logic.py', size: '4 KB', type: 'PYTHON SCRIPT', color: 'bg-emerald-50 text-emerald-600' }
                    ].map((file) => (
                      <div key={file.name} className="p-5 border-2 border-slate-100 rounded-3xl flex flex-col items-center text-center hover:border-primary/30 transition-all group cursor-pointer hover:shadow-lg">
                        <div className={cn("h-16 w-16 rounded-2xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform", file.color)}>
                          <Download className="h-8 w-8" />
                        </div>
                        <h4 className="text-sm font-black text-slate-900 truncate w-full mb-1">{file.name}</h4>
                        <p className="text-[10px] font-black text-slate-400 tracking-[0.1em] uppercase">{file.type} • {file.size}</p>
                        <Button variant="ghost" className="mt-4 w-full rounded-xl text-[10px] font-black group-hover:bg-primary group-hover:text-white transition-colors">DOWNLOAD FILE</Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. HELP DESK DETAILED */}
                {activeTab === 'helpdesk' && (
                  <div className="flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-500">
                    <div className="relative mb-10">
                       <div className="h-32 w-32 rounded-full bg-slate-100 border-8 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                          <HelpCircle className="h-12 w-12 text-slate-300" />
                       </div>
                       <div className="absolute -bottom-2 right-0 left-0 flex justify-center">
                          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest shadow-lg flex items-center gap-1.5 ring-4 ring-white">
                             <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div> INSTRUCTOR ONLINE
                          </div>
                       </div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Need a human touch?</h3>
                    <p className="text-slate-500 max-w-md text-sm font-medium leading-relaxed">Schedule a 1-on-1 personalized mentorship session with Arun or our expert logic-building team.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 w-full max-w-2xl">
                       <div className="p-6 bg-slate-900 rounded-3xl text-white text-left hover:scale-[1.02] transition-transform cursor-pointer shadow-xl shadow-slate-900/20">
                          <Calendar className="h-6 w-6 text-primary mb-4" />
                          <h4 className="font-black text-lg mb-1">Book 15min Call</h4>
                          <p className="text-slate-400 text-xs">Clear your specific module doubts via Google Meet.</p>
                       </div>
                       <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl text-left hover:scale-[1.02] transition-transform cursor-pointer">
                          <MessageCircle className="h-6 w-6 text-indigo-500 mb-4" />
                          <h4 className="font-black text-lg mb-1 text-slate-900">Direct Message</h4>
                          <p className="text-slate-500 text-xs">Send a direct message to the instructor team.</p>
                       </div>
                    </div>
                  </div>
                )}

                {/* 4. PRIVATE NOTES DETAILED */}
                {activeTab === 'notes' && (
                  <div className="animate-in fade-in duration-500 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                       <div>
                          <h3 className="font-black text-slate-900 text-lg leading-tight tracking-tight">Personal Workspace</h3>
                          <p className="text-xs font-bold text-slate-400 tracking-wider">THESE NOTES ARE ONLY VISIBLE TO YOU</p>
                       </div>
                       <Button size="sm" variant="outline" className="rounded-full text-[10px] font-black h-8 px-4"><Download className="h-3 w-3 mr-2" /> EXPORT PDF</Button>
                    </div>
                    <textarea 
                      placeholder="Start drafting your learnings for Module 2 here..."
                      className="w-full h-80 p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] text-slate-700 font-medium text-base outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all placeholder:text-slate-300 shadow-inner"
                    ></textarea>
                    <div className="mt-6 flex items-center gap-2 text-slate-400">
                       <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                       <span className="text-[10px] font-black uppercase tracking-widest">Autosaved at 02:45 PM Today</span>
                    </div>
                  </div>
                )}

             </div>
          </div>

          {/* MOBILE ONLY: JOURNEY MAP ACCORDION (Pushed to bottom) */}
          <div className="md:hidden bg-slate-50 p-6 border-t border-slate-200 mt-auto">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Module Roadmap</h3>
               <List className="h-4 w-4 text-slate-400" />
             </div>
             <div className="space-y-10 pl-2">
                <div className="relative flex gap-5"><div className="absolute left-[11px] top-6 bottom-[-40px] w-[2px] bg-emerald-500"></div><div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 z-10"><CheckCircle2 className="h-3.5 w-3.5" /></div><p className="text-sm font-black text-slate-900">01. Setup & Intro</p></div>
                <div className="relative flex gap-5"><div className="absolute left-[11px] top-6 bottom-[-40px] w-[2px] bg-slate-200"></div><div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 z-10 shadow-lg shadow-primary/20 ring-4 ring-primary/10"><FileText className="h-3.5 w-3.5" /></div><p className="text-sm font-black text-primary">02. Core Logic</p></div>
                <div className="relative flex gap-5"><div className="h-6 w-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0 z-10"><Lock className="h-3.5 w-3.5" /></div><p className="text-sm font-black text-slate-400">Final Certificate</p></div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}