"use client";

import { useState } from "react";
import { ArrowRight, Book, Box as BoxIcon, Check, Star, Plus, Minus, Truck, Info, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Data for Rentable Items
const libraryItems = [
  { id: 1, title: "The Solar System Guide", category: "Book", age: "8-12 yrs", img: "bg-blue-900", rating: 4.8 },
  { id: 2, title: "Advanced Lego Robotics", category: "Premium Toy", age: "10-15 yrs", img: "bg-amber-600", rating: 4.9 },
  { id: 3, title: "Harry Potter: Sorcerer's Stone", category: "Book", age: "9-14 yrs", img: "bg-emerald-800", rating: 4.9 },
  { id: 4, title: "Montessori Wooden Puzzle", category: "Toy", age: "3-5 yrs", img: "bg-orange-500", rating: 4.6 },
  { id: 5, title: "Diary of a Wimpy Kid", category: "Book", age: "8-12 yrs", img: "bg-rose-700", rating: 4.7 },
  { id: 6, title: "Snap Circuits Basic", category: "Premium Toy", age: "8+ yrs", img: "bg-indigo-600", rating: 4.8 },
];

export function SubscriptionLibrary() {
  const [view, setView] = useState<'plans' | 'builder' | 'success'>('plans');
  const [activePlan, setActivePlan] = useState<string | null>(null);
  
  // State for the user's current box selection
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Limits based on the selected plan (Mocking the 'Pro' Plan: 5 Books, 2 Toys)
  const maxBooks = 5;
  const maxToys = 2;

  const currentBooks = selectedItems.filter(id => libraryItems.find(i => i.id === id)?.category === 'Book').length;
  const currentToys = selectedItems.filter(id => libraryItems.find(i => i.id === id)?.category.includes('Toy')).length;

  const handleSelect = (item: any) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter(id => id !== item.id)); // Remove
      return;
    }
    
    // Check limits before adding
    if (item.category === 'Book' && currentBooks >= maxBooks) return alert("Book limit reached for your plan!");
    if (item.category.includes('Toy') && currentToys >= maxToys) return alert("Toy limit reached for your plan!");
    
    setSelectedItems([...selectedItems, item.id]); // Add
  };

  const handleSubscribe = (planName: string) => {
    setActivePlan(planName);
    setView('builder');
    window.scrollTo(0,0);
  };

  // ==========================================
  // VIEW 1: SUBSCRIPTION PLANS (The Landing Page)
  // ==========================================
  if (view === 'plans') {
    return (
      <div className="space-y-10 pb-10 animate-in fade-in duration-300">
        <section className="bg-amber-50 rounded-3xl p-8 text-center relative overflow-hidden border border-amber-100">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-200/50 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-amber-950 tracking-tighter mb-4">The Acadfinity Library Box</h1>
            <p className="text-base text-amber-900/80 font-medium max-w-2xl mx-auto mb-8">
              A curated subscription box of physical books and educational toys, delivered to your doorstep. Spark curiosity and make learning fun.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-8">Choose Your Monthly Plan</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            <div className="p-6 rounded-3xl border-2 border-slate-100 flex flex-col hover:border-amber-500/30 transition-all">
              <h3 className="font-black text-xl text-slate-900">Explorer</h3><p className="text-3xl font-black mb-4 text-slate-900">₹799<span className="text-sm font-bold text-slate-400">/mo</span></p>
              <ul className="space-y-3 text-sm font-bold text-slate-600 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-emerald-500" /> 3 Books per month</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-emerald-500" /> 1 Educational Toy</li>
              </ul>
              <Button variant="outline" onClick={() => handleSubscribe('Explorer')} className="w-full font-black rounded-xl h-12 border-2 text-slate-700 hover:bg-slate-50">Choose Explorer</Button>
            </div>

            <div className="p-6 rounded-3xl border-2 border-primary shadow-xl flex flex-col ring-4 ring-primary/10 relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 left-0 w-full bg-primary text-center text-[10px] font-black text-white py-1 uppercase tracking-widest">Most Popular</div>
              <div className="mt-4"><h3 className="font-black text-xl text-slate-900">Pro</h3><p className="text-3xl font-black mb-4 text-slate-900">₹1,299<span className="text-sm font-bold text-slate-400">/mo</span></p></div>
              <ul className="space-y-3 text-sm font-bold text-slate-600 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-emerald-500" /> 5 Books per month</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-emerald-500" /> 2 Premium Toys</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-emerald-500" /> Free Doorstep Delivery</li>
              </ul>
              <Button onClick={() => handleSubscribe('Pro')} className="w-full font-black rounded-xl h-12 shadow-lg shadow-primary/20">Choose Pro</Button>
            </div>

            <div className="p-6 rounded-3xl border-2 border-slate-100 flex flex-col hover:border-amber-500/30 transition-all">
              <h3 className="font-black text-xl text-slate-900">Genius</h3><p className="text-3xl font-black mb-4 text-slate-900">₹1,999<span className="text-sm font-bold text-slate-400">/mo</span></p>
              <ul className="space-y-3 text-sm font-bold text-slate-600 mb-8 flex-1">
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-emerald-500" /> 7 Books per month</li>
                <li className="flex items-center gap-3"><Check className="h-5 w-5 text-emerald-500" /> 3 Premium Toys</li>
              </ul>
              <Button variant="outline" onClick={() => handleSubscribe('Genius')} className="w-full font-black rounded-xl h-12 border-2 text-slate-700 hover:bg-slate-50">Choose Genius</Button>
            </div>

          </div>
        </section>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: SUCCESS SCREEN
  // ==========================================
  if (view === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in zoom-in-95 duration-500">
         <div className="h-24 w-24 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
           <Truck className="h-12 w-12" />
         </div>
         <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Box Confirmed!</h1>
         <p className="text-slate-600 font-medium max-w-md mx-auto mb-8">
           Your curated books and toys are being packed. They will be delivered to your doorstep within 3-5 working days. Enjoy learning!
         </p>
         <Button onClick={() => { setSelectedItems([]); setView('plans'); }} className="h-12 px-8 rounded-full font-black">Back to Library Hub</Button>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: BUILD YOUR BOX (Rent Out Interface)
  // ==========================================
  return (
    <div className="animate-in slide-in-from-right duration-300 pb-32 lg:pb-10 relative">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
         <Button variant="ghost" size="icon" onClick={() => setView('plans')} className="rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-100">
           <ArrowLeft className="h-5 w-5 text-slate-700" />
         </Button>
         <div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tight">Build Your Box</h1>
           <p className="text-xs font-bold text-primary uppercase tracking-widest">{activePlan} Plan Active</p>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT: THE CATALOG */}
        <div className="flex-1 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
             {libraryItems.map((item) => {
               const isSelected = selectedItems.includes(item.id);
               return (
                 <div key={item.id} className={cn("bg-white rounded-3xl border-2 shadow-sm overflow-hidden flex flex-col transition-all", isSelected ? "border-primary ring-4 ring-primary/10" : "border-slate-100 hover:border-slate-300")}>
                   <div className={cn("h-40 w-full flex items-center justify-center relative", item.img)}>
                      {item.category.includes('Toy') ? <BoxIcon className="h-16 w-16 text-white/50" /> : <Book className="h-16 w-16 text-white/50" />}
                      {isSelected && <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"><Check className="h-5 w-5" /></div>}
                   </div>
                   <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className={cn("text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest", item.category.includes('Toy') ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-indigo-50 text-indigo-600 border-indigo-100")}>
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{item.age}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 leading-tight mb-4 flex-1">{item.title}</h3>
                      <Button 
                        onClick={() => handleSelect(item)} 
                        variant={isSelected ? "outline" : "default"}
                        className={cn("w-full h-10 font-black rounded-xl text-xs", isSelected ? "border-2 border-slate-200 text-slate-600" : "shadow-md")}
                      >
                        {isSelected ? "Remove from Box" : "Add to Box"}
                      </Button>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* RIGHT (Desktop) / BOTTOM (Mobile): YOUR BOX SUMMARY */}
        <div className="w-full lg:w-[320px] shrink-0">
           {/* Desktop Sticky Panel */}
           <div className="hidden lg:flex flex-col sticky top-24 bg-white rounded-[2rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50 p-6 overflow-hidden">
              <h2 className="text-xl font-black text-slate-900 mb-6">Your Box Summary</h2>
              
              <div className="space-y-5 mb-8">
                 <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                      <span>Books</span><span className={cn(currentBooks === maxBooks ? "text-emerald-500" : "text-slate-900")}>{currentBooks} / {maxBooks} Selected</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 transition-all" style={{width: `${(currentBooks/maxBooks)*100}%`}}></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                      <span>Toys</span><span className={cn(currentToys === maxToys ? "text-emerald-500" : "text-slate-900")}>{currentToys} / {maxToys} Selected</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500 transition-all" style={{width: `${(currentToys/maxToys)*100}%`}}></div></div>
                 </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                 {selectedItems.length === 0 ? (
                   <p className="text-xs font-bold text-slate-400 text-center py-4">Your box is empty. Add items from the catalog.</p>
                 ) : (
                   <ul className="space-y-3">
                     {selectedItems.map(id => {
                       const item = libraryItems.find(i => i.id === id);
                       return (
                         <li key={id} className="flex items-center justify-between gap-2">
                           <span className="text-xs font-bold text-slate-700 truncate">{item?.title}</span>
                           <Button variant="ghost" size="icon" onClick={() => handleSelect(item)} className="h-6 w-6 text-slate-400 hover:text-rose-500 hover:bg-rose-50"><Minus className="h-3 w-3" /></Button>
                         </li>
                       );
                     })}
                   </ul>
                 )}
              </div>

              <Button 
                onClick={() => setView('success')}
                disabled={selectedItems.length === 0} 
                className="w-full h-14 text-lg font-black rounded-xl shadow-xl shadow-primary/20"
              >
                Confirm Delivery
              </Button>
           </div>
        </div>

      </div>

      {/* MOBILE ONLY: Sticky Bottom Summary Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-safe-area-inset-bottom z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
         <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Your Box</p>
               <p className="text-sm font-black text-slate-900">{selectedItems.length} Items Selected</p>
               <p className="text-[10px] font-bold text-primary">{maxBooks - currentBooks} Books, {maxToys - currentToys} Toys remaining</p>
            </div>
            <Button 
               onClick={() => setView('success')}
               disabled={selectedItems.length === 0} 
               className="h-12 px-6 rounded-xl font-black shadow-lg shadow-primary/20 shrink-0"
            >
              Confirm Delivery
            </Button>
         </div>
      </div>

    </div>
  );
}