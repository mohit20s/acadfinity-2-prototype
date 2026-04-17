"use client";

import { useState } from 'react';
import { 
  ArrowLeft, BookOpen, Clock, FileText, CheckCircle2, 
  Video, HelpCircle, FileUp, ChevronRight, MessageSquare 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePrototypeStore } from '@/store/use-prototype-store';
import { cn } from '@/lib/utils';

// Mock Data for Assignments within this specific course
const courseAssignments = [
  { id: 'a1', title: "Mid-Term Algebra Worksheet", due: "Oct 25", status: "pending", type: "Homework" },
  { id: 'a2', title: "Linear Equations Lab", due: "Oct 20", status: "submitted", type: "Practical" },
];

const teacherSubmissions = [
  { id: 's1', student: "Aarav Sharma", time: "2h ago", status: "ungraded" },
  { id: 's2', student: "Priya Patel", time: "5h ago", status: "ungraded" },
];

export default function CourseDetailsPage({ params }: { params: { courseId: string } }) {
  const [activeTab, setActiveTab] = useState('syllabus');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const { currentRole } = usePrototypeStore();

  const isTeacher = currentRole === 'Teacher' || currentRole === 'Principal' || currentRole === 'Director';

  // --- SUB-VIEW: ASSIGNMENT DETAIL (Inside the Course) ---
  if (selectedAssignmentId) {
    const assignment = courseAssignments.find(a => a.id === selectedAssignmentId);
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
        <button onClick={() => setSelectedAssignmentId(null)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Course Hub
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b bg-slate-50/50">
            <h2 className="text-2xl font-black text-slate-900">{assignment?.title}</h2>
            <p className="text-sm text-slate-500 mt-1 uppercase font-bold tracking-tighter">Due Date: {assignment?.due}, 2024</p>
          </div>

          <div className="p-6 md:p-8">
            {isTeacher ? (
              /* Teacher View: Grading List for this assignment */
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Student Submissions</h3>
                {teacherSubmissions.map(sub => (
                  <div key={sub.id} className="flex items-center justify-between p-4 border rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{sub.student.charAt(0)}</div>
                      <div><p className="font-bold text-slate-900 text-sm">{sub.student}</p><p className="text-[10px] text-slate-500 uppercase font-bold">Uploaded {sub.time}</p></div>
                    </div>
                    <Button size="sm" className="h-8 rounded-lg text-xs font-black">Grade Now</Button>
                  </div>
                ))}
              </div>
            ) : (
              /* Student View: Submission Upload */
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-sm text-blue-800 font-medium">
                  Please upload your solved worksheet in PDF or JPG format. Ensure all steps of the equations are visible.
                </div>
                <div className="aspect-video md:aspect-auto md:h-48 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 group cursor-pointer hover:border-primary transition-colors">
                   <FileUp className="h-10 w-10 text-slate-300 group-hover:text-primary mb-2" />
                   <p className="font-bold text-slate-900">Drag and drop your file</p>
                   <p className="text-xs text-slate-400 mt-1">PDF, PNG or JPG (Max 10MB)</p>
                </div>
                <Button className="w-full h-12 rounded-xl font-black shadow-lg shadow-primary/20">Submit My Work</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN VIEW: COURSE TABS ---
  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-24">
      <Link href="/lms" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> Back to Catalog
      </Link>

      <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row justify-between items-start gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">Academic Course</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">Mathematics: Grade 8</h1>
          <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
            <span>By Anjali Sharma</span>
            <span>•</span>
            <span>32 Learners</span>
          </div>
        </div>
        <Button className="relative z-10 rounded-full font-black px-8 h-12 shadow-xl shadow-primary/20">Continue Learning</Button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-slate-200 px-2 scrollbar-hide overflow-x-auto">
        {['syllabus', 'assignments', 'resources'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} 
            className={cn("px-6 py-4 text-xs font-black uppercase tracking-widest border-b-4 transition-all", 
            activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-400")}>
            {tab}
          </button>
        ))}
      </div>

      {/* Syllabus Content */}
      {activeTab === 'syllabus' && (
        <div className="space-y-4 animate-in fade-in duration-300">
           <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
             <h3 className="font-black text-slate-900 text-lg">Module 1: Algebra Basics</h3>
             <Link href="/lms/lessons/123" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/40 transition-all group">
               <div className="flex items-center gap-4">
                 <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary group-hover:scale-110 transition-transform"><Video className="h-5 w-5" /></div>
                 <div><p className="text-sm font-bold text-slate-900">1.1 - Introduction to Variables</p><p className="text-[10px] text-slate-400 font-bold uppercase">Video Lesson • 12 Mins</p></div>
               </div>
               <CheckCircle2 className="h-5 w-5 text-emerald-500" />
             </Link>
           </div>
        </div>
      )}

      {/* Assignments Content (NOW CONTEXTUAL) */}
      {activeTab === 'assignments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
           {courseAssignments.map(assignment => (
             <div key={assignment.id} onClick={() => setSelectedAssignmentId(assignment.id)} className="bg-white p-5 rounded-2xl border-2 border-slate-100 hover:border-primary/30 transition-all cursor-pointer group shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-primary transition-colors"><FileText className="h-6 w-6" /></div>
                   <span className={cn("text-[9px] font-black uppercase px-2 py-1 rounded-md border", 
                     assignment.status === 'submitted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                   )}>{assignment.status}</span>
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

      {/* Resources Content */}
      {activeTab === 'resources' && (
        <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-slate-100 text-center text-slate-400 font-bold uppercase text-xs tracking-widest animate-in fade-in">
          No downloadable resources for this course yet.
        </div>
      )}

    </div>
  );
}