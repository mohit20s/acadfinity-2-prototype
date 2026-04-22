"use client";

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ClipboardCheck, BarChart, Lightbulb, Users, GraduationCap, Building, Lock, PlayCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Diagnostic Plans
const diagnosticPlans = [
  { id: 'school', title: "Institute Health Check", target: "For Directors & Principals", price: "₹4,999", desc: "A complete AI audit of school operations, academics, and finances.", icon: Building, color: "blue" },
  { id: 'teacher', title: "Educator Effectiveness", target: "For Teachers", price: "₹999", desc: "Analyze teaching methodologies and get personalized upskilling paths.", icon: Users, color: "emerald" },
  { id: 'student', title: "Student Learning Gap", target: "For Students & Parents", price: "₹499", desc: "Identify academic weak points and get curated course recommendations.", icon: GraduationCap, color: "amber" },
];

export default function DiagnosticToolPage() {
  const [step, setStep] = useState(0); // 0: Select Plan, 1: Pay/Start, 2-4: Questions, 5: Results
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const totalSteps = 3;
  const progress = step > 1 ? ((step - 1) / totalSteps) * 100 : 0;

  if (step === 0) {
    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-24">
        
        <section className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 w-full text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">AI-Powered<br/>Diagnostics Hub</h1>
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center md:text-left">
             <h2 className="text-2xl font-black tracking-tight text-slate-900">Select Your Assessment</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diagnosticPlans.map((plan) => (
               <div key={plan.id} className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-6 flex flex-col hover:border-primary/30 hover:shadow-xl transition-all group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", plan.color === 'blue' ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600")}>
                      <plan.icon className="h-8 w-8" />
                    </div>
                    <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-lg font-black shadow-md">{plan.price}</span>
                  </div>
                  <h3 className="font-black text-slate-900 text-xl leading-tight mb-3">{plan.title}</h3>
                  <div className="mt-auto">
                    <Button onClick={() => { setSelectedPlan(plan.id); setStep(1); }} className="w-full h-12 rounded-xl font-black shadow-md text-sm">
                      Purchase & Start <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return <div>Diagnostic Steps...</div>; // Simplified for brevity
}