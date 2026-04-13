"use client";

import { usePrototypeStore } from "@/store/use-prototype-store";
import { DirectorDashboard } from "@/components/dashboard/roles/director-dashboard";
import { ParentDashboard } from "@/components/dashboard/roles/parent-dashboard";

export default function DashboardPage() {
  const { currentRole } = usePrototypeStore();

  // Helper function to render the correct dashboard based on role
  const renderDashboardContent = () => {
    switch (currentRole) {
      case "Director":
        return <DirectorDashboard />;
      case "Parent":
        return <ParentDashboard />;
      // For the prototype, we fallback other roles to a simple message to save time
      default:
        return (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-xl bg-white text-center animate-in fade-in">
            <h2 className="text-xl font-bold text-slate-900 mb-2">{currentRole} Dashboard</h2>
            <p className="text-slate-500">
              This role-specific view is pending implementation. 
              <br/>Switch to <strong>Director</strong> or <strong>Parent</strong> to see the full UI prototypes.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {currentRole === 'Parent' ? "Family Portal" : "Institute Overview"}
        </h1>
        <p className="text-sm text-slate-500">
          {currentRole === 'Parent' 
            ? "Track your child's academic progress and resources." 
            : "Monitor your school's performance and ecosystem usage."}
        </p>
      </div>

      {/* Dynamic Role Content */}
      {renderDashboardContent()}
    </div>
  );
}