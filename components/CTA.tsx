"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" ref={ref} className="relative py-14 md:py-20 bg-white">
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-5 text-midnight">
            Transform the
            <br />
            <span className="text-gradient-blue">Client Experience</span>
          </h2>
          <p className="text-base text-silver-dark mb-10 max-w-xl mx-auto leading-relaxed font-sans">
            See how Syntex helps banks capture deposits faster with modern digital onboarding.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
