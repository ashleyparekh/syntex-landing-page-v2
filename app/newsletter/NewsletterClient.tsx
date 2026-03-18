"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: "easeOut" },
});

const stories = [
  {
    category: "Cyber Risk",
    tag: "Geopolitics → Banks",
    tagColor: "text-red-400 bg-red-400/10 border-red-400/20",
    headline: "U.S. banks were just named as cyber targets by Iran.",
    body: "After a strike hit Sepah Bank's infrastructure, Iran signaled retaliation against U.S.-linked financial institutions. At the same time, banking services in Iran were disrupted.",
    mattersWhy:
      "The threat is no longer abstract. Dozens of hacktivist groups are already active, and even small attacks or false claims can trigger real panic if banks don't respond fast.",
    signal: "Security is no longer just prevention. It's response speed and controlling misinformation.",
  },
  {
    category: "Bank Strategy",
    tag: "Fintech Partnerships",
    tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    headline: "One bank went from 70 fintech partnerships to zero.",
    body: "Blue Ridge Bank exited every fintech relationship after regulatory pressure tied to AML and risk management failures. The bank is now refocusing on traditional lending and community banking.",
    mattersWhy:
      "Banks are realizing that scaling partnerships without infrastructure creates more risk than growth.",
    signal: "Fintech strategy only works if operations and compliance scale with it.",
  },
  {
    category: "Market Competition",
    tag: "Fintech vs Banks",
    tagColor: "text-accent-blue bg-accent-blue/10 border-accent-blue/20",
    headline: "Revolut is investing $500M to expand into U.S. business banking.",
    body: "They're going after global businesses with FX, payments, and treasury tools, positioning themselves as an all-in-one platform.",
    mattersWhy:
      "They're not competing on one feature. They're competing on the entire banking experience.",
    signal: "Banks are no longer just competing with other banks. They're competing with full-stack fintech platforms.",
  },
  {
    category: "Risk",
    tag: "Bank Failures",
    tagColor: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    headline: "Why do banks fail? It's not liquidity.",
    body: "A new NBER study shows that most bank failures are driven by insolvency. Bank runs are usually the final trigger, not the root cause.",
    mattersWhy:
      "It shifts focus from short-term liquidity fixes to long-term balance sheet health.",
    signal: "Strong fundamentals matter more than crisis response.",
  },
];

function StoryCard({ story, index }: { story: typeof stories[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeOut" }}
      className="group relative glass rounded-2xl p-7 border border-white/[0.06] hover:border-white/15 transition-all duration-500"
    >
      {/* Category + tag */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/40 font-sans">
          {story.category}
        </span>
        <span className="text-white/20 text-[10px]">·</span>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border font-sans ${story.tagColor}`}>
          {story.tag}
        </span>
      </div>

      {/* Headline */}
      <h2 className="text-lg font-bold tracking-tight leading-snug mb-3">
        {story.headline}
      </h2>

      {/* Body */}
      <p className="text-sm text-silver-dark font-sans leading-relaxed mb-5">
        {story.body}
      </p>

      {/* Why it matters */}
      <div className="space-y-3">
        <div className="border-l-2 border-white/10 pl-3">
          <p className="text-[10px] text-white/35 uppercase tracking-widest font-sans mb-1">Why this matters</p>
          <p className="text-sm text-silver-dark font-sans leading-relaxed">{story.mattersWhy}</p>
        </div>
        <div className="border-l-2 border-accent-blue/40 pl-3">
          <p className="text-[10px] text-accent-blue/60 uppercase tracking-widest font-sans mb-1">What this means</p>
          <p className="text-sm text-white/80 font-sans leading-relaxed font-medium">{story.signal}</p>
        </div>
      </div>
    </motion.article>
  );
}

function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate submission — swap this for real API/Mailchimp/ConvertKit endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  return (
    <div className="glass-strong rounded-2xl p-8 border border-accent-blue/15">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-blue font-sans">
          Weekly Intelligence
        </span>
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-1">
        Stay ahead of what's moving banking.
      </h3>
      <p className="text-sm text-silver-dark font-sans mb-6">
        Cyber risk, fintech competition, regulatory signals — one sharp brief, every week.
        Written for community bankers and credit union leaders.
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 py-4 px-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
        >
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-emerald-400 font-sans">You're in. First issue lands next week.</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@bank.com"
            required
            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/25 text-sm font-sans focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-all duration-300"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-white text-midnight font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(74,145,255,0.25)] transition-all duration-300 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed font-sans"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Subscribing...
              </span>
            ) : (
              "Subscribe Free"
            )}
          </button>
        </form>
      )}
      <p className="text-[11px] text-white/20 font-sans mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  );
}

export default function NewsletterClient() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <div className="relative pt-16 pb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/50 to-midnight" />
        <div className="relative max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="flex items-center gap-2 mb-5">
            <div className="h-px w-8 bg-gradient-to-r from-accent-blue/70 to-transparent" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-blue font-sans">
              Banking Intelligence
            </span>
          </motion.div>
          <motion.h1 {...fadeUp(0.1)} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            The brief for{" "}
            <span className="text-gradient-blue">modern bankers.</span>
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-silver-dark text-base font-sans leading-relaxed max-w-xl">
            What's moving community banking this week — cyber threats, fintech moves,
            regulatory shifts, and what it all means for your institution.
          </motion.p>
        </div>
      </div>

      {/* Stories + Subscribe */}
      <section className="relative pb-16">
        <div className="max-w-3xl mx-auto px-6 space-y-5">

          {/* Subscribe form — above stories */}
          <motion.div {...fadeUp(0.25)}>
            <SubscribeForm />
          </motion.div>

          {/* Divider with label */}
          <motion.div {...fadeUp(0.3)} className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-[10px] text-white/25 uppercase tracking-widest font-sans shrink-0">
              Sample stories
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </motion.div>

          {/* Story cards */}
          {stories.map((story, i) => (
            <StoryCard key={i} story={story} index={i} />
          ))}

          {/* Bottom subscribe nudge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center pt-6 pb-2"
          >
            <p className="text-sm text-silver-dark font-sans mb-4">
              Get stories like these in your inbox every week.
            </p>
            <a
              href="#subscribe"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-sm text-accent-blue hover:text-white transition-colors font-sans"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to top to subscribe
            </a>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
