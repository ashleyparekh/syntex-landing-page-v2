"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const differentiators = [
  {
    title: "Built for exactly this.",
    body: "We do one thing: commercial due diligence for foreign entities at private lenders. Not a feature buried in a bigger platform. Not a law firm moonlighting in tech. One product, built for your exact workflow.",
  },
  {
    title: "Detect fraud early.",
    body: "Bad actors layer shells specifically because most teams stop looking. Our agents trace every layer, flag nominee directors, and surface circular ownership structures before they reach your credit committee.",
  },
  {
    title: "Agents move faster than humans.",
    body: "A compliance team takes weeks. Our agents take minutes. The same depth of analysis, without the bottleneck. Your deal does not wait on a review queue.",
  },
];

export default function WhySyntex() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why-syntex" ref={ref} className="py-14 md:py-20 bg-black/[0.02] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="text-xs font-medium tracking-[0.2em] uppercase text-midnight/35 font-sans mb-5">
            Why Syntex
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-midnight font-display leading-[1.08]">
            What makes this different.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              className="rounded-xl p-7 bg-white border border-black/[0.07]"
            >
              <h3 className="text-xl font-bold text-midnight font-display mb-4 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-midnight/60 font-sans leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
