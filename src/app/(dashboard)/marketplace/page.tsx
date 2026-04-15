"use client";

import { useState } from 'react';
import { Search, ShoppingCart, Book, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Hybrid Catalog: Includes items for Sale and for the Library
const items = [
  { id: 1, name: "Premium A4 Notebooks (Pack of 100)", category: "Stationery", price: "₹4,500", type: 'sale' },
  { id: 2, name: "The Solar System Interactive", category: "Science", type: 'library', format: 'Digital App' },
  { id: 3, name: "Chemistry Lab Starter Kit", category: "Equipment", price: "₹22,000", type: 'sale' },
  { id: 4, name: "Advanced Lego Robotics Kit", category: "STEM", type: 'library', format: 'Physical Toy' },
  { id: 5, name: "Library Fiction Bundle (Grades 1-5)", category: "Books", price: "₹15,000", type: 'sale' },
  { id: 6, name: "Montessori Wooden Puzzle Set", category: "Toys", type: 'library', format: 'Physical Toy' },
];

export default function MarketplacePage() {
  const [filter, setFilter] = useState('all');

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Ecosystem Store</h1>
        <p className="text-sm font-medium text-slate-500">Procure school supplies or borrow from the digital & physical library.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Filter Buttons */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-full">
          <button onClick={() => setFilter('all')} className={cn("px-4 py-1.5 rounded-full text-xs font-bold", filter === 'all' ? 'bg-white shadow text-slate-900' : 'text-slate-500')}>All Items</button>
          <button onClick={() => setFilter('sale')} className={cn("px-4 py-1.5 rounded-full text-xs font-bold", filter === 'sale' ? 'bg-white shadow text-slate-900' : 'text-slate-500')}>For Sale</button>
          <button onClick={() => setFilter('library')} className={cn("px-4 py-1.5 rounded-full text-xs font-bold", filter === 'library' ? 'bg-white shadow text-slate-900' : 'text-slate-500')}>Library</button>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search store & library..." className="w-full h-10 pl-10 pr-4 rounded-full border border-slate-200 text-sm" />
        </div>
      </div>

      {/* Hybrid Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-lg hover:border-primary/20">
            <div className="h-48 bg-slate-100 flex items-center justify-center relative">
              <span className="text-slate-400 text-3xl">
                {item.type === 'sale' ? <ShoppingCart /> : item.format?.includes('Toy') ? <Box /> : <Book />}
              </span>
              {/* Type Badge */}
              <span className={cn("absolute top-3 right-3 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full", 
                item.type === 'sale' ? 'bg-emerald-500 text-white' : 'bg-primary text-white'
              )}>
                {item.type === 'sale' ? 'For Sale' : 'In Library'}
              </span>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.category}</span>
              <h3 className="font-bold text-slate-900 leading-tight mb-4 flex-1">{item.name}</h3>
              
              <div className="flex items-center justify-between mt-auto">
                {item.type === 'sale' ? (
                  <span className="font-black text-lg text-slate-900">{item.price}</span>
                ) : (
                  <span className="text-xs font-bold text-slate-500">{item.format}</span>
                )}
                <Button size="sm" className={cn("font-bold text-xs rounded-lg h-9", item.type === 'sale' ? '' : 'bg-slate-800')}>
                  {item.type === 'sale' ? 'Add to Cart' : 'Borrow'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}