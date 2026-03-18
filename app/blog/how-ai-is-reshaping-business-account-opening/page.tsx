import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How AI Is Reshaping Business Account Opening in 2026 — Syntex",
  description:
    "AI isn't replacing compliance. It's removing the bottlenecks around it. Here's how AI is cutting weeks off business account opening timelines in 2026.",
};

const sections = [
  {
    heading: "Why Business Account Opening Is Still So Slow",
    body: `At its core, business onboarding is complex.

Banks need to verify company information, ownership structures, identity documents, and compliance requirements like KYC and AML.

The problem isn't the complexity. It's how the process is handled.

Even in 2026, much of onboarding is still manual. Documents are reviewed by hand, data is re-entered across systems, and compliance checks happen one after another instead of simultaneously.

That's why onboarding timelines still stretch from days into weeks.`,
  },
  {
    heading: "Where AI Is Actually Making an Impact",
    body: `AI isn't replacing compliance. It's removing the bottlenecks around it.

The biggest shift is happening in how information is processed.

Instead of manually reviewing documents, banks can now use AI to extract and structure data from uploaded files, validate it instantly, and flag inconsistencies in real time.

What used to take hours of back-office work now happens in seconds.

That changes the entire onboarding experience.`,
  },
  {
    heading: "From Sequential to Real-Time Processing",
    body: `Traditional onboarding follows a linear process.

A document is submitted, reviewed, approved, and then passed along to the next team.

AI changes that.

Multiple checks can now run in parallel. Identity verification, document parsing, and compliance screening can happen at the same time instead of waiting in queues.

The result is not just faster onboarding. It's continuous onboarding, where progress happens in real time.`,
  },
  {
    heading: "Reducing Errors and Rework",
    body: `A major source of delay in onboarding is rework.

Missing documents, incorrect data, and constant follow-ups slow everything down.

AI helps eliminate this by catching issues upfront.

Instead of discovering problems days later, systems can instantly detect incomplete submissions, highlight mismatched data, and prompt users to fix issues immediately.

That means fewer delays and less back-and-forth.`,
  },
  {
    heading: "Improving Visibility for Both Banks and Clients",
    body: `Another big shift is transparency.

In traditional onboarding, clients don't know where they stand. Internal teams often don't either.

AI-powered systems provide real-time visibility into what's been submitted, what's pending, and what needs action.

That clarity keeps applications moving and reduces friction across the board.`,
  },
  {
    heading: "Why This Matters Now",
    body: `Customer expectations have already changed.

Businesses expect speed. They expect simplicity. They expect real-time.

At the same time, banks are under pressure to grow deposits, improve efficiency, and stay compliant.

AI helps solve all three.

It enables faster onboarding without increasing risk and reduces operational costs in the process.`,
  },
  {
    heading: "What the Future Looks Like",
    body: `The shift isn't toward fully automated banks.

It's toward smarter workflows where AI handles repetitive tasks and humans focus on decisions.

Business account opening is moving toward faster document processing, real-time compliance checks, and onboarding timelines measured in minutes — not weeks.

Banks that move in this direction will win.

Those that don't will keep losing customers before onboarding even finishes.`,
  },
];

const keyShifts = [
  { label: "Instant document processing", icon: "⚡" },
  { label: "Real-time compliance checks", icon: "✓" },
  { label: "Minutes, not weeks", icon: "◷" },
];

export default function BlogPost() {
  return (
    <main className="pt-20">
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-2">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-silver-dark hover:text-white transition-colors font-sans group"
        >
          <svg
            className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Article header */}
      <header className="relative pt-8 pb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/40 to-midnight" />
        <div className="relative max-w-2xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-accent-blue font-sans tracking-wider uppercase">Product</span>
            <span className="text-xs text-silver-dark/40 font-sans">·</span>
            <span className="text-xs text-silver-dark/40 font-sans">February 2026</span>
            <span className="text-xs text-silver-dark/40 font-sans">·</span>
            <span className="text-xs text-silver-dark/40 font-sans">6 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
            How AI Is Reshaping Business Account Opening{" "}
            <span className="text-gradient-blue">in 2026</span>
          </h1>
          <p className="text-base text-silver-dark font-sans leading-relaxed border-l-2 border-accent-blue/40 pl-4">
            Opening a business bank account shouldn't take weeks. But for most banks, it still does.
          </p>
        </div>
      </header>

      {/* Article body */}
      <article className="max-w-2xl mx-auto px-6 pb-20">

        {/* Intro */}
        <p className="text-sm text-silver-dark font-sans leading-[1.85] mb-10">
          Between document collection, compliance checks, and internal reviews, onboarding a new business customer remains one of the most time-consuming processes in banking. And as expectations shift toward real-time experiences, that delay is becoming harder to justify.
          <br /><br />
          This is where AI is starting to change things.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold tracking-tight mb-4">{section.heading}</h2>
              <div className="space-y-4">
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="text-sm text-silver-dark font-sans leading-[1.85]">
                    {para}
                  </p>
                ))}
              </div>

              {/* Pull out the "future looks like" bullets as a visual block */}
              {i === 6 && (
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {keyShifts.map((shift) => (
                    <div
                      key={shift.label}
                      className="glass rounded-xl p-4 border border-accent-blue/15 text-center"
                    >
                      <div className="text-xl mb-2 text-accent-blue">{shift.icon}</div>
                      <p className="text-xs text-silver-dark font-sans leading-snug">{shift.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Final thought */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-blue font-sans mb-3">Final Thought</p>
          <blockquote className="text-lg font-bold leading-snug tracking-tight mb-4">
            AI isn't changing what banks need to do.
            <br />
            <span className="text-gradient-blue">It's changing how fast they can do it.</span>
          </blockquote>
          <p className="text-sm text-silver-dark font-sans leading-relaxed">
            And in 2026, speed is no longer a differentiator. It's expected.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 glass rounded-2xl p-7 border border-accent-blue/15 text-center">
          <p className="text-base font-bold tracking-tight mb-2">
            See AI-powered onboarding in action.
          </p>
          <p className="text-sm text-silver-dark font-sans mb-5">
            Syntex helps community banks and credit unions cut onboarding time by 70% — without adding compliance risk.
          </p>
          <a
            href="https://calendly.com/ashleyparekh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-midnight font-semibold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(74,145,255,0.25)] transition-all duration-300 font-sans"
          >
            Book a Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-silver-dark hover:text-white transition-colors font-sans group"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </article>
    </main>
  );
}
