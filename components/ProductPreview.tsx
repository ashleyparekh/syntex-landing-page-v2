"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const agentSteps = [
  { type: "read", text: "Reading 60-page BVI formation agreement...", delay: 400 },
  { type: "lang", text: "Spanish operating agreement detected — parsing and translating...", delay: 1200 },
  { type: "trace", text: "Tracing ownership chain: Layer 1 resolved (Delaware LLC)", delay: 2200 },
  { type: "trace", text: "Layer 2: Nominee director structure detected — flagging...", delay: 3100 },
  { type: "flag", text: "Flag: Nominee director at Layer 2 obscures beneficial owner", delay: 3900 },
  { type: "trace", text: "Layer 3 resolved: Meridian Capital Partners Ltd (BVI)", delay: 4800 },
  { type: "flag", text: "Flag: Beneficial Owner Certificate missing — required for resolution", delay: 5600 },
  { type: "trace", text: "Layer 4 resolved: 2 natural persons above 25% threshold", delay: 6500 },
  { type: "resolve", text: "Resolution complete. Full report ready.", delay: 7400 },
];

const docs = [
  { name: "BVI_Formation_Agreement.pdf", meta: "60 pages · BVI", status: "done" },
  { name: "Operating_Agreement_ES.pdf", meta: "Spanish · Auto-translated", status: "done" },
  { name: "Shareholder_Registry.pdf", meta: "14 pages · Cayman", status: "done" },
  { name: "Beneficial_Owner_Cert.pdf", meta: "Required · Not uploaded", status: "missing" },
];

function AgentStep({ step, visible }: { step: typeof agentSteps[0]; visible: boolean }) {
  const color =
    step.type === "flag"
      ? "bg-amber-400"
      : step.type === "resolve"
      ? "bg-emerald-500"
      : "bg-accent-blue/60";

  const textColor =
    step.type === "flag"
      ? "text-amber-800"
      : step.type === "resolve"
      ? "text-emerald-800 font-semibold"
      : "text-midnight/65";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35 }}
      className="flex items-start gap-2.5"
    >
      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
      <span className={`text-[11px] font-sans leading-relaxed ${textColor}`}>{step.text}</span>
    </motion.div>
  );
}

export default function ProductPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!inView || running) return;
    setRunning(true);
    agentSteps.forEach((step, i) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, i]);
      }, step.delay);
    });
  }, [inView, running]);

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
              See the agents work.
            </h2>
            <p className="text-base text-midnight/50 font-sans max-w-sm leading-relaxed pb-1">
              Upload formation documents. The agents read, reason, and resolve — in any language, at any depth.
            </p>
          </div>
        </motion.div>

        {/* UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-black/[0.08] bg-white shadow-[0_4px_60px_rgba(0,0,0,0.07)] overflow-hidden"
        >
          {/* Top bar */}
          <div className="px-6 py-4 border-b border-black/[0.06] bg-black/[0.015] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              <span className="ml-3 text-xs text-midnight/30 font-sans font-medium">syntex.app — Meridian Capital Partners · Due Diligence</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-[10px] font-semibold text-accent-blue font-sans">Agents running</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">

            {/* Left: Document upload panel */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-semibold text-midnight font-sans">Formation Documents</div>
                <div className="text-[10px] text-midnight/35 font-sans">4 files · 1 action required</div>
              </div>

              <div className="space-y-3 mb-5">
                {docs.map((doc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      doc.status === "missing"
                        ? "border-amber-200 bg-amber-50/50"
                        : "border-black/[0.06] bg-black/[0.015]"
                    }`}
                  >
                    <svg className="w-4 h-4 text-midnight/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium text-midnight font-sans truncate">{doc.name}</div>
                      <div className="text-[10px] text-midnight/40 font-sans">{doc.meta}</div>
                    </div>
                    {doc.status === "done" ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v4m0 4h.01" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Upload zone */}
              <div className="rounded-lg border-2 border-dashed border-black/10 p-4 text-center">
                <svg className="w-5 h-5 text-midnight/20 mx-auto mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-[11px] text-midnight/30 font-sans">Drop additional documents here</div>
              </div>
            </div>

            {/* Right: Agent reasoning panel */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-semibold text-midnight font-sans">Agent Reasoning</div>
                {visibleSteps.includes(agentSteps.length - 1) ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-semibold text-emerald-700 font-sans">Complete</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                    <span className="text-[10px] font-semibold text-accent-blue font-sans">Running</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 min-h-[240px]">
                {agentSteps.map((step, i) => (
                  <AgentStep key={i} step={step} visible={visibleSteps.includes(i)} />
                ))}
              </div>

              {/* Resolution summary */}
              {visibleSteps.includes(agentSteps.length - 1) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 pt-5 border-t border-black/[0.06] grid grid-cols-3 gap-3"
                >
                  {[
                    { label: "Layers traced", value: "4" },
                    { label: "UBOs found", value: "2" },
                    { label: "Flags raised", value: "2" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg bg-black/[0.02] border border-black/[0.06] p-3 text-center">
                      <div className="text-lg font-bold text-midnight font-display">{item.value}</div>
                      <div className="text-[10px] text-midnight/35 font-sans mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

          </div>
        </motion.div>

        {/* Capabilities row */}
        <div className="grid sm:grid-cols-4 gap-4 mt-6">
          {[
            { title: "60-page doc reads", body: "Full formation agreement parsed, not skimmed" },
            { title: "Any language", body: "Spanish, Mandarin, Portuguese — auto-translated" },
            { title: "Fraud pattern detection", body: "Nominee directors, circular ownership, layered shells" },
            { title: "Missing doc flags", body: "Agents identify what is absent, not just what is present" },
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
