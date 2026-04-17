import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full py-16 md:py-24 bg-slate-50 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Get in Touch</h1>
              <p className="text-slate-600 mb-8">
                Ready to transform your institution? Contact our team for a personalized demo or to learn more about our Educational Institute-first ecosystem.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-slate-700">support@acadfinity.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="text-slate-700">+91 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-slate-700">Education Hub, Sector 62, Noida, India</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input type="text" className="w-full h-10 px-3 rounded-md border text-sm" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input type="text" className="w-full h-10 px-3 rounded-md border text-sm" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" className="w-full h-10 px-3 rounded-md border text-sm" placeholder="john@Educational Institute.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Institute Name</label>
                  <input type="text" className="w-full h-10 px-3 rounded-md border text-sm" placeholder="St. Mary's Academy" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea className="w-full p-3 rounded-md border text-sm min-h-[100px]" placeholder="How can we help you?"></textarea>
                </div>
                <Button className="w-full h-12">Send Message</Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}