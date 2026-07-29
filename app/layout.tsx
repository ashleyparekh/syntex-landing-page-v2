import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobeExperienceProvider from "@/components/GlobeExperience";
import GlobeHost from "@/components/GlobeHost";
import { SITE_URL } from "@/lib/site";

const TITLE =
  "Syntex — AI-native KYB orchestration for cross-border stablecoin payments";
const DESCRIPTION =
  "Syntex translates KYB documents across vendor formats and routes them to all your infrastructure partners automatically. Built for US cross-border stablecoin payment companies operating in India, Mexico, and the Philippines.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s — Syntex",
  },
  description: DESCRIPTION,
  keywords: [
    "KYB orchestration",
    "cross-border stablecoin compliance",
    "Aadhaar KYB",
    "US-India payments compliance",
    "US-Mexico KYB",
    "stablecoin KYB vendor",
    "cross-border business verification",
    "PhilSys KYB",
    "CURP business verification",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: "Syntex",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Syntex",
  description: DESCRIPTION,
  applicationCategory: "FinancialApplication",
  operatingSystem: "Web",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,500&family=Inter:wght@400;500&family=Space+Grotesk:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" hrefLang="en-US" href={SITE_URL} />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-paper">
        <GlobeExperienceProvider>
          <GlobeHost />
          <Navbar />
          {children}
          <Footer />
        </GlobeExperienceProvider>
      </body>
    </html>
  );
}
