"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// --- DATA ARRAYS ---
const services = [
  { id: 1, title: 'EduGovern', desc: 'Entity Registration, Affiliation, Governance & Compliance. Supports schools with complete regulatory frameworks.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800' },
  { id: 2, title: 'Edu HR', desc: 'Staff Hiring, Training & Support. Build high performing teams through expert recruitment and continuous pedagogy support.', img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800' },
  { id: 3, title: 'Edu Finance', desc: 'Accounting & Compliance. End-to-end financial management, budgeting, and statutory audits for sustainable planning.', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800' },
  { id: 4, title: 'Edu Ops Excellence', desc: 'School Management & Operational Excellence. Structured SOPs and workflow optimization to reduce manual load.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800' },
  { id: 5, title: 'Edu Curriculum', desc: 'Curricular Excellence. NEP-driven learning outcomes focused on strengthening academic and co-curricular delivery.', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800' },
  { id: 6, title: 'Edu Event', desc: 'Activity Management. Planning and on-ground management for academic fairs, celebrations, and annual functions.', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800' },
  { id: 7, title: 'Edu Infra-Serve', desc: 'Infrastructure & Maintenance. Facility audits, campus planning, and housekeeping for a future-ready environment.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800' },
  { id: 8, title: 'Edu After School', desc: 'Beyond Hours Learning. Skill development and enrichment activities that utilize campus effectively beyond classroom hours.', img: 'https://images.unsplash.com/photo-1484662020986-75935d2ebc66?q=80&w=800' },
  { id: 9, title: 'Edu Market', desc: 'Growth Suite. Accelerate admissions through targeted digital campaigns and research-backed branding strategies.', img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=800' },
  { id: 10, title: 'Edu IT Solution', desc: 'Technology Suite. Integrated ERP systems, smart classroom setups, and digital tools for modern school management.', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800' },
  { id: 11, title: 'Edu Transform', desc: 'Personality Development. Empowerment through career counseling, mindset coaching, and structured assessments.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800' }
];

const categories = [
  { title: 'Books & Learning Materials', desc: 'Curriculum-aligned textbooks, workbooks, activity books, and reference materials designed to support structured learning and academic excellence across all grade levels.', icon: 'books.png' },
  { title: 'Stationery & Craft Materials', desc: 'High-quality stationery and creative craft supplies that encourage expression, hands-on learning, and day-to-day classroom efficiency.', icon: 'stationery.png' },
  { title: 'Library Books', desc: 'A wide range of age-appropriate fiction, non-fiction, academic references, and knowledge resources to build strong reading habits and curiosity.', icon: 'library.png' },
  { title: 'Uniform & Essentials', desc: 'School uniforms, accessories, and daily essentials designed for comfort, durability, and institutional consistency.', icon: 'uniform.png' },
  { title: 'Toys & Play Gears', desc: 'Educational toys and play equipment that promote motor skills, creativity, cognitive development, and joyful learning experiences.', icon: 'toys.png' },
  { title: 'Indoor & Outdoor Games', desc: 'Sports equipment and games that support physical fitness, teamwork, and overall student well-being, suitable for indoor and outdoor use.', icon: 'games.png' },
  { title: 'Events & Music', desc: 'Stage props, audio essentials, and musical instruments to support school events, cultural programs, and creative expression.', icon: 'music.png' },
  { title: 'Labs & Practical Learning', desc: 'Science, math, and skill-lab equipment that enable hands-on experiments, practical understanding, and experiential learning.', icon: 'labs.png' },
  { title: 'Infrastructure & Furniture', desc: 'Classroom furniture, storage solutions, and infrastructure essentials designed for safety, comfort, and effective learning environments.', icon: 'furniture.png' },
  { title: 'Health, Hygiene & Safety', desc: 'Sanitation supplies, safety equipment, and health essentials to ensure clean, secure, and compliant school campuses.', icon: 'safety.png' },
  { title: 'Electronics & Technology', desc: 'Smart classroom tools, digital devices, and educational technology solutions that enhance teaching, learning, and school operations.', icon: 'electronics.png' }
];

const testimonials = [
  { name: 'Mr. Sumit D. Gurjar', title: 'Principal - Jack N Jill Senior Secondary School, Jodhpur', quote: 'With Acadfinity’s guidance, our school has truly transformed. We feel empowered to tackle challenges, uplift our students, and create lasting change. Every day, our community grows stronger and more hopeful.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400' },
  { name: 'Dr. Ananya Sharma', title: 'Director - Global Academy, Jaipur', quote: 'The AI-driven diagnostics helped us identify infrastructure gaps we never noticed. Acadfinity is not just a service provider; they are architects of our institutional growth.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400' }
];

// --- MAIN PAGE COMPONENT ---
export default function PublicCinematicHomePage() {
  
  // Hero Slider State
  const [activeBanner, setActiveBanner] = useState(1);
  const totalBanners = 4;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setActiveBanner(prev => prev === totalBanners ? 1 : prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const startDrag = (e: any) => {
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
  };

  const endDrag = (e: any) => {
    if (!isDragging) return;
    setIsDragging(false);
    const currentPosition = e.type.includes('mouse') || e.type === 'mouseleave' ? e.pageX : e.changedTouches[0].clientX;
    const movedBy = currentPosition - startX;

    if (movedBy < -50) setActiveBanner(prev => prev === totalBanners ? 1 : prev + 1);
    else if (movedBy > 50) setActiveBanner(prev => prev === 1 ? totalBanners : prev - 1);
  };

  // Service Deck State
  const [activeService, setActiveService] = useState(0);
  const [isServiceHovered, setIsServiceHovered] = useState(false);

  useEffect(() => {
    if (isServiceHovered) return;
    const interval = setInterval(() => {
      setActiveService(prev => (prev === services.length - 1) ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isServiceHovered]);

  const getPos = (index: number) => {
    let diff = index - activeService;
    const total = services.length;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Procurement Scroll Ref
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [activeProcurement, setActiveProcurement] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcurement(prev => {
        const next = (prev + 1) % categories.length;
        if (scrollTrackRef.current) {
          scrollTrackRef.current.scrollTo({ left: next * 340, behavior: 'smooth' });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden pb-20">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ken-burns { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
        .animate-ken-burns { animation: ken-burns 10s ease-out forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}} />

      {/* =========================================================
          1. HIGH-IMPACT CINEMATIC HERO SECTION
          ========================================================= */}
      <section className="relative mt-5 pt-28 lg:pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-orange-500/10 rounded-full blur-[100px] md:blur-[120px] -z-10 animate-pulse pointer-events-none"></div>

        <div className="w-full max-w-[98%] 2xl:max-w-[1750px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            <div className="lg:col-span-9 relative">
                <div className="relative bg-orange-500 p-1 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_60px_-15px_rgba(249,115,22,0.25)] border border-white/50 overflow-hidden">
                    <div 
                      onMouseDown={startDrag} onTouchStart={startDrag} onMouseUp={endDrag} onMouseLeave={endDrag} onTouchEnd={endDrag}
                      className={cn("relative w-full overflow-hidden bg-slate-900 group select-none rounded-[2rem] md:rounded-[3.2rem] aspect-[2200/1238]", isDragging ? "cursor-grabbing" : "cursor-grab")}
                    >
                        <div className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: `translateX(-${(activeBanner - 1) * 100}%)` }}>
                            {/* --- USING YOUR LOCAL BANNER IMAGES --- */}
                            <div className="w-full h-full flex-shrink-0 relative overflow-hidden">
                                <img src="/images/banner1.png" className="w-full h-full object-cover animate-ken-burns pointer-events-none" draggable="false" alt="Banner 1" />
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                            <div className="w-full h-full flex-shrink-0 relative overflow-hidden">
                                <img src="/images/banner2.png" className="w-full h-full object-cover animate-ken-burns pointer-events-none" draggable="false" alt="Banner 2" />
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                            <div className="w-full h-full flex-shrink-0 relative overflow-hidden">
                                <img src="/images/banner3.png" className="w-full h-full object-cover animate-ken-burns pointer-events-none" draggable="false" alt="Banner 3" />
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                            <div className="w-full h-full flex-shrink-0 relative overflow-hidden">
                                <img src="/images/banner4.png" className="w-full h-full object-cover animate-ken-burns pointer-events-none" draggable="false" alt="Banner 4" />
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20 pointer-events-auto">
                            {[1, 2, 3, 4].map((i) => (
                                <button key={i} onClick={(e) => { e.stopPropagation(); setActiveBanner(i); }} className="group flex flex-col gap-2 py-2 outline-none">
                                    <div className="w-10 md:w-16 h-1 rounded-full bg-white/40 overflow-hidden backdrop-blur-sm">
                                        <div className="h-full bg-orange-500 transition-all duration-[500ms]" style={{ width: activeBanner === i ? '100%' : '0%' }}></div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
           
            <div className="lg:col-span-3 flex flex-col justify-center px-4 h-full">
                <div className="space-y-8">
                    <div className="group cursor-default">
                        <div className="w-16 h-1.5 bg-orange-500 mb-8 rounded-full"></div>
                       <h1 className="text-4xl lg:text-5xl xl:text-5xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-6 uppercase">
                            Enabling Schools <br/><span className="text-orange-500 italic"> Accelerating Outcomes</span>
                        </h1>
                    </div>
                    <p className="text-xl text-slate-400 font-medium leading-tight italic border-l-4 border-orange-500/20 pl-6">
                        Architecture for <span className="text-slate-900 font-black">Modern</span> Institutions
                    </p>
                    <Link href="/solutions">
                      <button className="w-full mt-8 bg-slate-900 text-white py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-orange-500 transition-all">
                          Explore Platforms
                      </button>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* =========================================================
          2. CINEMATIC DIAGNOSTIC SECTION 
          ========================================================= */}
      <section className="py-10 md:py-10 px-4 bg-white">
        <div className="max-w-[1550px] mx-auto"> 
            <div className="relative bg-slate-50 rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-slate-100 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.07)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    
                    <div className="lg:col-span-5 p-10 md:p-16 lg:p-20 xl:p-24 flex flex-col justify-center relative z-10">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-10 h-[2px] bg-orange-500"></span>
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">Integrated Intelligence</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-8 uppercase">
                            AI-Driven School<br/> <span className="text-orange-500 italic"> Growth Diagnostic</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-sm italic">
                            Our proprietary engine provides a <span className="text-slate-900 font-bold underline decoration-orange-500/30">360° health audit</span> identified in real-time for institutional excellence.
                        </p>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-center gap-5 group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5"/></svg>
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-600">Compliance Tracking</span>
                            </div>
                            <div className="flex items-center gap-5 group cursor-pointer">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2.5"/></svg>
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-600">Gap Analysis</span>
                            </div>
                        </div>

                        <Link href="/library">
                          <button className="w-fit bg-slate-900 text-white px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-500 transition-all shadow-2xl hover:-translate-y-1 active:scale-95">
                              Run Global Report
                          </button>
                        </Link>
                    </div>

                    <div className="lg:col-span-7 relative p-6 lg:p-12 xl:p-16 h-full min-h-[400px]"> 
                        <div className="relative overflow-hidden rounded-[3rem] shadow-[0_50px_80px_-20px_rgba(0,0,0,0.2)] h-full w-full bg-white group">
                            {/* --- USING YOUR LOCAL DIAGNOSTIC BANNER --- */}
                            <img src="/images/Diagnostic Section banner.png" alt="Diagnostic Banner" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent opacity-60"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* =========================================================
          3. THEME: DARK BLUE & ORANGE SERVICE DECK (11 Modules)
          ========================================================= */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
            
            <div className="text-center mb-18">
                <div className="inline-flex items-center gap-2 bg-slate-900 px-5 py-2 rounded-full mb-6 border border-white/10 shadow-xl">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">11 Integrated Modules</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                    The <span className="text-orange-500 italic">Service Deck.</span>
                </h2>
                <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-8 rounded-full"></div>
            </div>

            <div 
              className="relative flex justify-center items-center h-[650px] w-full mt-10" 
              onMouseEnter={() => setIsServiceHovered(true)} 
              onMouseLeave={() => setIsServiceHovered(false)}
            >
                {services.map((service, index) => {
                  const pos = getPos(index);
                  const isCenter = pos === 0;
                  const isAdj = Math.abs(pos) === 1;
                  const isHidden = Math.abs(pos) > 1;

                  return (
                    <div 
                        key={service.id}
                        className={cn("absolute transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer",
                            isCenter && "z-30 scale-110 opacity-100",
                            isAdj && "z-20 scale-90 opacity-20 blur-[4px]",
                            isHidden && "z-10 scale-75 opacity-0 pointer-events-none"
                        )}
                        style={{ transform: `translateX(${pos * 135}%)` }} 
                        onClick={() => setActiveService(index)}
                    >
                        <div className="w-[320px] md:w-[500px] bg-white rounded-[4rem] shadow-[0_60px_100px_-20px_rgba(15,23,42,0.2)] overflow-hidden border border-slate-100 group">
                            
                            <div className="h-64 relative overflow-hidden">
                                <img src={service.img} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/60 via-transparent to-transparent opacity-80"></div>
                            </div>

                            <div className="p-10 md:p-14 relative bg-white min-h-[360px] flex flex-col justify-between">
                                <div className="absolute -top-10 left-12 w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-orange-500 shadow-2xl transition-transform group-hover:-translate-y-2 group-hover:bg-orange-500 group-hover:text-white">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2"/></svg>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4 italic leading-none">{service.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-semibold italic border-l-2 border-orange-500/30 pl-4">{service.desc}</p>
                                </div>
                                <Link href="/solutions">
                                  <button className="group/btn relative overflow-hidden w-full mt-8 bg-slate-900 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl transition-all duration-500">
                                      <span className="relative z-10">View Specifications</span>
                                      <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                                  </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex flex-col items-center gap-10 mt-6">
                <div className="flex justify-center items-center gap-16">
                    <button onClick={() => setActiveService(prev => prev === 0 ? services.length - 1 : prev - 1)} className="p-5 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-90 group">
                        <svg className="w-8 h-8 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3"/></svg>
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="flex items-baseline gap-1">
                            <span className="text-orange-500 font-black italic text-6xl leading-none">{(activeService + 1).toString().padStart(2, '0')}</span>
                            <span className="text-slate-900 font-black text-xl">/ 11</span>
                        </div>
                        <span className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.5em] mt-4">Integrated Ecosystem</span>
                    </div>
                    <button onClick={() => setActiveService(prev => prev === services.length - 1 ? 0 : prev + 1)} className="p-5 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-xl active:scale-90 group">
                        <svg className="w-8 h-8 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3"/></svg>
                    </button>
                </div>
                <div className="flex gap-2 max-w-2xl w-full px-10">
                    {services.map((s, i) => (
                        <div key={s.id} onClick={() => setActiveService(i)} className={cn("h-1 rounded-full transition-all duration-[1000ms] flex-1 cursor-pointer", activeService === i ? 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]' : 'bg-slate-100')}></div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* =========================================================
          4. PREMIUM AUTOMATIC CATEGORY TRACK
          ========================================= */}
      <section className="py-20 px-6 bg-slate-50/50 overflow-hidden">
        <div className="max-w-[1700px] mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                    Procurement<span className="text-orange-500 italic">Hub</span>
                </h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]"></div>
            </div>

            <div ref={scrollTrackRef} className="flex gap-8 overflow-x-auto pb-16 pt-4 scrollbar-hide snap-x snap-mandatory scroll-smooth -mx-6 px-6">
                {categories.map((cat, index) => (
                    <Link href="/marketplace" key={index} className="flex-none w-[310px] snap-center group">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-orange-500/20 hover:-translate-y-4 transition-all duration-500 flex flex-col items-center text-center h-[400px] relative overflow-hidden cursor-pointer">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                            
                            {/* --- USING YOUR LOCAL ICONS --- */}
                            <div className="w-32 h-32 flex items-center justify-center mb-10 transform group-hover:scale-110 transition-transform duration-500 relative">
                                <div className="absolute inset-0 bg-slate-50 rounded-[2rem] group-hover:bg-orange-50 transition-colors duration-500"></div>
                                <img src={`/images/icons/${cat.icon}`} alt={cat.title} className="w-16 h-16 object-contain relative z-10 filter group-hover:brightness-110 transition-all duration-500" />
                            </div>

                            <div className="mt-auto">
                                <h4 className="text-base font-black text-slate-900 uppercase tracking-wider mb-4 leading-tight group-hover:text-orange-500 transition-colors">{cat.title}</h4>
                                <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed line-clamp-3 group-hover:text-slate-600">{cat.desc}</p>
                            </div>
                            <div className="mt-6 w-8 h-1 bg-slate-100 rounded-full group-hover:w-16 group-hover:bg-orange-500 transition-all duration-500"></div>
                        </div>
                    </Link>
                ))}
            </div>
            
            <div className="flex justify-center gap-3 mt-4">
                {categories.map((cat, index) => (
                    <button key={index} onClick={() => { setActiveProcurement(index); scrollTrackRef.current?.scrollTo({left: index * 340, behavior: 'smooth'}); }} className={cn("h-1.5 rounded-full transition-all duration-500", activeProcurement === index ? 'w-12 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'w-2 bg-slate-200')}></button>
                ))}
            </div>
        </div>
      </section>

      {/* =========================================================
          5. ABOUT ACADFINITY
          ========================================= */}
      <section className="py-24 px-6 bg-white overflow-hidden">
          <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative group">
                  <div className="absolute -inset-10 bg-orange-500/5 rounded-full blur-[100px] -z-10 group-hover:bg-orange-500/10 transition-all duration-1000"></div>
                  <div className="relative bg-white p-3 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(15,23,42,0.15)] border border-slate-50 overflow-hidden">
                      <div className="rounded-[2.8rem] overflow-hidden h-[500px] md:h-[600px]">
                          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600" alt="About Acadfinity" className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
                      </div>
                      <div className="absolute bottom-10 left-10 bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl animate-bounce-slow">
                          <p className="text-orange-500 font-black text-3xl italic leading-none mb-1">#1</p>
                          <p className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Ecosystem Partner</p>
                      </div>
                  </div>
              </div>

              <div className="lg:col-span-7 space-y-10">
                  <div>
                      <div className="inline-flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full mb-8 border border-slate-100">
                          <span className="w-10 h-[1px] bg-orange-500"></span>
                          <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Our Purpose</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85] mb-8">
                          About <br/> <span className="text-orange-500 italic">Acadfinity.</span>
                      </h2>
                      <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed italic border-l-8 border-orange-500/20 pl-8 mb-10">
                          Acadfinity is India’s most trusted <span className="text-slate-900 font-black">K–12 school ecosystem partner</span>, built to help educational institutions move beyond traditional management.
                      </p>
                      <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-2xl">
                          Through an integrated suite of governance, academic, operational, technology, and transformation services, powered by AI-driven diagnostics, we enable schools to operate smarter, grow faster, and deliver better outcomes.
                      </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-start gap-4 group">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 flex-shrink-0 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3"/></svg>
                          </div>
                          <div>
                              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Measurable Growth</h4>
                              <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">Achieve sustainable expansion through structured frameworks.</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 flex-shrink-0 flex items-center justify-center text-white group-hover:bg-orange-500 transition-all duration-500">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="3"/></svg>
                          </div>
                          <div>
                              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">AI Diagnostics</h4>
                              <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">Identify gaps and performance opportunities in real-time.</p>
                          </div>
                      </div>
                  </div>
                  
                  <div className="pt-6">
                      <Link href="/about">
                        <button className="group relative overflow-hidden bg-slate-900 text-white px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all">
                            <span className="relative z-10">Explore Our Ecosystem</span>
                            <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                        </button>
                      </Link>
                  </div>
              </div>
          </div>
      </section>

      {/* =========================================================
          6. WHY CHOOSE ACADFINITY
          ========================================================= */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                  <div>
                      <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">Why Choose <br/> Acadfinity?</h2>
                      <p className="text-xl md:text-2xl font-bold text-orange-500 leading-tight">Your School's Growth Partner, <br/> <span className="opacity-80">Not Just a Vendor</span></p>
                  </div>
                  <div className="relative flex justify-center items-center">
                      <div className="absolute -top-4 -right-4 text-orange-200 opacity-100 font-bold text-4xl"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-2 border-orange-200 rotate-45"></div>
                      <div className="relative w-full max-w-md">
                         {/* --- USING YOUR LOCAL IMAGE --- */}
                         <img src="/images/whychooseus.png" className="w-full h-auto object-contain mix-blend-multiply opacity-100" alt="Why Choose Us" />
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                  {[
                    { t: "Integrated Ecosystem", d: "One platform connecting governance, academics & digital growth." },
                    { t: "NEP 2020 Aligned", d: "NEP compliance is today's need, we help your school achieve it seamlessly." },
                    { t: "Proven Expertise", d: "Backed by 20+ years of founders' experience in India's K-12 ecosystem." },
                    { t: "AI-Driven Diagnostics", d: "Data-led insights for measurable school growth." },
                    { t: "Quality Assured", d: "Verified vendors + smart analytics for high-standard sourcing." },
                    { t: "Revenue for Schools", d: "Earn commissions through our B2B2C model without compromising integrity." },
                    { t: "End-to-End", d: "Complete school improvement from Governance to Growth." },
                    { t: "Customized", d: "No hard selling - tailored solutions specifically for your school." }
                  ].map(feature => (
                    <div key={feature.t} className="flex gap-6 items-start">
                        <div className="w-14 h-14 shrink-0 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 01-2 2H7a1 1 0 01-1-1V4a2 2 0 114 0v1a1 1 0 01-2 2h4a1 1 0 011 1v1a2 2 0 11-4 0v-1a1 1 0 011-1h2a1 1 0 011 1v1a2 2 0 11-4 0v-1a1 1 0 011-1zM12 14a2 2 0 100-4 2 2 0 000 4z" /></svg>
                        </div>
                        <div>
                            <h4 className="text-xl font-extrabold text-slate-900 mb-2">{feature.t}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed text-justify">{feature.d}</p>
                        </div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* =========================================================
          7. REGISTERED INSTITUTES
          ========================================= */}
      <section className="py-20 px-6 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm border border-slate-100">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Our Trusted Network</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4 leading-none">
                      Registered <span className="text-orange-500 italic">Institutes.</span>
                  </h2>
                  <p className="text-slate-400 text-sm font-medium italic">Discover the growing community of schools powered by Acadfinity.</p>
              </div>

              <div className="max-w-2xl mx-auto mb-20">
                  <div className="relative group">
                      <input type="text" placeholder="Search Your Registered Institute..." className="w-full bg-white border border-slate-200 rounded-full py-5 px-8 text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all shadow-sm group-hover:shadow-md italic font-medium" />
                      <div className="absolute right-3 top-2.5">
                          <button className="bg-slate-900 text-white p-3 rounded-full hover:bg-orange-500 transition-colors shadow-lg">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5"/></svg>
                          </button>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  <div className="group relative bg-white rounded-[2.5rem] p-8 border border-white shadow-sm hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-3 cursor-pointer flex flex-col items-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]"></div>
                      <div className="relative z-10 w-full aspect-square flex items-center justify-center mb-6">
                          {/* --- USING YOUR LOCAL LOGO IMAGE --- */}
                          <img src="/images/jack-n-jill.png" alt="Jack N Jill" className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="relative z-10 text-center">
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest group-hover:text-orange-500 transition-colors">JACK N JILL</h4>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-2">Certified Partner</p>
                      </div>
                      <div className="absolute top-6 right-6 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></div>
                  </div>

                  <div className="group relative bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-3 cursor-pointer flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-black text-slate-300 mb-6 shadow-sm">+</div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Register Your School</h4>
                      <Link href="/contact" className="text-[9px] text-orange-500 font-bold uppercase tracking-widest mt-2 hover:underline">Apply Now</Link>
                  </div>
              </div>
          </div>
      </section>

      {/* =========================================================
          8. TESTIMONIALS
          ========================================================= */}
      <section className="py-20 px-4 bg-white overflow-hidden pb-32">
          <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full mb-6 shadow-xl">
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Voices of Leadership</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                      What Schools <span className="text-orange-500 italic border-b-4 border-orange-100">Say.</span>
                  </h2>
              </div>

              <div className="relative max-w-5xl mx-auto">
                  <div className="absolute -top-10 -left-10 text-slate-100 text-9xl font-black select-none z-0">“</div>
                  
                  <div className="relative z-10 bg-white rounded-[4rem] p-8 md:p-16 border border-slate-50 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.1)] flex flex-col md:flex-row items-center gap-12 animate-in fade-in duration-700">
                      <div className="relative shrink-0">
                          <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-2xl"></div>
                          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-slate-50 overflow-hidden shadow-2xl relative z-10">
                              <img src={testimonials[activeTestimonial].image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Principal" />
                          </div>
                      </div>
                      <div className="flex flex-col text-center md:text-left">
                          <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full mx-auto md:mx-0"></div>
                          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed italic mb-10">{testimonials[activeTestimonial].quote}</p>
                          <div>
                              <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{testimonials[activeTestimonial].name}</h4>
                              <p className="text-[11px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-2">{testimonials[activeTestimonial].title}</p>
                          </div>
                      </div>
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 -left-20 -right-20 justify-between pointer-events-none hidden xl:flex">
                      <button onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)} className="w-14 h-14 rounded-full bg-white shadow-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition-all pointer-events-auto active:scale-90 group"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3"/></svg></button>
                      <button onClick={() => setActiveTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)} className="w-14 h-14 rounded-full bg-slate-900 shadow-2xl flex items-center justify-center text-white hover:bg-orange-500 transition-all pointer-events-auto active:scale-90 group"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3"/></svg></button>
                  </div>
              </div>
              
              <div className="flex justify-center gap-3 mt-16">
                  {testimonials.map((_, index) => (
                      <button key={index} onClick={() => setActiveTestimonial(index)} className={cn("h-1.5 rounded-full transition-all duration-500", activeTestimonial === index ? 'w-12 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'w-2 bg-slate-200')}></button>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
}