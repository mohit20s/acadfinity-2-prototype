"use client";

import { useState } from 'react';
import { 
  ArrowLeft, BookOpen, Clock, FileText, CheckCircle2, 
  Video, HelpCircle, ChevronRight, Award, Users, Target, 
  ClipboardList, Trophy, Lock, Download, Calendar, PenTool, Radio, PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePrototypeStore } from '@/store/use-prototype-store';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// --- MOCK DATA ---
const courseAssignments = [
  { id: 'a1', title: "Variables Worksheet", due: "Oct 25", status: "pending", type: "Homework" },
  { id: 'a2', title: "Linear Equations Lab", due: "Oct 20", status: "graded", type: "Practical", score: "A+"},
];

const courseAssessments = [
  { id: 'q1', title: "Section 1.1 Evaluation", type: "Section-Based", scope: "Section 1.1", duration: "15 Mins", questions: 10, status: "completed", score: "90%", color: "blue" },
  { id: 'q2', title: "Mid-Term Evaluation", type: "Multi-Module", scope: "Modules 1 to 4", duration: "45 Mins", questions: 30, status: "pending", color: "purple" },
];

// =========================================================================
// NEW: 4-LEVEL DEEP HIERARCHICAL SYLLABUS DATA
// Module -> Chapter -> Section -> Lesson Items
// =========================================================================
const syllabusHierarchy = [
  {
    id: 'm1', 
    title: "Module 1: Algebra Fundamentals", 
    status: "active",
    chapters: [
      {
        id: 'c1', 
        title: "Chapter 1: The Basics of Variables",
        sections: [
          {
            id: 's1', 
            title: "Section 1.1: What is a Variable?",
            items: [
              { id: '101', title: "Pre-Read: Core Concepts", type: "Reading", duration: "5 Mins", status: "completed", icon: FileText },
              { id: '102', title: "Introduction to Variables", type: "Video", duration: "12 Mins", status: "completed", icon: Video },
              { id: '103', title: "Doubt Clearing Session", type: "Recorded Live", duration: "45 Mins", status: "completed", icon: Radio },
              { id: '104', title: "Variables Worksheet", type: "Assignment", duration: "Required", status: "completed", icon: PenTool, refId: 'a1' },
              { id: '105', title: "Section 1.1 Evaluation", type: "Assessment", duration: "15 Qs", status: "completed", icon: Target, refId: 'q1' },
            ]
          },
          {
            id: 's2', 
            title: "Section 1.2: Using Variables in Expressions",
            items: [
              { id: '106', title: "Pre-Read: Expressions vs Equations", type: "Reading", duration: "8 Mins", status: "completed", icon: FileText },
              { id: '107', title: "Building Expressions", type: "Video", duration: "15 Mins", status: "active", icon: Video },
              { id: '108', title: "Section 1.2 Evaluation", type: "Assessment", duration: "10 Qs", status: "locked", icon: Target },
            ]
          }
        ]
      },
      {
        id: 'c2', 
        title: "Chapter 2: Linear Equations",
        sections: [
          {
            id: 's3', 
            title: "Section 2.1: One-Step Equations",
            items: [
              { id: '201', title: "Solving One-Step Equations", type: "Video", duration: "20 Mins", status: "locked", icon: Video },
              { id: '202', title: "Practical Lab", type: "Assignment", duration: "Required", status: "locked", icon: PenTool, refId: 'a2' },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'm2', 
    title: "Module 2: Advanced Geometry", 
    status: "locked",
    chapters: [
      {
        id: 'c3', 
        title: "Chapter 3: Shapes and Properties",
        sections: [
          {
            id: 's4', 
            title: "Section 3.1: 2D Geometry",
            items: [
              { id: '301', title: "Intro to Geometry", type: "Live Class", duration: "Upcoming", status: "locked", icon: Calendar },
            ]
          }
        ]
      }
    ]
  }
];
// NEW: Live Classes Mock Data
const liveClasses = [
  { id: 'l1', title: "Doubt Clearing: Algebra Basics", date: "Today, 10:00 AM", instructor: "Anjali Sharma", status: "live" },
  { id: 'l2', title: "Advanced Equations Workshop", date: "Tomorrow, 2:00 PM", instructor: "Anjali Sharma", status: "upcoming" },
  { id: 'l3', title: "Intro to Variables (Recording)", date: "Oct 18, 2024", instructor: "Anjali Sharma", status: "recorded", duration: "45 Mins" },
];

export default function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const [activeTab, setActiveTab] = useState('content');
  const [readingMaterial, setReadingMaterial] = useState<string | null>(null);
  const router = useRouter();

  const isLiveNow = true;
  
  const handleItemClick = (item: any) => {
    if (item.status === 'locked') return;

    if (item.type === 'Video' || item.type === 'Recorded Live') {
      router.push(`/lms/lessons/${item.id}`);
    } else if (item.type === 'Reading') {
      setReadingMaterial(item.id);
    } else if (item.type === 'Assignment') {
      router.push(`/lms/assignments?assignmentId=${item.refId}`);
    } else if (item.type === 'Assessment') {
      setActiveTab('assessments'); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-24 relative">
      
      <Link href="/lms" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 -ml-2">
        <ArrowLeft className="h-4 w-4" /> Back to Course Catalog
      </Link>

      {/* Course Hero */}
      <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row justify-between items-start gap-6 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">Academic Course</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">Mathematics: Grade 8</h1>
          <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>By Anjali Sharma</span><span>•</span><span>32 Learners</span>
          </div>
        </div>
        <Button onClick={() => router.push(`/lms/lessons/107`)} className="relative z-10 rounded-full font-black px-8 h-12 shadow-xl shadow-primary/20">
          Resume Learning
        </Button>
      </div>
      
      <div className="flex border-b border-slate-200 px-2 scrollbar-hide overflow-x-auto sticky top-0 bg-slate-50/90 backdrop-blur-md z-20 -mx-4 sm:mx-0 px-4 sm:px-0">
        {['content','live classes', 'assignments', 'resources'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} 
            className={cn("px-5 md:px-6 py-4 text-xs font-black uppercase tracking-widest border-b-4 transition-all whitespace-nowrap", 
            activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600")}>
            {tab}
            {/* Show a red dot on the Live tab if there is an active session */}
            {tab === 'live classes' && isLiveNow && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>}
          </button>
        ))}
      </div>

      {/* 1. SYLLABUS (4-LEVEL DEEP) */}
      {activeTab === 'content' && (
        <div className="space-y-8 animate-in fade-in duration-300">
           {syllabusHierarchy.map((module) => (
             
             // LEVEL 1: MODULE
             <div key={module.id} className={cn("bg-white rounded-3xl border shadow-lg overflow-hidden", module.status === 'locked' ? "border-slate-100 opacity-60 grayscale" : "border-slate-200")}>
               
               <div className="p-6 md:p-8 bg-slate-900 border-b flex justify-between items-center text-white">
                 <h2 className="font-black text-xl md:text-2xl">{module.title}</h2>
                 {module.status === 'completed' && <CheckCircle2 className="h-6 w-6 text-emerald-400" />}
                 {module.status === 'active' && <PlayCircle className="h-6 w-6 text-primary" />}
                 {module.status === 'locked' && <Lock className="h-6 w-6 text-slate-500" />}
               </div>

               <div className="p-6 md:p-8 space-y-10">
                 {module.chapters.map((chapter) => (
                   
                   // LEVEL 2: CHAPTER
                   <div key={chapter.id} className="space-y-6">
                     <div className="border-b-2 border-slate-100 pb-2">
                        <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">{chapter.title}</h3>
                     </div>

                     <div className="space-y-6 pl-0 md:pl-4 border-l-0 md:border-l-2 border-slate-100">
                       {chapter.sections.map((section) => (
                         
                         // LEVEL 3: SECTION
                         <div key={section.id} className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100 space-y-4">
                           <h4 className="font-bold text-slate-600 text-sm uppercase tracking-widest">{section.title}</h4>
                           
                           <div className="space-y-2">
                             {section.items.map((item) => {
                               
                               // LEVEL 4: LESSON ITEMS (Pre-read, Video, Assignment, etc.)
                               const isCompleted = item.status === 'completed';
                               const isActive = item.status === 'active';
                               const isLocked = item.status === 'locked';

                               const isAssignment = item.type === 'Assignment';
                               const isAssessment = item.type === 'Assessment';
                               const isRecording = item.type === 'Recorded Live';
                               const isReading = item.type === 'Reading';

                               return (
                                 <div 
                                   key={item.id} 
                                   onClick={() => handleItemClick(item)} 
                                   className={cn(
                                     "flex items-center justify-between p-3 md:p-4 rounded-xl border transition-all group", 
                                     isCompleted ? "bg-white border-slate-200 hover:border-slate-300 cursor-pointer shadow-sm" : 
                                     isActive ? "bg-white border-primary/40 shadow-md ring-4 ring-primary/5 cursor-pointer hover:border-primary" : 
                                     "bg-transparent border-transparent opacity-60 cursor-not-allowed"
                                   )}
                                 >
                                   <div className="flex items-center gap-3 md:gap-4">
                                     <div className={cn(
                                       "h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform", 
                                        isAssignment ? "bg-purple-50 border-purple-200 text-purple-500" :
                                        isAssessment ? "bg-blue-50 border-blue-200 text-blue-500" :
                                        isRecording ? "bg-rose-50 border-rose-200 text-rose-500" :
                                        isReading ? "bg-amber-50 border-amber-200 text-amber-500" :
                                        isCompleted ? "bg-slate-100 border-slate-200 text-slate-500" :
                                        isActive ? "bg-primary/10 border-primary/20 text-primary group-hover:scale-110" :
                                        "bg-transparent border-slate-200 text-slate-400"
                                     )}>
                                       <item.icon className="h-5 w-5" />
                                     </div>
                                     <div>
                                       <p className={cn("text-sm font-bold line-clamp-1", isActive ? "text-slate-900" : "text-slate-700")}>{item.title}</p>
                                       <p className={cn(
                                         "text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-0.5",
                                         isRecording ? "text-rose-500" : "text-slate-400"
                                       )}>
                                         {item.type} • {item.duration}
                                       </p>
                                     </div>
                                   </div>
                                   
                                   <div className="shrink-0 ml-2">
                                     {isCompleted && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                                     {isActive && <Button size="sm" className="h-8 rounded-full font-black text-[10px] md:text-xs px-4 shadow-md">Start</Button>}
                                     {isLocked && <Lock className="h-4 w-4 text-slate-300" />}
                                   </div>
                                 </div>
                               );
                             })}
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           ))}
        </div>
      )}

      {/* 2. ASSIGNMENTS (Unchanged) */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
           {courseAssignments.map(assignment => (
             <div key={assignment.id} onClick={() => router.push(`/lms/assignments?assignmentId=${assignment.id}`)} className="bg-white p-5 rounded-2xl border-2 border-slate-100 hover:border-primary/30 transition-all cursor-pointer group shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-primary transition-colors"><FileText className="h-6 w-6" /></div>
                   <span className={cn("text-[9px] font-black uppercase px-2 py-1 rounded-md border", assignment.status === 'graded' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : assignment.status === 'submitted' ? 'bg-slate-100 text-slate-500 border-slate-200' : 'bg-amber-50 text-amber-600 border-amber-100')}>
                     {assignment.status === 'graded' ? `Grade: ${assignment.score}` : assignment.status}
                   </span>
                </div>
                <h4 className="font-bold text-slate-900 leading-tight mb-4">{assignment.title}</h4>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter"><Clock className="h-3 w-3" /> Due {assignment.due}</div>
                   <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Open <ChevronRight className="h-3 w-3" /></div>
                </div>
             </div>
           ))}
        </div>
      )}

      {/* 3. ASSESSMENTS (Unchanged) */}
      {activeTab === 'assessments' && (
        <div className="space-y-4 animate-in fade-in duration-300">
           {courseAssessments.map(assessment => {
             const isBlue = assessment.color === 'blue';
             const isPurple = assessment.color === 'purple';
             const isLocked = assessment.status === 'locked';

             return (
               <div key={assessment.id} className={cn("bg-white p-6 rounded-2xl border-2 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all", isLocked ? "border-slate-100 opacity-60 grayscale" : "border-slate-100 hover:border-primary/30 cursor-pointer")}>
                 <div className="flex items-start md:items-center gap-5">
                    <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0", isBlue ? "bg-blue-50 text-blue-500" : isPurple ? "bg-purple-50 text-purple-500" : "bg-amber-50 text-amber-500")}>
                      {isLocked ? <Lock className="h-6 w-6 text-slate-400" /> : isBlue ? <Target className="h-6 w-6" /> : isPurple ? <ClipboardList className="h-6 w-6" /> : <Trophy className="h-6 w-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5"><span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border", isBlue ? "bg-blue-50 text-blue-600 border-blue-100" : isPurple ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-amber-50 text-amber-600 border-amber-100")}>{assessment.type}</span></div>
                      <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{assessment.title}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scope: {assessment.scope}</p>
                    </div>
                 </div>
                 <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-0 border-slate-100">
                    <div className="flex gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest"><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {assessment.duration}</span><span className="flex items-center gap-1"><HelpCircle className="h-3.5 w-3.5" /> {assessment.questions} Qs</span></div>
                    {assessment.status === 'completed' ? <span className="font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full text-xs">Score: {assessment.score}</span> : isLocked ? <Button variant="secondary" disabled className="font-bold text-xs h-9">Locked</Button> : <Button className="font-bold text-xs h-9 shadow-md">Start Assessment</Button>}
                 </div>
               </div>
             );
           })}
        </div>
      )}
{/* 4. NEW: LIVE CLASSES TAB */}
      {activeTab === 'live classes' && (
        <div className="space-y-4 animate-in fade-in duration-300">
           {liveClasses.map((session) => (
             <div key={session.id} className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-all cursor-pointer group">
               <div className="flex items-start md:items-center gap-5">
                  <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0", 
                    session.status === 'live' ? "bg-rose-50 text-rose-500 ring-4 ring-rose-500/10" : 
                    session.status === 'upcoming' ? "bg-blue-50 text-blue-500" : "bg-slate-100 text-slate-500"
                  )}>
                    {session.status === 'live' ? <Radio className="h-6 w-6 animate-pulse" /> : session.status === 'upcoming' ? <Calendar className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border", 
                        session.status === 'live' ? "bg-rose-500 text-white border-rose-600" : 
                        session.status === 'upcoming' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-100 text-slate-600 border-slate-200"
                      )}>
                        {session.status === 'live' ? "Live Now" : session.status === 'upcoming' ? "Upcoming" : "Recorded"}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{session.title}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Instructor: {session.instructor}</p>
                  </div>
               </div>
               <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-0 border-slate-100">
                  <div className="flex gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                     <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {session.status === 'recorded' ? session.duration : session.date}</span>
                  </div>
                  {session.status === 'live' ? (
                     <Button className="font-black text-xs h-9 bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20">Join Session</Button>
                  ) : session.status === 'upcoming' ? (
                     <Button variant="outline" className="font-black text-xs h-9 border-2 text-slate-600">Add to Calendar</Button>
                  ) : (
                     <Button variant="secondary" className="font-black text-xs h-9">Watch Recording</Button>
                  )}
               </div>
             </div>
           ))}
        </div>
      )}
      {/* 4. RESOURCES */}
      {activeTab === 'resources' && (
        <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-slate-100 text-center text-slate-400 font-bold uppercase text-xs tracking-widest animate-in fade-in">
          No downloadable resources for this course yet.
        </div>
      )}

    </div>
  );
}