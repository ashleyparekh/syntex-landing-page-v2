"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const bankPains = [
  {
    icon: (
      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    text: "Manual document collection via email — chasing clients for every missing file",
  },
  {
    icon: (
      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Weeks of back-and-forth coordinating pre-KYC, AML, and credit review across teams",
  },
  {
    icon: (
      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    text: "Zero visibility into where clients drop off — no way to recover lost applications",
  },
];

const syntexAdvantages = [
  {
    icon: (
      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Real-time doc validation in the client portal — flags issues instantly with option to escalate to RM",
  },
  {
    icon: (
      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: "Auto-parsed documents with direct nCino integration — no manual re-entry",
  },
  {
    icon: (
      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    text: "Live analytics: visitors, applications started, submitted, dropped — and exactly why",
  },
];

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" ref={ref} className="relative py-10 md:py-14 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-blue/40 to-midnight" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Losing deposits to faster banks?
            <br />
            <span className="text-gradient-blue">60% of applicants never finish onboarding.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          <div className="glass rounded-2xl p-7 border border-red-500/10 hover:border-red-500/25 transition-all duration-500">
            <div className="text-xs font-medium tracking-[0.15em] uppercase text-red-400 mb-4 font-sans">
              Traditional Banks
            </div>
            <div className="text-4xl md:text-5xl font-bold font-display text-white mb-1">1–3 weeks</div>
            <div className="text-sm text-silver-dark mb-6 font-sans">to fund an account</div>
            <ul className="space-y-4">
              {bankPains.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">{item.icon}</span>
                  <span className="text-sm text-silver-dark leading-relaxed font-sans">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-7 border border-accent-blue/15 hover:border-accent-blue/35 transition-all duration-500">
            <div className="text-xs font-medium tracking-[0.15em] uppercase text-accent-blue mb-4 font-sans">
              With Syntex
            </div>
            <div className="text-4xl md:text-5xl font-bold font-display text-gradient-blue mb-1">&lt;24 hours</div>
            <div className="text-sm text-silver-dark mb-6 font-sans">to fund an account</div>
            <ul className="space-y-4">
              {syntexAdvantages.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent-blue mt-0.5">{item.icon}</span>
                  <span className="text-sm text-silver-dark leading-relaxed font-sans">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
