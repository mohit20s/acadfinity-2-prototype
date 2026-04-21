"use client";

import { useState } from 'react';
import { 
  ArrowLeft, BookOpen, Clock, FileText, CheckCircle2, 
  Video, HelpCircle, ChevronRight, Award, Users, Target, 
  ClipboardList, Trophy, Lock, Download, Calendar, PenTool, X, Bookmark, PlayCircle,
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
  { id: 'q1', title: "Module 1: Logic Basics Quiz", type: "Module-Based", scope: "Module 1", duration: "15 Mins", questions: 10, status: "completed", score: "90%", color: "blue" },
  { id: 'q2', title: "Mid-Term Evaluation", type: "Multi-Module", scope: "Modules 1 to 4", duration: "45 Mins", questions: 30, status: "pending", color: "purple" },
  { id: 'q3', title: "Final Certification Exam", type: "Program-Based", scope: "Entire Course", duration: "120 Mins", questions: 100, status: "locked", color: "amber" },
];

// --- INTERCONNECTED SYLLABUS DATA ---
const syllabusModules = [
  {
    id: 'm1',
    title: "Module 1: Algebra Basics",
    status: "completed",
    lessons: [
      { id: '101', title: "1.1 - Pre-Read: Core Concepts", type: "Reading", duration: "5 Mins", status: "completed", icon: FileText },
      { id: '102', title: "1.2 - Introduction to Variables", type: "Video", duration: "12 Mins", status: "completed", icon: Video },
      { id: '103', title: "1.3 - Variables Worksheet", type: "Assignment", duration: "Required", status: "completed", icon: PenTool, refId: 'a1' },
    ]
  },
  {
    id: 'm2',
    title: "Module 2: Advanced Equations",
    status: "active",
    lessons: [
      { id: '201', title: "2.1 - Two-Step Equations", type: "Video", duration: "18 Mins", status: "completed", icon: Video },
      { id: '202', title: "2.2 - Variables on Both Sides", type: "Video", duration: "22 Mins", status: "active", icon: Video },
      { id: '203', title: "2.3 - Practical Lab", type: "Assignment", duration: "Required", status: "locked", icon: PenTool, refId: 'a2' },
      { id: '204', title: "2.4 - Module 2 Assessment", type: "Quiz", duration: "15 Qs", status: "locked", icon: HelpCircle },
    ]
  },
  {
    id: 'm3',
    title: "Module 3: Geometry & Formulas",
    status: "locked",
    lessons: [
      { id: '301', title: "3.1 - Intro to Geometry", type: "Live Class", duration: "Upcoming", status: "locked", icon: Calendar },
      { id: '302', title: "3.2 - Calculating Area", type: "Reading", duration: "20 Mins", status: "locked", icon: FileText },
    ]
  }
];

export default function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const [activeTab, setActiveTab] = useState('syllabus');
  const [readingMaterial, setReadingMaterial] = useState<string | null>(null);
  const router = useRouter();

  // --- INTERCONNECTED CLICK ROUTING ---
  const handleSyllabusClick = (lesson: any) => {
    if (lesson.status === 'locked') return;

    if (lesson.type === 'Video') {
      router.push(`/lms/lessons/${lesson.id}`);
    } else if (lesson.type === 'Reading') {
      setReadingMaterial(lesson.id);
    } else if (lesson.type === 'Assignment') {
      // Route to the Global Assignments Hub, automatically opening this specific assignment!
      router.push(`/lms/assignments?assignmentId=${lesson.refId}`);
    } else if (lesson.type === 'Quiz') {
      setActiveTab('assessments'); // Switch tab to assessments
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
        <Button onClick={() => router.push(`/lms/lessons/202`)} className="relative z-10 rounded-full font-black px-8 h-12 shadow-xl shadow-primary/20">
          Resume Module 2
        </Button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200 px-2 scrollbar-hide overflow-x-auto sticky top-0 bg-slate-50/90 backdrop-blur-md z-20 -mx-4 sm:mx-0 px-4 sm:px-0">
        {['syllabus', 'assignments', 'assessments', 'resources'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} 
            className={cn("px-5 md:px-6 py-4 text-xs font-black uppercase tracking-widest border-b-4 transition-all whitespace-nowrap", 
            activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600")}>
            {tab}
          </button>
        ))}
      </div>

      {/* 1. SYLLABUS (INTERCONNECTED) */}
      {activeTab === 'syllabus' && (
        <div className="space-y-6 animate-in fade-in duration-300">
           {syllabusModules.map((module) => (
             <div key={module.id} className={cn("bg-white rounded-3xl border shadow-sm overflow-hidden", module.status === 'locked' ? "border-slate-100 opacity-70 grayscale" : "border-slate-200")}>
               
               <div className="p-6 bg-slate-50/50 border-b flex justify-between items-center">
                 <div>
                   <h3 className="font-black text-slate-900 text-lg">{module.title}</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{module.lessons.length} Lessons</p>
                 </div>
                 {module.status === 'completed' && <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100"><CheckCircle2 className="h-4 w-4" /> Completed</div>}
                 {module.status === 'active' && <div className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20"><PlayCircle className="h-4 w-4" /> In Progress</div>}
                 {module.status === 'locked' && <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200"><Lock className="h-4 w-4" /> Locked</div>}
               </div>

               <div className="p-6 space-y-3">
                 {module.lessons.map((lesson) => (
                   <div 
                     key={lesson.id} 
                     onClick={() => handleSyllabusClick(lesson)}
                     className={cn("flex items-center justify-between p-4 rounded-2xl border transition-all group",
                       lesson.status === 'completed' ? "bg-slate-50 border-slate-100 hover:border-slate-300 cursor-pointer" :
                       lesson.status === 'active' ? "bg-white border-primary/40 shadow-md ring-4 ring-primary/5 cursor-pointer hover:border-primary" :
                       "bg-white border-slate-100 opacity-60 cursor-not-allowed"
                     )}
                   >
                     <div className="flex items-center gap-4">
                       <div className={cn("h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform", 
                          lesson.type === 'Assignment' ? "bg-purple-50 border-purple-200 text-purple-500" :
                          lesson.type === 'Reading' ? "bg-amber-50 border-amber-200 text-amber-500" :
                          lesson.status === 'completed' ? "bg-white border-slate-200 text-slate-400" :
                          lesson.status === 'active' ? "bg-primary/10 border-primary/20 text-primary group-hover:scale-110" :
                          "bg-slate-50 border-slate-100 text-slate-300"
                       )}>
                         <lesson.icon className="h-5 w-5" />
                       </div>
                       <div>
                         <p className={cn("text-sm font-bold", lesson.status === 'active' ? "text-slate-900" : "text-slate-700")}>{lesson.title}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{lesson.type} • {lesson.duration}</p>
                       </div>
                     </div>
                     
                     {lesson.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                     {lesson.status === 'active' && <Button size="sm" className="h-8 rounded-full font-black text-xs px-4">Start</Button>}
                     {lesson.status === 'locked' && <Lock className="h-4 w-4 text-slate-300" />}
                   </div>
                 ))}
               </div>
             </div>
           ))}
        </div>
      )}

      {/* 2. ASSIGNMENTS */}
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

      {/* 3. ASSESSMENTS */}
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

      {/* 4. RESOURCES */}
      {activeTab === 'resources' && (
        <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-slate-100 text-center text-slate-400 font-bold uppercase text-xs tracking-widest animate-in fade-in">
          No downloadable resources for this course yet.
        </div>
      )}

      {/* =========================================
          READING MODE OVERLAY (Pops up when clicking a "Reading" in Syllabus)
          ========================================= */}
      {readingMaterial && (
        <div className="fixed inset-0 z-[100] bg-white text-slate-900 flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 bg-white shadow-sm pt-safe-area-inset-top">
            <button onClick={() => setReadingMaterial(null)} className="flex items-center gap-2 text-slate-900 font-bold hover:text-primary">
              <X className="h-5 w-5" /> Close Reading
            </button>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-primary"><Bookmark className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 max-w-3xl mx-auto w-full">
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pre-Read Material</span>
             <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight my-4">Chapter 1: Core Concepts</h1>
             
             <article className="prose prose-slate prose-lg max-w-none mt-8">
               <p className="text-slate-600 font-medium">
                 Before diving into the video lessons, it's crucial to understand the fundamental building blocks of Algebra. 
                 A variable is a symbol, usually a letter, that represents an unknown number.
               </p>
               <h3 className="font-black text-slate-900">Key Rules:</h3>
               <ul className="font-medium text-slate-600">
                 <li><strong>Balance:</strong> Whatever you do to one side of the equation, you must do to the other.</li>
                 <li><strong>Isolation:</strong> The goal is always to get the variable by itself on one side of the equals sign.</li>
               </ul>
             </article>

             <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
               <Button onClick={() => setReadingMaterial(null)} className="h-14 px-10 rounded-full font-black shadow-xl text-lg">
                 Mark as Read & Continue
               </Button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}