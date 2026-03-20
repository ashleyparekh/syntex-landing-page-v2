import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Syntex",
  description: "Insights on digital banking, commercial account onboarding, and the future of fintech from the Syntex team.",
};

const posts = [
  {
    date: "March 2025",
    category: "Onboarding",
    title: "Why 60% of Commercial Banking Applicants Never Finish Onboarding",
    excerpt:
      "Most banks don't have a demand problem. They have a conversion problem. We looked at the data behind application abandonment and what it really costs.",
    href: "/blog/why-60-percent-abandon-onboarding",
  },
  {
    date: "February 2026",
    category: "Product",
    title: "How AI Is Reshaping Business Account Opening in 2026",
    excerpt:
      "From automated document parsing to real-time compliance checks — AI is cutting weeks off the onboarding timeline for forward-thinking banks.",
    href: "/blog/how-ai-is-reshaping-business-account-opening",
  },
  {
    date: "January 2026",
    category: "Banking",
    title: "Finovate 2026: What We Learned Demoing to 2,000 Bankers",
    excerpt:
      "Seven minutes. No slides. Just product. Then two days of conversations with hundreds of bankers. Here's what actually stood out.",
    href: "/blog/finovate-2026-what-we-learned",
  },
];

export default function BlogPage() {
  return (
    <main className="pt-20">
      <div className="relative pt-16 pb-4">
        <div className="absolute inset-0 bg-white" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Syntex{" "}
            <span className="text-gradient-blue">Blog</span>
          </h1>
          <p className="mt-4 text-silver-dark text-lg max-w-lg mx-auto leading-relaxed font-sans">
            Insights on digital banking, onboarding, and the future of fintech.
          </p>
        </div>
      </div>

      <section className="relative py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          {posts.map((post, i) => {
            const inner = (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-accent-blue font-sans tracking-wider uppercase">{post.category}</span>
                  <span className="text-xs text-silver-dark/50 font-sans">{post.date}</span>
                  {post.href && (
                    <span className="ml-auto text-[10px] bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-2 py-0.5 rounded-full font-sans">
                      Published
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2 group-hover:text-gradient-blue transition-all duration-300">
                  {post.title}
                </h2>
                <p className="text-sm text-silver-dark leading-relaxed font-sans">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-accent-blue/70 group-hover:text-accent-blue transition-colors font-sans">
                  {post.href ? "Read more" : "Coming soon"}
                  {post.href && (
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </div>
              </>
            );

            return post.href ? (
              <Link key={i} href={post.href}>
                <article className="glass rounded-2xl p-7 hover:border-accent-blue/25 transition-all duration-500 group cursor-pointer">
                  {inner}
                </article>
              </Link>
            ) : (
              <article key={i} className="glass rounded-2xl p-7 border-white/[0.04] opacity-60 cursor-default">
                {inner}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
