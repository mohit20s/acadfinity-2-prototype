"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const megaCategories = [
  {
    title: 'Uniforms & Essentials',
    slug: 'uniforms',
    subs: [
      { name: 'Summer Uniforms', slug: 'summer', items: [{ name: 'Shirts', slug: 'shirts' }, { name: 'Trousers', slug: 'trousers' }] },
      { name: 'Winter Uniforms', slug: 'winter', items: [{ name: 'Sweaters', slug: 'sweaters' }, { name: 'Blazers', slug: 'blazers' }] },
    ]
  },
  {
    title: 'Books & Materials',
    slug: 'books',
    subs: [
      { name: 'Teacher Resources', slug: 'teacher', items: [{ name: 'Manuals', slug: 'manuals' }, { name: 'Question Banks', slug: 'qbanks' }] },
      { name: 'Course Books', slug: 'course', items: [{ name: 'Primary (I-V)', slug: 'primary' }, { name: 'Secondary (IX-X)', slug: 'secondary' }] }
    ]
  },
  { title: 'Library Books', slug: 'library', subs: [{ name: 'Genres', slug: 'genres', items: [{ name: 'Children’s Books', slug: 'children' }, { name: 'Fiction', slug: 'fiction' }] }] },
  { title: 'Stationery & Craft', slug: 'stationery', subs: [{ name: 'Supplies', slug: 'supplies', items: [{ name: 'Craft Materials', slug: 'craft' }, { name: 'Office Stationery', slug: 'office' }] }] },
  { title: 'Toys & Play Gears', slug: 'toys', subs: [{ name: 'Equipment', slug: 'equipment', items: [{ name: 'Swings & Slides', slug: 'swings' }, { name: 'Montessori Toys', slug: 'montessori' }] }] },
  { title: 'Indoor & Outdoor Games', slug: 'games', subs: [{ name: 'Sports', slug: 'sports', items: [{ name: 'Ground Games', slug: 'ground' }, { name: 'Board Games', slug: 'board' }] }] },
  { title: 'Labs & Practical', slug: 'labs', subs: [{ name: 'Lab Suites', slug: 'suites', items: [{ name: 'Science Lab', slug: 'science' }, { name: 'Robotics Lab', slug: 'robotics' }] }] },
  { title: 'Infrastructure', slug: 'infra', subs: [{ name: 'Furniture', slug: 'furniture', items: [{ name: 'Seating', slug: 'seating' }, { name: 'Tables & Desks', slug: 'tables' }] }] },
];

export function SiteHeader() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [megaMenu, setMegaMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const [activeCat, setActiveCat] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [openHub, setOpenHub] = useState(false);
  const [openCats, setOpenCats] = useState<number[]>([]);
  const [openSubs, setOpenSubs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const cartCount = 2;
  const wishlistCount = 1;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollPos && currentScroll > 20) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollPos(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos]);

  const toggleMobileCat = (index: number) => {
    if (openCats.includes(index)) setOpenCats(openCats.filter(i => i !== index));
    else setOpenCats([...openCats, index]);
  };
  const toggleMobileSub = (slug: string) => {
    if (openSubs.includes(slug)) setOpenSubs(openSubs.filter(s => s !== slug));
    else setOpenSubs([...openSubs, slug]);
  };

  return (
    <header className={cn("fixed top-0 left-0 w-full z-[100] transition-transform duration-500 ease-in-out", (showNavbar || mobileMenu) ? "translate-y-0" : "-translate-y-full")}>
      
      {/* ===================================================================== */}
      {/* DESKTOP HEADER */}
      {/* ===================================================================== */}
      <div className="hidden lg:block px-6 py-1">
        <div className="max-w-[1750px] mx-auto flex flex-col gap-1">
          
          {/* Top Bar */}
          <div className="flex justify-end pr-4">
            <div className="bg-slate-900/95 backdrop-blur-md px-6 py-2 rounded-full flex gap-8 shadow-2xl items-center border border-white/10">
              <div className="flex items-center gap-3 border-r border-white/10 pr-8">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_12px_#f97316]"></span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/90">Ecosystem Active</span>
              </div>
              <div className="flex gap-6">
                <Link href="/about" className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all">About Us</Link>
                <Link href="/blog" className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all">Blogs</Link>
                <Link href="/vendor-login" className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-all">Vendor Login</Link>
              </div>
              <Link href="/login" className="bg-orange-500 text-white pl-2 pr-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all flex items-center gap-3 shadow-lg active:scale-95 group">
                <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-slate-900/10 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                Institute Login
              </Link>
            </div>
          </div>

          {/* Main Navigation Bar */}
          <div className="flex items-center gap-5">
            
            {/* --- DESKTOP LOGO UPDATED --- */}
            <div className="bg-white rounded-r-[2.5rem] rounded-l-none pl-12 pr-10 py-4 shadow-[15px_10px_40px_rgba(0,0,0,0.1)] border-y border-r border-slate-100 flex items-center -ml-6 shrink-0">
              <Link href="/" className="relative group">
                <img src="/images/logo.png" alt="Acadfinity" className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
              </Link>
            </div>

            <nav className="bg-white/95 backdrop-blur-2xl rounded-full px-10 py-3 flex-1 flex justify-between items-center shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-slate-100 relative mr-4">
              <div className="flex items-center gap-8">
                
                <Link href="/" className="relative text-[14px] font-black uppercase tracking-[0.2em] py-1 text-orange-500 group">
                  Home <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-500 rounded-full"></span>
                </Link>
                <Link href="/diagnostics" className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-orange-500 transition-all">Diagnostic</Link>
                <Link href="/lms"className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-orange-500 transition-all">Knowleadge Hub</Link>
<Link href="/service-hub"className="text-[14px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-orange-500 transition-all">Service Hub</Link>
                {/* THE MEGA MENU TRIGGER */}
                <div className="relative" onMouseEnter={() => setMegaMenu(true)} onMouseLeave={() => setMegaMenu(false)}>
                  <Link href="/marketplace" className={cn("py-4 text-[14px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 group", megaMenu ? "text-orange-500" : "text-slate-500 hover:text-orange-500")}>
                    Procurement Hub
                    <svg className={cn("w-4 h-4 transition-transform duration-300", megaMenu ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  
                  {/* MEGA MENU CONTENT */}
                  <div className={cn("absolute left-1/2 -translate-x-[30%] top-full mt-2 w-[95vw] xl:w-[1300px] bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 flex items-stretch z-[100] h-[600px] transition-all duration-300", megaMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none")}>
                    
                    <div className="w-[260px] bg-slate-900 p-4 space-y-2 h-full overflow-y-auto shrink-0 scrollbar-hide">
                      {megaCategories.map((cat, index) => (
                        <Link href={`/marketplace`} key={index} onMouseEnter={() => { setActiveCat(index); setActiveSub(0); }} className={cn("w-full text-left px-5 py-3.5 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-200 flex justify-between items-center group relative overflow-hidden", activeCat === index ? "bg-orange-500 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-white/5")}>
                          <span className="relative z-10">{cat.title}</span>
                          <svg className={cn("w-3.5 h-3.5 opacity-50 relative z-10 transition-transform duration-300", activeCat === index ? "translate-x-1 opacity-100" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3"/></svg>
                        </Link>
                      ))}
                    </div>

                    <div className="w-[300px] bg-slate-50 p-6 border-r border-slate-100 h-full overflow-y-auto shrink-0 scrollbar-hide">
                      <div className="space-y-2">
                        {megaCategories[activeCat]?.subs?.map((sub, index) => (
                          <Link href={`/marketplace`} key={index} onMouseEnter={() => setActiveSub(index)} className={cn("w-full text-left px-5 py-3.5 rounded-xl text-[14px] font-extrabold transition-all duration-200 flex justify-between items-center group", activeSub === index ? "bg-white text-orange-500 shadow-sm ring-1 ring-slate-100" : "text-slate-600 hover:bg-white hover:shadow-sm")}>
                            <span>{sub.name}</span>
                            <div className={cn("w-1.5 h-1.5 rounded-full bg-orange-500 transition-all duration-300 transform", activeSub === index ? "scale-100 opacity-100" : "scale-0 opacity-0")}></div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="flex-1 p-10 bg-white h-full overflow-y-auto scrollbar-hide">
                      {megaCategories[activeCat]?.subs?.[activeSub] ? (
                        <div>
                          <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tighter mb-8 pb-4 border-b border-slate-100/50">{megaCategories[activeCat].subs[activeSub].name}</h2>
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            {megaCategories[activeCat].subs[activeSub].items?.map(item => (
                              <Link href={`/marketplace`} key={item.slug} className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="w-5 h-5 mt-0.5 shrink-0 rounded text-orange-500/50 group-hover/item:text-orange-500 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                                <span className="text-[13px] font-bold text-slate-600 group-hover/item:text-slate-900 leading-snug transition-colors">{item.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-300">
                          <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeWidth="1.5"/></svg>
                          <span className="text-sm font-bold uppercase tracking-widest">Select a category</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="relative group/search">
                  <div className="relative flex items-center bg-slate-50/80 rounded-full px-4 py-2 border border-transparent focus-within:border-orange-500/30 transition-all duration-500 w-32 focus-within:w-56 shadow-inner">
                    <button onClick={() => setShowSearchResults(true)}><svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="3"/></svg></button>
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="bg-transparent border-none outline-none text-[12px] font-bold text-slate-600 placeholder-slate-300 ml-2 w-full" />
                  </div>
                </div>
                
                <Link href="#" className="relative text-slate-400 hover:text-orange-500 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="1.8"/></svg>
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{wishlistCount}</span>
                </Link>

                <div className="w-px h-6 bg-slate-200"></div>

                <Link href="/contact" className="bg-slate-900 text-white px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 transition-all shadow-xl active:scale-95 shrink-0">
                  Contact Us
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE HEADER */}
      {/* ===================================================================== */}
      <div className="lg:hidden px-3 py-2 md:px-6 md:py-3 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 pt-safe-area-inset-top">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* --- MOBILE LOGO UPDATED --- */}
          <Link href="/" className="block p-1.5 md:p-2 bg-white rounded-2xl shadow-md border border-slate-100 shrink-0">
            <img src="/images/logo.png" alt="Acadfinity" className="h-10 md:h-14 w-auto transition-all" />
          </Link>
          
          <div className="flex-1 flex items-center gap-1.5 md:gap-3 bg-white rounded-full p-1.5 md:p-2 shadow-inner border border-slate-100 overflow-hidden">
            <button onClick={() => setMobileMenu(true)} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 active:scale-95 transition-all hover:bg-slate-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
            <div className="relative flex-1 flex items-center min-w-0">
              <svg className="w-4 h-4 text-slate-400 absolute left-3 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" placeholder="Search..." className="w-full bg-slate-50/50 border-none rounded-full pl-3 sm:pl-9 pr-4 py-2 text-xs md:text-sm font-semibold text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-orange-300 transition-all outline-none" />
            </div>
            
            <Link href="#" className="relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 active:scale-95 transition-all hover:text-orange-500">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeWidth="2"></path></svg>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{wishlistCount}</span>
            </Link>
            
            <Link href="/marketplace" className="relative w-9 h-9 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center rounded-full text-slate-500 active:scale-95 transition-all hover:text-orange-500">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeWidth="2"></path></svg>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE MENU DRAWER */}
      {/* ===================================================================== */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in" onClick={() => setMobileMenu(false)}></div>
          
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-[380px] bg-white flex flex-col shadow-2xl rounded-r-[2rem] animate-in slide-in-from-left duration-300">
            <div className="p-6 flex items-center justify-between border-b border-slate-100 shrink-0">
              
              {/* --- DRAWER LOGO UPDATED --- */}
              <img src="/images/logo.png" alt="Acadfinity" className="h-10 w-auto" />
              
              <button onClick={() => setMobileMenu(false)} className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-500 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="3" strokeLinecap="round"/></svg>
              </button>
            </div>
            
            {/* The rest of the drawer remains exactly the same... */}
            <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8 scrollbar-hide bg-white">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Main Menu</p>
                <div className="flex flex-col gap-4">
                  <Link href="/" onClick={() => setMobileMenu(false)} className="text-3xl font-black text-slate-900 tracking-tighter hover:text-orange-500 transition-colors">Home</Link>
                  <Link href="/diagnostics"  onClick={() => setMobileMenu(false)} className="text-3xl font-black text-slate-900 tracking-tighter hover:text-orange-500 transition-colors">Diagnostic Hub</Link>
                   <Link href="/lms"  onClick={() => setMobileMenu(false)} className="text-3xl font-black text-slate-900 tracking-tighter hover:text-orange-500 transition-colors">Knowleadge Hub</Link>
                  <Link href="/service-hub"  onClick={() => setMobileMenu(false)} className="text-3xl font-black text-slate-900 tracking-tighter hover:text-orange-500 transition-colors">Service Hub</Link>
                 
                </div>
              </div>

              {/* Mobile Procurement Accordion */}
              <div className="space-y-4">
                <button onClick={() => setOpenHub(!openHub)} className="w-full flex justify-between items-center text-3xl font-black text-orange-500 tracking-tighter">
                  Procurement Hub
                  <svg className={cn("w-6 h-6 transition-transform", openHub ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                
                {openHub && (
                  <div className="space-y-6 animate-in slide-in-from-top-2">
                    {megaCategories.map((cat, index) => (
                      <div key={index} className="pl-4 border-l-2 border-orange-100">
                        <button onClick={() => toggleMobileCat(index)} className="w-full flex items-center text-left py-2 group gap-2">
                          <span className="flex-1 text-xl font-black text-slate-800 tracking-tight group-hover:text-orange-500 transition-colors text-left">{cat.title}</span>
                          <svg className={cn("w-5 h-5 text-slate-400 transition-transform shrink-0 ml-auto", openCats.includes(index) ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        
                        {openCats.includes(index) && (
                          <div className="mt-2 space-y-4 pl-4 animate-in slide-in-from-top-1">
                            {cat.subs?.map((sub, subIdx) => (
                              <div key={subIdx} className="border-l border-slate-200 pl-4">
                                <button onClick={() => toggleMobileSub(sub.slug)} className="w-full flex items-center text-left py-1.5 group gap-2">
                                  <span className="flex-1 text-sm font-extrabold text-slate-600 group-hover:text-orange-500 transition-colors text-left">{sub.name}</span>
                                  <svg className={cn("w-4 h-4 text-slate-300 transition-transform shrink-0 ml-auto", openSubs.includes(sub.slug) ? "rotate-90" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </button>
                                
                                {openSubs.includes(sub.slug) && (
                                  <div className="mt-2 grid grid-cols-1 gap-2 pl-2 animate-in slide-in-from-top-1">
                                    {sub.items?.map(item => (
                                      <Link href="/marketplace" key={item.slug} onClick={() => setMobileMenu(false)} className="flex items-start text-left gap-2 group/item">
                                        <div className="w-1 h-1 rounded-full bg-slate-300 group-hover/item:bg-orange-500 transition-all mt-1.5 shrink-0"></div>
                                        <span className="flex-1 text-xs font-bold text-slate-400 group-hover/item:text-orange-500 transition-colors text-left">{item.name}</span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <hr className="border-slate-100" />
              <div className="flex flex-col gap-4 text-3xl font-black text-slate-900 tracking-tighter">
                <Link href="/contact" onClick={() => setMobileMenu(false)}>Contact Us</Link>
                <Link href="/about" onClick={() => setMobileMenu(false)} className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">About Us</Link>
              </div>
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-3 shrink-0">
               <Link href="/login" className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-sm">Institute Login</Link>
               <Link href="/vendor-login" className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-sm">Vendor Login</Link>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}