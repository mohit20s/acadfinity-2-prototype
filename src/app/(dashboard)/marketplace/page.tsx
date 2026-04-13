import { Search, Filter, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data for the prototype
const products = [
  { id: 1, name: "Premium A4 Notebooks (Pack of 100)", category: "Stationery", price: "₹4,500", rating: 4.8 },
  { id: 2, name: "Chemistry Lab Starter Kit", category: "Equipment", price: "₹22,000", rating: 4.9 },
  { id: 3, name: "Montessori Wooden Puzzle Set", category: "Toys", price: "₹3,200", rating: 4.7 },
  { id: 4, name: "Student Tablet (Bulk - 30 Units)", category: "Electronics", price: "₹3,50,000", rating: 4.5 },
  { id: 5, name: "Library Fiction Bundle (Grades 1-5)", category: "Books", price: "₹15,000", rating: 4.9 },
  { id: 6, name: "Whiteboard Markers (Box of 50)", category: "Stationery", price: "₹1,200", rating: 4.6 },
];

export default function MarketplacePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Procurement Hub</h1>
          <p className="text-sm text-slate-500">Order school essentials from verified vendors.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="h-10 w-full rounded-md border border-slate-300 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline" className="h-10 px-3 flex-shrink-0">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button className="h-10 px-3 flex-shrink-0 bg-slate-900">
            <ShoppingCart className="h-4 w-4 mr-2" /> Cart (2)
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {["All Products", "Stationery", "Books", "Toys & Play", "Lab Equipment", "Electronics"].map((cat, i) => (
          <button 
            key={cat}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              i === 0 ? "bg-primary text-primary-foreground" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group">
            {/* Image Placeholder */}
            <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 transition-colors">
              [ Product Image ]
            </div>
            
            {/* Details */}
            <div className="p-4 flex flex-col flex-1">
              <span className="text-xs font-semibold text-primary mb-1">{product.category}</span>
              <h3 className="font-semibold text-slate-900 leading-tight mb-2 flex-1">{product.name}</h3>
              
              <div className="flex items-center gap-1 mb-4">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-slate-600">{product.rating}</span>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-lg text-slate-900">{product.price}</span>
                <Button size="sm" variant="outline">Add</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}