"use client";

import { useState } from 'react';
import { 
  Search, ShoppingCart, Star, Filter, ArrowLeft, 
  CheckCircle2, Truck, ShieldCheck, Package, ChevronRight, 
  Box, Book, MonitorPlay
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- EXPANDED MOCK DATA ---
const categories = ["All", "Stationery", "Lab Equipment", "Electronics", "Library Assets", "Furniture"];

const products = [
  { 
    id: 1, name: "Premium A4 Ruled Notebooks (Pack of 100)", category: "Stationery", 
    price: "₹4,500", oldPrice: "₹6,000", discount: "25% OFF", rating: 4.8, reviews: 124, 
    type: "sale", vendor: "EduSupplies India", stock: "In Stock",
    desc: "High-quality 70 GSM paper notebooks perfect for Educational Institute term distributions. Features a durable soft cover and index page.",
    specs: ["100 pages per book", "70 GSM Paper", "A4 Size", "Soft Cover"]
  },
  { 
    id: 2, name: "Student Tablet - 10 inch (Bulk - 30 Units)", category: "Electronics", 
    price: "₹3,45,000", oldPrice: "₹4,20,000", discount: "18% OFF", rating: 4.9, reviews: 45, 
    type: "sale", vendor: "TechLearn Hub", stock: "Limited Stock",
    desc: "Pre-loaded with educational software and MDM tracking. 10-inch HD display, 4GB RAM, 64GB Storage. Perfect for digital classrooms.",
    specs: ["10-inch IPS Display", "4GB RAM / 64GB ROM", "MDM Ready", "Rugged Case Included"]
  },
  { 
    id: 3, name: "Advanced Chemistry Lab Starter Kit", category: "Lab Equipment", 
    price: "₹22,000", oldPrice: "₹25,000", discount: "12% OFF", rating: 4.7, reviews: 89, 
    type: "sale", vendor: "SciEquip Makers", stock: "In Stock",
    desc: "Complete starter kit for high Educational Institute chemistry labs. Includes beakers, test tubes, safety goggles, and basic non-hazardous reagents.",
    specs: ["Grade 9-12 suitable", "Borosilicate Glass", "ISO Certified", "Includes Safety Gear"]
  },
  { 
    id: 4, name: "Advanced Lego Robotics Kit #4", category: "Library Assets", 
    price: "Library", oldPrice: "", discount: "Borrow Only", rating: 4.9, reviews: 210, 
    type: "library", vendor: "Campus Library Hub", stock: "2 Available",
    desc: "Build and program advanced robots. Develops spatial reasoning and logic. Available to borrow for a 2-week period via the Library module.",
    specs: ["Ages 10-15", "Bluetooth enabled", "Includes Motor & Sensors", "Companion App"]
  },
  { 
    id: 5, name: "Ergonomic Student Desk & Chair Set", category: "Furniture", 
    price: "₹3,200", oldPrice: "₹4,000", discount: "20% OFF", rating: 4.5, reviews: 32, 
    type: "sale", vendor: "Educational InstituteFurn Works", stock: "Made to Order (14 Days)",
    desc: "Adjustable height desk and chair set designed for posture support. Powder-coated steel frame with solid wood top.",
    specs: ["Height Adjustable", "Anti-scratch coating", "Ergonomic backrest", "Max load 100kg"]
  },
  { 
    id: 6, name: "Harry Potter Complete Series", category: "Library Assets", 
    price: "Library", oldPrice: "", discount: "Borrow Only", rating: 4.9, reviews: 540, 
    type: "library", vendor: "Campus Library Hub", stock: "Waitlist",
    desc: "The complete 7-book series of the boy wizard. Highly requested item.",
    specs: ["Fiction", "Ages 9-14", "Hardcover", "7 Books"]
  },
];

export default function MarketplacePage() {
  const [view, setView] = useState<'catalog' | 'product'>('catalog');
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [activeTab, setActiveTab] = useState('desc'); // For product page tabs

  const handleProductClick = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0,0);
  };

  // --- VIEW 1: THE CATALOG (STOREFRONT) ---
  if (view === 'catalog') {
    const filteredProducts = activeCategory === "All" 
      ? products 
      : products.filter(p => p.category === activeCategory);

    return (
      <div className="space-y-6 animate-in fade-in duration-500 pb-24 md:pb-10">
        
        {/* Header & Search */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Ecosystem Store</h1>
            <p className="text-slate-400 font-medium">Procure bulk Educational Institute supplies or borrow learning assets.</p>
          </div>
          <div className="relative z-10 w-full md:w-96 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input type="text" placeholder="Search products..." className="w-full h-12 pl-12 pr-4 rounded-xl border-0 bg-white/10 text-white placeholder:text-slate-400 backdrop-blur-md outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <Button size="icon" className="h-12 w-12 rounded-xl bg-white text-slate-900 hover:bg-slate-200 shrink-0 shadow-lg">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories & Filters */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2 px-1 sticky top-0 bg-slate-50 z-20">
          <Button variant="outline" className="shrink-0 font-black rounded-full h-10 px-4 border-2 border-slate-200 text-slate-600 shadow-sm"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
          <div className="h-6 w-px bg-slate-300 mx-2 shrink-0"></div>
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={cn("shrink-0 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all", 
                activeCategory === cat ? "bg-slate-900 text-white shadow-md" : "bg-white border-2 border-slate-200 text-slate-500 hover:border-slate-300"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)} className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer relative">
              
              {/* Image Placeholder */}
              <div className="h-52 bg-slate-50 flex items-center justify-center relative overflow-hidden">
                {product.category === 'Electronics' && <MonitorPlay className="h-16 w-16 text-slate-300 group-hover:scale-110 transition-transform" />}
                {product.category === 'Stationery' && <Box className="h-16 w-16 text-slate-300 group-hover:scale-110 transition-transform" />}
                {product.category.includes('Library') && <Book className="h-16 w-16 text-slate-300 group-hover:scale-110 transition-transform" />}
                {product.category === 'Lab Equipment' && <Package className="h-16 w-16 text-slate-300 group-hover:scale-110 transition-transform" />}
                {!['Electronics', 'Stationery', 'Library Assets', 'Lab Equipment'].includes(product.category) && <Package className="h-16 w-16 text-slate-300 group-hover:scale-110 transition-transform" />}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                   <span className={cn("text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm", product.type === 'sale' ? 'bg-emerald-500 text-white' : 'bg-primary text-white')}>
                     {product.type === 'sale' ? 'For Sale' : 'In Library'}
                   </span>
                </div>
              </div>
              
              {/* Details */}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{product.vendor}</span>
                <h3 className="font-bold text-slate-900 leading-tight mb-2 flex-1 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-1.5 mb-4">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-black text-slate-700">{product.rating}</span>
                  <span className="text-[10px] font-bold text-slate-400">({product.reviews})</span>
                </div>
                
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <span className="font-black text-xl text-slate-900 tracking-tight">{product.price}</span>
                    {product.oldPrice && <p className="text-[10px] font-bold text-slate-400 line-through">{product.oldPrice}</p>}
                  </div>
                  <Button size="icon" className={cn("h-10 w-10 rounded-xl shadow-md", product.type === 'sale' ? 'bg-slate-900' : 'bg-primary')}><ShoppingCart className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- VIEW 2: PRODUCT DETAILS PAGE (PDP) ---
  if (view === 'product' && selectedProduct) {
    return (
      <div className="animate-in slide-in-from-right duration-500 pb-24 md:pb-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
           <Button variant="ghost" size="icon" onClick={() => setView('catalog')} className="rounded-full hover:bg-slate-200"><ArrowLeft className="h-5 w-5" /></Button>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Store <ChevronRight className="inline h-3 w-3 mx-1" /> {selectedProduct.category}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* LEFT: Image Gallery (Mocked) */}
          <div className="space-y-4">
            <div className="aspect-square bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-sm">
               <Package className="h-32 w-32 text-slate-200" />
               <div className="absolute top-6 left-6">
                  {selectedProduct.discount && <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">{selectedProduct.discount}</span>}
               </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-primary cursor-pointer"></div>
              <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent cursor-pointer"></div>
              <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent cursor-pointer"></div>
              <div className="aspect-square bg-slate-100 rounded-2xl border-2 border-transparent cursor-pointer flex items-center justify-center text-xs font-black text-slate-400">+2</div>
            </div>
          </div>

          {/* RIGHT: Product Details & Checkout */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 mb-2 leading-tight">{selectedProduct.name}</h1>
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">BY {selectedProduct.vendor}</p>
            
            <div className="flex items-center gap-3 mb-6">
               <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm font-black text-amber-700">{selectedProduct.rating}</span>
               </div>
               <span className="text-xs font-bold text-slate-400 underline cursor-pointer">Read {selectedProduct.reviews} Reviews</span>
            </div>

            {/* Pricing Box */}
            <div className="p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl mb-8">
               <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-black tracking-tighter text-slate-900">{selectedProduct.price}</span>
                  {selectedProduct.oldPrice && <span className="text-lg font-bold text-slate-400 line-through mb-1">{selectedProduct.oldPrice}</span>}
               </div>
               <p className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 mb-6"><CheckCircle2 className="h-3.5 w-3.5" /> {selectedProduct.stock}</p>
               
               <div className="flex flex-col sm:flex-row gap-3">
                 <Button className="flex-1 h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20">
                   {selectedProduct.type === 'sale' ? 'Add to Cart' : 'Request from Library'}
                 </Button>
                 {selectedProduct.type === 'sale' && (
                   <Button variant="outline" className="flex-1 h-14 rounded-2xl font-black text-lg border-2">Bulk Quote</Button>
                 )}
               </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="flex items-center gap-3"><Truck className="h-8 w-8 text-slate-300" /><div><p className="text-xs font-black text-slate-900">Fast Delivery</p><p className="text-[10px] font-bold text-slate-500 uppercase">Within 3-5 Days</p></div></div>
               <div className="flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-slate-300" /><div><p className="text-xs font-black text-slate-900">Verified Vendor</p><p className="text-[10px] font-bold text-slate-500 uppercase">Acadfinity Assured</p></div></div>
            </div>

            {/* Tabs for Description/Specs */}
            <div className="border-t border-slate-200 pt-6 mt-auto">
               <div className="flex gap-6 border-b border-slate-100 mb-6">
                 <button onClick={() => setActiveTab('desc')} className={cn("pb-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors", activeTab === 'desc' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400")}>Description</button>
                 <button onClick={() => setActiveTab('specs')} className={cn("pb-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors", activeTab === 'specs' ? "border-slate-900 text-slate-900" : "border-transparent text-slate-400")}>Specifications</button>
               </div>
               
               {activeTab === 'desc' && (
                 <p className="text-slate-600 font-medium leading-relaxed animate-in fade-in duration-300">{selectedProduct.desc}</p>
               )}
               {activeTab === 'specs' && (
                 <ul className="space-y-3 animate-in fade-in duration-300">
                    {selectedProduct.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> {spec}</li>
                    ))}
                 </ul>
               )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}