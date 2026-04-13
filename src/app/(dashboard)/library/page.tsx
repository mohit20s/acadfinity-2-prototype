import { Search, Book, PlayCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const libraryItems = [
  { id: 1, title: "The Solar System Guide", type: "Digital Book", subject: "Science", age: "8-12 yrs", status: "Available" },
  { id: 2, title: "Advanced Lego Robotics", type: "Physical Toy", subject: "STEM", age: "10-15 yrs", status: "Waitlist" },
  { id: 3, title: "Interactive Phonics App", type: "Digital Access", subject: "English", age: "4-7 yrs", status: "Available" },
  { id: 4, title: "History of India Vol 1", type: "Physical Book", subject: "History", age: "12-16 yrs", status: "Available" },
];

export default function LibraryPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold mb-3">
            Premium Module Active
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Books & Toys Digital Library</h1>
          <p className="text-primary-foreground/80 max-w-lg text-sm md:text-base">
            Access thousands of physical books, educational toys, and digital learning apps. 
            Included in your school's current ecosystem subscription.
          </p>
        </div>
        
        <div className="relative z-10 w-full md:w-auto">
          <div className="bg-white p-4 rounded-xl shadow-lg flex items-center gap-4 text-slate-900 w-full md:w-64">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Book className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Your Quota</p>
              <p className="font-bold text-lg leading-tight">3 items left</p>
              <p className="text-[10px] text-slate-400">Renews next month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div className="flex gap-6">
          <button className="text-sm font-semibold text-primary border-b-2 border-primary pb-4 -mb-4">Explore Catalog</button>
          <button className="text-sm font-medium text-slate-500 hover:text-slate-900 pb-4 -mb-4">My Issued Items</button>
          <button className="text-sm font-medium text-slate-500 hover:text-slate-900 pb-4 -mb-4">Digital Access</button>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <input type="text" placeholder="Search books, toys, apps..." className="h-9 w-full rounded-md border border-slate-300 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
        {libraryItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col hover:border-primary/50 transition-colors">
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${item.type.includes('Digital') ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                {item.type.includes('Digital') ? <Smartphone className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${item.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                {item.status}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-900 mb-1 leading-tight">{item.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{item.subject} • {item.age}</p>
            
            <div className="mt-auto pt-4 border-t border-slate-100">
              <Button className="w-full" variant={item.status === 'Available' ? 'default' : 'secondary'} disabled={item.status !== 'Available'}>
                {item.type.includes('Digital') ? 'Open Resource' : (item.status === 'Available' ? 'Request Issue' : 'Join Waitlist')}
              </Button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}