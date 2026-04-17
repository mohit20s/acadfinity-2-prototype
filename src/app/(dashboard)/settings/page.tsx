"use client";

import { useState } from "react";
import { User, Shield, Building, Bell, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'My Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'institute', name: 'Institute Profile', icon: Building },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'billing', name: 'Billing & Subscriptions', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage your account and institution settings.</p>
      </div>

      {/* Main Layout: Tabs on left, Content on right */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar Tabs */}
        <aside className="md:w-1/4">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors w-full text-left ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
          {activeTab === 'profile' && (
            <div className="animate-in fade-in">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Personal Information</h2>
              <p className="text-sm text-slate-500 mb-6">Update your photo and personal details here.</p>
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-primary text-white text-3xl font-bold flex items-center justify-center">D</div>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium">First Name</label><input type="text" defaultValue="Sanjay" className="w-full h-10 px-3 rounded-md border mt-1" /></div>
                  <div><label className="text-sm font-medium">Last Name</label><input type="text" defaultValue="Verma" className="w-full h-10 px-3 rounded-md border mt-1" /></div>
                </div>
                <div><label className="text-sm font-medium">Email Address</label><input type="email" defaultValue="director@dps.edu" className="w-full h-10 px-3 rounded-md border mt-1" disabled /></div>
                <div className="border-t pt-6 mt-4 flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Password</h2>
              <p className="text-sm text-slate-500 mb-6">Manage your account security settings.</p>
              <div className="space-y-4 max-w-lg">
                <div><label className="text-sm font-medium">Current Password</label><input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-md border mt-1" /></div>
                <div><label className="text-sm font-medium">New Password</label><input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-md border mt-1" /></div>
                <div><label className="text-sm font-medium">Confirm New Password</label><input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-md border mt-1" /></div>
                <div className="border-t pt-6 mt-4 flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'institute' && (
            <div className="animate-in fade-in">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Institute Profile</h2>
              <p className="text-sm text-slate-500 mb-6">This information is displayed across the platform.</p>
               <div className="space-y-4 max-w-lg">
                <div><label className="text-sm font-medium">Institute Name</label><input type="text" defaultValue="Delhi Public Educational Institute" className="w-full h-10 px-3 rounded-md border mt-1" /></div>
                <div><label className="text-sm font-medium">Address</label><input type="text" defaultValue="Sector 62, Noida, India" className="w-full h-10 px-3 rounded-md border mt-1" /></div>
                <div><label className="text-sm font-medium">Academic Year Start</label><input type="date" defaultValue="2024-04-01" className="w-full h-10 px-3 rounded-md border mt-1" /></div>
                <div className="border-t pt-6 mt-4 flex justify-end">
                  <Button>Save Institute Details</Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'billing' && (
            <div className="animate-in fade-in">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Billing & Subscriptions</h2>
              <p className="text-sm text-slate-500 mb-6">Manage your active subscriptions and view invoices.</p>
               <div className="space-y-4">
                 <div className="p-6 border rounded-xl bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                   <div>
                     <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Current Plan</span>
                     <h3 className="font-bold text-lg text-slate-900 mt-2">Acadfinity Ecosystem Suite</h3>
                     <p className="text-sm text-slate-500">Renews on March 25, 2025.</p>
                   </div>
                   <Button variant="outline">Manage Subscription</Button>
                 </div>
                 <div className="text-center p-8 border border-dashed rounded-lg text-slate-500">
                   Invoice History will appear here.
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Notification Settings</h2>
              <p className="text-sm text-slate-500 mb-6">Choose how you want to be notified.</p>
              <div className="space-y-4 max-w-lg">
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                   <div><p className="font-medium">Fee Reminders</p><p className="text-xs text-slate-500">Send automatic reminders to parents.</p></div>
                   <div className="h-6 w-11 bg-emerald-500 rounded-full p-1 flex items-center cursor-pointer"><div className="h-4 w-4 bg-white rounded-full shadow-sm ml-auto"></div></div>
                 </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                   <div><p className="font-medium">Daily Summary Email</p><p className="text-xs text-slate-500">Get a daily digest of Educational Institute activity.</p></div>
                   <div className="h-6 w-11 bg-slate-200 rounded-full p-1 flex items-center cursor-pointer"><div className="h-4 w-4 bg-white rounded-full shadow-sm"></div></div>
                 </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}