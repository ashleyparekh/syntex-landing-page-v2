import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Syntex — commercial due diligence for Foreign Entities at Private Lenders",
  description:
    "Syntex runs AI-powered commercial due diligence on any foreign entity in minutes. Multi-layer ownership chains, foreign formation documents, complete beneficial ownership resolution. Built for private lenders.",
  keywords: [
    "commercial due diligence foreign entities private lenders",
    "beneficial ownership resolution",
    "foreign entity compliance",
    "private lender commercial due diligence software",
    "AI compliance for private credit",
    "foreign entity due diligence",
  ],
  openGraph: {
    title: "Syntex — Stop Turning Down Foreign Entity Deals",
    description:
      "AI agents that read foreign formation documents, trace multi-layer ownership chains, and deliver a complete beneficial ownership resolution. $300 vs $5,000 at a law firm.",
    type: "website",
    siteName: "Syntex",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-midnight">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
