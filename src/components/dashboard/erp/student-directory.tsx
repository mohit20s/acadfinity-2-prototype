"use client";

import React, { useState } from 'react';
import { 
  MoreHorizontal, Search, Filter, Plus, FileDown, ArrowLeft, 
  User, Mail, Phone, MapPin, GraduationCap, Calendar, Activity, CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { usePrototypeStore } from '@/store/use-prototype-store';

// Mock Data
const students = [
  { id: 'S001', name: 'Aarav Sharma', grade: '8 - B', parent: 'Rakesh Sharma', phone: '+91 98765 43210', email: 'rakesh.s@example.com', status: 'Active', attendance: '96%', avgGrade: 'A-' },
  { id: 'S002', name: 'Priya Patel', grade: '8 - A', parent: 'Mina Patel', phone: '+91 98765 43211', email: 'mina.p@example.com', status: 'Active', attendance: '92%', avgGrade: 'B+' },
  { id: 'S003', name: 'Rohan Mehta', grade: '7 - C', parent: 'Anjali Mehta', phone: '+91 98765 43212', email: 'anjali.m@example.com', status: 'Active', attendance: '88%', avgGrade: 'B' },
  { id: 'S004', name: 'Sneha Gupta', grade: '9 - A', parent: 'Sanjay Gupta', phone: '+91 98765 43213', email: 'sanjay.g@example.com', status: 'Active', attendance: '99%', avgGrade: 'A+' },
];

export function StudentDirectory() {
  const { currentRole } = usePrototypeStore();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filteredStudents = currentRole === 'Teacher' ? students.filter(s => s.grade.startsWith('8')) : students;

  // --- VIEW: DETAILED PROFILE OVERVIEW ---
  if (selectedStudentId) {
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return null;

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-right-4 duration-300 overflow-hidden">
        
        {/* Profile Header */}
        <div className="bg-slate-900 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 relative">
          <Button variant="ghost" size="icon" onClick={() => setSelectedStudentId(null)} className="absolute top-4 left-4 text-white hover:bg-white/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-black shadow-xl border-4 border-slate-800 mt-6 md:mt-0">
            {student.name.charAt(0)}
          </div>
          
          <div className="flex-1 text-white">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-black tracking-tight">{student.name}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-white uppercase tracking-widest">{student.status}</span>
            </div>
            <p className="text-slate-400 font-medium">Student ID: {student.id} • Grade: {student.grade}</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button className="w-full md:w-auto bg-white text-slate-900 hover:bg-slate-200 font-bold">Message Parent</Button>
          </div>
        </div>

        {/* Profile Content Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-slate-50/50">
          
          {/* Left Column: Quick Info */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Contact & Guardian</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3"><User className="h-4 w-4 text-slate-400" /><div className="flex-1"><p className="text-[10px] text-slate-400 font-bold uppercase">Primary Guardian</p><p className="text-sm font-semibold text-slate-900">{student.parent}</p></div></div>
                <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-slate-400" /><div className="flex-1"><p className="text-[10px] text-slate-400 font-bold uppercase">Phone</p><p className="text-sm font-semibold text-slate-900">{student.phone}</p></div></div>
                <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-slate-400" /><div className="flex-1"><p className="text-[10px] text-slate-400 font-bold uppercase">Email</p><p className="text-sm font-semibold text-slate-900 truncate">{student.email}</p></div></div>
                <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-slate-400" /><div className="flex-1"><p className="text-[10px] text-slate-400 font-bold uppercase">Address</p><p className="text-sm font-semibold text-slate-900 line-clamp-1">Sector 62, Noida, UP</p></div></div>
              </div>
            </div>
            
            {(currentRole === 'Director' || currentRole === 'Principal' || currentRole === 'Educational Institute Admin') && (
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-amber-400">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Financial Status</h3>
                <div className="flex items-center gap-3 mb-2"><CreditCard className="h-5 w-5 text-amber-500" /><p className="text-lg font-black text-slate-900">₹45,000 <span className="text-xs text-slate-500 font-medium">Due</span></p></div>
                <p className="text-xs text-slate-500">Term 2 tuition fee is pending. Due in 5 days.</p>
                <Button variant="outline" size="sm" className="w-full mt-4 text-xs font-bold">Send Reminder</Button>
              </div>
            )}
          </div>

          {/* Right Column: Academic & LMS Data */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Attendance</p><p className="text-2xl font-black text-emerald-600">{student.attendance}</p></div>
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Grade</p><p className="text-2xl font-black text-primary">{student.avgGrade}</p></div>
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Demerits</p><p className="text-2xl font-black text-slate-900">0</p></div>
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">LMS Points</p><p className="text-2xl font-black text-amber-500">1,240</p></div>
            </div>

            {/* LMS & Activity Sync */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity className="h-4 w-4" /> Recent LMS Activity</h3>
               <div className="space-y-4">
                  <div className="flex gap-4">
                     <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"><GraduationCap className="h-4 w-4" /></div>
                     <div><p className="text-sm font-bold text-slate-900">Completed: Python Basics Quiz</p><p className="text-xs text-slate-500">Scored 18/20 • 2 hours ago</p></div>
                  </div>
                  <div className="flex gap-4">
                     <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0"><Calendar className="h-4 w-4" /></div>
                     <div><p className="text-sm font-bold text-slate-900">Absent: Morning Assembly</p><p className="text-xs text-slate-500">Marked by Class Teacher • Yesterday</p></div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: THE DATA TABLE (DEFAULT) ---
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Directory</h2>
          <p className="text-sm text-slate-500">{currentRole === 'Teacher' ? 'Showing students in your assigned grades.' : 'Manage all student records across the institution.'}</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {(currentRole === 'Director' || currentRole === 'Principal' || currentRole === 'Educational Institute Admin') && (
            <Button className="w-full sm:w-auto font-bold"><Plus className="h-4 w-4 mr-2" /> New Admission</Button>
          )}
          <Button variant="outline" className="w-full sm:w-auto font-bold"><FileDown className="h-4 w-4 mr-2" /> Export</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search by name, ID, parent..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 text-sm outline-none focus:border-primary" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
          <select className="h-10 px-3 rounded-lg border border-slate-200 text-sm bg-white text-slate-700 outline-none"><option>Grade: All</option><option>Grade: 8</option></select>
          <select className="h-10 px-3 rounded-lg border border-slate-200 text-sm bg-white text-slate-700 outline-none"><option>Status: Active</option></select>
          <Button variant="ghost" className="hidden md:inline-flex text-slate-500"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
        </div>
      </div>
      
      <div className="border border-slate-200 rounded-xl overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              <TableHead className="w-[100px] font-black uppercase text-[10px] tracking-widest text-slate-500">ID</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-500">Student Name</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-500">Class</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-500">Parent</TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-500">Status</TableHead>
              <TableHead className="text-right font-black uppercase text-[10px] tracking-widest text-slate-500">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedStudentId(student.id)}>
                <TableCell className="font-semibold text-slate-500">{student.id}</TableCell>
                <TableCell className="font-bold text-slate-900">{student.name}</TableCell>
                <TableCell className="font-medium text-slate-600">{student.grade}</TableCell>
                <TableCell className="text-slate-500">{student.parent}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    {student.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="secondary" size="sm" className="text-xs font-bold" onClick={(e) => { e.stopPropagation(); setSelectedStudentId(student.id); }}>
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}