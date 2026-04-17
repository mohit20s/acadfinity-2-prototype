import { ArrowRight, BookOpen, Database, Library, MonitorPlay, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SolutionsPage() {
  const modules = [
    {
      icon: Database,
      title: "ERP: Educational Institute Operations",
      description: "Run your entire institution with clarity. Manage admissions, fees, staff, transportation, and communication from a single, powerful dashboard.",
      features: ["Admissions Management", "Fee Collection & Tracking", "Staff & Payroll", "Transport Logistics"],
      color: "blue"
    },
    {
      icon: MonitorPlay,
      title: "LMS: Structured Learning",
      description: "Deliver engaging and structured learning journeys. Create courses, manage assignments, conduct assessments, and track student progress seamlessly.",
      features: ["Course & Content Uploads", "Online Assignments", "Digital Assessments", "Progress Tracking"],
      color: "teal"
    },
    {
      icon: ShoppingBag,
      title: "Marketplace Procurement",
      description: "Simplify how your Educational Institute buys essentials. Procure everything from stationery and lab equipment to furniture and digital assets from verified vendors.",
      features: ["Verified Vendor Network", "Bulk Ordering Discounts", "Budget & Approval Flows", "Order Tracking"],
      color: "green"
    },
    {
      icon: Library,
      title: "Books & Toys Library",
      description: "A subscription-based physical and digital library. Enhance learning with curated books, educational toys, and interactive apps for students.",
      features: ["Physical Book & Toy Issuing", "Digital Resource Access", "Parental Usage Tracking", "Subscription Management"],
      color: "amber"
    }
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600' },
    green: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600' }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <section className="w-full py-16 md:py-24 bg-slate-50 border-b">
        <div className="container mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mb-4">
            An Integrated Platform for K-12 Institutions
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Acadfinity is more than just software; it's a complete operating system designed to enhance every facet of your Educational Institute's ecosystem.
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {modules.map((module) => {
              const colors = colorClasses[module.color as keyof typeof colorClasses];
              return (
                <div key={module.title} className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-8">
                  <div className={`flex-shrink-0 h-16 w-16 rounded-full flex items-center justify-center ${colors.bg}`}>
                    <module.icon className={`h-8 w-8 ${colors.text}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{module.title}</h2>
                    <p className="text-slate-600 mb-6">{module.description}</p>
                    <ul className="space-y-2 mb-8">
                      {module.features.map(feature => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                          <div className={`h-1.5 w-1.5 rounded-full ${colors.bg}`}></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" asChild>
                      <Link href="/contact">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}