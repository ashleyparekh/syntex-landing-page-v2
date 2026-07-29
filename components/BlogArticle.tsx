import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { ReactNode } from "react";
import { getRelated } from "@/lib/blog";

export default function BlogArticle({
  slug,
  title,
  date,
  category,
  children,
}: {
  slug: string;
  title: string;
  date: string;
  category: string;
  children: ReactNode;
}) {
  const related = getRelated(slug);

  return (
    <article className="pb-24">
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blog" },
          { name: title },
        ]}
      />
      <div className="section-pad mx-auto max-w-2xl">
        <p className="font-display text-xs uppercase tracking-[0.16em] text-fog">
          {category} · {date}
        </p>
        <h1 className="mt-4 font-display text-3xl leading-tight text-paper md:text-4xl">
          {title}
        </h1>
        <div className="prose-syntex mt-10 space-y-5 text-[15px] leading-relaxed text-mist md:text-base">
          {children}
        </div>

        <aside className="mt-14 border-t border-white/10 pt-8">
          <h2 className="font-display text-lg text-paper">Related reading</h2>
          <ul className="mt-4 space-y-3 text-sm text-mist">
            {related.posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-paper underline underline-offset-4 hover:text-mist"
                >
                  {p.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={related.page.href}
                className="text-paper underline underline-offset-4 hover:text-mist"
              >
                {related.page.label}
              </Link>
            </li>
          </ul>
        </aside>

        <p className="mt-12 border-t border-white/10 pt-8 text-sm text-fog">
          <Link href="/blog" className="text-mist hover:text-paper">
            ← All posts
          </Link>
        </p>
      </div>
    </article>
  );
}

export function InlineLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-paper underline underline-offset-4 hover:text-mist"
    >
      {children}
    </Link>
  );
}
