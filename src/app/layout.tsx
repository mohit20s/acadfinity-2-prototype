import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] }); // Removed variable: "--font-sans" for simplicity

export const metadata: Metadata = {
  title: "Acadfinity 2.0 | Prototype",
  description: "Next-gen Educational Institute ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        {children}
      </body>
    </html>
  );
}