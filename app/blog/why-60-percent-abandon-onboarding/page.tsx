import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why 60% of Commercial Banking Applicants Never Finish Onboarding — Syntex",
  description:
    "Most banks don't have a demand problem. They have a conversion problem. Over 60% of applicants abandon financial onboarding flows. Here's why — and what it costs.",
};

const sections = [
  {
    heading: "The Reality of Commercial Banking Onboarding Today",
    body: `Despite all the innovation happening in fintech, onboarding at most banks still runs on outdated workflows.

A typical experience looks like this: a client fills out an initial form, gets an email requesting additional documents, sends files back and forth, waits days for a response, and repeats the cycle multiple times. Internally, relationship managers are juggling emails, compliance teams are manually reviewing documents, and critical information is scattered across systems.

From the bank's perspective, it's operationally heavy. From the client's perspective, it's exhausting.

And in a world where people are used to instant everything, that gap matters more than ever.`,
  },
  {
    heading: "Why Applicants Are Dropping Off",
    body: `The biggest driver of abandonment isn't lack of interest. It's friction.

Traditional banks often require significantly more steps to complete onboarding compared to fintech platforms. Studies have shown that opening an account with a challenger bank can take fewer than 45 clicks, while traditional bank flows can take anywhere from 70 to over 100 interactions.

Then there's the issue of document collection. Many banks still rely on manual processes for identity verification, requiring customers to upload documents through email, separate portals, or even submit physical copies. This creates delays and uncertainty.

But the biggest problem is visibility. Most applicants have no idea where they are in the process, what's missing, or how long it will take. When that uncertainty builds, they don't wait. They leave.`,
  },
  {
    heading: "The Cost of Slow Onboarding",
    body: `When an application is abandoned, the cost isn't just that one lost account.

Banks have already spent money acquiring that customer through marketing, sales, or relationship efforts. When onboarding fails, that investment is wasted. More importantly, that customer doesn't disappear. They go somewhere else.

Often, they go to fintechs or challenger banks that offer faster, more seamless onboarding experiences. These platforms are designed to reduce friction, not add to it. They verify identities instantly, guide users through a single flow, and provide real-time updates.

The result is simple: what takes a traditional bank days or weeks can often be done in minutes.

That difference is where market share is being won.`,
  },
  {
    heading: "How COVID Accelerated the Shift to Digital Onboarding",
    body: `The gap between traditional banks and digital-first platforms became impossible to ignore during COVID.

As branches shut down or reduced hours, banks that relied on in-person verification or manual processes struggled to onboard new customers at all. At the same time, institutions with digital onboarding capabilities continued acquiring customers without interruption.

Almost overnight, the industry split into two categories: banks that could onboard digitally and banks that couldn't.

While many institutions have since started investing in digital transformation, much of it has been reactive. And in onboarding, reacting late means losing early.`,
  },
  {
    heading: "Why Fintechs Are Setting the New Standard",
    body: `Fintechs didn't win by offering more products. They won by removing friction.

They built onboarding experiences that are fast, centralized, and transparent.

Instead of fragmented communication, everything happens in one place. Instead of manual checks slowing things down, compliance processes are automated in the background. Instead of uncertainty, users get clear, real-time progress updates.

This isn't just better design. It's better infrastructure.

And once customers experience that level of efficiency, they don't go back.`,
  },
  {
    heading: "What Banks Need to Fix",
    body: `Fixing onboarding doesn't require reinventing the bank. It requires fixing the workflow.

The biggest opportunity lies in simplifying how information is collected, verified, and tracked. That means reducing back-and-forth communication, eliminating duplicate requests, and giving both internal teams and clients clear visibility into the process.

Speed matters, but clarity matters just as much. When clients know exactly what's needed and what's happening, they're far more likely to complete the process.

The goal isn't just digital onboarding. It's frictionless onboarding.`,
  },
  {
    heading: "The Future of Commercial Banking Onboarding",
    body: `The expectation has already changed.

Customers are no longer comparing banks to other banks. They're comparing them to the best digital experiences they've had anywhere. That means onboarding isn't competing with a local branch down the street. It's competing with apps that work instantly and intuitively.

In that world, "a few days" already feels slow.

The institutions that win will be the ones that can onboard customers quickly, transparently, and without unnecessary friction. The ones that can't will continue losing customers before the relationship even begins.`,
  },
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
            <span className="text-xs text-accent-blue font-sans tracking-wider uppercase">Onboarding</span>
            <span className="text-xs text-silver-dark/40 font-sans">·</span>
            <span className="text-xs text-silver-dark/40 font-sans">March 2025</span>
            <span className="text-xs text-silver-dark/40 font-sans">·</span>
            <span className="text-xs text-silver-dark/40 font-sans">8 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
            Why 60% of Commercial Banking Applicants{" "}
            <span className="text-gradient-blue">Never Finish Onboarding</span>
          </h1>
          <p className="text-base text-silver-dark font-sans leading-relaxed border-l-2 border-accent-blue/40 pl-4">
            Most banks don't have a demand problem. They have a conversion problem.
          </p>
        </div>
      </header>

      {/* Article body */}
      <article className="max-w-2xl mx-auto px-6 pb-20">

        {/* Intro stat callout */}
        <div className="glass rounded-2xl p-6 border border-accent-blue/15 mb-10">
          <div className="flex items-start gap-4">
            <span className="text-4xl font-bold text-gradient-blue font-display shrink-0">60%</span>
            <p className="text-sm text-silver-dark font-sans leading-relaxed pt-1">
              of applicants abandon financial onboarding flows — often because the process is too slow, too manual, or too confusing. That's lost deposits, lost lending revenue, and lost relationships before they even begin.
            </p>
          </div>
        </div>

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
            </section>
          ))}
        </div>

        {/* Final thought */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-blue font-sans mb-3">Final Thought</p>
          <blockquote className="text-lg font-bold leading-snug tracking-tight">
            Onboarding isn't just the first step of the customer journey.{" "}
            <span className="text-gradient-blue">It is the product.</span>
          </blockquote>
          <p className="text-sm text-silver-dark font-sans leading-relaxed mt-4">
            And right now, for most banks, it's the part that's breaking.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 glass rounded-2xl p-7 border border-accent-blue/15 text-center">
          <p className="text-base font-bold tracking-tight mb-2">
            Syntex fixes this — for your bank.
          </p>
          <p className="text-sm text-silver-dark font-sans mb-5">
            See how community banks and credit unions are cutting onboarding time by 70%.
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
