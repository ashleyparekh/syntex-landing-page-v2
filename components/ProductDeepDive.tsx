"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: "easeOut" },
});

/* ─── Analytics Funnel UI ─────────────────────────────────────── */
function FunnelUI() {
  const stages = [
    { label: "First Outreach", value: "100%", color: "bg-midnight/20", width: "w-full" },
    { label: "Application Started", value: "68%", color: "bg-accent-blue/40", width: "w-[68%]" },
    { label: "Docs Submitted", value: "41%", color: "bg-accent-blue/55", width: "w-[41%]" },
    { label: "In Review", value: "28%", color: "bg-accent-blue/70", width: "w-[28%]" },
    { label: "Funded", value: "21%", color: "bg-accent-blue", width: "w-[21%]" },
  ];

  const metrics = [
    { label: "Avg. time to fund", value: "18d" },
    { label: "Drop-off rate", value: "79%" },
    { label: "Lost deposit/client", value: "$42k" },
  ];

  return (
    <div className="glass rounded-2xl p-6 border border-black/[0.07] space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-midnight/40 uppercase tracking-widest font-sans">Onboarding Funnel</span>
        <span className="text-[10px] text-emerald-400/70 font-sans">Live</span>
      </div>

      {/* Funnel bars */}
      <div className="space-y-2">
        {stages.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <span className="text-[10px] text-midnight/35 font-sans w-28 shrink-0 text-right leading-tight">{s.label}</span>
            <div className="flex-1 h-5 bg-black/[0.04] rounded overflow-hidden">
              <motion.div
                className={`h-full rounded ${s.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: s.width.replace("w-[", "").replace("]", "").replace("w-full", "100%") }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                style={{ width: undefined }}
              >
                <motion.div
                  className={`h-full rounded ${s.color}`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: s.value }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </div>
            <span className="text-[10px] font-mono text-midnight/40 w-8 shrink-0">{s.value}</span>
          </motion.div>
        ))}
      </div>

      {/* Metric pills */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-black/[0.06]">
        {metrics.map((m) => (
          <div key={m.label} className="bg-black/[0.03] rounded-lg p-2.5 text-center">
            <div className="text-base font-bold text-gradient-blue font-display">{m.value}</div>
            <div className="text-[10px] text-midnight/35 font-sans mt-0.5 leading-tight">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline strip */}
      <div className="pt-2">
        <div className="flex items-center gap-0">
          {["Day 1", "Day 4", "Day 9", "Day 14", "Funded"].map((t, i) => (
            <div key={t} className="flex items-center flex-1">
              <div className={`w-2 h-2 rounded-full shrink-0 ${i === 4 ? "bg-emerald-400" : "bg-accent-blue/50"}`} />
              {i < 4 && <div className="h-px flex-1 bg-white/10" />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {["Day 1", "Day 4", "Day 9", "Day 14", "Funded"].map((t) => (
            <span key={t} className="text-[9px] text-midnight/25 font-sans">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Under the Hood grid ────────────────────────────────────── */
const edgeItems = [
  {
    title: "Instant Document Validation",
    desc: "Checks format, completeness, and flags issues immediately — before a banker ever opens the file.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Data Extraction & Structuring",
    desc: "Pulls key fields automatically and structures them — no manual transcription between systems.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  {
    title: "System-Ready Outputs",
    desc: "Standardized data formatted for direct ingestion into your LOS, core system, or CRM.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Shared Onboarding View",
    desc: "RM, credit, and compliance all see the same live status — no more status updates over Slack or email.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function ProductDeepDive() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white pointer-events-none" />

      {/* ── SECTION 1: Analytics ─────────────────────────────── */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-accent-blue/60 to-transparent" />
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-blue font-sans">Onboarding Analytics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              See What You've Never
              <br />
              <span className="text-gradient-blue">Tracked Before</span>
            </h2>
            <p className="text-silver-dark text-sm mt-3 font-sans max-w-lg">
              Syntex gives you visibility into onboarding performance — from first outreach to funded account.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: what you can now see */}
            <motion.div {...fadeUp(0.1)}>
              <ul className="space-y-4 mb-6">
                {[
                  "Time from first contact → funded account",
                  "Exactly where prospects drop off",
                  "% of incomplete applications",
                  "Average deposit per lost client",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full bg-accent-blue mt-2 shrink-0" />
                    <span className="text-sm text-silver-dark font-sans leading-snug">{line}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-midnight/35 font-sans italic border-l border-accent-blue/30 pl-3">
                Most banks don't track this. We do.
              </p>
            </motion.div>

            {/* Right: funnel UI */}
            <motion.div {...fadeUp(0.2)}>
              <FunnelUI />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-black/[0.06]" />
      </div>

      {/* ── SECTION 2: Automation comparison ─────────────────── */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Let Syntex Handle
              <br />
              <span className="text-gradient-blue">the Work</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Without */}
            <motion.div
              {...fadeUp(0.1)}
              className="glass rounded-2xl p-6 md:p-8 border border-red-500/10"
            >
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-red-400 mb-5 font-sans">Without Syntex</p>
              <ul className="space-y-4">
                {[
                  "Chasing documents over email",
                  "Manual data entry into systems",
                  "No clear ownership across teams",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-silver-dark font-sans leading-snug">{line}</span>
                  </li>
                ))}
              </ul>

              {/* Inbox pile visual */}
              <div className="mt-6 pt-5 border-t border-black/[0.06] space-y-2">
                {["RE: RE: RE: Documents needed", "FWD: Missing EIN letter", "Reminder: Application incomplete"].map((subj, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-black/[0.03] border border-black/[0.04]">
                    <svg className="w-3 h-3 text-midnight/25 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] text-midnight/25 font-sans truncate">{subj}</span>
                  </div>
                ))}
                <p className="text-[10px] text-midnight/20 font-sans text-right">+14 more unread</p>
              </div>
            </motion.div>

            {/* With Syntex */}
            <motion.div
              {...fadeUp(0.15)}
              className="glass rounded-2xl p-6 md:p-8 border border-accent-blue/15"
            >
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent-blue mb-5 font-sans">With Syntex</p>
              <ul className="space-y-4">
                {[
                  "Documents validated instantly",
                  "Data auto-filled into systems",
                  "Automated follow-ups with context",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-silver-dark font-sans leading-snug">{line}</span>
                  </li>
                ))}
              </ul>

              {/* Doc scan animation */}
              <div className="mt-6 pt-5 border-t border-black/[0.06]">
                <div className="relative rounded-xl bg-black/[0.03] border border-black/[0.07] p-4 overflow-hidden">
                  <motion.div
                    animate={{ top: ["8%", "88%", "8%"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/70 to-transparent"
                  />
                  <div className="space-y-2.5">
                    {["Articles of Incorporation", "EIN Letter", "Operating Agreement"].map((doc, i) => (
                      <motion.div
                        key={doc}
                        className="flex items-center gap-2.5"
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.9 }}
                      >
                        <div className="w-3 h-3 rounded-sm bg-accent-blue/50 shrink-0" />
                        <div className="h-1.5 rounded-full bg-white/15 flex-1" />
                        <div className="w-5 h-5 rounded-full bg-emerald-500/30 shrink-0 flex items-center justify-center">
                          <svg className="w-3 h-3 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] text-accent-blue/50 font-sans mt-3">Parsing complete — ready for nCino</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-black/[0.06]" />
      </div>

      {/* ── SECTION 3: Under the Hood ────────────────────────── */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              What Actually Happens
              <br />
              <span className="text-gradient-blue">Under the Hood</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {edgeItems.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.1)}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="glass rounded-2xl p-5 border border-black/[0.07] hover:border-accent-blue/25 transition-all duration-400 group"
              >
                <div className="w-9 h-9 rounded-xl bg-accent-blue/[0.08] border border-accent-blue/20 flex items-center justify-center text-accent-blue mb-4 group-hover:bg-accent-blue/15 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold mb-2 leading-snug tracking-tight">{item.title}</h3>
                <p className="text-xs text-silver-dark font-sans leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Final statement */}
          <motion.div
            {...fadeUp(0.3)}
            className="text-center py-10 border-t border-black/[0.06]"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-midnight">
              Less manual work.{" "}
              <span className="text-gradient-blue">Faster funding.</span>
              {" "}More deposits.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
