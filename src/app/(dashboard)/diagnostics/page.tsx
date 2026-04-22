"use client";

import DiagnosticToolPage from "@/components/dashboard/diagnostic-tool";

// This is now purely the AI Diagnostics page.
export default function DiagnosticsRoutePage() {
  return (
    <div className="animate-in fade-in duration-500">
      <DiagnosticToolPage />
    </div>
  );
}