"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const quotes = [
  {
    quote: "We turned down every foreign entity deal for three years. Now we close them. The analysis Syntex produces in minutes would have taken us three weeks and five figures at our law firm.",
    name: "Head of Underwriting",
    company: "Private lender, $200M in originations",
  },
  {
    quote: "Syntex cut our KYB turnaround from three weeks to same-day. That is not an improvement. That is a different business.",
    name: "COO",
    company: "Regional lender, Southeast US",
  },
];

export default function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-24 bg-white border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="text-xs font-medium tracking-[0.2em] uppercase text-midnight/35 font-sans mb-5">
            Trusted by private lenders
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-midnight font-display leading-tight">
            Built with practitioners.<br />Trusted in production.
          </h2>
        </motion.div>

        {/* Logo placeholders */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-14"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-9 w-28 rounded-lg bg-black/[0.04] border border-black/[0.07] flex items-center justify-center"
            >
              <span className="text-[10px] text-midnight/20 font-sans font-medium tracking-wide">LENDER LOGO</span>
            </div>
          ))}
        </motion.div>

        {/* Quotes */}
        <div className="grid md:grid-cols-2 gap-5">
          {quotes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="rounded-xl p-7 border border-black/[0.07] bg-black/[0.015]"
            >
              <div className="text-3xl text-midnight/12 font-display mb-3 leading-none">&ldquo;</div>
              <p className="text-base text-midnight font-sans leading-relaxed mb-6 font-medium">
                {item.quote}
              </p>
              <div className="pt-5 border-t border-black/[0.06]">
                <div className="text-sm font-semibold text-midnight font-sans">{item.name}</div>
                <div className="text-xs text-midnight/40 font-sans mt-0.5">{item.company}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
