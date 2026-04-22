"use client";

import { SubscriptionLibrary } from "@/components/dashboard/subscription-library";

// This is now purely the Subscription Box page.
export default function LibraryPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <SubscriptionLibrary />
    </div>
  );
}