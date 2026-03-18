"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const badges = [
  {
    title: "AWS Secure",
    description: "Enterprise-grade cloud deployment",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: "Audit Logs",
    description: "Complete activity tracking",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Encryption",
    description: "End-to-end data encryption",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function Security() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="security" ref={ref} className="relative py-10 md:py-14 bg-gradient-to-b from-midnight via-deep-blue/30 to-midnight">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-blue/60" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-blue font-sans">Security & Compliance</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-blue/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Enterprise-Grade
            <br />
            <span className="text-gradient-blue">Security</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass rounded-2xl p-6 text-center hover:border-accent-blue/25 transition-all duration-500 group w-44"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-blue/[0.08] border border-accent-blue/20 flex items-center justify-center text-accent-blue group-hover:text-white group-hover:bg-accent-blue/20 mx-auto mb-4 transition-all duration-300">
                {badge.icon}
              </div>
              <h3 className="text-sm font-semibold mb-1">{badge.title}</h3>
              <p className="text-xs text-silver-dark leading-relaxed font-sans">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
