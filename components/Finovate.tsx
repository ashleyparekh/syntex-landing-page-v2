"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Finovate() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-10 md:py-14">
      <div className="absolute inset-0 bg-white" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-10 bg-gradient-to-r from-accent-blue/60 to-transparent" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent-blue font-sans">
                2× Finovate Scholarship Winner
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-midnight">
              Our Demo at
              <br />
              <span className="text-gradient-blue">Finovate</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🇬🇧</span>
                <span className="text-sm font-medium text-silver-dark font-sans">Finovate Europe — London</span>
              </div>
              <div className="glass rounded-2xl overflow-hidden border border-black/[0.07] hover:border-accent-blue/25 transition-all duration-500 group">
                <div className="relative h-64 w-full">
                  <Image
                    src="/finovate-london.png"
                    alt="Syntex demoing at Finovate Europe in London"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-5 py-4 glass rounded-xl border border-accent-blue/20 hover:border-accent-blue/40 transition-all duration-500">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-base">🇺🇸</span>
                <div className="w-8 h-8 rounded-full bg-accent-blue/10 border border-accent-blue/25 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-midnight text-sm font-semibold font-sans">Demoing on May 6th @ Finovate Spring in San Diego</p>
                <p className="text-silver-dark text-xs mt-0.5 font-sans">Finovate Spring — San Diego</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
