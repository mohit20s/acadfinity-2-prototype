"use client";

import { useState } from "react";
import { ShoppingCart, Book } from "lucide-react";
import { SubscriptionLibrary } from "@/components/dashboard/subscription-library";
import MarketplacePage from "../marketplace/page"; // We reuse the entire Marketplace page here!

export default function ResourcesHubPage() {
  const [activeTab, setActiveTab] = useState('shop');

  return (
    <div className="space-y-6">
      {/* Top Tab Switcher */}
      <div className="flex justify-center gap-2 p-1.5 bg-slate-100 rounded-full sticky top-2 z-20 max-w-xs mx-auto">
        <button 
          onClick={() => setActiveTab('shop')} 
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-full transition-all ${activeTab === 'shop' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
        >
          <ShoppingCart className="h-4 w-4" /> Marketplace
        </button>
        <button 
          onClick={() => setActiveTab('library')} 
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-full transition-all ${activeTab === 'library' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
        >
          <Book className="h-4 w-4" /> Subscription Library
        </button>
      </div>

      {/* Conditionally Render the Page Content */}
      {activeTab === 'shop' && <MarketplacePage />}
      {activeTab === 'library' && <SubscriptionLibrary />}
    </div>
  );
}