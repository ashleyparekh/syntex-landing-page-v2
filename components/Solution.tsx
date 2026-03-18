"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const clientFeatures = [
  "Guided business application",
  "Document upload with validation",
  "Real-time progress tracking",
  "Prevents incorrect submissions",
];

const bankerFeatures = [
  "Onboarding tracker dashboard",
  "Document checklist per account",
  "Automated client follow-ups",
  "Cross-team visibility",
];

function ClientPortalMockup() {
  return (
    <div className="glass rounded-2xl p-4 md:p-5 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="text-xs text-white/50 ml-1 font-sans">Client Portal</div>
      </div>
      <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue to-blue-400 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "65%" }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs text-silver-dark mb-2 font-sans">3 of 5 steps complete</div>
      {["Articles of Incorporation", "EIN Letter", "Operating Agreement"].map((doc, i) => (
        <div key={doc} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xs text-white/75 font-sans">{doc}</span>
        </div>
      ))}
      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent-blue/[0.06] border border-accent-blue/20">
        <div className="w-5 h-5 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center shrink-0">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span className="text-xs text-accent-blue font-sans">Upload Business Financials</span>
      </div>
    </div>
  );
}

function BankerDashboardMockup() {
  return (
    <div className="glass rounded-2xl p-4 md:p-5 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-white/50 font-sans">Banker Dashboard</div>
        <div className="text-xs bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full font-sans">Live</div>
      </div>
      {[
        { name: "Acme Corp", progress: 80, stage: "Doc Review" },
        { name: "BlueSky LLC", progress: 50, stage: "Pending Docs" },
        { name: "Nexus Group", progress: 30, stage: "Started" },
      ].map((item) => (
        <div key={item.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-white font-sans">{item.name}</span>
            <span className="text-xs text-accent-blue font-sans">{item.stage}</span>
          </div>
          <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent-blue to-blue-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${item.progress}%` }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="text-xs text-silver-dark/70 mt-1 font-sans">{item.progress}% complete</div>
        </div>
      ))}
    </div>
  );
}

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"client" | "banker">("client");

  return (
    <section id="solution" ref={ref} className="relative py-10 md:py-14">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-blue/40 to-midnight" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-blue/60" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-blue font-sans">The Platform</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-blue/60" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="inline-flex rounded-xl p-1 bg-white/[0.04] border border-white/[0.08] mb-6">
              {(["client", "banker"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-sans ${
                    activeTab === tab ? "bg-white text-midnight" : "text-silver-dark hover:text-white"
                  }`}
                >
                  {tab === "client" ? "Client Portal" : "Banker Dashboard"}
                </button>
              ))}
            </div>

            <ul className="space-y-3">
              {(activeTab === "client" ? clientFeatures : bankerFeatures).map((feat) => (
                <motion.li key={feat} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-300 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-silver-dark font-sans">{feat}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            {activeTab === "client" ? <ClientPortalMockup /> : <BankerDashboardMockup />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
