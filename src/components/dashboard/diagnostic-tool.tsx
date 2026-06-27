"use client";

import { Activity, ArrowRight, ClipboardCheck, ArrowLeft, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Exact data matching your screenshot
const templates = [
  { id: 1, type: "SCHOOL", title: "School Health & Readiness Check", desc: "A complete 360-degree diagnostic for school operations, HR, Finance, and Governance.", highlight: false , url: "http://diagnostic.acadfinity.com/"  },
   { id: 2, type: "PARENT", title: "Parent-School Harmony & Home Environment", desc: "Understand home study environments, screen time habits, and parental support structures.", highlight: true }, // Highlighted orange card
  { id: 3, type: "INSTITUTE", title: "Executive Leadership Index", desc: "Evaluate strategic vision, compliance, and team trust for institutional leaders.", highlight: false },
  { id: 4, type: "TEACHER", title: "Teacher Pedagogical Evaluation", desc: "Assess classroom management, tech integration, and remedial intervention capabilities.", highlight: false },
  { id: 5, type: "STUDENT", title: "Student Academic & Wellbeing Profiler", desc: "Identify study habits, conceptual gaps, and mental wellbeing for personalized counseling.", highlight: false },
  { id: 6, type: "INSTITUTE", title: "Coaching Institute Optimizer", desc: "Analyze batch management, test prep efficiency, and student retention for coaching centers.", highlight: false },
   
];
const REAL_DASHBOARD_URL = "https://diagnostic.acadfinity.com/login"; 
export default function DiagnosticToolPage() {
  const [step, setStep] = useState(0); 

  // --- VIEW 1: THE HUB (Matches your screenshot exactly) ---
  if (step === 0) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10 pb-20 px-1">
        <header>
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-orange-500 mb-3">Assessments</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
            Platform <span className="italic">Diagnostics</span>
          </h1>
              <a href={REAL_DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="block w-full md:w-auto">
          <Button className="w-full md:w-auto h-12 px-6 rounded-full font-black bg-slate-900 text-white shadow-lg hover:scale-105 transition-transform">
            <BarChart3 className="h-4 w-4 mr-2" /> View Results Dashboard
          </Button>
        </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div 
              key={template.id} 
              className={cn(
                "p-8 rounded-[2rem] flex flex-col justify-between min-h-[320px] bg-white transition-all duration-300", 
                template.highlight ? "border-2 border-orange-500 shadow-xl shadow-orange-500/10 scale-[1.02]" : "border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1"
              )}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{template.type}</span>
                  <Activity className="h-5 w-5 text-orange-500" strokeWidth={2.5} />
                </div>
                <h3 className="font-black text-xl text-slate-900 leading-tight mb-4">{template.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{template.desc}</p>
              </div>
               <a href={template.url} target="_blank" rel="noopener noreferrer" className="mt-8 block">
              <Button 
               
                className={cn(
                  "w-full h-12 rounded-full font-black text-sm mt-8 transition-colors", 
                  template.highlight ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30" : "bg-slate-900 hover:bg-slate-800 text-white"
                )}
              >
                Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
                </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- VIEW 2: SIMULATED ASSESSMENT PLAYER ---
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-[3rem] border border-slate-100 shadow-2xl animate-in zoom-in-95 max-w-2xl mx-auto mt-10">
       <div className="h-24 w-24 rounded-full bg-slate-900 text-orange-500 flex items-center justify-center mb-8 border-4 border-white shadow-xl">
         <ClipboardCheck className="h-10 w-10" />
       </div>
       <h2 className="text-3xl font-black mb-4 text-slate-900 tracking-tight">Assessment Engine Loaded</h2>
       <p className="text-slate-500 mb-10 font-medium text-lg">
         The dynamic questionnaire for this specific stakeholder would begin here.
       </p>
       <Button onClick={() => setStep(0)} variant="outline" className="font-black h-14 px-10 rounded-full border-2 text-slate-600 hover:bg-slate-50">
         <ArrowLeft className="h-4 w-4 mr-2" /> Back to Hub
       </Button>
    </div>
  );
}