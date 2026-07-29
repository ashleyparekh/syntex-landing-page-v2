import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { posts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

const title = "Blog";
const description =
  "Essays on KYB orchestration, stablecoin compliance, foreign national IDs, and cross-border payment corridors.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: { "en-US": `${SITE_URL}/blog` },
  },
  openGraph: {
    title: `${title} — Syntex`,
    description,
    url: `${SITE_URL}/blog`,
    type: "website",
    locale: "en_US",
  },
};

export default function BlogIndexPage() {
  return (
    <main className="pb-24">
      <Breadcrumbs items={[{ name: "Blog" }]} />
      <div className="section-pad mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-paper md:text-5xl">
          Blog
        </h1>
        <p className="mt-4 max-w-xl text-base text-mist">
          Notes on KYB orchestration, corridor-specific IDs, and how stablecoin
          payment stacks actually clear compliance.
        </p>

        <ul className="mt-14 space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-white/10 bg-[#0a0a0a] p-6 transition-colors hover:border-white/20"
              >
                <div className="flex items-center gap-3 text-xs text-fog">
                  <span className="font-display uppercase tracking-[0.14em]">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h2 className="mt-3 font-display text-xl text-paper group-hover:text-mist md:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
