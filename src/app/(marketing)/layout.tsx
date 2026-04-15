import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { PublicMobileNav } from "@/components/marketing/public-mobile-nav";
import { GlobalShortsPlayer } from "@/components/dashboard/global-shorts-player";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />
      
      {/* Added pb-20 to ensure content isn't hidden behind the new mobile bottom nav */}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      
      {/* Hide footer on mobile (md:block means hidden by default, visible on medium+ screens) */}
      <div className="hidden md:block">
        <SiteFooter />
      </div>

      {/* Public Bottom Nav & Shorts Player for Mobile */}
      <PublicMobileNav />
      <GlobalShortsPlayer />
    </div>
  );
}