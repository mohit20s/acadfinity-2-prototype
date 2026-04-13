import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground mt-2">
              The next-generation education ecosystem enabling sustainable growth for K-12 schools.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/solutions" className="hover:text-primary">ERP Operations</Link></li>
              <li><Link href="/solutions" className="hover:text-primary">LMS Learning</Link></li>
              <li><Link href="/marketplace" className="hover:text-primary">Procurement Hub</Link></li>
              <li><Link href="/library" className="hover:text-primary">Digital Library</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Acadfinity. All rights reserved. (Prototype)
        </div>
      </div>
    </footer>
  );
}