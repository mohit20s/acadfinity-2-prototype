"use client";

import { useState } from "react";
import { 
  Search, Book, PlayCircle, Smartphone, 
  Box, Calendar, Clock, AlertCircle, RefreshCcw, 
  MapPin, QrCode, CheckCircle2, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePrototypeStore } from "@/store/use-prototype-store";

// Mock Hybrid Catalog
const catalog = [
  { id: 1, title: "The Solar System Interactive", type: "Digital App", category: "Science", age: "8-12 yrs", status: "Instant Access", icon: Smartphone, color: "blue" },
  { id: 2, title: "Advanced Lego Robotics Kit #4", type: "Physical Toy", category: "STEM", age: "10-15 yrs", status: "Available at Hub", location: "Shelf A4", icon: Box, color: "amber" },
  { id: 3, title: "Harry Potter & The Sorcerer's Stone", type: "Physical Book", category: "Fiction", age: "9-14 yrs", status: "Waitlist (3)", location: "Shelf B2", icon: Book, color: "emerald" },
  { id: 4, title: "Phonics Mastery Vol 1", type: "Digital Book", category: "English", age: "4-7 yrs", status: "Instant Access", icon: PlayCircle, color: "indigo" },
  { id: 5, title: "Montessori Wooden Puzzle", type: "Physical Toy", category: "Logic", age: "3-5 yrs", status: "Available at Hub", location: "Shelf C1", icon: Box, color: "amber" },
  { id: 6, title: "History of India Audio Journey", type: "Digital Audio", category: "History", age: "12+ yrs", status: "Instant Access", icon: PlayCircle, color: "rose" },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('catalog');
  const { currentRole } = usePrototypeStore();

  const isAdmin = currentRole === 'Director' || currentRole === 'School Admin';

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    rose: "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24 md:pb-10">
      
      {/* 1. PREMIUM HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 w-full md:w-auto text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-black mb-4 uppercase tracking-widest">
            <Book className="h-4 w-4" /> Hybrid Access
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">The Ecosystem Library</h1>
          <p className="text-slate-400 max-w-lg text-sm md:text-base font-medium">
            Checkout physical books & educational toys from your campus hub, or access digital resources instantly from anywhere.
          </p>
        </div>
        
        {/* User Quota/Stats Widget */}
        <div className="relative z-10 w-full md:w-auto flex justify-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex items-center gap-6 shadow-2xl">
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Items Held</p>
              <p className="font-black text-3xl text-emerald-400">2<span className="text-sm text-slate-500">/4</span></p>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="text-center">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Due Soon</p>
              <p className="font-black text-3xl text-amber-400">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ADMIN ONLY: CHECKOUT DESK */}
      {isAdmin && (
        <div className="bg-white p-6 rounded-3xl border-2 border-primary/20 shadow-lg shadow-primary/5 flex flex-col md:flex-row items-center gap-6">
           <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
             <QrCode className="h-8 w-8" />
           </div>
           <div className="flex-1 text-center md:text-left">
             <h3 className="font-black text-slate-900 text-lg">Librarian Checkout Desk</h3>
             <p className="text-sm text-slate-500 font-medium">Scan a student's ID and a physical book/toy barcode to instantly log a checkout or return.</p>
           </div>
           <div className="flex w-full md:w-auto gap-3">
              <Button className="w-full md:w-auto h-12 rounded-xl font-black shadow-md"><RefreshCcw className="h-4 w-4 mr-2" /> Log Return</Button>
              <Button className="w-full md:w-auto h-12 rounded-xl font-black shadow-md"><Box className="h-4 w-4 mr-2" /> Issue Item</Button>
           </div>
        </div>
      )}

      {/* 3. INTERACTIVE WORKSPACE */}
      <div className="flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Tab Bar */}
        <div className="flex border-b border-slate-100 px-2 md:px-6 overflow-x-auto scrollbar-hide bg-slate-50/50">
          {[
            { id: 'catalog', name: 'Full Catalog', icon: Search },
            { id: 'shelf', name: 'My Shelf (Issued)', icon: Book },
            { id: 'history', name: 'Reading History', icon: Clock },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn("flex items-center gap-2 px-6 py-5 text-xs font-black uppercase tracking-widest transition-all border-b-4 whitespace-nowrap",
                activeTab === tab.id ? "border-primary text-primary bg-white" : "border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100/50")}>
              <tab.icon className="h-4 w-4" /> {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 bg-slate-50/30 min-h-[400px]">
          
          {/* CATALOG TAB */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Search & Filters */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input type="text" placeholder="Search for books, toys, or digital apps..." className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-slate-100 bg-white text-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm" />
                </div>
                <select className="h-14 px-6 rounded-2xl border-2 border-slate-100 bg-white text-sm font-black text-slate-600 outline-none shadow-sm cursor-pointer hover:border-slate-200">
                  <option>All Formats</option><option>Physical Only</option><option>Digital Only</option>
                </select>
                <select className="h-14 px-6 rounded-2xl border-2 border-slate-100 bg-white text-sm font-black text-slate-600 outline-none shadow-sm cursor-pointer hover:border-slate-200 hidden sm:block">
                  <option>All Ages</option><option>3-5 yrs</option><option>8-12 yrs</option>
                </select>
              </div>

              {/* Hybrid Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
                {catalog.map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-6 flex flex-col hover:border-primary/30 hover:shadow-lg transition-all group">
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center border-2 group-hover:scale-110 transition-transform shadow-sm", colorClasses[item.color as keyof typeof colorClasses])}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <span className={cn("text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest", 
                        item.status.includes('Instant') ? 'bg-indigo-100 text-indigo-700' : 
                        item.status.includes('Available') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      )}>
                        {item.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.category} • {item.age}</span>
                    </div>
                    <h3 className="font-black text-slate-900 text-lg leading-tight mb-2">{item.title}</h3>
                    
                    {/* Location Badge for Physical Items */}
                    {item.location && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 w-fit px-2 py-1 rounded-md mb-4 border border-amber-100">
                        <MapPin className="h-3.5 w-3.5" /> Pick up at: {item.location}
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <div className="mt-auto pt-6">
                      <Button className={cn("w-full h-12 rounded-xl font-black shadow-sm", 
                        item.status.includes('Waitlist') ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : ''
                      )}>
                        {item.status.includes('Instant') ? 'Launch Digital Resource' : 
                         item.status.includes('Waitlist') ? 'Join Waitlist' : 'Reserve for Pickup'}
                      </Button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MY SHELF TAB */}
          {activeTab === 'shelf' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* Item 1: Physical Book (Due Soon) */}
                 <div className="bg-white rounded-3xl border-2 border-rose-100 shadow-sm p-6 flex items-center gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-6 py-1 rounded-bl-xl shadow-sm">DUE IN 2 DAYS</div>
                    <div className="h-20 w-20 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border-2 border-amber-200 shrink-0">
                       <Book className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PHYSICAL BOOK</p>
                       <h3 className="font-black text-slate-900 text-lg leading-tight mb-2">The Solar System Guide</h3>
                       <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 w-fit px-2 py-1 rounded-md border border-rose-100">
                         <AlertCircle className="h-3 w-3" /> Return to Front Desk by Friday
                       </div>
                    </div>
                 </div>

                 {/* Item 2: Digital Toy (Active) */}
                 <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm p-6 flex items-center gap-6">
                    <div className="h-20 w-20 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border-2 border-indigo-200 shrink-0">
                       <Smartphone className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">DIGITAL APP ACCESS</p>
                       <h3 className="font-black text-slate-900 text-lg leading-tight mb-3">Interactive Phonics Master</h3>
                       <Button size="sm" className="rounded-full h-8 px-6 text-xs font-black shadow-md bg-indigo-600 hover:bg-indigo-700">Open App</Button>
                    </div>
                 </div>

              </div>
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="flex flex-col items-center justify-center text-center py-16 animate-in zoom-in-95 duration-300">
               <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center mb-6 shadow-inner border-4 border-white">
                 <CheckCircle2 className="h-12 w-12 text-slate-300" />
               </div>
               <h3 className="text-2xl font-black text-slate-900 mb-2">You're a great reader!</h3>
               <p className="text-slate-500 font-medium max-w-sm mb-6">You have successfully returned 14 physical items and completed 8 digital activities this year.</p>
               <Button variant="outline" className="rounded-full font-black border-2 border-slate-200 text-slate-600 h-12 px-8">Download Reading Log PDF</Button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}