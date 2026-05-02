"use client";

import { Heart, Share2, MoreVertical, PlayCircle, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock Data for the Entry Feed
const feedItems = [
  {
    id: 1, type: 'video', publisher: "Acadfinity Experts", publisherIcon: "A",
    title: "3 Python Tricks You Didn't Know Exist", time: "2h ago",
    media: "/sample-video.mp4", // Using the local video!
    likes: 120, isSponsored: false
  },
  {
    id: 2, type: 'article', publisher: "The Economic Times", publisherIcon: "ET",
    title: "Everything Microsoft Is Offering To Stop Students From Buying MacBooks", time: "4d ago",
    media: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    likes: 342, isSponsored: false
  },
];

export default function EntryFeedPage() {
  const router = useRouter();
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  const handleSkipToApp = () => {
    router.push('/dashboard'); // Go to the main Discovery Hub
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-24">
      
      {/* FLOATING SKIP BUTTON */}
      <div className="fixed top-safe-area-inset-top right-4 z-50 pt-4">
        <Button 
          onClick={handleSkipToApp}
          className="rounded-full font-black px-6 shadow-2xl bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-200"
        >
          Skip to App <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="max-w-xl mx-auto space-y-4 md:space-y-8 pt-20 px-2 md:px-0">
        {feedItems.map((item) => (
          <article key={item.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
            
            {/* Publisher Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-black shadow-inner",
                  item.publisher === "Acadfinity Experts" ? "bg-primary" : "bg-rose-600"
                )}>
                  {item.publisherIcon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-2">{item.publisher}</span>
                  <span className="text-xs text-slate-500 font-medium">{item.time}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900"><MoreVertical className="h-5 w-5" /></Button>
            </div>

            {/* Post Title */}
            <div className="px-5 pb-3">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight">{item.title}</h2>
            </div>

            {/* Media Content */}
            {item.type === 'video' && (
              <div className="w-full aspect-[4/5] bg-slate-900 relative group overflow-hidden">
                {playingVideoId === item.id ? (
                  <video src={item.media} autoPlay loop controls className="absolute inset-0 w-full h-full object-cover z-10" />
                ) : (
                  <>
                    <video src={item.media} muted className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer" onClick={() => setPlayingVideoId(item.id)}>
                      <div className="h-20 w-20 rounded-full bg-primary/90 text-white backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-primary/50">
                         <PlayCircle className="h-10 w-10 fill-white/20" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {item.type === 'article' && (
              <div className="w-full aspect-video bg-slate-100 relative overflow-hidden">
                <img src={item.media} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            )}

            {/* Post Actions */}
            <div className="p-4 flex items-center justify-between bg-slate-50/50 border-t border-slate-100">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors group">
                  <Heart className="h-6 w-6 group-hover:fill-rose-500" /> <span className="text-sm font-bold">{item.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors"><Share2 className="h-6 w-6" /></button>
              </div>
            </div>

          </article>
        ))}
      </div>
    </div>
  );
}