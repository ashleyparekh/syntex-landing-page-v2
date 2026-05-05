"use client";

import { motion } from "framer-motion";

const stats = [
  { stat: "Minutes", label: "from upload to resolution" },
  { stat: "60 pages", label: "of foreign docs, read in full" },
  { stat: "Any language", label: "formation docs, any jurisdiction" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-black/10 bg-black/[0.03]">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
              <span className="text-xs font-medium text-midnight/50 font-sans tracking-wide">
                Agentic AI for Financial Institutions
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-bold leading-[1.06] tracking-tight mb-6 text-midnight font-display">
              Stop turning down<br />foreign entity deals.
            </h1>

            <p className="text-lg text-midnight/55 leading-relaxed max-w-lg mb-10 font-sans">
              AI agents that read foreign formation documents, trace multi-layer ownership chains, and surface every risk structure. Automatically.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-14">
              <motion.a
                href="https://calendly.com/ashleyparekh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-midnight text-white font-semibold rounded-xl text-sm font-sans"
              >
                Book a Demo
              </motion.a>
            </div>

            <div className="flex flex-wrap gap-10 pt-8 border-t border-black/[0.07]">
              {stats.map((item) => (
                <div key={item.stat}>
                  <div className="text-2xl font-bold text-midnight font-display">{item.stat}</div>
                  <div className="text-xs text-midnight/35 font-sans mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Agent output card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="rounded-2xl border border-black/[0.08] bg-white shadow-[0_4px_40px_rgba(0,0,0,0.07)] overflow-hidden max-w-md ml-auto">
              {/* Header */}
              <div className="px-5 py-4 border-b border-black/[0.06] flex items-center justify-between bg-black/[0.015]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                  <span className="text-xs font-semibold text-midnight font-sans">Agent Analysis</span>
                </div>
                <span className="text-[10px] text-midnight/35 font-sans">Meridian Capital Partners · BVI</span>
              </div>

              {/* Document list */}
              <div className="px-5 py-4 border-b border-black/[0.06] space-y-2.5">
                <div className="text-[10px] font-medium tracking-[0.18em] uppercase text-midnight/30 font-sans mb-3">Uploaded Documents</div>
                {[
                  { name: "BVI_Formation_Agreement.pdf", pages: "60 pages", status: "done" },
                  { name: "Operating_Agreement_ES.pdf", pages: "Spanish · Auto-translated", status: "done" },
                  { name: "Shareholder_Registry.pdf", pages: "14 pages", status: "done" },
                  { name: "Beneficial_Owner_Cert.pdf", pages: "Required · Missing", status: "missing" },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-midnight/30 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <div className="text-[11px] font-medium text-midnight font-sans">{doc.name}</div>
                        <div className="text-[10px] text-midnight/35 font-sans">{doc.pages}</div>
                      </div>
                    </div>
                    {doc.status === "done" ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v4m0 4h.01" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Agent reasoning */}
              <div className="px-5 py-4 border-b border-black/[0.06] space-y-2">
                <div className="text-[10px] font-medium tracking-[0.18em] uppercase text-midnight/30 font-sans mb-3">Agent Reasoning</div>
                {[
                  { icon: "trace", text: "Ownership chain: 4 layers resolved", type: "ok" },
                  { icon: "lang", text: "Spanish document translated and parsed", type: "ok" },
                  { icon: "flag", text: "Nominee director detected at Layer 2", type: "warn" },
                  { icon: "flag", text: "Beneficial Owner Certificate missing", type: "warn" },
                  { icon: "resolve", text: "2 UBOs identified above 25% threshold", type: "ok" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${item.type === "warn" ? "bg-amber-400" : "bg-emerald-500"}`} />
                    <span className={`text-[11px] font-sans ${item.type === "warn" ? "text-amber-700" : "text-midnight/60"}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 flex items-center justify-between bg-black/[0.015]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-semibold text-emerald-700 font-sans">Resolved in 6 minutes</span>
                </div>
                <span className="text-[10px] font-semibold text-accent-blue font-sans">View full report</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
