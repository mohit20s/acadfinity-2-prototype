import { Users, TrendingUp, BookOpen, ShoppingBag, CreditCard, Activity } from "lucide-react";

export function DirectorDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Total Students</span>
            <Users className="h-4 w-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900">2,450</span>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +12% this year
          </span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Platform Adoption (ERP)</span>
            <Activity className="h-4 w-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900">94%</span>
          <span className="text-xs text-emerald-600 font-medium">Staff usage up 5%</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Marketplace Spend</span>
            <ShoppingBag className="h-4 w-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900">₹4.2L</span>
          <span className="text-xs text-slate-500 font-medium">Procurement this quarter</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Library Subscriptions</span>
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-2xl font-bold text-slate-900">850</span>
          <span className="text-xs text-emerald-600 font-medium">Active Parent Plans</span>
        </div>
      </div>

      {/* Detail Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Module Subscriptions */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Active Module Subscriptions</h3>
            <p className="text-sm text-slate-500">Your current Acadfinity ecosystem usage.</p>
          </div>
          <div className="p-0">
            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-medium text-slate-900">Core ERP & LMS</p>
                  <p className="text-xs text-slate-500">Renews Mar 2025 • 120 Staff Licenses</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Active</span>
              </div>
              <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-medium text-slate-900">Books & Toys Digital Library</p>
                  <p className="text-xs text-slate-500">Institution Wide Access • 850 Opt-ins</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Procurements */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-slate-900">Recent Marketplace Orders</h3>
              <p className="text-sm text-slate-500">Latest school procurements.</p>
            </div>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="p-0">
            <div className="divide-y divide-slate-100">
              <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Bulk Chemistry Lab Supplies</p>
                    <p className="text-xs text-slate-500">Ordered: Today • Approved by Principal</p>
                  </div>
                </div>
                <span className="text-sm font-medium">₹45,000</span>
              </div>
              <div className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">Library Restock (Fiction Gr 6-8)</p>
                    <p className="text-xs text-slate-500">Ordered: 2 days ago • Delivered</p>
                  </div>
                </div>
                <span className="text-sm font-medium">₹12,400</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}