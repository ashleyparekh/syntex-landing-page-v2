import { SITE_URL } from "@/lib/site";
import { posts } from "@/lib/blog";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/the-gap",
    "/how-it-works",
    "/who-its-for",
    "/corridors",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
