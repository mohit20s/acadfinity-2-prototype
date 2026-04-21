"use client";

import { useState } from "react";
import { 
  FileText, CheckCircle2, Clock, AlertCircle, 
  Upload, MessageSquare, Star, ArrowLeft, ChevronRight, FileUp, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Mock Data
const allAssignments = [
  { id: 'a1', title: "Algebra Worksheet #4", course: "Mathematics", due: "Tomorrow", status: "pending", priority: "high" },
  { id: 'a2', title: "Physics Lab Report", course: "Physics", due: "Oct 24", status: "submitted", priority: "medium" },
  { id: 'a3', title: "Python Final Project", course: "AI Basics", due: "Oct 30", status: "pending", priority: "high" },
];

const teacherQueue = [
  { id: 's1', student: "Aarav Sharma", assignment: "Algebra Worksheet #4", time: "2h ago", status: "ungraded" },
  { id: 's2', student: "Priya Patel", assignment: "Algebra Worksheet #4", time: "5h ago", status: "ungraded" },
];

export default function GlobalAssignmentsPage() {
  const { currentRole } = usePrototypeStore();
  const [view, setView] = useState<'list' | 'detail'>('list');
  
  const isTeacher = currentRole === 'Teacher' || currentRole === 'Principal' || currentRole === 'Educational Institute Admin';

 // --- VIEW: DETAILED ASSIGNMENT SUBMISSION PAGE ---
  if (view === 'detail') {
    const [isSubmitted, setIsSubmitted] = useState(false); // Local state to simulate submission

    return (
      <div className="animate-in fade-in duration-300">
        
        {/* Back Button */}
        <Button variant="ghost" onClick={() => setView('list')} className="mb-6 font-bold text-slate-500 hover:text-slate-900 -ml-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Assignments
        </Button>

        {/* Main Assignment Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black mb-3 uppercase tracking-widest">
                  <Clock className="h-3 w-3" /> Due Tomorrow
                </div>
                <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">Python Final Project: AI Chatbot</h1>
              </div>
              
              {/* Submission Status Badge */}
              <div className={cn("px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 w-full md:w-auto text-center",
                isSubmitted ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-slate-100 text-slate-500 border-slate-200"
              )}>
                {isSubmitted ? "Graded: A+" : "Not Submitted"}
              </div>
            </div>
          </div>
          
          {/* Content Body */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT: Instructions & Resources */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Instructions</h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  Create a simple Python-based chatbot that can answer 5 specific questions about school timings, holidays, and events. 
                  Your code should be well-commented. Please submit your `.py` file and a short documentation explaining your logic in a separate text file.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Attached Resources</h3>
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                   <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform"><Download className="h-4 w-4" /></div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">Project_Requirements.pdf</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">PDF • 128 KB</p>
                   </div>
                </div>
              </div>

              {/* GRADING & FEEDBACK (Shows after submission) */}
              {isSubmitted && (
                <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 animate-in fade-in duration-500">
                  <h3 className="text-sm font-black text-emerald-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Graded by Instructor
                  </h3>
                  <div className="bg-white rounded-2xl p-5 border border-emerald-200">
                     <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">AK</div>
                       <div>
                         <p className="font-bold text-slate-900">Arun Kumar</p>
                         <div className="flex items-center gap-1">
                           <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                           <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                           <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                           <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                           <Star className="h-3.5 w-3.5 text-amber-400/30 fill-amber-400/20" />
                         </div>
                       </div>
                       <span className="ml-auto text-2xl font-black text-emerald-600">A+</span>
                     </div>
                     <p className="text-sm text-slate-600 mt-4 italic">"Excellent work! Your use of functions to handle the responses was very clean and efficient. Keep it up."</p>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT: Submission Area */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary transition-colors h-48">
                 <div className="h-14 w-14 rounded-full bg-slate-200 group-hover:bg-primary/10 transition-colors flex items-center justify-center mb-3">
                   <FileUp className="h-6 w-6 text-slate-400 group-hover:text-primary" />
                 </div>
                 <p className="font-bold text-slate-900 text-sm">Drag & Drop Files</p>
                 <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">or click to browse</p>
              </div>
              <Button onClick={() => setIsSubmitted(true)} className="w-full h-12 rounded-xl font-black shadow-lg shadow-primary/20">
                {isSubmitted ? "Resubmit" : "Submit Assignment"}
              </Button>
            </div>

          </div>
        </div>
      </div>
    );
  }};