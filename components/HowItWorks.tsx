"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Submit the entity",
    body: "Name and jurisdiction. Drop in any documents you already have. We tell you exactly what else we need and why.",
  },
  {
    number: "02",
    title: "We trace the structure",
    body: "Our AI reads foreign formation documents up to 60 pages, follows every ownership layer, and flags anything structured to obscure.",
  },
  {
    number: "03",
    title: "You get the full picture",
    body: "A complete beneficial ownership resolution. Every real person identified. Every risk structure flagged. Ready for your credit file in minutes.",
  },
];

const sampleOutput = [
  { label: "Entity", value: "Creston Holdings Ltd", sub: "Cyprus, 3 layers deep" },
  { label: "UBOs identified", value: "2 persons", sub: "Above 25% threshold" },
  { label: "Risk flags", value: "1 flagged", sub: "Nominee director detected" },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-14 md:py-20 bg-white border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="text-xs font-medium tracking-[0.2em] uppercase text-midnight/35 font-sans mb-5">
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-midnight font-display leading-[1.08]">
            Three steps.<br />Full picture.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-black/[0.06] rounded-2xl overflow-hidden mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="bg-white p-8"
            >
              <div className="text-xs font-medium text-midnight/25 font-sans mb-5 tracking-widest">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-midnight font-display mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-midnight/55 font-sans leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Sample output */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-black/[0.07] overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between bg-black/[0.015]">
            <div className="text-[10px] font-medium tracking-[0.18em] uppercase text-midnight/35 font-sans">
              Sample output
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-semibold text-emerald-700 font-sans">
                Completed in 6 minutes
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.06]">
            {sampleOutput.map((item, i) => (
              <div key={i} className="p-6">
                <div className="text-[10px] text-midnight/35 font-sans uppercase tracking-widest mb-2">
                  {item.label}
                </div>
                <div className="text-base font-semibold text-midnight font-sans">{item.value}</div>
                <div className="text-xs text-midnight/40 font-sans mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
