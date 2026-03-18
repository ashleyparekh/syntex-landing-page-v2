"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cta" ref={ref} className="relative py-14 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-blue/50 to-midnight" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-5">
            Transform the
            <br />
            <span className="text-gradient-blue">Client Experience</span>
          </h2>
          <p className="text-base text-silver-dark mb-10 max-w-xl mx-auto leading-relaxed font-sans">
            See how Syntex helps banks capture deposits faster with modern digital onboarding.
          </p>
          <motion.a
            href="https://calendly.com/ashleyparekh"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-midnight font-semibold rounded-xl text-base hover:shadow-[0_0_60px_rgba(74,145,255,0.3)] transition-all duration-500"
          >
            Book a Demo
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
