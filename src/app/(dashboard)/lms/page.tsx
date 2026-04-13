"use client";

import { useState } from "react";
import { 
  PlayCircle, FileText, Download, Calendar, Award, 
  MessageCircle, HelpCircle, Star, Plus, ArrowLeft,
  CheckCircle2, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const storeCourses = [
  { id: 1, title: "Advanced Python & AI Basics", target: "Students", type: "Outskill", price: "₹2,500", rating: 4.8, enrolled: 340, image: "bg-blue-100 text-blue-600" },
  { id: 2, title: "Digital Wellness for Families", target: "Parents", type: "Guidance", price: "Free", rating: 4.9, enrolled: 850, image: "bg-teal-100 text-teal-600" },
  { id: 3, title: "21st Century Leadership", target: "Teachers", type: "Upskill", price: "₹1,200", rating: 4.7, enrolled: 120, image: "bg-amber-100 text-amber-600" },
  { id: 4, title: "Financial Literacy 101", target: "All Stakeholders", type: "Outskill", price: "₹999", rating: 4.6, enrolled: 530, image: "bg-emerald-100 text-emerald-600" },
];

export default function LMSPage() {
  const [view, setView] = useState<'store' | 'journey'>('store');
  const [activeTab, setActiveTab] = useState('qa');

  // --- VIEW 1: STORE ---
  if (view === 'store') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Skill Academy & LMS</h1>
            <p className="text-sm text-slate-500">Create, sell, and track learning journeys.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Create Course
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border shadow-sm"><p className="text-sm text-slate-500 font-medium">Active Enrollments</p><p className="text-2xl font-bold text-slate-900 mt-1">1,840</p></div>
          <div className="bg-white p-5 rounded-xl border shadow-sm"><p className="text-sm text-slate-500 font-medium">Revenue (YTD)</p><p className="text-2xl font-bold text-emerald-600 mt-1">₹4.2L</p></div>
          <div className="bg-white p-5 rounded-xl border shadow-sm"><p className="text-sm text-slate-500 font-medium">Certificates</p><p className="text-2xl font-bold text-slate-900 mt-1">892</p></div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Published Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setView('journey')}>
                <div className={`h-32 flex items-center justify-center ${course.image}`}>
                  <PlayCircle className="h-10 w-10 opacity-50 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{course.type}</span>
                    <span className="text-xs font-semibold text-primary">{course.price}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1 leading-tight">{course.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">For: {course.target}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /><span className="text-xs font-medium text-slate-600">{course.rating}</span></div>
                    <span className="text-xs text-slate-500">{course.enrolled} enrolled</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: MOBILE RESPONSIVE JOURNEY PLAYER ---
  return (
    // On mobile: allow scrolling. On desktop: lock height and handle scrolling inside.
    <div className="flex flex-col min-h-screen md:min-h-0 md:h-[calc(100vh-8rem)] animate-in slide-in-from-right duration-300">
      
      {/* Header - Now wraps correctly on mobile */}
      <div className="bg-white border-b p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm z-10 rounded-t-xl shrink-0">
        <div className="flex items-start sm:items-center gap-3 w-full">
          <Button variant="ghost" size="icon" className="shrink-0 -mt-1 sm:mt-0" onClick={() => setView('store')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="font-bold text-slate-900 text-base md:text-lg leading-tight">Advanced Python & AI Basics</h2>
            <div className="flex items-center gap-2 mt-2 sm:mt-1">
              <div className="h-2 w-full max-w-[128px] bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[40%]"></div>
              </div>
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">40% Complete</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 shrink-0">
          <Award className="h-4 w-4 mr-2" /> Certificate
        </Button>
      </div>

      {/* Main Player Area - Stacks on mobile (flex-col), side-by-side on desktop (md:flex-row) */}
      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden rounded-b-xl border border-t-0 border-slate-200 bg-white">
        
        {/* Right Content Area: Video (Order 1 on mobile to stay on top, Order 2 on desktop) */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden order-1 md:order-2 border-b md:border-b-0">
          
          {/* Media Player - fixed height on mobile so it doesn't take the whole screen */}
          <div className="h-[250px] md:h-[50%] shrink-0 bg-slate-900 flex flex-col items-center justify-center text-white p-4 md:p-8 relative">
            <PlayCircle className="h-12 w-12 md:h-16 md:w-16 text-white/50 mb-2 hover:text-white cursor-pointer transition-colors" />
            <h3 className="text-lg md:text-xl font-bold text-center leading-tight">Module 2: Core Concepts</h3>
            
            <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 bg-black/50 backdrop-blur-md rounded-lg p-2 md:p-3 flex items-center gap-3">
              <PlayCircle className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
              <div className="h-1 flex-1 bg-white/20 rounded-full"><div className="h-full w-1/3 bg-primary rounded-full"></div></div>
              <span className="text-[10px] md:text-xs shrink-0">04:12 / 12:30</span>
            </div>
          </div>

          {/* Interaction Tabs - Scrollable horizontally on mobile */}
          <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden min-h-[300px] md:min-h-0">
            <div className="flex border-b bg-white px-2 md:px-4 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0">
              <button onClick={() => setActiveTab('qa')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'qa' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-900'}`}>
                <MessageCircle className="h-4 w-4 inline-block mr-2" /> Q&A Forum
              </button>
              <button onClick={() => setActiveTab('resources')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'resources' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-900'}`}>
                <Download className="h-4 w-4 inline-block mr-2" /> Resources
              </button>
              <button onClick={() => setActiveTab('helpdesk')} className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'helpdesk' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-900'}`}>
                <HelpCircle className="h-4 w-4 inline-block mr-2" /> 1-on-1 Mentoring
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              {activeTab === 'qa' && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0"></div>
                    <div className="bg-white p-3 rounded-lg border shadow-sm w-full"><p className="text-xs text-slate-500 mb-1">Student A • 2h ago</p><p className="text-sm text-slate-700">How does the print() handle multiple arguments?</p></div>
                  </div>
                  <div className="flex gap-3 ml-8 md:ml-12">
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0">T</div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 shadow-sm w-full"><p className="text-xs text-blue-600 font-bold mb-1">Teacher</p><p className="text-sm text-slate-700">It adds a space between them by default!</p></div>
                  </div>
                </div>
              )}
              {activeTab === 'resources' && <div className="p-4 bg-white border border-dashed rounded-lg text-center text-slate-500 text-sm">No extra resources for this module.</div>}
              {activeTab === 'helpdesk' && (
                <div className="flex flex-col items-center justify-center p-4 text-center h-full">
                  <Calendar className="h-10 w-10 text-slate-300 mb-3" />
                  <h3 className="font-bold text-slate-900 text-sm md:text-base">Stuck? Book a Mentor.</h3>
                  <Button variant="outline" className="mt-4 text-xs md:text-sm">View Calendar</Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Left Sidebar: Journey Map (Order 2 on mobile to appear below video, Order 1 on desktop) */}
        <div className="w-full md:w-80 md:border-r bg-slate-50 shrink-0 order-2 md:order-1 flex flex-col h-[400px] md:h-auto">
          <div className="p-4 font-semibold text-slate-700 text-sm border-b border-t md:border-t-0 uppercase tracking-wider bg-slate-100 md:bg-slate-50 shrink-0">
            Your Journey Map
          </div>
          <div className="p-4 space-y-6 overflow-y-auto flex-1">
            
            <div className="relative flex gap-4"><div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-emerald-500"></div><div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 z-10"><CheckCircle2 className="h-4 w-4" /></div><div><p className="text-sm font-bold text-slate-900">Module 1: Introduction</p><div className="flex items-center gap-1 text-xs text-slate-500 mt-1"><PlayCircle className="h-3 w-3" /> 15 min video</div></div></div>
            <div className="relative flex gap-4"><div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-slate-200"></div><div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_rgba(0,149,255,0.2)]"><FileText className="h-3 w-3" /></div><div className="bg-white p-3 rounded-lg border border-primary/30 shadow-sm flex-1"><p className="text-sm font-bold text-primary">Module 2: Core Concepts</p><div className="flex items-center gap-1 text-xs text-slate-500 mt-1"><FileText className="h-3 w-3" /> Reading</div></div></div>
            <div className="relative flex gap-4"><div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-slate-200"></div><div className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 z-10"><Lock className="h-3 w-3" /></div><div className="opacity-60"><p className="text-sm font-bold text-slate-700">Project Files Download</p><div className="flex items-center gap-1 text-xs text-slate-500 mt-1"><Download className="h-3 w-3" /> Zip Archive</div></div></div>
            <div className="relative flex gap-4"><div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-slate-200"></div><div className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 z-10"><Lock className="h-3 w-3" /></div><div className="opacity-60"><p className="text-sm font-bold text-slate-700">1-on-1 Mentor Session</p><div className="flex items-center gap-1 text-xs text-slate-500 mt-1"><Calendar className="h-3 w-3" /> Help Desk</div></div></div>
            <div className="relative flex gap-4"><div className="h-6 w-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 z-10"><Lock className="h-3 w-3" /></div><div className="opacity-60"><p className="text-sm font-bold text-slate-700">Final Assessment</p><div className="flex items-center gap-1 text-xs text-slate-500 mt-1"><Award className="h-3 w-3" /> Certificate</div></div></div>

          </div>
        </div>

      </div>
    </div>
  );
}