"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  { name: "Ashley Parekh", role: "CEO & Co-founder", bio: "Former Silicon Valley Bank, Deutsche Bank", initials: "AP" },
  { name: "Ishaan Arora", role: "CTO & Co-founder", bio: "Former Techstars startup engineer", initials: "IA" },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" ref={ref} className="relative py-10 md:py-14">
      <div className="absolute inset-0 bg-white" />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-blue/60" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-blue font-sans">Leadership</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-blue/60" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-midnight">
            Built by <span className="text-gradient-blue">Bankers</span>
          </h2>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass rounded-2xl p-7 text-center w-64 hover:border-accent-blue/20 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-accent-blue/[0.08] border border-accent-blue/25 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-gradient-blue font-display">{member.initials}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1 text-midnight">{member.name}</h3>
              <p className="text-sm text-accent-blue mb-2 font-sans">{member.role}</p>
              <p className="text-xs text-silver-dark leading-relaxed font-sans">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
