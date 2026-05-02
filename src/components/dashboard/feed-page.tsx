"use client";

import { Heart, Share2, MoreVertical, PlayCircle, Image as ImageIcon, Bookmark  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePrototypeStore } from "@/store/use-prototype-store";
import { cn } from "@/lib/utils";

// Mock Data for the Infinite Feed
const feedItems = [
  {
    id: 1,
    type: 'video',
    publisher: "Acadfinity Experts",
    publisherIcon: "A",
    title: "3 Python Tricks You Didn't Know Exist",
    time: "2h ago",
    media: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", // Placeholder, replaced by video UI
    likes: 120,
    isSponsored: false
  },
  {
    id: 2,
    type: 'article',
    publisher: "The Economic Times",
    publisherIcon: "ET",
    title: "Everything Microsoft Is Offering To Stop Students From Buying MacBooks",
    time: "4d ago",
    media: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    likes: 342,
    isSponsored: false
  },
  {
    id: 3,
    type: 'announcement',
    publisher: "Delhi Public School",
    publisherIcon: "D",
    title: "Important Notice: Term 2 Fee Payment Deadline Extended",
    time: "1d ago",
    media: null,
    content: "Please note that the deadline for the Term 2 tuition fees has been extended to November 15th due to the upcoming Diwali holidays. Payments can be made directly via the ERP portal.",
    likes: 45,
    isSponsored: false
  },
  {
    id: 4,
    type: 'article',
    publisher: "Science Today",
    publisherIcon: "ST",
    title: "Why More Drivers Are Wrapping Their Car Keys In Aluminum Foil",
    time: "1d ago",
    media: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop",
    likes: 890,
    isSponsored: false
  }
];

export default function FeedPage() {
  const { setShortsOpen } = usePrototypeStore();

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6 pb-24 md:pb-10 pt-2 animate-in fade-in duration-500">
      
      {/* Mobile Top Header (Since the main header might be hidden or scrolled away) */}
      <div className="flex md:hidden items-center justify-between px-4 pb-2">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Your Feed</h1>
      </div>

      {feedItems.map((item) => (
        <article key={item.id} className="bg-white border-y md:border border-slate-200 md:rounded-2xl overflow-hidden shadow-sm">
          
          {/* Publisher Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-inner",
                item.publisher === "Delhi Public School" ? "bg-primary" : 
                item.publisher === "The Economic Times" ? "bg-rose-600" : "bg-slate-800"
              )}>
                {item.publisherIcon}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  {item.publisher}
                  {item.isSponsored && <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Sponsored</span>}
                </span>
                <span className="text-xs text-slate-500 font-medium">{item.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-7 rounded-full text-xs font-bold px-4 hidden sm:flex">Follow</Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900"><MoreVertical className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Media Content */}
          {item.type === 'video' && (
            <div 
              onClick={() => setShortsOpen(true)} 
              className="w-full aspect-[4/5] sm:aspect-video bg-slate-900 relative cursor-pointer group"
            >
              {/* Fake Video Preview - Click opens the actual Shorts Player */}
              <img src={item.media} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl border border-white/20">
                   <PlayCircle className="h-8 w-8 text-white fill-white/20" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                Skill Bite
              </div>
            </div>
          )}

          {item.type === 'article' && item.media && (
            <div className="w-full aspect-video sm:aspect-[21/9] bg-slate-100 relative overflow-hidden">
              <img src={item.media} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}

          {item.type === 'announcement' && item.content && (
            <div className="px-4 pb-2">
              <p className="text-sm text-slate-600 leading-relaxed font-medium bg-blue-50 p-4 rounded-xl border border-blue-100">
                {item.content}
              </p>
            </div>
          )}

          {/* Post Title & Actions */}
          <div className="p-4 pt-3">
            <h2 className="text-lg md:text-xl font-black text-slate-900 leading-tight tracking-tight mb-4">
              {item.title}
            </h2>
            
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-rose-500 transition-colors group">
                  <Heart className="h-5 w-5 group-hover:fill-rose-500" />
                  <span className="text-xs font-bold">{item.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              <button className="text-slate-400 hover:text-amber-500 transition-colors group">
                <Bookmark className="h-5 w-5 group-hover:fill-amber-500" />
              </button>
            </div>
          </div>

        </article>
      ))}
    </div>
  );
}