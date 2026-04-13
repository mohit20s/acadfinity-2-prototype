"use client";

import { useState } from "react";
import { 
  PlayCircle, FileText, Download, Calendar, Award, 
  MessageCircle, HelpCircle, Star, Plus, ArrowLeft,
  CheckCircle2, Lock, Heart, Share2, Bookmark, Flame, 
  Search, Video, Clock, Send, ChevronRight, PenLine
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

  // --- VIEW 3: DETAILED FULL JOURNEY PLAYER ---
  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-8rem)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right duration-500">
      
      {/* JOURNEY TOP HEADER */}
      <div className="shrink-0 bg-white border-b px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="ghost" size="icon" onClick={() => setView('store')} className="shrink-0"><ArrowLeft className="h-5 w-5" /></Button>
          <div className="overflow-hidden">
            <h2 className="font-bold text-slate-900 truncate">Advanced Python & AI Basics</h2>
            <div className="flex items-center gap-3 mt-1">
               <div className="flex-1 h-1.5 w-24 md:w-32 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }}></div>
               </div>
               <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap uppercase tracking-tighter">{progress}% COMPLETE</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className={cn("w-full md:w-auto text-xs", progress === 100 ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "opacity-50 grayscale cursor-not-allowed")}>
            <Award className="h-4 w-4 mr-2" /> {progress === 100 ? "Claim Certificate" : "Finish to Earn Certificate"}
          </Button>
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        
        {/* LEFT: THE JOURNEY MAP (STAIRCASE STYLE) */}
        <aside className="w-full md:w-80 bg-slate-50 border-r overflow-y-auto shrink-0 flex flex-col">
          <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
             <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Your Journey Map</span>
             <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <div className="p-6 space-y-8 flex-1">
            
            {/* Step 1: Video - Completed */}
            <div className="relative flex gap-4 group cursor-pointer">
              <div className="absolute left-[11px] top-8 bottom-[-32px] w-0.5 bg-emerald-500"></div>
              <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 z-10 shadow-sm">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="opacity-60">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Module 1</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">Introduction to AI</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1"><Video className="h-3 w-3" /> 12:45 Video</div>
              </div>
            </div>

            {/* Step 2: Content - Active */}
            <div className="relative flex gap-4 group cursor-pointer">
              <div className="absolute left-[11px] top-8 bottom-[-32px] w-0.5 bg-slate-200"></div>
              <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 z-10 shadow-md ring-4 ring-primary/10">
                <FileText className="h-3 w-3" />
              </div>
              <div className="bg-white p-3 rounded-xl border-2 border-primary shadow-sm flex-1 scale-105 transition-transform">
                <p className="text-xs font-bold text-primary uppercase tracking-tighter">Module 2</p>
                <p className="text-sm font-extrabold text-slate-900 leading-tight">Python Core Concepts</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1"><Clock className="h-3 w-3" /> 15 mins Reading</div>
              </div>
            </div>

            {/* Step 3: Quiz - Locked */}
            <div className="relative flex gap-4 opacity-50 grayscale">
              <div className="absolute left-[11px] top-8 bottom-[-32px] w-0.5 bg-slate-200"></div>
              <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 z-10">
                <Lock className="h-3 w-3" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Evaluation</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">Mid-Term Assessment</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1"><HelpCircle className="h-3 w-3" /> 10 Questions</div>
              </div>
            </div>

            {/* Step 4: 1-on-1 Help Desk - Locked */}
            <div className="relative flex gap-4 opacity-50 grayscale">
               <div className="absolute left-[11px] top-8 bottom-[-32px] w-0.5 bg-slate-200"></div>
               <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 z-10">
                <Lock className="h-3 w-3" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Support</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">Mentor Help Desk</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1"><Calendar className="h-3 w-3" /> 1-on-1 Session</div>
              </div>
            </div>

            {/* Step 5: Final Step */}
             <div className="relative flex gap-4 opacity-50 grayscale">
              <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 z-10">
                <Lock className="h-3 w-3" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Completion</p>
                <p className="text-sm font-bold text-slate-900 leading-tight">Claim Your Certificate</p>
              </div>
            </div>

          </div>
        </aside>

        {/* RIGHT: THE CONTENT PLAYER & INTERACTIVE AREA */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
          
          {/* THE PLAYER (VIDEO/READING) */}
          <div className="h-1/2 md:h-2/3 shrink-0 bg-slate-900 flex flex-col items-center justify-center text-white relative group">
             {/* Mock Video UI */}
             <PlayCircle className="h-20 w-20 text-white/40 group-hover:text-white group-hover:scale-110 transition-all cursor-pointer" />
             <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Watching: Module 2</span>
             </div>
             
             {/* Video Controls Simulator */}
             <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <PlayCircle className="h-5 w-5 text-white" />
                <div className="flex-1 h-1 bg-white/20 rounded-full relative overflow-hidden">
                   <div className="absolute left-0 top-0 h-full w-1/3 bg-primary"></div>
                </div>
                <span className="text-[10px] font-mono">04:22 / 15:00</span>
                <Button size="sm" className="h-7 px-3 bg-white text-black text-[10px] font-bold rounded-full hover:bg-slate-200 ml-auto">Next Lesson <ChevronRight className="h-3 w-3 ml-1" /></Button>
             </div>
          </div>

          {/* THE INTERACTIVE TABS */}
          <div className="flex-1 flex flex-col overflow-hidden">
             {/* Tab Bar */}
             <div className="flex bg-white border-b px-2 md:px-6 shrink-0 overflow-x-auto scrollbar-hide">
                {[
                  { id: 'qa', name: 'Q&A Forum', icon: MessageCircle },
                  { id: 'resources', name: 'Resources', icon: Download },
                  { id: 'helpdesk', name: 'Help Desk', icon: HelpCircle },
                  { id: 'notes', name: 'My Notes', icon: PenLine },
                ].map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2",
                      activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline-block">{tab.name}</span>
                  </button>
                ))}
             </div>

             {/* Tab Content Area */}
             <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
                
                {/* Q&A CONTENT */}
                {activeTab === 'qa' && (
                  <div className="max-w-3xl space-y-6 animate-in fade-in duration-300">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-200 border flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
                           <p className="text-[10px] font-bold text-slate-400 mb-1">STUART GILL (STUDENT) • 2 HOURS AGO</p>
                           <p className="text-sm text-slate-700 leading-relaxed font-medium">I'm struggling with how the loop counter interacts with nested lists. Can someone explain the flow?</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 px-2">
                           <button className="text-[10px] font-bold text-primary hover:underline">REPLY</button>
                           <button className="text-[10px] font-bold text-slate-400 flex items-center gap-1 hover:text-rose-500"><Heart className="h-3 w-3" /> 12</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 ml-8 md:ml-12 border-l-2 border-primary/20 pl-4 md:pl-6">
                      <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-lg">AK</div>
                      <div className="flex-1">
                        <div className="bg-blue-50 p-4 rounded-2xl border border-primary/20 shadow-sm">
                           <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-widest">ARUN KUMAR (INSTRUCTOR) • 1 HOUR AGO</p>
                           <p className="text-sm text-slate-700 leading-relaxed">Think of it like a clock. The outer loop is the 'hour' hand and the inner loop is the 'minute' hand. The inner loop must complete a full circle before the outer loop moves by 1.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                       <input type="text" placeholder="Add your question or thought..." className="flex-1 bg-slate-50 border h-10 px-4 rounded-full text-sm outline-none focus:ring-2 focus:ring-primary" />
                       <Button size="icon" className="rounded-full"><Send className="h-4 w-4" /></Button>
                    </div>
                  </div>
                )}

                {/* RESOURCES CONTENT */}
                {activeTab === 'resources' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300">
                    <div className="p-4 border rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Download className="h-5 w-5" /></div>
                          <div><p className="text-sm font-bold text-slate-900">Python_Fundamentals.pdf</p><p className="text-[10px] text-slate-400 uppercase">PDF • 1.2 MB</p></div>
                       </div>
                       <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                    </div>
                    <div className="p-4 border rounded-2xl flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform"><Download className="h-5 w-5" /></div>
                          <div><p className="text-sm font-bold text-slate-900">Module_2_Sample_Code.zip</p><p className="text-[10px] text-slate-400 uppercase">ARCHIVE • 4.5 MB</p></div>
                       </div>
                       <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                    </div>
                  </div>
                )}

                {/* HELP DESK CONTENT */}
                {activeTab === 'helpdesk' && (
                  <div className="flex flex-col items-center justify-center h-full text-center py-10 animate-in fade-in duration-300">
                    <div className="h-20 w-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                      <HelpCircle className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">1-on-1 Help Desk</h3>
                    <p className="text-slate-500 max-w-sm mt-2 text-sm">Schedule a personalized 15-minute doubt-clearing session with Arun or another instructor.</p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
                       <Button className="flex-1 h-12 rounded-full font-bold shadow-md shadow-primary/20"><Calendar className="h-4 w-4 mr-2" /> Book Next Slot</Button>
                       <Button variant="outline" className="flex-1 h-12 rounded-full font-bold">Message Instructor</Button>
                    </div>
                  </div>
                )}

                {/* NOTES CONTENT */}
                {activeTab === 'notes' && (
                  <div className="animate-in fade-in duration-300">
                    <textarea 
                      placeholder="Start typing your module notes here... they will be saved to your dashboard automatically."
                      className="w-full h-48 md:h-64 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-slate-700 text-sm outline-none focus:border-primary transition-colors"
                    ></textarea>
                    <div className="mt-4 flex justify-between items-center">
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1"><PenLine className="h-3 w-3" /> Auto-saving to your cloud</p>
                       <Button size="sm" className="rounded-full">Export to PDF</Button>
                    </div>
                  </div>
                )}

             </div>
          </div>
        </main>
      </div>
    </div>
  );
}