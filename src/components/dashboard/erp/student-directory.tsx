"use client";

import React from 'react';
import { MoreHorizontal, Search, Filter, Plus, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePrototypeStore } from '@/store/use-prototype-store';

// Mock Data for the Student Directory
const students = [
  { id: 'S001', name: 'Aarav Sharma', grade: '8 - B', parent: 'Rakesh Sharma', status: 'Active' },
  { id: 'S002', name: 'Priya Patel', grade: '8 - A', parent: 'Mina Patel', status: 'Active' },
  { id: 'S003', name: 'Rohan Mehta', grade: '7 - C', parent: 'Anjali Mehta', status: 'Active' },
  { id: 'S004', name: 'Sneha Gupta', grade: '9 - A', parent: 'Sanjay Gupta', status: 'Active' },
  { id: 'S005', name: 'Vikram Singh', grade: '8 - B', parent: 'Sunita Singh', status: 'Inactive' },
  { id: 'S006', name: 'Isha Reddy', grade: '7 - A', parent: 'Kiran Reddy', status: 'Active' },
];

export function StudentDirectory() {
  const { currentRole } = usePrototypeStore();

  // A Teacher might only see students from their grade, while a Director sees all.
  const filteredStudents = currentRole === 'Teacher' 
    ? students.filter(s => s.grade.startsWith('8')) 
    : students;

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm animate-in fade-in">
      
      {/* Header with Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Directory</h2>
          <p className="text-sm text-slate-500">
            {currentRole === 'Teacher' ? 'Showing students in your assigned grades.' : 'Manage all student records across the institution.'}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {/* Only high-level roles can add new students */}
          {(currentRole === 'Director' || currentRole === 'Principal' || currentRole === 'School Admin') && (
            <Button className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" /> New Admission</Button>
          )}
          <Button variant="outline" className="w-full sm:w-auto"><FileDown className="h-4 w-4 mr-2" /> Export</Button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input type="text" placeholder="Search by name, ID, parent..." className="w-full h-10 pl-10 pr-4 rounded-md border text-sm" />
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 rounded-md border text-sm bg-white text-slate-700">
            <option>Grade: All</option>
            <option>Grade: 7</option>
            <option>Grade: 8</option>
            <option>Grade: 9</option>
          </select>
          <select className="h-10 px-3 rounded-md border text-sm bg-white text-slate-700">
            <option>Status: All</option>
            <option>Status: Active</option>
            <option>Status: Inactive</option>
          </select>
          <Button variant="ghost" className="hidden md:inline-flex"><Filter className="h-4 w-4 mr-2" /> More Filters</Button>
        </div>
      </div>
      
      {/* Data Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[100px]">Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Grade & Section</TableHead>
              <TableHead>Parent Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.parent}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {student.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-slate-500 mt-4 text-center">Showing {filteredStudents.length} of {students.length} total students.</p>
    </div>
  );
}