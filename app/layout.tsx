import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import  Sidebar  from "@/components/Sidebar";
import ShopYanguCard from "@/components/ShopYanguCard";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ShopYangu Dashboard",
  description: "Dashboard for ShopYangu e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={cn(
        `${geistSans.variable} ${geistMono.variable} antialiased `,
        { 'debug-screens': process.env.NODE_ENV === 'development' }
      )}
      >
        <ShopYanguCard />
        <div className="min-h-screen w-full bg-white text-black flex">
        
        <Sidebar defaultCollapsed={false} />
        <div className="p-8 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
