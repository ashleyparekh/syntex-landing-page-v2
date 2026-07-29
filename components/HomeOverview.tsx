"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HowItWorks from "@/components/HowItWorks";
import BuiltForWhatsNext from "@/components/BuiltForWhatsNext";
import { posts } from "@/lib/blog";

const verticals = [
  "B2B ecommerce",
  "Payroll and contractor payments",
  "Remittance platforms",
  "Trade finance",
];

const corridors = [
  { route: "US → India", idType: "Aadhaar", regulator: "RBI" },
  { route: "US → Mexico", idType: "CURP", regulator: "CNBV" },
  { route: "US → Philippines", idType: "PhilSys", regulator: "BSP" },
];

function LearnMore({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex font-display text-sm text-paper underline underline-offset-4 hover:text-mist"
    >
      Learn more
    </Link>
  );
}

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`section-pad border-t border-white/[0.06] py-12 md:py-16 ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

export default function HomeOverview() {
  const gapRef = useRef(null);
  const gapInView = useInView(gapRef, { once: true, amount: 0.3 });
  const whoRef = useRef(null);
  const whoInView = useInView(whoRef, { once: true, amount: 0.2 });
  const corrRef = useRef(null);
  const corrInView = useInView(corrRef, { once: true, amount: 0.2 });
  const blogRef = useRef(null);
  const blogInView = useInView(blogRef, { once: true, amount: 0.2 });

  const recent = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return (
    <>
      {/* The Gap — 2 sentences only */}
      <SectionShell className="bg-radial-fade">
        <div ref={gapRef}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={gapInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-xs uppercase tracking-[0.2em] text-fog"
          >
            The Gap
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={gapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="mt-4 max-w-2xl text-base text-mist md:text-lg"
          >
            Cross-border stablecoin payment companies clear the same client
            through multiple infrastructure partners, each with a different KYB
            vendor. Those vendors do not share document formats, so teams rebuild
            translation work for every partner pair.
          </motion.p>
          <LearnMore href="/the-gap" />
        </div>
      </SectionShell>

      {/* How it works — visual only */}
      <HowItWorks showHeading={false} homeVisual />
      <div className="section-pad -mt-6 pb-12 md:pb-16">
        <div className="mx-auto max-w-5xl">
          <LearnMore href="/how-it-works" />
        </div>
      </div>

      {/* Who — names only */}
      <SectionShell className="bg-[#080808]">
        <div ref={whoRef}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={whoInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-xs uppercase tracking-[0.2em] text-fog"
          >
            Who it is for
          </motion.p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {verticals.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                animate={whoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 + i * 0.05 }}
                className="rounded-xl border border-white/10 bg-[#0c0c0c] px-4 py-5"
              >
                <p className="font-display text-base text-paper">{name}</p>
              </motion.div>
            ))}
          </div>
          <LearnMore href="/who-its-for" />
        </div>
      </SectionShell>

      {/* Before / after — visual only */}
      <BuiltForWhatsNext compact />

      {/* Example corridors */}
      <SectionShell className="bg-[#0a0a0a]">
        <div ref={corrRef}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={corrInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-xs uppercase tracking-[0.2em] text-fog"
          >
            Example corridors
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={corrInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 }}
            className="mt-3 max-w-2xl text-sm text-mist"
          >
            Syntex works across any cross-border corridor. Here are a few
            we&apos;ve mapped in depth.
          </motion.p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {corridors.map((c, i) => (
              <motion.div
                key={c.route}
                initial={{ opacity: 0, y: 16 }}
                animate={corrInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="rounded-xl border border-white/10 bg-[#0c0c0c] p-4"
              >
                <p className="font-display text-lg text-paper">{c.route}</p>
                <p className="mt-2 text-sm text-mist">
                  {c.idType} · {c.regulator}
                </p>
              </motion.div>
            ))}
          </div>
          <LearnMore href="/corridors" />
        </div>
      </SectionShell>

      {/* Blog titles */}
      <SectionShell>
        <div ref={blogRef}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={blogInView ? { opacity: 1, y: 0 } : {}}
            className="font-display text-xs uppercase tracking-[0.2em] text-fog"
          >
            Blog
          </motion.p>
          <ul className="mt-6 space-y-4">
            {recent.map((post, i) => (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={blogInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-display text-base text-paper underline-offset-4 hover:underline md:text-lg"
                >
                  {post.title}
                </Link>
              </motion.li>
            ))}
          </ul>
          <LearnMore href="/blog" />
        </div>
      </SectionShell>
    </>
  );
}
