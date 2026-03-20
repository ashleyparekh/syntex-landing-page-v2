import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finovate 2026: What We Learned Demoing to 2,000 Bankers — Syntex",
  description:
    "Seven minutes. No slides. Just product. Here's what we learned from demoing Syntex on stage at Finovate and talking to hundreds of bankers over two days.",
};

const sections = [
  {
    heading: "Everyone Knows Onboarding Is Broken",
    body: `This wasn't surprising. But the level of agreement was.

Almost every conversation came back to the same thing: onboarding is slow, fragmented, and painful for both clients and internal teams.

No one pushed back on the problem. Everyone felt it.`,
    callout: {
      items: [
        "45–60 days to onboard a new business",
        "Multiple follow-ups just to collect basic documents",
        "No clear visibility into where applications stand",
      ],
    },
  },
  {
    heading: "Speed Is No Longer the Differentiator",
    body: `A few years ago, onboarding in a few days felt impressive.

Now, it doesn't.

When fintechs are onboarding customers in minutes, "a few days" already feels slow. Banks aren't just competing with other banks anymore. They're competing with the best experience their customers have had anywhere.

The bar has shifted.`,
  },
  {
    heading: "The Real Pain Is Operational, Not Just Customer-Facing",
    body: `Before Finovate, we thought the biggest pain point was customer experience.

It is. But that's only half the story.

The bigger issue is internal.

Relationship managers are tracking applications across emails and spreadsheets. Compliance teams are reviewing documents manually. Information is scattered across systems.

Onboarding isn't just slow for the client. It's chaotic for the bank.`,
  },
  {
    heading: "Banks Don't Need More Tools. They Need Better Workflows.",
    body: `One thing became very clear: banks aren't looking for more software.

They're looking for something that actually fits into how they work.

The conversations weren't about adding features. They were about reducing back-and-forth, centralizing information, automating repetitive steps, and getting a clear view of every client.

This isn't a feature problem. It's a workflow problem.`,
  },
  {
    heading: "The Appetite for Change Is Huge",
    body: `What surprised us most wasn't the problem.

It was how open people were to solving it.

Across banks of all sizes, there was real urgency. Teams know their current processes aren't working, and they're actively looking for better ways to operate.

This isn't a "nice to have" anymore.`,
  },
  {
    heading: "The Demo Matters More Than You Think",
    body: `Finovate forces you to simplify.

Seven minutes. Live product. No slides.

You can't hide behind positioning. Either it clicks or it doesn't.

A lot of the feedback we got was about clarity. Not just what we built, but how clearly we explained it. That carried directly into every conversation after.`,
  },
];

export default function BlogPost() {
  return (
    <main className="pt-20">
      {/* Back link */}
      <div className="max-w-2xl mx-auto px-6 pt-10 pb-2">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-silver-dark hover:text-midnight transition-colors font-sans group"
        >
          <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="relative pt-8 pb-10">
        <div className="absolute inset-0 bg-white" />
        <div className="relative max-w-2xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-accent-blue font-sans tracking-wider uppercase">Banking</span>
            <span className="text-xs text-silver-dark/40 font-sans">·</span>
            <span className="text-xs text-silver-dark/40 font-sans">January 2026</span>
            <span className="text-xs text-silver-dark/40 font-sans">·</span>
            <span className="text-xs text-silver-dark/40 font-sans">5 min read</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
            Finovate 2026: What We Learned{" "}
            <span className="text-gradient-blue">Demoing to 2,000 Bankers</span>
          </h1>
          <p className="text-base text-silver-dark font-sans leading-relaxed border-l-2 border-accent-blue/40 pl-4">
            We got on stage at Finovate and showed what we've been building.
          </p>
        </div>
      </header>

      {/* Article body */}
      <article className="max-w-2xl mx-auto px-6 pb-20">

        {/* Scene-setter */}
        <div className="glass rounded-2xl p-6 border border-white/[0.07] mb-10">
          <div className="flex items-center gap-6">
            {[
              { value: "7", unit: "min", label: "on stage" },
              { value: "0", unit: "", label: "slides" },
              { value: "2k+", unit: "", label: "bankers" },
            ].map((s) => (
              <div key={s.label} className="text-center flex-1">
                <div className="text-2xl font-bold font-display text-gradient-blue">
                  {s.value}<span className="text-lg">{s.unit}</span>
                </div>
                <div className="text-[10px] text-midnight/40 font-sans mt-0.5 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-midnight/30 font-sans text-center mt-4 italic">
            Then two days of conversations. Here's what actually stood out.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold tracking-tight mb-4">{section.heading}</h2>
              <div className="space-y-4">
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="text-sm text-silver-dark font-sans leading-[1.85]">{para}</p>
                ))}
              </div>

              {/* Callout list for first section */}
              {section.callout && (
                <div className="mt-5 glass rounded-xl p-5 border border-red-400/15 space-y-3">
                  <p className="text-[10px] text-midnight/30 uppercase tracking-widest font-sans mb-1">We heard timelines like</p>
                  {section.callout.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="text-red-400 mt-1 shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="text-sm text-silver-dark font-sans">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Final thought */}
        <div className="mt-12 pt-8 border-t border-black/[0.07]">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-blue font-sans mb-3">Final Thought</p>
          <blockquote className="text-lg font-bold leading-snug tracking-tight mb-4">
            Finovate wasn't just a demo.
            <br />
            <span className="text-gradient-blue">It was validation.</span>
          </blockquote>
          <p className="text-sm text-silver-dark font-sans leading-relaxed">
            The problem is real. The urgency is real. And the gap between where banks are today and where they need to be is still massive.
            <br /><br />
            The banks that move fastest to close that gap are the ones that will win.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 glass rounded-2xl p-7 border border-accent-blue/15 text-center">
          <p className="text-base font-bold tracking-tight mb-2">
            Want to see what we demoed?
          </p>
          <p className="text-sm text-silver-dark font-sans mb-5">
            Book a 20-minute walkthrough — same product, same energy, just for you.
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
            className="inline-flex items-center gap-2 text-xs text-silver-dark hover:text-midnight transition-colors font-sans group"
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
