import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Syntex — Digital Account Opening for Banks & Credit Unions",
  description:
    "Syntex is an AI-powered onboarding platform that helps banks and credit unions collect, verify, and process business account documents faster. Reduce onboarding time by 70%.",
  keywords: [
    "digital account opening for banks",
    "business account onboarding software",
    "bank onboarding automation",
    "KYC onboarding automation",
    "commercial banking onboarding software",
    "credit union onboarding platform",
  ],
  openGraph: {
    title: "Syntex — Fund Businesses in Days, Not Weeks",
    description:
      "AI-powered onboarding platform for banks and credit unions. 70% faster onboarding. 40% higher conversion.",
    type: "website",
    siteName: "Syntex",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-midnight text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
