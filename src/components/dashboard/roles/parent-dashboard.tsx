import { User, Calendar, BookOpen, Clock, AlertCircle } from "lucide-react";

export function ParentDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Student Profile Overview */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl border border-primary/20 flex flex-col md:flex-row items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center text-primary border-4 border-white shadow-sm">
          <User className="h-10 w-10" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold text-slate-900">Aarav Sharma</h2>
          <p className="text-slate-600">Grade 8 - Section B • Roll No: 42</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Attendance</p>
            <p className="text-lg font-bold text-emerald-600">96%</p>
          </div>
          <div className="text-center bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
            <p className="text-xs text-slate-500 font-medium">Fee Due</p>
            <p className="text-lg font-bold text-rose-600">₹0</p>
          </div>
        </div>
      </div>

      {/* Parent Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* LMS / Homework */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-slate-900">Pending Homework</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex justify-between items-start text-sm">
              <div>
                <p className="font-medium text-slate-900">Mathematics</p>
                <p className="text-xs text-slate-500">Algebra Worksheet #4</p>
              </div>
              <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded">Due Tomm</span>
            </li>
            <li className="flex justify-between items-start text-sm">
              <div>
                <p className="font-medium text-slate-900">Science</p>
                <p className="text-xs text-slate-500">Read Chapter 5</p>
              </div>
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">Due Fri</span>
            </li>
          </ul>
        </div>

        {/* Books & Toys Library Tracking */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">Library Activity</h3>
            </div>
            <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Subscription Active</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
              <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Currently Borrowed
              </p>
              <p className="font-medium text-slate-900 text-sm">Harry Potter & The Sorcerer's Stone</p>
              <p className="text-xs text-slate-500 mt-1">Return by: 24th Oct</p>
            </div>
            <div className="border border-slate-100 rounded-lg p-4 bg-slate-50">
              <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" /> Digital Resources
              </p>
              <p className="font-medium text-slate-900 text-sm">Interactive Science Quiz App</p>
              <p className="text-xs text-primary font-medium mt-1 cursor-pointer hover:underline">Launch App →</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}