"use client";

import { X, Bell, BookOpen, CreditCard, FileText, ShoppingBag, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";

const mockNotifications = [
  { id: 1, title: "New Assignment Graded", desc: "Arun Kumar graded your Python Project.", time: "10m ago", icon: FileText, color: "text-blue-500 bg-blue-50 border-blue-100", unread: true },
  { id: 2, title: "Fee Reminder", desc: "Term 2 tuition fee is due in 5 days.", time: "2h ago", icon: CreditCard, color: "text-amber-500 bg-amber-50 border-amber-100", unread: true },
  { id: 3, title: "Order Shipped", desc: "Your Marketplace order #4829 is on the way.", time: "1d ago", icon: ShoppingBag, color: "text-emerald-500 bg-emerald-50 border-emerald-100", unread: false },
  { id: 4, title: "New Course Available", desc: "Advanced AI Basics is now in the LMS.", time: "2d ago", icon: BookOpen, color: "text-primary bg-primary/10 border-primary/20", unread: false },
];

export function NotificationsDrawer() {
  const { isNotificationsOpen, setNotificationsOpen } = usePrototypeStore();

  if (!isNotificationsOpen) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setNotificationsOpen(false)}
      />

      {/* Sliding Drawer */}
      <div className="fixed top-0 right-0 z-[110] h-full w-[90%] max-w-sm bg-white shadow-2xl border-l border-slate-100 animate-in slide-in-from-right duration-300 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Bell className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Notifications</h2>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-200" onClick={() => setNotificationsOpen(false)}>
            <X className="h-5 w-5 text-slate-500" />
          </Button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-white">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2 Unread</span>
           <button className="text-[10px] font-black text-primary hover:underline flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Mark all read</button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
          {mockNotifications.map((notif) => (
            <div key={notif.id} className={cn("p-4 rounded-2xl border transition-colors cursor-pointer group", notif.unread ? "bg-white border-slate-200 shadow-sm" : "bg-transparent border-transparent hover:bg-slate-50")}>
              <div className="flex gap-4">
                <div className={cn("h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform", notif.color)}>
                  <notif.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className={cn("text-sm font-bold leading-tight", notif.unread ? "text-slate-900" : "text-slate-600")}>{notif.title}</h4>
                    {notif.unread && <div className="h-2 w-2 rounded-full bg-rose-500 mt-1 shrink-0"></div>}
                  </div>
                  <p className="text-xs font-medium text-slate-500 mb-2 leading-relaxed">{notif.desc}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{notif.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white">
           <Button variant="outline" className="w-full rounded-xl font-bold text-xs h-12">View All Activity Settings</Button>
        </div>

      </div>
    </>
  );
}