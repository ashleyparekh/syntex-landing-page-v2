"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const agentSteps = [
  { type: "read", text: "Reading LLP agreement (42 pages, English)...", delay: 400 },
  { type: "read", text: "Identified designated partners and profit-sharing ratios", delay: 1200 },
  { type: "flag", text: "Complex structure: 3-layer LLP with corporate partner", delay: 2000 },
  { type: "trace", text: "Tracing upstream: Arora Family Trust (Singapore)", delay: 2900 },
  { type: "read", text: "Trust deed parsed -- settlor and beneficiaries identified", delay: 3800 },
  { type: "trace", text: "UBO resolved: Ishaan Arora, 67% economic interest", delay: 4700 },
  { type: "rfi", text: "RFI from payment rail: additional UBO certificate required", delay: 5500 },
  { type: "resolve", text: "RFI handled -- certificate collected, submitted to payment rail", delay: 6300 },
  { type: "resolve", text: "All partners verified. Audit record generated.", delay: 7100 },
];

const docs = [
  { name: "LLP_Agreement_2023.pdf", meta: "42 pages", status: "done" },
  { name: "Trust_Deed_Singapore.pdf", meta: "31 pages", status: "done" },
  { name: "Passport_IArora.pdf", meta: "Identity document", status: "done" },
  { name: "UBO_Certificate.pdf", meta: "Collected via RFI", status: "done" },
];

const partners = [
  { name: "Payment rail", note: "Verified + RFI resolved" },
  { name: "Stripe Treasury", note: "Verified" },
  { name: "Primasent", note: "Verified" },
];

function AgentStep({ step, visible }: { step: typeof agentSteps[0]; visible: boolean }) {
  const dot =
    step.type === "flag" ? "bg-amber-400" :
    step.type === "rfi" ? "bg-amber-400" :
    step.type === "resolve" ? "bg-emerald-500" :
    "bg-accent-blue/60";

  const text =
    step.type === "flag" ? "text-amber-800" :
    step.type === "rfi" ? "text-amber-800" :
    step.type === "resolve" ? "text-emerald-800 font-medium" :
    "text-midnight/65";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-2.5"
    >
      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      <span className={`text-[11px] font-sans leading-relaxed ${text}`}>{step.text}</span>
    </motion.div>
  );
}

export default function ProductPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    agentSteps.forEach((step, i) => {
      setTimeout(() => setVisibleSteps((prev) => [...prev, i]), step.delay);
    });
  }, [inView, started]);

  const done = visibleSteps.includes(agentSteps.length - 1);

  return (
    <section ref={ref} className="py-14 md:py-20 bg-black/[0.02] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-midnight font-display leading-[1.08]">
              How Syntex works.
            </h2>
            <p className="text-base text-midnight/50 font-sans max-w-sm leading-relaxed pb-1">
              One intake. Agents read the documents and resolve the structure. Verified data goes to every partner.
            </p>
          </div>
        </motion.div>

        {/* Main UI mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-black/[0.08] bg-white shadow-[0_4px_60px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Top bar */}
          <div className="px-6 py-4 border-b border-black/[0.06] bg-black/[0.015] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              <span className="ml-3 text-xs text-midnight/30 font-sans font-medium">
                syntex.app -- Arora Holdings LLP / Meridian Pay Inc.
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {done ? (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-semibold text-emerald-700 font-sans">All partners verified</span>
                </>
              ) : (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                  <span className="text-[10px] font-semibold text-accent-blue font-sans">Processing</span>
                </>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">

            {/* Col 1: Documents collected */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-semibold text-midnight font-sans">Documents Collected</div>
                <div className="text-[10px] text-midnight/35 font-sans">Client submitted once</div>
              </div>
              <div className="space-y-3">
                {docs.map((doc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg border border-black/[0.06] bg-black/[0.015]"
                  >
                    <svg className="w-4 h-4 text-midnight/25 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium text-midnight font-sans truncate">{doc.name}</div>
                      <div className="text-[10px] text-midnight/35 font-sans">{doc.meta}</div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Col 2: Agent reasoning */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-semibold text-midnight font-sans">Agent Reasoning</div>
                {done ? (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-emerald-700 font-sans">Complete</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                    <span className="text-[10px] font-medium text-accent-blue font-sans">Running</span>
                  </div>
                )}
              </div>
              <div className="space-y-3 min-h-[200px]">
                {agentSteps.map((step, i) => (
                  <AgentStep key={i} step={step} visible={visibleSteps.includes(i)} />
                ))}
              </div>
            </div>

            {/* Col 3: Partner routing */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-semibold text-midnight font-sans">Routed to Partners</div>
                <div className="text-[10px] text-midnight/35 font-sans">via API</div>
              </div>
              <div className="space-y-3">
                {partners.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={done ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                    className="p-3.5 rounded-lg border border-black/[0.06] bg-black/[0.015]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <div className="text-xs font-semibold text-midnight font-sans">{p.name}</div>
                    </div>
                    <div className="text-[10px] text-midnight/40 font-sans">{p.note}</div>
                  </motion.div>
                ))}
                {done && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="mt-4 pt-4 border-t border-black/[0.06]"
                  >
                    <div className="text-[10px] text-midnight/35 font-sans">Client document count: 4</div>
                    <div className="text-[10px] text-midnight/35 font-sans mt-0.5">Partner submissions: 3</div>
                    <div className="text-[10px] font-semibold text-midnight font-sans mt-2">Client touched the process once.</div>
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </motion.div>

        {/* Capability strip */}
        <div className="grid sm:grid-cols-4 gap-4 mt-6">
          {[
            { title: "Branded intake portal", body: "Your clients submit through your domain. You never forward a document request again." },
            { title: "Unstructured document reading", body: "LLP agreements, trust deeds, HUF declarations -- parsed in full, not just registry lookups." },
            { title: "RFI handling", body: "When a partner sends an information request, Syntex collects the response directly." },
            { title: "Audit-ready verdicts", body: "Every compliance decision includes the documented reasoning behind it." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="rounded-xl p-5 border border-black/[0.07] bg-white"
            >
              <div className="text-sm font-semibold text-midnight font-sans mb-1.5">{item.title}</div>
              <div className="text-xs text-midnight/50 font-sans leading-relaxed">{item.body}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
