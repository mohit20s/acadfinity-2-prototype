import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen, MonitorPlay, ShoppingBag } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="w-full py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary mb-6">
            Acadfinity 2.0 is Here
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mb-6">
            One Connected Ecosystem for <span className="text-primary">School Growth</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10">
            Run operations smarter, teach better, and procure everything your institution needs in one unified platform designed for K-12 excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-md h-12 px-8" asChild>
              <Link href="/contact">
                Register Your School <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-md h-12 px-8" asChild>
              <Link href="/solutions">Explore Modules</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* QUICK VALUE PROPS */}
      <section className="w-full py-16 bg-white border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
              <div className="h-12 w-12 rounded-full bg-blue-100 text-primary flex items-center justify-center mb-4">
                <MonitorPlay className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">ERP & LMS</h3>
              <p className="text-slate-600 text-sm">Unified operations and structured learning journeys from one dashboard.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
              <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Marketplace</h3>
              <p className="text-slate-600 text-sm">Procure school essentials, stationery, and equipment easily.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl">
              <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Books & Toys Library</h3>
              <p className="text-slate-600 text-sm">A digital and physical resource subscription for parents and students.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}