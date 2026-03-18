"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedWorkflow() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      label: "Client Uploads",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      items: ["Articles of Incorporation", "EIN Letter", "Operating Agreement"],
    },
    {
      label: "AI Verification",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      items: ["Document classification", "Data extraction", "Compliance check"],
    },
    {
      label: "Dashboard Updated",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      items: ["Account ready", "RM notified", "Funding initiated"],
    },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative glass rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          <div className="text-xs text-white/70 ml-2 tracking-wider uppercase font-sans">Syntex Platform</div>
        </div>

        <div className="flex justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <motion.div
                animate={{ scale: step === i ? 1.1 : 0.9, opacity: step >= i ? 1 : 0.3 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                  step === i ? "bg-white text-midnight" : step > i ? "bg-white/20 text-white" : "bg-white/5 text-white/30"
                }`}
              >
                {s.icon}
              </motion.div>
              <span className={`text-[10px] md:text-xs tracking-wide transition-colors duration-500 font-sans ${step === i ? "text-white" : "text-white/30"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          {steps[step].items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
                className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/25 text-emerald-300"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <span className="text-sm text-white/80 font-sans">{item}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-6 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${step === i ? "w-8 bg-accent-blue" : "w-2 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-radial from-deep-blue/60 via-deep-blue/20 to-transparent opacity-80" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-deep-blue/30 via-transparent to-transparent opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-accent-blue/70 to-transparent" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-blue font-sans">
                The Next Generation Technology for Banking
              </span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              Fund Businesses
              <br />
              in Days,{" "}
              <span className="text-gradient-blue">Not Weeks.</span>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-base text-white leading-relaxed max-w-xl mb-8 font-sans">
              Syntex is an AI-powered onboarding platform that helps banks and
              credit unions collect, verify, and process client documents faster.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4 mb-8">
              <a
                href="https://calendly.com/ashleyparekh"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-white text-midnight font-semibold rounded-xl text-sm hover:shadow-[0_0_40px_rgba(74,145,255,0.3)] transition-all duration-300"
              >
                Book a Demo
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </motion.div>

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4 mb-8">
              {[
                { value: "70%", label: "Faster Onboarding" },
                { value: "40%", label: "Higher Conversion" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl border border-accent-blue/20 bg-accent-blue/[0.05]"
                >
                  <span className="text-2xl font-bold text-gradient-blue font-display">{stat.value}</span>
                  <span className="text-xs text-silver-dark leading-tight font-sans">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Institution type badges */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3">
              <span className="text-[10px] text-white/50 tracking-[0.15em] uppercase font-sans shrink-0">Built for</span>
              <div className="h-px flex-1 bg-white/15" />
              <div className="flex items-center gap-2">
                {/* Community Bank */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/[0.07] group hover:border-accent-blue/50 hover:bg-accent-blue/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-white/80 group-hover:text-accent-blue transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <span className="text-[11px] text-white/80 group-hover:text-white transition-colors font-sans">Community Banks</span>
                </div>
                {/* Credit Union */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/[0.07] group hover:border-accent-blue/50 hover:bg-accent-blue/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-white/80 group-hover:text-accent-blue transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[11px] text-white/80 group-hover:text-white transition-colors font-sans">Credit Unions</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <AnimatedWorkflow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
