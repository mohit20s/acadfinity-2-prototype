"use client";

import { useState } from 'react';
import { Users, IndianRupee, UserSquare, Bus, Megaphone, ArrowRight, FileDown, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeeStatusChart } from "@/components/dashboard/erp/fee-status-chart";
import { StudentDirectory } from "@/components/dashboard/erp/student-directory";
import Link from "next/link"; 

const erpModules = [
  { id: 'students', title: "Student Management", desc: "Admissions, records, promotions.", icon: Users, color: "blue" },
  { id: 'finance', title: "Finance & Fees", desc: "Fee collection, expenses, payroll.", icon: IndianRupee, color: "emerald" },
  { id: 'staff', title: "Staff Management", desc: "Teacher profiles, attendance, leave.", icon: UserSquare, color: "teal" },
  { id: 'transport', title: "Transport", desc: "Bus routes, vehicle tracking, alerts.", icon: Bus, color: "amber" },
  { id: 'comms', title: "Announcements", desc: "Notices, circulars, events.", icon: Megaphone, color: "rose" },
];

export default function ERPPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    teal: "bg-teal-50 text-teal-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  // If a module is selected, we only show that module.
  if (activeModule === 'students') {
    return (
      <div className="animate-in fade-in duration-300">
        <Button variant="outline" onClick={() => setActiveModule(null)} className="mb-4">
          <X className="h-4 w-4 mr-2" /> Back to ERP Hub
        </Button>
        <StudentDirectory />
      </div>
    );
  }

  // This is the main ERP Hub view
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">ERP - Educational Institute Operations</h1>
          <p className="text-sm text-slate-500">Your central hub for managing all administrative tasks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {erpModules.map((module) => (
            <button key={module.id} onClick={() => setActiveModule(module.id)}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-primary/50 transition-colors text-left flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClasses[module.color as keyof typeof colorClasses]}`}>
                  <module.icon className="h-6 w-6" />
                </div>
                <div className="h-8 w-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">{module.title}</h3>
              <p className="text-sm text-slate-500 flex-1">{module.desc}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-1">Fee Collection Status</h3>
            <p className="text-sm text-slate-500 mb-4">For Academic Year 2024-25</p>
            <FeeStatusChart />
          </div>
        </div>

      </div>
    </div>
  );
}