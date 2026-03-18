"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { value: "70%", label: "Faster time-to-close" },
  { value: "40%", label: "Higher conversion" },
  { value: "60%", label: "Less abandonment" },
  { value: "3×", label: "More RM bandwidth" },
];

export default function Impact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-8 md:py-10">
      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {metrics.map((m, i) => (
            <div key={m.value} className="flex items-center gap-3 px-6 py-3 glass rounded-full border border-white/[0.06]">
              <span className="text-2xl font-bold text-gradient-blue font-display">{m.value}</span>
              <span className="text-xs text-silver-dark font-sans">{m.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
