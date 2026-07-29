"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const differentiators = [
  {
    title: "Collect once, route to all.",
    body: "Most fintechs re-verify the same client for each infrastructure partner. Syntex collects documents once through a single intake and pushes verified data to every partner via API. The client never gets asked again.",
  },
  {
    title: "We read documents. We do not just look up registries.",
    body: "Every major KYB vendor resolves ownership through public registries. That works for simple structures. It does not work for Indian HUFs, multi-layer LLPs, or family trusts. We read the underlying legal documents and trace ownership through them.",
  },
  {
    title: "RFIs stop at Syntex.",
    body: "When a partner sends a request for information, we handle it. We collect the additional documents directly from the client and submit them back to the partner. The fintech does not touch compliance email.",
  },
  {
    title: "Every decision is documented.",
    body: "We produce an audit-ready compliance verdict for each entity. It includes the source documents we read, the reasoning we applied, and the ownership chain we resolved. Your legal team can read it. Your partners can accept it.",
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

        <div className="grid md:grid-cols-2 gap-5">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="rounded-xl p-7 bg-white border border-black/[0.07]"
            >
              <h3 className="text-lg font-bold text-midnight font-display mb-3 leading-snug">
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
