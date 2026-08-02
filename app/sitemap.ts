import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homepage: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  };

  const staticRoutes = [
    "/the-gap",
    "/how-it-works",
    "/who-its-for",
    "/corridors",
    "/blog",
    "/contact",
  ].map(
    (path): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  const primaryBlogRoutes = posts.map(
    (post): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const legacyBlogRoutes = [
    {
      slug: "why-60-percent-abandon-onboarding",
      date: "2025-03-01",
    },
    {
      slug: "how-ai-is-reshaping-business-account-opening",
      date: "2026-02-01",
    },
    {
      slug: "finovate-2026-what-we-learned",
      date: "2026-01-01",
    },
  ].map(
    (post): MetadataRoute.Sitemap[number] => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [homepage, ...staticRoutes, ...primaryBlogRoutes, ...legacyBlogRoutes];
}
