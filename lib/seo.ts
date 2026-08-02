import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const HOME_TITLE =
  "Syntex — AI-native KYB orchestration for cross-border stablecoin payments";

export const HOME_DESCRIPTION =
  "Syntex is AI-native KYB orchestration for cross-border stablecoin payment companies. Translate KYB documents across vendor formats and route them to every infrastructure partner from one input.";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Syntex",
  url: "https://usesyntex.com",
  logo: "https://usesyntex.com/favicon.png",
  description:
    "AI-native KYB orchestration for cross-border stablecoin payment companies. Translate KYB documents across vendor formats and route them to every infrastructure partner from one input.",
  foundingDate: "2025",
  sameAs: ["https://www.linkedin.com/company/use-syntex/"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "ashley@syntex.pro",
    contactType: "sales",
  },
} as const;

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Syntex",
  url: "https://usesyntex.com",
} as const;

export function absoluteUrl(path: string) {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);
  const isHome = path === "/" || path === "";
  const ogTitle = isHome ? title : `${title} — Syntex`;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    authors: [{ name: SITE_NAME }],
    alternates: {
      canonical: url,
      languages: { "en-US": url },
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@usesyntex",
      title: ogTitle,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export function blogPostingJsonLd({
  headline,
  datePublished,
  slug,
}: {
  headline: string;
  datePublished: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    datePublished,
    author: {
      "@type": "Organization",
      name: "Syntex",
    },
    publisher: {
      "@type": "Organization",
      name: "Syntex",
      url: "https://usesyntex.com",
    },
    mainEntityOfPage: `https://usesyntex.com/blog/${slug}`,
  };
}
