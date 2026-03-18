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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-midnight text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
