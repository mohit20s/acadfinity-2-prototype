"use client";

import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function LessonPlayerPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-300">
      
      {/* Left Column: Lesson Content */}
      <div className="flex-1 space-y-6">
        <Link href="/lms/courses/math-g8" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> Back to Course Syllabus
        </Link>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Module 1: Algebra Basics</p>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 mb-6">1.2 - Solving Linear Equations</h1>
          
          {/* Mock Video Player */}
          <div className="aspect-video bg-slate-900 rounded-xl mb-6"></div>
          
          {/* Mock Content */}
          <div className="prose prose-slate max-w-none">
            <h3 className="font-black">Key Concepts</h3>
            <p>A linear equation is an equation for a straight line. These are equations of the first order. They involve one or more variables. This lesson will walk you through the core principles of isolating variables and finding their value.</p>
            <ul>
              <li>Understanding Variables and Constants</li>
              <li>The Balancing Method</li>
              <li>Solving for 'x' in various scenarios</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="outline" className="font-bold"><ChevronLeft className="h-4 w-4 mr-2" /> Previous Lesson</Button>
          <Button className="font-bold bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"><CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Completed</Button>
        </div>
      </div>
      
      {/* Right Column: Course Playlist */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-2 lg:sticky lg:top-24">
           <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-100">
             <span className="text-xs font-bold text-emerald-700">1.1 - Intro (Completed)</span>
             <CheckCircle2 className="h-4 w-4 text-emerald-500" />
           </div>
           <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary/20 ring-2 ring-primary/20">
             <span className="text-xs font-bold text-primary">1.2 - Linear Equations (Current)</span>
           </div>
           <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
             <span className="text-xs font-bold text-slate-500">1.3 - Chapter 1 Quiz (Locked)</span>
           </div>
        </div>
      </div>
    </div>
  );
}