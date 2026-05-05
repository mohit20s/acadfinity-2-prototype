"use client";

import { useState } from 'react';
import { 
  ArrowLeft, BookOpen, Clock, FileText, CheckCircle2, 
  Video, HelpCircle, ChevronRight, Award, Users, Target, 
  ClipboardList, Trophy, Lock, Download, Calendar, PenTool, Radio, PlayCircle, ChevronDown, ListChecks, X, Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePrototypeStore } from '@/store/use-prototype-store';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const courseAssignments = [
  { id: 'a1', title: "Variables Worksheet", due: "Oct 25", status: "pending", type: "Homework" },
  { id: 'a2', title: "Linear Equations Lab", due: "Oct 20", status: "graded", type: "Practical", score: "A+"},
];

const courseAssessments = [
  { id: 'q1', title: "Section 1.1 Evaluation", type: "Section-Based", scope: "Section 1.1", duration: "15 Mins", questions: 10, status: "completed", score: "90%", color: "blue" },
  { id: 'q2', title: "Mid-Term Evaluation", type: "Multi-Module", scope: "Modules 1 to 4", duration: "45 Mins", questions: 30, status: "pending", color: "purple" },
];
// =========================================================================
// REAL ENTERPRISE COURSE CURRICULUM
// =========================================================================
const syllabusHierarchy = [
  {
    id: 'm0', title: "Module 0: INTRODUCTION", status: "completed",
    chapters: [
      {
        id: 'm0-c1', title: "Chapter 1: Welcome & Course Overview",
        items: [
          { id: '001', title: "Lecture Video", type: "Video", duration: "10 Mins", status: "completed", icon: Video },
        { id: '003', title: "Course Guide PDF", type: "Resource", duration: "2 MB", status: "completed", icon: Download },
       
        ]
      },
      {
        id: 'm0-c2', title: "Chapter 2: How to Use This Course",
        items: [
          { id: '002', title: "Lecture Video", type: "Video", duration: "8 Mins", status: "completed", icon: Video },
           ]
      }
    ]
  },
  {
    id: 'm1', title: "Module 1: Financial Planning of Educational Institutes", status: "active",
    chapters: [
      {
        id: 'm1-c1', title: "Chapter 1: Financial Data Framework",
        items: [
          { id: '101', title: "Lecture Video", type: "Video", duration: "15 Mins", status: "completed", icon: Video },
          { id: '102', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "completed", icon: FileText },
          { id: '103', title: "Financial Data Collection Template", type: "Resource", duration: "XLSX", status: "completed", icon: Download },
        ]
      },
      {
        id: 'm1-c2', title: "Chapter 2: Historical Financial Analysis",
        items: [
          { id: '104', title: "Lecture Video", type: "Video", duration: "22 Mins", status: "active", icon: Video },
          { id: '105', title: "Content Notes", type: "Reading", duration: "10 Mins", status: "locked", icon: FileText },
          { id: '106', title: "Fee Structure Format", type: "Resource", duration: "PDF", status: "locked", icon: Download },
        ]
      },
      {
        id: 'm1-c3', title: "Chapter 3: Revenue & Expense Structuring",
        items: [
          { id: '107', title: "Lecture Video", type: "Video", duration: "25 Mins", status: "locked", icon: Video },
          { id: '108', title: "Content Notes", type: "Reading", duration: "10 Mins", status: "locked", icon: FileText },
          { id: '109', title: "Expense Classification Sheet", type: "Resource", duration: "XLSX", status: "locked", icon: Download },
        ]
      },
      {
        id: 'm1-eval', title: "Module 1 Evaluation",
        items: [
          { id: '110', title: "Quiz 1 (MCQ – Basic Understanding)", type: "Assessment", duration: "15 Qs", status: "locked", icon: Target },
        ]
      }
    ]
  },
  {
    id: 'm2', title: "Module 2: Accounting, Bookkeeping & Audit", status: "locked",
    chapters: [
      {
        id: 'm2-c1', title: "Chapter 1: Chart of Accounts Design",
        items: [
          { id: '201', title: "Lecture Video", type: "Video", duration: "18 Mins", status: "locked", icon: Video },
          { id: '202', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText },
          { id: '203', title: "Chart of Accounts Template", type: "Resource", duration: "XLSX", status: "locked", icon: Download },
        ]
      },
      {
        id: 'm2-c2', title: "Chapter 2: Accounting Structure & Logic",
        items: [
          { id: '204', title: "Lecture Video", type: "Video", duration: "20 Mins", status: "locked", icon: Video },
          { id: '205', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText },
          { id: '206', title: "Cash Book Format", type: "Resource", duration: "XLSX", status: "locked", icon: Download },
        ]
      },
      {
        id: 'm2-c3', title: "Chapter 3: Books & Registers Setup",
        items: [
          { id: '207', title: "Lecture Video", type: "Video", duration: "15 Mins", status: "locked", icon: Video },
          { id: '208', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText },
          { id: '209', title: "Ledger Format", type: "Resource", duration: "XLSX", status: "locked", icon: Download },
        ]
      },
      {
        id: 'm2-c4', title: "Chapter 4: Accounting Workflow",
        items: [
          { id: '210', title: "Lecture Video", type: "Video", duration: "25 Mins", status: "locked", icon: Video },
          { id: '211', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText },
          { id: '212', title: "Journal Entry Template", type: "Resource", duration: "XLSX", status: "locked", icon: Download },
        ]
      },
      {
        id: 'm2-eval', title: "Assessment",
        items: [
          { id: '213', title: "Quiz 2 (Application-Based)", type: "Assessment", duration: "20 Qs", status: "locked", icon: Target },
        ]
      }
    ]
  },
  {
    id: 'm3', title: "Module 3: Loan Facilitation", status: "locked",
    chapters: [
      {
        id: 'm3-c1', title: "Chapter 1: Why Schools Need Loans",
        items: [{ id: '301', title: "Lecture Video", type: "Video", duration: "15 Mins", status: "locked", icon: Video }, { id: '302', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }]
      },
      {
        id: 'm3-c2', title: "Chapter 2: Types of Loans",
        items: [{ id: '303', title: "Lecture Video", type: "Video", duration: "15 Mins", status: "locked", icon: Video }, { id: '304', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }]
      },
      {
        id: 'm3-c3', title: "Chapter 3: Loan Readiness & Documentation",
        items: [{ id: '305', title: "Lecture Video", type: "Video", duration: "30 Mins", status: "locked", icon: Video }, { id: '306', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '307', title: "Loan Documentation Checklist", type: "Resource", duration: "PDF", status: "locked", icon: Download }]
      },
      {
        id: 'm3-c4', title: "Chapter 4: Cash Flow & Repayment Planning",
        items: [{ id: '308', title: "Lecture Video", type: "Video", duration: "20 Mins", status: "locked", icon: Video }, { id: '309', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '310', title: "Cash Flow Projection Template", type: "Resource", duration: "XLSX", status: "locked", icon: Download }]
      },
      {
        id: 'm3-c5', title: "Chapter 5: Loan Process & Approval Strategy",
        items: [{ id: '311', title: "Lecture Video", type: "Video", duration: "25 Mins", status: "locked", icon: Video }, { id: '312', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '313', title: "DPR Structure Guide", type: "Resource", duration: "PDF", status: "locked", icon: Download }]
      },
      {
        id: 'm3-eval', title: "Assessment & Assignment",
        items: [
          { id: '314', title: "Quiz 3 (Scenario-Based)", type: "Assessment", duration: "15 Qs", status: "locked", icon: Target },
          { id: '315', title: "Prepare Loan Readiness Sheet", type: "Assignment", duration: "Recommended", status: "locked", icon: PenTool, refId: 'a1' },
        ]
      }
    ]
  },
  {
    id: 'm4', title: "Module 4: Statutory Compliance", status: "locked",
    chapters: [
      {
        id: 'm4-c1', title: "Chapter 1: Budgeting System",
        items: [{ id: '401', title: "Lecture Video", type: "Video", duration: "20 Mins", status: "locked", icon: Video }, { id: '402', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '403', title: "Budget Template", type: "Resource", duration: "XLSX", status: "locked", icon: Download }]
      },
      {
        id: 'm4-c2', title: "Chapter 2: Cost Control & Optimization",
        items: [{ id: '404', title: "Lecture Video", type: "Video", duration: "18 Mins", status: "locked", icon: Video }, { id: '405', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '406', title: "Variance Analysis Sheet", type: "Resource", duration: "XLSX", status: "locked", icon: Download }]
      },
      {
        id: 'm4-c3', title: "Chapter 3: Surplus & Fund Planning",
        items: [{ id: '407', title: "Lecture Video", type: "Video", duration: "22 Mins", status: "locked", icon: Video }, { id: '408', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '409', title: "Financial Dashboard", type: "Resource", duration: "XLSX", status: "locked", icon: Download }]
      },
      {
        id: 'm4-c4', title: "Chapter 4: Financial Decision Framework",
        items: [{ id: '410', title: "Lecture Video", type: "Video", duration: "15 Mins", status: "locked", icon: Video }, { id: '411', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '412', title: "Decision Matrix", type: "Resource", duration: "XLSX", status: "locked", icon: Download }]
      },
      {
        id: 'm4-eval', title: "Assessment & Assignment",
        items: [
          { id: '413', title: "Quiz 4 (Case-Based)", type: "Assessment", duration: "20 Qs", status: "locked", icon: Target },
          { id: '414', title: "Annual Budget & Variance Analysis", type: "Assignment", duration: "Required", status: "locked", icon: PenTool, refId: 'a2' },
        ]
      }
    ]
  },
  {
    id: 'm5', title: "Module 5: Compliance & Regulatory System", status: "locked",
    chapters: [
      {
        id: 'm5-c1', title: "Chapter 1: PF, ESI & Labour Compliance",
        items: [{ id: '501', title: "Lecture Video", type: "Video", duration: "20 Mins", status: "locked", icon: Video }, { id: '502', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '503', title: "PF / ESI Sheets", type: "Resource", duration: "XLSX", status: "locked", icon: Download }]
      },
      {
        id: 'm5-c2', title: "Chapter 2: TDS & GST Basics",
        items: [{ id: '504', title: "Lecture Video", type: "Video", duration: "18 Mins", status: "locked", icon: Video }, { id: '505', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '506', title: "TDS Tracker", type: "Resource", duration: "XLSX", status: "locked", icon: Download }]
      },
      {
        id: 'm5-c3', title: "Chapter 3: 12AB / 80G Overview",
        items: [{ id: '507', title: "Lecture Video", type: "Video", duration: "22 Mins", status: "locked", icon: Video }, { id: '508', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }]
      },
      {
        id: 'm5-c4', title: "Chapter 4: Compliance Calendar System",
        items: [{ id: '509', title: "Lecture Video", type: "Video", duration: "15 Mins", status: "locked", icon: Video }, { id: '510', title: "Content Notes", type: "Reading", duration: "5 Mins", status: "locked", icon: FileText }, { id: '511', title: "Compliance Calendar", type: "Resource", duration: "XLSX", status: "locked", icon: Download }]
      },
      {
        id: 'm5-eval', title: "Assessment & Assignment",
        items: [
          { id: '512', title: "Quiz 5 (Concept + Practical)", type: "Assessment", duration: "20 Qs", status: "locked", icon: Target },
          { id: '513', title: "Create Compliance Checklist", type: "Assignment", duration: "Recommended", status: "locked", icon: PenTool, refId: 'a3' },
        ]
      }
    ]
  },
  {
    id: 'm-final', title: "Completion & Certification", status: "locked",
    chapters: [
      {
        id: 'final-c', title: "Final Assessment",
        items: [
          { id: 'f1', title: "Final Certification Exam", type: "Assessment", duration: "100 Qs", status: "locked", icon: Trophy },
          { id: 'f2', title: "Claim Course Certificate", type: "Resource", duration: "PDF", status: "locked", icon: Award },
        ]
      }
    ]
  }
];
const liveClasses = [
  { 
    id: 'l1', 
    title: "Q&A: Fee Structure & GST Compliance", 
    date: "Today, 11:30 AM", 
    instructor: "Finance Expert", 
    status: "live" 
  },
  { 
    id: 'l2', 
    title: "Masterclass: Annual Budget Projection", 
    date: "Tomorrow, 3:00 PM", 
    instructor: "Finance Expert", 
    status: "upcoming" 
  },
  { 
    id: 'l3', 
    title: "Understanding 12AB/80G (Recording)", 
    date: "Oct 15, 2024", 
    instructor: "Expert Faculty", 
    status: "recorded", 
    duration: "52 Mins" 
  },
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
    } else if (item.type === 'Reading' || item.type === 'Resource') {
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
          <p className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded w-fit uppercase tracking-[0.2em] mb-4">
            School Transformation Program
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">Financial Framework of Indian Education</h1>
          <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>By Expert Faculty</span><span>•</span><span>340 Directors Enrolled</span>
          </div>
        </div>
        <Button onClick={() => router.push(`/lms/lessons/104`)} className="relative z-10 rounded-full font-black px-8 h-12 shadow-xl shadow-primary/20">
          Resume Module 1
        </Button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200 px-2 scrollbar-hide overflow-x-auto sticky top-0 bg-slate-50/90 backdrop-blur-md z-20 -mx-4 sm:mx-0 px-4 sm:px-0">
        {['content', 'live classes', 'assessments', 'resources'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} 
            className={cn("px-5 md:px-6 py-4 text-xs font-black uppercase tracking-widest border-b-4 transition-all whitespace-nowrap", 
            activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600")}>
            {tab}
             {tab === 'live classes' && isLiveNow && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>}
       
          </button>
        ))}
      </div>

      {/* 1. CONTENT (SYLLABUS RENDERER) */}
      {activeTab === 'content' && (
        <div className="space-y-8 animate-in fade-in duration-300">
           {syllabusHierarchy.map((module) => (
             <div key={module.id} className={cn("bg-white rounded-3xl border shadow-lg overflow-hidden", module.status === 'locked' ? "border-slate-100 opacity-60 grayscale" : "border-slate-200")}>
               
               <div className="p-6 md:p-8 bg-slate-900 border-b flex justify-between items-center text-white">
                 <div>
                   <h2 className="font-black text-xl md:text-2xl">{module.title}</h2>
                 </div>
                 {module.status === 'completed' && <CheckCircle2 className="h-6 w-6 text-emerald-400" />}
                 {module.status === 'active' && <PlayCircle className="h-6 w-6 text-primary" />}
                 {module.status === 'locked' && <Lock className="h-6 w-6 text-slate-500" />}
               </div>

               <div className="p-6 md:p-8 space-y-10">
                 {module.chapters.map((chapter) => (
                   <div key={chapter.id} className="space-y-4">
                     <div className="flex items-center gap-3 border-b-2 border-slate-100 pb-2">
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                        <h3 className="font-black text-slate-800 text-base md:text-lg tracking-tight">{chapter.title}</h3>
                     </div>

                     <div className="space-y-3 pl-1 md:pl-4 border-l-0 md:border-l-2 border-slate-100">
                       {chapter.items.map((item) => {
                         const isCompleted = item.status === 'completed';
                         const isActive = item.status === 'active';
                         const isLocked = item.status === 'locked';

                         const isAssignment = item.type === 'Assignment';
                         const isAssessment = item.type === 'Assessment';
                         const isRecording = item.type === 'Recorded Live';
                         const isReading = item.type === 'Reading' || item.type === 'Resource';

                         return (
                           <div 
                             key={item.id} 
                             onClick={() => handleItemClick(item)} 
                             className={cn(
                               "flex items-center justify-between p-3 md:p-4 rounded-xl border transition-all group", 
                               isCompleted ? "bg-slate-50 border-slate-200 hover:border-slate-300 cursor-pointer shadow-sm" : 
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
      {/* KEEP OTHER TABS AS PLACEHOLDERS FOR DEMO */}
      {activeTab !== 'content' && (
        <div className="p-12 text-center text-slate-400 font-bold uppercase text-xs tracking-widest animate-in fade-in">
          Switch to Content tab to view the syllabus.
        </div>
      )}

      {/* =========================================================================
          DYNAMIC READING OVERLAY (Contains your EXACT specified text!)
          ========================================================================= */}
      {readingMaterial && (
        <div className="absolute inset-0 z-50 bg-white text-slate-900 flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 bg-white shadow-sm">
            <button onClick={() => setReadingMaterial(null)} className="flex items-center gap-2 text-slate-900 font-bold hover:text-primary">
              <X className="h-5 w-5" /> Close View
            </button>
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-primary"><Bookmark className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-24 max-w-4xl mx-auto w-full">
             
             {/* CONTENT: Course Guide PDF (ID: 003) */}
             {readingMaterial === '003' && (
               <div className="animate-in fade-in">
                 <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight my-4">📘 FINANCE FRAMEWORK MODULE</h1>
                 <h2 className="text-xl font-bold text-slate-500 mb-8">Course Guide (Professional Version)</h2>

                 <article className="prose prose-slate prose-lg max-w-none mt-8">
                   <h3>🎯 1. Course Overview</h3>
                   <p>Welcome to the Finance Framework Module under the School Transformation Program.<br/>
                   This course is designed to help educational institutions move from:<br/>
                   <strong>Unstructured financial practices → System-driven financial management</strong></p>

                   <h4>🧠 What This Course Will Help You Achieve</h4>
                   <p>By the end of this program, you will be able to:</p>
                   <ul>
                     <li>Build a complete financial system for your school</li>
                     <li>Structure and manage financial data effectively</li>
                     <li>Implement accounting systems and workflows</li>
                     <li>Understand and manage cash flow, budgeting, and control</li>
                     <li>Ensure compliance and regulatory readiness</li>
                     <li>Make informed financial decisions for growth</li>
                   </ul>

                   <h4>🎯 Who This Course is For</h4>
                   <ul>
                     <li>School Owners</li>
                     <li>Directors</li>
                     <li>Principals</li>
                     <li>Administrators</li>
                     <li>Coaching Institute Owners</li>
                   </ul>

                   <h4>📊 Course Outcome</h4>
                   <blockquote className="border-l-4 border-primary pl-4 italic text-slate-600">
                     “You will not just learn finance — you will build a structured financial operating system for your institution.”
                   </blockquote>

                   <h3>🧭 2. Course Structure</h3>
                   <p>This course is divided into 5 structured modules, each designed to build a complete financial system step-by-step.</p>

                   <h4>📘 Module 1 – Financial Planning & Data Structuring</h4>
                   <p><strong>Objective:</strong> Build financial clarity<br/>
                   <strong>You will learn:</strong></p>
                   <ul><li>Financial data framework</li><li>Historical analysis</li><li>Revenue and expense structuring</li></ul>

                   <h4>📘 Module 2 – Accounting System Setup</h4>
                   <p><strong>Objective:</strong> Build your accounting foundation<br/>
                   <strong>You will learn:</strong></p>
                   <ul><li>Chart of Accounts (COA)</li><li>Accounting logic</li><li>Books & registers</li><li>Complete accounting workflow</li></ul>

                   <h4>📘 Module 3 – Loan Facilitation</h4>
                   <p><strong>Objective:</strong> Prepare for financial growth<br/>
                   <strong>You will learn:</strong></p>
                   <ul><li>Types of loans</li><li>Documentation</li><li>Financial readiness</li><li>Cash flow and repayment planning</li></ul>

                   <h4>📘 Module 4 – Financial Control, Budgeting & Decision Making</h4>
                   <p><strong>Objective:</strong> Control and optimize finances<br/>
                   <strong>You will learn:</strong></p>
                   <ul><li>Budgeting system</li><li>Cost control strategies</li><li>Surplus and fund planning</li><li>Financial decision-making framework</li></ul>

                   <h4>📘 Module 5 – Compliance & Regulatory System</h4>
                   <p><strong>Objective:</strong> Ensure legal and operational security<br/>
                   <strong>You will learn:</strong></p>
                   <ul><li>PF, ESI, labour compliance</li><li>TDS & GST basics</li><li>12AB / 80G</li><li>Compliance calendar system</li></ul>

                   <h3>🔁 3. Learning Methodology</h3>
                   <p>This course follows a practical implementation approach.<br/>Each Chapter includes:</p>
                   <ul>
                     <li><strong>🎥 Video Learning:</strong> Concept explanation, Real-life examples, Step-by-step guidance</li>
                     <li><strong>📘 Content Notes:</strong> Structured explanations, Key frameworks, Simplified concepts</li>
                     <li><strong>📊 Practical Templates:</strong> Ready-to-use formats, Excel sheets, Trackers and tools</li>
                   </ul>

                   <h4>❓ Assessments</h4>
                   <ul><li>Quizzes (concept + application)</li><li>Scenario-based questions</li></ul>

                   <h4>📦 Assignments</h4>
                   <ul><li>Real implementation tasks</li><li>System-building exercises</li></ul>

                   <blockquote className="border-l-4 border-primary pl-4 italic text-slate-600 font-bold mt-8">
                     “You will learn → apply → build → and implement”<br/><br/>
                     “If you follow this course step by step…”<br/>
                     You will not just understand finance…<br/>
                     You will build a complete financial system for your school.<br/>
                     Start implementing. Start transforming.
                   </blockquote>
                 </article>
                 <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
                   <Button onClick={() => alert("Downloading Course Guide PDF...")} className="h-14 px-8 rounded-full font-black shadow-lg bg-emerald-600 hover:bg-emerald-700 text-lg">
                     <Download className="h-5 w-5 mr-2" /> Download Course Guide PDF
                   </Button>
                 </div>
               </div>
             )}

             {/* CONTENT: Content Notes (ID: 102) */}
             {readingMaterial === '102' && (
               <div className="animate-in fade-in">
                 <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pre-Read Material</span>
                 <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight my-4">📘 Chapter 1.1: Financial Data Framework</h1>
                 <h2 className="text-xl font-bold text-slate-500 mb-8">Topic: 6 SIX Data Pillars for Financial Clarity & Control</h2>

                 <article className="prose prose-slate prose-lg max-w-none mt-8">
                   <h3>🧭 1. Introduction to Financial Data Framework</h3>
                   <p>Before building any financial system, it is essential to establish clarity and structure in financial data.</p>
                   <p><strong>Key Principle:</strong><br/>Effective financial management begins with visibility of accurate and structured data.</p>
                   
                   <p><strong>Common Challenges in Schools:</strong><br/>In many educational institutions, financial data is:</p>
                   <ul>
                     <li>Scattered across multiple sources</li>
                     <li>Incomplete or outdated</li>
                     <li>Not categorized or structured</li>
                   </ul>

                   <p><strong>Impact of Poor Data Structure:</strong></p>
                   <ul>
                     <li>Delayed decision-making</li>
                     <li>Unpredictable cash flow</li>
                     <li>Weak financial control</li>
                     <li>Increased risk of inefficiencies</li>
                   </ul>

                   <p><strong>Objective of This Chapter:</strong><br/>To build a strong financial data foundation by organizing all financial information into 6 structured data pillars.</p>

                   <h3>🧩 2. The 6 SIX Financial Data Pillars</h3>
                   <p>These pillars form the base of a system-driven financial framework.</p>

                   <h4>🧾 Pillar 1: Historical Financial Records</h4>
                   <p><strong>Definition:</strong> Financial data from previous years that reflects the institution’s past performance.</p>
                   <p><strong>Data to be Collected:</strong></p>
                   <ul><li>Income & Expenditure Statements (last 2–3 years)</li><li>Balance Sheets (last 2–3 years)</li><li>Current year provisional financials</li></ul>
                   <p><strong>Purpose:</strong></p>
                   <ul><li>Analyze revenue growth trends</li><li>Understand cost behavior patterns</li><li>Identify inefficiencies and leakages</li></ul>
                   <p><strong>Key Insight:</strong> Financial planning without historical data leads to assumptions rather than informed decisions.</p>

                   <h4>💰 Pillar 2: Revenue & Fee Data</h4>
                   <p><strong>Definition:</strong> Structured understanding of all income sources and fee collection mechanisms.</p>
                   <p><strong>Data to be Collected:</strong></p>
                   <ul><li>Class-wise fee structure</li><li>Student strength by class</li><li>Fee collection patterns</li><li>Outstanding dues</li></ul>
                   <p><strong>Key Concept: Revenue Realization</strong><br/>Planned revenue is not equal to actual revenue.<br/>Actual revenue depends on effective collection.</p>
                   <p><strong>Revenue Gap Analysis:</strong> Compare Expected Revenue with Actual Collection.</p>
                   <p><strong>Purpose:</strong></p>
                   <ul><li>Identify collection inefficiencies</li><li>Detect weak follow-up systems</li><li>Highlight cash flow pressure points</li></ul>

                   <h4>💸 Pillar 3: Expense Structure</h4>
                   <p><strong>Definition:</strong> Categorization and analysis of all institutional expenses.</p>
                   <p><strong>Expense Categories:</strong></p>
                   <ul><li>Salaries (Teaching & Non-teaching)</li><li>Operational Expenses (utilities, maintenance, admin)</li><li>Vendor Payments</li></ul>
                   <p><strong>Key Financial Metric:</strong> Salary Cost typically accounts for 60–70% of total expenses in educational institutions.</p>
                   <p><strong>Importance/Purpose:</strong></p>
                   <ul><li>Identifies major cost drivers</li><li>Helps in cost control and optimization</li><li>Supports budgeting decisions</li></ul>

                   <h4>💳 Pillar 4: Cash Flow & Banking Data</h4>
                   <p><strong>Definition:</strong> Tracking actual movement of cash and bank balances.</p>
                   <p><strong>Data to be Collected:</strong></p>
                   <ul><li>Bank statements (last 6–12 months)</li><li>Current cash reserves</li><li>Loan and liability details</li></ul>
                   <p><strong>Critical Financial Insight:</strong> Profitability does not guarantee liquidity.</p>
                   <p><strong>Explanation/Challenges:</strong> An institution may be profitable but still face cash shortages due to delayed fee collections, fixed operational expenses, or poor cash flow management.</p>
                   <p><strong>Importance/Purpose:</strong></p>
                   <ul><li>Ensures operational stability</li><li>Helps manage payment cycles</li><li>Prevents financial stress</li></ul>

                   <h4>🏗️ Pillar 5: Infrastructure & CAPEX Planning</h4>
                   <p><strong>Definition:</strong> Planning and tracking of capital expenditures and infrastructure investments.</p>
                   <p><strong>Includes (Data to be Collected):</strong></p>
                   <ul><li>Infrastructure expansion</li><li>Building upgrades</li><li>Major equipment purchases</li><li>Ongoing development projects</li></ul>
                   <p><strong>Purpose:</strong></p>
                   <ul><li>Align financial capacity with growth plans</li><li>Avoid over-expansion</li><li>Ensure sustainable development</li></ul>
                   <p><strong>Key Insight:</strong> Growth must be financially supported. Unplanned expansion creates financial pressure.</p>

                   <h4>📋 Pillar 6: Statutory & Compliance Financials</h4>
                   <p><strong>Definition:</strong> Financial data related to regulatory and legal compliance.</p>
                   <p><strong>Data to be Maintained/Collected:</strong></p>
                   <ul><li>GST records (if applicable)</li><li>PF / ESIC records</li><li>Audit reports</li></ul>
                   <p><strong>Importance/Purpose:</strong></p>
                   <ul><li>Ensures legal compliance</li><li>Reduces risk of penalties</li><li>Maintains operational continuity</li></ul>
                   <p><strong>Key Insight:</strong> Compliance is a critical component of financial discipline and risk management.</p>

                   <h3>🧠 3. Strategic Inputs for Financial Planning</h3>
                   <p>In addition to financial data, institutions must define:</p>
                   <ul><li>Growth targets (enrollment, expansion)</li><li>New programs or initiatives</li><li>Key financial concerns and priorities</li></ul>
                   <p><strong>Purpose:</strong> To ensure that financial systems are aligned with institutional vision and long-term strategy.</p>

                   <h3>📊 4. Learning Outcome</h3>
                   <p>By the end of this chapter, you will:</p>
                   <ul><li>Understand the structure of financial data</li><li>Identify key financial data sources</li><li>Organize data into a structured framework</li><li>Build the foundation for financial planning and control</li></ul>

                   <h3>📦 5. Implementation Support</h3>
                   <p>To assist in execution, the following resources are provided:</p>
                   <ul>
                     <li>Financial Data Collection Template</li>
                     <li>Revenue & Expense Mapping Sheets</li>
                     <li>Coordination Guidelines with Accountant / CA</li>
                   </ul>
                   <p><strong>Instruction:</strong> Begin collecting and organizing your institution’s financial data using these tools.</p>

                   <h3>🚀 6. Next Step</h3>
                   <p>Once your financial data is structured, the next step is to analyze and interpret this data effectively.<br/>
                   <strong>Upcoming Chapter:</strong> Historical Financial Analysis (Understanding trends, patterns, and financial insights)</p>

                   <h3>🔑 Final Note</h3>
                   <p>The strength of your financial system depends on the quality of your data foundation.</p>
                 </article>
                 
                 <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center">
                   <Button onClick={() => setReadingMaterial(null)} className="h-14 px-10 rounded-full font-black text-lg shadow-xl">
                     Mark as Read & Continue
                   </Button>
                 </div>
               </div>
             )}

             {/* CONTENT: XLSX Download Template (ID: 103) */}
             {readingMaterial === '103' && (
               <div className="flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95">
                 <div className="h-32 w-32 rounded-[2rem] bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20 border-4 border-white">
                   <Download className="h-16 w-16" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">Financial Data Collection Template</h2>
                 <p className="text-slate-500 font-medium max-w-lg mx-auto mb-10 text-lg">
                   Ready-to-use Excel format to help you structure your historical records, fee data, and expense tracking.
                 </p>
                 <Button onClick={() => alert("Downloading XLSX File...")} className="h-16 px-12 rounded-full font-black text-xl bg-emerald-600 hover:bg-emerald-700 shadow-2xl shadow-emerald-500/30">
                   Download .XLSX File
                 </Button>
                 <Button variant="ghost" onClick={() => setReadingMaterial(null)} className="mt-6 font-bold text-slate-400 hover:text-slate-900">
                   Go Back
                 </Button>
               </div>
             )}

             {/* Fallback for any other reading materials not explicitly defined above */}
             {!['003','102','103'].includes(readingMaterial) && (
               <div className="text-center py-20 animate-in fade-in">
                 <h2 className="text-2xl font-bold text-slate-400">Content loading...</h2>
                 <Button onClick={() => setReadingMaterial(null)} className="mt-6">Close</Button>
               </div>
             )}

          </div>
        </div>
      )}

    </div>
  );
}