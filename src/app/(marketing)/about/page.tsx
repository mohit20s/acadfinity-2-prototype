import { Target, Users, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Sustainable Growth",
      desc: "We focus on long-term institutional success rather than short-term fixes."
    },
    {
      icon: Users,
      title: "School-First Approach",
      desc: "Every feature is built based on real feedback from educators and principals."
    },
    {
      icon: ShieldCheck,
      title: "Educational Credibility",
      desc: "Designed by experts who understand the unique needs of K-12 administration."
    },
    {
      icon: Zap,
      title: "Data-Driven Execution",
      desc: "Turning institutional data into actionable insights for better outcomes."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Mission</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            To enable sustainable growth for K-12 institutions by providing a modern, integrated ecosystem that simplifies operations and enhances learning.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Acadfinity?</h2>
              <p className="text-slate-600 mb-4">
                Acadfinity was born out of a simple observation: most school management software is outdated, disconnected, and difficult to use. 
              </p>
              <p className="text-slate-600">
                We built Acadfinity 2.0 to be different. It's a next-gen ecosystem that brings together ERP, LMS, and procurement into one unified experience, allowing school leaders to focus on what matters most—student success.
              </p>
            </div>
            <div className="bg-slate-100 h-64 md:h-80 rounded-2xl flex items-center justify-center text-slate-400">
              [ Institutional Growth Illustration ]
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}