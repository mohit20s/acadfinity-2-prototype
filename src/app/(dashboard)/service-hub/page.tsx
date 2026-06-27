"use client";

import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- MOCK DATA TRANSFERRED FROM ALPINE.JS ---
const modules = [
  { id: 'govern', title: 'Edu Govern' },
  { id: 'hr', title: 'Edu HR' },
  { id: 'ops', title: 'Edu Ops Excellence' },
  { id: 'curriculum', title: 'Edu Curriculum' },
  { id: 'infra', title: 'Edu Infra-Serve' },
  { id: 'after', title: 'Edu After School' },
  { id: 'finance', title: 'Edu Finance' },
  { id: 'event', title: 'Edu Events' },
  { id: 'transform', title: 'Edu Transform' },
  { id: 'it', title: 'Edu IT Solution' },
  { id: 'market', title: 'Edu Market' }
];

const serviceData: Record<string, any> = {
  'Edu Govern': {
      desc: 'Edu Govern is a comprehensive governance, affiliation, and compliance solution designed to empower schools. Covering the complete lifecycle, from entity registration and board affiliation to compliance management and brand protection, we provide end-to-end support with expert advisory and digital tools.',
      banner: '/images/banners/governance.png',
      rows: [
          { offer: 'Governance Advisory & Compliance Calendar', deliverables: ['Annual calendar of CBSE/RBSE/RTE/Udise compliance', 'Timely updates, alerts & reminders related to school governance & regulatory changes'] },
          { offer: 'School Entity Formation & Governance', deliverables: ['School entity selection advisory', 'Society/Trust/Company name suggestion & registration', 'Constitution / Trust Deed / MOA & AOA drafting', 'Board meeting facilitation & amendments','Record-keeping setup'] },
          { offer: 'Trademark & Copyright', deliverables: ['Trademark registration (logo, name, slogan)', 'Copyright protection for learning material', 'Legal liaison'] },
          { offer: 'School Affiliation & Approvals', deliverables: ['End-to-end CBSE/RBSE affiliation support', 'NOC acquisition (fire, building, land, etc.)', 'Pre-inspection audits','Renewal & compliance checks','Department liaison'] },
          { offer: 'School Community Engagement & Policy', deliverables: ['SMC setup, meeting templates & annual reports', 'PTA constitution & role definition', 'Fee audit checklists & reconciliation'] },
          { offer: 'Extracurricular Recognition', deliverables: ['Scout/Guide, NCC, NSS setup', 'Sports facility certification', 'Competition registrations'] }
      ]
  },
  'Edu HR': {
      desc: 'Edu HR provides end-to-end human resource solutions for educational institutions, focusing on talent acquisition, professional development, and compliance to build a skilled and motivated team that drives academic excellence.',
      banner: '/images/banners/hr-2.png',
      rows: [
          { offer: 'Talent Acquisition & Recruitment', deliverables: ['Job description crafting & portal management', 'Candidate sourcing and screening', 'Interview coordination & support', 'Onboarding & induction programs'] },
          { offer: 'Professional Development', deliverables: ['Teacher training on NEP & modern pedagogies', 'Leadership workshops for HODs & Principals', 'Performance management system setup', 'Skill gap analysis & training calendar'] },
          { offer: 'HR Compliance & Policies', deliverables: ['POSH, EPF, ESI compliance management', 'Employee handbook & policy development', 'Automated leave & attendance management', 'Grievance redressal mechanism setup'] }
      ]
  },
  'Edu Ops Excellence': {
      desc: 'Edu Ops Excellence streamlines day-to-day school operations for maximum efficiency and safety. We optimize key non-academic functions, from transport to cafeteria management, allowing school leaders to focus purely on education.',
      banner: '/images/banners/ops-2.png',
      rows: [
          { offer: 'Student Transport Management', deliverables: ['GPS tracking & safety alert implementation', 'Route optimization for fuel & time saving', 'Vehicle compliance & maintenance schedule', 'Parent communication app for transport'] },
          { offer: 'Campus & Facilities Management', deliverables: ['Digital housekeeping & maintenance schedule', 'Safety & security audit (CCTV, access control)', 'Vendor management for repairs & supplies', 'Asset tracking & management'] },
          { offer: 'Admission Process Automation', deliverables: ['Online admission form & payment gateway', 'Automated inquiry management system', 'Document verification workflow', 'Admission analytics dashboard'] },
          { offer: 'Cafeteria & Mess Management', deliverables: ['Hygiene & quality audits', 'Menu planning & nutritional analysis', 'Inventory & stock management system'] }
      ]
  },
  'Edu Curriculum': {
      desc: 'Edu Curriculum delivers future-ready academic solutions. We focus on designing and implementing NEP-aligned curricula, robust assessment frameworks, and providing rich teaching resources to enhance learning outcomes.',
      banner: '/images/banners/curriculum.png',
      rows: [
          { offer: 'Curriculum Design & Mapping', deliverables: ['NEP 2020 alignment audit & roadmap', 'Subject integration & interdisciplinary modules', 'Annual academic planner & syllabus breakup', 'Learning objective mapping'] },
          { offer: 'Assessment & Evaluation Framework', deliverables: ['Competency-based question bank creation', 'Report card design with holistic progress', 'Digital examination & evaluation tools', 'Remedial action plan templates'] },
          { offer: 'Teacher Resource & Enrichment', deliverables: ['Ready-to-use digital lesson plans', 'Access to curated e-content library', 'Subject-specific teaching aid kits', 'Continuous professional development modules'] }
      ]
  },
  'Edu Infra-Serve': {
      desc: 'Edu Infra-Serve helps schools build modern, safe, and inspiring learning environments. We provide end-to-end solutions for infrastructure planning, procurement, and setup, ensuring every corner of the campus is optimized for learning.',
      banner: '/images/banners/infraServe.png',
      rows: [
          { offer: 'Smart Classroom Setup', deliverables: ['Interactive flat panels & digital boards', 'Audio-visual system integration', 'Ergonomic student furniture procurement', 'Classroom layout & design consultation'] },
          { offer: 'Specialized Labs & Libraries', deliverables: ['Science, Robotics, and Language lab setup', 'Library automation & RFID system', 'Procurement of lab equipment & consumables', 'Modern library furniture & layout design'] },
          { offer: 'Campus Safety Infrastructure', deliverables: ['CCTV surveillance system design & installation', 'Fire safety compliance audit & equipment', 'Access control systems for campus entry/exit'] }
      ]
  },
   'Edu After School': {
      desc: 'Edu After School transforms free hours into learning adventures. We help schools design and manage engaging after-school programs, from sports academies to hobby clubs, fostering holistic student development.',
      banner: '/images/banners/afterschool.png',
      rows: [
          { offer: 'Sports Academy Management', deliverables: ['Professional coaching staff arrangement', 'Sports equipment procurement & management', 'Tournament & league participation support', 'Student performance tracking'] },
          { offer: 'Hobby & Skill Clubs', deliverables: ['Club curriculum design (Robotics, Arts, Music)', 'Expert instructor sourcing', 'Material & kit procurement', 'Showcase event management'] },
          { offer: 'Skill Development Workshops', deliverables: ['Workshops on coding, public speaking, etc.', 'Holiday camp planning & execution', 'Certification & assessment for participants'] }
      ]
  },
   'Edu Finance': {
      desc: 'Edu Finance brings financial discipline and clarity to school management. Our services cover everything from fee collection and budgeting to compliance, ensuring the financial health and sustainability of the institution.',
      banner: '/images/banners/finance-2.png',
      rows: [
          { offer: 'Fee Management System', deliverables: ['Online fee payment portal with multiple gateways', 'Automated fee reminders & receipt generation', 'Defaulter management & reporting', 'Fee structure planning & consultation'] },
          { offer: 'Budgeting & Financial Planning', deliverables: ['Annual budget preparation support', 'Department-wise expense tracking system', 'Financial health dashboard for management', 'Cost optimization advisory'] },
          { offer: 'Accounting & Compliance', deliverables: ['Tally/ERP integration support', 'Statutory audit & compliance coordination', 'Vendor payment reconciliation', 'Financial reporting as per norms'] }
      ]
  },
  'Edu Events': {
      desc: 'Edu Events specializes in creating memorable and impactful school events. From concept to execution, we manage every detail of your annual functions, sports days, and competitions, making them seamless and professional.',
      banner: '/images/banners/event.png',
      rows: [
          { offer: 'Annual Day & Major Functions', deliverables: ['Event concept & theme development', 'Stage, sound, and light management', 'Guest & RSVP management', 'Scripting & choreography support'] },
          { offer: 'Sports Day Management', deliverables: ['Logistics & ground preparation', 'Officiating & referee arrangement', 'Medals, trophies, & certificate procurement', 'Live scoring & results display'] },
          { offer: 'Interschool & External Events', deliverables: ['Competition planning & promotion', 'Registration & participant coordination', 'Venue & logistics management'] }
      ]
  },
  'Edu Transform': {
      desc: 'Edu Transform focuses on the holistic development of students. We provide expert career counseling, wellness programs, and soft skills training to prepare students for success in life beyond the classroom.',
      banner: '/images/banners/transform.png',
      rows: [
          { offer: 'Career Counselling & Guidance', deliverables: ['Psychometric & aptitude testing (DMIT)', 'Personalized career roadmap for students', 'University application & admission support', 'Parent counseling sessions'] },
          { offer: 'Student Wellness Programs', deliverables: ['Mental health & anti-bullying workshops', 'Peer educator training programs', 'Access to certified student counselors', 'Digital wellness resource portal'] },
          { offer: 'Leadership & Soft Skills', deliverables: ['Public speaking & debate club setup', 'Critical thinking & problem-solving workshops', 'Student leadership bootcamp planning'] }
      ]
  },
  'Edu IT Solution': {
      desc: 'Edu IT Solution provides the complete technology backbone for a modern school. We implement and manage robust ERP systems, digital learning platforms, and secure network infrastructure for a truly connected campus.',
      banner: '/images/banners/IT.png',
      rows: [
          { offer: 'School ERP & Management Software', deliverables: ['End-to-end ERP implementation & training', 'Module customization (Admissions, Fees, HR)', 'Data migration & support', 'Mobile app for parents & teachers'] },
          { offer: 'Digital Learning Platforms', deliverables: ['Learning Management System (LMS) setup', 'Integration of digital content libraries', 'Online examination & assessment tools'] },
          { offer: 'IT Infrastructure & Security', deliverables: ['Campus-wide Wi-Fi network setup', 'Cybersecurity audit & firewall implementation', 'Cloud data backup & recovery solutions', 'Biometric attendance system integration'] }
      ]
  },
  'Edu Market': {
      desc: 'Edu Market is your school\'s growth engine. We specialize in data-driven marketing, branding, and admission strategies designed to enhance your school\'s reputation and boost enrollment numbers.',
      banner: '/images/banners/market.png',
      rows: [
          { offer: 'Digital Marketing & Lead Generation', deliverables: ['Social media account management', 'Google & Facebook ad campaigns', 'Search Engine Optimization (SEO) for website', 'Lead capturing & nurturing system'] },
          { offer: 'Branding & Communication', deliverables: ['School prospectus & brochure design', 'Brand story & communication strategy', 'Video testimonials & virtual tours', 'Website design & content update'] },
          { offer: 'Admissions Strategy & Outreach', deliverables: ['Admission funnel analysis & optimization', 'Competitor analysis & positioning', 'Open house & counseling event planning', 'Local PR & media outreach'] }
      ]
  }
};

export default function ServiceHubPage() {
  const [activeModule, setActiveModule] = useState('Edu Govern');
  
  // React state for the selected items (matches your Alpine object logic)
  const [selectedServices, setSelectedServices] = useState<Record<string, Record<string, string[]>>>({});

  const toggleSelection = (module: string, offer: string, deliverable: string) => {
    setSelectedServices(prev => {
      const newState = { ...prev };
      if (!newState[module]) newState[module] = {};
      if (!newState[module][offer]) newState[module][offer] = [];
      
      const index = newState[module][offer].indexOf(deliverable);
      if (index > -1) {
        newState[module][offer].splice(index, 1); // Remove
      } else {
        newState[module][offer].push(deliverable); // Add
      }
      return newState;
    });
  };

  const isSelected = (module: string, offer: string, deliverable: string) => {
    return selectedServices[module]?.[offer]?.includes(deliverable) ?? false;
  };

  const selectedCount = Object.values(selectedServices).reduce((count, module) => {
    return count + Object.values(module).reduce((subCount, offer) => subCount + offer.length, 0);
  }, 0);

  const activeData = serviceData[activeModule];

  return (
    <div className="pb-24 overflow-x-hidden animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-8 px-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-tight">Service Hub</h1>
        <p className="text-sm font-medium text-slate-500">Select and avail end-to-end transformation services for your institution.</p>
      </div>

      <div className="max-w-[1750px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
          
          {/* 1. SIDEBAR */}
          <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 h-fit z-20">
              <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                  {modules.map((mod) => (
                      <button 
                          key={mod.id}
                          onClick={() => setActiveModule(mod.title)}
                          className={cn(
                            "relative whitespace-nowrap lg:whitespace-normal shrink-0 lg:w-full text-left px-5 lg:px-6 py-3 lg:py-3.5 rounded-xl transition-all duration-300 border font-bold text-[11px] lg:text-[13px] uppercase tracking-tight flex items-center justify-between group overflow-visible",
                            activeModule === mod.title ? "bg-orange-500 border-orange-500 text-white shadow-lg lg:translate-x-2" : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                          )}
                      >
                          <span>{mod.title}</span>
                          {activeModule === mod.title && (
                            <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rotate-45 rounded-sm z-[-1]"></div>
                          )}
                      </button>
                  ))}
              </div>
          </aside>

          {/* 2. CONTENT CARD */}
          <section className="flex-1 min-w-0">
              <div className="bg-white border border-slate-100 lg:border-slate-200 rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden shadow-sm p-4 md:p-6 lg:p-10">
                  
                  {activeData && (
                      <div className="animate-in slide-in-from-bottom-4 duration-300">
                          
                          <div className="w-full aspect-[1976/776] rounded-2xl overflow-hidden mb-8 border border-slate-100 shadow-inner bg-slate-900 relative">
                              {/* Using generic unsplash fallback if local image isn't available, but keeping your path logic */}
                              <img src={activeData.banner} className="w-full h-full object-cover md:object-fill opacity-80" alt={activeModule} />
                          </div>

                          <div className="px-1">
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-[2px] bg-orange-500"></div>
                                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">Institutional Suite</span>
                              </div>
                              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 uppercase mb-4 italic tracking-tighter">{activeModule}</h2>
                              <p className="text-slate-500 text-[14px] leading-relaxed mb-10 text-justify font-medium">{activeData.desc}</p>
                          </div>

                          {/* DESKTOP TABLE */}
                          <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                              <table className="w-full border-collapse min-w-[700px]">
                                  <thead>
                                      <tr className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest">
                                          <th className="p-5 text-left w-1/3 border-r border-slate-700">Services Offered</th>
                                          <th className="p-5 text-left border-r border-slate-700">Key Deliverables</th>
                                          <th className="p-5 text-center w-36">Select</th>
                                      </tr>
                                  </thead>
                                  <tbody className="bg-white">
                                      {activeData.rows.map((row: any, rowIndex: number) => (
                                          row.deliverables.map((item: any, itemIndex: number) => (
                                            <tr key={`${rowIndex}-${itemIndex}`} onClick={() => toggleSelection(activeModule, row.offer, item)} className="hover:bg-slate-50/80 transition-colors border-t border-slate-100 cursor-pointer">
                                                {itemIndex === 0 && (
                                                  <td rowSpan={row.deliverables.length} className="p-6 align-top border-r border-slate-100">
                                                      <span className="text-slate-900 font-extrabold text-[14px] leading-tight">{row.offer}</span>
                                                  </td>
                                                )}
                                                <td className="p-4 align-middle border-r border-slate-100">
                                                    <div className="text-slate-500 text-[13px] flex items-center gap-2 font-medium italic">
                                                        <span className="text-orange-500"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg></span>
                                                        <span>{item}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center align-middle">
                                                    <button onClick={(e) => { e.stopPropagation(); toggleSelection(activeModule, row.offer, item); }} className={cn("w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95", isSelected(activeModule, row.offer, item) ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200')}>
                                                        {isSelected(activeModule, row.offer, item) ? (
                                                          <><Check className="w-3.5 h-3.5" /> <span>Selected</span></>
                                                        ) : (
                                                          <><Plus className="w-3.5 h-3.5" /> <span>Add</span></>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                          ))
                                      ))}
                                  </tbody>
                              </table>
                          </div>

                          {/* MOBILE CARD VIEW */}
                          <div className="lg:hidden space-y-6">
                              {activeData.rows.map((row: any, rowIndex: number) => (
                                  <div key={rowIndex} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                                      <div className="p-4 bg-slate-100 border-b border-slate-200">
                                          <h3 className="text-slate-900 font-extrabold text-base leading-tight">{row.offer}</h3>
                                      </div>
                                      <div className="divide-y divide-slate-100">
                                          {row.deliverables.map((item: any, itemIndex: number) => (
                                              <div key={itemIndex} onClick={() => toggleSelection(activeModule, row.offer, item)} className="flex justify-between items-center gap-4 p-4 cursor-pointer hover:bg-slate-50/50 transition-colors">
                                                  <div className="flex-1 text-slate-600 text-sm font-medium">{item}</div>
                                                  <div className="w-28 shrink-0">
                                                       <button onClick={(e) => { e.stopPropagation(); toggleSelection(activeModule, row.offer, item); }} className={cn("w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform active:scale-95", isSelected(activeModule, row.offer, item) ? 'bg-orange-500 text-white shadow-md shadow-orange-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300')}>
                                                          {isSelected(activeModule, row.offer, item) ? (
                                                            <><Check className="w-4 h-4" /> <span>Selected</span></>
                                                          ) : (
                                                            <><Plus className="w-4 h-4" /> <span>Add</span></>
                                                          )}
                                                      </button>
                                                  </div>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              ))}
                          </div>

                          {/* CTA */}
                          <div className="mt-12 flex flex-col items-center gap-4">
                              <button disabled={selectedCount === 0} className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[13px] shadow-2xl hover:bg-orange-500 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                  {selectedCount > 0 ? `Avail ${selectedCount} Selected Service${selectedCount > 1 ? 's' : ''}` : `Avail ${activeModule}`} Now
                              </button>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Immediate consultation available</p>
                          </div>

                      </div>
                  )}
              </div>
          </section>
      </div>
    </div>
  );
}