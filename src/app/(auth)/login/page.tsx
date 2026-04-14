"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Building2, UserCircle2 } from "lucide-react";
import { usePrototypeStore, Role } from "@/store/use-prototype-store";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'school' | 'b2c'>('school');
  const [selectedRole, setSelectedRole] = useState<Role>('Parent');
  const setStoreRole = usePrototypeStore((state) => state.setRole);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'b2c') {
      setStoreRole('Independent Learner');
      router.push('/lms');
    } else {
      setStoreRole(selectedRole);
      router.push('/select-school');
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome to Acadfinity</h1>
        <p className="text-sm text-slate-500 mt-2">Select your account type to continue</p>
      </div>

      {/* Login Type Toggle */}
      <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
        <button
          onClick={() => setLoginType('school')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${
            loginType === 'school' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Building2 className="h-4 w-4" /> School Portal
        </button>
        <button
          onClick={() => setLoginType('b2c')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-md transition-all ${
            loginType === 'b2c' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <UserCircle2 className="h-4 w-4" /> Independent Learner
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {loginType === 'school' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">I am logging in as a:</label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as Role)}
              >
                <option value="Parent">Parent</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="School Admin">School Admin</option>
                <option value="Principal">Principal</option>
                <option value="Director">Director</option>
              </select>
            </div>
          </div>
        )}

        {loginType === 'b2c' && (
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg mb-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm text-emerald-800 font-medium text-center">
              Access outskill courses, toys, and library books directly, no school affiliation required!
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email or Mobile Number</label>
          <input type="text" placeholder="user@example.com" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Link href="#" className="text-xs font-medium text-primary hover:underline">Forgot?</Link>
          </div>
          <input type="password" placeholder="••••••••" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>

        <Button type="submit" className="w-full mt-6 h-11 text-md">
          {loginType === 'b2c' ? 'Sign In / Sign Up' : 'Continue to School Selection'}
        </Button>
      </form>
    </div>
  );
}