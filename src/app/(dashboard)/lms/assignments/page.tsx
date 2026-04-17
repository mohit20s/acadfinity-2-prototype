"use client";

import { useState } from "react";
import { 
  FileText, CheckCircle2, Clock, AlertCircle, 
  Upload, MessageSquare, Star, ArrowLeft, ChevronRight, FileUp, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock Data
const studentAssignments = [
  { id: 'a1', title: "Algebra Worksheet #4", course: "Mathematics", due: "Tomorrow", status: "pending", priority: "high" },
  { id: 'a2', title: "Physics Lab Report", course: "Physics", due: "Oct 24", status: "submitted", priority: "medium" },
  { id: 'a3', title: "Python Final Project", course: "AI Basics", due: "Oct 30", status: "pending", priority: "high" },
];

const teacherQueue = [
  { id: 's1', student: "Aarav Sharma", assignment: "Algebra Worksheet #4", time: "2h ago", status: "ungraded" },
  { id: 's2', student: "Priya Patel", assignment: "Algebra Worksheet #4", time: "5h ago", status: "ungraded" },
  { id: 's3', student: "Rohan Mehta", assignment: "Physics Lab Report", time: "1d ago", status: "graded", score: "18/20" },
];

export default function AssignmentsPage() {
  const { currentRole } = usePrototypeStore();
  const [view, setView] = useState<'list' | 'detail'>('list');
  
  const isTeacher = currentRole === 'Teacher' || currentRole === 'Principal' || currentRole === 'Educational Institute Admin';

  // --- VIEW: ASSIGNMENT DETAIL / SUBMISSION ---
  if (view === 'detail') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-300">
        <Button variant="ghost" onClick={() => setView('list')} className="font-bold text-slate-500">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Hub
        </Button>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b bg-slate-50/50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">Project Task</span>
                <h1 className="text-3xl font-black text-slate-900 mt-2">Python Final Project: AI Chatbot</h1>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Due Date</p>
                <p className="text-sm font-black text-rose-600">Oct 30, 2024</p>
              </div>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">
              Create a simple Python-based chatbot that can answer 5 specific questions about school timings and holidays. 
              Submit your `.py` file and a short documentation.
            </p>
          </div>

          <div className="p-8 space-y-8">
            {/* Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl border bg-slate-50">
                <h3 className="font-bold text-sm mb-3">Submission Guidelines</h3>
                <ul className="text-xs text-slate-500 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Must use Python 3.x</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Comment your code heavily</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Upload as .ZIP if multiple files</li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/50 transition-colors">
                <FileUp className="h-8 w-8 text-slate-300 group-hover:text-primary mb-2" />
                <p className="text-sm font-bold text-slate-900">Click to upload files</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Max size: 20MB</p>
              </div>
            </div>
            
            <Button className="w-full h-12 rounded-xl font-black shadow-lg shadow-primary/20">Submit Assignment</Button>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: ASSIGNMENT LIST ---
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Assignments & Projects</h1>
        <p className="text-sm font-medium text-slate-500">
          {isTeacher ? "Review and grade student submissions." : "Manage your upcoming tasks and view teacher feedback."}
        </p>
      </div>

      {isTeacher ? (
        /* TEACHER DASHBOARD */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-slate-50/50 flex justify-between items-center">
            <h3 className="font-black text-slate-900">Grading Queue</h3>
            <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-1 rounded-full">2 UNGRADED</span>
          </div>
          <div className="divide-y">
            {teacherQueue.map((item) => (
              <div key={item.id} className="p-4 md:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                    {item.student.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.student}</p>
                    <p className="text-xs text-slate-500">{item.assignment} • {item.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.status === 'graded' ? (
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{item.score}</span>
                  ) : (
                    <Button size="sm" className="h-8 text-xs font-black rounded-lg">Grade Now</Button>
                  )}
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* STUDENT DASHBOARD */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studentAssignments.map((item) => (
            <div key={item.id} onClick={() => setView('detail')} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-primary/50 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "p-2 rounded-xl",
                  item.status === 'submitted' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                )}>
                  <FileText className="h-6 w-6" />
                </div>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border",
                  item.status === 'submitted' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                )}>
                  {item.status}
                </span>
              </div>
              <h3 className="font-black text-slate-900 text-lg leading-tight mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 font-bold mb-4 uppercase tracking-tighter">{item.course}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Due {item.due}</span>
                </div>
                <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black uppercase">Open</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}