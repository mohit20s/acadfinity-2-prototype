"use client";

import { usePrototypeStore } from "@/store/use-prototype-store";
import { DirectorDashboard } from "@/components/dashboard/roles/director-dashboard";
import { ParentDashboard } from "@/components/dashboard/roles/parent-dashboard";
import { TeacherDashboard } from "@/components/dashboard/roles/teacher-dashboard";
import StudentDashboard from "@/components/dashboard/roles/student-dashboard"; // Default import for student

export default function DashboardPage() {
  const { currentRole } = usePrototypeStore();
  const isB2C = currentRole === 'Independent Learner';

  // Helper function to render the correct dashboard based on role
  const renderDashboardContent = () => {
    switch (currentRole) {
      case "Director":
      case "Principal":
      case "School Admin":
        return <DirectorDashboard />;
      case "Teacher":
        return <TeacherDashboard />;
      case "Parent":
        return <ParentDashboard />;
      case "Student":
      case "Independent Learner":
        return <StudentDashboard />;
      default:
        // Fallback just in case, though all roles are now covered!
        return <DirectorDashboard />;
    }
  };

  // Dynamic header text based on the role group
  const getHeaderText = () => {
    if (isB2C || currentRole === 'Student') return { title: "Learner Hub", desc: "Track your progress and active courses." };
    if (currentRole === 'Teacher') return { title: "Educator Portal", desc: "Manage your classes, students, and grading." };
    if (currentRole === 'Parent') return { title: "Family Portal", desc: "Track your child's academic progress and resources." };
    return { title: "Institute Overview", desc: "Monitor your school's performance and ecosystem usage." };
  };

  const header = getHeaderText();

  return (
    <div className="space-y-6">
      {/* Page Header (Hidden on mobile if space is tight, or keep it. We'll keep it clean) */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          {header.title}
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          {header.desc}
        </p>
      </div>

      {/* Dynamic Role Content */}
      {renderDashboardContent()}
    </div>
  );
}