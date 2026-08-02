import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobeExperienceProvider from "@/components/GlobeExperience";
import GlobeHost from "@/components/GlobeHost";
import { SITE_URL } from "@/lib/site";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  organizationJsonLd,
} from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: HOME_TITLE,
    template: "%s — Syntex",
  },
  description: HOME_DESCRIPTION,
  authors: [{ name: "Syntex" }],
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
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    type: "website",
    siteName: "Syntex",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@usesyntex",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
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
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Syntex" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
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
