import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { BRAND } from "@/constants/branding";

export const metadata: Metadata = {
  title: `${BRAND.centerName} | ${BRAND.siteTitle}`,
  description: "Placement test website for English and SAT exams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F5F7FB] text-slate-900 antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}