"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  { stat: "60%", line: "of applicants never finish onboarding" },
  { stat: "0", line: "visibility into where deals stall" },
  { stat: "Hours", line: "spent chasing documents per deal" },
  { stat: "3×", line: "same data re-entered across systems" },
];

const outcomes = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    line: "Instantly validate and parse documents",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    line: "Auto-fill data into internal systems",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    line: "Track drop-off and time to fund",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    line: "Automate follow-ups with full context",
  },
];

function FunnelAnimation() {
  const stages = [
    { label: "Prospects", pct: 100 },
    { label: "Started", pct: 72 },
    { label: "Documents Submitted", pct: 44 },
    { label: "Funded", pct: 40 },
  ];

  return (
    <div className="space-y-2">
      {stages.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="text-[10px] text-midnight/40 font-sans w-36 shrink-0 text-right">{s.label}</span>
          <div className="flex-1 h-5 bg-black/[0.05] rounded-sm overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: `${s.pct}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.9, ease: "easeOut" }}
              className={`h-full rounded-sm ${i === 0 ? "bg-midnight/20" : i === 3 ? "bg-accent-blue" : "bg-accent-blue/40"}`}
            />
          </div>
          <span className="text-[10px] font-mono text-midnight/40 w-8 shrink-0">{s.pct}%</span>
        </motion.div>
      ))}
      <p className="text-[10px] text-midnight/25 font-sans mt-3 text-right pr-11">Typical bank onboarding funnel</p>
    </div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" ref={ref} className="relative py-12 md:py-20">
      <div className="absolute inset-0 bg-white" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-midnight mb-3">
            Where Are You{" "}
            <span className="text-gradient-blue">Losing Deals?</span>
          </h2>
          <p className="text-silver-dark text-sm font-sans">
            Most banks don't track where clients drop off during onboarding.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6 md:p-8 border border-red-200"
          >
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-red-500 mb-5 font-sans">The Problem</p>
            <ul className="space-y-5">
              {problems.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="text-xl font-bold font-display text-red-500 shrink-0 w-16 leading-none">{p.stat}</span>
                  <span className="text-sm text-silver-dark font-sans leading-snug">{p.line}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-black/[0.06]">
              <FunnelAnimation />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-2xl p-6 md:p-8 border border-accent-blue/20"
          >
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-blue mb-5 font-sans">With Syntex</p>
            <ul className="space-y-5">
              {outcomes.map((o, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-7 h-7 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue shrink-0 mt-0.5">
                    {o.icon}
                  </div>
                  <span className="text-sm text-silver-dark font-sans leading-snug pt-1">{o.line}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-black/[0.06]">
              <div className="relative rounded-xl bg-black/[0.03] border border-black/[0.07] p-4 overflow-hidden">
                <motion.div
                  animate={{ top: ["10%", "85%", "10%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"
                />
                <div className="space-y-2 opacity-50">
                  {["Articles of Incorporation", "EIN Letter", "Operating Agreement"].map((doc) => (
                    <div key={doc} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-accent-blue/50 shrink-0" />
                      <div className="h-2 rounded-full bg-midnight/15 flex-1" />
                      <div className="w-4 h-4 rounded-full bg-emerald-500/30 shrink-0 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-midnight/30 font-sans mt-3">AI document scan — live</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center pt-6 border-t border-black/[0.06]"
        >
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-midnight mb-6">
            Stop losing clients{" "}
            <span className="text-gradient-blue">during onboarding.</span>
          </p>
          <a
            href="https://calendly.com/ashleyparekh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-midnight text-white font-semibold rounded-xl text-sm hover:shadow-[0_8px_30px_rgba(74,145,255,0.2)] transition-all duration-300"
          >
            Book a Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
